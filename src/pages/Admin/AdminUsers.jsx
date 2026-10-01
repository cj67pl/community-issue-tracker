import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";

import UsersTable from "../../components/Admin/UsersTable.jsx";
import UserModal from "../../components/Admin/UserModal.jsx";
import ChangePasswordModal from "../../components/Admin/ChangePasswordModal.jsx";
import FilterSelect from "../../common/FilterSelect.jsx";

import { apiRequest } from "../../api/api.js";

const roleFilterOptions = [
    { value: "all", label: "All roles" },
    { value: "1", label: "Admin" },
    { value: "2", label: "Coordinator" },
    { value: "3", label: "Reporter" },
];

const statusFilterOptions = [
    { value: "all", label: "All status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
];

function AdminUsers() {
    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const [search, setSearch] = useState("");

    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 10;

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, roleFilter, statusFilter]);
    
    //fetch users
    async function fetchUsers() {
        try {
            const usersData = await apiRequest("/users");

            console.log("USERS:", usersData);

            setUsers(usersData);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }

    //open modals
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

    //create or edit user
    async function handleSaveUser(userData) {
        try {
            if (selectedUser) {
                // EDIT EXISTING USER
                // Only name + email
                
                const response = await apiRequest(
                    `/users/${selectedUser.id}`,
                    {
                        method: "PATCH",
                        body: JSON.stringify({
                            name: userData.name,
                            email: userData.email,
                        }),
                    }
                );

                setUsers((prev) =>
                    prev.map((user) =>
                        user.id === selectedUser.id
                            ? {
                                ...user,
                                ...response.user,
                            }
                            : user
                    )
                );
            } else {
                // CREATE NEW USER
                // name + email + password + role + is_active

                const response = await apiRequest("/users", {
                    method: "POST",
                    body: JSON.stringify(userData),
                });

                setUsers((prev) => [
                    ...prev,
                    response.user,
                ]);
            }

            closeUserModal();
        } catch (error) {
            console.error("Failed to save user:", error);
        }
    }

    
    //change role
    async function handleRoleChange(id, newRoleId) {
        try {
            const response = await apiRequest(
                `/users/${id}/role`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        role: Number(newRoleId),
                    }),
                }
            );

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === id
                        ? {
                            ...user,
                            ...response.user,
                        }
                        : user
                )
            );
        } catch (error) {
            console.error("Failed to update role:", error);

            // Restore actual backend state
            await fetchUsers();
        }
    }


    //toggle stats
    async function handleToggleStatus(user) {
        try {
            const newStatus = !user.is_active;

            const response = await apiRequest(
                `/users/${user.id}/status`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        is_active: newStatus,
                    }),
                }
            );

            setUsers((prev) =>
                prev.map((item) =>
                    item.id === user.id
                        ? {
                            ...item,
                            ...response.user,
                        }
                        : item
                )
            );
        } catch (error) {
            console.error("Failed to update status:", error);

            await fetchUsers();
        }
    }

   
    //change pass
    async function handleSavePassword(password) {
        if (!selectedUser) return;

        try {
            await apiRequest(
                `/users/${selectedUser.id}/password`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        password,
                    }),
                }
            );

            closePasswordModal();
        } catch (error) {
            console.error(
                "Failed to change password:",
                error
            );
        }
    }

    
   
    //close modals
    function closeUserModal() {
        setIsUserModalOpen(false);
        setSelectedUser(null);
    }

    function closePasswordModal() {
        setIsPasswordModalOpen(false);
        setSelectedUser(null);
    }


    const filteredUsers = users.filter((user) => {
        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
            user.name.toLowerCase().includes(searchValue) ||
            user.email.toLowerCase().includes(searchValue);

        const matchesRole =
            roleFilter === "all" ||
            Number(user.role_id) === Number(roleFilter);

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && user.is_active) ||
            (statusFilter === "inactive" && !user.is_active);

        return matchesSearch && matchesRole && matchesStatus;
    });
    
    const totalPages = Math.ceil(
        filteredUsers.length / usersPerPage
    );

    const startIndex = (currentPage - 1) * usersPerPage;

    const paginatedUsers = filteredUsers.slice(
        startIndex,
        startIndex + usersPerPage
    );

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
                <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search users..."
                        className="
                            w-full lg:max-w-sm
                            rounded-lg border border-slate-200
                            bg-white px-4 py-2.5
                            text-sm text-slate-700
                            outline-none
                            focus:border-teal-700
                            focus:ring-1 focus:ring-teal-700
                        "
                    />

                    
                    <div className="flex gap-2">
                        <FilterSelect
                            name="role"
                            placeholder="All roles"
                            options={roleFilterOptions}
                            value={roleFilter}
                            onChange={setRoleFilter}
                        />

                        <FilterSelect
                            name="status"
                            placeholder="All status"
                            options={statusFilterOptions}
                            value={statusFilter}
                            onChange={setStatusFilter}
                        />
                    </div>
                </div>

                <UsersTable
                    users={paginatedUsers}
                    onRoleChange={handleRoleChange}
                    onEdit={handleEditUser}
                    onChangePassword={handleChangePassword}
                    onToggleStatus={handleToggleStatus}
                />
                {filteredUsers.length > 0 && (
                    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-500">
                            Showing{" "}
                            <span className="font-medium text-slate-700">
                                {startIndex + 1}
                            </span>
                            {" "}to{" "}
                            <span className="font-medium text-slate-700">
                                {Math.min(
                                    startIndex + usersPerPage,
                                    filteredUsers.length
                                )}
                            </span>
                            {" "}of{" "}
                            <span className="font-medium text-slate-700">
                                {filteredUsers.length}
                            </span>
                            {" "}users
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                                disabled={currentPage === 1}
                                className="
                                    rounded-lg border border-slate-200
                                    px-3 py-2 text-xs font-medium
                                    text-slate-600
                                    hover:bg-slate-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-40
                                "
                            >
                                Previous
                            </button>

                            <span className="text-xs text-slate-500">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="
                                    rounded-lg border border-slate-200
                                    px-3 py-2 text-xs font-medium
                                    text-slate-600
                                    hover:bg-slate-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-40
                                "
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
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