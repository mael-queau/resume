import * as THREE from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const cameraFov = 10;
const cameraDistance = 1000;
const antialias = true;

const renderer = new THREE.WebGLRenderer({ antialias });

const oddRowsOffset = 0.5;

const pointsConfig = {
	minSize: 2,
	maxSize: 8,
	spacing: 1.5,
	margin: 15,
	mouseStrength: 8,
	mouseRadius: 50,
};

const noiseConfig = {
	scaleX: 0.01,
	scaleY: 0.01,
	strength: 100,
	speed: 0.1,
};

const colorSeed = Math.random() * 1000;

if (!WebGL.isWebGLAvailable()) {
	const warning = WebGL.getWebGLErrorMessage();
	document.body.appendChild(warning);
} else {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		cameraFov,
		window.innerWidth / window.innerHeight,
		0.1,
		5000,
	);
	camera.position.z = cameraDistance;

	renderer.setSize(window.innerWidth, window.innerHeight);

	const geometry = createPoints();

	const shaderMaterial = createShaderMaterial();

	let points = new THREE.Points(geometry, shaderMaterial);
	scene.add(points);

	const stats = new Stats();
	document.body.appendChild(stats.dom);

	const mouse = new THREE.Vector2(-10000, -10000);
	let nameGeometry: TextGeometry;
	let nameMaterial: THREE.ShaderMaterial;

	const fontLoader = new FontLoader();
	fontLoader.load("fonts/Comfortaa_Bold.json", (font) => {
		nameGeometry = new TextGeometry("MAËL QUÉAU", {
			font,
			size: 16,
			height: 0.5,
		});

		nameGeometry.center();
		nameGeometry.translate(0, 0, -200);

		nameMaterial = new THREE.ShaderMaterial({
			uniforms: {
				iMousePosition: { value: new THREE.Vector3() },
				iMouseRadius: { value: pointsConfig.mouseRadius * 0.75 },
				iMouseStrength: { value: pointsConfig.mouseStrength },
			},
			vertexShader: `
				varying vec3 vPosition;
				varying vec3 vNormal;
				varying vec2 vUv;
				varying float vDistance;

				uniform vec3 iMousePosition;
				uniform float iMouseRadius;
				uniform float iMouseStrength;

				void main() {
					vPosition = position;
					vNormal = normal;
					vUv = uv;
					// Be careful, this is the distance EXCLUDING the z axis
					vDistance = distance(vPosition.xy, iMousePosition.xy);

					if (vDistance < iMouseRadius) {
						float ratio = vDistance / iMouseRadius;
						float ratioSigmoid = 1.0 / (1.0 + exp(-iMouseStrength * (ratio - 0.5)));

						vPosition.z += mix(100.0, 0.0, ratioSigmoid);
					}

					gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
				}
			`,
			fragmentShader: `
				varying vec3 vPosition;
				varying vec3 vNormal;
				varying vec2 vUv;
				varying float vDistance;

				uniform vec3 iMousePosition;
				uniform float iMouseRadius;
				uniform float iMouseStrength;

				void main() {
					// the point is #1E4424 in color unless it is within the mouse radius
					// if so it interpolates #36BD43 using a sigmoid function based on the distance to the mouse
					// vec3(0.118,0.267,0.141), vec3(0.212,0.741,0.263)

					if (vDistance < iMouseRadius) {
						float ratio = vDistance / iMouseRadius;
						float ratioSigmoid = 1.0 / (1.0 + exp(-iMouseStrength * (ratio - 0.5)));

						gl_FragColor = vec4(mix(vec3(0.212,0.741,0.263), vec3(0.118,0.267,0.141), ratioSigmoid), 1.0);
					} else {
						gl_FragColor = vec4(0.118,0.267,0.141, 1.0);
					}
				}
			`,
		});

		const nameMesh = new THREE.Mesh(nameGeometry, nameMaterial);
		scene.add(nameMesh);
	});

	window.addEventListener("mousemove", (event) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	});

	// touch screen drag
	window.addEventListener("touchmove", (event) => {
		mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
	});

	window.addEventListener("resize", () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);

		// Create new points with the new viewport size
		const newPoints = new THREE.Points(createPoints(), shaderMaterial);

		// Remove the old points and add the new ones
		scene.remove(points);
		scene.add(newPoints);

		points = newPoints;
	});

	function animate() {
		requestAnimationFrame(animate);
		shaderMaterial.uniforms.iTime.value =
			(performance.now() / 1000) * noiseConfig.speed;

		const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
		vector.unproject(camera);
		const dir = vector.sub(camera.position).normalize();
		const distance = -camera.position.z / dir.z;
		const worldPos = camera.position.clone().add(dir.multiplyScalar(distance));

		if (nameMaterial) {
			nameMaterial.uniforms.iMousePosition.value = worldPos;
		}
		shaderMaterial.uniforms.iMousePosition.value = worldPos;

		renderer.render(scene, camera);
		stats.update();
	}

	requestAnimationFrame(animate);
}

