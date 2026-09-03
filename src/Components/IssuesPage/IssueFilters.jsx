import { useState, useEffect } from "react";
import FilterSelect from "../../common/FilterSelect.jsx";
import { apiRequest } from "../../api/api.js";


function IssueFilters({
    currentRole,
    category,
    setCategory,
    priority,
    setPriority,
    status,
    setStatus,
    sort,
    setSort,
}) {
    const [categories, setCategories] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [statuses, setStatuses] = useState([]);
    
    
    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const response = await apiRequest("/issues/filter-options");

                console.log("FILTER OPTIONS:", response);

                setCategories(response.categories);
                setPriorities(response.priorities);
                setStatuses(response.statuses);

            } catch (error) {
                console.error("Failed to fetch filter options:", error);
            }
        };

        fetchFilterOptions();
    }, []);

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const priorityOptions = priorities.map((priority) => ({
        value: priority.id,
        label: priority.name,
    }));

    const statusOptions = statuses.map((status) => ({
        value: status.id,
        label: status.name,
    }));
    
    console.log("RAW STATUSES:", statuses);
    console.log("STATUS OPTIONS:", statusOptions);
    

    // Sorting doesn't come from the database.
    const sortOptions = [
        {
            value: "newest",
            label: "Newest",
        },
        {
            value: "oldest",
            label: "Oldest",
        },
    ];

    const filters = [
        {
            key: "category",
            roles: ["coordinator", "reporter"],
            element: (
                <FilterSelect
                    name="category"
                    placeholder="All Categories"
                    options={categoryOptions}
                    value={category}
                    onChange={setCategory}
                />
            ),
        },
        {
            key: "priority",
            roles: ["coordinator"],
            element: (
                <FilterSelect
                    name="priority"
                    placeholder="All Priorities"
                    options={priorityOptions}
                    value={priority}
                    onChange={setPriority}
                />
            ),
        },
        {
            key: "status",
            roles: ["coordinator"],
            element: (
                <FilterSelect
                    name="status"
                    placeholder="All Statuses"
                    options={statusOptions}
                    value={status}
                    onChange={setStatus}
                />
            ),
        },
        {
            key: "sort",
            roles: ["coordinator", "reporter"],
            element: (
                <FilterSelect
                    name="sort"
                    placeholder="Sort"
                    options={sortOptions}
                    value={sort}
                    onChange={setSort}
                />
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {filters
                .filter((filter) => filter.roles.includes(currentRole))
                .map((filter) => (
                    <div key={filter.key}>
                        {filter.element}
                    </div>
                ))}
        </div>
    );
}

export default IssueFilters;