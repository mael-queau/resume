import { useEffect, useRef } from "react";
import ParticlesBanner from "./ParticlesBanner";

export interface HeaderProps {
	width: number;
	height: number;
}

export default function Header(props: HeaderProps) {
	const smallBoxRef = useRef<HTMLDivElement>(null);
	const largeBoxRef = useRef<HTMLDivElement>(null);

	return (
		<header className="w-full h-[calc(100vh-4rem)] sm:h-screen pt-12 sm:pt-8">
			<div className="w-full h-full">
				<div className="w-full h-full hidden sm:block" ref={largeBoxRef}>
					<ParticlesBanner
						width={largeBoxRef.current?.clientWidth ?? props.width}
						height={largeBoxRef.current?.clientHeight ?? props.height}
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
							content: props.width > 550 ? "MAËL QUÉAU" : "MAËL\nQUÉAU",
							size: 16,
							position: {
								x: 0,
								y: 0,
								z: -100,
							},
						}}
						mouseEffect={{
							radius: 45,
							strength: 10,
							isMobile: false,
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
								min: 2,
								max: 7,
							},
							margin: 10,
							oddRowsOffset: 0.5,
							spacing: 1.5,
						}}
					/>
				</div>
				<div className="w-full h-full sm:hidden" ref={smallBoxRef}>
					<ParticlesBanner
						width={smallBoxRef.current?.clientWidth ?? props.width}
						height={smallBoxRef.current?.clientHeight ?? props.height}
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
							content: props.width > 550 ? "MAËL QUÉAU" : "MAËL\nQUÉAU",
							size: 16,
							position: {
								x: 0,
								y: 0,
								z: -100,
							},
						}}
						mouseEffect={{
							radius: 45,
							strength: 10,
							isMobile: true,
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
								min: 2,
								max: 7,
							},
							margin: 5,
							oddRowsOffset: 0.5,
							spacing: 1.5,
						}}
					/>
				</div>
			</div>
		</header>
	);
}
