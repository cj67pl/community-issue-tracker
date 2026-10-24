
import { useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardList,
    ChartNoAxesCombined,
    Menu,
    MessageSquare,
    ShieldCheck,
    Users,
    X,
    Bell,
    Clock3,
} from "lucide-react";

const features = [
    {
        icon: ClipboardList,
        title: "Centralized Issue Reporting",
        description:
            "Give users one place to submit issues and keep important information organized.",
    },
    {
        icon: Clock3,
        title: "Status and Priority Tracking",
        description:
            "Monitor issue progress and help coordinators identify what needs attention.",
    },
    {
        icon: MessageSquare,
        title: "Comments and Notifications",
        description:
            "Keep issue-related discussions and relevant updates connected to each report.",
    },
    {
        icon: ChartNoAxesCombined,
        title: "Dashboards and Analytics",
        description:
            "Review issue summaries, categories, statuses, and performance information.",
    },
    {
        icon: Users,
        title: "Role-Based Access",
        description:
            "Provide reporters, coordinators, and administrators with role-appropriate views.",
    },
    {
        icon: ShieldCheck,
        title: "Organized Administration",
        description:
            "Manage user accounts and issue categories through dedicated administrative pages.",
    },
];

const steps = [
    {
        number: "01",
        title: "Report an issue",
        description:
            "Submit an issue with its description and relevant details.",
    },
    {
        number: "02",
        title: "Track its progress",
        description:
            "Follow status updates while coordinators review and manage the issue.",
    },
    {
        number: "03",
        title: "Work toward resolution",
        description:
            "Keep issue progress visible until it reaches a resolution.",
    },
];

const roles = [
    {
        title: "Reporter",
        description:
            "Submit issues and monitor the progress of your reports.",
    },
    {
        title: "Coordinator",
        description:
            "Review reports, manage issue progress, and monitor activity.",
    },
    {
        title: "Administrator",
        description:
            "Manage users and categories and review system-level information.",
    },
];

function Logo() {
    return (
        <a href="#home" className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E6F62] text-xl font-bold text-white">
                T
            </div>

            <div>
                <p className="text-lg font-bold leading-tight text-slate-900">
                    Tugon
                </p>
                <p className="text-[10px] text-slate-500">
                    Report. Respond. Resolve.
                </p>
            </div>
        </a>
    );
}

