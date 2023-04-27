export interface SkillItemProps {
	name: string;
	icon: React.ReactNode;
}

export default function SkillItem(props: SkillItemProps) {
	return (
		<div className="flex justify-start items-center gap-2 basis-1/3 flex-auto px-2 py-1 rounded hover:bg-slate-500 hover:shadow-2xl shadow-black transition-all hover:scale-105">
			{props.icon}
			<p className="font-mono">{props.name}</p>
		</div>
	);
}
