export interface NavbarItemProps {
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	children: React.ReactNode;
}

export default function NavbarItem(props: NavbarItemProps) {
	return (
		<button
			className="text-lg font-display text-white hover:text-gray-400"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
