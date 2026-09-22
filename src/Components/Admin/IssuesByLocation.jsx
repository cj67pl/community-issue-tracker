function IssuesByLocation({ data }) {
    const maxCount = Math.max(
        ...data.map((item) => item.count)
    );

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div>
                <h3 className="text-base font-bold text-gray-900">
                    Top Reported Locations
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Locations with the highest number of reported issues.
                </p>
            </div>

            <div className="mt-6 space-y-5">
                {data.map((item) => {
                    const percentage =
                        maxCount > 0
                            ? (item.count / maxCount) * 100
                            : 0;

                    return (
                        <div key={item.location}>
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <p className="text-sm font-medium text-gray-700">
                                    {item.location}
                                </p>

                                <p className="text-sm font-semibold text-gray-900">
                                    {item.count}
                                </p>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-teal-700"
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

export default IssuesByLocation;