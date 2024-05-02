// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyu8kYsoqemQRyxWLpiiFRwq9o0JOCKxs",
  authDomain: "blogging-app-eea07.firebaseapp.com",
  projectId: "blogging-app-eea07",
  storageBucket: "blogging-app-eea07.appspot.com",
  messagingSenderId: "612192572100",
  appId: "1:612192572100:web:4e76cae546adf999a0ef91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
