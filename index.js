const {sum, max, min, mean, median, histogram} = require('d3-array');
const get = require('lodash/get');

/**
 * MathFunctions class
 * Compendium of math-related functions
 *
 * @class MathFunctions
 */
class MathFunctions {

  /**
   * Gets args for functions
   *
   * @static
   * @private
   * @param {Array} array
   * @param {string} property
   * @returns {Array}
   * @memberof MathFunctions
   */
  static getArgs(array, property) {
    return property ? [array, (d) => get(d, property)] : [array];
  }

  /**
   * Returns array max value
   *
   * @static
   * @param {Array} array Array to find max value of
   * @param {string} [property=null] Property name to iterate
   * @returns {number} Max array value
   */
  static calcMax(array, property = null) {
    const args = MathFunctions.getArgs(array, property);
    return max(...args);
  }

  /**
   * Returns the sum of an array
   *
   * @static
   * @param {Array} array Array to find sum of
   * @param {string} [property=null] Property name to iterate
   * @returns {number} Sum of array values
   */
  static calcSum(array, property = null) {
    const args = MathFunctions.getArgs(array, property);
    return sum(...args);
  }

  /**
   * Returns min value in array
   *
   * @param {Array} array Array to find min value of
   * @param {string} [property=null] Property name to iterate
   * @returns {number} Min array value
   */
  static calcMin(array, property = null) {
    const args = MathFunctions.getArgs(array, property);
    return min(...args);
  }

  /**
   * Returns min and max values in array
   *
   * @param {string[]|number[]} array Array to calc domain of
   * @param {string} [property=null] Property name to iterate
   * @returns {number[]} Min and max values in array
   */
  static calcDomain(array, property = null) {
    return [
      MathFunctions.calcMin(array, property),
      MathFunctions.calcMax(array, property),
    ];
  }

  /**
   * Returns median value of array
   *
   * @static
   * @param {Array} array Array to find median of
   * @param {string} [property=null] Property name to iterate
   * @returns {number} Median of an array
   * @memberof MathFunctions
   */
  static calcMedian(array, property = null) {
    const args = MathFunctions.getArgs(array, property);
    return median(...args);
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
   * @param {string} [property=null] Property name to iterate
   * @returns {number} Mean of an array
   * @memberof MathFunctions
   */
  static calcMean(array, property = null) {
    const args = MathFunctions.getArgs(array, property);
    return mean(...args);
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
   * @returns {object} Distribution of the array's values
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
        datasets: [],
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
    const copy = array
      .map(function(d) {
        return property ? get(d, property) : d;
      })
      .sort((a, b) => a - b);
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
