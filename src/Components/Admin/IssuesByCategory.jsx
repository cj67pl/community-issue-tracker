function IssuesByCategory({ data }) {
    const maxCount = Math.max(...data.map((item) => item.count));
    const categoryColors = [
        "bg-teal-700",
        "bg-blue-600",
        "bg-violet-600",
        "bg-red-600",
        "bg-amber-500",
        "bg-cyan-600",
        "bg-pink-600",
        "bg-indigo-600",
        "bg-emerald-600",
        "bg-orange-500",
    ];
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div>
                <h3 className="text-base font-bold text-gray-900">
                    Issues by Category
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Distribution of reported issues by category.
                </p>
            </div>

            <div className="mt-6 space-y-5">
                {data.map((item, index) => {
                    const percentage =
                        maxCount > 0
                            ? (item.count / maxCount) * 100
                            : 0;

                    const color = categoryColors[index % categoryColors.length];

                    return (
                        <div key={item.category}>
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <p className="text-sm font-medium text-gray-700">
                                    {item.category}
                                </p>

                                <p className="text-sm font-semibold text-gray-900">
                                    {item.count}
                                </p>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className={`h-full rounded-full ${color} || "bg-teal-700"
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

export default IssuesByCategory;