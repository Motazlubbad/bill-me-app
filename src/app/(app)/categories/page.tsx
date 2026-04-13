"use client";

import { useState } from "react";
import { useCategories } from "@/lib/hooks/use-categories";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { CategoryList } from "@/components/categories/category-list";
import { CategoryForm } from "@/components/categories/category-form";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { type Category } from "@/lib/types/category";
import { type CategorySchemaType } from "@/lib/validators/category-schema";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function CategoriesPage() {
  const { categories, loading, addCategory, updateCategory, deleteCategory } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleAdd = async (data: CategorySchemaType) => {
    try {
      await addCategory(data);
      toast.success("Category created");
    } catch {
      toast.error("Failed to create category");
    }
  };

  const handleEdit = async (data: CategorySchemaType) => {
    if (!editTarget) return;
    try {
      await updateCategory(editTarget.id, data);
      toast.success("Category updated");
      setEditTarget(null);
    } catch {
      toast.error("Failed to update category");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCategory(deleteTarget.id);
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Categories" description="Manage your bill categories">
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </PageHeader>

      <CategoryList
        categories={categories}
        onEdit={(cat) => setEditTarget(cat)}
        onDelete={(cat) => setDeleteTarget(cat)}
      />

      <CategoryForm
        open={showForm}
        onOpenChange={setShowForm}
        onSubmit={handleAdd}
        title="Add Category"
      />

      {editTarget && (
        <CategoryForm
          open={!!editTarget}
          onOpenChange={(open) => !open && setEditTarget(null)}
          defaultValues={{ name: editTarget.name, color: editTarget.color }}
          onSubmit={handleEdit}
          title="Edit Category"
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Category"
        description={`Delete "${deleteTarget?.name}"? This won't delete bills using this category.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
