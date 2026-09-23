import { useEffect, useState } from "react";


import KPICard from "../../common/KPICard.jsx";
import IssuesByStatus from "../../components/Admin/IssuesByStatus.jsx";
import IssuesByCategory from "../../components/Admin/IssuesByCategory.jsx";
import RecentIssues from "../../components/Dashboard/RecentIssues.jsx";

import {
    adminKPIData,
    recentIssuesData,
} from "../../components/Admin/adminData.js";

import { apiRequest } from "../../api/api.js";

function AdminDashboard({onNavigate}) {

    // Temporary sample backend response
    // const adminDashboardData = {
    //     kpis: {
    //         total_users: 128,
    //         active_users: 114,
    //         total_issues: 342,
    //         pending_issues: 86,
    //         in_progress_issues: 71,
    //         resolved_issues: 185,
    //     },
    // };


    // const issuesByStatusData = [
    //     {
    //         status: "Pending",
    //         count: 86,
    //     },
    //     {
    //         status: "In Progress",
    //         count: 71,
    //     },
    //     {
    //         status: "Resolved",
    //         count: 185,
    //     },
    //     {
    //         status: "Rejected",
    //         count: 15,
    //     },
    // ];

    // const issuesByCategory = [
    //     { category: "Infrastructure", count: 85 },
    //     { category: "IT Equipment", count: 63 },
    //     { category: "Cleanliness", count: 42 },
    //     { category: "Security", count: 31 },
    //     { category: "Other", count: 18 },
    // ];



    // const kpis = adminDashboardData.kpis;
    const [kpis, setKpis] = useState(null);
    const [issuesByCategory, setIssuesByCategory] = useState([])
    const [issuesByStatusData, setIssuesByStatusData] = useState([]);

    useEffect(() => {
        const fetchKPIs = async () => {
            try {
                const data = await apiRequest("/dashboard/admin-kpis");
                console.log("ADMIN DASHBOARD KPIs: ", data.kpis);
                setKpis(data.kpis);

            }
            catch (error) {
                console.error("Failed to fetch admin dashboard KPIs:", error);
                localStorage.removeItem("token");
            }

            
        }
        fetchKPIs();
    },[])

    useEffect(() => {
        const fetchIssuesByCategory = async () => {
            try {
                const data = await apiRequest("/dashboard/admin-issues-counts");

                console.log("ISSUES BY CATEGORY AND STATUS:", data);

                setIssuesByCategory(data.issues_by_category);
                const status = data.issues_by_status;

                const formattedStatus = [
                    {
                        status: "Pending",
                        count: status.pending_issues,
                    },
                    {
                        status: "In Progress",
                        count: status.in_progress_issues,
                    },
                    {
                        status: "Resolved",
                        count: status.resolved_issues,
                    },
                    {
                        status: "Rejected",
                        count: status.rejected_issues,
                    },
                ];
                
                setIssuesByStatusData(formattedStatus); 
            } catch (error) {
                console.error(
                    "Failed to fetch issues by category:",
                    error
                );
            }
        };

        fetchIssuesByCategory();
    }, []);

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
                xl:grid-cols-5
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
                <RecentIssues onNavigate={onNavigate} />
            </div>

        </div>
    );
}

export default AdminDashboard;