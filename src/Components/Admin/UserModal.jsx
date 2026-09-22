import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { roleOptions } from "./usersData.js";

function UserModal({ isOpen, user, onClose, onSave }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Reporter");
    const [status, setStatus] = useState("Active");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setStatus(user.status);
        } else {
            setName("");
            setEmail("");
            setRole("Reporter");
            setStatus("Active");
        }
    }, [user, isOpen]);

    if (!isOpen) {
        return null;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            return;
        }

        onSave({
            name: name.trim(),
            email: email.trim(),
            role,
            status,
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <h3 className="text-lg font-bold text-gray-900">
                        {user ? "Edit User" : "Add User"}
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter full name"
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-700"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-700"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-700"
                        >
                            {roleOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-700"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Invited">Invited</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                        >
                            {user ? "Save Changes" : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserModal;