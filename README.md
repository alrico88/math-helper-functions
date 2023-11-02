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

## Table of contents

### Functions

- [calcDiff](modules.md#calcdiff)
- [calcDistribution](modules.md#calcdistribution)
- [calcDistributionAsArray](modules.md#calcdistributionasarray)
- [calcDomain](modules.md#calcdomain)
- [calcHistogram](modules.md#calchistogram)
- [calcMax](modules.md#calcmax)
- [calcMean](modules.md#calcmean)
- [calcMedian](modules.md#calcmedian)
- [calcMin](modules.md#calcmin)
- [calcPercent](modules.md#calcpercent)
- [calcQuartiles](modules.md#calcquartiles)
- [calcStdDeviation](modules.md#calcstddeviation)
- [calcSum](modules.md#calcsum)
- [calcVariance](modules.md#calcvariance)
- [calcWeightedMean](modules.md#calcweightedmean)
- [calcWeightedMedian](modules.md#calcweightedmedian)
- [getMinMaxFromBucket](modules.md#getminmaxfrombucket)
- [ruleOfThree](modules.md#ruleofthree)

## Functions

### calcDiff

▸ **calcDiff**(`array`, `property?`): `number`

Gets the absolute difference between the max and min value in an array

#### Parameters

| Name        | Type     | Description        |
| :---------- | :------- | :----------------- |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

`number`

Absolute difference between the max and min of an array

**`Export`**

#### Defined in

[modules/domain.ts:48](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/domain.ts#L48)

---

### calcDistribution

▸ **calcDistribution**(`array`, `strict?`, `numOfBins?`): `IDistribution`

Calculates the distribution of an arrays values

#### Parameters

| Name         | Type       | Default value | Description           |
| :----------- | :--------- | :------------ | :-------------------- |
| `array`      | `number`[] | `undefined`   | Input array           |
| `strict`     | `boolean`  | `false`       |                       |
| `numOfBins?` | `number`   | `undefined`   | Number of bins to use |

#### Returns

`IDistribution`

The distribution

**`Export`**

#### Defined in

[modules/distributions.ts:76](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L76)

---

### calcDistributionAsArray

▸ **calcDistributionAsArray**(`array`, `binsStrict?`, `numOfBins?`): `IDistributionArrayItem`[]

Calculates the distribution of an arrays values and outputs an array

#### Parameters

| Name          | Type       | Default value | Description                                    |
| :------------ | :--------- | :------------ | :--------------------------------------------- |
| `array`       | `number`[] | `undefined`   | Array to calc distribution of                  |
| `binsStrict?` | `boolean`  | `false`       | If false, buckets may be rounded [floor, ceil] |
| `numOfBins?`  | `number`   | `undefined`   | Number of bins to use                          |

#### Returns

`IDistributionArrayItem`[]

The distribution as an array of objects

**`Export`**

#### Defined in

[modules/distributions.ts:142](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L142)

---

### calcDomain

▸ **calcDomain**(`array`, `property?`): [`number`, `number`] \| [`any`, `any`]

Gets the [min, max] value in an array

#### Parameters

| Name        | Type     | Description        |
| :---------- | :------- | :----------------- |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

[`number`, `number`] \| [`any`, `any`]

The domain

**`Export`**

#### Defined in

[modules/domain.ts:36](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/domain.ts#L36)

---

### calcHistogram

▸ **calcHistogram**(`array`, `numberOfBins?`, `property?`): `number`[]

Calculates a histogram from array values

#### Parameters

| Name            | Type     | Default value | Description           |
| :-------------- | :------- | :------------ | :-------------------- |
| `array`         | `any`[]  | `undefined`   | Input array           |
| `numberOfBins?` | `number` | `4`           | Number of bins to use |
| `property?`     | `string` | `undefined`   | Property to map by    |

#### Returns

`number`[]

The histogram

**`Export`**

#### Defined in

[modules/distributions.ts:194](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L194)

---

### calcMax

▸ **calcMax**(`array`, `property?`): `number`

Gets the max value in an array

#### Parameters

| Name        | Type     | Description        |
| :---------- | :------- | :----------------- |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

`number`

The maximum value in the array

**`Export`**

#### Defined in

[modules/domain.ts:12](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/domain.ts#L12)

---

### calcMean

▸ **calcMean**(`array`, `property?`): `number` \| `undefined`

Gets the mean value for an array

#### Parameters

| Name        | Type     | Description        |
| :---------- | :------- | :----------------- |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

`number` \| `undefined`

The mean value

**`Export`**

#### Defined in

[modules/averages.ts:100](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L100)

---

### calcMedian

▸ **calcMedian**(`array`, `property?`): `number` \| `undefined`

Gets an array median

#### Parameters

| Name        | Type     | Description            |
| :---------- | :------- | :--------------------- |
| `array`     | `any`[]  | Input array            |
| `property?` | `string` | The property to map by |

#### Returns

`number` \| `undefined`

The resulting median

**`Export`**

#### Defined in

[modules/averages.ts:16](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L16)

---

### calcMin

▸ **calcMin**(`array`, `property?`): `number`

Gets the min value in an array

#### Parameters

| Name        | Type     | Description     |
| :---------- | :------- | :-------------- |
| `array`     | `any`[]  | Input array     |
| `property?` | `string` | Property to map |

#### Returns

`number`

The minimum value in the array

**`Export`**

#### Defined in

[modules/domain.ts:24](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/domain.ts#L24)

---

### calcPercent

▸ **calcPercent**(`toCalc`, `total`): `number`

Calculates the percentage of a value, given a total

#### Parameters

| Name     | Type     | Description                 |
| :------- | :------- | :-------------------------- |
| `toCalc` | `number` | Number to get percentage of |
| `total`  | `number` | Total                       |

#### Returns

`number`

Percentage of the total

**`Export`**

#### Defined in

[modules/percentages.ts:22](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/percentages.ts#L22)

---

### calcQuartiles

▸ **calcQuartiles**(`array`, `property?`): [`number`, `number`, `number`]

Gets the quartiles of an array

#### Parameters

| Name        | Type     | Description        |
| :---------- | :------- | :----------------- |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

[`number`, `number`, `number`]

The quartiles

**`Export`**

#### Defined in

[modules/distributions.ts:173](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L173)

---

### calcStdDeviation

▸ **calcStdDeviation**<`T`\>(`array`, `property?`): `number` \| `undefined`

Calculates the standard deviation in an array of numbers

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `array`     | `T`[]    |
| `property?` | `string` |

#### Returns

`number` \| `undefined`

**`Export`**

#### Defined in

[modules/averages.ts:155](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L155)

---

### calcSum

▸ **calcSum**(`array`, `property?`): `number`

Gets the sum of the values in an array

#### Parameters

| Name        | Type     | Description        |
| :---------- | :------- | :----------------- |
| `array`     | `any`[]  | Input array        |
| `property?` | `string` | Property to map by |

#### Returns

`number`

The sum

**`Export`**

#### Defined in

[modules/operations.ts:12](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/operations.ts#L12)

---

### calcVariance

▸ **calcVariance**<`T`\>(`array`, `property?`): `number` \| `undefined`

Calculates the variance in an array of numbers

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `array`     | `T`[]    |
| `property?` | `string` |

#### Returns

`number` \| `undefined`

**`Export`**

#### Defined in

[modules/averages.ts:142](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L142)

---

### calcWeightedMean

▸ **calcWeightedMean**(`array`, `valueProperty`, `weightProperty`): `number`

Gets the weighted mean for an array

#### Parameters

| Name             | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `array`          | `any`[]  | Input array                |
| `valueProperty`  | `string` | Property to use for value  |
| `weightProperty` | `string` | Property to use for weight |

#### Returns

`number`

The weighted mean

**`Export`**

#### Defined in

[modules/averages.ts:113](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L113)

---

### calcWeightedMedian

▸ **calcWeightedMedian**(`array`, `valueProperty`, `weightProperty`): `number`

Gets an array weighted median

#### Parameters

| Name             | Type     | Description                   |
| :--------------- | :------- | :---------------------------- |
| `array`          | `any`[]  | Input array                   |
| `valueProperty`  | `string` | The property to use as value  |
| `weightProperty` | `string` | The property to use as weight |

#### Returns

`number`

The resulting median

**`Export`**

#### Defined in

[modules/averages.ts:45](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/averages.ts#L45)

---

### getMinMaxFromBucket

▸ **getMinMaxFromBucket**(`bucketLabel`): `number`[]

Gets the min and max values for a calcDistribution bucket

#### Parameters

| Name          | Type     | Description      |
| :------------ | :------- | :--------------- |
| `bucketLabel` | `string` | The bucket label |

#### Returns

`number`[]

[min, max]

**`Export`**

#### Defined in

[modules/distributions.ts:127](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/distributions.ts#L127)

---

### ruleOfThree

▸ **ruleOfThree**(`ifThis`, `isThis`, `thenThat`): `number`

Performs a simple rule of three

#### Parameters

| Name       | Type     | Description  |
| :--------- | :------- | :----------- |
| `ifThis`   | `number` | First param  |
| `isThis`   | `number` | First result |
| `thenThat` | `number` | Second param |

#### Returns

`number`

Second result

**`Export`**

#### Defined in

[modules/percentages.ts:10](https://github.com/alrico88/math-helper-functions/blob/master/src/modules/percentages.ts#L10)
