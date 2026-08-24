import UserProfile from "../../../common/UserProfile"

function ReporterCard({initials, name, role, variant}) {
    return(
        <div className="flex flex-col my-5 w-full max-w-md min-w-md h-auto rounded-xl border border-gray-200 bg-white shadow-sm ">


            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">
                    Reported By
                </h3>
            </div>
            <div className="p-5">
                <UserProfile 
                    initials={initials}
                    name={name}
                    role={role}
                    variant={variant}
                />
            </div>
            
        </div>
    )
}

export default ReporterCard;