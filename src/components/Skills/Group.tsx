import { SkillItemProps } from "./Item";

export interface SkillGroupProps {
	name: string;
	children:
		| React.ReactElement<SkillItemProps>[]
		| React.ReactElement<SkillItemProps>;
}

export default function SkillGroup(props: SkillGroupProps) {
	return (
		<div className="flex flex-col justify-start items-center gap-2 flex-initial w-full max-w-md bg-slate-700 rounded px-2 py-5">
			<h3 className="text-center text-xl font-bold">{props.name}</h3>
			<hr className="w-2/3" />
			<div className="flex flex-wrap gap-2 w-full px-10">{props.children}</div>
		</div>
	);
}
