import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdPHnQ9xCyax1sRX92TP9qL6QbCWOcGts",
  authDomain: "chat-62014.firebaseapp.com",
  projectId: "chat-62014",
  storageBucket: "chat-62014.appspot.com",
  messagingSenderId: "194493114969",
  appId: "1:194493114969:web:cec4f84e8a2d0b5e359f48",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage();

export const db = getFirestore();
