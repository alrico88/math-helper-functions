export {
  getUntilPercentageThreshold,
  getUntilValueThreshold,
} from './modules/arrays';
export {
  calcMean,
  calcMedian,
  calcStdDeviation,
  calcVariance,
  calcWeightedMean,
  calcWeightedMedian,
} from './modules/averages';
export {
  calcBuckets,
  calcDistribution,
  calcDistributionAsArray,
  calcDistributionWithSeries,
  calcHistogram,
  calcQuartiles,
  getMinMaxFromBucket,
  type IBucket,
  type IDistribution,
  type IDistributionArrayItem,
  type ISerieDistribution,
} from './modules/distributions';
export { calcDiff, calcDomain, calcMax, calcMin } from './modules/domain';
export { calcSum } from './modules/operations';
export { calcPercent, ruleOfThree } from './modules/percentages';
export { getPercentile } from './modules/percentiles';
