import { useState, useEffect } from "react";
import FormField from "../../../components/ReportingPage/FormField.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";

import { apiRequest } from "../../../api/api.js";

const inputClass =
    "w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20";

function ReportIssue({currentRole}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [location, setLocation] = useState("");

    const [openHowTo, setOpenHowTo] = useState(false);

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [priorityOptions, setPriorityOptions] = useState([]);

    const [submitError, setSubmitError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    // function handleSubmit(e) {
    //     e.preventDefault();
        
    //     console.log({ title, description, category, priority, location });
    // }
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setCategory("");
        setPriority("");
        setLocation("");
    };
    useEffect(() => {
        const fetchCategoryOptions = async () => {
            try {
                const response = await apiRequest("/issues/filter-options");

                console.log("FILTER OPTIONS:", response.categories);

                
                setCategoryOptions(response.categories);
                console.log(categoryOptions);
                
                setPriorityOptions(response.priorities);

            } catch (error) {
                console.error("Failed to fetch filter options:", error);
            }
        };
        fetchCategoryOptions();
    }, []);
    

    // const categoryOptions = statusOptions.findIndex(
    //     (stats) => stats.name === status
    // );

    function handleHowToCLick(openHowTo) {
        openHowTo === false ? setOpenHowTo(true) : setOpenHowTo(false);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ title, description, category, priority, location });
        setSubmitError("");

        if (!title.trim()) {
            setSubmitError("Please enter an issue title.");
            return;
        }

        if (!description.trim()) {
            setSubmitError("Please provide a description of the issue.");
            return;
        }

        if (!category) {
            setSubmitError("Please select a category.");
            return;
        }

        if (!priority) {
            setSubmitError("Please select a priority.");
            return;
        }

        if (!location.trim()) {
            setSubmitError("Please enter the issue location.");
            return;
        }
        
        try {
            await apiRequest("/issues", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description:description,
                    category_id:category,
                    priority_level_id:priority,
                    location:location

                })
            });
            resetForm();
            setShowSuccess(true);
            // const updatedIssues = await apiRequest(
            //     `/issues`
            // )

            // return updatedIssues;
            
        }
        catch (error) {
            console.error("Failed to upload issue!", error);
            
        }
    }
    return (
        <div className="p-4">
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl">

                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                            <span className="text-xl text-teal-700">✓</span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900">
                            Issue Submitted
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Your issue has been successfully reported.
                        </p>

                        <button
                            type="button"
                            onClick={() => setShowSuccess(false)}
                            className="mt-6 w-full rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
                        >
                            Done
                        </button>

                    </div>
                </div>
            )}
            <div className="">
                <div className="flex justify-between mb-10">
                    <div className="grid gap-2">
                        <h2 className="text-2xl font-bold">Report issue</h2>
                        <span className="text-sm text-neutral-500">Tell us what needs attention.</span>
                    </div>
                   

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >
                    <FormField label="Issue Title">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Broken projector in Science Lab"
                            className={inputClass}
                        />
                    </FormField>

                    <div className="mt-6">
                        <FormField label="Description" hint="Include what happened and when you noticed it"                        >
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="The projector does not turn on even after checking the power connection..."
                                rows={5}
                                className={`${inputClass} resize-y`}
                            />
                        </FormField>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField label="Category"
                            hint="Choose the area that best describes the issue."
                        >
                            <div className='relative flex justify-between w-full sm:w-auto'>
                                <select 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)} 
                                    className={`${inputClass} appearance-none `}
                                >`
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    {categoryOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                                    <ChevronDown className="h-5 w-5" />
                                </div>

                            </div>

                        </FormField>

                        <FormField 
                            label="Priority" 
                            Level
                            hint="Choose based on how disruptive the issue is."
                        >
                            <div className='relative flex justify-between w-full sm:w-auto'>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className={`${inputClass} appearance-none `}
                                >
                                    <option value="" disabled>
                                       Select Priority
                                    </option>
                                    {priorityOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                                    <ChevronDown className="h-5 w-5" />
                                </div>
                            </div>


                            <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                                <div
                                    onClick={() => handleHowToCLick(openHowTo)} 
                                    className="flex  cursor-pointer">
                                    <p 
                                        type="button"
                                        className="font-semibold text-slate-700 pr-2 hover:text-black ">
                                        How should I choose?
                                    </p>
                                    {openHowTo === true ? 
                                            <ChevronUp size={15} className="hover:text-black"/>
                                        :
                                            <ChevronDown size={15} className="hover:text-black"/>
                                    }
                                </div>
                                
                                {openHowTo === true ? 
                                    <>
                                        <ul className="mt-1.5 space-y-1">
                                            <li>
                                                <span className="font-medium text-red-600">High:</span>{" "}
                                                Prevents essential work or involves an immediate safety/security concern.
                                            </li>
                                            <li>
                                                <span className="font-medium text-orange-600">Medium:</span>{" "}
                                                Affects normal operations but a workaround is available.
                                            </li>
                                            <li>
                                                <span className="font-medium text-yellow-600">Low:</span>{" "}
                                                Minor issue with little immediate impact.
                                            </li>
                                        </ul>

                                        <p className="mt-2 text-slate-500">
                                            Staff may review and adjust the priority after submission.
                                        </p>
                                    </>
                                    :
                                    <></>
                                   
                                }
                            </div>
                        </FormField>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField label="Location">
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g. Science Laboratory"
                                className={inputClass}
                            />
                        </FormField>

                        {/* <FormField label="Reporter">
                            <input
                                type="text"
                                value={reporter}
                                onChange={(e) => setReporter(e.target.value)}
                                placeholder="Your full name"
                                className={inputClass}
                            />
                        </FormField> */}
                    </div>
                    {submitError && (
                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mt-5">
                            {submitError}
                        </div>
                    )}

                    <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
                        <button
                            type="button"
                            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
                        >
                            Submit Issue
                        </button>
                    </div>
                </form>

                
            </div>
        </div>
    )
}

export default ReportIssue;