function IssueGrid({label, data}) {
    return (
        <div>
            <span className="text-xs text-slate-500 font-semibold">
                {label}
            </span>

            <p className="mt-1 font-medium text-slate-900 font-semibold">
                {data}
            </p>
        </div>
    )
}

export default IssueGrid;

