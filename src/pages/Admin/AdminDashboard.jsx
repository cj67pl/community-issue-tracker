import KPICard from "../../common/KPICard.jsx";
import AdminIssueStatus from "../../components/Admin/AdminIssueStatus.jsx";
import AdminRecentIssues from "../../components/Admin/AdminRecentIssues.jsx";
import IssuesByStatus from "../../components/Admin/IssuesByStatus.jsx";
import IssuesByCategory from "../../components/Admin/IssuesByCategory.jsx";
import {
    adminKPIData,
    recentIssuesData,
} from "../../components/Admin/adminData.js";

function AdminDashboard() {

    // Temporary sample backend response
    const adminDashboardData = {
        kpis: {
            total_users: 128,
            active_users: 114,
            total_issues: 342,
            pending_issues: 86,
            in_progress_issues: 71,
            resolved_issues: 185,
        },
    };


    const issuesByStatusData = [
        {
            status: "Pending",
            count: 86,
        },
        {
            status: "In Progress",
            count: 71,
        },
        {
            status: "Resolved",
            count: 185,
        },
        {
            status: "Rejected",
            count: 15,
        },
    ];

    const issuesByCategory = [
        { category: "Infrastructure", count: 85 },
        { category: "IT Equipment", count: 63 },
        { category: "Cleanliness", count: 42 },
        { category: "Security", count: 31 },
        { category: "Other", count: 18 },
    ];


    const kpis = adminDashboardData.kpis;

    return (
        <div className="p-4 sm:p-6">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Dashboard
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                    System overview and activity summary.
                </p>
            </div>


            {/* KPI Cards */}
            <div className="
                mt-5
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-6
            ">

                {adminKPIData.map((card) => (
                    <KPICard
                        key={card.key}
                        card={{
                            ...card,
                            statsData: kpis
                                ? kpis[card.key]
                                : "Loading...",
                        }}
                    />
                ))}

            </div>


            {/* Issue Status */}
            <div className="
                mt-5
                grid
                grid-cols-1
                gap-5
                lg:grid-cols-2
            ">
            {/*    <AdminIssueStatus data={issuesByStatusData} />
            */}
                <IssuesByCategory
                    data={issuesByCategory}
                />
                <IssuesByStatus
                    data={issuesByStatusData}
                />
            </div> 


            {/* Recent Issues */}
            <div className="mt-5">
                <AdminRecentIssues issues={recentIssuesData} />
            </div>

        </div>
    );
}

export default AdminDashboard;