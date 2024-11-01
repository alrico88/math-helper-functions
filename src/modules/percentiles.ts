import { quantile } from 'd3-array';

/**
 * Gets the percentile of an array of values
 *
 * @param {(number|null)[]} array Array to find percentile of
 * @param {number} percentile Amount between 0 and 1
 *
 * @returns {number|undefined} Percentile
 */
export function getPercentile(array:(number | null)[], percentile: number): number | undefined {
  if (percentile > 1 || percentile < 0) {
    throw new Error('percentile must be a number between 0 and 1');
  }

  return quantile(array, percentile);
}
