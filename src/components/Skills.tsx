import SkillGroup, { SkillGroupProps } from "./Skills/Group";
import SkillItem from "./Skills/Item";

export interface SkillsProps {
	children:
		| React.ReactElement<SkillGroupProps>[]
		| React.ReactElement<SkillGroupProps>;
}

export default function Skills(props: SkillsProps) {
	return (
		<div className="flex gap-x-2 gap-y-5 flex-wrap justify-evenly">
			{props.children}
		</div>
	);
}

Skills.Group = SkillGroup;
Skills.Item = SkillItem;
