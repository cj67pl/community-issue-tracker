import {useState, useEffect} from "react";
import { Trash} from "lucide-react";
import { priorityStyles, statusStyles } from "../../issuesData.js";
import Badge from "../../../common/Badge";
import IssueInfo from "./IssueInfo/IssueInfo.jsx"
import StatusCard from "./StatusCard.jsx";
import Description from "./Description.jsx"
import ReporterCard from "./ReporterCard.jsx";
import Notes from "./NotesCard/NotesCard.jsx";
import { getInitials } from "../../../utils/stringHelpers.js";
import { formatDate } from "../../../utils/dateHelper.js";

import { apiRequest } from "../../../api/api.js";


// const getInitials = (str) => str.trim().split(/\s+/).map(w=>[0]).join("").toUpperCase();

function IssueDetails({ style, issue, onDeleteIssue, onEditIssueStatus }) {
    // console.log("Issue ID:", issue);
    
    const [issueData, setIssueData] = useState(null);
    const [issueNotes, setIssueNotes] = useState([]);

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                    const data = await apiRequest(`/issues/${issue}`);
                    // console.log("FULL RESPONSE:", data);
                    // console.log("data.issue:", data?.issue);

                    // console.log(data.issue);   
                    setIssueData(data.issue);
            }
            catch (error) {
                console.error("Failed to fetch issues!");
            }
        } 
        fetchIssue();
    }, [issue]);


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await apiRequest(`/issues/${issue}/comments`)
                // console.log(data);
                setIssueNotes(data);
                
            }
            catch (error) {
                console.error("Failed to fetch comments!")
            }
        }
        fetchComments();
    }, [issue]);

    
    // if (issueData) console.log("Issue info: ", issueData);
    // if (issueNotes) console.log("Issue Notes: ", issueNotes);
    if (!issueData) {
        return <div>Loading issue...</div>;
    }
    
    return (
        <div className={`p-18 ${style}`}>
            

           
            <div className="flex justify-between">
                
                <div className="grid gap-2">
                    <h2 className="text-2xl font-bold">{issueData.title}</h2>
                   
                    <div className="flex gap-5 py-2">
                        <Badge label={issueData.status} styles={statusStyles[issueData.status].toLowerCase()} size="md" />
                        <Badge
                            label={`${issueData.priority} Priority`}
                            styles={priorityStyles[issueData.priority].toLowerCase()}
                            size="md"
                        />
                        
                    </div>
                    
                </div>
                <div className="flex gap-5">

                    <button
                        onClick={() => { onDeleteIssue(issue) }}
                        className={`
                            flex items-center justify-center gap-2
                            rounded-md text-sm font-semibold 
                            h-10 px-5 border border-neutral-500/40
                            cursor-pointer
                            text-white
                            bg-red-700/80
                            hover:bg-red-800/80
                        `}
                    >
                        {<Trash size={15} />}
                        <span className="hidden sm:inline">Delete</span>
                    </button>
                </div>
                
                
            </div>
            <div className="grid grid-cols-1 gap-9 xl:flex">
                <IssueInfo 
                    category={issueData.category}
                    reporter={issueData.reported_by}
                    lastUpdated={formatDate(issueData.updated_at)}
                    location={issueData.location}
                    dateReported={formatDate(issueData.reported_at)}
                    issueId={issueData.id}
                    description={issueData.description}
                    notes={issueData.notes}
                    updatedBy={issueData.updated_by}
                />
                <StatusCard 
                    setIssueStatus={onEditIssueStatus}
                    issue={issue}
                    issueStats={issueData.status}/>
                    
                
            </div>
            <div className="grid grid-cols-1 gap-9 xl:flex">
                <Description description={issueData.description}/>
                <ReporterCard
                    initials={getInitials(issueData.reported_by)}
                    name={issueData.reported_by}
                    role={issueData.position}
                    variant="large"
                />
            </div>
            <div className="grid grid-cols-1 gap-9 xl:flex">
                <Notes 
                    notes={issueNotes}
                />
            </div>


        </div>
 
        
    )
}

export default IssueDetails;