function calcViewportSize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const aspectRatio = width / height;
	const fovInRadians = (cameraFov * Math.PI) / 180;
	const heightOfViewport = 2 * Math.tan(fovInRadians / 2) * cameraDistance;
	const widthOfViewport = heightOfViewport * aspectRatio;
	return {
		width: widthOfViewport,
		height: heightOfViewport,
	};
}

function createPoints() {
	// Create a grid of evenly spaced points using BufferGeometry
	// First, calculate the number of points needed to fill the viewport
	const viewportSize = calcViewportSize();
	const numPointsX = Math.floor(
		(viewportSize.width - pointsConfig.margin * 2) / pointsConfig.spacing,
	);
	const numPointsY = Math.floor(
		(viewportSize.height - pointsConfig.margin * 2) / pointsConfig.spacing,
	);
	const numPoints = numPointsX * numPointsY;

	// Create a buffer for the positions of the points
	const positions = new Float32Array(numPoints * 3);

	// Fill the buffer with the positions of the points
	let i = 0;
	for (let x = 0; x < numPointsX; x++) {
		for (let y = 0; y < numPointsY; y++) {
			positions[i] =
				x * pointsConfig.spacing - viewportSize.width / 2 + pointsConfig.margin;

			// Offset every other row by half a spacing
			if (y % 2 === 0) {
				positions[i] += pointsConfig.spacing * oddRowsOffset;
			}

			positions[i + 1] =
				y * pointsConfig.spacing -
				viewportSize.height / 2 +
				pointsConfig.margin;

			positions[i + 2] = 0;
			i += 3;
		}
	}

	// Create a BufferGeometry and add the positions buffer to it
	const geometry = new THREE.BufferGeometry();

	// Set the positions attribute for the points
	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

	return geometry;
}

