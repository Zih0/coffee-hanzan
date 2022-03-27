import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const {
    VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_APP_ID,
    VITE_FIREBASE_BUCKET,
    VITE_FIREBASE_MEASUREMENT_ID,
    VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_SENDER_ID,
} = import.meta.env;

const firebaseConfig = {
    apiKey: VITE_FIREBASE_API_KEY,
    authDomain: VITE_FIREBASE_AUTH_DOMAIN,
    projectId: VITE_FIREBASE_PROJECT_ID,
    storageBucket: VITE_FIREBASE_BUCKET,
    messagingSenderId: VITE_FIREBASE_SENDER_ID,
    appId: VITE_FIREBASE_APP_ID,
    measurementId: VITE_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider(),
    github: new firebase.auth.GithubAuthProvider(),
};

export const authService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = firebase.storage();

export default firebase;
