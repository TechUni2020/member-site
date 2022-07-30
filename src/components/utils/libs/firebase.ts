import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import { getStorage } from "firebase/storage";
import { apiKey, appId, authDomain, messagingSenderId, mesurementId, projectId, storageKey } from "../constants/env";

export const config = {
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
const auth = getAuth();
const storage = getStorage(app);
export { initFirebase, db, app, auth, storage };
