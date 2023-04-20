import { Text } from "@react-three/drei";
import { ThreeElements, extend, useFrame } from "@react-three/fiber";
import { Mesh, ShaderMaterial, Vector3 } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Comfortaa from "../../assets/fonts/Comfortaa-Bold.ttf";
import { useRef } from "react";

extend({ Mesh, ShaderMaterial, TextGeometry });

type ThreeMeshProps = ThreeElements["mesh"];

interface NameProps extends ThreeMeshProps {
	text: string;
	fontSize: number;
	fontHeight: number;
	mouseRadius: number;
	mouseStrength: number;
}

function calcViewportSize(fov: number, distance: number) {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const aspectRatio = width / height;
	const fovInRadians = (fov * Math.PI) / 180;
	const heightOfViewport = 2 * Math.tan(fovInRadians / 2) * distance;
	const widthOfViewport = heightOfViewport * aspectRatio;
	return {
		width: widthOfViewport,
		height: heightOfViewport,
	};
}

export default function Name(props: NameProps) {
	const materialRef = useRef<ShaderMaterial>(null);

	const uniforms = {
		mousePosition: { value: new Vector3() },
		mouseRadius: { value: props.mouseRadius * 0.75 },
		mouseStrength: { value: props.mouseStrength },
	};

	const fov = 10;
	const distance = 1000;

	// Create a grid of evenly spaced points using BufferGeometry
	// First, calculate the number of points needed to fill the viewport
	const viewportSize = calcViewportSize(fov, distance);

	useFrame(({ mouse }) => {
		if (materialRef.current) {
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

	const vertexShader = `
	    varying vec3 vPosition;
	    varying vec3 vNormal;
	    varying vec2 vUv;
	    varying float vDistance;

	    uniform vec3 mousePosition;
	    uniform float mouseRadius;
	    uniform float mouseStrength;

	    void main() {
	      vPosition = position;
	      vNormal = normal;
	      vUv = uv;
	      // Be careful, this is the distance EXCLUDING the z axis
	      vDistance = distance(vPosition.xy, mousePosition.xy);

	      if (vDistance < mouseRadius) {
	        float ratio = vDistance / mouseRadius;
	        float ratioSigmoid = 1.0 / (1.0 + exp(-mouseStrength * (ratio - 0.5)));

	        vPosition.z += mix(100.0, 0.0, ratioSigmoid);
	      }

	      gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
	    }
	  `;

	const fragmentShader = `
	    varying vec3 vPosition;
	    varying vec3 vNormal;
	    varying vec2 vUv;
	    varying float vDistance;

	    uniform vec3 mousePosition;
	    uniform float mouseRadius;
	    uniform float mouseStrength;

	    void main() {
	      // the point is #1E4424 in color unless it is within the mouse radius
	      // if so it interpolates #36BD43 using a sigmoid function based on the distance to the mouse
	      // vec3(0.118,0.267,0.141), vec3(0.212,0.741,0.263)

	      if (vDistance < mouseRadius) {
	        float ratio = vDistance / mouseRadius;
	        float ratioSigmoid = 1.0 / (1.0 + exp(-mouseStrength * (ratio - 0.5)));

	        gl_FragColor = vec4(mix(vec3(0.212,0.741,0.263), vec3(0.118,0.267,0.141), ratioSigmoid), 1.0);
	      } else {
	        gl_FragColor = vec4(0.118,0.267,0.141, 1.0);
	      }
	    }
	  `;

	return (
		<Text font={Comfortaa} fontSize={props.fontSize} position={props.position}>
			<shaderMaterial
				ref={materialRef}
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
			/>
			{props.text}
		</Text>
	);
}
