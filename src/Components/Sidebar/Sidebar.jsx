import NavItem from "./NavItem.jsx";
import { mainNavItems, secondaryNavItems, bottomNavItems } from "./navConfig.jsx";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";


function Sidebar({ currentPage, onNavigate, isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile, }) {
    


    return (
        <>
        {isMobileOpen && (
            <div
                onClick={onCloseMobile}
                className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            />
        )}
            <aside className={`fixed inset-y-0 left-0 z-40 flex w-62 flex-col
          border-r border-slate-200 bg-white
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "lg:w-20" : "lg:w-62"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                {/* Logo */}
                <div className="flex h-20 items-center p-6 border-b border-slate-200">
                    <div className="flex bg-teal-700 w-5 h-5 p-4 justify-center items-center rounded-lg">
                        <span className="text-lg font-bold text-neutral-100">T</span>
                    </div>
                    {!isCollapsed && (
                        <div className="p-3">
                            <h1 className="font-bold text-xl">Tugon</h1>
                            <p className="font-thin text-[11px] text-olive-400 transition-all duration-300 ease-in-out">Report. Respond. Resolve</p>
                        </div>

                    )}
                    
                </div>

                {/* Navigation */}
                <nav className="p-3 py-5">
                    {mainNavItems.map((item) => (
                        <NavItem
                            key={item.key}
                            icon={item.icon}
                            label={item.label}
                            active={currentPage === item.key}
                            collapsed={isCollapsed}
                            onClick={() => onNavigate(item.key)}
                        />
                    ))}

                    <div className="border-b border-slate-200 px-5 last:text-red-600" />

                    {secondaryNavItems.map((item) => (
                        <NavItem
                            key={item.key}
                            icon={item.icon}
                            label={item.label}
                            active={currentPage === item.key}
                            collapsed={isCollapsed}
                            onClick={() => onNavigate(item.key)}
                        />
                    ))}
                </nav>

                <button
                    onClick={onToggleCollapse}
                    className="
                    absolute top-1/2 -right-4.5
                    p-2 hidden items-center justify-center rounded-4xl border border-slate-200 text-neutral-500 bg-teal-700/10 hover:bg-teal-700/20 hover:text-green-800 lg:flex"
                >
                    {isCollapsed ? (
                        <FaChevronRight size={18} />
                    ) : (
                        <>
                            <FaChevronLeft size={18} />
                            {/* <span className="text-xs font-medium">Collapse</span> */}
                        </>
                    )}
                </button>

                {/* Bottom section */}
                <div className="p-3 absolute w-full bottom-0 border-t border-slate-200">
                    {bottomNavItems.map((item, index) => (
                    
                        <NavItem
                            key={item.key}
                            icon={item.icon}
                            label={item.label}
                            active={currentPage === item.key}
                            collapsed={isCollapsed}
                            isLast={index === bottomNavItems.length - 1}
                            onClick={() => onNavigate(item.key)}
                        />
                    ))}
                </div>
            </aside>
        </>
        
    );
}

export default Sidebar;