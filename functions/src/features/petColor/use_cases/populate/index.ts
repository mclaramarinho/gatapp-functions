import { firestore } from "../../../../shared/firestore/init";
import { PetColorModel } from "./models/PetColorModel";

/**
 * Source: https://www.riocatclube.com.br/cores
 */
class PetColorList {
  static white = new PetColorModel(1, "branco", "Branco");
  static black = new PetColorModel(2, "preto", "Preto");
  static grey = new PetColorModel(3, "cinza", "Cinza");
  static brown = new PetColorModel(4, "marrom", "Marrom");
  static orange = new PetColorModel(5, "laranja", "Laranja");
  static cream = new PetColorModel(7, "creme", "Creme");
  static calico = new PetColorModel(8, "tricolor", "Tricolor");
  static tabby = new PetColorModel(9, "tigrado", "Tigrado");

  /**
   * @return {PetColorModel[]}
   */
  static values(): PetColorModel[] {
    return [
      PetColorList.white,
      PetColorList.black,
      PetColorList.grey,
      PetColorList.brown,
      PetColorList.orange,
      PetColorList.cream,
      PetColorList.calico,
      PetColorList.tabby,
    ];
  }
}


/**
 * Populates the 'petColors' collection in Firestore with predefined pet colors.
 * @return {Promise<void>}
 */
export const populatePetColorsCollection = async (): Promise<void> => {
  const all = PetColorList.values();

  all.map((color) => {
    firestore.collection("petColors").doc(color.id.toString()).set({
      normalizedName: color.normalizedName,
      displayName: color.displayName,
    })
        .then(() => {
          console.log(`Pet color ${color.displayName} created successfully.`);
        })
        .catch((error) => {
          console.error(
              `Error creating pet color ${color.displayName}: `, error
          );
        });
  });
};
