export interface SkillItemProps {
	name: string;
	icon: React.ReactNode;
}

export default function SkillItem(props: SkillItemProps) {
	return (
		<div className="flex items-center gap-2 w-2/5 min-w-fit sm:flex-initial py-1 px-2 rounded hover:bg-slate-500 transition-all hover:scale-105">
			{props.icon}
			<p className="font-mono">{props.name}</p>
		</div>
	);
}
