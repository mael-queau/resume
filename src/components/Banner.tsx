import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import Name from "./three/Name";
import Particles from "./three/Particles";

export default function Banner() {
	return (
		<Canvas
			camera={{
				fov: 10,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 5000,
				position: [0, 0, 1000],
			}}
		>
			<Content />
		</Canvas>
	);
}

function Content() {
	const gl = useThree((state) => state.gl);

	gl.setSize(window.innerWidth, window.innerHeight);

	return (
		<>
			<Name
				text="MAËL QUÉAU"
				fontHeight={0.5}
				fontSize={16}
				mouseRadius={40}
				mouseStrength={10}
				position={[-1.2, 0, 0]}
			/>
			<Particles
				mouseRadius={40}
				mouseStrength={10}
				colorSeed={3452}
				maxPointsSize={8}
				minPointsSize={2}
				noiseScaleX={0.01}
				noiseScaleY={0.01}
				noiseStrength={100}
				spacing={1.5}
				margin={15}
				noiseSpeed={0.1}
			/>
		</>
	);
}
