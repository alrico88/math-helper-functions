import { thresholdSturges } from 'd3-array';
import { getSimpleArray } from './arrays';
import { calcDomain } from './domain';
import { calcSum } from './operations';
import { calcPercent } from './percentages';

interface IDistribution {
  labels: string[];
  data: number[];
}

interface IDistributionArrayItem {
  label: string;
  count: number;
  percentage: number;
  from: number;
  to: number;
}

interface IBucket {
  label: string;
  from: number;
  to: number;
}

function createArrayData(buckets: IBucket[], array: number[]): number[] {
  const data = new Array(buckets.length).fill(0);

  buckets.forEach((b, currentIndex) => {
    const condition = currentIndex === buckets.length - 1
      ? (d: number): boolean => d >= b.from && d <= b.to
      : (d: number): boolean => d >= b.from && d < b.to;

    data[currentIndex] = array.filter(condition as () => boolean).length;
  });

  return data;
}

function getMinMaxValuesForBuckets(
  diffData: number,
  index: number,
  minDom: number,
  strictBuckets: boolean,
  binsNumber: number,
): {
    minVal: number;
    maxVal: number;
  } {
  const minDiff = diffData * (index - 1);
  const maxDiff = diffData * index;

  const maxWithoutRound = index === 1 ? minDom + diffData : minDom + maxDiff;
  const minWithoutRound = index === 1 ? minDom : minDom + minDiff;

  const minVal = strictBuckets ? minWithoutRound : Math.floor(minWithoutRound);

  const elseVal = index === binsNumber ? Math.ceil(maxWithoutRound) : Math.floor(maxWithoutRound);
  const maxVal = strictBuckets ? maxWithoutRound : elseVal;

  return {
    minVal,
    maxVal,
  };
}

/**
 * Calculates the distribution of an arrays values
 *
 * @export
 * @param  {any[]} array Input array
 * @param {boolean} strict
 * @param  {number} [numOfBins] Number of bins to use
 * @return {IDistribution} The distribution
 */
export function calcDistribution(
  array: number[],
  strict = false,
  numOfBins?: number,
): IDistribution {
  const [minDom, maxDom] = calcDomain(array);

  const bins = numOfBins ?? thresholdSturges(array);

  let diffData;

  if (Math.abs(maxDom) < Math.abs(minDom)) {
    diffData = (Math.abs(minDom) - Math.abs(maxDom)) / bins;
  } else {
    diffData = (Math.abs(maxDom) - Math.abs(minDom)) / bins;
  }

  const buckets: IBucket[] = [];

  const labels: string[] = [];

  for (let b = 1; b <= bins; b++) {
    const {
      minVal,
      maxVal,
    } = getMinMaxValuesForBuckets(diffData, b, minDom, strict, bins);

    const label = `${minVal} - ${maxVal}`;

    labels.push(label);

    buckets.push({
      label,
      from: minVal,
      to: maxVal,
    });
  }

  return {
    labels,
    data: createArrayData(buckets, array),
  };
}

/**
 * Gets the min and max values for a calcDistribution bucket
 *
 * @export
 * @param  {string} bucketLabel The bucket label
 * @return {number[]} [min, max]
 */
export function getMinMaxFromBucket(bucketLabel: string): number[] {
  const [min, max] = bucketLabel.split(' - ');

  return [Number(min.trim()), Number(max.trim())];
}

/**
 * Calculates the distribution of an arrays values and outputs an array
 *
 * @export
 * @param  {number[]} array Array to calc distribution of
 * @param {boolean} [binsStrict=false] If false, buckets may be rounded [floor, ceil]
 * @param  {number} [numOfBins] Number of bins to use
 * @return {IDistributionArrayItem[]} The distribution as an array of objects
 */
export function calcDistributionAsArray(
  array: number[],
  binsStrict = false,
  numOfBins?: number,
): IDistributionArrayItem[] {
  const distribution = calcDistribution(array, binsStrict, numOfBins);

  const total = calcSum(distribution.data);

  return distribution.labels.map((label, index) => {
    const indexValue = distribution.data[index];
    const [from, to] = getMinMaxFromBucket(label);

    return {
      label,
      count: indexValue,
      percentage: calcPercent(indexValue, total),
      from,
      to,
    };
  });
}

/**
 * Gets the quartiles of an array
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} [property] Property to map by
 * @return {[number, number, number]} The quartiles
 */
export function calcQuartiles(array: any[], property?: string): [number, number, number] {
  const len = array.length;
  const simpleArray = [...getSimpleArray(array, property)];
  simpleArray.sort((a, b) => a - b);

  return [
    simpleArray[Math.round(len * 0.25) - 1],
    simpleArray[Math.round(len * 0.5) - 1],
    simpleArray[Math.round(len * 0.75) - 1],
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
        numberOfBins - 1,
      )
    ] += 1;
  }

  return bins;
}
