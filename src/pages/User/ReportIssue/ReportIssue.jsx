import { useState } from "react";
import FormField from "../../../components/ReportingPage/FormField/FormField.jsx";
import { categoryOptions, priorityOptions } from "../../../components/filterOptions.js";

const inputClass =
    "w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20";

function ReportIssue() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(categoryOptions[0]);
    const [priority, setPriority] = useState("High");
    const [location, setLocation] = useState("");
    const [reporter, setReporter] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        
        console.log({ title, description, category, priority, location, reporter });
    }

    return (
        <div className="p-4">
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
                        <FormField label="Description" hint="Include what happened and when you noticed it">
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
                        <FormField label="Category">
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                                {categoryOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Priority">
                            <select value={priority} onChange={(e) => setPriority(e.target.value)} className={inputClass}>
                                {priorityOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
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

                        <FormField label="Reporter">
                            <input
                                type="text"
                                value={reporter}
                                onChange={(e) => setReporter(e.target.value)}
                                placeholder="Your full name"
                                className={inputClass}
                            />
                        </FormField>
                    </div>

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