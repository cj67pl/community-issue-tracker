import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Badge from "../../common/Badge";
import { priorityStyles, statusStyles } from "../issuesData";

import { apiRequest } from "../../api/api";
import { formatRelativeTime } from "../../utils/dateHelper";
// function Badge({ label, styles }) {
//     return (
//         <span
//             className={`inline-block shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles}`}
//         >
//             {label}
//         </span>

//     );
// }


function RecentIssues({ onNavigate}) {
    // console.log("current user recent issuees page:", currentUser);
    const [recentIssues, setRecentIssues] = useState([]);

    useEffect(() => {
        const fetchRecentIssues = async () => {
            try{
                const result = await apiRequest("/dashboard/recent/issues");
                // console.log(result);
                setRecentIssues(result.issues);                
            }
            catch (error) {
                console.log("Failed to fetch recent issues");
                
            }

            
        }
        fetchRecentIssues();
    }, [])
    return (
        <div className="w-full rounded-xl min-w-sm border border-gray-200 bg-white shadow-sm my-5 ">
            
            <div className="px-6 py-4">
                {/* <h3 className="text-lg font-bold text-gray-900">{`${(currentUser === 'reporter' ? "My Reports" : "Recent Issues")}`}</h3> */}
                <h3 className="text-lg font-bold text-gray-900">Recent Issues</h3>
            </div>
            
            <div className="overflow-x-auto">   
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-y border-slate-200">
                        {["Issue", "Category", "Location", "Priority", "Status", "Reported"].map(
                        (heading) => (
                            <th
                            key={heading}
                            className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
                            >
                            {heading}
                            </th>
                        )
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {recentIssues.map((row) => (
                        <tr key={row.id} className="border-b border-slate-200 last:border-b-0">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                            {row.title}
                        </td>
                            <td className="px-6 py-3 text-sm text-gray-500">{row.category}</td>
                        <td className="px-6 py-3 text-sm text-gray-500">{row.location}</td>
                        <td className="px-6 py-3">
                            <Badge label={row.priority_level} styles={priorityStyles[row.priority_level]} />
                            {/* <Badge label={row.priority} styles={priorityStyles[row.priority]} /> */}
                        </td>
                        <td className="px-6 py-3">
                            <Badge label={row.status} styles={statusStyles[row.status]} />
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-500">{formatRelativeTime(row.created_at)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
    )
}

export default RecentIssues;