import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDiq3VYwX4ImwTMf6GTTBkhRPFOBWlkklc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hotel-os-2edf7.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hotel-os-2edf7",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hotel-os-2edf7.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "82816171415",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:82816171415:web:06c769bbc830e9500018d2",
};

export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const firebaseAuth = getAuth(firebaseApp);
