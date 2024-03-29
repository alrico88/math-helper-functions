import { max, min, extent } from 'd3-array';
import { getSimpleArray } from './arrays';

/**
 * Gets the max value in an array
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} [property] Property to map by
 * @return {number} The maximum value in the array
 */
export function calcMax(array: any[], property?: string): number {
  return max(getSimpleArray(array, property));
}

/**
 * Gets the min value in an array
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} [property] Property to map
 * @return {number} The minimum value in the array
 */
export function calcMin(array: any[], property?: string): number {
  return min(getSimpleArray(array, property));
}

/**
 * Gets the [min, max] value in an array
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} [property] Property to map by
 * @return {([number, number] | [any, any])} The domain
 */
export function calcDomain(array: any[], property?: string): [number, number] | [any, any] {
  return extent(getSimpleArray(array, property));
}

/**
 * Gets the absolute difference between the max and min value in an array
 *
 * @export
 * @param {any[]} array Input array
 * @param {string} [property] Property to map by
 * @return {number} Absolute difference between the max and min of an array
 */
export function calcDiff(array: any[], property?: string): number {
  const [minVal, maxVal] = calcDomain(array, property);

  return Math.abs(maxVal - minVal);
}
