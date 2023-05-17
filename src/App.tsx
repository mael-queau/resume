import { Stats } from "@react-three/drei";
import { useRef } from "react";
import {
	Css3OriginalIcon,
	DenojsOriginalIcon,
	DockerOriginalIcon,
	GitOriginalIcon,
	GithubOriginalIcon,
	Html5OriginalIcon,
	JavascriptOriginalIcon,
	LinkedinPlainIcon,
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
	TwitterOriginalIcon,
	TypescriptOriginalIcon,
	VscodeOriginalIcon,
	VuejsOriginalIcon,
} from "react-devicons";
import { useDebounce, useWindowSize } from "usehooks-ts";
import Header from "./components/Header";
import Link from "./components/Link";
import Navbar from "./components/Navbar";
import Section, { SectionWithRef } from "./components/Section";
import Skills from "./components/Skills";

function App() {
	const aboutRef = useRef<HTMLDivElement>(null);
	const skillsRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);

	const { width, height } = useWindowSize();
	const debouncedWidth = useDebounce(width, 100);
	const debouncedHeight = useDebounce(height, 100);

	function scrollToSection(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		ref: React.RefObject<HTMLDivElement>,
	) {
		ref.current?.scrollIntoView({ behavior: "smooth" });
	}

	return (
		<div className="w-full bg-slate-950 text-white">
			{process.env.NODE_ENV === "development" && <Stats />}
			<Navbar>
				<Navbar.Item onClick={(e) => scrollToSection(e, aboutRef)}>
					About
				</Navbar.Item>
				<Navbar.Separator />
				<Navbar.Item onClick={(e) => scrollToSection(e, skillsRef)}>
					Skills
				</Navbar.Item>
				<Navbar.Separator />
				<Navbar.Item onClick={(e) => scrollToSection(e, contactRef)}>
					Contact
				</Navbar.Item>
				<Navbar.Separator />
				<Navbar.Item
					onClick={() => window.open("/cv_mael_queau.pdf", "_blank")}
				>
					<span className="underline">Download my resume</span>
				</Navbar.Item>
			</Navbar>
			<Header width={debouncedWidth} height={debouncedHeight} />
			<SectionWithRef id="about" ref={aboutRef}>
				<Section.Title title="About Me" />
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
						<span className="font-extrabold">Artificial Intelligence</span>.
					</p>
					<p className="mb-4">
						I like to learn new things, especially if it can help me make my
						ideas come to life.
					</p>
					<p className="mb-4">
						I am passionate about{" "}
						<span className="font-extrabold">development</span>,{" "}
						<span className="font-extrabold">music</span>, and{" "}
						<span className="font-extrabold">challenging myself</span>!
					</p>
					<p className="mb-4 text-gray-400">
						(Psst, you can find the source code of this website on{" "}
						<Link
							href="https://www.github.com/mael-queau/resume"
							icon={<GithubOriginalIcon />}
							text="GitHub"
						/>{" "}
						if you're curious)
					</p>
				</Section.Body>
			</SectionWithRef>
			<SectionWithRef id="skills" ref={skillsRef}>
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
			</SectionWithRef>
			<SectionWithRef id="contact" ref={contactRef}>
				<Section.Title title="Contact" />
				<Section.Body>
					<p className="mb-4">
						You can contact me by email at{" "}
						<a
							href="mailto:mael.queau99@gmail.com"
							className="text-blue-500 hover:text-blue-400"
						>
							mael.queau99@gmail.com
						</a>
					</p>
					<p className="mb-4">
						You can also find me on{" "}
						<Link
							href="https://www.linkedin.com/in/mael-queau/"
							icon={<LinkedinPlainIcon />}
							text="LinkedIn"
						/>
						,{" "}
						<Link
							href="https://www.github.com/mael-queau"
							icon={<GithubOriginalIcon />}
							text="GitHub"
						/>{" "}
						and{" "}
						<Link
							href="https://www.twitter.com/mael_queau"
							icon={<TwitterOriginalIcon />}
							text="Twitter"
						/>
						!
					</p>
				</Section.Body>
			</SectionWithRef>
		</div>
	);
}

export default App;
