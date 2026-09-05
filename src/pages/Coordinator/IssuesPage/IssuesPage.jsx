import { useEffect, useState,  } from "react";

import { Plus } from "lucide-react";
import SearchInput from "../../../components/IssuesPage/SearchInput.jsx";
import IssueFilters from "../../../components/IssuesPage/IssueFilters.jsx";
import IssuesTable from "../../../components/IssuesPage/IssuesTable.jsx";
import IssueDetailsModal from "../../../components/IssuesPage/IssueDetails/IssueDetailsModal.jsx"


import { apiRequest } from "../../../api/api.js";

function IssuesPage({currentRole, onNavigate}) {

    const [showIssueDetails, setShowIssueDetails] = useState(false);
    const [isSelected, setIsSelected] = useState(null)

    const [searchQuery, setIsSearchQuery] =useState("");
    const [issuesList, setIssuesList] = useState([]);

    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("newest");

    const [issueToDelete, setIssueToDelete] = useState("");



    useEffect(() => {
        // console.log("ISSUES COMPONENT LOADED");
        const fetchIssues = async () => {

            try {
                const data = await apiRequest("/issues");
                // console.log("API DATA:", data);
                // console.log("FIRST ISSUE:", data[0]);
                // console.log("IS ARRAY:", Array.isArray(data));
                /*console.log("FIRST ISSUE FILTER FIELDS:", {
                    id: data[0].id,
                    category_id: data[0].category_id,
                    priority_level_id: data[0].priority_level_id,
                    status_id: data[0].status_id,
                    category: data[0].category,
                    priority: data[0].priority,
                    status: data[0].status, });*/
                
                setIssuesList(Array.isArray(data) ? data : data.issues || []);
            } catch (error) {
                console.error("API ERROR:", error);
            }
        };

        fetchIssues();
    }, []);

    const filteredIssues = [...issuesList]
        .filter((issue) => {

            // console.log("FILTERING ISSUE:", 
            //     { issueId: issue.id, 
            //         category_id: issue.category_id, 
            //         selectedCategory: category, 
            //         priority_level_id: issue.priority_level_id, 
            //         selectedPriority: priority, 
            //         status_id: issue.status_id, 
            //         selectedStatus: status, });

            if (
                searchQuery &&
                !issue.title.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                return false;
            }

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
            const dateA = new Date(a.reported_at);
            const dateB = new Date(b.reported_at);

            if (sort === "oldest") {
                return dateA - dateB;
            }

            return dateB - dateA;
        });

        // if (showIssueDetails) {
        //     console.log("Issue is clicked and supposed to be opened." );
        // }  
        // if (!showIssueDetails) {
        //     console.log("X is clicked and supposed to be closed.");

        // }
        // if (isSelected) {
        //     console.log("selected is: ",isSelected);
            
        // }
        // if (!isSelected) {
        //     console.log("Closed. selected is: ", isSelected);

        // }

        const handleIssueClick = (issue) => {
            setIsSelected(issue);
            setShowIssueDetails(true);
        };

        const handleDeleteIssue = async (issueID) => {
            try{
                await apiRequest(`/issues/${issueID}`, {
                    method: "DELETE",
                });

                setIssuesList((currentIssues) =>
                    currentIssues.filter((issue) => issue.id != issue.id)
                );
            }
            catch (error) {
                console.error("Failed to delete issue.")
            }
        }

    const handlEditIssueStatus = async (issueID, newStatus) => {
        console.log("EDIT ID:", issueID);
        console.log("EDIT STATUS:", newStatus);

        try {
            await apiRequest(`/issues/${issueID}`, {
                method: "PATCH",
                body: JSON.stringify({
                    status_name: newStatus
                })
            });
            const updatedData = await apiRequest(`/issues/${issueID}`);

            console.log("REFRESHED ISSUE:", updatedData.issue);

            setIssuesList((currentIssues) =>
                currentIssues.map((issue) =>
                    Number(issue.id) === Number(issueID)
                        ? {
                            ...issue,
                            status: updatedData.issue.status,
                            status_id: updatedData.issue.status_id
                        }
                        : issue
                )
            );

            return updatedData.issue;
        }
        catch (error) {
            console.log("Failed to edit the issue!", error);
            return null;
        }
    };
    return (
        <div className="p-4">
            <div className={`${showIssueDetails ? "hidden" : " " }`}>
                <div className="flex justify-between">
                    <div className="grid gap-2">
                        <h2 className="text-2xl font-bold">Issues</h2>
                        <span className="text-sm text-neutral-500">View, filter, and manage reported issues.</span>
                    </div>
                    <button
                        onClick={() => onNavigate("report")}
                        className="
                        flex items-center justify-center gap-2
                        rounded-md text-sm font-bold text-white
                        bg-teal-700 h-10 px-5
                        hover:bg-teal-800"
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Report issue</span>
                    </button>
                </div>

                <div className="my-5">
                    <SearchInput 
                        placeholder="Search for Issues" 
                        value={searchQuery}
                        onChange={setIsSearchQuery}
                    />
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

                <IssuesTable 
                    issues={filteredIssues}
                    onSelectIssue={handleIssueClick}
                    onDeleteIssue={handleDeleteIssue}
                    
                    onNavigate={onNavigate}
                />
                <div></div>
            </div>

            

            <IssueDetailsModal 
                isOpen={showIssueDetails}
                onClose={() => { 
                    setShowIssueDetails(false); 
                }}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                onDeleteIssue={handleDeleteIssue}
                onEditIssueStatus={ handlEditIssueStatus }
                
            ></IssueDetailsModal>
  
           
        </div>
        
    );
}

export default IssuesPage;