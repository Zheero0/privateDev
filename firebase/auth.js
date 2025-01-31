import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};
export const logOut = () => {
  signOut(auth);
};

