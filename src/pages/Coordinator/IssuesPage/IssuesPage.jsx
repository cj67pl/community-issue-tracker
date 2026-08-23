import { Plus } from "lucide-react";
import SearchInput from "../../../components/IssuesPage/SearchInput/SearchInput.jsx";
import IssueFilters from "../../../components/IssuesPage/IssueFilters/IssueFilters.jsx";
import IssuesTable from "../../../components/IssuesPage/IssuesTable/IssuesTable.jsx";
import IssueDetails from "../../../components/IssuesPage/IssueDetails/IssueDetails.jsx"
import { issues } from "../../../components/issuesData.js";

function IssuesPage() {
    return (
        <div className="p-4">
            <div className="hidden">
                <div className="flex justify-between">
                    <div className="grid gap-2">
                        <h2 className="text-2xl font-bold">Issues</h2>
                        <span className="text-sm text-neutral-500">View, filter, and manage reported issues.</span>
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

                <div className="my-5">
                    <SearchInput placeholder="Search for Issues" />
                </div>

                <IssueFilters />

                <span className="mt-5 block text-sm text-neutral-500">
                    Showing {issues.length} of 38 issues
                </span>

                <IssuesTable issues={issues} />
                <div></div>
            </div>

            

            <IssueDetails></IssueDetails>
        </div>
        
    );
}

export default IssuesPage;