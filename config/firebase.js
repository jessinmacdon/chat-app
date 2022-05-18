import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import Constants from "expo-constants";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAKROvj_3A2BtmVQ8W0gp_azoLHUtAMK8k",
    authDomain: "chatapp-48ceb.firebaseapp.com",
    projectId: "chatapp-48ceb",
    storageBucket: "chatapp-48ceb.appspot.com",
    messagingSenderId: "909128550900",
    appId: "1:909128550900:web:82e8cf393e29cc0abed1a1"
};


// Firebase init
const app = initializeApp(firebaseConfig);

// Init Cloud Firestore - get a reference to the service (db)
export const db = getFirestore(app);

// Get a reference to the Firebase auth object
export const auth = getAuth();