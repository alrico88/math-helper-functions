# math-helper-functions

## Installation

Using npm, `npm i math-helper-functions`.

Using yarn, `yarn add math-helper-functions`.

## Usage

Using `import`

```javascript
import { calcSum } from 'math-helper-functions';

const input = [
  { item: 'bookA', count: 3 },
  { item: 'bookB', count: 4 },
];

const totalBooks = calcSum(input, 'count'); // totalBooks is 7
```

In a CommonJS environment

```javascript
const { calcDomain } = require('math-helper-functions');

const input = [
  { item: 'bookA', count: 3 },
  { item: 'bookB', count: 10 },
  { item: 'bookC', count: 1 },
];

const domain = calcDomain(input, 'count'); // domain is [1, 10]
```

## API

## Interfaces

### IBucket

Defined in: [distributions.ts:22](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L22)

#### Properties

| Property                     | Type                           | Defined in                                                                                                            |
| ---------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| <a id="from"></a> `from`     | `number`                       | [distributions.ts:24](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L24) |
| <a id="inside"></a> `inside` | (`val`: `number`) => `boolean` | [distributions.ts:26](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L26) |
| <a id="label"></a> `label`   | `string`                       | [distributions.ts:23](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L23) |
| <a id="to"></a> `to`         | `number`                       | [distributions.ts:25](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L25) |

---

### IDistribution

Defined in: [distributions.ts:9](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L9)

#### Properties

| Property                     | Type       | Defined in                                                                                                            |
| ---------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------- |
| <a id="data"></a> `data`     | `number`[] | [distributions.ts:11](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L11) |
| <a id="labels"></a> `labels` | `string`[] | [distributions.ts:10](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L10) |

---

### IDistributionArrayItem

Defined in: [distributions.ts:14](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L14)

#### Properties

| Property                             | Type     | Defined in                                                                                                            |
| ------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| <a id="count"></a> `count`           | `number` | [distributions.ts:16](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L16) |
| <a id="from-1"></a> `from`           | `number` | [distributions.ts:18](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L18) |
| <a id="label-1"></a> `label`         | `string` | [distributions.ts:15](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L15) |
| <a id="percentage"></a> `percentage` | `number` | [distributions.ts:17](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L17) |
| <a id="to-1"></a> `to`               | `number` | [distributions.ts:19](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L19) |

---

### ISerieDistribution

Defined in: [distributions.ts:29](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L29)

#### Properties

| Property                       | Type       | Defined in                                                                                                            |
| ------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------- |
| <a id="data-1"></a> `data`     | `object`[] | [distributions.ts:31](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L31) |
| <a id="labels-1"></a> `labels` | `string`[] | [distributions.ts:30](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L30) |

## Functions

### calcBuckets()

```ts
function calcBuckets(
  array: number[],
  strict?: boolean,
  numOfBins?: number,
): IBucket[];
```

Defined in: [distributions.ts:57](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L57)

Calculate the buckets given a data array and an amount

#### Parameters

| Parameter    | Type       | Default value | Description                          |
| ------------ | ---------- | ------------- | ------------------------------------ |
| `array`      | `number`[] | `undefined`   | The data array                       |
| `strict?`    | `boolean`  | `false`       | Whether to use real or pretty domain |
| `numOfBins?` | `number`   | `undefined`   | Amount of desired buckets            |

#### Returns

