function ResolutionStats({ data }) {
    const statStyles = {
        "Resolved Issues": "text-emerald-600",
        "Average Resolution Time": "text-blue-600",
        "Pending Over 7 Days": "text-amber-600",
        "Pending Over 30 Days": "text-red-600",
    };
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div>
                <h3 className="text-base font-bold text-gray-900">
                    Resolution Statistics
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Summary of issue resolution performance.
                </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {data.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                    >
                        <p className="text-sm font-medium text-gray-500">
                            {item.label}
                        </p>

                        <p
                            className={`mt-2 text-xl font-bold ${statStyles[item.label] || "text-gray-900"
                                }`}
                        >
                            {item.value}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-400">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResolutionStats;