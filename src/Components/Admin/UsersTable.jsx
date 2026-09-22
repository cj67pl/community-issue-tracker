import { Edit, KeyRound, Power } from "lucide-react";
import Badge from "../../common/Badge.jsx";
import { roleOptions, roleStyles, statusStyles } from "./usersData.js";

const selectClass =
    "rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-gray-700 outline-none focus:border-teal-700";

function UsersTable({
    users,
    onRoleChange,
    onEdit,
    onChangePassword,
    onToggleStatus,
}) {
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse text-left">
                    <thead>
                        <tr className="border-y border-slate-200">
                            {["User", "Role", "Status", "Actions"].map(
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
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-slate-100 last:border-b-0"
                            >
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {user.name}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        {user.email}
                                    </p>
                                </td>

                                <td className="px-6 py-4">
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            onRoleChange(
                                                user.id,
                                                e.target.value
                                            )
                                        }
                                        className={`${selectClass} ${roleStyles[user.role]}`}
                                    >
                                        {roleOptions.map((role) => (
                                            <option
                                                key={role}
                                                value={role}
                                            >
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="px-6 py-4">
                                    <Badge
                                        label={user.status}
                                        styles={statusStyles[user.status]}
                                    />
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="rounded-lg border border-slate-200 p-2 hover:bg-teal-500/10 hover:text-teal-700"
                                            title="Edit user"
                                        >
                                            <Edit size={16} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                onChangePassword(user)
                                            }
                                            className="rounded-lg border border-slate-200 p-2 hover:bg-sky-500/10 hover:text-sky-700"
                                            title="Change password"
                                        >
                                            <KeyRound size={16} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                onToggleStatus(user.id)
                                            }
                                            className="rounded-lg border border-slate-200 p-2 hover:bg-amber-500/10 hover:text-amber-700"
                                            title={
                                                user.status === "Active"
                                                    ? "Deactivate user"
                                                    : "Activate user"
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

export default UsersTable;