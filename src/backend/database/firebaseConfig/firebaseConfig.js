import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function FirebaseConfig() {
  const firebaseConfig = {
    //you can found your credential in your firebase project.
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app)
}
export default FirebaseConfig;
