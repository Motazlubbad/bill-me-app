"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/use-auth";
import { type Category, DEFAULT_CATEGORIES } from "@/lib/types/category";

export function useCategories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const colRef = collection(db, "users", user.uid, "categories");
    const q = query(colRef, orderBy("name", "asc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (snapshot.empty) {
        // Seed default categories on first use
        await seedDefaultCategories(user.uid);
      } else {
        setCategories(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Category))
        );
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addCategory = async (data: { name: string; icon?: string; color?: string }) => {
    if (!user) return;
    const colRef = collection(db, "users", user.uid, "categories");
    await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  };

  const updateCategory = async (id: string, data: { name: string; icon?: string; color?: string }) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid, "categories", id);
    await updateDoc(docRef, data);
  };

  const deleteCategory = async (id: string) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid, "categories", id);
    await deleteDoc(docRef);
  };

  return { categories, loading, addCategory, updateCategory, deleteCategory };
}

async function seedDefaultCategories(uid: string) {
  const colRef = collection(db, "users", uid, "categories");
  const snapshot = await getDocs(colRef);
  if (!snapshot.empty) return;

  for (const cat of DEFAULT_CATEGORIES) {
    await addDoc(colRef, {
      name: cat.name,
      icon: cat.icon,
      color: cat.color,
      createdAt: serverTimestamp(),
    });
  }
}
