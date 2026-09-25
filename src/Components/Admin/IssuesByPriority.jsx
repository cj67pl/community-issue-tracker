import { useState, useEffect } from "react";

import { apiRequest } from "../../api/api";

function IssuesByPriority({ dateRange }) {
    
    const [issueData, setIssueData] = useState([]);
    const maxCount = Math.max(
        ...issueData.map((item) => item.count)
    );

    const priorityStyles = {
        High: "bg-red-600",
        Medium: "bg-amber-500",
        Low: "bg-teal-700",
    };

    
    
    
        useEffect(() => {
            async function fetchIssueTrends() {
    
                try {
                    const data = await apiRequest(`/analytics/count-priorities?range=${dateRange}`);
    
                    console.log("PPRIORITIES COUNT: ", data);
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
            <div>
                <h3 className="text-base font-bold text-gray-900">
                    Issues by Priority
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Distribution of reported issues by priority level.
                </p>
            </div>

            <div className="mt-6 space-y-5">
                {issueData.map((item) => {
                    const percentage =
                        maxCount > 0
                            ? (item.count / maxCount) * 100
                            : 0;

                    return (
                        <div key={item.id}>
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <p className="text-sm font-medium text-gray-700">
                                    {item.priority}
                                </p>

                                <p className="text-sm font-semibold text-gray-900">
                                    {item.count}
                                </p>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className={`h-full rounded-full ${priorityStyles[item.priority] ||
                                        "bg-teal-700"
                                        }`}
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default IssuesByPriority;