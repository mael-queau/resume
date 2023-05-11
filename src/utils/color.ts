import { Vector3 } from "three";

export function hexToRgb(hex: string) {
	if (hex.length === 4) {
		hex = hex.replace(/([^#])/g, "$1$1");
	}

	if (/^#([a-f0-9]{3}){1,2}$/i.test(hex) === false) {
		throw new Error("Invalid hex color");
	}

	const bigint = parseInt(hex.replace("#", ""), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number) {
	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function rgbToVector3(r: number, g: number, b: number) {
	return new Vector3(r / 255, g / 255, b / 255);
}

export function hexToVector3(hex: string) {
	const { r, g, b } = hexToRgb(hex);
	return rgbToVector3(r, g, b);
}

export function vector3ToHex(vector: Vector3) {
	const { x, y, z } = vector;
	return rgbToHex(x * 255, y * 255, z * 255);
}

export function vector3ToRgb(vector: Vector3) {
	const { x, y, z } = vector;
	return { r: x * 255, g: y * 255, b: z * 255 };
}
