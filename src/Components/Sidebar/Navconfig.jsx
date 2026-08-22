import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    BarChart3,
    Settings,
    HelpCircle,
    LogOut,
} from "lucide-react";



// "key" is what App.jsx uses to know which page is active/should render.
export const mainNavItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "issues", label: "Issues", icon: FileText },
    { key: "report", label: "Report Issues", icon: PlusCircle },
];

export const secondaryNavItems = [
    { key: "reports", label: "Reports", icon: BarChart3 },
];

export const bottomNavItems = [
    { key: "settings", label: "Settings", icon: Settings },
    { key: "help", label: "Help", icon: HelpCircle },
    { key: "logout", label: "Logout", icon: LogOut },
];