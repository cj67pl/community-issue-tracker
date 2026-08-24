import { useState } from "react";
import { UserPlus } from "lucide-react";
import UsersTable from "../../components/Admin/UsersTable.jsx";
import { usersData } from "../../components/Admin/usersData.js";

function AdminUsers() {
    const [users, setUsers] = useState(usersData);

    function handleRoleChange(id, newRole) {
        setUsers((prev) =>
            prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
        );
    }

    function handleRemove(id) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    }

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Users</h2>
                    <p className="mt-1 text-sm text-neutral-500">
                        Manage accounts and assign Coordinator or Admin access.
                    </p>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800">
                    <UserPlus size={16} />
                    Invite User
                </button>
            </div>

            <div className="mt-5">
                <UsersTable users={users} onRoleChange={handleRoleChange} onRemove={handleRemove} />
            </div>
        </div>
    );
}

export default AdminUsers;