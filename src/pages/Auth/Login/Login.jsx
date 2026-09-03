import { useState } from "react";
import FormField from "../../../common/FormField.jsx";
import { inputClass } from "../../../common/formStyles.jsx";
import RoleToggle from "../../../components/AuthPages/RoleToggle.jsx";

import { apiRequest } from "../../../api/api.js";



function Login({ onSwitchToRegister, creds, onLoginSuccess }) {
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    

    function checkEntry({loginInfo}) {
        
    }

    // function handleSubmit(e) {
    //     e.preventDefault();

    //     setErrorMessage("");

    //     console.log("Form values being checked:", { email, password });
    //     // console.log({ role, email, password, rememberMe });
        
        
        
    //     // const matchedUser = creds.find(user =>
            
            
    //     //     user.email.toLowerCase().trim() === email.toLowerCase().trim() && 
    //     //     String(user.password) === String(password).trim()
            

    //     // );


    //     // if (matchedUser) {
    //     //     console.log("User matched successfully:", matchedUser);

    //     //     if (typeof setRole === "function") {
    //     //         setRole(matchedUser.role);
    //     //     }
    //     //     onLoginSuccess(matchedUser)
            
    //     // }
    //     // else {
    //     //     setErrorMessage("Invalid credentials.");
    //     //     console.log("Login failed: Invalid credentials."); 

    //     // }
    //     console.log(errorMessage);
        
    // }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");    
        try {
            const data = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            console.log("LOGIN SUCCESS:", data);
            
            onLoginSuccess(data);
        }
        catch (error) {
            console.error("LOGIN ERROR:", error);
            setErrorMessage(error.message || "An error occurred during login.");
            
        }

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

                {/* <div className="mt-6">
                    <RoleToggle value={role} onChange={setRole} />
                </div> */}

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

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <button
                    type="submit"
                    className="mt-6 w-full rounded-lg bg-teal-700 py-3 text-sm font-bold text-white hover:bg-teal-800"
                >
                    Sign In
                </button>

                <p className="mt-6 text-center text-sm text-neutral-500">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="font-semibold text-teal-700 hover:underline"
                    >
                        Register
                    </button>
                </p>

                <p className="mt-4 border-t border-slate-100 pt-4 text-center text-xs leading-relaxed text-neutral-400">
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