import { getCollection } from "./utils";
import type {
  CollectionReference,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";
import { Geolocation } from "~/utils/geolocation";

export interface UserDoc {
  nickname: string;
  photoURL: string;
}

export const usersRef = getCollection<UserDoc>("users");

export interface SprintDoc {
  createdAt: Timestamp;
  distance: number;
  level: "easy" | "medium" | "hard";
  route: Geolocation[];
  time: number;
  user: DocumentReference<UserDoc>;
}

export const sprintsRef: CollectionReference<SprintDoc> = getCollection<SprintDoc>("sprints")
  .withConverter({
    toFirestore: (data) => ({
      ...data,
      route: data.route.map(loc => loc.toFirestore())
    }),
    fromFirestore: (snapshot) => {
      const {route, ...rest} = snapshot.data();
      return ({
        ...rest,
        route: route.map(geoPoint => Geolocation.fromFirestore(geoPoint))
      })
    },
  });
