import { db } from "./config";

import {
  collection,
  type CollectionReference,
  type DocumentData,
} from "firebase/firestore";

export const getCollection = <T extends DocumentData> (collectionName: string) =>
  collection(db, collectionName) as CollectionReference<T>;
