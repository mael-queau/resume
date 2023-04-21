import DevelopmentWarning from "./components/DevelopmentWarning";
import Header from "./components/Header";
import { Stats } from "@react-three/drei";
import {
	IconBrandReact,
	IconBrandTypescript,
	IconBrandPython,
	IconBrandGithubFilled,
} from "@tabler/icons-react";

function App() {
	return (
		<>
			{process.env.NODE_ENV === "production" && <DevelopmentWarning />}
			{process.env.NODE_ENV === "development" && <Stats />}
			<Header width={window.innerWidth} height={window.innerHeight} />
			<div className="container mx-auto">
				<div className="flex flex-col items-center justify-center min-h-screen py-2">
					<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
						<h1 className="text-6xl font-display font-bold">About me</h1>
						<p className="mt-3 text-2xl">
							Hello, I'm Maël Quéau, a french developer.
						</p>
						<p className="mt-3 text-2xl">
							I'm currently studying at{" "}
							<a
								href="https://www.epitech.eu/fr/"
								className="text-blue-300 hover:underline"
							>
								<img
									src="https://newsroom.ionis-group.com/wp-content/uploads/2021/10/EPITECH-TECHNOLOGY-BLANC-2021.png"
									alt="The Epitech logo"
									className="inline-block h-9 align-middle"
								/>
							</a>
						</p>
						<p className="mt-3 text-2xl">
							You can find me on{" "}
							<a
								href="https://github.com/mael-queau"
								className="text-blue-300 hover:underline"
							>
								<IconBrandGithubFilled size={64} />
							</a>
						</p>
					</main>
				</div>
				<div className="flex flex-col items-center justify-center min-h-screen py-2">
					<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
						<h1 className="text-6xl font-display font-bold">Skills</h1>
						<p className="mt-3 text-2xl">
							Here are some of the technologies I've been working with:
						</p>
						<div className="flex flex-row items-center justify-center w-full flex-1 px-20 text-center">
							<IconBrandReact size={64} strokeWidth={1} />
							<IconBrandTypescript size={64} strokeWidth={1} />
							<IconBrandPython size={64} strokeWidth={1} />
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
