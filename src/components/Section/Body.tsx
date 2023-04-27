export interface SectionBodyProps {
	children: React.ReactNode;
}

export default function SectionBody(props: SectionBodyProps) {
	return (
		<div className="text-lg text-center w-full max-w-screen-lg">
			{props.children}
		</div>
	);
}
