import { useState } from "react";
import FormField from "../../../common/FormField.jsx";
import { inputClass, disabledInputClass } from "../../../common/formStyles.jsx";
import NotificationRow from "../../../components/SettingsPage/NotificationRow/NotificationRow.jsx.jsx";

function SettingsPage() {

    const [fullName, setFullName] = useState("Maria Santos");
    const [email, setEmail] = useState("maria.santos@tugon.edu.ph");
    const [phone, setPhone] = useState("0917 123 4567");
    // Role is read-only here — it comes from account/permissions data,
    // not something the user edits from this form.
    const role = "Coordinator";

    const [notifications, setNotifications] = useState({
        email: true,
        newIssue: true,
        weeklySummary: false,
    });

    function toggleNotification(key) {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log({ fullName, email, phone, notifications });
    }
    return (
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="mt-1 text-sm text-neutral-500">
                Manage your profile and notification preferences.
            </p>

            
            <div className="mt-5 max-w-3xl rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h3 className="text-lg font-bold text-gray-900">Profile</h3>
                </div>

                <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
                    <FormField label="Full Name">
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={inputClass}
                        />
                    </FormField>

                    <FormField label="Role">
                        <input type="text" value={role} disabled className={disabledInputClass} />
                    </FormField>

                    <FormField label="Email">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                        />
                    </FormField>

                    <FormField label="Phone Number">
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={inputClass}
                        />
                    </FormField>
                </div>
            </div>

            
            <div className="mt-5 max-w-3xl rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                </div>

                <div>
                    <NotificationRow
                        title="Email notifications"
                        description="Get an email when an issue status changes."
                        checked={notifications.email}
                        onChange={() => toggleNotification("email")}
                    />
                    <NotificationRow
                        title="New issue alerts"
                        description="Notify me when a new issue is reported."
                        checked={notifications.newIssue}
                        onChange={() => toggleNotification("newIssue")}
                    />
                    <NotificationRow
                        title="Weekly summary"
                        description="Receive a weekly digest of open issues."
                        checked={notifications.weeklySummary}
                        onChange={() => toggleNotification("weeklySummary")}
                    />
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                    <button
                        type="button"
                        className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SettingsPage;