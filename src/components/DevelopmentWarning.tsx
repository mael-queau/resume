import { IconCross, IconCrossOff, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function DevelopmentWarning() {
	const [dismissed, setDismissed] = useState(false);
	return (
		<div
			className={`fixed bottom-0 left-0 w-full bg-red-500 text-white text-center py-2 z-10 ${
				dismissed ? "hidden" : "block"
			}`}
		>
			<p className="text-sm">
				<strong>Warning:</strong> This site is still under development. <br />
				The previous version can be seen{" "}
				<a href="/old/index.html" className="underline">
					here
				</a>
			</p>
			<button
				className="text-sm underline absolute right-8 top-1/2 -translate-y-1/2"
				onClick={() => setDismissed(true)}
			>
				<IconX size={16} />
			</button>
		</div>
	);
}
