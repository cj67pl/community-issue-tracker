import { useState } from "react";

import { Plus } from "lucide-react";
import SearchInput from "../../../components/IssuesPage/SearchInput.jsx";
import IssueFilters from "../../../components/IssuesPage/IssueFilters.jsx";
import IssuesTable from "../../../components/IssuesPage/IssuesTable.jsx";
import IssueDetails from "../../../components/IssuesPage/IssueDetails/IssueDetails.jsx"
import { issues } from "../../../components/issuesData.js";
import RecentIssues from "../../../components/Dashboard/RecentIssues.jsx";


const data = [
    { name: "Avg. Resolution Time", value: 13, color: "#0f5c4c" },
    { name: "Internet / Tech", value: 9, color: "#4d9b7f" },
    { name: "Infrastructure", value: 7, color: "#c8792a" },
    { name: "Safety", value: 5, color: "#7c5cbf" },
    { name: "Other", value: 4, color: "#7fb3d5" },
];


function ReporterReports(currentUser) {
console.log("Current user:",currentUser);
    const [isReporterAccount, setIsReporterAccount] = useState(true)
    
    if (currentUser.role === 'reporter') {
        setIsReporterAccount(true)
    }
    
    return (
        <div className="p-4">
            <div className="">
                <div className="flex justify-between">
                    <div className="grid gap-2">
                        <h2 className="text-2xl font-bold">My Reports</h2>
                        <span className="text-sm text-neutral-500">All the issues you've submitted and their current status.</span>
                    </div>
                    <button
                        className="
                        flex items-center justify-center gap-2
                        rounded-md text-sm font-bold text-white
                        bg-teal-700 h-10 px-5
                        hover:bg-teal-800
                        "
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Report issue</span>
                    </button>
                </div>

                <IssueFilters reporterAccount={isReporterAccount}
                                currentUser={currentUser.currentUser}
                />

                <span className="mt-5 block text-sm text-neutral-500">
                    Showing {issues.length} of 38 issues
                </span>

                <RecentIssues currentUser={currentUser.currentUser} />

                {/* <IssuesTable issues={issues} style={"hidden"}
                    currentUser={currentUser.role}
                
                /> */}

                <div></div>
            </div>



            <IssueDetails style={"hidden"}></IssueDetails>
        </div>
    )
}


export default ReporterReports;