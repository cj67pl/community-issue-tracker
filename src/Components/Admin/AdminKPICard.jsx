import { ClipboardList } from "lucide-react";

function AnalyticsKPICard({
    label,
    value,
    description,
    icon: Icon = ClipboardList,
    accent = "teal",
}) {
    const accentStyles = {
        teal: "bg-teal-700/10 text-teal-700",
        emerald: "bg-emerald-600/10 text-emerald-600",
        blue: "bg-blue-600/10 text-blue-600",
        amber: "bg-amber-500/10 text-amber-600",
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        {description}
                    </p>
                </div>

                <div
                    className={`rounded-lg p-2.5 ${accentStyles[accent]
                        }`}
                >
                    <Icon size={20} />
                </div>
            </div>
        </div>
    );
}

export default AnalyticsKPICard;