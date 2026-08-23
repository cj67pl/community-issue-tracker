import IssueGrid from "./IssueGrid..jsx";



function IssueInfo({category, reporter, lastUpdated, location, dateReported, issueId, description, notes}) {
    const issueInfo = [
        {
            label: "CATEGORY",
            data: category,
        },
        {
            label: "LOCATION",
            data: location,
        },
        {
            label: "REPORTER",
            data: reporter.name,
        },
        {
            label: "REPORTED",
            data: dateReported,
        },
        {
            label: "LAST UPDATED",
            data: lastUpdated,
        },
        {
            label: "ISSUE ID",
            data: issueId,
        },
    ];
    return(
        <div className="my-5 w-full xl:max-w-3xl  min-w-md md:max-w-md sm:max-w-md rounded-xl border border-gray-200 bg-white shadow-sm">

            
            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">
                    Issues Information
                </h3>
            </div>

            
            <div className="grid grid-cols-1 gap-6 px-6 py-3 sm:grid-cols-2 [&>:last-child]:mb-3">
                {issueInfo.map((item) => (
                    <IssueGrid
                        key={item.label}
                        label={item.label}
                        data={item.data}
                    />
                ))}
            </div>
            <div className="py-2"></div>
        </div>

    )
}

export default IssueInfo;