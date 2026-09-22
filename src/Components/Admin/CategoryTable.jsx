import { Edit, Power } from "lucide-react";

import Badge from "../../common/Badge.jsx";
import { statusStyles } from "./categoriesData.js";

function CategoryTable({ categories, onEdit, onToggleStatus }) {
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse text-left">
                    <thead>
                        <tr className="border-y border-slate-200">
                            {[
                                "Category",
                                "Description",
                                "Issues",
                                "Status",
                                "Actions",
                            ].map((heading) => (
                                <th
                                    key={heading}
                                    className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr
                                key={category.id}
                                className="border-b border-slate-100 last:border-b-0"
                            >
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {category.name}
                                    </p>
                                </td>

                                <td className="max-w-xs px-6 py-4">
                                    <p className="text-sm text-gray-500">
                                        {category.description}
                                    </p>
                                </td>

                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-gray-700">
                                        {category.issueCount}
                                    </p>
                                </td>

                                <td className="px-6 py-4">
                                    <Badge
                                        label={category.status}
                                        styles={statusStyles[category.status]}
                                    />
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onEdit(category)}
                                            className="rounded-lg border border-slate-200 p-2 hover:bg-teal-500/10 hover:text-teal-700"
                                            title="Edit category"
                                        >
                                            <Edit size={16} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                onToggleStatus(category.id)
                                            }
                                            className="rounded-lg border border-slate-200 p-2 hover:bg-amber-500/10 hover:text-amber-700"
                                            title={
                                                category.status === "Active"
                                                    ? "Deactivate category"
                                                    : "Activate category"
                                            }
                                        >
                                            <Power size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CategoryTable;