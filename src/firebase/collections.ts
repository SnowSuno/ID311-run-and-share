import { getCollection } from "./utils";
import type { DocumentReference, GeoPoint } from "firebase/firestore";

export interface UserDoc {
  nickname: string;
  photoURL: string;
}

export const usersRef = getCollection<UserDoc>("users");

export interface SprintDoc {
  createdAt: Date;
  distance: number;
  level: "easy" | "medium" | "hard";
  route: GeoPoint[];
  time: number;
  user: DocumentReference<UserDoc>;
}

export const sprintsRef = getCollection<SprintDoc>("sprints");
