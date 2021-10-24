// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjgyLNtnol6-PggLgIqUKuHOfWpxX6Q-g",
  authDomain: "sendamessageof.firebaseapp.com",
  projectId: "sendamessageof",
  storageBucket: "sendamessageof.appspot.com",
  messagingSenderId: "705239841314",
  appId: "1:705239841314:web:c4661d098d4d1af1ece87b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();
