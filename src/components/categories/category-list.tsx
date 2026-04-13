"use client";

import { type Category } from "@/lib/types/category";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <Card key={cat.id} className="border border-[#d9d9d9]">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {cat.color && (
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              )}
              <span className="font-medium">{cat.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => onEdit(cat)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => onDelete(cat)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
