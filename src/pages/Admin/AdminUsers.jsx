import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";

import UsersTable from "../../components/Admin/UsersTable.jsx";
import UserModal from "../../components/Admin/UserModal.jsx";
import ChangePasswordModal from "../../components/Admin/ChangePasswordModal.jsx";

import { apiRequest } from "../../api/api.js";

function AdminUsers() {
    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    
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