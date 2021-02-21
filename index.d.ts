export = MathFunctions;
/**
 * MathFunctions class
 * Compendium of math-related functions
 *
 * @class MathFunctions
 */
declare class MathFunctions {
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
    private static _getSimpleArray;
    /**
     * Returns array max value
     *
     * @static
     * @param {Array} array Array to find max value of
     * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
     * @returns {number} Max array value
     */
    static calcMax(array: any[], property?: string): number;
    /**
     * Returns the sum of an array
     *
     * @static
     * @param {Array} array Array to find sum of
     * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
     * @returns {number} Sum of array values
     */
    static calcSum(array: any[], property?: string): number;
    /**
     * Returns min value in array
     *
     * @param {Array} array Array to find min value of
     * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
     * @returns {number} Min array value
     */
    static calcMin(array: any[], property?: string): number;
    /**
     * Returns min and max values in array
     *
     * @param {Array} array Array to calc domain of
     * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
     * @returns {number[]} Min and max values in array
     */
    static calcDomain(array: any[], property?: string): number[];
    /**
     * Returns median value of array
     *
     * @static
     * @param {Array} array Array to find median of
     * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
     * @returns {number} Median of an array
     * @memberof MathFunctions
     */
    static calcMedian(array: any[], property?: string): number;
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
    static calcWeightedMedian(array: object[], valueProperty: string, weightProperty: string): number;
    /**
     * Returns mean value of array
     *
     * @static
     * @param {Array} array Array to find mean of
     * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
     * @returns {number} Mean of an array
     * @memberof MathFunctions
     */
    static calcMean(array: any[], property?: string): number;
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
    static calcWeightedMean(array: object[], valueProperty: string, weightProperty: string): number;
    /**
     * Calculate percentage using rule of three
     *
     * @static
     * @param {number} toCalc Number to find percent of
     * @param {number} total Total
     * @returns {number} Percentage
     * @memberof MathFunctions
     */
    static calcPercent(toCalc: number, total: number): number;
    /**
     * Gets array distribution
     *
     * @static
     * @param {number[]} array Array to find distribution of
     * @param {number} [numOfBins] Number of bins to use (optional)
     * @returns {{labels: string[], data: number[]}} Distribution of the array's values
     * @memberof MathFunctions
     */
    static calcDistribution(array: number[], numOfBins?: number): {
        labels: string[];
        data: number[];
    };
    /**
     * Calcs quartiles of data array
     *
     * @static
     * @param {any[]} array Array to find quartiles of
     * @param {string} [property] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
     * @returns {number[]} [min, mean, max] quartiles
     * @memberof MathFunctions
     */
    static calcQuartiles(array: any[], property?: string): number[];
    /**
     * Calcs histogram from data array
     *
     * @static
     * @param {any[]} array Array to get histogram from
     * @param {number} [numberOfBins=4] Number of bins to distribute data
     * @param {string} [property=undefined] Property to access in object arrays. Supports nested properties (ex: 'propA.propB')
     * @returns {number[]} Distribution data array
     * @memberof MathFunctions
     */
    static calcHistogram(array: any[], numberOfBins?: number, property?: string): number[];
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
    static ruleOfThree(ifThis: number, isThis: number, thenThat: number): number;
}
