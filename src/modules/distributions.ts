import {histogram} from 'd3-array';
import {getSimpleArray} from './arrays';
import {calcDomain} from './domain';

interface IDistribution {
  labels: string[];
  data: number[];
}

function isNullOrUndefined(element: any): boolean {
  return element === null || element === undefined;
}

/**
 * Calculates the distribution of an arrays values
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {number} [numOfBins] Number of bins to use
 * @return {IDistribution} The distribution
 */
export function calcDistribution(array: any[], numOfBins?: number): IDistribution {
  const hist = isNullOrUndefined(numOfBins) ? histogram() : histogram().thresholds(numOfBins as number);
  const dist = hist(array);

  return dist.reduce(
    (acc: IDistribution, {x0, x1, length}) => {
      acc.labels.push(`${x0} - ${x1}`);
      acc.data.push(length);
      return acc;
    },
    {
      labels: [],
      data: [],
    }
  );
}

/**
 * Gets the quartiles of an array
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} property Property to map by
 * @return {[number, number, number]} The quartiles
 */
export function calcQuartiles(array: any[], property: string): [number, number, number] {
  const len = array.length;
  const simpleArray = [...getSimpleArray(array, property)];
  simpleArray.sort((a, b) => a - b);

  return [
    simpleArray[Math.round(len / 4) - 1],
    simpleArray[Math.round(len / 2) - 1],
    simpleArray[Math.round(len * 3 / 4) - 1],
  ];
}

/**
 * Calculates a histogram from array values
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {number} [numberOfBins=4] Number of bins to use
 * @param  {string} [property] Property to map by
 * @return {number[]} The histogram
 */
export function calcHistogram(array: any[], numberOfBins = 4, property?: string): number[] {
  const dataArray = getSimpleArray(array, property);
  const [arrayMin, arrayMax] = calcDomain(dataArray);
  const first = arrayMin;
  const binWidth = (arrayMax - first) / numberOfBins;
  const len = dataArray.length;
  const bins = new Array(numberOfBins).fill(0);
  for (let i = 0; i < len; i++) {
    bins[
      Math.min(
        Math.floor((dataArray[i] - first) / binWidth),
        numberOfBins - 1
      )
    ] += 1;
  }

  return bins;
}
