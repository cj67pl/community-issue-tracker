import { useEffect, useState,  } from "react";

import { Plus } from "lucide-react";
import SearchInput from "../../../components/IssuesPage/SearchInput.jsx";
import IssueFilters from "../../../components/IssuesPage/IssueFilters.jsx";
import IssuesTable from "../../../components/IssuesPage/IssuesTable.jsx";
import IssueDetails from "../../../components/IssuesPage/IssueDetails/IssueDetails.jsx"


import { apiRequest } from "../../../api/api.js";

function IssuesPage({currentRole}) {

    const [isIssueOpen, setIsIssueOpen] = useState(false)
    const [issuesList, setIssuesList] = useState([]);

    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("newest");


    useEffect(() => {
        // console.log("ISSUES COMPONENT LOADED");
        const fetchIssues = async () => {

            try {
                const data = await apiRequest("/issues");
                console.log("API DATA:", data);
                console.log("IS ARRAY:", Array.isArray(data));
                setIssuesList(Array.isArray(data) ? data : data.issues || []);
            } catch (error) {
                console.error("API ERROR:", error);
            }
        };

        fetchIssues();
    }, []);

    const filteredIssues = issuesList
        .filter((issue) => {

            if (
                category &&
                Number(issue.category_id) !== Number(category)
            ) {
                return false;
            }

            if (
                priority &&
                Number(issue.priority_level_id) !== Number(priority)
            ) {
                return false;
            }

            if (
                status &&
                Number(issue.status_id) !== Number(status)
            ) {
                return false;
            }

            return true;
        })
        .sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);

            if (sort === "oldest") {
                return dateA - dateB;
            }

            return dateB - dateA;
        });
    return (
        <div className="p-4">
            <div className={`${isIssueOpen ? "hidden" : " " }`}>
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

                <IssueFilters 
                    currentRole = {currentRole}
                    category={category}
                    setCategory={setCategory}
                    priority={priority}
                    setPriority={setPriority}
                    status={status}
                    setStatus={setStatus}
                    sort={sort}
                    setSort={setSort}
                />

                <span className="mt-5 block text-sm text-neutral-500">
                    Showing {filteredIssues.length} issues
                </span>

                <IssuesTable issues={filteredIssues} />
                <div></div>
            </div>

            
            <div className={`${(!isIssueOpen) ? "hidden" : " "}`}>
                 <IssueDetails></IssueDetails>
            </div>
           
        </div>
        
    );
}

export default IssuesPage;