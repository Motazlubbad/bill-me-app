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
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/use-auth";
import { type Bill, type BillFormData } from "@/lib/types/bill";

export function useBills() {
  const { user } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const colRef = collection(db, "users", user.uid, "bills");
    const q = query(colRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBills(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Bill))
      );
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addBill = async (data: BillFormData) => {
    if (!user) return;
    const colRef = collection(db, "users", user.uid, "bills");
    await addDoc(colRef, {
      ...data,
      dueDate: Timestamp.fromDate(data.dueDate),
      paidDate: data.paidDate ? Timestamp.fromDate(data.paidDate) : null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  const updateBill = async (id: string, data: Partial<BillFormData>) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid, "bills", id);
    const updateData: Record<string, unknown> = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    if (data.dueDate) {
      updateData.dueDate = Timestamp.fromDate(data.dueDate);
    }
    if (data.paidDate) {
      updateData.paidDate = Timestamp.fromDate(data.paidDate);
    }
    await updateDoc(docRef, updateData);
  };

  const deleteBill = async (id: string) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid, "bills", id);
    await deleteDoc(docRef);
  };

  return { bills, loading, addBill, updateBill, deleteBill };
}
