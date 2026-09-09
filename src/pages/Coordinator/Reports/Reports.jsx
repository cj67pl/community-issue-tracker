import { useState, useEffect } from "react";
import { BsDownload } from "react-icons/bs";
import KPICard from "../../../common/KPICard.jsx";
import reportsKpiCardsData  from "../../../data/ReportsKPICardsData.js"
import IssuesGraph from "../../../components/Dashboard/IssuesGraph.jsx";
import IssuedByStatus from "../../../components/ReportPage/IssuedBySats.jsx";
import MonthlyVolume from "../../../components/ReportPage/MonthlyVolume.jsx";



import { apiRequest } from "../../../api/api.js";
import { use } from "react";

// export const reportsKpiCardsData = [
//     {
//         name: "Avg. Resolution Time",
//         icon: Clock3,
//         color: "text-green-700",
//         background: "bg-green-700/10",
//         statsData: "3.4d",
//         statsDescription: "Down from 4.1d last month",
//     },
//     {
//         name: "Resolution Rate",
//         icon: CheckCircle2,
//         color: "text-sky-700",
//         background: "bg-sky-700/10",
//         statsData: "76%",
//         statsDescription: "29 of 38 issues resolved",
//     },
//     {
//         name: "Reports This Month",
//         icon: FilePlus2,
//         color: "text-purple-500",
//         background: "bg-purple-500/10",
//         statsData: "14",
//         statsDescription: "22% more than last month",
//     },
//     {
//         name: "Open Issues",
//         icon: CircleAlert,
//         color: "text-red-700",
//         background: "bg-red-700/10",
//         statsData: "7",
//         statsDescription: "12% fewer than last month",
//     },
// ];
const data = [
    { name: "Avg. Resolution Time", value: 13, color: "#0f5c4c" },
    { name: "Internet / Tech", value: 9, color: "#4d9b7f" },
    { name: "Infrastructure", value: 7, color: "#c8792a" },
    { name: "Safety", value: 5, color: "#7c5cbf" },
    { name: "Other", value: 4, color: "#7fb3d5" },
];


function Reports() {

    const [averageResTime, setAverageResTime] = useState("");

    useEffect(() => {
        async function fetchAnalyticsData() {
            try{
                const aveResulotionTime = await apiRequest("/analytics/average/days");
                // console.log(aveResulotionTime);
                
                setAverageResTime(aveResulotionTime);
                
                
            }
            catch(error) {
                console.error("Failed to fetch the required informations!")
            }            
        }
        fetchAnalyticsData();

    }, []);
    console.log("Average Resolution Time: ", averageResTime);

    const kpis = {
        ave_res_time: averageResTime
            ? `${averageResTime.current}d`
            : "Loading...",

        ave_res_time_description: averageResTime
            ? `${averageResTime.direction === "down" ? "Down" : "Up"} from ${averageResTime.change}d last month`
            : "Loading...",
        resolution_rate:"55",
        reps_this_month:"2",
        reps_this_month:"2",
        top_location:"2"

    }

    return (
        <div className="p-4">
            <div className="">
                <div className="flex justify-between mb-10">
                    <div className="grid gap-2">
                        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
                        <span className="text-sm text-neutral-500">Tell us what needs attention.</span>
                    </div>

                    <button className="
                                flex items-center justify-center
                                gap-3
                                rounded-md
                                text-small
                                border
                                border-gray-300
                                font-semibold
                                bg-white
                                h-10
                                px-5
                                hover:bg-teal-800/10
                    "   
                    >
                        <BsDownload IoIosAdd size={18}/>
                        <span className="hidden sm:inline">Export CSV</span>
                    </button>
                </div>
                
                <div className="
                    grid xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-2 gap-6
                    my-5
                ">

                        {reportsKpiCardsData.map((card) => (
                            <KPICard

                                key={card.name}
                                
                                card={{
                                    ...card,
                                    statsData: kpis ? kpis[card.key] : "Loading...",
                                    statsDescription: kpis
                                        ? kpis[`${card.key}_description`]
                                        : "Loading...",
                                }}

                            />

                        ))}  

                </div>
                <div className="grid xl:grid-cols-2  md:grid-cols-1 gap-6">
                    <IssuesGraph />
                    <IssuedByStatus />
                </div>

                <div className="my-5">
                    <MonthlyVolume />
                </div>
                
            </div>
        </div> 
    ) 
}


export default Reports;