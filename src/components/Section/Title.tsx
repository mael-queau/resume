import React from "react";

export interface SectionTitleProps extends React.ComponentPropsWithRef<"h2"> {
	title: string;
}

export default function SectionTitle(props: SectionTitleProps) {
	return (
		<h1
			className="text-4xl font-display font-bold text-center text-white"
			{...props}
		>
			{props.title}
		</h1>
	);
}
