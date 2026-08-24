import NavItem from "./NavItem.jsx";
import { mainNavItems, secondaryNavItems, bottomNavItems } from "./navConfig.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Sidebar({ currentPage, onNavigate, isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile, role }) {

    // Normalize role string to handle unexpected casing bugs
    const userRole = String(role).toLowerCase().trim();

    return (
        <>
            {isMobileOpen && (
                <div
                    onClick={onCloseMobile}
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                />
            )}

            {/* Using flex-col and h-screen anchors elements to the active viewing screen bounds */}
            <aside className={`fixed inset-y-0 left-0 z-40 flex h-screen w-62 flex-col
              border-r border-slate-200 bg-white
              transition-all duration-300 ease-in-out
              ${isCollapsed ? "lg:w-20" : "lg:w-62"}
              ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

                {/* Logo Section Layout */}
                <div className="flex h-20 items-center p-6 border-b border-slate-200 flex-shrink-0">
                    <div className="flex bg-teal-700 w-5 h-5 p-4 justify-center items-center rounded-lg">
                        <span className="text-lg font-bold text-neutral-100">T</span>
                    </div>
                    {!isCollapsed && (
                        <div className="p-3">
                            <h1 className="font-bold text-xl">Tugon</h1>
                            <p className="font-thin text-[11px] text-slate-400">Report. Respond. Resolve</p>
                        </div>
                    )}
                </div>

                {/* Primary Content Scroll Section */}
                <nav className="p-3 py-5 flex-1 overflow-y-auto">
                    {/* Main Nav Items */}
                    {mainNavItems.map((item) => {
                        if (!item.roles.includes(userRole)) return null;
                        return (
                            <NavItem
                                key={item.key}
                                icon={item.icon}
                                label={item.label}
                                active={currentPage === item.key}
                                collapsed={isCollapsed}
                                onClick={() => onNavigate(item.key)}
                            />
                        );
                    })}

                    <div className="border-b border-slate-200 my-3 mx-2" />

                    {/* Secondary Nav Items */}
                    {secondaryNavItems.map((item) => {
                        if (!item.roles.includes(userRole)) return null;
                        return (
                            <NavItem
                                key={item.key}
                                icon={item.icon}
                                // Custom visual labeling override for the Reporter role
                                label={userRole === "reporter" && item.key === "reports" ? "My Reports" : item.label}
                                active={currentPage === item.key}
                                collapsed={isCollapsed}
                                onClick={() => onNavigate(item.key)}
                            />
                        );
                    })}
                </nav>

                {/* Sidebar Collapse Action Anchor */}
                <button
                    onClick={onToggleCollapse}
                    className="absolute top-1/2 -right-4.5 p-2 hidden items-center justify-center rounded-full border border-slate-200 text-neutral-500 bg-teal-700/10 hover:bg-teal-700/20 lg:flex z-50"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>

                {/* Bottom Footer Items (Pushed to bottom layout boundaries via flex) */}
                <div className="p-3 mt-auto border-t border-slate-200 bg-white w-full flex-shrink-0 pb-6">
                    {bottomNavItems.map((item) => {
                        if (!item.roles.includes(userRole)) return null;
                        return (
                            <NavItem
                                key={item.key}
                                icon={item.icon}
                                label={item.label}
                                active={currentPage === item.key}
                                collapsed={isCollapsed}
                                // Explicit structural check bypasses mathematical index calculation bugs entirely
                                isLast={item.key === "logout"}
                                onClick={() => onNavigate(item.key)}
                            />
                        );
                    })}
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
