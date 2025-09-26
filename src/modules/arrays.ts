import dlv from 'dlv';
import { isNonEmptyString } from './checks';
import { calcSum } from './operations';
import { ruleOfThree } from './percentages';

/**
 * Accesor for arrays
 *
 * @template T
 * @param array Input array
 * @param [property] The property to map by
 * @return The resulting array
 */
export function getSimpleArray<T>(array: T[], property?: string): any[] {
  if (isNonEmptyString(property)) {
    return array.map((d) => dlv(d as object, property));
  }
  return array;
}

/**
 * Gets the top items until a cumulative value threshold
 *
 * @param items Items to filter
 * @param accessor The accessor to get a value to accumulate
 * @param threshold The absolute threshold to stop in
 */
export function getUntilValueThreshold<T>(
  items: T[],
  accessor: (d: T) => number,
  threshold: number
): T[] {
  const sorted = items.toSorted((a, b) => accessor(b) - accessor(a));

  const result: T[] = [];
  let cumulative = 0;

  for (const item of sorted) {
    cumulative += accessor(item);
    result.push(item);

    if (cumulative >= threshold) {
      break;
    }
  }

  return result;
}

/**
 * Gets the top % acc items by an accessor
 *
 * @param items Items to filter
 * @param accessor The accessor to get a value to accumulate
 * @param percentageThreshold The percentage to stop in (default 80)
 */
export function getUntilPercentageThreshold<T>(
  items: T[],
  accessor: (d: T) => number,
  percentageThreshold: number
): T[] {
  const total = calcSum(items.map(accessor));

  if (total === 0) {
    return [];
  }

  const absoluteThreshold = ruleOfThree(100, total, percentageThreshold);

  return getUntilValueThreshold(items, accessor, absoluteThreshold);
}
