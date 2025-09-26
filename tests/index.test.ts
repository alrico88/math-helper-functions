import { describe, expect, test } from 'vitest';
import {
  calcDiff,
  calcDistribution,
  calcDomain,
  calcMax,
  calcMean,
  calcMedian,
  calcMin,
  calcPercent,
  calcStdDeviation,
  calcSum,
  calcVariance,
  calcWeightedMean,
  calcWeightedMedian,
  getPercentile,
  ruleOfThree,
} from '../src';

const testArray = [1, 1, 2, 3, 3];

const testObjArray = testArray.map((d) => ({
  value: d,
}));

describe('Testing SUM methods', () => {
  const expectedResult = 10;
  test('Simple array sum should return the sum of the values', () => {
    expect(calcSum(testArray)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the sum values', () => {
    const arrayWithNulls = [null, ...testArray, null];
    expect(calcSum(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays sum should be equal to the sum of the array's item values", () => {
    expect(calcSum(testObjArray, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays sum with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...testObjArray];
    expect(calcSum(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing MAX methods', () => {
  const expectedResult = 3;
  test("Simple array's max should return the highest number in the series", () => {
    expect(calcMax(testArray)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the highest number', () => {
    const arrayWithNulls = [null, ...testArray, null];
    expect(calcMax(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays max should be equal to the max of the array's item values", () => {
    expect(calcMax(testObjArray, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays max with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...testObjArray];
    expect(calcMax(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing MIN methods', () => {
  const expectedResult = 1;
  test("Simple array's min should return the lowest number in the series", () => {
    expect(calcMin(testArray)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the lowest number', () => {
    const arrayWithNulls = [null, ...testArray, null];
    expect(calcMin(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays min should be equal to the min of the array's item values", () => {
    expect(calcMin(testObjArray, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays min with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...testObjArray];
    expect(calcMin(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing DIFF methods', () => {
  const expectedResult = 2;
  test("Simple array's diff should return the difference of the domain in the series", () => {
    expect(calcDiff(testArray)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the diff', () => {
    const arrayWithNulls = [null, ...testArray, null];
    expect(calcDiff(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays diff should be equal to the diff of the array's item values", () => {
    expect(calcDiff(testObjArray, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays diff with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...testObjArray];
    expect(calcDiff(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing DOMAIN methods', () => {
  const expectedResult = [1, 3];
  test("Simple array's domain should return the lowest and highest number in the series", () => {
    expect(calcDomain(testArray)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the domain', () => {
    const arrayWithNulls = [null, ...testArray, null];
    expect(calcDomain(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays domain should be equal to the domain of the array's item values", () => {
    expect(calcDomain(testObjArray, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays domain with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...testObjArray];
    expect(calcDomain(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing MEAN methods', () => {
  const expectedResult = 2;
  test("Simple array's mean should return the mean of the series", () => {
    expect(calcMean(testArray)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the mean', () => {
    const arrayWithNulls = [null, ...testArray, null];
    expect(calcMean(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays mean should be equal to the mean of the array's item values", () => {
    expect(calcMean(testObjArray, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays mean with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...testObjArray];
    expect(calcMean(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing WEIGHTED MEAN methods', () => {
  const weightedSimpleArray = testArray.map((d, index) => ({
    value: d,
    weight: index + 1,
  }));
  const expectedSimpleResult =
    calcSum(weightedSimpleArray.map((d) => d.value * d.weight)) /
    calcSum(weightedSimpleArray.map((d) => d.weight));

  const weightedObjectArray = testObjArray.map((d, index) => ({
    value: d.value,
    weight: index + 1,
  }));
  const expectedObjectResult =
    calcSum(weightedObjectArray.map((d) => d.value * d.weight)) /
    calcSum(weightedObjectArray.map((d) => d.weight));

  test("Simple array's weighted mean should equal dividing the sum of values multiplied by their weight, by the sum of the weights", () => {
    expect(
      calcWeightedMean(weightedSimpleArray, 'value', 'weight')
    ).toStrictEqual(expectedSimpleResult);
  });

  test('Arrays containing empty values should not change the weighted mean', () => {
    const arrayWithNulls = [null, ...weightedSimpleArray, null];
    expect(calcWeightedMean(arrayWithNulls, 'value', 'weight')).toStrictEqual(
      expectedSimpleResult
    );
  });

  test("Object arrays weighted mean should be equal to the mean of the array's item values", () => {
    expect(
      calcWeightedMean(weightedObjectArray, 'value', 'weight')
    ).toStrictEqual(expectedObjectResult);
  });

  test('Object arrays weighted mean with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...weightedObjectArray];
    expect(calcWeightedMean(arrayWithNulls, 'value', 'weight')).toStrictEqual(
      expectedObjectResult
    );
  });
});

describe('Testing WEIGHTED MEDIAN and MEDIAN methods', () => {
  const weightedSimpleArray = testArray.map((d) => ({
    value: d,
    weight: 1,
  }));
  test('The weighted median of elements with the same weight should be the median of the array values', () => {
    expect(
      calcWeightedMedian(weightedSimpleArray, 'value', 'weight')
    ).toStrictEqual(calcMedian(weightedSimpleArray, 'value'));
  });

  test('The weighted median of an empty array should be 0', () => {
    expect(calcWeightedMedian([], 'value', 'weight')).toStrictEqual(0);
  });

  test('The weighted median of an array with one element should be that same value', () => {
    expect(
      calcWeightedMedian(weightedSimpleArray.slice(0, 1), 'value', 'weight')
    ).toStrictEqual(weightedSimpleArray[0].value);
  });

  test('The weighted median of elements with different weight should not be the median of the array values', () => {
    expect(
      calcWeightedMedian(
        weightedSimpleArray.map((d, index) => ({
          value: d.value,
          weight: index + 1,
        })),
        'value',
        'weight'
      )
    ).not.toEqual(calcMedian(weightedSimpleArray, 'value'));
  });
});

describe('Testing PERCENTAGE methods', () => {
  test('Percentages should work correctly', () => {
    expect(calcPercent(20, 100)).toStrictEqual((20 * 100) / 100);
  });
});

describe('Testing RULE OF THREE methods', () => {
  test('Calculating according to rule of three should work according to math', () => {
    expect(ruleOfThree(20, 20, 100)).toStrictEqual((20 * 100) / 20);
  });
});

describe('Testing VARIANCE methods', () => {
  test('Calculating according to variance formula should work according to math', () => {
    expect(calcVariance([0, 5, 10])).toStrictEqual(25);
  });
});

describe('Testing STD DEVIATION methods', () => {
  test('Calculating according to standard deviation formula should work according to math', () => {
    expect(calcStdDeviation([0, 5, 10])).toStrictEqual(5);
  });
});

describe('Testing DISTRIBUTION methods', () => {
  test('It should output the desired number of buckets', () => {
    expect(calcDistribution([0, 5, 10], true, 2).data.length).toStrictEqual(2);
  });

  test('If using the non-strict version, it should output integer domains', () => {
    expect(
      calcDistribution([0.2, 5, 10.3], false, 2).labels[0].split(' - ')[0]
    ).toStrictEqual('0');
  });
});

describe('Test PERCENTILE methods', () => {
  test('Calculates the 50th percentile (median) of a simple array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = getPercentile(array, 0.5);
    expect(result).toBe(3);
  });

  test('Calculates the 0th percentile (minimum) of a simple array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = getPercentile(array, 0);
    expect(result).toBe(1);
  });

  test('Calculates the 100th percentile (maximum) of a simple array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = getPercentile(array, 1);
    expect(result).toBe(5);
  });

  test('Returns undefined for an empty array', () => {
    const array: number[] = [];
    const result = getPercentile(array, 0.5);
    expect(result).toBeUndefined();
  });

  test('Returns undefined for an array with only null values', () => {
    const array = [null, null, null];
    const result = getPercentile(array, 0.5);
    expect(result).toBeUndefined();
  });

  test('Ignores null values in a mixed array', () => {
    const array = [1, null, 2, null, 3, 4, 5];
    const result = getPercentile(array, 0.5);
    expect(result).toBe(3);
  });

  test('Throws an error for percentile below 0', () => {
    const array = [1, 2, 3, 4, 5];
    expect(() => getPercentile(array, -0.1)).toThrowError(
      'percentile must be a number between 0 and 1'
    );
  });

  test('Throws an error for percentile above 1', () => {
    const array = [1, 2, 3, 4, 5];
    expect(() => getPercentile(array, 1.1)).toThrowError(
      'percentile must be a number between 0 and 1'
    );
  });

  test('Calculates percentile with floating point values correctly', () => {
    const array = [1.2, 3.5, 5.1, 7.8, 9.3];
    const result = getPercentile(array, 0.75);
    expect(result).toBeCloseTo(7.8, 1);
  });
});
