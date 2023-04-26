export interface SectionImageProps {
	src: string;
	alt: string;
}

export default function SectionImage(props: SectionImageProps) {
	return (
		<img
			className="w-64 md:w-96 h-auto object-cover rounded-lg"
			src={props.src}
			alt={props.alt}
		/>
	);
}
