"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/use-auth";
import { type Bill } from "@/lib/types/bill";

export function useBill(billId: string) {
  const { user } = useAuth();
  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !billId) return;

    const docRef = doc(db, "users", user.uid, "bills", billId);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setBill({ id: snapshot.id, ...snapshot.data() } as Bill);
      } else {
        setBill(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [user, billId]);

  return { bill, loading };
}
