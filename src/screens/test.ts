import { doc, getDoc } from "firebase/firestore";
import { usersRef } from "../firebase/collections";

async () => {


  const userSnap = await getDoc(doc(usersRef, "123"));
  const user = userSnap.data();
};
