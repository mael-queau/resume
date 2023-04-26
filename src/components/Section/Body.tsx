export interface SectionBodyProps {
	children: React.ReactNode;
}

export default function SectionBody(props: SectionBodyProps) {
	return (
		<div className="leading-7 text-lg font-light text-center">
			{props.children}
		</div>
	);
}
