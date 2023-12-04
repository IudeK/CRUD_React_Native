import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQoBpGgkGOy-yP7ZogCneXjB3mQHII77g",
  authDomain: "project3mobile-bad5b.firebaseapp.com",
  projectId: "project3mobile-bad5b",
  storageBucket: "project3mobile-bad5b.appspot.com",
  messagingSenderId: "54693240842",
  appId: "1:54693240842:web:98ea26f786eaac955abff3",
  measurementId: "G-7XFH0GSMZ1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase();