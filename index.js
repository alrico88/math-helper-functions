const {max, min, mean, median, histogram} = require('d3-array');
const sum = require('lodash/sum');
const sumBy = require('lodash/sumBy');
const get = require('lodash/get');

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
   * @returns {number} Max array value
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
   * @returns {number} Sum of array values
   */
  static calcSum(array, property = null) {
    return property ? sumBy(array, (d) => d[property]) : sum(array);
  }

  /**
   * Returns min value in array
   *
   * @param {Array} array Array to find min value of
   * @param {string} [property=null] Property name to iterate
   * @returns {number} Min array value
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
   * Returns mean value of array
   *
   * @static
   * @param {Array} array Array to find mean of
   * @param {string} [property=null] Property name to iterate
   * @returns {number} Mean of an array
   * @memberof MathFunctions
   */
  static calcMean(array, property = null) {
    return mean(array, function(d) {
      return property ? d[property] : d;
    });
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
    const totalWeight = MathFunctions.calcSum(array, weightProperty);
    const weightedValues = array.map((d) => d[valueProperty] * d[weightProperty]);
    return MathFunctions.calcSum(weightedValues) / totalWeight;
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
        return property ? d[property] : d;
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
