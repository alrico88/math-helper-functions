import { deviation, mean, median, variance } from 'd3-array';
import dlv from 'dlv';
import { getSimpleArray } from './arrays';
import { isEmptyArray, isEmptyString } from './checks';

/**
 * Gets an array median
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} [property] The property to map by
 * @return {(number | undefined)} The resulting median
 */
export function calcMedian(
  array: any[],
  property?: string
): number | undefined {
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
export function calcWeightedMedian(
  array: any[],
  valueProperty: string,
  weightProperty: string
): number {
  // Prevent undefined problems
  if (!valueProperty || !weightProperty) {
    throw new Error(
      'Both valueProperty and weightProperty params are required'
    );
  }
  if (isEmptyArray(array)) {
    return 0;
  }

  const { array: arrayToSort, weightSum } = array.reduce(
    (agg: IWeightReducer, item) => {
      agg.array.push(
        new WeightedItem(item[valueProperty], item[weightProperty])
      );
      agg.weightSum += item[weightProperty];

      return agg;
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
    const prevItem = dlv(sortedArray[index - 1], 'value', 0);
    const currItem = dlv(sortedArray[index], 'value', 0);

    return (prevItem + currItem) / 2;
  }
  return dlv(sortedArray[index - 1], 'value', 0);
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
export function calcWeightedMean(
  array: any[],
  valueProperty: string,
  weightProperty: string
): number {
  if (isEmptyString(valueProperty) || isEmptyString(weightProperty)) {
    throw new Error(
      'Both valueProperty and weightProperty params are required'
    );
  }

  const result = array
    .map((d) => {
      const weight = dlv(d, weightProperty, 0);
      const upper = dlv(d, valueProperty, 0) * weight;
      return [upper, weight];
    })
    .reduce(
      (acc: number[], d: number[]) => [acc[0] + d[0], acc[1] + d[1]],
      [0, 0]
    );

  return result[0] / result[1];
}

/**
 * Calculates the variance in an array of numbers
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {string} [property]
 * @return {(number | undefined)}
 */
export function calcVariance<T>(
  array: T[],
  property?: string
): number | undefined {
  return variance(getSimpleArray(array, property));
}

/**
 * Calculates the standard deviation in an array of numbers
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {string} [property]
 * @return {(number | undefined)}
 */
export function calcStdDeviation<T>(
  array: T[],
  property?: string
): number | undefined {
  return deviation(getSimpleArray(array, property));
}
