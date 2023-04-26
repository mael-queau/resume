import { Stats } from "@react-three/drei";
import DevelopmentWarning from "./components/DevelopmentWarning";
import Header from "./components/Header";
import Section from "./components/Section";

function App() {
	return (
		<>
			{process.env.NODE_ENV === "production" && <DevelopmentWarning />}
			{process.env.NODE_ENV === "development" && <Stats />}
			<Header width={window.innerWidth} height={window.innerHeight} />
			<Section>
				<Section.Title title={"About Me"} />
				<Section.Subtitle subtitle={"Who am I?"} />
				<Section.Image
					src={"/images/mael-queau.jpg"}
					alt={"A picture of Maël Quéau"}
				/>
				<Section.Body>
					<p className="mb-4">
						Born in 1999 in France, I am a student at{" "}
						<img
							src="https://newsroom.ionis-group.com/wp-content/uploads/2021/10/EPITECH-TECHNOLOGY-BLANC-2021.png"
							alt="The Epitech logo"
							className="inline-block h-8 align-middle"
						/>{" "}
						in Nantes, learning{" "}
						<span className="font-bold">Artificial Intelligence</span>.
					</p>
					<p className="mb-4">
						I like to learn new things, especially if it can help me make my
						ideas come to life.
					</p>
					<p className="mb-4">
						I am passionate about <span className="font-bold">development</span>
						, <span className="font-bold">music</span>, and{" "}
						<span className="font-bold">blablabla</span>.
					</p>
				</Section.Body>
			</Section>
			<Section>
				<Section.Title title="My Skills" />
				<Section.Body>
					<p>Coming soon...</p>
				</Section.Body>
			</Section>
		</>
	);
}

export default App;
