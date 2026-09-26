import { useState, useEffect } from "react";

import { apiRequest } from "../../api/api.js";

import {
    ClockAlert,
    CalendarCheck,
    Timer,
    CalendarDays,
} from "lucide-react";

// const data = [
//     {
//         label: "Overdue Issues",
//         value: 24,
//         description: "Unresolved issues past their resolution target",
//     },
//     {
//         label: "Resolved Within Target",
//         value: "82%",
//         description: "Resolved within the defined time target",
//     },
//     {
//         label: "Oldest Unresolved Issue",
//         value: "46 days",
//         description: "Age of the oldest unresolved issue",
//     },
//     {
//         label: "Pending Over 30 Days",
//         value: 7,
//         description: "Pending issues older than 30 days",
//     },
// ]

function ResolutionStats({ }) {
    const [resolutionStats, setResolutionStats] = useState(null);

    useEffect(() => {
        const fetchResolutionStats = async () => {
            try {
                const data = await apiRequest("/analytics/resolution-stats");

                setResolutionStats(data);
            } catch (error) {
                console.error(
                    "Failed to fetch resolution statistics:",
                    error
                );
            }
        };

        fetchResolutionStats();
    }, []);

    const resolutionStatsData = resolutionStats
        ? [
            {
                label: "Overdue Issues",
                value: resolutionStats.overdue_issues,
                description:
                    "Unresolved issues older than 7 days",
            },
            {
                label: "Resolved Within Target",
                value: resolutionStats.resolved_within_target,
                description:
                    "Issues resolved within 7 days",
            },
            {
                label: "Oldest Unresolved Issue",
                value: `${resolutionStats.oldest_unresolved_days} days`,
                description:
                    "Age of the oldest unresolved issue",
            },
            {
                label: "Pending Over 30 Days",
                value: resolutionStats.pending_over_30_days,
                description:
                    "Currently pending for more than 30 days",
            },
        ]
        : [];
    const statStyles = {
        "Overdue Issues": {
            color: "text-red-600",
            background: "bg-red-50",
            icon: ClockAlert,
        },
        "Resolved Within Target": {
            color: "text-emerald-600",
            background: "bg-emerald-50",
            icon: CalendarCheck,
        },
        "Oldest Unresolved Issue": {
            color: "text-blue-600",
            background: "bg-blue-50",
            icon: Timer,
        },
        "Pending Over 30 Days": {
            color: "text-amber-600",
            background: "bg-amber-50",
            icon: CalendarDays,
        },
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div>
                <h3 className="text-base font-bold text-gray-900">
                    Resolution Statistics
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Monitor delays and resolution performance.
                </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {resolutionStatsData.map((item) => {
                    const style = statStyles[item.label];
                    const Icon = style?.icon;

                    return (
                        <div
                            key={item.label}
                            className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">
                                    {item.label}
                                </p>

                                {Icon && (
                                    <div
                                        className={`rounded-lg p-2 ${style.background
                                            }`}
                                    >
                                        <Icon
                                            size={18}
                                            className={style.color}
                                        />
                                    </div>
                                )}
                            </div>

                            <p
                                className={`mt-4 text-2xl font-bold ${style?.color || "text-gray-900"
                                    }`}
                            >
                                {item.value}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-gray-400">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ResolutionStats;