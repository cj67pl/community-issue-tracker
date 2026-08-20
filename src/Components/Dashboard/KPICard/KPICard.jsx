import {React, State, Props} from "react";


function KPICard({card}) {
    return (
        <div className="
                    flex flex-col
                    border 
                    border-slate-200
                    bg-white
                    p-4
                    rounded-xl
                    shadow-sm
                    shrink-0
                    ">
            
            <div className="flex items-center gap-4 font-bold text-neutral-500" >
                <div className={`flex h-9 w-9 items-center justify-center rounded-md ${card.background}`}>
                    <svg
                        className={`${card.fill}`}
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        fill="currentColor" viewBox="0 0 24 24" >
                        {/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
                        {
                            card.svgPaths?.map((path, index) => (
                                <path key={index} d={path}></path>
                            ))
                        }
                        {/* <path d="M8 13h8v2H8z"></path>
                        <path d="M19 3h-2c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 17H5V5h2v2h10V5h2z"></path> */}
                    </svg>
                    

                </div>

                {card.name}
            </div>
            <p className="text-4xl font-bold my-3 self-center ">38</p>
            <span className="text-gray-400 self-center">{card.statsDescription}</span>
        </div>
    )
}

export default KPICard;



