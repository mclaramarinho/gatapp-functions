import { FirestoreCollections } from "./collections";
import { firestore } from "./init";

interface IFirestoreServiceQueryResult {
  id: string;
  [key: string]: unknown;
}

interface IFirestoreServiceCreateResult {
  [key: string]: unknown;
}

/**
 * Firestore service
 */
export class FirestoreService {
  /**
   * @param {string} id
   * @param {FirestoreCollections} collection
   */
  static async queryById(
      id: string, collection: FirestoreCollections
  ): Promise<IFirestoreServiceQueryResult | undefined> {
    const doc = await firestore.collection(collection).doc(id).get();
    if (doc.exists) return { id: doc.id, ...doc.data() };
    return;
  }
  /**
   * @param {FirestoreCollections} collection
   * @param {string} where
   * @param {unknown} param
   */
  static async query(
      collection: FirestoreCollections,
      where: string,
      param: unknown
  ): Promise<Array<IFirestoreServiceQueryResult | undefined>> {
    const doc = await firestore
        .collection(collection)
        .where(where, "==", param)
        .get();
    if (doc.size > 0) {
      return doc.docs
          .map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
    }
    return [];
  }
  /**
   * @param {FirestoreCollections} collection
   * @param {Map<string, unknown>} data
   */
  static async create(
      collection: FirestoreCollections,
      data: Map<string, unknown>
  ) : Promise<IFirestoreServiceCreateResult> {
    const result = await firestore.collection(collection)
        .add(data);
    return { ...result };
  }
}
