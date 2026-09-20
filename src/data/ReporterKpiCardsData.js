import {
	ClipboardList,
	CircleAlert,
	RefreshCw,
	CheckCircle2,
} from "lucide-react";

const reporterKpiCardsData = [
	{
		name: "My Reports",
		key: "total_issues",
		icon: ClipboardList,
		color: "text-green-700",
		background: "bg-green-700/10",
		statsDescription: "Issues you submitted",
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
		statsDescription: "Your resolved reports",
	},
];

export default reporterKpiCardsData;
