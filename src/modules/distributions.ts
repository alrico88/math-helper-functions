import {thresholdSturges} from 'd3-array';
import {max, min} from 'lodash'
import {getSimpleArray} from './arrays';
import {calcDomain} from './domain';
import {calcSum} from './operations';
import {calcPercent} from './percentages';

interface IDistribution {
    labels: string[];
    data: number[];
}

interface IDistributionArrayItem {
    label: string;
    count: number;
    percentage: number;
    from: number;
    to: number;
}

interface IBucket {
    label: string;
    from: number;
    to: number;
}

function isNullOrUndefined(element: any): boolean {
    return element === null || element === undefined;
}

function createArrayData(buckets: IBucket[], array: any[]) {
    const data = new Array(buckets.length).fill(0);

    buckets.forEach((b, currentIndex) => {
        const condition = currentIndex === buckets.length - 1
            ? (d: number) => d >= b.from && d <= b.to
            : (d: number) => d >= b.from && d < b.to

        data[currentIndex] = array.filter(condition).length;
    });

    return data;
}

function getMinMaxValuesForBuckets(diffData: number, b: number, minDom: number): {
    minWithoutRound: number;
    maxWithoutRound: number;
} {
    const minDiff = diffData * (b - 1);
    const maxDiff = diffData * b;

    return {
        minWithoutRound: b === 1 ? minDom + diffData : minDom + minDiff,
        maxWithoutRound: b === 1 ? minDom : minDom + maxDiff,
    };
}

/**
 * Calculates the distribution of an arrays values
 *
 * @export
 * @param  {any[]} array Input array
 * @param {boolean} strict
 * @param  {number} [numOfBins] Number of bins to use
 * @return {IDistribution} The distribution
 */
export function calcDistribution(array: any[], strict = false, numOfBins?: number): IDistribution {
    const minDom = min(array) as number;
    const maxDom = max(array) as number;

    const bins = numOfBins ?? thresholdSturges(array);

    let diffData;

    if (Math.abs(maxDom) < Math.abs(minDom)) {
        diffData = (Math.abs(minDom) - Math.abs(maxDom)) / (bins);
    } else {
        diffData = (Math.abs(maxDom) - Math.abs(minDom)) / (bins);
    }

    const buckets: IBucket[] = [];

    const labels: string[] = [];

    for (let b = 1; b <= bins; b++) {
        const {
            minWithoutRound,
            maxWithoutRound,
        } = getMinMaxValuesForBuckets(diffData, b, minDom);

        const minVal = strict ? minWithoutRound : Math.floor(minWithoutRound);
        const elseVal = b === bins ? Math.ceil(maxWithoutRound) : Math.floor(maxWithoutRound);

        const maxVal = strict ? maxWithoutRound : elseVal;

        const label = `${minVal} - ${maxVal}`;

        labels.push(label);

        buckets.push({
            label: label,
            from: minVal,
            to: maxVal,
        });
    }

    return {
        labels,
        data: createArrayData(buckets, array),
    };
}

/**
 * Gets the min and max values for a calcDistribution bucket
 *
 * @export
 * @param  {string} bucketLabel The bucket label
 * @return {number[]} [min, max]
 */
export function getMinMaxFromBucket(bucketLabel: string): number[] {
    const [min, max] = bucketLabel.split(' - ');

    return [Number(min.trim()), Number(max.trim())];
}

/**
 * Calculates the distribution of an arrays values and outputs an array
 *
 * @export
 * @param  {number[]} array Array to calc distribution of
 * @param binsStrict
 * @param  {number} [numOfBins] Number of bins to use
 * @return {IDistributionArrayItem[]} The distribution as an array of objects
 */
export function calcDistributionAsArray(array: number[], binsStrict = false, numOfBins?: number): IDistributionArrayItem[] {
    const distribution = calcDistribution(array, binsStrict, numOfBins);

    const total = calcSum(distribution.data);

    return distribution.labels.map((label, index) => {
        const indexValue = distribution.data[index];
        const [from, to] = getMinMaxFromBucket(label);

        return {
            label,
            count: indexValue,
            percentage: calcPercent(indexValue, total),
            from,
            to,
        };
    });
}

/**
 * Gets the quartiles of an array
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {string} property Property to map by
 * @return {[number, number, number]} The quartiles
 */
export function calcQuartiles(array: any[], property: string): [number, number, number] {
    const len = array.length;
    const simpleArray = [...getSimpleArray(array, property)];
    simpleArray.sort((a, b) => a - b);

    return [
        simpleArray[Math.round(len / 4) - 1],
        simpleArray[Math.round(len / 2) - 1],
        simpleArray[Math.round(len * 3 / 4) - 1],
    ];
}

/**
 * Calculates a histogram from array values
 *
 * @export
 * @param  {any[]} array Input array
 * @param  {number} [numberOfBins=4] Number of bins to use
 * @param  {string} [property] Property to map by
 * @return {number[]} The histogram
 */
export function calcHistogram(array: any[], numberOfBins = 4, property?: string): number[] {
    const dataArray = getSimpleArray(array, property);
    const [arrayMin, arrayMax] = calcDomain(dataArray);
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
