import { get } from 'lodash-es';
import is from '@sindresorhus/is';

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
  if (is.nonEmptyString(property)) {
    return array.map((d) => get(d, property));
  }
  return array;
}
