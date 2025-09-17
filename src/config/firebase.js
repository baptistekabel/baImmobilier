import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD-Ecp4LqAdg3MvZJRRGi8B1u_pQt2fWaM",
  authDomain: "viirtuoso-website-e6bc0.firebaseapp.com",
  projectId: "viirtuoso-website-e6bc0",
  storageBucket: "viirtuoso-website-e6bc0.firebasestorage.app",
  messagingSenderId: "725673447410",
  appId: "1:725673447410:web:ea3b80b55063b46339e56b",
  measurementId: "G-XF5C69LE92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;