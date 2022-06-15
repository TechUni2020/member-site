import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  apiKey,
  appId,
  authDomain,
  messagingSenderId,
  mesurementId,
  projectId,
  storageKey,
} from "../constants/env";

const config = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageKey,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: mesurementId,
};

function initFirebase() {
  if (typeof window !== undefined) {
    initializeApp(config);
    console.log("Firebase has been init successfully");
  }
}
const app = initializeApp(config);
const db = getFirestore(app);
export { initFirebase, app, db };

// Todo: firebase export keyで変数化する
