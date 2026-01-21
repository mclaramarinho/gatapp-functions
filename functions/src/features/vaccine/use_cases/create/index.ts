import { firestore } from "../../../../shared/firestore/init";
import { VaccineModel } from "../../models/VaccineModel";

/**
 * Populate the vaccines collection with predefined vaccines
 */
export const populateVaccinesCollection = async () => {
  try {
    const batch = firestore.batch();
    vaccines.forEach((vaccine) => {
      const docRef = firestore
          .collection("vaccines")
          .doc(vaccine.id.toString());
      batch.set(docRef, {
        normalizedName: vaccine.normalizedName,
        displayName: vaccine.displayName,
      });
    });
    await batch.commit();
  } catch (error) {
    console.error("Error creating vaccines:", error);
  }
};


const vaccines = [
  new VaccineModel(1, "rabies", "Antirrábica"),
  new VaccineModel(2, "v3", "Tríplice Viral"),
  new VaccineModel(3, "v4", "Quádrupla Viral"),
  new VaccineModel(4, "v5", "Quíntupla Viral"),
  new VaccineModel(5, "other", "Outras"),
];
