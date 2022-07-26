import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

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
  if (!isEmpty(property)) {
    return array.map((d) => get(d, property as string));
  } else {
    return array;
  }
}
