import { useState } from "react";
import FilterSelect from "../FilterSelect/FilterSelect.jsx";
import { categoryOptions, priorityOptions, statusOptions, sortOptions } from "../filterOptions.js";

function IssueFilters() {
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("Newest");

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <FilterSelect name="category" placeholder="All Categories" options={categoryOptions} value={category} onChange={setCategory} />
            <FilterSelect name="priority" placeholder="All Priorities" options={priorityOptions} value={priority} onChange={setPriority} />
            <FilterSelect name="status" placeholder="All Statuses" options={statusOptions} value={status} onChange={setStatus} />
            <FilterSelect name="sort" placeholder="Sort" options={sortOptions} value={sort} onChange={setSort} />
        </div>
    );
}

export default IssueFilters;