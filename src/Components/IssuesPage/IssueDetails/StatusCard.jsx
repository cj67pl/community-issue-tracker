import { useState } from "react";
import FilterSelect from "../../../common/FilterSelect.jsx";
import Badge from "../../../common/Badge.jsx";
import {statusOptions} from "../../filterOptions.js";
import {statusStyles} from "../../issuesData.js"
import { IoIosArrowRoundForward } from "react-icons/io";



const inactiveStyle = "bg-gray-100 text-gray-400 border border-gray-200";

function StatusCard({issueStats}) {
    
    
    const [status, setStatus] = useState(issueStats);

    const currentStatusIndex = statusOptions.indexOf(status);
    return(
        <div className="flex flex-col my-5 w-full max-w-md min-w-md h-auto rounded-xl border border-gray-200 bg-white shadow-sm ">


            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">
                    Status
                </h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold mx-6 my-5 ">
                Update Status
            </span>
            <div className="px-6 pb-5 my-2">
                <FilterSelect name="status" placeholder="All Statuses" options={statusOptions} value={status} onChange={setStatus} />
            </div>
            <div className="flex justify-center items-center mb-8">
                {statusOptions.map((stats, key) => {

                    const isPastOrCurrent = key <= currentStatusIndex;
                    const styleToApply = isPastOrCurrent
                        ? statusStyles[stats]
                        : inactiveStyle;
                return (
                    <div key={key} className="flex items-center gap-2">
                        <Badge label={stats} styles={styleToApply} size="md" />
                        {key < statusOptions.length - 1 && (
                            <IoIosArrowRoundForward
                                className={`text-xl ${key < currentStatusIndex
                                    ? "text-gray-700"
                                    : "text-gray-300"
                                    }`}
                            />
                        )}
                    </div>
                )
            })}

            </div>
            {/* <div className="border-t border-slate-200"></div> */}

        </div>
    )

}

export default StatusCard;