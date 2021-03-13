import {get, isEmpty} from 'lodash';

/**
 * Accesor for arrays
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} [property] The property to map by
 * @return {any[]} The resulting array
 */
export function getSimpleArray(array: any[], property?: string): any[] {
  if (!isEmpty(property)) {
    return array.map((d) => get(d, property as string));
  } else {
    return array;
  }
}
