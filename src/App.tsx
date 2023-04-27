import { Stats } from "@react-three/drei";
import {
	Css3OriginalIcon,
	DenojsOriginalIcon,
	DockerOriginalIcon,
	ExpressOriginalIcon,
	GitOriginalIcon,
	GithubOriginalIcon,
	Html5OriginalIcon,
	JavascriptOriginalIcon,
	MongodbOriginalIcon,
	NextjsOriginalIcon,
	NodejsOriginalIcon,
	PhpOriginalIcon,
	PostgresqlOriginalIcon,
	PythonOriginalIcon,
	ReactOriginalIcon,
	TailwindcssPlainIcon,
	TensorflowOriginalIcon,
	ThreejsOriginalIcon,
	TypescriptOriginalIcon,
	VscodeOriginalIcon,
	VuejsOriginalIcon,
} from "react-devicons";
import DevelopmentWarning from "./components/DevelopmentWarning";
import Header from "./components/Header";
import Section from "./components/Section";
import Skills from "./components/Skills";

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
						, <span className="font-bold">music</span>, and especially{" "}
						<span className="font-bold">challenging myself</span>.
					</p>
				</Section.Body>
			</Section>
			<Section>
				<Section.Title title="My Skills" />
				<Section.Body>
					<Skills>
						<Skills.Group name="Languages">
							<Skills.Item
								name="JavaScript"
								icon={<JavascriptOriginalIcon />}
							/>
							<Skills.Item
								name="TypeScript"
								icon={<TypescriptOriginalIcon />}
							/>
							<Skills.Item name="Python" icon={<PythonOriginalIcon />} />
							<Skills.Item name="HTML" icon={<Html5OriginalIcon />} />
							<Skills.Item name="CSS" icon={<Css3OriginalIcon />} />
							<Skills.Item name="PHP" icon={<PhpOriginalIcon />} />
						</Skills.Group>
						<Skills.Group name="Frameworks">
							<Skills.Item name="Node.js" icon={<NodejsOriginalIcon />} />
							<Skills.Item name="Deno" icon={<DenojsOriginalIcon />} />
							<Skills.Item
								name="TensorFlow"
								icon={<TensorflowOriginalIcon />}
							/>
							<Skills.Item name="Three.js" icon={<ThreejsOriginalIcon />} />
							<Skills.Item name="TailwindCSS" icon={<TailwindcssPlainIcon />} />
							<Skills.Item name="Next.js" icon={<NextjsOriginalIcon />} />
							<Skills.Item name="Vue.js" icon={<VuejsOriginalIcon />} />
							<Skills.Item name="React" icon={<ReactOriginalIcon />} />
						</Skills.Group>
						<Skills.Group name="Tools">
							<Skills.Item
								name="PostgreSQL"
								icon={<PostgresqlOriginalIcon />}
							/>
							<Skills.Item name="MongoDB" icon={<MongodbOriginalIcon />} />
							<Skills.Item name="Git" icon={<GitOriginalIcon />} />
							<Skills.Item name="GitHub" icon={<GithubOriginalIcon />} />
							<Skills.Item name="Docker" icon={<DockerOriginalIcon />} />
							<Skills.Item name="VSCode" icon={<VscodeOriginalIcon />} />
						</Skills.Group>
					</Skills>
				</Section.Body>
			</Section>
		</>
	);
}

export default App;
