import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { getMessaging } from "firebase/messaging";

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
export const db = getFirestore(app);
// export const messaging = getMessaging(app);

// Initialize Firebase Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
