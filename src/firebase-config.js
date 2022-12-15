import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfqdHe6wnzq0z7T6XVnJ2BYN8Lz4ynMmo",
  authDomain: "databaseproject-c6a70.firebaseapp.com",
  databaseURL: "https://databaseproject-c6a70-default-rtdb.firebaseio.com",
  projectId: "databaseproject-c6a70",
  storageBucket: "databaseproject-c6a70.appspot.com",
  messagingSenderId: "979391151822",
  appId: "1:979391151822:web:e353dc6e9e9ee47cf49a9f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);