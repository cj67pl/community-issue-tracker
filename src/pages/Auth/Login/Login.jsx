
import { useState } from "react";

import FormField from "../../../common/FormField.jsx";
import { inputClass } from "../../../common/formStyles.jsx";
import { apiRequest } from "../../../api/api.js";

function Login({ onSwitchToRegister, creds, onLoginSuccess }) {
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");

        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        // Frontend validation
        if (!cleanEmail) {
            setErrorMessage("Email is required.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (!cleanPassword) {
            setErrorMessage("Password is required.");
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email: cleanEmail,
                    password: cleanPassword,
                }),
            });

            onLoginSuccess(data);
        } catch (error) {
            console.error("LOGIN ERROR:", error);

            setErrorMessage(
                error.message === "Failed to fetch"
                    ? "Unable to connect to the server. Please try again."
                    : error.message || "Unable to sign in. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleDemoLogin(demoEmail) {
        setEmail(demoEmail);
        setPassword("demo123");
        setErrorMessage("");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F6F4EF] p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
                
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-700 text-lg font-bold text-white">
                        T
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-gray-900">
                            Tugon
                        </h1>

                        <p className="text-xs text-neutral-400">
                            Report. Respond. Resolve.
                        </p>
                    </div>
                </div>

                
                <h2 className="mt-8 text-2xl font-bold text-gray-900">
                    Welcome back
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                    Sign in to manage and resolve reported issues.
                </p>

                
                <div className="mt-6">
                    <FormField label="Email">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                            autoComplete="email"
                        />
                    </FormField>
                </div>

               
                <div className="mt-6">
                    <FormField label="Password">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputClass}
                            autoComplete="current-password"
                        />
                    </FormField>
                </div>

                
                {errorMessage && (
                    <p
                        className="mt-3 text-sm text-red-600"
                        role="alert"
                    >
                        {errorMessage}
                    </p>
                )}

                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded-lg bg-teal-700 py-3 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>

                {/* Demo Accounts */}
                <div className="mt-6 border-t border-gray-100 pt-5">
                    <div className="mb-3">
                        <h3 className="text-sm font-semibold text-gray-800">
                            Demo Accounts
                        </h3>

                        <p className="mt-1 text-xs text-neutral-400">
                            Use these accounts to explore different user roles.
                        </p>
                    </div>

                    <div className="space-y-2">
                        {/* Admin */}
                        <button
                            type="button"
                            onClick={() =>
                                handleDemoLogin("testadmin@example.com")
                            }
                            className="w-full rounded-lg border border-gray-100 bg-gray-50 p-3 text-left transition hover:border-teal-200 hover:bg-teal-50"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-700">
                                    Admin
                                </span>

                                <span className="text-xs text-neutral-400">
                                    Full access
                                </span>
                            </div>

                            <p className="mt-1 text-xs text-neutral-500">
                                testadmin@example.com
                            </p>
                        </button>

                        {/* Coordinator */}
                        <button
                            type="button"
                            onClick={() =>
                                handleDemoLogin(
                                    "testcoordinator@example.com"
                                )
                            }
                            className="w-full rounded-lg border border-gray-100 bg-gray-50 p-3 text-left transition hover:border-teal-200 hover:bg-teal-50"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-700">
                                    Coordinator
                                </span>

                                <span className="text-xs text-neutral-400">
                                    Issue management
                                </span>
                            </div>

                            <p className="mt-1 text-xs text-neutral-500">
                                testcoordinator@example.com
                            </p>
                        </button>

                        {/* Reporter */}
                        <button
                            type="button"
                            onClick={() =>
                                handleDemoLogin(
                                    "john.dc@example.com"
                                )
                            }
                            className="w-full rounded-lg border border-gray-100 bg-gray-50 p-3 text-left transition hover:border-teal-200 hover:bg-teal-50"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-700">
                                    Reporter
                                </span>

                                <span className="text-xs text-neutral-400">
                                    Report issues
                                </span>
                            </div>

                            <p className="mt-1 text-xs text-neutral-500">
                                john.dc@example.com
                            </p>
                        </button>
                    </div>

                    {/* Demo Password */}
                    <div className="mt-3 rounded-lg bg-teal-50 px-3 py-2 text-center">
                        <span className="text-xs text-neutral-500">
                            Demo password:
                        </span>{" "}
                        <span className="text-xs font-semibold text-teal-700">
                            1234password
                        </span>
                    </div>

                    <p className="mt-3 text-center text-[11px] leading-relaxed text-neutral-400">
                        Demo accounts are provided for portfolio
                        demonstration purposes only. Please do not enter real
                        or sensitive information.
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
