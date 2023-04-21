export default function DevelopmentWarning() {
	return (
		<div className="fixed bottom-0 left-0 w-full bg-red-500 text-white text-center py-2">
			<p className="text-sm">
				<strong>Warning:</strong> This site is still under development. <br />
				The previous version can be seen{" "}
				<a href="/old/index.html" className="underline">
					here
				</a>
			</p>
		</div>
	);
}
