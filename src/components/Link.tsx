import { cloneElement } from "react";

export interface LinkProps extends React.ComponentPropsWithRef<"a"> {
	icon: React.ReactNode;
	text: string;
}

export default function Link(props: LinkProps) {
	return (
		<a
			href={props.href}
			className="text-blue-500 hover:text-blue-400 whitespace-nowrap"
		>
			{cloneElement(props.icon as React.ReactElement, {
				className: "inline-block h-6 align-text-top",
				color: "#3b82f6",
			})}{" "}
			{props.text}
		</a>
	);
}
