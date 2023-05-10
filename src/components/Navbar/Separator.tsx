import React from "react";

export type NavbarSeparatorProps = React.ComponentPropsWithRef<"div">;

/**
 * A vertical separator to be placed between navbar items.
 */
export default function NavbarSeparator(props: NavbarSeparatorProps) {
	return (
		// when larger than md, the separator needs to be vertical
		// otherwise, it is horizontal
		<div
			className="border-t-2 md:border-r-2 border-slate-700 h-0 md:h-8 w-2/3 md:w-0 my-2 md:p-0"
			{...props}
		/>
	);
}