[`IBucket`](#ibucket)[]

The buckets

---

### calcDiff()

```ts
function calcDiff(array: any[], property?: string): number;
```

Defined in: [domain.ts:47](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/domain.ts#L47)

Gets the absolute difference between the max and min value in an array

#### Parameters

| Parameter   | Type     | Description        |
| ----------- | -------- | ------------------ |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

`number`

Absolute difference between the max and min of an array

---

### calcDistribution()

```ts
function calcDistribution(
  array: number[],
  strict: boolean,
  numOfBins?: number,
): IDistribution;
```

Defined in: [distributions.ts:103](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L103)

Calculates the distribution of an arrays values

#### Parameters

| Parameter    | Type       | Default value | Description           |
| ------------ | ---------- | ------------- | --------------------- |
| `array`      | `number`[] | `undefined`   | Input array           |
| `strict`     | `boolean`  | `false`       |                       |
| `numOfBins?` | `number`   | `undefined`   | Number of bins to use |

#### Returns

[`IDistribution`](#idistribution)

The distribution

---

### calcDistributionAsArray()

```ts
function calcDistributionAsArray(
  array: number[],
  binsStrict?: boolean,
  numOfBins?: number,
): IDistributionArrayItem[];
```

Defined in: [distributions.ts:194](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L194)

Calculates the distribution of an arrays values and outputs an array

#### Parameters

| Parameter     | Type       | Default value | Description                                    |
| ------------- | ---------- | ------------- | ---------------------------------------------- |
| `array`       | `number`[] | `undefined`   | Array to calc distribution of                  |
| `binsStrict?` | `boolean`  | `false`       | If false, buckets may be rounded [floor, ceil] |
| `numOfBins?`  | `number`   | `undefined`   | Number of bins to use                          |

#### Returns

[`IDistributionArrayItem`](#idistributionarrayitem)[]

The distribution as an array of objects

---

### calcDistributionWithSeries()

```ts
function calcDistributionWithSeries(
  buckets: IBucket[],
  dataGrouped: Record<string, unknown[]>,
  distributionProp: string,
): ISerieDistribution;
```

Defined in: [distributions.ts:136](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L136)

Calculates the distribution of an array of grouped objects

#### Parameters

| Parameter          | Type                              | Description |
| ------------------ | --------------------------------- | ----------- |
| `buckets`          | [`IBucket`](#ibucket)[]           |             |
| `dataGrouped`      | `Record`\<`string`, `unknown`[]\> |             |
| `distributionProp` | `string`                          |             |

#### Returns

[`ISerieDistribution`](#iseriedistribution)

The distribution with labels and data

---

### calcDomain()

```ts
function calcDomain(
  array: any[],
  property?: string,
): [number, number] | [any, any];
```

Defined in: [domain.ts:33](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/domain.ts#L33)

Gets the [min, max] value in an array

#### Parameters

| Parameter   | Type     | Description        |
| ----------- | -------- | ------------------ |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

\[`number`, `number`\] \| \[`any`, `any`\]

The domain

---

### calcHistogram()

```ts
function calcHistogram(
  array: any[],
  numberOfBins?: number,
  property?: string,
): number[];
```

Defined in: [distributions.ts:247](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L247)

Calculates a histogram from array values

#### Parameters

| Parameter       | Type     | Default value | Description           |
| --------------- | -------- | ------------- | --------------------- |
| `array`         | `any`[]  | `undefined`   | Input array           |
| `numberOfBins?` | `number` | `4`           | Number of bins to use |
| `property?`     | `string` | `undefined`   | Property to map by    |

#### Returns

`number`[]

The histogram

---

### calcMax()

```ts
function calcMax(array: any[], property?: string): number;
```

Defined in: [domain.ts:11](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/domain.ts#L11)

Gets the max value in an array

#### Parameters

| Parameter   | Type     | Description        |
| ----------- | -------- | ------------------ |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

`number`

The maximum value in the array

---

### calcMean()

```ts
function calcMean(array: any[], property?: string): undefined | number;
```

Defined in: [averages.ts:102](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L102)

Gets the mean value for an array

#### Parameters

| Parameter   | Type     | Description        |
| ----------- | -------- | ------------------ |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

`undefined` \| `number`

The mean value

---

### calcMedian()

```ts
function calcMedian(array: any[], property?: string): undefined | number;
```

Defined in: [averages.ts:13](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L13)

Gets an array median

#### Parameters

| Parameter   | Type     | Description            |
| ----------- | -------- | ---------------------- |
| `array`     | `any`[]  | Input array            |
| `property?` | `string` | The property to map by |

#### Returns

`undefined` \| `number`

The resulting median

---

### calcMin()

```ts
function calcMin(array: any[], property?: string): number;
```

Defined in: [domain.ts:22](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/domain.ts#L22)

Gets the min value in an array

#### Parameters

| Parameter   | Type     | Description     |
| ----------- | -------- | --------------- |
| `array`     | `any`[]  | Input array     |
| `property?` | `string` | Property to map |

#### Returns

`number`

The minimum value in the array

---

### calcPercent()

```ts
function calcPercent(toCalc: number, total: number): number;
```

Defined in: [percentages.ts:24](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/percentages.ts#L24)

Calculates the percentage of a value, given a total

#### Parameters

| Parameter | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `toCalc`  | `number` | Number to get percentage of |
| `total`   | `number` | Total                       |

#### Returns

`number`

Percentage of the total

---

### calcQuartiles()

```ts
function calcQuartiles(
  array: any[],
  property?: string,
): [number, number, number];
```

Defined in: [distributions.ts:224](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L224)

Gets the quartiles of an array

#### Parameters

| Parameter   | Type     | Description        |
| ----------- | -------- | ------------------ |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

\[`number`, `number`, `number`\]

The quartiles

---

### calcStdDeviation()

```ts
function calcStdDeviation<T>(array: T[], property?: string): undefined | number;
```

Defined in: [averages.ts:162](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L162)

Calculates the standard deviation in an array of numbers

#### Type Parameters

| Type Parameter | Description |
| -------------- | ----------- |
| `T`            |             |

#### Parameters

| Parameter   | Type     | Description               |
| ----------- | -------- | ------------------------- |
| `array`     | `T`[]    | Input array               |
| `property?` | `string` | Property to use for value |

#### Returns

`undefined` \| `number`

The standard deviation

---

### calcSum()

```ts
function calcSum(array: any[], property?: string): number;
```

Defined in: [operations.ts:11](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/operations.ts#L11)

Gets the sum of the values in an array

#### Parameters

| Parameter   | Type     | Description        |
| ----------- | -------- | ------------------ |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

`number`

The sum

---

### calcVariance()

```ts
function calcVariance<T>(array: T[], property?: string): undefined | number;
```

Defined in: [averages.ts:147](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L147)

Calculates the variance in an array of numbers

#### Type Parameters

| Type Parameter | Description |
| -------------- | ----------- |
| `T`            |             |

#### Parameters

| Parameter   | Type     | Description               |
| ----------- | -------- | ------------------------- |
| `array`     | `T`[]    | Input array               |
| `property?` | `string` | Property to use for value |

#### Returns

`undefined` \| `number`

The variance

---

### calcWeightedMean()

```ts
function calcWeightedMean(
  array: any[],
  valueProperty: string,
  weightProperty: string,
): number;
```

Defined in: [averages.ts:114](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L114)

Gets the weighted mean for an array

#### Parameters

| Parameter        | Type     | Description                |
| ---------------- | -------- | -------------------------- |
| `array`          | `any`[]  | Input array                |
| `valueProperty`  | `string` | Property to use for value  |
| `weightProperty` | `string` | Property to use for weight |

#### Returns

`number`

The weighted mean

---

### calcWeightedMedian()

```ts
function calcWeightedMedian(
  array: any[],
  valueProperty: string,
  weightProperty: string,
): number;
```

Defined in: [averages.ts:44](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L44)

Gets an array weighted median

#### Parameters

| Parameter        | Type     | Description                   |
| ---------------- | -------- | ----------------------------- |
| `array`          | `any`[]  | Input array                   |
| `valueProperty`  | `string` | The property to use as value  |
| `weightProperty` | `string` | The property to use as weight |

#### Returns

`number`

The resulting median

---

### getMinMaxFromBucket()

```ts
function getMinMaxFromBucket(bucketLabel: string): number[];
```

Defined in: [distributions.ts:122](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L122)

Gets the min and max values for a calcDistribution bucket

#### Parameters

| Parameter     | Type     | Description      |
| ------------- | -------- | ---------------- |
| `bucketLabel` | `string` | The bucket label |

#### Returns

`number`[]

[min, max]

---

### getPercentile()

```ts
function getPercentile(
  array: (null | number)[],
  percentile: number,
): undefined | number;
```

Defined in: [percentiles.ts:10](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/percentiles.ts#L10)

Gets the percentile of an array of values

#### Parameters

| Parameter    | Type                   | Description                 |
| ------------ | ---------------------- | --------------------------- |
| `array`      | (`null` \| `number`)[] | Array to find percentile of |
| `percentile` | `number`               | Amount between 0 and 1      |

#### Returns

`undefined` \| `number`

Percentile

---

### getUntilPercentageThreshold()

```ts
function getUntilPercentageThreshold<T>(
  items: T[],
  accessor: (d: T) => number,
  percentageThreshold: number,
): T[];
```

Defined in: [arrays.ts:57](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/arrays.ts#L57)

Gets the top % acc items by an accessor

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter             | Type                   | Description                               |
| --------------------- | ---------------------- | ----------------------------------------- |
| `items`               | `T`[]                  | Items to filter                           |
| `accessor`            | (`d`: `T`) => `number` | The accessor to get a value to accumulate |
| `percentageThreshold` | `number`               | The percentage to stop in (default 80)    |

#### Returns

`T`[]

---

### getUntilValueThreshold()

```ts
function getUntilValueThreshold<T>(
  items: T[],
  accessor: (d: T) => number,
  threshold: number,
): T[];
```

Defined in: [arrays.ts:28](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/arrays.ts#L28)

Gets the top items until a cumulative value threshold

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter   | Type                   | Description                               |
| ----------- | ---------------------- | ----------------------------------------- |
| `items`     | `T`[]                  | Items to filter                           |
| `accessor`  | (`d`: `T`) => `number` | The accessor to get a value to accumulate |
| `threshold` | `number`               | The absolute threshold to stop in         |

#### Returns

`T`[]

---

### ruleOfThree()

```ts
function ruleOfThree(ifThis: number, isThis: number, thenThat: number): number;
```

Defined in: [percentages.ts:9](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/percentages.ts#L9)

Performs a simple rule of three

#### Parameters

| Parameter  | Type     | Description  |
| ---------- | -------- | ------------ |
| `ifThis`   | `number` | First param  |
| `isThis`   | `number` | First result |
| `thenThat` | `number` | Second param |

#### Returns

`number`

Second result
