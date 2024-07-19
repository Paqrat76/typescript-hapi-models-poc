/**
 * Calculator class
 */
export class Calculator {
  /**
   * add
   *
   * @param a - value a
   * @param b - value b
   * @returns the sum of a and b
   */
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * subtract
   *
   * @param a - value a
   * @param b - value b
   * @returns the difference of a and b
   */
  subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * multiply
   *
   * @param a - value a
   * @param b - value b
   * @returns the product of a and b
   */
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * divide
   *
   * @param a - value a
   * @param b - value b
   * @returns the quotient of a and b
   */
  divide(a: number, b: number): number {
    return a / b;
  }
}
