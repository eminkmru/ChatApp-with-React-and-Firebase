import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYt3E0FtzMliOCSSzj_M-nJwKZIdcC9rM",
  authDomain: "chatapp-e28fa.firebaseapp.com",
  projectId: "chatapp-e28fa",
  storageBucket: "chatapp-e28fa.appspot.com",
  messagingSenderId: "185167767663",
  appId: "1:185167767663:web:bbcf02a0e3586621d9459a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
