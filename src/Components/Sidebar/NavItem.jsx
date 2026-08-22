function NavItem({ icon: Icon, label, active, collapsed, onClick, isLast }) {
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick?.();
            }}
            className={`flex mb-1 items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors  
            ${
            isLast  
                ? "text-red-600 hover:text-red-700 hover:bg-red-700/10"        
                : active
                    ? "font-semibold text-green-800 bg-green-700/10 "
                        : "font-medium text-neutral-600 hover:text-neutral-950 hover:bg-green-200/10"
            }`}
        >
            <Icon size={20} className="shrink-0"/>
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}
        </a>
    );
}

export default NavItem;