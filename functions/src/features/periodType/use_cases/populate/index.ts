import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { firestore } from "../../../../shared/firestore/init";
import { PeriodTypeModel } from "../../models/PeriodTypeModel";

const periodTypes: PeriodTypeModel[] = [
  new PeriodTypeModel(1, "MINUTE"),
  new PeriodTypeModel(2, "HOUR"),
  new PeriodTypeModel(3, "DAY"),
  new PeriodTypeModel(4, "WEEK"),
  new PeriodTypeModel(5, "MONTH"),
  new PeriodTypeModel(6, "YEAR"),
];

/**
 * Populates the Firestore collection with predefined period types.
 */
export const populatePeriodTypes = async () => {
  const batch = firestore.batch();
  const collectionRef = firestore.collection(FirestoreCollections.PeriodTypes);

  periodTypes.forEach((periodType) => {
    const docRef = collectionRef.doc(periodType.id.toString());
    batch.set(docRef, {
      id: periodType.id,
      type: periodType.type,
    });
  });
};