function createShaderMaterial() {
	// Custom shader
	const vertexShader = `
		uniform float iTime;
		uniform float iPointsMinSize;
		uniform float iPointsMaxSize;
		uniform float iNoiseScaleX;
		uniform float iNoiseScaleY;
		uniform float iNoiseStrength;
		uniform float iColorSeed;
		uniform vec3 iMousePosition;
		uniform float iMouseRadius;
		uniform float iMouseStrength;
		uniform bool iMouseMoved;

		//
		// Description : Array and textureless GLSL 2D/3D/4D simplex
		//               noise functions.
		//      Author : Ian McEwan, Ashima Arts.
		//  Maintainer : stegu
		//     Lastmod : 20201014 (stegu)
		//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
		//               Distributed under the MIT License. See LICENSE file.
		//               https://github.com/ashima/webgl-noise
		//               https://github.com/stegu/webgl-noise
		//

		vec3 mod289(vec3 x) {
			return x - floor(x * (1.0 / 289.0)) * 289.0;
		}

		vec4 mod289(vec4 x) {
			return x - floor(x * (1.0 / 289.0)) * 289.0;
		}

		vec4 permute(vec4 x) {
				return mod289(((x*34.0)+10.0)*x);
		}

		vec4 taylorInvSqrt(vec4 r)
		{
			return 1.79284291400159 - 0.85373472095314 * r;
		}

		float snoise(vec3 v)
			{
			const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
			const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

		// First corner
			vec3 i  = floor(v + dot(v, C.yyy) );
			vec3 x0 =   v - i + dot(i, C.xxx) ;

		// Other corners
			vec3 g = step(x0.yzx, x0.xyz);
			vec3 l = 1.0 - g;
			vec3 i1 = min( g.xyz, l.zxy );
			vec3 i2 = max( g.xyz, l.zxy );

			//   x0 = x0 - 0.0 + 0.0 * C.xxx;
			//   x1 = x0 - i1  + 1.0 * C.xxx;
			//   x2 = x0 - i2  + 2.0 * C.xxx;
			//   x3 = x0 - 1.0 + 3.0 * C.xxx;
			vec3 x1 = x0 - i1 + C.xxx;
			vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
			vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

		// Permutations
			i = mod289(i);
			vec4 p = permute( permute( permute(
								i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
							+ i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
							+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

		// Gradients: 7x7 points over a square, mapped onto an octahedron.
		// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
			float n_ = 0.142857142857; // 1.0/7.0
			vec3  ns = n_ * D.wyz - D.xzx;

			vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

			vec4 x_ = floor(j * ns.z);
			vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

			vec4 x = x_ *ns.x + ns.yyyy;
			vec4 y = y_ *ns.x + ns.yyyy;
			vec4 h = 1.0 - abs(x) - abs(y);

			vec4 b0 = vec4( x.xy, y.xy );
			vec4 b1 = vec4( x.zw, y.zw );

			//vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
			//vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
			vec4 s0 = floor(b0)*2.0 + 1.0;
			vec4 s1 = floor(b1)*2.0 + 1.0;
			vec4 sh = -step(h, vec4(0.0));

			vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
			vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

			vec3 p0 = vec3(a0.xy,h.x);
			vec3 p1 = vec3(a0.zw,h.y);
			vec3 p2 = vec3(a1.xy,h.z);
			vec3 p3 = vec3(a1.zw,h.w);

		//Normalise gradients
			vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
			p0 *= norm.x;
			p1 *= norm.y;
			p2 *= norm.z;
			p3 *= norm.w;

		// Mix final noise value
			vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
			m = m * m;
			return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
																		dot(p2,x2), dot(p3,x3) ) );
			}

		varying float vNoise;

		void main() {
			float noise = snoise(vec3(position.x * iNoiseScaleX, position.y * iNoiseScaleY, iTime));

			vec3 newPosition = position;

			newPosition.z += noise * iNoiseStrength;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

			gl_PointSize = iPointsMinSize + (iPointsMaxSize - iPointsMinSize) * (noise + 1.0) / 2.0;

			if (distance(position, iMousePosition) < iMouseRadius) {
				// If the point is close to the mouse, make it smaller
				// We want to follow a sigmoid curve between the current point size and the minimum point size
				float ratio = distance(position, iMousePosition) / iMouseRadius;
				float ratioSigmoid = 1.0 / (1.0 + exp(-iMouseStrength * (ratio - 0.5)));

				gl_PointSize = 0.0 + (gl_PointSize - 0.0) * ratioSigmoid;
			}

			// Pass the noise value to the fragment shader
			vNoise = snoise(vec3(position.x * iNoiseScaleX, position.y * iNoiseScaleY, iTime + iColorSeed));
		}
	`;

	const fragmentShader = `
		varying float vNoise;

		float hexagon(in vec2 p) {
			vec2 q = abs(p);
			return max(q.x * 0.866025 + q.y * 0.5, q.y);
		}

		void main() {
			vec2 coord = 2.0 * gl_PointCoord - 1.0;
			float dist = hexagon(coord);
			float alpha = 1.0 - smoothstep(1.0 - 0.05, 1.0, dist);

			if (alpha < 0.01) {
				discard;
			}

			// Interpolate between #1E4424 and #36BD43 based on the noise value
			vec3 color = mix(vec3(0.118,0.267,0.141), vec3(0.212,0.741,0.263), (vNoise + 1.0) / 2.0);
			gl_FragColor = vec4(color, alpha);
		}
	`;

	const shaderMaterial = new THREE.ShaderMaterial({
		uniforms: {
			iTime: { value: 0.0 },
			iPointsMinSize: { value: pointsConfig.minSize },
			iPointsMaxSize: { value: pointsConfig.maxSize },
			iNoiseScaleX: { value: noiseConfig.scaleX },
			iNoiseScaleY: { value: noiseConfig.scaleY },
			iNoiseStrength: { value: noiseConfig.strength },
			iColorSeed: { value: colorSeed },
			iMousePosition: { value: new THREE.Vector3() },
			iMouseRadius: { value: pointsConfig.mouseRadius },
			iMouseStrength: { value: pointsConfig.mouseStrength },
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
	});

	return shaderMaterial;
}

export default renderer?.domElement;
