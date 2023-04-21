import ParticlesBanner from "./ParticlesBanner";

export default function Header() {
	return (
		<ParticlesBanner
			width={window.innerWidth}
			height={window.innerHeight - 100}
			camera={{
				fov: 10,
				far: 5000,
				near: 0.1,
				position: {
					x: 0,
					y: 0,
					z: 1000,
				},
			}}
			color={{
				color1: "#1E4424",
				color2: "#36BD43",
				seed: 62345,
			}}
			text={{
				content: "MAËL QUÉAU",
				size: 16,
				position: {
					x: 0,
					y: 0,
					z: -100,
				},
			}}
			mouseEffect={{
				radius: 45,
				strength: 8,
			}}
			noise={{
				scale: {
					x: 0.01,
					y: 0.01,
				},
				strength: 80,
				speed: 0.1,
			}}
			points={{
				size: {
					min: 3,
					max: 10,
				},
				margin: 10,
				oddRowsOffset: 0.5,
				spacing: 1,
			}}
		/>
	);
}
