import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseTabs from "@/Components/ui/CustomUi/ReuseTabs";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import { Button } from "@/Components/ui/button";
import AddEditCategoryModal from "@/Components/Dashboard/Category/AddEditCategoryModal";
import { CategoryContentType, ICategory } from "@/types";
import { AllImages } from "@/assets/AllImages";
// import { useGetCategoriesQuery, useDeleteCategoryMutation } from "@/redux/features/category/categoryApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real categories API data once the endpoint exists.
const DUMMY_CATEGORIES: ICategory[] = Array.from({ length: 14 }, (_, i) => ({
  _id: `${i + 1}`,
  displayId: "01",
  name: "Education",
  type: "Video",
}));

const TAB_OPTIONS = [
  { label: "Video", value: "Video" },
  { label: "Product", value: "Product" },
  { label: "Service", value: "Service" },
];

const headerCls = "text-sm font-semibold text-base-color";
const cellCls = "text-sm text-base-color";

const CategoryPage = () => {
  const [activeTab, setActiveTab] = useState<CategoryContentType>("Video");

  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // const { data } = useGetCategoriesQuery({ page: 1, limit: 20, type: activeTab }, { refetchOnMountOrArgChange: true });
  // const categories = data?.data?.data ?? [];
  const categories = DUMMY_CATEGORIES;

  // const [deleteCategory] = useDeleteCategoryMutation();
  const handleConfirmDelete = async (_category: ICategory) => {
    // const res = await tryCatchWrapper(
    //   deleteCategory,
    //   { params: { id: _category._id } },
    //   { toastLoadingMessage: "Deleting category..." }
    // );
    // if (res?.success) setIsDeleteConfirmOpen(false);
    setIsDeleteConfirmOpen(false);
  };

  const columns: Column<ICategory>[] = [
    { header: "ID", accessorKey: "displayId", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Category name", accessorKey: "name", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Category Icon",
      accessorKey: "_id",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: () => (
        <div className="">
          <img src={AllImages.cover} alt="Category Icon" className="size-20" />
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: "_id",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setEditingCategory(row);
              setIsModalOpen(true);
            }}
            className="cursor-pointer hover:opacity-70 transition-opacity"
            aria-label={`Edit ${row.name}`}
          >
            <Pencil className="size-4 text-base-color" />
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory(row);
              setIsDeleteConfirmOpen(true);
            }}
            className="cursor-pointer hover:opacity-70 transition-opacity"
            aria-label={`Delete ${row.name}`}
          >
            <Trash2 className="size-4 text-error" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageWraper title="Category">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ReuseTabs
          options={TAB_OPTIONS}
          value={activeTab}
          onChange={(value) => setActiveTab(value as CategoryContentType)}
          variant="solid"
        />
        <Button
          variant="secondary"
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="size-4" />
          Add new category
        </Button>
      </div>

      <ReusableTable data={categories} columns={columns} scroll={false} />

      <AddEditCategoryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
        activeType={activeTab}
      />

      <ConfirmModal<ICategory>
        open={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        currentRecord={selectedCategory}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        iconPreset="delete"
      />
    </PageWraper>
  );
};

export default CategoryPage;
