// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOULjBJmVRELYVoldktmaHrL1zc-Nyttw",
  authDomain: "interestpals.firebaseapp.com",
  databaseURL: "https://interestpals-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "interestpals",
  storageBucket: "interestpals.appspot.com",
  messagingSenderId: "977843390969",
  appId: "1:977843390969:web:0730a81e4f3a0547d7d528",
  measurementId: "G-5Q1DDBR6KV"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)