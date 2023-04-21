export function calcViewportSize(
	height: number,
	width: number,
	fov: number,
	distance: number,
) {
	const aspectRatio = width / height;
	const fovInRadians = (fov * Math.PI) / 180;
	const heightOfViewport = 2 * Math.tan(fovInRadians / 2) * distance;
	const widthOfViewport = heightOfViewport * aspectRatio;
	return {
		width: widthOfViewport,
		height: heightOfViewport,
	};
}
