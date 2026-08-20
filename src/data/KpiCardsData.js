const kpiCardsData = [
	{
		name: "Total Issues",
		fill: "fill-green-700",
		svgPaths: [
			"M8 13h8v2H8z",
			"M19 3h-2c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 17H5V5h2v2h10V5h2z",
		],
		statsDescription: "All reported issues",
		background: "bg-green-700/10",
	},
	{
		name: "Open",
		fill: "fill-sky-700",
		svgPaths: [
			"M11 7h2v6h-2zm0 8h2v2h-2z",
			"M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8",
		],
		statsDescription: "Awaiting response",
		background: "bg-sky-700/10",
	},
	{
		name: "In Progress",
		fill: "fill-purple-500",
		svgPaths: [
			"M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m8-10c0 4.41-3.59 8-8 8-4.07 0-7.44-3.06-7.93-7H12c.55 0 1-.45 1-1V4.07c3.94.49 7 3.86 7 7.93m-9-7.93V11H4.07A8 8 0 0 1 11 4.07",
		],
		statsDescription: "Being addressed",
		background: "bg-purple-500/10",
	},
	{
		name: "Resolved",
		fill: "fill-green-600",
		svgPaths: [
			"M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z",
		],
		statsDescription: "This month",
		background: "bg-green-600/10",
	},
	{
		name: "Critical",
		fill: "fill-red-700",
		svgPaths: [
			"M11 9h2v6h-2zm0 8h2v2h-2z",
			"M12.87 2.51c-.35-.63-1.4-.63-1.75 0l-9.99 18c-.17.31-.17.69.01.99.18.31.51.49.86.49h20c.35 0 .68-.19.86-.49a1 1 0 0 0 .01-.99zM3.7 20 12 5.06 20.3 20z",
		],
		statsDescription: "Needs immediate action",
		background: "bg-red-700/10",
	},
];

export default kpiCardsData;