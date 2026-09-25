import { ClipboardList, CircleCheck, Clock, Hourglass } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

import { VscGraphLine } from "react-icons/vsc";
import { TbReportSearch } from "react-icons/tb";
import { LiaLocationArrowSolid } from "react-icons/lia";


export const analyticsKPIData = [
	// {
	// 	name: "Total Issues",
	// 	key: "total_issues",
	// 	icon: ClipboardList,
	// 	color: "text-teal-700",
	// 	background: "bg-teal-700/10",
	// 	statsDescription: "Issues reported",
	// },
	// {
	// 	name: "Resolution Rate",
	// 	key: "resolution_rate",
	// 	icon: CircleCheck,
	// 	color: "text-green-600",
	// 	background: "bg-green-600/10",
	// 	statsDescription: "Issues successfully resolved",
	// },
	// {
	// 	name: "Average Resolution Time",
	// 	key: "average_resolution_time",
	// 	icon: Clock,
	// 	color: "text-blue-600",
	// 	background: "bg-blue-600/10",
	// 	statsDescription: "Average time to resolve",
	// },
	// {
	// 	name: "Pending Issues",
	// 	key: "pending_issues",
	// 	icon: Hourglass,
	// 	color: "text-amber-600",
	// 	background: "bg-amber-500/10",
	// 	statsDescription: "Currently awaiting resolution",
	// },

	{
		name: "Avg. Resolution Time",
		key: "ave_res_time",
		icon: VscGraphLine,
		color: "text-green-700",
		background: "bg-green-700/10",
		// statsData: "3.4d",
	},
	{
		name: "Resolution Rate",
		key: "resolution_rate",
		icon: CheckCircle2,
		color: "text-sky-700",
		background: "bg-sky-700/10",
		// statsData: "78%",
		// statsDescription: "A29 of 38 issues closed",
	},
	{
		name: "Reports in Period",
		key: "reps_this_month",
		icon: TbReportSearch,
		color: "text-purple-500",
		background: "bg-purple-500/10",
		// statsData: "14",
		// statsDescription: "+22% vs last month",
	},
	{
		name: "Top Location",
		key: "top_location",
		icon: LiaLocationArrowSolid,
		color: "text-red-700",
		background: "bg-red-700/10",
		// statsData: "Science Lab",
		// statsDescription: "6 issues reported",
	},
];



export const issuesTrendData = [
	{
		month: "April",
		count: 42,
	},
	{
		month: "May",
		count: 56,
	},
	{
		month: "June",
		count: 48,
	},
	{
		month: "July",
		count: 71,
	},
	{
		month: "August",
		count: 63,
	},
	{
		month: "September",
		count: 78,
	},
];

export const issuesByCategoryData = [
	{
		category: "Infrastructure",
		count: 85,
	},
	{
		category: "IT Equipment",
		count: 63,
	},
	{
		category: "Cleanliness",
		count: 42,
	},
	{
		category: "Security",
		count: 31,
	},
	{
		category: "Other",
		count: 18,
	},
];

export const issuesByStatusData = [
	{
		status: "Pending",
		count: 86,
	},
	{
		status: "In Progress",
		count: 71,
	},
	{
		status: "Resolved",
		count: 185,
	},
];

export const resolutionStatsData = [
	{
		label: "Resolved Issues",
		value: 185,
		description: "Issues successfully completed",
	},
	{
		label: "Average Resolution Time",
		value: "4.8 days",
		description: "Average time from report to resolution",
	},
	{
		label: "Pending Over 7 Days",
		value: 24,
		description: "Pending issues older than 7 days",
	},
	{
		label: "Pending Over 30 Days",
		value: 7,
		description: "Pending issues older than 30 days",
	},
];
