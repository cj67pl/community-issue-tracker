import { BsDownload } from "react-icons/bs";
import KPICard from "../../../common/KPICard.jsx";
import reportsKpiCardsData  from "../../../data/ReportsKPICardsData.js"
import IssuesGraph from "../../../components/Dashboard/IssuesGraph/IssuesGraph.jsx";
import IssuedByStatus from "../../../components/ReportPage/IssuedByStats/IssuedBySats.jsx";
import MonthlyVolume from "../../../components/ReportPage/MonthlyVolume/MonthlyVolume.jsx";

const data = [
    { name: "Avg. Resolution Time", value: 13, color: "#0f5c4c" },
    { name: "Internet / Tech", value: 9, color: "#4d9b7f" },
    { name: "Infrastructure", value: 7, color: "#c8792a" },
    { name: "Safety", value: 5, color: "#7c5cbf" },
    { name: "Other", value: 4, color: "#7fb3d5" },
];


function Reports() {
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
                                card={card}

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