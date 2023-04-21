import DevelopmentWarning from "./components/DevelopmentWarning";
import Header from "./components/Header";
import { Stats } from "@react-three/drei";

function App() {
	return (
		<>
			{process.env.NODE_ENV === "production" && <DevelopmentWarning />}
			{process.env.NODE_ENV === "development" && <Stats />}
			<Header />
		</>
	);
}

export default App;
