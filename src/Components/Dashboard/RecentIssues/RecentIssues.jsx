
const issues = [
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

// Maps each possible value to a Tailwind color pair (background + text).
// Centralizing this means the <Badge> component doesn't need if/else chains.
const priorityStyles = {
    Critical: "bg-red-600/10 text-red-600",
    High: "bg-orange-600/10 text-orange-600",
    Medium: "bg-amber-500/10 text-amber-500",
    Low: "bg-green-700/10 text-green-700",
};

const statusStyles = {
    Open: "bg-sky-700/10 text-sky-700",
    "In Progress": "bg-purple-500/10 text-purple-500",
    Resolved: "bg-emerald-50 text-emerald-700",
};

function Badge({ label, styles }) {
    return (
        <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles}`}
        >
            {label}
        </span>
    );
}


function RecentIssues({label, styles}) {
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm my-5 ">
            
            <div className="px-6 py-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Issues</h2>
            </div>
            
            <div className="overflow-x-auto">   
                <table className="w-full border-collapse text-left">
                    <thead>
                    <tr className="border-y border-gray-100">
                        {["Issue", "Category", "Location", "Priority", "Status", "Reported"].map(
                        (heading) => (
                            <th
                            key={heading}
                            className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
                            >
                            {heading}
                            </th>
                        )
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {issues.map((row) => (
                        <tr key={row.issue} className="border-b border-gray-100 last:border-b-0">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                            {row.issue}
                        </td>
                            <td className="px-6 py-3 text-sm text-gray-500">{row.category}</td>
                        <td className="px-6 py-3 text-sm text-gray-500">{row.location}</td>
                        <td className="px-6 py-3">
                            <Badge label={row.priority} styles={priorityStyles[row.priority]} />
                        </td>
                        <td className="px-6 py-3">
                            <Badge label={row.status} styles={statusStyles[row.status]} />
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-500">{row.reported}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            
           

            <div className="border-t border-slate-200 px-6 py-3">
                <button className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:underline">
                    View all issues
                    <span aria-hidden>›</span>
                </button>
            </div>
            
        </div>
    )
}

export default RecentIssues;