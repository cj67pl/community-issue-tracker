function AdminIssueStatus({ data }) {
    const total = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div>
                <h3 className="text-base font-bold text-gray-900">
                    Issue Status
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Current distribution of reported issues.
                </p>
            </div>

            <div className="mt-6 space-y-5">
                {data.map((item) => {
                    const percentage =
                        total > 0 ? Math.round((item.count / total) * 100) : 0;

                    return (
                        <div key={item.label}>
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-700">
                                    {item.label}
                                </p>

                                <p className="text-sm font-semibold text-gray-900">
                                    {item.count}
                                </p>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className="h-full rounded-full bg-teal-700"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                            <p className="mt-1 text-right text-xs text-gray-400">
                                {percentage}%
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminIssueStatus;