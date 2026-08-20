import KPICard from "./KPICard/KPICard";
import IssuesGraph from "./IssuesGraph/IssuesGraph";
import UrgentsList from "./UrgentsList/UrgentsList";

import kpiCardsData from '../../data/KpiCardsData'

function Dashboard() {
    
    return (
        <div className="p-4  ">
            <div className="flex justify-between
                    ">
                <div className="grid gap-2">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                        fill="currentColor" viewBox="0 0 24 24" >
                        {/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
                        <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
                    </svg>
                    Report issue
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
            
        </div>
    )
}

export default Dashboard;