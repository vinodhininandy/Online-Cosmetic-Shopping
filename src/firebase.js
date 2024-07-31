import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARFvhMFMMS7suXfSYwfid27UA9tkYNYYk",
  authDomain: "reactcrud-aea4a.firebaseapp.com",
  projectId: "reactcrud-aea4a",
  storageBucket: "reactcrud-aea4a.appspot.com",
  messagingSenderId: "634615004414",
  appId: "1:634615004414:web:6ae701a14fbf7a398239af",
  measurementId: "G-S9W5FFN5CM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
