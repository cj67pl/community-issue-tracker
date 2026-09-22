import { useState, useEffect } from "react";
import AuthPage from "./pages/Auth/AuthPage.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Topbar from "./components/Topbar/Topbar.jsx";
import IssuesPage from "./pages/Shared/IssuesPage.jsx";
import Dashboard from "./pages/Coordinator/Dashboard.jsx";
import ReportIssue from "./pages/Shared/ReportIssue.jsx";
import Reports from "./pages/Coordinator/Reports.jsx";
import SettingsPage from "./pages/SupportPages/SettingsPage.jsx";
import HelpPage from "./pages/SupportPages/HelpPage.jsx";
import ReporterDashboard from "./pages/User/ReporterDashboard.jsx"
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminUsers from "./pages/Admin/AdminUsers.jsx";
import AdminCategories from "./pages/Admin/AdminCategories.jsx";
// import AdminIssues from "./pages/Admin/AdminIssues.jsx";
import AdminAnalytics from "./pages/Admin/AdminAnalytics.jsx";

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
		// console.log("handleLoginSuccess CALLED");
		// console.log("USER DATA:", userData);
		localStorage.setItem("token", userData.token);
		localStorage.setItem("user", JSON.stringify(userData.user));
		// console.log("USER:", JSON.parse(localStorage.getItem("user")));
		const user = userData.user;
		const role = roleNameById[user.role_id];
		const currentUser = {
			id:user.id,
			name:user.name,
			email:user.email,
			role: role,
			token: userData.token,

		}
		
		setCurrentUser(currentUser);
		setCurrentPage(defaultPageByRole[role] ?? "dashboard");
		
	}


	// console.log(currentUser.name);
	

	function handleLogout() {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
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
							{currentPage === "adminDashboard" && <AdminDashboard 
																	currentRole={currentUser.role}
																	onNavigate={setCurrentPage} />}
							{currentPage === "report" && <ReportIssue
																	currentRole={currentUser.role}
																	onNavigate={setCurrentPage} />}
							{currentPage === "adminUsers" && <AdminUsers 
																	currentRole={currentUser.role}
																	onNavigate={setCurrentPage} />}
							{currentPage === "adminCategories" && <AdminCategories 
																	currentRole={currentUser.role}
																	onNavigate={setCurrentPage} />}
							{currentPage === "issues" && <IssuesPage
																	currentRole={currentUser.role}
																	onNavigate={setCurrentPage} />}
							{currentPage === "adminAnalytics" && <AdminAnalytics 
																	currentRole={currentUser.role}
																	onNavigate={setCurrentPage} />}
							
							{currentPage === "settings" && <SettingsPage 
																	currentRole={currentUser.role}
																	onNavigate={setCurrentPage} />}
							{currentPage === "help" && <HelpPage />} 
						</>
					)}

					{/* REPORTER VIEWS */}
					{currentUser.role === "reporter" && (
						<>
							{/* Creates a specific landing component or reuses Dashboard */}
							{currentPage === "reporterdashboard" && <ReporterDashboard 
																		currentRole={currentUser.role} 
																		onNavigate={setCurrentPage} />}

							{currentPage === "report" && <ReportIssue 
																currentRole={currentUser.role} 
																onNavigate={setCurrentPage}/>}
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