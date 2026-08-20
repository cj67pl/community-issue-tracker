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



{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    fill="currentColor" viewBox="0 0 24 24" >
    <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
    <path d="M11 7h2v6h-2zm0 8h2v2h-2z"></path><path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8"></path>
</svg> */}

{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    fill="currentColor" viewBox="0 0 24 24" >
    <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
    <path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m8-10c0 4.41-3.59 8-8 8-4.07 0-7.44-3.06-7.93-7H12c.55 0 1-.45 1-1V4.07c3.94.49 7 3.86 7 7.93m-9-7.93V11H4.07A8 8 0 0 1 11 4.07"></path>
</svg> */}

{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    fill="currentColor" viewBox="0 0 24 24" >
    <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
    <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
</svg> */}

{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    fill="currentColor" viewBox="0 0 24 24" >
    <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
    <path d="M11 9h2v6h-2zm0 8h2v2h-2z"></path><path d="M12.87 2.51c-.35-.63-1.4-.63-1.75 0l-9.99 18c-.17.31-.17.69.01.99.18.31.51.49.86.49h20c.35 0 .68-.19.86-.49a1 1 0 0 0 .01-.99zM3.7 20 12 5.06 20.3 20z"></path>
</svg> */}