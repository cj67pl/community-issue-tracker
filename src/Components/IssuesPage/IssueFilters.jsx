import { useState } from "react";
import FilterSelect from "../../common/FilterSelect.jsx";
import { categoryOptions, priorityOptions, statusOptions, sortOptions } from "../filterOptions.js";

function IssueFilters(currentUser) {
    const userRole = String(currentUser.currentUser.role).toLocaleLowerCase().trim();
    console.log("userrole:", userRole);
    
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("Newest");


    const filters = [

        { 
            key: "category", 
            roles: ["coordinator", "reporter"],
            element: (
                <FilterSelect name="category" placeholder="All Categories" options={categoryOptions} value={category} onChange={setCategory} />
            )
        
        },
        {
            key: "category",
            roles: ["coordinator"],
            element: (
                <FilterSelect name="priority" placeholder="All Priorities" options={priorityOptions} value={priority} onChange={setPriority} />
            )

        },
        {
            key: "category",
            roles: ["coordinator"],
            element: (
                <FilterSelect name="status" placeholder="All Statuses" options={statusOptions} value={status} onChange={setStatus} />
            )

        },
        {
            key: "category",
            roles: ["coordinator", "reporter"],
            element: (
                <FilterSelect name="sort" placeholder="Sort" options={sortOptions} value={sort} onChange={setSort} />
            )

        },
    ]
    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {filters
                .filter((filter) => filter.roles.includes(userRole))
                .map((filter) => (
                    <div key={filter.key}>{filter.element}</div>
                ))
            }
            
            
            
            
           
        </div>
    );
}

export default IssueFilters;