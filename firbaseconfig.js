import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC6TcZIKAlMOXmD8oNCKZR2OUFGwIHXigs",
  authDomain: "irecruitforhire.firebaseapp.com",
  projectId: "irecruitforhire",
  storageBucket: "irecruitforhire.appspot.com",
  messagingSenderId: "522579595386",
  appId: "1:522579595386:web:1eeb29ae6b1509a419ebc3",
  measurementId: "G-712YK6H854",
  storageBucket: "irecruitforhire.appspot.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, "gs://irecruitforhire.appspot.com");
export const auth = getAuth(app);
export const db = getFirestore(app);
