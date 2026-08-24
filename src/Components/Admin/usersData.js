export const usersData = [
	{
		id: 1,
		name: "Tom Cookerist",
		email: "tom.cookerist@tugon.edu.ph",
		role: "Admin",
		status: "Active",
	},
	{
		id: 2,
		name: "Maria Santos",
		email: "maria.santos@tugon.edu.ph",
		role: "Coordinator",
		status: "Active",
	},
	{
		id: 3,
		name: "John Dela Cruz",
		email: "john.delacruz@tugon.edu.ph",
		role: "Coordinator",
		status: "Active",
	},
	{
		id: 4,
		name: "Alex Reyes",
		email: "alex.reyes@tugon.edu.ph",
		role: "Reporter",
		status: "Active",
	},
	{
		id: 5,
		name: "Ana Villanueva",
		email: "ana.villanueva@tugon.edu.ph",
		role: "Reporter",
		status: "Invited",
	},
];

export const roleOptions = ["Admin", "Coordinator", "Reporter"];

export const roleStyles = {
	Admin: "bg-purple-600/10 text-purple-700",
	Coordinator: "bg-teal-700/10 text-teal-700",
	Reporter: "bg-sky-700/10 text-sky-700",
};

export const statusStyles = {
	Active: "bg-emerald-600/10 text-emerald-700",
	Invited: "bg-amber-500/10 text-amber-600",
};
