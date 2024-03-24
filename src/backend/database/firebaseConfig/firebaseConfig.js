import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function FirebaseConfig() {
  const firebaseConfig = {
    apiKey: "AIzaSyDVKVUNYnkvprDnvCHj-HcvfYfPGyi9XtE",
    authDomain: "onlineprototype-997b6.firebaseapp.com",
    databaseURL:
      "https://onlineprototype-997b6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "onlineprototype-997b6",
    storageBucket: "onlineprototype-997b6.appspot.com",
    messagingSenderId: "616104200727",
    appId: "1:616104200727:web:8ebbb85ab1d2407c216a52",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app)
}
export default FirebaseConfig;
