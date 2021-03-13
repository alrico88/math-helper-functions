import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

/**
 * Accesor for arrays
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} [property] The property to map by
 * @return {any[]} The resulting array
 */
export function getSimpleArray(array: any[], property?: string): any[] {
  if (isEmpty(property) === false) {
    return array.map((d) => get(d, property as string));
  } else {
    return array;
  }
}
