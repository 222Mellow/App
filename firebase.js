import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCVVKM1SOvcNEAOuIcxFCyph36G1MJoTJA",
  authDomain: "digital-1596f.firebaseapp.com",
  projectId: "digital-1596f",
  storageBucket: "digital-1596f.firebasestorage.app",
  appId: "1:86749452424:web:693f9673505798bf9d273d",
  measurementId: "G-Z4VXQJPGY9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);