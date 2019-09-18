const {max, min, mean, median, histogram} = require('d3-array');
const sum = require('lodash/sum');
const sumBy = require('lodash/sumBy');
const NumberHelper = require('number-helper-functions');

/**
 * MathFunctions class
 * Compendium of math-related functions
 *
 * @class MathFunctions
 */
class MathFunctions {

  /**
   * Returns array max value
   *
   * @static
   * @param {Array} array Array to find max value of
   * @param {string} [property=null] Property name to iterate
   * @returns {Number} Max array value
   */
  static calcMax(array, property = null) {
    return max(array, function(d) {
      return property ? d[property] : d;
    });
  }

  /**
   * Returns the sum of an array
   *
   * @static
   * @param {Array} array Array to find sum of
   * @param {string} [property=null] Property name to iterate
   * @returns {Number} Sum of array values
   */
  static calcSum(array, property = null) {
    return property ? sumBy(array, (d) => d[property]) : sum(array);
  }

  /**
   * Returns min value in array
   *
   * @param {Array} array Array to find min value of
   * @param {string} [property=null] Property name to iterate
   * @returns {Number} Min array value
   */
  static calcMin(array, property = null) {
    return min(array, function(d) {
      return property ? d[property] : d;
    });
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
      min(array, function(d) {
        return property ? d[property] : d;
      }),
      max(array, function(d) {
        return property ? d[property] : d;
      }),
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
    return median(array, function(d) {
      return property ? d[property] : d;
    });
  }

  /**
   * Returns mean value in array
   *
   * @static
   * @param {Array} array Array to find mean of
   * @param {string} [property=null] Property name to iterate
   * @returns {Number} Mean of an array
   * @memberof MathFunctions
   */
  static calcMean(array, property = null) {
    return mean(array, function(d) {
      return property ? d[property] : d;
    });
  }

  /**
   * Calculate percentage using rule of three
   *
   * @static
   * @param {Number} toCalc Number to find percent of
   * @param {Number} total Total
   * @returns {Number} Percentage
   * @memberof MathFunctions
   */
  static calcPercent(toCalc, total) {
    return (100 * toCalc) / total;
  }

  /**
   * Gets array distribution
   *
   * @static
   * @param {number[]|string[]} array Array to find distribution of
   * @param {number} [numOfBins] Number of bins to use (optional)
   * @returns {object} Distribution of the array's values
   * @memberof MathFunctions
   */
  static calcDistribution(array, numOfBins) {
    const numHelper = new NumberHelper();
    const numArray = array.map((d) => numHelper.processNumber(d));
    const hist = numOfBins ? histogram().thresholds(numOfBins) : histogram();
    const dist = hist(numArray);
    const graphData = {
      labels: [],
      data: [],
    };
    for (let bin of dist) {
      graphData.labels.push(`${bin.x0} - ${bin.x1}`);
      graphData.data.push(bin.length);
    }
    return graphData;
  }
}

module.exports = MathFunctions;
