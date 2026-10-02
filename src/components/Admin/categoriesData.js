export const categoriesData = [
	{
		id: 1,
		name: "Infrastructure",
		description: "Issues related to buildings, classrooms, and facilities.",
		status: "Active",
		issueCount: 24,
	},
	{
		id: 2,
		name: "IT and Technology",
		description: "Issues related to computers, internet, and technology.",
		status: "Active",
		issueCount: 18,
	},
	{
		id: 3,
		name: "Maintenance",
		description: "Issues related to repairs, cleanliness, and maintenance.",
		status: "Active",
		issueCount: 15,
	},
	{
		id: 4,
		name: "Security",
		description: "Issues related to safety and security concerns.",
		status: "Inactive",
		issueCount: 8,
	},
];

export const statusStyles = {
	Active: "bg-emerald-600/10 text-emerald-700",
	Inactive: "bg-red-600/10 text-red-700",
};
