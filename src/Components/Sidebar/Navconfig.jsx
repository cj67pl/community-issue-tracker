import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    BarChart3,
    Users,
    Settings,
    HelpCircle,
    LogOut,
    Tags,
} from "lucide-react";

export const mainNavItems = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        roles: ["coordinator"],
    },
    {
        key: "reporterdashboard",
        label: "Reporter Dashboard",
        icon: LayoutDashboard,
        roles: ["reporter"],
    },
    {
        key: "adminDashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        roles: ["admin"],
    },
    {
        key: "report",
        label: "Report Issues",
        icon: PlusCircle,
        roles: ["coordinator", "reporter", "admin"],
    },
];

export const secondaryNavItems = [
    // Existing coordinator access
    {
        key: "issues",
        label: "Issues",
        icon: FileText,
        roles: ["coordinator", "admin"],
    },
    {
        key: "reports",
        label: "Reports",
        icon: BarChart3,
        roles: ["coordinator"],
    },

    // Admin-only pages
    {
        key: "adminUsers",
        label: "Users",
        icon: Users,
        roles: ["admin"],
    },
    {
        key: "adminCategories",
        label: "Categories",
        icon: Tags,
        roles: ["admin"],
    },
    {
        key: "adminAnalytics",
        label: "Analytics",
        icon: BarChart3,
        roles: ["admin"],
    },
];

export const bottomNavItems = [
    {
        key: "settings",
        label: "Settings",
        icon: Settings,
        roles: ["coordinator", "reporter", "admin"],
    },
    {
        key: "help",
        label: "Help",
        icon: HelpCircle,
        roles: ["coordinator", "reporter", "admin"],
    },
    {
        key: "logout",
        label: "Logout",
        icon: LogOut,
        roles: ["coordinator", "reporter", "admin"],
    },
];