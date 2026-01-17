/**
 * Gender enumeration
 */
export class Gender {
  static male = 1;
  static female = 2;
  static nonBinary = 3;
  static other = 4;

  /**
   * @param {number} value
   * @return {boolean}
   */
  static isValid(value: number): boolean {
    return value === Gender.male ||
      value === Gender.female ||
      value === Gender.nonBinary ||
      value === Gender.other;
  }
}
