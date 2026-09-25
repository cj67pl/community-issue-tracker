import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import CategoryTable from "../../components/Admin/CategoryTable.jsx";
import CategoryModal from "../../components/Admin/CategoryModal.jsx";
// import { categoriesData } from "../../components/Admin/categoriesData.js";
 
import { apiRequest } from "../../api/api.js";

function AdminCategories() {
    const [categories, setCategories] = useState([]);

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

    async function handleSave(categoryData) {
        try {
            if (selectedCategory) {
                const response = await apiRequest(
                    `/categories/${selectedCategory.id}`,
                    {
                        method: "PATCH",
                        body: JSON.stringify({
                            category_name: categoryData.name,
                            description: categoryData.description,
                        }),
                    }
                );

                setCategories((prev) =>
                    prev.map((category) =>
                        category.id === selectedCategory.id
                            ? {
                                ...category,
                                ...response.category,
                            }
                            : category
                    )
                );
            } else {
                const response = await apiRequest("/categories", {
                    method: "POST",
                    body: JSON.stringify({
                        category_name: categoryData.name,
                        description: categoryData.description,
                    }),
                });

                setCategories((prev) => [
                    ...prev,
                    response.category,
                ]);
            }

            closeModal();
        } catch (error) {
            console.error("Failed to save category:", error);
        }
    }



    async function handleToggleStatus(category) {
        try {
            const newStatus = !category.is_active;

            const response = await apiRequest(
                `/categories/${category.id}/status`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        is_active: newStatus,
                    }),
                }
            );

            setCategories((prev) =>
                prev.map((item) =>
                    item.id === category.id
                        ? {
                            ...item,
                            ...response.category,
                        }
                        : item
                )
            );
        } catch (error) {
            console.error("Failed to update category status:", error);

            await fetchCategories();
        }
    }
    
    function closeModal() {
        setIsModalOpen(false);
        setSelectedCategory(null);
    }


    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const data = await apiRequest("/categories");

            console.log("CATEGORIES:", data);

            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
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