import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig); // this firebase is the bridge between the auth and our project

const auth= getAuth(firebaseApp)
const db = getFirestore(firebaseApp);


export {auth, db} ;