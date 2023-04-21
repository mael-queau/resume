import { Canvas, useThree } from "@react-three/fiber";
import Name, { NameProps } from "./three/Name";
import Particles, { PointsProps } from "./three/Particles";
import { useEffect } from "react";

interface BannerProps extends ContentProps {
	camera: {
		near: number;
		far: number;
	} & NameProps["camera"];
}

export default function Banner(props: BannerProps) {
	return (
		<Canvas
			camera={{
				fov: props.camera.fov,
				aspect: props.width / props.height,
				near: props.camera.near,
				far: props.camera.far,
				position: [
					props.camera.position.x,
					props.camera.position.y,
					props.camera.position.z,
				],
			}}
		>
			<Content {...props} />
		</Canvas>
	);
}

type ContentProps = PointsProps & NameProps;

function Content(props: ContentProps) {
	const gl = useThree((state) => state.gl);

	gl.setSize(props.width, props.height);

	useEffect(() => {
		gl.setSize(props.width, props.height);
	}, [props.height, props.width]);

	return (
		<>
			<Name
				{...props}
				position={[
					props.text.position.x,
					props.text.position.y,
					props.text.position.z,
				]}
			/>
			<Particles {...props} />
		</>
	);
}
