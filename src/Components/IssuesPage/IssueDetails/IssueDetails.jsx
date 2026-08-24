import { ChevronLeft, Plus, Trash, Pencil} from "lucide-react";
import ActionButton from "./ActionButton";
import { priorityStyles, statusStyles } from "../../issuesData.js";
import { issue } from "../../issueDetails.js";
import Badge from "../../../common/Badge";
import IssueInfo from "./IssueInfo/IssueInfo.jsx"
import StatusCard from "./StatusCard.jsx";
import Description from "./Description.jsx"
import ReporterCard from "./ReporterCard.jsx";
import Notes from "./NotesCard/NotesCard.jsx";
import { getInitials } from "../../funcs.js";

const actionData = [
    {
        name: "Edit",
        textCol: "text-neutral-900",
        bg: "bg-white",
        icon: Pencil,
        hover: "hover:bg-taupe-100"
    },
    {
        name: "Delete",
        textCol: "text-white",
        bg: "bg-red-700/80",
        icon: Trash,
        hover: "hover:bg-red-800/80"
    }
]

// const getInitials = (str) => str.trim().split(/\s+/).map(w=>[0]).join("").toUpperCase();

function IssueDetails() {
    return (
        <div className="p-2 ">
            <a href="" className="flex flex-row items-center font-bold text-xs text-neutral-500 hover:text-neutral-800 mb-3"><ChevronLeft size={15}/> Back to Issues</a>
            <div className="flex justify-between">
                
                <div className="grid gap-2">
                    <h2 className="text-2xl font-bold">{issue.issue}</h2>
                   
                    <div className="flex gap-5 py-2">
                        <Badge label={issue.status} styles={statusStyles[issue.status]} size="md" />
                        <Badge
                            label={`${issue.priority} Priority`}
                            styles={priorityStyles[issue.priority]}
                            size="md"
                        />
                        
                    </div>
                    
                </div>
                <div className="flex gap-5">
                    
                    {actionData.map(data => (
                        
                            <ActionButton 
                                key={data.name}
                                name={data.name}
                                textCol={data.textCol}
                                bg={data.bg}
                                icon={data.icon}
                                hover={data.hover}
                            />
                       
                    ))}
                    
                    
                </div>
                
                
            </div>
            <div className="grid grid-cols-1 gap-9 xl:flex">
                <IssueInfo 
                    category={issue.category}
                    reporter={issue.reporter}
                    lastUpdated={issue.lastUpdated}
                    location={issue.location}
                    dateReported={issue.dateReported}
                    issueId={issue.issueID}
                    description={issue.description}
                    notes={issue.notes}
                />
                <StatusCard issueStats={issue.status}/>
                
            </div>
            <div className="grid grid-cols-1 gap-9 xl:flex">
                <Description description={issue.description}/>
                <ReporterCard
                    initials={getInitials(issue.reporter.name)}
                    name={issue.reporter.name}
                    role={issue.reporter.position}
                    variant="large"
                />
            </div>
            <div className="grid grid-cols-1 gap-9 xl:flex">
                <Notes 
                    notes={issue.notes}
                />
            </div>


        </div>
        
    )
}

export default IssueDetails;