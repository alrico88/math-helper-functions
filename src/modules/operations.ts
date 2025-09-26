import { sum } from 'd3-array';
import { getSimpleArray } from './arrays';

/**
 * Gets the sum of the values in an array
 *
 * @param array Input array
 * @param [property] Property to map by
 * @return The sum
 */
export function calcSum(array: any[], property?: string): number {
  return sum(getSimpleArray(array, property));
}
