import React from "react";
import ReactDOM from "react-dom/client";
import Stats from "three/examples/jsm/libs/stats.module.js";
import App from "./App";
import "./index.css";

const stats = new Stats();
document.body.appendChild(stats.dom);

function statsUpdate() {
	stats.update();
	requestAnimationFrame(statsUpdate);
}

requestAnimationFrame(statsUpdate);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
