import {
	ClipboardList,
	CircleAlert,
	RefreshCw,
	CheckCircle2,
	TriangleAlert,
} from "lucide-react";

const kpiCardsData = [
	{
		name: "Total Issues",
		icon: ClipboardList,
		color: "text-green-700",
		background: "bg-green-700/10",
		statsData: "38",
		statsDescription: "All reported issues",
	},
	{
		name: "Open",
		icon: CircleAlert,
		color: "text-sky-700",
		background: "bg-sky-700/10",
		statsData: "16",
		statsDescription: "Awaiting response",
	},
	{
		name: "In Progress",
		icon: RefreshCw,
		color: "text-purple-500",
		background: "bg-purple-500/10",
		statsData: "8",
		statsDescription: "Being addressed",
	},
	{
		name: "Resolved",
		icon: CheckCircle2,
		color: "text-green-600",
		background: "bg-green-600/10",
		statsData: "14",
		statsDescription: "This month",
	},
	{
		name: "Critical",
		icon: TriangleAlert,
		color: "text-red-700",
		background: "bg-red-700/10",
		statsData: "3",
		statsDescription: "Needs immediate action",
	},
];

export default kpiCardsData;
