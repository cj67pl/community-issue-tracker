
import { useState, useEffect } from "react";
import { apiRequest } from "../../api/api";



function IssuesByStatus({ dateRange }) {
    

    const [issueData, setIssueData] = useState([]);

    useEffect(() => {
        async function fetchIssueTrends() {

            try {
                const data = await apiRequest(`/analytics/by-status?range=${dateRange}`);
                
                // console.log("Issue trends by status:", data);
                setIssueData(data);
            }
            catch(error) {
                console.error(
                    "Failed to fetch issue tends: ", error
                );
            }
        }
        fetchIssueTrends();
    }, [dateRange]);

    const statusData = [
        { label: "Pending", color: "bg-amber-500" },     
        { label: "In Progress", color: "bg-indigo-500" },  
        { label: "Resolved", color: "bg-teal-600" },       
        { label: "Rejected", color: "bg-stone-400" }, 
    ].map((item) => {
        const total = issueData
            .filter((row) => row.status === item.label)
            .reduce((sum, row) => sum + row.count, 0);
        return { ...item, value: total };
    })

    const maxValue = Math.max(...statusData.map((row) => row.value), 1);
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">Issue Trends by Status</h3>
            </div>

            <div>
                {statusData.map((row) => (
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
    //  <BarChartCard title="Issues by Status" data={statusData} />;
}

export default IssuesByStatus;