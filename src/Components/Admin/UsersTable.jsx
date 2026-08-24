import { Trash2 } from "lucide-react";
import Badge from "../../common/Badge.jsx";
import { roleOptions, roleStyles, statusStyles } from "./usersData.js";

const selectClass =
    "rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-gray-700 outline-none focus:border-teal-700";

function UsersTable({ users, onRoleChange, onRemove }) {
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                    <thead>
                        <tr className="border-y border-slate-200">
                            {["User", "Role", "Status", ""].map((heading) => (
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
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-slate-100 last:border-b-0">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-400">{user.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    {/* Role is the thing Admin can change that Coordinator can't */}
                                    <select
                                        value={user.role}
                                        onChange={(e) => onRoleChange(user.id, e.target.value)}
                                        className={`${selectClass} ${roleStyles[user.role]}`}
                                    >
                                        {roleOptions.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge label={user.status} styles={statusStyles[user.status]} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onRemove(user.id)}
                                        className="rounded-lg border border-slate-200 p-2 hover:bg-red-500/10 hover:text-red-700"
                                    >
                                        <Trash2 size={16} />
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

export default UsersTable;