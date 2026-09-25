import { useEffect, useState } from "react";
import FilterSelect from "../../common/FilterSelect.jsx";
import { BsDownload } from "react-icons/bs";

import { apiRequest } from "../../api/api.js";
 
import KPICard from "../../common/KPICard.jsx";

// import IssuesTrend from "../../components/Admin/IssuesTrend.jsx";
import IssuesGraphReport from "../../components/ReportPage/IssuesGraphReport.jsx";
import IssuesByCategory from "../../components/Admin/IssuesByCategory.jsx";
import IssuesByPriority from "../../components/Admin/IssuesByPriority.jsx";
import IssuesByLocation from "../../components/Admin/IssuesByLocation.jsx";
import ResolutionStats from "../../components/Admin/ResolutionStats.jsx";
import PeriodComparison from "../../components/Admin/PeriodComparison.jsx";

import {
    analyticsKPIData,
} from "../../components/Admin/adminAnalyticsData.js";


const dateRangeOptions = [
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" },
    { value: "this_month", label: "This month" },
    { value: "last_month", label: "Last month" },
    { value: "this_year", label: "This year" },
];
function AdminAnalytics() {
    const [dateRange, setDateRange] = useState("30");

    const [averageResTime, setAverageResTime] = useState("");
    const [resolutionRate, setResolutionRate] = useState("");
    const [monthlyReports, setMonthlyReports] = useState("");
    const [topLocation, setTopLocation] = useState("");

    useEffect(() => {
        async function fetchAnalyticsData() {
            try {
                const analyticsData = await apiRequest(`/analytics/kpi?range=${dateRange}`);
                // console.log(aveResulotionTime);
                console.log("analyticsData:", analyticsData);
                setAverageResTime(analyticsData.averageResolution);
                setResolutionRate(analyticsData.resolutionRate);
                setMonthlyReports(analyticsData.totalMonthlyReports);
                setTopLocation(analyticsData.topReportedLocation);
            }
            catch (error) {
                console.error("Failed to fetch the required informations!")
            }
        }
        fetchAnalyticsData();

    }, [dateRange]);
    console.log("Average Resolution Time: ", averageResTime);
    console.log("ResolutionRate: ", resolutionRate);


    function pluralize(count, singular, plural = `${singular}s`) {
        return count === 1 ? singular : plural;
    }



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
                ? `${resolutionRate.resolved} of ${resolutionRate.allIssues
                } ${pluralize(
                    resolutionRate.allIssues,
                    "issue"
                )} solved`
                : "No issues reported",

        reps_this_month: monthlyReports
            ? monthlyReports.currentMonthReps
            : "Loading...",

        reps_this_month_description: monthlyReports
            ? monthlyReports.currentMonthReps > 0
                ? `${monthlyReports.percentageDifference}% vs last period`
                : "No reports in this period"
            : "Loading...",

        top_location: topLocation
            ? topLocation.location
            : "Loading...",

        top_location_description:
            topLocation && topLocation.count > 0
                ? `${topLocation.count} ${pluralize(
                    topLocation.count,
                    "report"
                )}`
                : "No reports in this period",
    };



    // Temporary backend-style response
    const analyticsData = {
        kpis: {
            total_issues: 342,
            resolution_rate: "54.1%",
            average_resolution_time: "4.8 days",
            pending_issues: 86,
        },

        issues_trend: [
            { month: "April", count: 42 },
            { month: "May", count: 56 },
            { month: "June", count: 48 },
            { month: "July", count: 71 },
            { month: "August", count: 63 },
            { month: "September", count: 78 },
        ],

        issues_by_category: [
            { category: "Infrastructure", count: 85 },
            { category: "IT Equipment", count: 63 },
            { category: "Cleanliness", count: 42 },
            { category: "Security", count: 31 },
            { category: "Other", count: 18 },
        ],

        issues_by_priority: [
            { priority: "High", count: 42 },
            { priority: "Medium", count: 93 },
            { priority: "Low", count: 207 },
        ],

        issues_by_location: [
            { location: "Building A", count: 48 },
            { location: "Building B", count: 37 },
            { location: "Room 204", count: 29 },
            { location: "Admin Office", count: 21 },
            { location: "Library", count: 18 },
        ],

        resolution_stats: [
            {
                label: "Resolved Issues",
                value: 185,
                description: "Issues successfully completed",
            },
            {
                label: "Pending Over 7 Days",
                value: 24,
                description: "Pending issues older than 7 days",
            },
            {
                label: "Pending Over 30 Days",
                value: 7,
                description: "Pending issues older than 30 days",
            },
        ],

        period_comparison: {
            current: {
                label: "September",
                issues: 78,
                resolved: 52,
                average_resolution_time: "4.8 days",
            },

            previous: {
                label: "August",
                issues: 63,
                resolved: 41,
                average_resolution_time: "5.2 days",
            },
        },
    };

    return (
        <div className="p-4 sm:p-6">

            {/* Header */}
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">

                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Analytics
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                        Track issue trends, categories, priority, locations,
                        and resolution performance.
                    </p>
                </div>
                <div className="flex items-center gap-3">

                    <FilterSelect
                        name="dateRange"
                        options={dateRangeOptions}
                        value={dateRange}
                        onChange={setDateRange}
                    />
                    <button
                        // onClick={handleExport}
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


            {/* KPI Cards */}
            <div className="
            mt-5
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
        ">

                {analyticsKPIData.map((card) => (
                    <KPICard
                        key={card.key}
                        card={{
                            ...card,
                            statsData: analyticsData.kpis
                                ? kpis[card.key]
                                : "Loading...",
                            statsDescription: kpis
                                ? kpis[`${card.key}_description`]
                                : "Loading...",
                        }}
                    />
                ))}

            </div>


            {/* Issues Trend */}
            <div className="mt-5">
                {/* <IssuesTrend
                    data={analyticsData.issues_trend}
                /> */}
                <IssuesGraphReport 
                    
                    dateRange={dateRange}
                />
            </div>


            {/* Issues by Category */}
            <div className="mt-5">
                <IssuesByCategory
                    // data={analyticsData.issues_by_category}
                    dateRange={dateRange}
                />
            </div>


            {/* Priority + Location */}
            <div className="
            mt-5
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-2
        ">

                <IssuesByPriority
                    data={analyticsData.issues_by_priority}
                    dateRange={dateRange}
                />

                <IssuesByLocation
                    data={analyticsData.issues_by_location}
                />

            </div>


            {/* Resolution Statistics */}
            <div className="mt-5">
                <ResolutionStats
                    data={analyticsData.resolution_stats}
                />
            </div>


            {/* Period Comparison */}
            <div className="mt-5">
                <PeriodComparison
                    data={analyticsData.period_comparison}
                />
            </div>

        </div>
    );
}

export default AdminAnalytics;