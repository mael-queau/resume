import { Canvas, useThree } from "@react-three/fiber";
import Name from "./three/Name";
import Particles from "./three/Particles";

interface BannerProps {
	height: number;
	width: number;
}

export default function Banner(props: BannerProps) {
	return (
		<Canvas
			camera={{
				fov: 10,
				aspect: props.width / props.height,
				near: 0.1,
				far: 5000,
				position: [0, 0, 1000],
			}}
		>
			<Content height={props.height} width={props.width} />
		</Canvas>
	);
}

interface ContentProps {
	height: number;
	width: number;
}

function Content(props: ContentProps) {
	const gl = useThree((state) => state.gl);

	gl.setSize(props.width, props.height);

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
