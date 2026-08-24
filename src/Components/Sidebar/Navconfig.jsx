import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    BarChart3,
    Users,
    Settings,
    HelpCircle,
    LogOut,
    Users,
} from "lucide-react";

// MATCH: "key" strings must exactly mirror the "currentPage" evaluations in App.jsx
export const mainNavItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["coordinator"] },
    { key: "reporterdashboard", label: "ReporterDashboard", icon: LayoutDashboard, roles: ["reporter"] },
    { key: "reporterreports", label: "ReporterReports", icon: LayoutDashboard, roles: ["reporter"] },
    { key: "issues", label: "Issues", icon: FileText, roles: ["coordinator", "admin"] },
    { key: "report", label: "Report Issues", icon: PlusCircle, roles: ["coordinator", "reporter", "admin"] },
    { key: "adminUsers", label: "AdminUsers", icon: Users, roles: ["admin"] },
];

export const secondaryNavItems = [
    { key: "reports", label: "Reports", icon: BarChart3, roles: ["coordinator", "admin", "reporter"] },
    { key: "adminUsers", label: "Users", icon: Users, roles: ["admin"] },
];

export const bottomNavItems = [
    { key: "settings", label: "Settings", icon: Settings, roles: ["coordinator", "reporter", "admin"] },
    { key: "help", label: "Help", icon: HelpCircle, roles: ["coordinator", "reporter", "admin"] },
    { key: "logout", label: "Logout", icon: LogOut, roles: ["coordinator", "reporter", "admin"] },
];