function ProductPreview() {
    return (
        <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#2E6F62]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div>
                        <p className="text-sm font-bold text-slate-800">
                            Issue Overview
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Monitor and manage reports
                        </p>
                    </div>

                    <div className="rounded-lg bg-[#2E6F62]/10 p-2 text-[#2E6F62]">
                        <ClipboardList size={19} />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 sm:p-5">
                    {[
                        { label: "Total Issues", value: "128" },
                        { label: "In Progress", value: "24" },
                        { label: "Resolved", value: "86" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-xl border border-slate-100 bg-[#F6F4EF]/70 p-3"
                        >
                            <p className="text-[10px] text-slate-500 sm:text-xs">
                                {item.label}
                            </p>
                            <p className="mt-2 text-xl font-bold text-slate-800">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="px-4 pb-5 sm:px-5">
                    <div className="rounded-xl border border-slate-100 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-800">
                                Recent Issues
                            </p>
                            <span className="text-xs text-slate-400">
                                Preview
                            </span>
                        </div>

                        {[
                            {
                                title: "Classroom equipment",
                                category: "Facilities",
                                status: "In Progress",
                                color: "bg-blue-50 text-blue-700",
                            },
                            {
                                title: "Network connectivity",
                                category: "IT Support",
                                status: "Pending",
                                color: "bg-amber-50 text-amber-700",
                            },
                            {
                                title: "Maintenance request",
                                category: "Maintenance",
                                status: "Resolved",
                                color: "bg-emerald-50 text-emerald-700",
                            },
                        ].map((issue) => (
                            <div
                                key={issue.title}
                                className="flex items-center justify-between gap-3 border-t border-slate-100 py-3 first:border-t-0"
                            >
                                <div className="min-w-0">
                                    <p className="truncate text-xs font-semibold text-slate-800 sm:text-sm">
                                        {issue.title}
                                    </p>
                                    <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                                        {issue.category}
                                    </p>
                                </div>

                                <span
                                    className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${issue.color}`}
                                >
                                    {issue.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-lg sm:flex sm:-left-8">
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                    <CheckCircle2 size={20} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-800">
                        Track every report
                    </p>
                    <p className="text-[10px] text-slate-500">
                        From submission to resolution
                    </p>
                </div>
            </div>
        </div>
    );
}

function LandingPage({ onLogin }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const navLinks = [
        { label: "Home", href: "#home" },
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "About", href: "#about" },
    ];

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#F6F4EF] text-slate-800">
            {/* Navigation */}
            <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#F6F4EF]/95 backdrop-blur-md">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
                    <Logo />

                    <div className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 transition hover:text-[#2E6F62]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <button
                            type="button"
                            onClick={onLogin}
                            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white"
                        >
                            Log In
                        </button>

                        <button
                            type="button"
                            onClick={onLogin}
                            className="flex items-center gap-2 rounded-lg bg-[#2E6F62] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24584E]"
                        >
                            Explore Demo
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <button
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="rounded-lg p-2 text-slate-700 hover:bg-white md:hidden"
                    >
                        {menuOpen ? <X size={23} /> : <Menu size={23} />}
                    </button>
                </nav>

                {menuOpen && (
                    <div className="border-t border-slate-200 bg-[#F6F4EF] px-5 py-4 md:hidden">
                        <div className="mx-auto flex max-w-7xl flex-col gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-white"
                                >
                                    {link.label}
                                </a>
                            ))}

                            <button
                                type="button"
                                onClick={() => {
                                    closeMenu();
                                    onLogin();
                                }}
                                className="mt-2 rounded-lg border border-[#2E6F62] px-4 py-3 text-sm font-semibold text-[#2E6F62]"
                            >
                                Log In
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    closeMenu();
                                    onLogin();
                                }}
                                className="rounded-lg bg-[#2E6F62] px-4 py-3 text-sm font-semibold text-white"
                            >
                                Explore Demo
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <main>
                {/* Hero */}
                <section
                    id="home"
                    className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
                >
                    <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2E6F62]/20 bg-white/70 px-3 py-2 text-xs font-semibold text-[#2E6F62]">
                                <span className="h-2 w-2 rounded-full bg-[#2E6F62]" />
                                Institutional Issue Management
                            </div>

                            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                Report.
                                <br />
                                Respond.
                                <br />
                                <span className="text-[#2E6F62]">
                                    Resolve.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                                A centralized way to report issues, track
                                progress, and coordinate responses across
                                your institution.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={onLogin}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#2E6F62] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2E6F62]/15 transition hover:-translate-y-0.5 hover:bg-[#24584E]"
                                >
                                    Explore Demo
                                    <ArrowRight size={17} />
                                </button>

                                <a
                                    href="#features"
                                    className="inline-flex items-center rounded-xl border border-slate-300 bg-white/60 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-white"
                                >
                                    Discover Features
                                </a>
                            </div>

                            <p className="mt-5 text-xs leading-5 text-slate-500">
                                Portfolio demonstration using sample data.
                                No real institutional data is required.
                            </p>
                        </div>

                        <ProductPreview />
                    </div>
                </section>

                {/* Problem and solution */}
                <section className="border-y border-slate-200/70 bg-white/60 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
                    <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2E6F62]">
                                The challenge
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Keep every report from getting lost in the
                                noise.
                            </h2>
                        </div>

                        <div>
                            <p className="leading-7 text-slate-600">
                                When issues are scattered across messages,
                                conversations, and separate records, tracking
                                their progress can become difficult. Tugon
                                brings reports together so users can review
                                issues, follow updates, and manage the next
                                steps in one place.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2E6F62]">
                                What Tugon offers
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Everything organized around the issue
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Tools for reporting, managing, and
                                understanding institutional issues.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <article
                                        key={feature.title}
                                        className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-[#2E6F62]/30 hover:shadow-lg hover:shadow-slate-900/5"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2E6F62]/10 text-[#2E6F62]">
                                            <Icon size={23} />
                                        </div>

                                        <h3 className="mt-5 text-base font-bold text-slate-900">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {feature.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section
                    id="how-it-works"
                    className="scroll-mt-24 bg-[#EAEDE5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2E6F62]">
                                A clear workflow
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                From reporting to resolution
                            </h2>
                        </div>

                        <div className="mt-10 grid gap-5 md:grid-cols-3">
                            {steps.map((step) => (
                                <article
                                    key={step.number}
                                    className="rounded-2xl border border-white bg-white/80 p-6 sm:p-8"
                                >
                                    <p className="text-sm font-bold text-[#2E6F62]">
                                        STEP {step.number}
                                    </p>

                                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {step.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* User roles and about */}
                <section
                    id="about"
                    className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2E6F62]">
                                Built around responsibilities
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                The right view for every role
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Different users have different
                                responsibilities. Tugon provides dedicated
                                views for each role.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 md:grid-cols-3">
                            {roles.map((role) => (
                                <article
                                    key={role.title}
                                    className="rounded-2xl border border-slate-200 bg-white/70 p-6"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2E6F62]/10 text-[#2E6F62]">
                                        <Users size={21} />
                                    </div>

                                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                                        {role.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {role.description}
                                    </p>
                                </article>
                            ))}
                        </div>

                        <div className="mt-16 rounded-3xl bg-[#2E6F62] px-6 py-10 text-center sm:px-12 sm:py-14">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                See how Tugon works.
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
                                Explore the interface and discover how
                                reporting, issue tracking, and management
                                come together.
                            </p>

                            <button
                                type="button"
                                onClick={onLogin}
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#2E6F62] transition hover:bg-[#F6F4EF]"
                            >
                                Explore Demo
                                <ArrowRight size={17} />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white/70 px-5 py-8 sm:px-8 lg:px-12">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2E6F62] font-bold text-white">
                            T
                        </div>

                        <div>
                            <p className="font-bold text-slate-900">
                                Tugon
                            </p>
                            <p className="text-xs text-slate-500">
                                Report. Respond. Resolve.
                            </p>
                        </div>
                    </div>

                    <p className="max-w-md text-xs leading-5 text-slate-500">
                        A full-stack portfolio project. The public demo
                        uses sample data and is intended for demonstration
                        purposes only.
                    </p>

                    <button
                        type="button"
                        onClick={onLogin}
                        className="self-start text-sm font-semibold text-[#2E6F62] hover:underline sm:self-auto"
                    >
                        Log In
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
