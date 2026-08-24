import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    BarChart3,
    Users,
    Settings,
    HelpCircle,
} from "lucide-react";

// "key" is what App.jsx uses to know which page is active/should render.
export const mainNavItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "issues", label: "Issues", icon: FileText },
    { key: "reportIssue", label: "Report Issues", icon: PlusCircle },
];

export const secondaryNavItems = [
    { key: "reports", label: "Reports", icon: BarChart3 },
    { key: "adminUsers", label: "Users", icon: Users },
];

export const bottomNavItems = [
    { key: "settings", label: "Settings", icon: Settings },
    { key: "help", label: "Help", icon: HelpCircle },
];