import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyABcJmyF50ecBxyvjOJYWkh5q1z0t01y4E",
    authDomain: "srg-1ea5f.firebaseapp.com",
    databaseURL: "https://srg-1ea5f-default-rtdb.firebaseio.com",
    projectId: "srg-1ea5f",
    storageBucket: "srg-1ea5f.appspot.com",
    messagingSenderId: "674020088564",
    appId: "1:674020088564:web:1b5115ba202b6f74d01ca1"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
