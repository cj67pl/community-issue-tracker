


import KPICard from "../../../common/KPICard";
import IssuesGraph from "../../../components/Dashboard/IssuesGraph.jsx";
import UrgentsList from "../../../components/Dashboard/UrgentsList";
import RecentIssues from "../../../components/Dashboard/RecentIssues.jsx";
import { IoIosAdd } from "react-icons/io";


import kpiCardsData from '../../../data/KpiCardsData'

function Dashboard() {
    
    return (
        <div className="p-4  ">
            <div className="flex justify-between
                    ">
                <div className="grid gap-2">
                    <h2 className="text-2xl font-bold">My Dashboard</h2>
                    <span className="font-small text-neutral-500 ">Monitor reported issues and identify what needs attention.</span>
                </div>
                <button className="
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
        
            {kpiCardsData.map((card) => (
                <KPICard
                
                    key={card.name}
                    card={card}
                   
                />

            ))}  

            

            </div>

            <div className="grid xl:grid-cols-2  md:grid-cols-1 gap-6">
                <IssuesGraph />
                <UrgentsList />
            </div>

            <RecentIssues />
            
        </div>
    )
}

export default Dashboard;