
const urgentsData =[
    {
        id: crypto.randomUUID(),
        problem: "No internet connection",
        location: "Computer Laboratory",
        priorityLevel: "Critical",
        respondStats: "Open",
        dateReported: "5d ago",
        dot: "bg-red-700 ",
        pill1txt: "text-red-700 ",
        pill1bg: "bg-red-700/10",
        pill2txt: "text-sky-700 ",
        pill2bg: "bg-sky-700/10",
    },
    {
        id: crypto.randomUUID(),
        problem: "Broken electrical outlet",
        location: "Room 204",
        priorityLevel: "Critical",
        respondStats: "Open",
        dateReported: "3d ago",
        dot: "bg-red-700 ",
        pill1txt: "text-red-700 ",
        pill1bg: "bg-red-700/10",
        pill2txt: "text-sky-700 ",
        pill2bg: "bg-sky-700/10",
    },
    {
        id: crypto.randomUUID(),
        problem: "Broken projector",
        location: "Science Laboratory",
        priorityLevel: "High",
        respondStats: "In Progress",
        dateReported: "8d ago",
        dot: "bg-orange-600 ",
        pill1txt: "text-orange-600 ",
        pill1bg: "bg-orange-600/10",
        pill2txt: "text-purple-500 ",
        pill2bg: "bg-purple-500/10",
    },
    {
        id: crypto.randomUUID(),
        problem: "Leaking Faucet",
        location: "Faculty Room",
        priorityLevel: "Medium",
        respondStats: "Open",
        dateReported: "2d ago",
        dot: "bg-amber-500 ",
        pill1txt: "text-amber-500 ",
        pill1bg: "bg-amber-500/10",
        pill2txt: "text-sky-700 ",
        pill2bg: "bg-sky-700/10",
    }
]

function UrgentsList () {
    return (
        <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">Needs Attention</h3>
            </div>
            {urgentsData.map((data, key) => (

                <div className="flex flex-row justify-between items-center px-5 py-3 border-b border-gray-200">
                    <div className="flex flex-row items-center gap-3">
                        <div className={` h-2.5 w-2.5 ${data.dot} rounded-2xl`}></div>
                        <div className="">
                            <p className="font-semibold text-sm">{data.problem}</p>
                            <span className="text-xs text-gray-400 ">{data.location}</span>
                        </div>
                        
                    </div>
                    <div className="flex flex-row gap-8 items-center">
                        <div className="flex flex-row gap-4">
                            <div className={` rounded-2xl px-3 py-1 ${data.pill1bg} ${data.pill1txt} font-semibold text-xs`}>{data.priorityLevel}</div>
                            <div className={` rounded-2xl px-3 py-1 ${data.pill2bg} ${data.pill2txt} font-semibold text-xs`}>{data.respondStats}</div> 
                        </div>
                        <span className="text-xs text-gray-400">{data.dateReported}</span>
                    </div>
                </div>                 
            ))
  
            }
            <div className="border-t border-slate-200 px-6 py-3">
                <button className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:underline">
                    View all issues
                    <span aria-hidden>›</span>
                </button>
            </div>
        </div>
    )

}

export default UrgentsList;