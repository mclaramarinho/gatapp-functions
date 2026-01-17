import { Firestore, getFirestore } from "firebase-admin/firestore";

export const firestore : Firestore = getFirestore();

/**
 * If first time creating the Firestore instance, populate all the static data collections
 * After the first time, only populate when necessary and only the necessary collections
 * 
 * Uncomment the following line to enable initial population
 */

// import { initializeStaticCollections } from "./staticCollectionsInit";
// initializeStaticCollections();