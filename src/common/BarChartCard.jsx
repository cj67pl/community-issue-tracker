function BarChartCard({ title, data }) {
    const maxValue = Math.max(...data.map((d) => d.value));

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            </div>

            <div>
                {data.map((row) => (
                    <div
                        key={row.label}
                        className="flex items-center gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0"
                    >
                        <span className="w-24 shrink-0 text-sm font-semibold text-gray-900 sm:w-28">
                            {row.label}
                        </span>

                        <div className="h-2.5 flex-1 rounded-full bg-gray-100">
                            <div
                                className={`h-full rounded-full ${row.color}`}
                                style={{ width: `${(row.value / maxValue) * 100}%` }}
                            />
                        </div>

                        <span className="w-6 shrink-0 text-right text-sm text-gray-400">
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BarChartCard;