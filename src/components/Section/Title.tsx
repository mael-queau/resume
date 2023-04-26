export interface SectionTitleProps {
	title: string;
}

export default function SectionTitle(props: SectionTitleProps) {
	return (
		<h2 className="text-4xl font-display font-bold text-center text-white">
			{props.title}
		</h2>
	);
}
