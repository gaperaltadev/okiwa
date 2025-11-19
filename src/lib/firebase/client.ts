import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpgCM-iq4U_n0ELXK4UST2SazbCYsEZOQ",
  authDomain: "okiwa-dec5b.firebaseapp.com",
  projectId: "okiwa-dec5b",
  storageBucket: "okiwa-dec5b.firebasestorage.app",
  messagingSenderId: "1029194026821",
  appId: "1:1029194026821:web:bfdf90adba6344ad7e782c",
  measurementId: "G-3TXP4MD9VT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
