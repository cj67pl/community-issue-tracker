import Badge from "../../common/Badge.jsx";
import {
    priorityStyles,
    statusStyles,
} from "./adminData.js";

function AdminRecentIssues({ issues }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
                <h3 className="text-base font-bold text-gray-900">
                    Recent Issues
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Latest issues reported in the system.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-200">
                            {[
                                "Issue",
                                "Category",
                                "Priority",
                                "Status",
                                "Date",
                            ].map((heading) => (
                                <th
                                    key={heading}
                                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {issues.map((issue) => (
                            <tr
                                key={issue.id}
                                className="border-b border-slate-100 last:border-b-0"
                            >
                                <td className="px-5 py-4">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {issue.title}
                                    </p>
                                </td>

                                <td className="px-5 py-4">
                                    <p className="text-sm text-gray-600">
                                        {issue.category}
                                    </p>
                                </td>

                                <td className="px-5 py-4">
                                    <Badge
                                        label={issue.priority}
                                        styles={
                                            priorityStyles[issue.priority]
                                        }
                                    />
                                </td>

                                <td className="px-5 py-4">
                                    <Badge
                                        label={issue.status}
                                        styles={
                                            statusStyles[issue.status]
                                        }
                                    />
                                </td>

                                <td className="px-5 py-4">
                                    <p className="text-sm text-gray-500">
                                        {issue.date}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminRecentIssues;