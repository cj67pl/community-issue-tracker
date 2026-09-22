import { ClipboardList } from "lucide-react";

function AnalyticsKPICard({
    label,
    value,
    description,
    icon: Icon = ClipboardList,
}) {
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

                <div className="rounded-lg bg-teal-700/10 p-2.5 text-teal-700">
                    <Icon size={20} />
                </div>
            </div>
        </div>
    );
}

export default AnalyticsKPICard;