/**
 * Performs a simple rule of three
 *
 * @export
 * @param  {number} ifThis First param
 * @param  {number} isThis First result
 * @param  {number} thenThat Second param
 * @return {number} Second result
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
 * @export
 * @param  {number} toCalc Number to get percentage of
 * @param  {number} total Total
 * @return {number} Percentage of the total
 */
export function calcPercent(toCalc: number, total: number): number {
  return ruleOfThree(total, 100, toCalc);
}
