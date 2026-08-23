export const issues = [
    { issue: "Broken Projector", category: "Maintenance", location: "Science Lab", priority: "High", status: "Open", reported: "Aug 15" },
    { issue: "No internet connection", category: "Internet / Tech", location: "Computer Lab", priority: "Critical", status: "In Progress", reported: "Aug 14" },
    { issue: "Broken window", category: "Infrastructure", location: "Room 204", priority: "Medium", status: "Open", reported: "Aug 12" },
    { issue: "Leaking Faucet", category: "Utilities", location: "Faculty Restroom", priority: "Medium", status: "Open", reported: "Aug 11" },
    { issue: "Broken Electrical Outlet", category: "Maintenance", location: "Room 204", priority: "Critical", status: "Open", reported: "Aug 9" },
    { issue: "Garbage not collected", category: "Sanitation", location: "Back Gate", priority: "Low", status: "Resolved", reported: "Aug 8" },
    { issue: "Missing first aid supplies", category: "Supplies", location: "Clinic", priority: "Low", status: "Closed", reported: "Aug 4" },
];

export const priorityStyles = {
    Critical: "bg-red-600/10 text-red-600",
    High: "bg-orange-600/10 text-orange-600",
    Medium: "bg-amber-500/10 text-amber-500",
    Low: "bg-green-700/10 text-green-700",
};

export const statusStyles = {
    Open: "bg-sky-700/10 text-sky-700",
    "In Progress": "bg-purple-500/10 text-purple-500",
    Resolved: "bg-emerald-50 text-emerald-700",
    Closed: "bg-neutral-700/10 text-neutral-700",
};

export const dotStyles = {
	Critical: "bg-red-600",
	High: "bg-orange-600",
	Medium: "bg-amber-500",
		
	
};
export const recentIssues = [
	{
		issue: "No internet connection",
		category: "Internet / Tech",
		location: "Computer Lab",
		priority: "Critical",
		status: "Open",
		reported: "Aug 12",
	},
	{
		issue: "Broken window in classroom",
		category: "Infrastructure",
		location: "Room 201",
		priority: "High",
		status: "Open",
		reported: "Aug 14",
	},
	{
		issue: "Water leak in restroom",
		category: "Utilities",
		location: "Building A",
		priority: "Medium",
		status: "In Progress",
		reported: "Aug 13",
	},
	{
		issue: "Street light not working",
		category: "Safety",
		location: "Parking Area",
		priority: "Low",
		status: "Open",
		reported: "Aug 12",
	},
	{
		issue: "Garbage not collected",
		category: "Sanitation",
		location: "Back Gate",
		priority: "Low",
		status: "Resolved",
		reported: "Aug 11",
	},
];


export const urgentsData = [
	{
		id: crypto.randomUUID(),
		problem: "No internet connection",
		location: "Computer Laboratory",
		priorityLevel: "Critical",
		respondStatus: "Open",
		dateReported: "5d ago",
	},
	{
		id: crypto.randomUUID(),
		problem: "Broken electrical outlet",
		location: "Room 204",
		priorityLevel: "Critical",
		respondStatus: "Open",
		dateReported: "3d ago",
	},
	{
		id: crypto.randomUUID(),
		problem: "Broken projector",
		location: "Science Laboratory",
		priorityLevel: "High",
		respondStatus: "In Progress",
		dateReported: "8d ago",
	},
	{
		id: crypto.randomUUID(),
		problem: "Leaking Faucet",
		location: "Faculty Room",
		priorityLevel: "Medium",
		respondStatus: "Open",
		dateReported: "2d ago",
	},
];


