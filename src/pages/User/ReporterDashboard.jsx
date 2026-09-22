


import { useState, useEffect } from "react";
import KPICard from "../../common/KPICard.jsx";
import IssueDetailsModal from "../../components/IssuesPage/IssueDetails/IssueDetailsModal.jsx";
import RecentIssues from "../../components/Dashboard/RecentIssues.jsx";
import IssueFilters from "../../components/IssuesPage/IssueFilters.jsx";
import IssuesTable from "../../components/IssuesPage/IssuesTable.jsx";
import { IoIosAdd } from "react-icons/io";


import reporterKpiCardsData from '../../data/ReporterKpiCardsData.js'

import { apiRequest } from "../../api/api.js";

function ReporterDashboard({ currentRole, onNavigate }) {

    const [kpis, setKpis] = useState(null);
   
    const [showIssueDetails, setShowIssueDetails] = useState(false);
    const [isSelected, setIsSelected] = useState(null)

    const [searchQuery, setIsSearchQuery] = useState("");
    const [issuesList, setIssuesList] = useState([]);
    
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("newest");

    const fetchKPIs = async () => {
        try {
            const data = await apiRequest("/dashboard/user-kpis");
            setKpis(data.kpis);
        }
        catch (error) {
            console.error("Failed to fetch dashboard KPIs:", error);
            localStorage.removeItem("token");
        }
    };

    useEffect(() => {
        fetchKPIs();
    }, []);

    useEffect(() => {
        // console.log("ISSUES COMPONENT LOADED");
        const fetchIssues = async () => {

            try {
                const data = await apiRequest("/issues/user-issues");
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



    const handleIssueClick = async (issueID) => {
        setShowIssueDetails(true);
        setIsSelected(null);
        try {
            const data = await apiRequest(`/issues/${issueID}`);
            setIsSelected(data.issue);
        } catch (error) {
            console.error("Failed to fetch issue details:", error);
            setShowIssueDetails(false);
        }
    };

    const handleDeleteIssue = async (issueID) => {
        try {
            await apiRequest(`/issues/${issueID}`, {
                method: "DELETE",
            });

            setIssuesList((currentIssues) =>
                currentIssues.filter((issue) => issue.id != issueID)
            );
            await fetchKPIs();
        }
        catch (error) {
            console.error("Failed to delete issue.")
        }
    }
    const handleAddComment = async (issueID, newComment) => {
        console.log("3. PAGE ISSUE ID:", issueID.id);
        console.log("3. PAGE COMMENT:", newComment);
        try {
            await apiRequest(`/issues/${issueID.id}/comments`, {
                method: "POST",
                body: JSON.stringify({
                    content: newComment
                })
            });

            const updatedComments = await apiRequest(
                `/issues/${issueID.id}/comments`
            )

            return updatedComments;
        }
        catch (error) {
            console.error("Failed to add comment!", error);

        }

    }
    const handleEditComment = async (issueID, commentID, newCommentUpdate) => {
        console.log("3. PAGE ISSUE ID:", issueID.id);
        console.log("3. PAGE COMMENT ID:", commentID);
        console.log("3. PAGE COMMENT:", newCommentUpdate);
        try {
            await apiRequest(`/issues/${issueID.id}/comments/${commentID}`, {
                method: "PATCH",
                body: JSON.stringify({
                    content: newCommentUpdate
                })
            });

            const updatedComments = await apiRequest(
                `/issues/${issueID.id}/comments/`
            )

            return updatedComments;
        }
        catch (error) {
            console.error("Failed to add comment!", error);

        }

    }

    const handleDeleteComment = async (issueID, commentID) => {
        console.log("3. PAGE ISSUE ID:", issueID.id);
        console.log("3. PAGE COMMENT ID:", commentID);

        try {
            await apiRequest(`/issues/${issueID.id}/comments/${commentID}`, {
                method: "DELETE",
                body: JSON.stringify({
                    id: commentID
                })
            });

            const updatedComments = await apiRequest(
                `/issues/${issueID.id}/comments/`
            )

            return updatedComments;
        }
        catch (error) {
            console.error("Failed to remove comment!", error);

        }

    }
    return (
        <div className="p-4  ">
            <div className="flex justify-between
                    ">
                <div className="grid gap-2">
                    <h2 className="text-2xl font-bold">My Dashboard</h2>
                    <span className="font-small text-neutral-500 ">Monitor reported issues and identify what needs attention.</span>
                </div>
                <button 
                    onClick={() => onNavigate("report")}
                    className="
                            flex items-center justify-center
                            gap-2
                            rounded-md
                            text-small
                            text-white
                            font-bold
                            bg-teal-700
                            h-10
                            px-5
                            hover:bg-teal-800
                    "   
                >
                    <IoIosAdd size={25}/>
                    <span className="hidden sm:inline">Report issue</span>
                </button>
            </div>   


            <div className="
                    grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-6
                    my-5
                ">
        
            {reporterKpiCardsData.map((card) => (
                <KPICard
                    onNavigate={onNavigate}
                    key={card.name}
                    card={{
                        ...card,
                        statsData: kpis ? kpis[card.key] : "Loading...",
                    }}

                />

            ))}  

            

            </div>

            <IssueFilters
                currentRole={currentRole}
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

            <div className="">
                <IssuesTable
                    issues={filteredIssues}
                    onSelectIssue={handleIssueClick}
                    onDeleteIssue={handleDeleteIssue}
                    onNavigate={onNavigate}
                    currentRole={currentRole}
                />
                
            </div>
            <IssueDetailsModal
                isOpen={showIssueDetails}
                onClose={() => {
                    setShowIssueDetails(false);
                }} 
                currentRole={currentRole}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                onDeleteIssue={handleDeleteIssue}
                onAddComment={handleAddComment}
                onEditComment={handleEditComment}
                onDeleteComment={handleDeleteComment}            
            />
            
        </div>
    )
}

export default ReporterDashboard;