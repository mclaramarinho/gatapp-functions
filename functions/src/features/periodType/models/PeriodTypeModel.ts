/**
 * Model representing a period type.
 */
export class PeriodTypeModel {
  id: number;
  type: string;

  /**
   * @param {number} id
   * @param {string} type
   */
  constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
  }
}
