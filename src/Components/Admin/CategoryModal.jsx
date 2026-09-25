import { useEffect, useState } from "react";
import { X } from "lucide-react";

function CategoryModal({ isOpen, category, onClose, onSave }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
 
    useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description);
        } else {
            setName("");
            setDescription("");
        }
    }, [category, isOpen]);

    if (!isOpen) return null;

    function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            return;
        }

        onSave({
            name: name.trim(),
            description: description.trim(),
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <h3 className="text-lg font-bold text-gray-900">
                        {category ? "Edit Category" : "Add Category"}
                    </h3>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Category Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter category name"
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-700"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter category description"
                            rows={4}
                            className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-700"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryModal;