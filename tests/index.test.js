const MathFunctions = require('../index');

const TEST_ARRAY = [1, 1, 2, 3, 3];

const TEST_OBJ_ARRAY = TEST_ARRAY.map((d) => ({
  value: d,
}));

describe('Testing SUM methods', () => {
  const expectedResult = 10;
  test('Simple array sum should return the sum of the values', () => {
    expect(MathFunctions.calcSum(TEST_ARRAY)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the sum values', () => {
    const arrayWithNulls = [null, ...TEST_ARRAY, null];
    expect(MathFunctions.calcSum(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays sum should be equal to the sum of the array's item values", () => {
    expect(MathFunctions.calcSum(TEST_OBJ_ARRAY, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays sum with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...TEST_OBJ_ARRAY];
    expect(MathFunctions.calcSum(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing MAX methods', () => {
  const expectedResult = 3;
  test("Simple array's max should return the highest number in the series", () => {
    expect(MathFunctions.calcMax(TEST_ARRAY)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the highest number', () => {
    const arrayWithNulls = [null, ...TEST_ARRAY, null];
    expect(MathFunctions.calcMax(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays max should be equal to the max of the array's item values", () => {
    expect(MathFunctions.calcMax(TEST_OBJ_ARRAY, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays max with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...TEST_OBJ_ARRAY];
    expect(MathFunctions.calcMax(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing MIN methods', () => {
  const expectedResult = 1;
  test("Simple array's min should return the lowest number in the series", () => {
    expect(MathFunctions.calcMin(TEST_ARRAY)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the lowest number', () => {
    const arrayWithNulls = [null, ...TEST_ARRAY, null];
    expect(MathFunctions.calcMin(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays min should be equal to the min of the array's item values", () => {
    expect(MathFunctions.calcMin(TEST_OBJ_ARRAY, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays min with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...TEST_OBJ_ARRAY];
    expect(MathFunctions.calcMin(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing DOMAIN methods', () => {
  const expectedResult = [1, 3];
  test("Simple array's domain should return the lowest and highest number in the series", () => {
    expect(MathFunctions.calcDomain(TEST_ARRAY)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the domain', () => {
    const arrayWithNulls = [null, ...TEST_ARRAY, null];
    expect(MathFunctions.calcDomain(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays domain should be equal to the domain of the array's item values", () => {
    expect(MathFunctions.calcDomain(TEST_OBJ_ARRAY, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays domain with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...TEST_OBJ_ARRAY];
    expect(MathFunctions.calcDomain(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing MEAN methods', () => {
  const expectedResult = 2;
  test("Simple array's mean should return the mean of the series", () => {
    expect(MathFunctions.calcMean(TEST_ARRAY)).toStrictEqual(expectedResult);
  });

  test('Arrays containing empty values should not change the mean', () => {
    const arrayWithNulls = [null, ...TEST_ARRAY, null];
    expect(MathFunctions.calcMean(arrayWithNulls)).toStrictEqual(expectedResult);
  });

  test("Object arrays mean should be equal to the mean of the array's item values", () => {
    expect(MathFunctions.calcMean(TEST_OBJ_ARRAY, 'value')).toStrictEqual(expectedResult);
  });

  test('Object arrays mean with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...TEST_OBJ_ARRAY];
    expect(MathFunctions.calcMean(arrayWithNulls, 'value')).toStrictEqual(expectedResult);
  });
});

describe('Testing WEIGHTED MEAN methods', () => {
  const weightedSimpleArray = TEST_ARRAY.map((d, index) => ({
    value: d,
    weight: index + 1,
  }));
  const expectedSimpleResult =
    MathFunctions.calcSum(weightedSimpleArray.map((d) => d.value * d.weight)) /
    MathFunctions.calcSum(weightedSimpleArray.map((d) => d.weight));

  const weightedObjectArray = TEST_OBJ_ARRAY.map((d, index) => ({
    value: d.value,
    weight: index + 1,
  }));
  const expectedObjectResult =
    MathFunctions.calcSum(weightedObjectArray.map((d) => d.value * d.weight)) /
    MathFunctions.calcSum(weightedObjectArray.map((d) => d.weight));

  test("Simple array's weighted mean should equal dividing the sum of values multiplied by their weight, by the sum of the weights", () => {
    expect(MathFunctions.calcWeightedMean(weightedSimpleArray, 'value', 'weight')).toStrictEqual(expectedSimpleResult);
  });

  test('Arrays containing empty values should not change the weighted mean', () => {
    const arrayWithNulls = [null, ...weightedSimpleArray, null];
    expect(MathFunctions.calcWeightedMean(arrayWithNulls, 'value', 'weight')).toStrictEqual(expectedSimpleResult);
  });

  test("Object arrays weighted mean should be equal to the mean of the array's item values", () => {
    expect(MathFunctions.calcWeightedMean(weightedObjectArray, 'value', 'weight')).toStrictEqual(expectedObjectResult);
  });

  test('Object arrays weighted mean with null values should not cause errors or alter the result', () => {
    const arrayWithNulls = [null, ...weightedObjectArray];
    expect(MathFunctions.calcWeightedMean(arrayWithNulls, 'value', 'weight')).toStrictEqual(expectedObjectResult);
  });

  test('If a value prop or weight prop is not provided for calcWeightedMean method, an error should be thrown', () => {
    expect(() => {
      MathFunctions.calcWeightedMean([], 'something');
    }).toThrow();
  });
});

describe('Testing WEIGHTED MEDIAN and MEDIAN methods', () => {
  const weightedSimpleArray = TEST_ARRAY.map((d) => ({
    value: d,
    weight: 1,
  }));
  test('The weighted median of elements with the same weight should be the median of the array values', () => {
    expect(MathFunctions.calcWeightedMedian(weightedSimpleArray, 'value', 'weight')).toStrictEqual(MathFunctions.calcMedian(weightedSimpleArray, 'value'));
  });

  test('The weighted median of an empty array should be 0', () => {
    expect(MathFunctions.calcWeightedMedian([], 'value', 'weight')).toStrictEqual(0);
  });

  test('The weighted median of elements with different weight should not be the median of the array values', () => {
    expect(MathFunctions.calcWeightedMedian(
        weightedSimpleArray.map((d, index) => ({
          value: d.value,
          weight: index + 1,
        })),
        'value',
        'weight'
      )).not.toEqual(MathFunctions.calcMedian(weightedSimpleArray, 'value'));
  });

  test('If a value prop or weight prop is not provided for calcWeightedMedian method, an error should be thrown', () => {
    expect(() => {
      MathFunctions.calcWeightedMedian([], 'something');
    }).toThrow();
  });
});

describe('Testing PERCENTAGE methods', () => {
  test('Percentages should work correctly', () => {
    expect(MathFunctions.calcPercent(20, 100)).toStrictEqual((20 * 100) / 100);
  });
});

describe('Testing RULE OF THREE methods', () => {
  test('Calculating according to rule of three should work according to math', () => {
    expect(MathFunctions.ruleOfThree(20, 20, 100)).toStrictEqual((20 * 100) / 20);
  });
});
