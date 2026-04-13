import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  currency: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
