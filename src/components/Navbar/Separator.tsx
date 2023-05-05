import React from "react";

export type NavbarSeparatorProps = React.ComponentPropsWithRef<"hr">;

/**
 * A vertical separator to be placed between navbar items.
 */
export default function NavbarSeparator(props: NavbarSeparatorProps) {
	return (
		<hr className="border-gray-400 border-r-2 h-6 my-auto mx-2" {...props} />
	);
}
