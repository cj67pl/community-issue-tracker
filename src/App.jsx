import { useState } from "react";
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

// The default page each role lands on right after logging in.
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
	

	function handleLoginSuccess(user) {
		console.log("User: ", user);
		
		setCurrentUser(user);
		setCurrentPage(defaultPageByRole[user.role] ?? "dashboard");
	}

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
				<Topbar onMenuClick={() => setIsMobileOpen(true)} />

				<div className="p-5 bg-[#F6F4EF] h-screen">
					{/* COORDINATOR VIEWS */}
					{currentUser.role === "coordinator" && (
						<>
							{currentPage === "dashboard" && <Dashboard />}
							{currentPage === "issues" && <IssuesPage />}
							{currentPage === "report" && <ReportIssue />}
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
							{currentPage === "reporterreports" && <ReporterReports />} {/* "My Reports" view */}
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