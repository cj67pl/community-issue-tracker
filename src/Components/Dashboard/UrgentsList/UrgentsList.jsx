import { FaChevronRight } from "react-icons/fa6";
import Badge from "../../common/Badge";

const urgentsData = [
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

const priorityStyles = {
    Critical: { dot: "bg-red-600", text: "text-red-600", bg: "bg-red-600/10" },
    High: { dot: "bg-orange-600", text: "text-orange-600", bg: "bg-orange-600/10" },
    Medium: { dot: "bg-amber-500", text: "text-amber-500", bg: "bg-amber-500/10" },
};

const statusStyles = {
    Open: { text: "text-sky-700", bg: "bg-sky-700/10" },
    "In Progress": { text: "text-purple-500", bg: "bg-purple-500/10" },
};

// function Pill({ label, text, bg }) {
//     return (
//         <span className={`rounded-full px-3 py-1 text-xs font-semibold ${bg} ${text}`}>
//             {label}
//         </span>
//     );
// }

function UrgentsList() {
    return (
        <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
                <h3 className="text-lg font-bold text-gray-900">Needs Attention</h3>
            </div>

            <div>
                {urgentsData.map((data) => {
                    const priority = priorityStyles[data.priorityLevel];
                    const status = statusStyles[data.respondStatus];

                    return (
                        <div
                            key={data.id}
                            className="flex flex-row items-center justify-between border-b border-gray-200 px-5 py-3 last:border-b-0"
                        >
                            <div className="flex flex-row items-center gap-3">
                                <div className={`h-2.5 w-2.5 rounded-full ${priority.dot}`} />
                                <div>
                                    <p className="text-sm font-semibold">{data.problem}</p>
                                    <span className="text-xs text-gray-400">{data.location}</span>
                                </div>
                            </div>

                            <div className="flex flex-row items-center gap-8">
                                <div className="flex flex-row gap-4">
                                    {/* <Pill label={data.priorityLevel} text={priority.text} bg={priority.bg} /> */}
                                    <Badge label={data.priorityLevel} styles={[priority.text, priority.bg]} />
                                    {/* <Pill label={data.respondStatus} text={status.text} bg={status.bg} /> */}
                                    <Badge label={data.respondStatus} styles={[status.text, status.bg]} bg={status.bg} />
                                </div>
                                <span className="text-xs text-gray-400">{data.dateReported}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-slate-200 px-6 py-3">
                <button className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:underline">
                    View all issues
                    <FaChevronRight className="w-2 h-2" />
                </button>
            </div>
        </div>
    );
}

export default UrgentsList;