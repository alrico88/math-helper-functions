import {sum} from 'd3-array';
import {getSimpleArray} from './arrays';

/**
 * Gets the sum of the values in an array
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} [property] Property to map by
 * @return {number} The sum
 */
export function calcSum(array: any[], property?: string): number {
  return sum(getSimpleArray(array, property));
}
