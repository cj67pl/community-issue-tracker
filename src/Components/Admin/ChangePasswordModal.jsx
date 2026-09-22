import { useEffect, useState } from "react";
import { X } from "lucide-react";

function ChangePasswordModal({ isOpen, user, onClose, onSave }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            setPassword("");
            setConfirmPassword("");
            setError("");
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!password.trim()) {
            setError("Password cannot be empty.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        onSave(password);

        setPassword("");
        setConfirmPassword("");
        setError("");
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            Change Password
                        </h3>

                        {user && (
                            <p className="mt-1 text-xs text-gray-400">
                                {user.name} · {user.email}
                            </p>
                        )}
                    </div>

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
                            New Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-700"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm new password"
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-700"
                        />
                    </div>

                    {error && (
                        <p className="text-sm font-medium text-red-600">
                            {error}
                        </p>
                    )}

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
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordModal;