import { useState } from "react";
import { UserPlus } from "lucide-react";

import UsersTable from "../../components/Admin/UsersTable.jsx";
import UserModal from "../../components/Admin/UserModal.jsx";
import ChangePasswordModal from "../../components/Admin/ChangePasswordModal.jsx";

import { usersData } from "../../components/Admin/usersData.js";

function AdminUsers() {
    const [users, setUsers] = useState(usersData);

    const [selectedUser, setSelectedUser] = useState(null);

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    function handleAddUser() {
        setSelectedUser(null);
        setIsUserModalOpen(true);
    }

    function handleEditUser(user) {
        setSelectedUser(user);
        setIsUserModalOpen(true);
    }

    function handleChangePassword(user) {
        setSelectedUser(user);
        setIsPasswordModalOpen(true);
    }

    function handleRoleChange(id, newRole) {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id
                    ? { ...user, role: newRole }
                    : user
            )
        );
    }

    function handleToggleStatus(id) {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id
                    ? {
                        ...user,
                        status:
                            user.status === "Active"
                                ? "Inactive"
                                : "Active",
                    }
                    : user
            )
        );
    }

    function handleSaveUser(userData) {
        if (selectedUser) {
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, ...userData }
                        : user
                )
            );
        } else {
            const newUser = {
                id: Date.now(),
                ...userData,
            };

            setUsers((prev) => [...prev, newUser]);
        }

        setIsUserModalOpen(false);
        setSelectedUser(null);
    }

    function handleSavePassword(password) {
        console.log(
            "Password changed for:",
            selectedUser?.email,
            password
        );

        setIsPasswordModalOpen(false);
        setSelectedUser(null);
    }

    function closeUserModal() {
        setIsUserModalOpen(false);
        setSelectedUser(null);
    }

    function closePasswordModal() {
        setIsPasswordModalOpen(false);
        setSelectedUser(null);
    }

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Users
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                        Manage accounts and assign Coordinator or Admin
                        access.
                    </p>
                </div>

                <button
                    onClick={handleAddUser}
                    className="flex items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
                >
                    <UserPlus size={16} />
                    Add User
                </button>
            </div>

            <div className="mt-5">
                <UsersTable
                    users={users}
                    onRoleChange={handleRoleChange}
                    onEdit={handleEditUser}
                    onChangePassword={handleChangePassword}
                    onToggleStatus={handleToggleStatus}
                />
            </div>

            <UserModal
                isOpen={isUserModalOpen}
                user={selectedUser}
                onClose={closeUserModal}
                onSave={handleSaveUser}
            />

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                user={selectedUser}
                onClose={closePasswordModal}
                onSave={handleSavePassword}
            />
        </div>
    );
}

export default AdminUsers;