/**
 * Model representing a cat pedigree.
 */
export class CatPedigreeModel {
  id: number;
  normalizedName: string;
  displayName: string;

  /**
   * @param {number} id
   * @param {string} normalizedName
   * @param {string} displayName
   */
  constructor(id: number, normalizedName: string, displayName: string) {
    this.id = id;
    this.normalizedName = normalizedName;
    this.displayName = displayName;
  }
}
