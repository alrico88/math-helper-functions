import get from 'lodash/get';
import { isNonEmptyString } from './checks';

/**
 * Accesor for arrays
 *
 * @export
 * @template T
 * @param  {T[]} array Input array
 * @param  {string} [property] The property to map by
 * @return {any[]} The resulting array
 */
export function getSimpleArray<T>(array: T[], property?: string): any[] {
  if (isNonEmptyString(property)) {
    return array.map((d) => get(d, property));
  }
  return array;
}
