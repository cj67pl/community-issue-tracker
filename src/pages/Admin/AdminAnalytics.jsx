import KPICard from "../../common/KPICard.jsx";

import IssuesTrend from "../../components/Admin/IssuesTrend.jsx";
import IssuesByCategory from "../../components/Admin/IssuesByCategory.jsx";
import IssuesByPriority from "../../components/Admin/IssuesByPriority.jsx";
import IssuesByLocation from "../../components/Admin/IssuesByLocation.jsx";
import ResolutionStats from "../../components/Admin/ResolutionStats.jsx";
import PeriodComparison from "../../components/Admin/PeriodComparison.jsx";

import {
    analyticsKPIData,
} from "../../components/Admin/adminAnalyticsData.js";

function AdminAnalytics() {

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
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Analytics
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                    Track issue trends, categories, priority, locations,
                    and resolution performance.
                </p>
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
                                ? analyticsData.kpis[card.key]
                                : "Loading...",
                        }}
                    />
                ))}

            </div>


            {/* Issues Trend */}
            <div className="mt-5">
                <IssuesTrend
                    data={analyticsData.issues_trend}
                />
            </div>


            {/* Issues by Category */}
            <div className="mt-5">
                <IssuesByCategory
                    data={analyticsData.issues_by_category}
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