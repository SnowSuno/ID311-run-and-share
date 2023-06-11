import { getCollection } from "./utils";

export interface UserDoc {
  nickname: string;
  photoURL: string;
}
export const usersRef = getCollection<UserDoc>("users");
