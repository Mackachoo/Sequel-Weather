import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import firebaseKeys from './.keys'

let db, functions;
export async function init() {
  await initializeApp(firebaseKeys);
  db = getFirestore();
  functions = getFunctions();
  if (__DEV__) {
    connectFirestoreEmulator(db, "localhost", 8080)
    connectFunctionsEmulator(functions, "localhost", 5001)
  }
}

export { db, functions }

