import { useState, useEffect } from "react";
import { BsDownload } from "react-icons/bs";
import KPICard from "../../common/KPICard.jsx";
import reportsKpiCardsData  from "../../data/ReportsKPICardsData.js"
// import IssuesGraph from "../../../components/Dashboard/IssuesGraph.jsx";
import IssuedByStatus from "../../components/ReportPage/IssuedByStats.jsx";
import IssuesGraphReport from "../../components/ReportPage/IssuesGraphReport.jsx";
// import ReportDateFilter from "../../../components/ReportPage/ReportDateFilter.jsx";
import FilterSelect from "../../common/FilterSelect.jsx";


import { apiRequest, buildApiUrl } from "../../api/api.js";
import { use } from "react";

// export const reportsKpiCardsData = [
//     {
//         name: "Avg. Resolution Time",
//         icon: Clock3,
//         color: "text-green-700",
//         background: "bg-green-700/10",
//         statsData: "3.4d",
//         statsDescription: "Down from 4.1d last month",
//     },
//     {
//         name: "Resolution Rate",
//         icon: CheckCircle2,
//         color: "text-sky-700",
//         background: "bg-sky-700/10",
//         statsData: "76%",
//         statsDescription: "29 of 38 issues resolved",
//     },
//     {
//         name: "Reports This Month",
//         icon: FilePlus2,
//         color: "text-purple-500",
//         background: "bg-purple-500/10",
//         statsData: "14",
//         statsDescription: "22% more than last month",
//     },
//     {
//         name: "Open Issues",
//         icon: CircleAlert,
//         color: "text-red-700",
//         background: "bg-red-700/10",
//         statsData: "7",
//         statsDescription: "12% fewer than last month",
//     },
// ];
// const data = [
//     { name: "Avg. Resolution Time", value: 13, color: "#0f5c4c" },
//     { name: "Internet / Tech", value: 9, color: "#4d9b7f" },
//     { name: "Infrastructure", value: 7, color: "#c8792a" },
//     { name: "Safety", value: 5, color: "#7c5cbf" },
//     { name: "Other", value: 4, color: "#7fb3d5" },
// ];

const dateRangeOptions = [
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" },
    { value: "this_month", label: "This month" },
    { value: "last_month", label: "Last month" },
    { value: "this_year", label: "This year" },
];

function Reports() {

    const [averageResTime, setAverageResTime] = useState("");
    const [resolutionRate, setResolutionRate] = useState("");
    const [monthlyReports, setMonthlyReports] = useState("");
    const [dateRange, setDateRange] = useState("30");
    const [topLocation, setTopLocation] = useState("");

    useEffect(() => {
        async function fetchAnalyticsData() {
            try{
                const analyticsData = await apiRequest(`/analytics/kpi?range=${dateRange}`);
                // console.log(aveResulotionTime);
                console.log("analyticsData:", analyticsData);
                setAverageResTime(analyticsData.averageResolution);
                setResolutionRate(analyticsData.resolutionRate);
                setMonthlyReports(analyticsData.totalMonthlyReports);
                setTopLocation(analyticsData.topReportedLocation);
            }
            catch(error) {
                console.error("Failed to fetch the required informations!")
            }            
        }
        fetchAnalyticsData();

    }, [dateRange]);
    console.log("Average Resolution Time: ", averageResTime);
    console.log("ResolutionRate: ", resolutionRate);
    
    const kpis = {
        ave_res_time:
            averageResTime && averageResTime.current > 0
                ? `${averageResTime.current}d`
                : "No data",

        ave_res_time_description:
            averageResTime && averageResTime.current > 0
                ? `${averageResTime.direction === "down" ? "Down" : "Up"} from ${averageResTime.change}d last period`
                : "No resolutions in this period",

        resolution_rate:
            resolutionRate && resolutionRate.rate !== null
                ? `${resolutionRate.rate}%`
                : "No data",

        resolution_rate_description:
            resolutionRate && resolutionRate.allIssues > 0
                ? `${resolutionRate.resolved} of ${resolutionRate.allIssues} issues solved`
                : "No issues reported",

        reps_this_month: monthlyReports ? monthlyReports.currentMonthReps : "Loading...",

        reps_this_month_description: monthlyReports
            ? monthlyReports.currentMonthReps > 0
                ? `${monthlyReports.percentageDifference}% vs last period`
                : "No reports in this period"
            : "Loading...",

        top_location: topLocation ? topLocation.location : "Loading...",

        top_location_description:
            topLocation && topLocation.count > 0
                ? `${topLocation.count} reports`
                : "No reports in this period",
    };


    
    const handleExport = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                buildApiUrl(`/analytics/export?range=${dateRange}`),
                {
                    headers: {
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to export CSV");
            }

            // Pull the filename the server generated, fallback if missing
            const disposition = response.headers.get("Content-Disposition");
            const match = disposition && disposition.match(/filename="(.+?)"/);
            const filename = match ? match[1] : `reports-${dateRange}.csv`;

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Export failed:", error);
        }
    };


    return (
        <div className="p-4">
            <div className="">
                <div className="flex flex-col gap-3 md:flex-row md:justify-between mb-10">
                    <div className="grid gap-2">
                        <h2 className="text-2xl font-bold">
                            Reports & Analytics
                        </h2>

                        <span className="text-sm text-neutral-500">
                            Monitor issue trends and resolution performance.
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        
                        {/* <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="
                                rounded-lg
                                border border-slate-200
                                bg-white
                                px-3 py-2
                                text-sm
                                text-slate-600
                                outline-none
                                cursor-pointer
                            "
                        >
                            {dateRangeOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select> */}
                        
                        <FilterSelect
                            name="dateRange"
                            options={dateRangeOptions}
                            value={dateRange}
                            onChange={setDateRange}
                        />
                        

                        <button
                            onClick={handleExport}
                            className="
                                flex items-center gap-2
                                rounded-lg
                                bg-[#2E6F62]
                                px-4 py-2
                                text-sm font-semibold
                                text-white
                                transition
                                hover:bg-[#255C51]
                            "
                        >
                            <BsDownload size={18} />
                            <span className="hidden sm:inline">
                                Export CSV
                            </span>
                        </button>
                    </div>
                </div>
                
                <div className="
                    grid xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-2 gap-6
                    my-5
                ">

                        {reportsKpiCardsData.map((card) => (
                            <KPICard

                                key={card.name}
                                
                                card={{
                                    ...card,
                                    statsData: kpis ? kpis[card.key] : "Loading...",
                                    statsDescription: kpis
                                        ? kpis[`${card.key}_description`]
                                        : "Loading...",
                                }}

                            />

                        ))}  

                </div>
                <div className="grid xl:grid-cols-2  md:grid-cols-1 gap-6">
                    <IssuesGraphReport 
                        dateRange={dateRange}
                    />
                    <IssuedByStatus 
                        dateRange={dateRange}
                    />
                </div>

                {/* <div className="my-5">
                    <MonthlyVolume />
                </div> */}
                
            </div>
        </div> 
    ) 
}


export default Reports;