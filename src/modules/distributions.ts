import { thresholdSturges } from 'd3-array';
import dlv from 'dlv';
import { processNumber } from 'number-helper-functions';
import { getSimpleArray } from './arrays';
import { calcDomain } from './domain';
import { calcSum } from './operations';
import { calcPercent } from './percentages';

export interface IDistribution {
  labels: string[];
  data: number[];
}

export interface IDistributionArrayItem {
  label: string;
  count: number;
  percentage: number;
  from: number;
  to: number;
}

export interface IBucket {
  label: string;
  from: number;
  to: number;
  inside: (val: number) => boolean;
}

export interface ISerieDistribution {
  labels: string[];
  data: {
    name: string;
    count: number[];
    percentage_serie: number[];
    percentage_total: number[];
  }[];
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
 * @param array The data array
 * @param [strict=false] Whether to use real or pretty domain
 * @param [numOfBins] Amount of desired buckets
 * @return The buckets
 */
export function calcBuckets(
  array: number[],
  strict = false,
  numOfBins?: number
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
 * @param array Input array
 * @param strict
 * @param [numOfBins] Number of bins to use
 * @return The distribution
 */
export function calcDistribution(
  array: number[],
  strict = false,
  numOfBins?: number
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
 * @param bucketLabel The bucket label
 * @return [min, max]
 */
export function getMinMaxFromBucket(bucketLabel: string): number[] {
  const [min, max] = bucketLabel.split(' - ');

  return [Number(min.trim()), Number(max.trim())];
}

/**
 * Calculates the distribution of an array of grouped objects
 *
 * @param buckets
 * @param dataGrouped
 * @param distributionProp
 * @return The distribution with labels and data
 */
export function calcDistributionWithSeries(
  buckets: IBucket[],
  dataGrouped: Record<string, unknown[]>,
  distributionProp: string
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
        const valueProp = dlv(
          v as Record<string, number | string>,
          distributionProp
        );

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
      percentage_serie: dataArr.map((d) => calcPercent(d.data, serieCount)),
    };
  });

  return {
    labels: buckets.map((b) => b.label),
    data: data.map((i) => ({
      ...i,
      percentage_total: i.count.map((d) => calcPercent(d, totalCount)),
    })),
  };
}

/**
 * Calculates the distribution of an arrays values and outputs an array
 *
 * @param array Array to calc distribution of
 * @param [binsStrict=false] If false, buckets may be rounded [floor, ceil]
 * @param [numOfBins] Number of bins to use
 * @return The distribution as an array of objects
 */
export function calcDistributionAsArray(
  array: number[],
  binsStrict = false,
  numOfBins?: number
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
 * @param array Input array
 * @param [property] Property to map by
 * @return The quartiles
 */
export function calcQuartiles(
  array: any[],
  property?: string
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
 * @param array Input array
 * @param [numberOfBins=4] Number of bins to use
 * @param [property] Property to map by
 * @return The histogram
 */
export function calcHistogram(
  array: any[],
  numberOfBins = 4,
  property?: string
): number[] {
  const dataArray = getSimpleArray(array, property);
  const [arrayMin, arrayMax] = calcDomain(dataArray);
  const first = arrayMin;
  const binWidth = (arrayMax - first) / numberOfBins;
  const len = dataArray.length;
  const bins = new Array(numberOfBins).fill(0);
  for (let i = 0; i < len; i++) {
    bins[
      Math.min(Math.floor((dataArray[i] - first) / binWidth), numberOfBins - 1)
    ] += 1;
  }

  return bins;
}
