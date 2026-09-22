import { useState } from "react";
import { Plus } from "lucide-react";

import CategoryTable from "../../components/Admin/CategoryTable.jsx";
import CategoryModal from "../../components/Admin/CategoryModal.jsx";
import { categoriesData } from "../../components/Admin/categoriesData.js";

function AdminCategories() {
    const [categories, setCategories] = useState(categoriesData);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    function handleAdd() {
        setSelectedCategory(null);
        setIsModalOpen(true);
    }

    function handleEdit(category) {
        setSelectedCategory(category);
        setIsModalOpen(true);
    }

    function handleSave(categoryData) {
        if (selectedCategory) {
            // Update existing category
            setCategories((prev) =>
                prev.map((category) =>
                    category.id === selectedCategory.id
                        ? { ...category, ...categoryData }
                        : category
                )
            );
        } else {
            // Add new category
            const newCategory = {
                id: Date.now(),
                ...categoryData,
                status: "Active",
                issueCount: 0,
            };

            setCategories((prev) => [...prev, newCategory]);
        }

        setIsModalOpen(false);
        setSelectedCategory(null);
    }

    function handleToggleStatus(id) {
        setCategories((prev) =>
            prev.map((category) =>
                category.id === id
                    ? {
                        ...category,
                        status:
                            category.status === "Active"
                                ? "Inactive"
                                : "Active",
                    }
                    : category
            )
        );
    }

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Categories
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                        Manage issue categories used throughout the system.
                    </p>
                </div>

                <button
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
                >
                    <Plus size={16} />
                    Add Category
                </button>
            </div>

            <div className="mt-5">
                <CategoryTable
                    categories={categories}
                    onEdit={handleEdit}
                    onToggleStatus={handleToggleStatus}
                />
            </div>

            <CategoryModal
                isOpen={isModalOpen}
                category={selectedCategory}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedCategory(null);
                }}
                onSave={handleSave}
            />
        </div>
    );
}

export default AdminCategories;