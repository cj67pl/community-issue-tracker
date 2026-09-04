import { useState, useEffect } from "react";
import AuthPage from "./pages/Auth/AuthPage.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Topbar from "./components/Topbar/Topbar.jsx";
import IssuesPage from "./pages/Coordinator/IssuesPage/IssuesPage.jsx";
import Dashboard from "./pages/Coordinator/Dashboard/Dashboard.jsx";
import ReportIssue from "./pages/Coordinator/ReportIssue/ReportIssue.jsx";
import Reports from "./pages/Coordinator/Reports/Reports.jsx";
import SettingsPage from "./pages/Coordinator/SettingsPage/SettingsPage.jsx";
import HelpPage from "./pages/Coordinator/HelpPage/HelpPage.jsx";
import AdminUsers from "./pages/Admin/Admin.jsx";
import ReporterDashboard from "./pages/User/ReporterDashboard/ReporterDashboard.jsx"
import ReporterReports from "./pages/User/ReporterReports/ReporterReports.jsx"
import "./App.css";
import { apiRequest } from "./api/api.js";

const roleNameById = {
	1: "admin",
	2: "coordinator",
	3: "reporter",
};

const defaultPageByRole = {
	admin: "adminUsers",
	coordinator: "dashboard",
	reporter: "reporterdashboard",
};

function App() {
	// currentUser is null when logged out, otherwise { email, role }.
	// Everything role-related (nav visibility, default page) derives from this.
	const [currentUser, setCurrentUser] = useState(null);
	const [currentPage, setCurrentPage] = useState("dashboard");
	const [isCollapsed, setCollapsed] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	
	useEffect(() => {
		const restoreSession = async () => {
			const token = localStorage.getItem("token");

			if (!token) {
				return;
			}

			try {
				const data = await apiRequest("/auth/me");

				const user = data.user;
				const role = roleNameById[user.role_id];
				const currentUser = {
					id: user.id,
					name: user.name,
					email: user.email,
					role: role,
				};
				setCurrentUser(currentUser);
				setCurrentPage(defaultPageByRole[currentUser.role] ?? "dashboard");

			}

			catch (error) {
				console.error("Failed to restore session:", error);
				localStorage.removeItem("token");

			};
		}
		restoreSession();
	}, []);


	function handleLoginSuccess(userData) {
		console.log("User: ", userData);
		localStorage.setItem("token", userData.token);
		
		const user = userData.user;
		const role = roleNameById[user.role_id]
		const currentUser = {
			id:user.id,
			name:user.name,
			email:user.email,
			role: roleNameById[user.role_id],
			token: userData.token,

		}
		
		setCurrentUser(currentUser);
		setCurrentPage(defaultPageByRole[userData.user.role] ?? "dashboard");
		
	}


	// console.log(currentUser.name);
	

	function handleLogout() {
		setCurrentUser(null);
	}

	function handleNavigate(key) {
		if (key === "logout") {
			handleLogout();
			return;
		}
		setCurrentPage(key);
		setIsMobileOpen(false);
	}

	if (!currentUser) {
		return <AuthPage onLoginSuccess={handleLoginSuccess} />;
	}

	return (
		<div className="min-h-screen bg-white text-slate-900">
			<Sidebar
				currentPage={currentPage}
				onNavigate={handleNavigate}
				role={currentUser.role}
				isCollapsed={isCollapsed}
				onToggleCollapse={() => setCollapsed((v) => !v)}
				isMobileOpen={isMobileOpen}
				onCloseMobile={() => setIsMobileOpen(false)}
			/>

			<div className={`${isCollapsed ? "lg:ml-20" : "lg:ml-62"}`}>
				<Topbar 
					onMenuClick={() => setIsMobileOpen(true)}
					currentUserName={currentUser.name}
					currentRole={currentUser.role}
				 />

				<div className="p-5 bg-[#F6F4EF] h-screen">
					{/* COORDINATOR VIEWS */}
					{currentUser.role === "coordinator" && (
						<>
							{currentPage === "dashboard" && <Dashboard onNavigate={setCurrentPage} />}
							{currentPage === "issues" && <IssuesPage 
																currentRole={currentUser.role} 
																onNavigate={setCurrentPage} />}
							{currentPage === "report" && <ReportIssue 
																currentRole={currentUser.role} 
																onNavigate={setCurrentPage} />}
							{currentPage === "reports" && <Reports />}
							{currentPage === "settings" && <SettingsPage />}
							{currentPage === "help" && <HelpPage />}
						</>
					)}

					{/* ADMIN VIEWS */}
					{currentUser.role === "admin" && (
						<>
							{currentPage === "adminUsers" && <AdminUsers />}
							{currentPage === "settings" && <SettingsPage />}
						</>
					)}

					{/* REPORTER VIEWS */}
					{currentUser.role === "reporter" && (
						<>
							{/* Creates a specific landing component or reuses Dashboard */}
							{currentPage === "reporterdashboard" && <ReporterDashboard />}
							{currentPage === "reporterreports" && <ReporterReports currentUser={currentUser}/>} {/* "My Reports" view */}
							{currentPage === "report" && <ReportIssue />}
							{currentPage === "settings" && <SettingsPage />}
							{currentPage === "help" && <HelpPage />}
						</>
					)}
				</div>

			</div>
		</div>
	);
}

export default App;