const {sum, max, min, mean, median, extent, histogram} = require('d3-array');
const get = require('lodash/get');

/**
 * MathFunctions class
 * Compendium of math-related functions
 *
 * @class MathFunctions
 */
class MathFunctions {

  /**
   * Gets array of values from possibly complex arrays
   *
   * @private
   * @static
   * @param {Array} array
   * @param {string} [property]
   * @return {Array}
   * @memberof MathFunctions
   */
  static _getSimpleArray(array, property) {
    return property ? array.map((d) => get(d, property)) : array;
  }

  /**
   * Returns array max value
   *
   * @static
   * @param {Array} array Array to find max value of
   * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
   * @returns {number} Max array value
   */
  static calcMax(array, property) {
    return max(MathFunctions._getSimpleArray(array, property));
  }

  /**
   * Returns the sum of an array
   *
   * @static
   * @param {Array} array Array to find sum of
   * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
   * @returns {number} Sum of array values
   */
  static calcSum(array, property) {
    return sum(MathFunctions._getSimpleArray(array, property));
  }

  /**
   * Returns min value in array
   *
   * @param {Array} array Array to find min value of
   * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
   * @returns {number} Min array value
   */
  static calcMin(array, property) {
    return min(MathFunctions._getSimpleArray(array, property));
  }

  /**
   * Returns min and max values in array
   *
   * @param {Array} array Array to calc domain of
   * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
   * @returns {number[]} Min and max values in array
   */
  static calcDomain(array, property) {
    const simpleArray = MathFunctions._getSimpleArray(array, property);
    return extent(simpleArray);
  }

  /**
   * Returns median value of array
   *
   * @static
   * @param {Array} array Array to find median of
   * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
   * @returns {number} Median of an array
   * @memberof MathFunctions
   */
  static calcMedian(array, property) {
    return median(MathFunctions._getSimpleArray(array, property));
  }

  /**
   * Returns weighted median of array
   *
   * @static
   * @param {object[]} array Array to find weighted median of
   * @param {string} valueProperty Property to use for array item value
   * @param {string} weightProperty Property to use for array item weight
   * @returns {number} Weighted median
   * @memberof MathFunctions
   */
  static calcWeightedMedian(array, valueProperty, weightProperty) {
    // Prevent undefined problems
    if (!valueProperty || !weightProperty) {
      throw new Error('Both valueProperty and weightProperty params are required');
    }
    if (array.length === 0) {
      return 0;
    }

    const {array: arrayToSort, weightSum} = array.reduce(
      (acc, item) => {
        acc.array.push({
          value: item[valueProperty],
          weight: item[weightProperty],
        });
        acc.weightSum += item[weightProperty];
        return acc;
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
      const prevItem = get(sortedArray[index - 1], 'value', 0);
      const currItem = get(sortedArray[index], 'value', 0);
      return (prevItem + currItem) / 2;
    } else {
      return get(sortedArray[index - 1], 'value', 0);
    }
  }

  /**
   * Returns mean value of array
   *
   * @static
   * @param {Array} array Array to find mean of
   * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
   * @returns {number} Mean of an array
   * @memberof MathFunctions
   */
  static calcMean(array, property) {
    return mean(MathFunctions._getSimpleArray(array, property));
  }

  /**
   * Returns weighted mean of array
   *
   * @static
   * @param {object[]} array Array to find weighted mean of
   * @param {string} valueProperty Property to use for array item value
   * @param {string} weightProperty Property to use for array item weight
   * @returns {number} Weighted mean
   * @memberof MathFunctions
   */
  static calcWeightedMean(array, valueProperty, weightProperty) {
    if (!valueProperty || !weightProperty) {
      throw new Error('Both valueProperty and weightProperty params are required');
    }
    const result = array
      .map((d) => {
        const weight = get(d, weightProperty, 0);
        const upper = get(d, valueProperty, 0) * weight;
        return [upper, weight];
      })
      .reduce((acc, d) => [acc[0] + d[0], acc[1] + d[1]], [0, 0]);
    return result[0] / result[1];
  }

  /**
   * Calculate percentage using rule of three
   *
   * @static
   * @param {number} toCalc Number to find percent of
   * @param {number} total Total
   * @returns {number} Percentage
   * @memberof MathFunctions
   */
  static calcPercent(toCalc, total) {
    return MathFunctions.ruleOfThree(total, 100, toCalc);
  }

  /**
   * Gets array distribution
   *
   * @static
   * @param {number[]} array Array to find distribution of
   * @param {number} [numOfBins] Number of bins to use (optional)
   * @returns {{labels: string[], data: number[]}} Distribution of the array's values
   * @memberof MathFunctions
   */
  static calcDistribution(array, numOfBins) {
    const hist = numOfBins ? histogram().thresholds(numOfBins) : histogram();
    const dist = hist(array);
    return dist.reduce(
      (acc, {x0, x1, length}) => {
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
   * Calcs quartiles of data array
   *
   * @static
   * @param {any[]} array Array to find quartiles of
   * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
   * @returns {number[]} [min, mean, max] quartiles
   * @memberof MathFunctions
   */
  static calcQuartiles(array, property) {
    const len = array.length;
    const simpleArray = MathFunctions._getSimpleArray(array, property);
    const copy = simpleArray.sort((a, b) => a - b);
    return [
      copy[Math.round(len / 4) - 1],
      copy[Math.round(len / 2) - 1],
      copy[Math.round((len * 3) / 4) - 1],
    ];
  }

  /**
   * Calcs histogram from data array
   *
   * @static
   * @param {any[]} array Array to get histogram from
   * @param {number} [numberOfBins=4] Number of bins to distribute data
   * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
   * @returns {number[]} Distribution data array
   * @memberof MathFunctions
   */
  static calcHistogram(array, numberOfBins = 4, property) {
    const dataArray = property ? array.map((d) => get(d, property)) : array;
    const [arrayMin, arrayMax] = MathFunctions.calcDomain(dataArray);
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

  /**
   * Performs a rule of three calculation
   *
   * @static
   * @param {number} ifThis First premise
   * @param {number} isThis First result
   * @param {number} thenThat Second premise
   * @returns {number} The result of the rule of three
   * @memberof MathFunctions
   */
  static ruleOfThree(ifThis, isThis, thenThat) {
    return (isThis * thenThat) / ifThis;
  }
}

module.exports = MathFunctions;
