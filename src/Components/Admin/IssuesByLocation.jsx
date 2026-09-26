import { useState, useEffect } from "react";

import { apiRequest } from "../../api/api";

const locationBarStyles = [
    "bg-teal-700",
    "bg-blue-600",
    "bg-violet-600",
    "bg-amber-500",
    "bg-slate-500",
];

function IssuesByLocation({ data, dateRange }) {

    const [issueData, setIssueData] = useState([]);
    const maxCount = Math.max(
        ...issueData.map((item) => item.count)
    );

    console.log("DATE RANGE: ", dateRange);
    

    useEffect(() => {
        async function fetchIssueTrends() {

            try {
                const data = await apiRequest(`/analytics/count-locations?range=${dateRange}`);

                console.log("LOCATIONS COUNT: ", data);
                setIssueData(data);
            }
            catch (error) {
                console.error(
                    "Failed to fetch issue tends: ", error
                );
            }
        }
        fetchIssueTrends();
    }, [dateRange]);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            {/* Header */}
            <div>
                <h3 className="text-base font-bold text-gray-900">
                    Top Reported Locations
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Locations with the highest number of reported issues.
                </p>
            </div>


            {/* Locations */}
            <div className="mt-6 space-y-4">
                {issueData.map((item, index) => {
                    const percentage =
                        maxCount > 0
                            ? (item.count / maxCount) * 100
                            : 0;

                    return (
                        <div
                            key={item.location}
                            className="
                                rounded-lg
                                border border-transparent
                                p-3
                                transition
                                hover:border-gray-200
                                hover:bg-gray-50
                            "
                        >
                            <div className="flex items-center gap-3">

                                {/* Rank */}
                                <div
                                    className={`
                                        flex h-8 w-8 shrink-0
                                        items-center justify-center
                                        rounded-full
                                        text-xs font-bold
                                        ${index === 0
                                            ? "bg-teal-100 text-teal-700"
                                            : index === 1
                                                ? "bg-slate-100 text-slate-600"
                                                : index === 2
                                                    ? "bg-amber-50 text-amber-600"
                                                    : "bg-gray-100 text-gray-500"
                                        }
                                    `}
                                >
                                    {index + 1}
                                </div>


                                {/* Location + Bar */}
                                <div className="min-w-0 flex-1">

                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <p className="truncate text-sm font-semibold text-gray-700">
                                            {item.location}
                                        </p>

                                        <p className="shrink-0 text-sm font-bold text-gray-900">
                                            {item.count}
                                        </p>
                                    </div>

                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className={`h-full rounded-full transition-all ${locationBarStyles[index] || "bg-slate-500"
                                                }`}
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>

                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default IssuesByLocation;