import { CheckCircle2, Clock3, CircleAlert, FilePlus2 } from "lucide-react";

export const reportsKpiCardsData = [
	{
		name: "Avg. Resolution Time",
		icon: Clock3,
		color: "text-green-700",
		background: "bg-green-700/10",
		statsData: "3.4d",
		statsDescription: "Down from 4.1d last month",
	},
	{
		name: "Resolution Rate",
		icon: CheckCircle2,
		color: "text-sky-700",
		background: "bg-sky-700/10",
		statsData: "76%",
		statsDescription: "29 of 38 issues resolved",
	},
	{
		name: "Reports This Month",
		icon: FilePlus2,
		color: "text-purple-500",
		background: "bg-purple-500/10",
		statsData: "14",
		statsDescription: "22% more than last month",
	},
	{
		name: "Open Issues",
		icon: CircleAlert,
		color: "text-red-700",
		background: "bg-red-700/10",
		statsData: "7",
		statsDescription: "12% fewer than last month",
	},
];

export default reportsKpiCardsData;
