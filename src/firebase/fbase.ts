import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBHNA8PPt0Qwps_ZDJe-LpTfkuBR9m8OGY",
  authDomain: "onecoffee-e525f.firebaseapp.com",
  projectId: "onecoffee-e525f",
  storageBucket: "onecoffee-e525f.appspot.com",
  messagingSenderId: "1076157403385",
  appId: "1:1076157403385:web:87572d29545920fc65d228",
  measurementId: "G-96VVXT75DR",
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
