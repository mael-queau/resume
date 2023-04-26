import React from "react";

import { Stats } from "@react-three/drei";
import DevelopmentWarning from "./components/DevelopmentWarning";
import Header from "./components/Header";
import Section from "./components/Section";
import { IconBrandGithub } from "@tabler/icons-react";

function App() {
	// const imageSrc = "src/assets/images/mael-queau.jpg";
	// const imageAlt = "A picture of Maël Quéau";
	// const title = "About Me";
	// const subtitle = "";
	// const paragraph =
	// 	"Hello, I'm Maël Quéau, a French student in computer science. I'm currently studying at Epitech. I'm passionate about web development, and I'm currently learning Machine Learning and Artificial Intelligence.";

	return (
		<>
			{process.env.NODE_ENV === "production" && <DevelopmentWarning />}
			{process.env.NODE_ENV === "development" && <Stats />}
			<Header width={window.innerWidth} height={window.innerHeight} />
			<Section>
				<Section.Title title={"About Me"} />
				<Section.Subtitle subtitle={"Who am I?"} />
				<Section.Image
					src={"src/assets/images/mael-queau.jpg"}
					alt={"A picture of Maël Quéau"}
				/>
				<Section.Body>
					<p>
						Hello, I'm Maël Quéau, a French student in computer science. I'm
						currently studying at Epitech. I'm passionate about development, and
						I'm currently learning Machine Learning and Artificial Intelligence!
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
