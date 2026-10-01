import { Trash2, Pencil } from "lucide-react";
import Badge from "../../common/Badge.jsx";
import { priorityStyles, statusStyles } from "../issuesData.js";

function IssuesTable({ issues, onSelectIssue, onDeleteIssue, currentRole }) {
    const columns = [
        "Issue",
        "Category",
        "Location",
        "Priority",
        "Status",
        "Reported By",
        ...(currentRole !== "reporter" ? ["Assigned To"] : []),
        "Actions",
    ];

    // console.log(currentRole);

    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="max-h-[620px] overflow-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                    <thead className="sticky top-0 z-10 bg-slate-50">
                        <tr className="border-y border-slate-200">
                            {columns.map((heading) => (
                                <th
                                    key={heading}
                                    className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {issues.map((row) => {
                            const isResolved = row.status === "Resolved";

                            return (
                                <tr
                                    key={row.id}
                                    onClick={() => {
                                        onSelectIssue(row.id);
                                    }}
                                    className={`
                                        border-b border-slate-200
                                        last:border-b-0
                                        cursor-pointer
                                        transition-colors
                                        ${isResolved
                                            ? "bg-green-50/50 hover:bg-green-50"
                                            : "bg-white hover:bg-[#F6F4EF]/70"
                                        }
                                    `}
                                >
                                    {/* Issue */}
                                    <td className="px-6 py-4">
                                        <div
                                            className={`
                                                max-w-[240px] truncate text-sm font-semibold
                                                ${isResolved
                                                    ? "text-slate-600"
                                                    : "text-gray-900"
                                                }
                                            `}
                                            title={row.title}
                                        >
                                            {row.title}
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {row.category}
                                    </td>

                                    {/* Location */}
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {row.location}
                                    </td>

                                    {/* Priority */}
                                    <td className="px-6 py-4">
                                        <Badge
                                            label={row.priority}
                                            styles={priorityStyles[row.priority]}
                                        />
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <Badge
                                            label={row.status}
                                            styles={statusStyles[row.status]}
                                        />
                                    </td>

                                    {/* Reported By */}
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {row.reported_by}
                                    </td>

                                    {/* Assigned To */}
                                    {currentRole !== "reporter" && (
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {row.assigned_to_name || "Unassigned"}
                                        </td>
                                    )}

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            {row.status === "Pending" && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDeleteIssue(row.id);
                                                    }}
                                                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}

                                            {(currentRole !== "reporter" ||
                                                row.status === "Pending") && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onSelectIssue(row.id);
                                                        }}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-green-50 hover:text-green-700"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default IssuesTable;