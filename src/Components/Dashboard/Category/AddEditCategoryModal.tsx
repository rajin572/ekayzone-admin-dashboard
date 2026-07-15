import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { FormInput, FormUpload } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { Button } from "@/Components/ui/button";
import { categorySchema, CategoryFormValues } from "@/schemas/category";
import { CategoryContentType, ICategory } from "@/types";
// import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/redux/features/category/categoryApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

interface AddEditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: ICategory | null;
  /** The active tab (Video/Product/Service) — sent to the server as the category's type. */
  activeType: CategoryContentType;
}

const AddEditCategoryModal = ({ open, onClose, category, activeType }: AddEditCategoryModalProps) => {
  const isEdit = !!category;

  const { control, handleSubmit, reset } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", icon: [] },
  });

  useEffect(() => {
    if (open) reset({ name: category?.name ?? "", icon: [] });
  }, [open, category, reset]);

  // const [createCategory] = useCreateCategoryMutation();
  // const [updateCategory] = useUpdateCategoryMutation();
  const onSubmit = async (_values: CategoryFormValues) => {
    // const formData = new FormData();
    // formData.append("data", JSON.stringify({ name: _values.name, type: activeType }));
    // if (_values.icon?.[0]?.file) formData.append("icon", _values.icon[0].file);
    // const res = isEdit
    //   ? await tryCatchWrapper(updateCategory, { params: { id: category!._id }, body: formData }, { toastLoadingMessage: "Updating category..." })
    //   : await tryCatchWrapper(createCategory, { body: formData }, { toastLoadingMessage: "Creating category..." });
    // if (res?.success) { reset(); onClose(); }
    void activeType; // referenced above once the real create/update call is restored
    reset();
    onClose();
  };

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={isEdit ? "Edit Category" : "Add New Category"}
      maxWidth="sm:max-w-xl"
      footer={
        <div className="flex justify-start gap-3 w-full">
          <Button type="submit" form="category-form" variant="secondary">
            {isEdit ? "Save" : "Add"}
          </Button>
          <Button type="button" variant="ghost" className="text-error hover:text-error/90 hover:bg-error/10" onClick={onClose}>
            Cancel
          </Button>
        </div>
      }
    >
      <form id="category-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          control={control}
          name="name"
          label="Category Title"
          placeholder="Enter category title"
        />
        <FormUpload control={control} name="icon" label="Category Icon" accept="image/svg+xml,image/png" maxFiles={1} hint="SVG or PNG" />
      </form>
    </ReusableModal>
  );
};

export default AddEditCategoryModal;
