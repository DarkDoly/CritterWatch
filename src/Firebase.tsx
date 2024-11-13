import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFJuRK6w7ygGN2MWA7SAZWK8o4nWpX0rU",
  authDomain: "critter-watch-7d415.firebaseapp.com",
  projectId: "critter-watch-7d415",
  storageBucket: "critter-watch-7d415.appspot.com",
  messagingSenderId: "500266994887",
  appId: "1:500266994887:web:33b58e0edc40a7bb6002e2",
  measurementId: "G-629HTWWVCN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
