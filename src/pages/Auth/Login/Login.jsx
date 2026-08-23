import { useState } from "react";
import FormField from "../../../common/FormField.jsx";
import { inputClass } from "../../../common/formStyles.jsx";
import RoleToggle from "../../../components/AuthPages/RoleToggle/RoleToggle.jsx";

function Login() {
    const [role, setRole] = useState("coordinator");
    const [email, setEmail] = useState("maria.santos@tugon.edu.ph");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        // Demo mode for now — swap this for a real auth call later.
        console.log({ role, email, password, rememberMe });
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

                <h2 className="mt-8 text-2xl font-bold text-gray-900">Welcome back</h2>
                <p className="mt-1 text-sm text-neutral-500">
                    Sign in to manage and resolve reported issues.
                </p>

                <div className="mt-6">
                    <RoleToggle value={role} onChange={setRole} />
                </div>

                <div className="mt-6">
                    <FormField label="Email">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
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
                        />
                    </FormField>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded accent-teal-700"
                        />
                        Remember me
                    </label>
                    <a href="#" className="text-sm font-semibold text-teal-700 hover:underline">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full rounded-lg bg-teal-700 py-3 text-sm font-bold text-white hover:bg-teal-800"
                >
                    Sign In
                </button>

                <p className="mt-6 border-t border-slate-100 pt-4 text-center text-xs leading-relaxed text-neutral-400">
                    Demo mode — any email/password signs you in.
                    <br />
                    <span className="font-semibold text-neutral-500">Coordinator</span> manages all
                    issues · <span className="font-semibold text-neutral-500">Reporter</span> tracks
                    their own reports.
                </p>
            </form>
        </div>
    );
}

export default Login;