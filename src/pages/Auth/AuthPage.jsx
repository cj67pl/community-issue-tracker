import { useState } from "react";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";

const creds = [
    {
        id: 1,
        role: "reporter",
        email: "maria.santos@tugon.edu.ph",
        password: "123"
    },
    {
        id: 1,
        role: "coordinator",
        email: "tom.cookerist@tugon.edu.ph",
        password: "123"
    },
    {
        id: 1,
        role: "admin",
        email: "admin@tugon.edu.ph",
        password: "123"
    }
]


function AuthPage({ onLoginSuccess }) {
    const [mode, setMode] = useState("login"); // "login" | "register"

    if (mode === "register") {
        return <Register 
                onLoginSuccess={onLoginSuccess}
                onSwitchToLogin={() => setMode("login")} />;
    }

    return <Login 
                onLoginSuccess={onLoginSuccess}
                onSwitchToRegister={() => setMode("register")}
                creds={creds}
                 />;
}

export default AuthPage;
