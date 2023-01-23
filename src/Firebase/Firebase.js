
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider  , FacebookAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getDatabase , ref , push , onValue} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAFLS23XIFqpLGK0y9QDl_L8dARkWk31IY",
  authDomain: "movieapp-c08b1.firebaseapp.com",
  projectId: "movieapp-c08b1",
  storageBucket: "movieapp-c08b1.appspot.com",
  messagingSenderId: "96375102592",
  appId: "1:96375102592:web:7176b56b56236f1ee19a65",
  measurementId: "G-D45E66D6J2"
};



export const app = initializeApp(firebaseConfig);
export const provierGoogle = new GoogleAuthProvider()
export const provierFacebook = new FacebookAuthProvider()
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
const database = getDatabase(app);
export { database , ref , push , onValue}