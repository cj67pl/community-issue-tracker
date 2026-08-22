import { Trash2, Pencil } from "lucide-react";
import Badge from "../../common/Badge.jsx";
import { priorityStyles, statusStyles } from "../issuesData.js";

const columns = ["Issue", "Category", "Location", "Priority", "Status", "Reported", ""];

function IssuesTable({ issues }) {
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm my-5">
            <div className="px-6 py-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Issues</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left">
                    <thead>
                        <tr className="border-y border-slate-200">
                            {columns.map((heading) => (
                                <th key={heading} className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((row) => (
                            <tr key={row.issue} className="border-b border-slate-200 last:border-b-0 hover:bg-[#F6F4EF]/70 cursor-pointer">
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.issue}</td>
                                <td className="px-6 py-3 text-sm text-gray-500">{row.category}</td>
                                <td className="px-6 py-3 text-sm text-gray-500">{row.location}</td>
                                <td className="px-6 py-3">
                                    <Badge label={row.priority} styles={priorityStyles[row.priority]} />
                                </td>
                                <td className="px-6 py-3">
                                    <Badge label={row.status} styles={statusStyles[row.status]} />
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-500">{row.reported}</td>
                                <td className="flex items-center justify-center gap-3 px-6 py-3">
                                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-red-500/10 hover:text-red-700 cursor-pointer">
                                        <Trash2 size={16} />
                                    </button>
                                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-green-500/10 hover:text-green-700 cursor-pointer">
                                        <Pencil size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default IssuesTable;