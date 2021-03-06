import {mean, median} from 'd3-array';
import {getSimpleArray} from './arrays';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

/**
 * Gets an array median
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} [property] The property to map by
 * @return {(number | undefined)} The resulting median
 */
export function calcMedian(array: any[], property?: string): number | undefined {
  return median(getSimpleArray(array, property));
}

class WeightedItem {
  public value: number;
  public weight: number;

  constructor(value: number, weight: number) {
    this.value = value;
    this.weight = weight;
  }
}

interface IWeightReducer {
  array: WeightedItem[];
  weightSum: number;
}

/**
 * Gets an array weighted median
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} valueProperty The property to use as value
 * @param  {string} weightProperty The property to use as weight
 * @return {number} The resulting median
 */
export function calcWeightedMedian(array: any[], valueProperty: string, weightProperty: string): number {
  // Prevent undefined problems
  if (!valueProperty || !weightProperty) {
    throw new Error('Both valueProperty and weightProperty params are required');
  }
  if (isEmpty(array)) {
    return 0;
  }

  const {array: arrayToSort, weightSum} = array.reduce(
    (acc: IWeightReducer, item) => {
      acc.array.push(new WeightedItem(item[valueProperty], item[weightProperty]));
      acc.weightSum += item[weightProperty];

      return acc;
    },
    {
      array: [],
      weightSum: 0,
    }
  );

  const sortedArray = arrayToSort.sort((a, b) => a.value - b.value);

  const midpoint = weightSum / 2;

  let index = 0;
  let weight = 0;

  while (weight < midpoint) {
    weight += sortedArray[index].weight;
    index++;
  }

  if (weight === midpoint) {
    const prevItem = get(sortedArray[index - 1], 'value', 0);
    const currItem = get(sortedArray[index], 'value', 0);

    return (prevItem + currItem) / 2;
  } else {
    return get(sortedArray[index - 1], 'value', 0);
  }
}

/**
 * Gets the mean value for an array
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} [property] Property to map by
 * @return {(number | undefined)} The mean value
 */
export function calcMean(array: any[], property?: string): number | undefined {
  return mean(getSimpleArray(array, property));
}

/**
 * Gets the weighted mean for an array
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} valueProperty Property to use for value
 * @param  {string} weightProperty Property to use for weight
 * @return {number} The weighted mean
 */
export function calcWeightedMean(array: any[], valueProperty: string, weightProperty: string): number {
  if (!valueProperty || !weightProperty) {
    throw new Error('Both valueProperty and weightProperty params are required');
  }

  const result = array
    .map((d) => {
      const weight = get(d, weightProperty, 0);
      const upper = get(d, valueProperty, 0) * weight;
      return [upper, weight];
    })
    .reduce((acc: number[], d: number[]) => [acc[0] + d[0], acc[1] + d[1]], [0, 0]);

  return result[0] / result[1];
}
