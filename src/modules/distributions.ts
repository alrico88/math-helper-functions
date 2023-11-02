import { thresholdSturges } from 'd3-array';
import { processNumber } from 'number-helper-functions';
import get from 'lodash/get';
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
  inside: (val: number) => boolean;
}

interface ISerieDistribution {
  labels: string[];
  data: {
    name: string;
    count:number[];
    percentage_serie: number[];
    percentage_total: number[];
  }[]
}

function createArrayData(buckets: IBucket[], array: number[]): number[] {
  const data = new Array(buckets.length).fill(0);

  buckets.forEach((b, currentIndex) => {
    data[currentIndex] = array.filter((d) => b.inside(d)).length;
  });

  return data;
}

/**
 * Calculate the buckets given a data array and an amount
 *
 * @export
 * @param {number[]} array The data array
 * @param {boolean} [strict=false] Whether to use real or pretty domain
 * @param {number} [numOfBins] Amount of desired buckets
 * @return {IBucket[]} The buckets
 */
export function calcBuckets(
  array: number[],
  strict = false,
  numOfBins?: number,
): IBucket[] {
  let [minDom, maxDom] = calcDomain(array);

  if (!strict) {
    minDom = Math.floor(minDom);
    maxDom = Math.ceil(maxDom);
  }

  const bins = numOfBins ?? thresholdSturges(array);
  const bucketSize = (maxDom - minDom) / bins;

  const buckets: IBucket[] = [];

  for (let i = 0; i < bins; i++) {
    const bucketMin = minDom + i * bucketSize;
    const bucketMax = minDom + (i + 1) * bucketSize;

    const label = `${processNumber(bucketMin)} - ${processNumber(bucketMax)}`;

    buckets.push({
      label,
      from: bucketMin,
      to: bucketMax,
      inside(val: number) {
        return i === bins - 1
          ? val >= bucketMin && val <= bucketMax
          : val >= bucketMin && val < bucketMax;
      },
    });
  }

  return buckets;
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
  const buckets: IBucket[] = calcBuckets(array, strict, numOfBins);

  return {
    labels: buckets.map((b) => b.label),
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
 * Calculates the distribution of an array of grouped objects
 *
 * @export
 * @param {IBucket[]} buckets
 * @param {Record<string, unknown[]>} dataGrouped
 * @param {string} distributionProp
 * @return {ISerieDistribution} The distribution with labels and data
 */
export function calcDistributionWithSeries(
  buckets: IBucket[],
  dataGrouped: Record<string, unknown[]>,
  distributionProp: string,
): ISerieDistribution {
  const totalCount = 0;

  const data = Object.entries(dataGrouped).map(([key, value]) => {
    let serieCount = 0;

    const serieName = key;

    const dataArr = buckets.map((d) => {
      const bucketObj = {
        interval: d.label,
        data: 0,
      };

      value.forEach((v) => {
        const valueProp = get(v as Record<string, number | string>, distributionProp);

        if (d.inside(valueProp as number)) {
          bucketObj.data++;

          serieCount++;
        }
      });

      return bucketObj;
    });

    return {
      name: serieName,
      count: dataArr.map((d) => d.data),
      percentage_serie: dataArr.map((d) => calcPercent(d.data * 100, serieCount)),
    };
  });

  return {
    labels: buckets.map((b) => b.label),
    data: data.map((i) => ({
      ...i,
      percentage_total: i.count.map((d) => calcPercent(d * 100, totalCount)),
    })),
  };
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
export function calcQuartiles(
  array: any[],
  property?: string,
): [number, number, number] {
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
export function calcHistogram(
  array: any[],
  numberOfBins = 4,
  property?: string,
): number[] {
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
