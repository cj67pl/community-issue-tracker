import { useEffect, useState } from "react";


import KPICard from "../../../common/KPICard";
import IssuesGraph from "../../../components/Dashboard/IssuesGraph";
import UrgentsList from "../../../components/Dashboard/UrgentsList.jsx";
import RecentIssues from "../../../components/Dashboard/RecentIssues.jsx";
import { IoIosAdd } from "react-icons/io";

import { apiRequest } from "../../../api/api.js";

import kpiCardsData from '../../../data/KpiCardsData'


function Dashboard({onNavigate}) {

    const [kpis, setKpis] = useState(null);
    useEffect(() =>{
        const fetchKPIs = async () => {

            try {
                const data = await apiRequest("/dashboard/kpis");
                // console.log("DASHBOARD KPIs:", data.kpis);
                setKpis(data.kpis);
                
            }
            catch(error){
                console.error("Failed to fetch dashboard KPIs:", error);
                localStorage.removeItem("token");
            }
        }
        fetchKPIs();

    }, []);

    // useEffect(() => {
    //     console.log("ISSUES COMPONENT LOADED");
    //     const testApi = async () => {

    //         try {
    //             const data = await apiRequest("/issues");
    //             console.log("API DATA:", data);
    //         } catch (error) {
    //             console.error("API ERROR:", error);
    //         }
    //     };

    //     testApi();
    // }, []);
    
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
                    card={{
                        ...card,
                        statsData: kpis ? kpis[card.key] : "Loading...",}}
                   
                />

            ))}  

            

            </div>

            <div className="grid xl:grid-cols-2  md:grid-cols-1 gap-6">
                <IssuesGraph />
                <UrgentsList onNavigate={onNavigate} />
            </div>

            <RecentIssues onNavigate={onNavigate} />
            
        </div>
    )
}

export default Dashboard;