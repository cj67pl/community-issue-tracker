function IssuesTrend({ data }) {
    const maxCount = Math.max(...data.map((item) => item.count));
    const barStyles = [
        "bg-teal-700/40",
        "bg-teal-700/50",
        "bg-teal-700/60",
        "bg-teal-700/70",
        "bg-teal-700/80",
        "bg-teal-700",
    ];
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div>
                <h3 className="text-base font-bold text-gray-900">
                    Issues Trend
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Issues reported over the last 6 months.
                </p>
            </div>

            <div className="mt-6 flex h-64 items-end gap-3 sm:gap-5">
                {data.map((item, index) => {
                    const height =
                        maxCount > 0
                            ? (item.count / maxCount) * 100
                            : 0;

                    return (
                        <div
                            key={item.month}
                            className="flex h-full flex-1 flex-col items-center justify-end"
                        >
                            <p className="mb-2 text-xs font-semibold text-gray-600">
                                {item.count}
                            </p>

                            <div className="flex h-full w-full items-end">
                                <div
                                    className={`w-full rounded-t-md ${barStyles[index]} transition-all`}
                                    style={{
                                        height: `${height}%`,
                                    }}
                                />
                            </div>

                            <p className="mt-2 text-xs text-gray-400">
                                {item.month.slice(0, 3)}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default IssuesTrend;