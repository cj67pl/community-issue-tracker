import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Badge from "../../common/Badge";
import { priorityStyles, statusStyles, dotStyles } from "../issuesData";

import { apiRequest } from "../../api/api";
import { formatRelativeTime } from "../../utils/dateHelper";


function UrgentsList({onNavigate}) {

    const [urgentsData, setUrgentsData] = useState([]);

    useEffect(() => {
        const fetchUrgentIssues = async () => {
            try {
                const response = await apiRequest("/dashboard/urgent");

                // console.log("Urgent Issues: ", response);
                setUrgentsData(response.issues);
            }
            catch (error) { 
                console.log("Failed to fetch urgent issues.");
            }
        }
        fetchUrgentIssues();
    }, []);

    return (
        <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
                <h3 className="text-lg font-bold text-gray-900">Needs Attention</h3>
            </div>

            <div>
                {urgentsData.map((data) => {
                    // const priority = priorityStyles[data.priorityLevel];
                    // const status = statusStyles[data.respondStatus];
                    
                    return (
                        <div
                            key={data.id}
                            className="flex flex-row items-center justify-between border-b border-gray-200 px-5 py-3 last:border-b-0"
                        >
                            <div className="flex flex-row items-center gap-3">
                                <div className={`h-2.5 w-2.5 rounded-full ${dotStyles[data.priority_level]}`} />
                                <div>
                                    <p className="text-sm font-semibold">{data.title}</p>
                                    <span className="text-xs text-gray-400">{data.location}</span>
                                </div>
                            </div>

                            <div className="flex flex-row items-center gap-8">
                                <div className="flex flex-row gap-4">
                                    {/* <Pill label={data.priorityLevel} text={priority.text} bg={priority.bg} /> */}
                                    <Badge label={data.priority_level} styles={priorityStyles[data.priority_level]} />
                                    {/* <Pill label={data.respondStatus} text={status.text} bg={status.bg} /> */}
                                    <Badge label={data.status} styles={statusStyles[data.status]} />
                                </div>
                                <span className="text-xs text-gray-400">{formatRelativeTime(data.created_at)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-slate-200 px-6 py-3">
                <button 
                    onClick={() => onNavigate("issues")}
                    className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:underline">
                        View all issues
                    <FaChevronRight className="w-2 h-2" />
                </button>
            </div>
        </div>
    );
}

export default UrgentsList;