function PeriodComparison({ data }) {
    const { current, previous } = data;

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div>
                <h3 className="text-base font-bold text-gray-900">
                    Period Comparison
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Compare issue activity and resolution performance
                    with the previous period.
                </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Current Period */}
                <div className="rounded-lg border border-teal-100 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-700">
                        {current.label}
                    </p>

                    <div className="mt-4 space-y-4">
                        <div>
                            <p className="text-xs text-gray-500">
                                Issues Reported
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                                {current.issues}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Issues Resolved
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                                {current.resolved}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Average Resolution Time
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                                {current.average_resolution_time}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Previous Period */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-600">
                        {previous.label}
                    </p>

                    <div className="mt-4 space-y-4">
                        <div>
                            <p className="text-xs text-gray-500">
                                Issues Reported
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                                {previous.issues}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Issues Resolved
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                                {previous.resolved}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Average Resolution Time
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                                {previous.average_resolution_time}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PeriodComparison;
