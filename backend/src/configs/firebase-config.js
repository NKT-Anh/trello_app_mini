// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA4vZ9f8iJT-XwRf6ecQc8ODO-tVHe0n0",
  authDomain: "trelloapp-71a70.firebaseapp.com",
  projectId: "trelloapp-71a70",
  storageBucket: "trelloapp-71a70.firebasestorage.app",
  messagingSenderId: "495233727576",
  appId: "1:495233727576:web:d61461b07ec5dffb195e2d",
  measurementId: "G-HLD86CMQ03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);