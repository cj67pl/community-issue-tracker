import { useState } from "react";


import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Topbar from "./components/Topbar/Topbar.jsx";
import IssuesPage from "./pages/IssuesPage/IssuesPage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import "./App.css";

function App() {
	// Tracks which sidebar page is active, so Dashboard/Issues actually
	// switch instead of both rendering stacked on top of each other.
	const [currentPage, setCurrentPage] = useState("dashboard");
	const [isCollapsed, setCollapsed] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	const handleNavigate = (key) => {
		setCurrentPage(key);
		setIsMobileOpen(false);
	}
	return (
		<div className="min-h-screen bg-white text-slate-900">
			<Sidebar 
				currentPage={currentPage} 
				onNavigate={handleNavigate} 
				isCollapsed={isCollapsed}
				onToggleCollapse={() => setCollapsed((v) => !v)}
				isMobileOpen={isMobileOpen}
				onCloseMobile={() => setIsMobileOpen(false)}
				/>

			<div className={`${isCollapsed ? "lg:ml-20" : "lg:ml-62"}`}>
				<Topbar onMenuClick={() => { setIsMobileOpen(true); }}/>

				<div className="p-5 bg-[#F6F4EF] h-screen">
					{currentPage === "dashboard" && <Dashboard />}
					{currentPage === "issues" && <IssuesPage />}
				</div>
			</div>
		</div>
	);
}

export default App;