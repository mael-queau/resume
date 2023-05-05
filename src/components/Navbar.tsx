import { useState } from "react";
import { IconMenu } from "@tabler/icons-react";
import NavbarItem, { NavbarItemProps } from "./Navbar/Item";
import React from "react";
import NavbarSeparator from "./Navbar/Separator";

export interface NavbarProps {
	children: React.ReactElement<NavbarItemProps>[];
}

/**
 * A component that renders a navbar.
 * The navbar is fixed, and is always visible.
 * On smaller devices, the navbar is hidden, and a hamburger menu is shown instead.
 * @param props The props for the navbar.
 * @returns A React JSX element.
 */
export default function Navbar(props: NavbarProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 w-full h-16 bg-slate-950 bg-opacity-75 text-white z-50">
			<div className="flex items-center justify-between h-full px-4">
				<div className="flex items-center gap-2">
					<img src="/images/logo.png" alt="Maël Quéau" className="h-8" />
					<button
						onClick={(e) => {
							e.preventDefault();
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						className="font-bold text-2xl hover:text-gray-400"
					>
						Maël Quéau
					</button>
				</div>
				<div className="hidden md:flex items-center space-x-4">
					{props.children}
				</div>
				<div className="md:hidden">
					<button
						className="p-2 rounded-md hover:bg-slate-900"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<IconMenu size={24} />
					</button>
				</div>
			</div>
			<div
				className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-slate-900`}
			>
				{props.children}
			</div>
		</nav>
	);
}

Navbar.Item = NavbarItem;
Navbar.Separator = NavbarSeparator;
