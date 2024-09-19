import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAfHN11FbkXYNyUFeOHw2_lDtJJ59DYq9M",
    authDomain: "e-learn-a9aa6.firebaseapp.com",
    projectId: "e-learn-a9aa6",
    storageBucket: "e-learn-a9aa6.appspot.com",
    messagingSenderId: "751993730577",
    appId: "1:751993730577:web:df690175d4db5b8222a3b0",
    measurementId: "G-ZX3SZ49GVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);