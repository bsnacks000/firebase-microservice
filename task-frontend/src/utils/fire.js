import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//     apiKey: "AIzaSyDmdIcgziptvm-yAk-fmrtz9EEeM2pyAL4",
//     authDomain: "fir-microservice-d6700.firebaseapp.com",
//     projectId: "fir-microservice-d6700",
//     storageBucket: "fir-microservice-d6700.appspot.com",
//     messagingSenderId: "328420055981",
//     appId: "1:328420055981:web:e6bfdf1349e082485adf24",
//     measurementId: "G-641RMSY3Y4"
//   };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const fireapp = initializeApp(firebaseConfig);
export default fireapp;


  
  
  