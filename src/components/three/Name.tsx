import { Text, shaderMaterial } from "@react-three/drei";
import { ThreeElements, extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Mesh, ShaderMaterial, Vector3 } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Comfortaa from "../../assets/fonts/Comfortaa-VariableFont_wght.ttf";
import { calcViewportSize } from "../../utils/viewport";

extend({
	Mesh,
	// ShaderMaterial,
	TextGeometry,
});

type ThreeMeshProps = ThreeElements["mesh"];

export interface NameProps {
	height: number;
	width: number;
	text: {
		content: string;
		size: number;
		position: {
			x: number;
			y: number;
			z: number;
		};
	};
	mouseEffect: {
		radius: number;
		strength: number;
		isMobile: boolean;
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

export default function Name(props: NameProps & ThreeMeshProps) {
	const materialRef = useRef<ShaderMaterial>(null);

	const uniforms = useMemo(
		() => ({
			mousePosition: { value: new Vector3() },
			mouseRadius: { value: props.mouseEffect.radius * 0.75 },
			mouseStrength: { value: props.mouseEffect.strength },
			mouseInitialized: { value: false },
			mouseIsMobile: { value: props.mouseEffect.isMobile },
		}),
		[
			props.mouseEffect.radius,
			props.mouseEffect.strength,
			props.mouseEffect.isMobile,
		],
	);

	// Create a grid of evenly spaced points using BufferGeometry
	// First, calculate the number of points needed to fill the viewport
	const viewportSize = calcViewportSize(
		props.height,
		props.width,
		props.camera.fov,
		props.camera.position.z,
	);

	useFrame(({ mouse }) => {
		if (materialRef.current) {
			// Careful with the mouse position, it's in normalized coordinates
			// (-1 to +1) so we need to convert it to viewport coordinates
			// (0 to viewportWidth/Height)

			if (!uniforms.mouseInitialized.value) {
				if (mouse.x !== 0 || mouse.y !== 0) {
					uniforms.mouseInitialized.value = true;
				}
			} else {
				materialRef.current.uniforms.mousePosition.value.set(
					(mouse.x * viewportSize.width) / 2,
					(mouse.y * viewportSize.height) / 2,
					0,
				);
			}
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
			uniform bool mouseInitialized;
			uniform bool mouseIsMobile;

	    void main() {
	      vPosition = position;
	      vNormal = normal;
	      vUv = uv;
	      // Be careful, this is the distance EXCLUDING the z axis
	      vDistance = distance(vPosition.xy, mousePosition.xy);

	      if (mouseInitialized && (vDistance < mouseRadius) && !mouseIsMobile) {
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
			uniform bool mouseInitialized;
			uniform bool mouseIsMobile;

	    void main() {
	      // the point is #1E4424 in color unless it is within the mouse radius
	      // if so it interpolates #36BD43 using a sigmoid function based on the distance to the mouse
	      // vec3(0.118,0.267,0.141), vec3(0.212,0.741,0.263)

	      if (mouseInitialized && (vDistance < mouseRadius) && !mouseIsMobile) {
	        float ratio = vDistance / mouseRadius;
	        float ratioSigmoid = 1.0 / (1.0 + exp(-mouseStrength * (ratio - 0.5)));

	        gl_FragColor = vec4(mix(vec3(0.212,0.741,0.263), vec3(0.118,0.267,0.141), ratioSigmoid), 1.0);
	      } else {
	        gl_FragColor = vec4(0.118,0.267,0.141, 1.0);
	      }
	    }
	  `;

	return (
		<Text
			font={Comfortaa}
			fontSize={props.text.size}
			position={props.position}
			textAlign="center"
		>
			<shaderMaterial
				ref={materialRef}
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
			/>
			{props.text.content}
		</Text>
	);
}
