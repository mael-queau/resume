export interface SectionSubtitleProps {
	subtitle: string;
}

export default function SectionSubtitle(props: SectionSubtitleProps) {
	return <span className="text-2xl text-gray-400">{props.subtitle}</span>;
}
