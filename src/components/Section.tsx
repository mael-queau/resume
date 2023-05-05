import React, { useMemo } from "react";
import SectionTitle, { SectionTitleProps } from "./Section/Title";
import SectionSubtitle, { SectionSubtitleProps } from "./Section/Subtitle";
import SectionImage, { SectionImageProps } from "./Section/Image";
import SectionBody, { SectionBodyProps } from "./Section/Body";

export interface SectionProps extends React.ComponentPropsWithRef<"section"> {
	reverse?: boolean;
	children: React.ReactElement<
		| SectionBodyProps
		| SectionTitleProps
		| SectionSubtitleProps
		| SectionImageProps
	>[];
}

function Section(props: SectionProps, ref?: React.ForwardedRef<HTMLElement>) {
	const { title, subtitle, image, body } = useMemo(() => {
		const title = props.children.find((child) => child.type === SectionTitle);
		const subtitle = props.children.find(
			(child) => child.type === SectionSubtitle,
		);
		const image = props.children.find((child) => child.type === SectionImage);
		const body = props.children.find((child) => child.type === SectionBody);

		return {
			title,
			subtitle,
			image,
			body,
		};
	}, [props.children]);

	return (
		<section
			ref={ref}
			className="flex flex-col items-center justify-center w-full min-h-screen h-fit py-10 pt-20 even:bg-slate-900"
			{...props}
		>
			<main
				className={`flex flex-col gap-5 items-center justify-center w-full h-full max-w-7xl px-8 mx-auto {
					${props.reverse ? "md:flex-row-reverse" : "md:flex-row"}
				}`}
			>
				{image && (
					<div className="flex flex-col items-center justify-center w-full h-full flex-1">
						{image}
					</div>
				)}
				<div className="flex flex-col items-center justify-center w-full h-full flex-1">
					{title}
					{subtitle}
					<hr className="w-1/2 my-4 border-gray-500" />
					{body}
				</div>
			</main>
		</section>
	);
}

Section.Title = SectionTitle;
Section.Subtitle = SectionSubtitle;
Section.Image = SectionImage;
Section.Body = SectionBody;

export const SectionWithRef = React.forwardRef(Section);

export default Section;
