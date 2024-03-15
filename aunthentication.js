import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firbaseconfig";

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
