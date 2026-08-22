import { useState } from 'react'
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";

const issues = [
    {
        issue: "No internet connection",
        category: "Internet / Tech",
        location: "Computer Lab",
        priority: "Critical",
        status: "Open",
        reported: "Aug 12",
    },
    {
        issue: "Broken window in classroom",
        category: "Infrastructure",
        location: "Room 201",
        priority: "High",
        status: "Open",
        reported: "Aug 14",
    },
    {
        issue: "Water leak in restroom",
        category: "Utilities",
        location: "Building A",
        priority: "Medium",
        status: "In Progress",
        reported: "Aug 13",
    },
    {
        issue: "Street light not working",
        category: "Safety",
        location: "Parking Area",
        priority: "Low",
        status: "Open",
        reported: "Aug 12",
    },
    {
        issue: "Garbage not collected",
        category: "Sanitation",
        location: "Back Gate",
        priority: "Low",
        status: "Resolved",
        reported: "Aug 11",
    },
];


const priorityStyles = {
    Critical: "bg-red-600/10 text-red-600",
    High: "bg-orange-600/10 text-orange-600",
    Medium: "bg-amber-500/10 text-amber-500",
    Low: "bg-green-700/10 text-green-700",
};

const statusStyles = {
    Open: "bg-sky-700/10 text-sky-700",
    "In Progress": "bg-purple-500/10 text-purple-500",
    Resolved: "bg-emerald-50 text-emerald-700",
};

function Badge({ label, styles }) {
    return (
        <span
            className={`inline-block shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles}`}
        >
            {label}
        </span>
    );
}

function IssuesPage() {
    return (
        <div className="p-4  ">
            <div className="flex justify-between
                    ">
                <div className="grid gap-2">
                    <h2 className="text-2xl font-bold">Issues</h2>
                    <span className="font-small text-neutral-500 ">View, filter, and manage reported issues.</span>
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
							flex h-12 w-ful
							items-center
							rounded-lg
							border border-slate-200
							transition
							focus-within:border-green-700
							focus-within:ring-2
							focus-within:ring-green-700/20
                            bg-white
                            shadow-sm
                            my-5
                            px-5
							">


                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className='fill-gray-400'
                >
                    <path d="M18 10c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8c1.85 0 3.54-.63 4.9-1.69l5.1 5.1L21.41 20l-5.1-5.1A8 8 0 0 0 18 10M4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6" />
                </svg>
                <input
                    type="text"
                    placeholder="Search for Issues"
                    className="
							h-full w-full
							bg-transparent
							px-3
							text-md
							outline-none
							placeholder:text-slate-400/60
                            
							"
                    
                            
                />
                
            </div>
            <span className="font-small text-neutral-500 ">Showing 7 of 38 issues</span>
            <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm my-5 ">

                <div className="px-6 py-4">
                    <h2 className="text-lg font-bold text-gray-900">Recent Issues</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-y border-slate-200">
                                {["Issue", "Category", "Location", "Priority", "Status", "Reported", ""].map(
                                    (heading) => (
                                        <th
                                            key={heading}
                                            className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
                                        >
                                            {heading}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {issues.map((row) => (
                                <tr key={row.issue} className="border-b border-slate-200 last:border-b-0 hover:bg-[#F6F4EF]/70 cursor-pointer">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                        {row.issue}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-500">{row.category}</td>
                                    <td className="px-6 py-3 text-sm text-gray-500">{row.location}</td>
                                    <td className="px-6 py-3">
                                        <Badge label={row.priority} styles={priorityStyles[row.priority]} />
                                    </td>
                                    <td className="px-6 py-3">
                                        <Badge label={row.status} styles={statusStyles[row.status]} />
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-500">{row.reported}</td>
                                    <td className='flex items-center justify-center px-6 py-3 gap-3 '>
                                        <button className='p-2 border border-slate-200 rounded-lg hover:bg-red-500/10 hover:text-red-700 cursor-pointer'><MdOutlineDelete /></button>
                                        <button className='p-2 border border-slate-200 rounded-lg hover:bg-green-500/10 hover:text-green-700 cursor-pointer'><FiEdit3 /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}

export default IssuesPage;