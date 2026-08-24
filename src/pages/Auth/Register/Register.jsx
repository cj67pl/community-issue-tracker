import { useState } from "react";
import FormField from "../../../common/FormField.jsx";
import { inputClass } from "../../../common/formStyles.jsx";
import RoleToggle from "../../../components/AuthPages/RoleToggle.jsx";

function Register({ onSwitchToLogin }) {
    const [role, setRole] = useState("reporter");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }
        if (!agreedToTerms) {
            setError("Please agree to the terms to continue.");
            return;
        }

        setError("");
        // Demo mode for now — swap this for a real sign-up call later.
        console.log({ role, fullName, email, password });
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
                        <h1 className="text-lg font-bold text-gray-900">Tugon</h1>
                        <p className="text-xs text-neutral-400">Report. Respond. Resolve.</p>
                    </div>
                </div>

                <h2 className="mt-8 text-2xl font-bold text-gray-900">Create an account</h2>
                <p className="mt-1 text-sm text-neutral-500">
                    Sign up to start reporting or managing issues.
                </p>

                {/* <div className="mt-6">
                    <RoleToggle value={role} onChange={setRole} />
                </div> */}

                <div className="mt-6">
                    <FormField label="Full Name">
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Juan Dela Cruz"
                            className={inputClass}
                        />
                    </FormField>
                </div>

                <div className="mt-6">
                    <FormField label="Email">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@tugon.edu.ph"
                            className={inputClass}
                        />
                    </FormField>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField label="Password">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputClass}
                        />
                    </FormField>

                    <FormField label="Confirm Password">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={inputClass}
                        />
                    </FormField>
                </div>

                <label className="mt-4 flex items-start gap-2 text-sm text-gray-700">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-teal-700"
                    />
                    I agree to the Terms of Service and Privacy Policy.
                </label>

                {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

                <button
                    type="submit"
                    className="mt-6 w-full rounded-lg bg-teal-700 py-3 text-sm font-bold text-white hover:bg-teal-800"
                >
                    Create Account
                </button>

                <p className="mt-6 text-center text-sm text-neutral-500">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="font-semibold text-teal-700 hover:underline"
                    >
                        Sign in
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Register;