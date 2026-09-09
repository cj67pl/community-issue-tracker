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
		key: "total_issues",
		icon: ClipboardList,
		color: "text-green-700",
		background: "bg-green-700/10",
		statsDescription: "All reported issues",
	},
	{
		name: "Pending",
		key: "pending_issues",
		icon: CircleAlert,
		color: "text-sky-700",
		background: "bg-sky-700/10",
		statsDescription: "Awaiting response",
	},
	{
		name: "In Progress",
		key: "in_progress_issues",
		icon: RefreshCw,
		color: "text-purple-500",
		background: "bg-purple-500/10",
		statsDescription: "Being addressed",
	},
	{
		name: "Resolved",
		key: "resolved_issues",
		icon: CheckCircle2,
		color: "text-green-600",
		background: "bg-green-600/10",
		statsDescription: "This month",
	},
	{
		name: "Critical",
		key: "critical_issues",
		icon: TriangleAlert,
		color: "text-red-700",
		background: "bg-red-700/10",
		statsDescription: "Needs immediate action",
	},
];

export default kpiCardsData;
