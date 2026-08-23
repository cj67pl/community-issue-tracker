import {CheckCircle2} from "lucide-react";

import { VscGraphLine } from "react-icons/vsc";
import { TbReportSearch } from "react-icons/tb";
import { LiaLocationArrowSolid } from "react-icons/lia";

export const reportsKpiCardsData = [
	{
		name: "Avg. Resolution Time",
		icon: VscGraphLine,
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
        statsData: "78%",
		statsDescription: "A29 of 38 issues closed",
	},
	{
		name: "Reports This Month",
		icon: TbReportSearch,
		color: "text-purple-500",
		background: "bg-purple-500/10",
        statsData: "14",
		statsDescription: "+22% vs last month",
	},
	{
		name: "Top Location",
		icon: LiaLocationArrowSolid,
		color: "text-red-700",
		background: "bg-red-700/10",
        statsData: "Science Lab",
		statsDescription: "6 issues reported",
	},
];


export default reportsKpiCardsData;