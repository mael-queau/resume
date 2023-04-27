import { SkillItemProps } from "./Item";

export interface SkillGroupProps {
	name: string;
	children:
		| React.ReactElement<SkillItemProps>[]
		| React.ReactElement<SkillItemProps>;
}

export default function SkillGroup(props: SkillGroupProps) {
	return (
		<div className="flex flex-col justify-start items-center gap-3 flex-initial w-full min-w-min max-w-md mx-auto bg-slate-700 rounded px-2 py-5">
			<h3 className="text-center text-xl font-bold">{props.name}</h3>
			<hr className="w-2/3" />
			<div className="flex flex-wrap gap-2 justify-center">
				{props.children}
			</div>
		</div>
	);
}
