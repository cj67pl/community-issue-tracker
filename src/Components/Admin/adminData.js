import {
	Users,
	UserCheck,
	ClipboardList,
	Clock,
	Loader,
	CircleCheck,
} from "lucide-react";

export const adminKPIData = [
	{
		name: "Total Users",
		key: "total_users",
		icon: Users,
		color: "text-teal-700",
		background: "bg-teal-700/10",
		statsDescription: "Registered accounts",
	},
	{
		name: "Active Users",
		key: "active_users",
		icon: UserCheck,
		color: "text-green-600",
		background: "bg-green-600/10",
		statsDescription: "Currently active accounts",
	},
	{
		name: "Total Issues",
		key: "total_issues",
		icon: ClipboardList,
		color: "text-blue-700",
		background: "bg-blue-700/10",
		statsDescription: "All reported issues",
	},
	{
		name: "Pending Issues",
		key: "pending_issues",
		icon: Clock,
		color: "text-amber-600",
		background: "bg-amber-500/10",
		statsDescription: "Waiting for action",
	},
	{
		name: "In Progress",
		key: "in_progress_issues",
		icon: Loader,
		color: "text-purple-600",
		background: "bg-purple-500/10",
		statsDescription: "Currently being handled",
	},
	{
		name: "Resolved",
		key: "resolved_issues",
		icon: CircleCheck,
		color: "text-green-600",
		background: "bg-green-600/10",
		statsDescription: "Successfully resolved",
	},
];


export const recentIssuesData = [
	{
		id: 1,
		title: "Broken classroom window",
		category: "Infrastructure",
		priority: "High",
		status: "Pending",
		date: "Sep 20, 2026",
	},
	{
		id: 2,
		title: "No internet connection",
		category: "IT and Technology",
		priority: "High",
		status: "In Progress",
		date: "Sep 19, 2026",
	},
	{
		id: 3,
		title: "Damaged classroom chair",
		category: "Maintenance",
		priority: "Medium",
		status: "Resolved",
		date: "Sep 18, 2026",
	},
	{
		id: 4,
		title: "Broken hallway light",
		category: "Maintenance",
		priority: "Low",
		status: "Resolved",
		date: "Sep 17, 2026",
	},
	{
		id: 5,
		title: "Missing security camera",
		category: "Security",
		priority: "High",
		status: "In Progress",
		date: "Sep 16, 2026",
	},
];

export const statusStyles = {
	Pending: "bg-amber-500/10 text-amber-600",
	"In Progress": "bg-sky-600/10 text-sky-700",
	Resolved: "bg-emerald-600/10 text-emerald-700",
};

export const priorityStyles = {
	High: "bg-red-600/10 text-red-700",
	Medium: "bg-amber-500/10 text-amber-600",
	Low: "bg-slate-500/10 text-slate-600",
};
