// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {collection, getDocs, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdBb1-BTYFA8J5TObBZc03tVU2xVEd2LI",
  authDomain: "elite-investors-club.firebaseapp.com",
  projectId: "elite-investors-club",
  storageBucket: "elite-investors-club.appspot.com",
  messagingSenderId: "619036750975",
  appId: "1:619036750975:web:2048c74af2295d3d18bb4a",
  measurementId: "G-YGEW283DP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

 /*const colRef = collection(db, 'properties')

getDocs(colRef)
   .then((snapshot) => {
    let properties = []
    snapshot.docs.forEach((doc) => {
      properties.push({ ...doc.data(), id: doc.id })
    })
    console.log(properties)
   })

   .catch(err => {
    console.log(err.message)
   }) */

export {auth};
export {db};