import { ThreeElements, extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
	BufferAttribute,
	BufferGeometry,
	Vector3,
	ShaderMaterial,
	Points,
	PointsMaterial,
} from "three";
import { calcViewportSize } from "../../utils/viewport";

extend({
	ShaderMaterial,
	Points,
	BufferGeometry,
	BufferAttribute,
	PointsMaterial,
});

type ThreePointsProps = ThreeElements["bufferGeometry"];

export interface PointsProps {
	height: number;
	width: number;
	points: {
		size: {
			min: number;
			max: number;
		};
		spacing: number;
		margin: number;
		oddRowsOffset: number;
	};
	noise: {
		scale: {
			x: number;
			y: number;
		};
		strength: number;
		speed: number;
	};
	mouseEffect: {
		radius: number;
		strength: number;
	};
	color: {
		seed: number;
		color1: string;
		color2: string;
	};
	camera: {
		fov: number;
		position: {
			x: number;
			y: number;
			z: number;
		};
	};
}

export default function Particles(props: PointsProps & ThreePointsProps) {
	const materialRef = useRef<ShaderMaterial>(null);

	// Create a grid of evenly spaced points using BufferGeometry
	// First, calculate the number of points needed to fill the viewport
	const viewportSize = calcViewportSize(
		props.height,
		props.width,
		props.camera.fov,
		props.camera.position.z,
	);

	const numPointsX = Math.floor(
		(viewportSize.width - props.points.margin * 2) / props.points.spacing,
	);
	const numPointsY = Math.floor(
		(viewportSize.height - props.points.margin * 2) / props.points.spacing,
	);

	const numPoints = numPointsX * numPointsY;

	const positions = useMemo(() => {
		const positions = new Float32Array(numPoints * 3);

		// Fill the buffer with the positions of the points
		let i = 0;
		for (let x = 0; x < numPointsX; x++) {
			for (let y = 0; y < numPointsY; y++) {
				positions[i] =
					x * props.points.spacing -
					viewportSize.width / 2 +
					props.points.margin;

				// Offset every other row by half a spacing
				if (y % 2 === 0) {
					positions[i] += props.points.spacing * props.points.oddRowsOffset;
				}

				positions[i + 1] =
					y * props.points.spacing -
					viewportSize.height / 2 +
					props.points.margin;

				positions[i + 2] = 0;
				i += 3;
			}
		}

		return positions;
	}, [numPoints]);

	// const uniforms = {
	// 	time: { value: 0 },
	// 	pointsMinSize: { value: props.points.size.min },
	// 	pointsMaxSize: { value: props.points.size.max },
	// 	noiseScaleX: { value: props.noise.scale.x },
	// 	noiseScaleY: { value: props.noise.scale.y },
	// 	noiseStrength: { value: props.noise.strength },
	// 	colorSeed: { value: props.color.seed },
	// 	mousePosition: { value: new Vector3() },
	// 	mouseRadius: { value: props.mouseEffect.radius },
	// 	mouseStrength: { value: props.mouseEffect.strength },
	// };

	const uniforms = useMemo(
		() => ({
			time: { value: 0 },
			pointsMinSize: { value: props.points.size.min },
			pointsMaxSize: { value: props.points.size.max },
			noiseScaleX: { value: props.noise.scale.x },
			noiseScaleY: { value: props.noise.scale.y },
			noiseStrength: { value: props.noise.strength },
			colorSeed: { value: props.color.seed },
			mousePosition: { value: new Vector3() },
			mouseRadius: { value: props.mouseEffect.radius },
			mouseStrength: { value: props.mouseEffect.strength },
		}),
		[
			props.points.size.min,
			props.points.size.max,
			props.noise.scale.x,
			props.noise.scale.y,
			props.noise.strength,
			props.color.seed,
			props.mouseEffect.radius,
			props.mouseEffect.strength,
		],
	);

	useFrame(({ clock, mouse }) => {
		if (materialRef.current) {
			materialRef.current.uniforms.time.value =
				clock.getElapsedTime() * props.noise.speed;
			// Careful with the mouse position, it's in normalized coordinates
			// (-1 to +1) so we need to convert it to viewport coordinates
			// (0 to viewportWidth/Height)
			materialRef.current.uniforms.mousePosition.value.set(
				(mouse.x * viewportSize.width) / 2,
				(mouse.y * viewportSize.height) / 2,
				0,
			);
		}
	});

	return (
		<points>
			<bufferGeometry
				attributes={{
					position: new BufferAttribute(positions, 3),
				}}
			/>
			<shaderMaterial
				ref={materialRef}
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
			/>
		</points>
	);
}

const vertexShader = `
		uniform float time;
		uniform float pointsMinSize;
		uniform float pointsMaxSize;
		uniform float noiseScaleX;
		uniform float noiseScaleY;
		uniform float noiseStrength;
		uniform float colorSeed;
		uniform vec3 mousePosition;
		uniform float mouseRadius;
		uniform float mouseStrength;

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
			float noise = snoise(vec3(position.x * noiseScaleX, position.y * noiseScaleY, time));

			vec3 newPosition = position;

			newPosition.z += noise * noiseStrength;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

			gl_PointSize = pointsMinSize + (pointsMaxSize - pointsMinSize) * (noise + 1.0) / 2.0;

			if (distance(position, mousePosition) < mouseRadius) {
				// If the point is close to the mouse, make it smaller
				// We want to follow a sigmoid curve between the current point size and the minimum point size
				float ratio = distance(position, mousePosition) / mouseRadius;
				float ratioSigmoid = 1.0 / (1.0 + exp(-mouseStrength * (ratio - 0.5)));

				gl_PointSize = 0.0 + (gl_PointSize - 0.0) * ratioSigmoid;
			}

			// Pass the noise value to the fragment shader
			vNoise = snoise(vec3(position.x * noiseScaleX, position.y * noiseScaleY, time + colorSeed));
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
