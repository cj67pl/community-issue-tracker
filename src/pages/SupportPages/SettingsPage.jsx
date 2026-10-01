import { useState, useEffect } from "react";
import FormField from "../../common/FormField.jsx";
import { inputClass, disabledInputClass } from "../../common/formStyles.jsx";
import NotificationRow from "../../components/SettingsPage/NotificationRow.jsx";
import { apiRequest } from "../../api/api.js";
import { HexColorPicker } from "react-colorful";

function SettingsPage() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [profileColor, setProfileColor] = useState("#2E6F62");
    
    // const [notifications, setNotifications] = useState({
    //     email: true,
    //     newIssue: true,
    //     weeklySummary: false,
    // });

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    async function getUser() {
        try {
            const data = await apiRequest(`/users/${userId}`);
            setFullName(data.user.name);
            setEmail(data.user.email);
            setPhone(data.user.phone ?? "");
            setRole(data.user.role);
            setProfileColor(data.user.profile_color ?? "#2E6F62");
        }
        catch (error) {
            console.error("Failed to fetch user:", error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    // function toggleNotification(key) {
    //     setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    // }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log({ fullName, email, phone, profileColor });
        try {
            const data = await apiRequest(`/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: fullName,
                    email,
                    phone,
                    profile_color: profileColor,
                }),
            });

            console.log(data);
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    }
    return (
        <>
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
                        <FormField label="Profile Color">
                            <div className="flex items-start gap-5">
                                <div>
                                    <HexColorPicker
                                        color={profileColor}
                                        onChange={setProfileColor}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div
                                        className="h-12 w-12 rounded-full border border-slate-200"
                                        style={{ backgroundColor: profileColor }}
                                    />

                                    <span className="text-sm text-slate-500">
                                        {profileColor}
                                    </span>
                                </div>
                            </div>
                        </FormField>
                    </div>
                    <div className="flex justify-end border-t border-slate-200 px-6 py-4"> 
                        <button type="submit" className=" rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800 " > 
                            Save Changes 
                        </button> 
                    </div>
                </div>

                
                {/* <div className="mt-5 max-w-3xl rounded-xl border border-gray-200 bg-white shadow-sm">
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
                </div> */}
            </form>

            {
                showSuccessModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                        <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                            <div className="text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                                    <span className="text-xl text-teal-700">✓</span>
                                </div>

                                <h3 className="mt-4 text-lg font-bold text-gray-900">
                                    Profile Updated
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Your profile information has been saved successfully.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setShowSuccessModal(false)}
                                    className="mt-5 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
        
    )
}

export default SettingsPage;