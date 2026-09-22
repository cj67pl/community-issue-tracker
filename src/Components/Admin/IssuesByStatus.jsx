function IssuesByStatus({ data }) {
    const total = data.reduce(
        (sum, item) => sum + item.count,
        0
    );

    const statusStyles = {
        Pending: "bg-amber-500",
        "In Progress": "bg-blue-600",
        Resolved: "bg-emerald-600",
        Rejected: "bg-gray-600",
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div>
                <h3 className="text-base font-bold text-gray-900">
                    Issues by Status
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Current distribution of issue statuses.
                </p>
            </div>

            <div className="mt-6 space-y-5">
                {data.map((item) => {
                    const percentage =
                        total > 0
                            ? (item.count / total) * 100
                            : 0;

                    return (
                        <div key={item.status}>
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-700">
                                    {item.status}
                                </p>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">
                                        {item.count}
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        ({percentage.toFixed(1)}%)
                                    </span>
                                </div>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className={`h-full rounded-full ${statusStyles[item.status] || "bg-teal-700"
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

export default IssuesByStatus;