/**
 * Performs a simple rule of three
 *
 * @param ifThis First param
 * @param isThis First result
 * @param thenThat Second param
 * @return Second result
 */
export function ruleOfThree(
  ifThis: number,
  isThis: number,
  thenThat: number
): number {
  return (isThis * thenThat) / ifThis;
}

/**
 * Calculates the percentage of a value, given a total
 *
 * @param toCalc Number to get percentage of
 * @param total Total
 * @return Percentage of the total
 */
export function calcPercent(toCalc: number, total: number): number {
  return ruleOfThree(total, 100, toCalc);
}
