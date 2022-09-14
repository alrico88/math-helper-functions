# math-helper-functions

## Installation

Using npm, `npm i math-helper-functions`.

Using yarn, `yarn add math-helper-functions`.

## Usage

Using `import`

```javascript
import { calcSum } from 'math-helper-functions';

const input = [{ item: 'bookA', count: 3 }, { item: 'bookB', count: 4 }];

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

- [calcDistribution](#calcdistribution)
- [calcDomain](#calcdomain)
- [calcDiff](#calcdiff)
- [calcHistogram](#calchistogram)
- [calcMax](#calcmax)
- [calcMean](#calcmean)
- [calcMedian](#calcmedian)
- [calcMin](#calcmin)
- [calcPercent](#calcpercent)
- [calcQuartiles](#calcquartiles)
- [calcSum](#calcsum)
- [calcWeightedMean](#calcweightedmean)
- [calcWeightedMedian](#calcweightedmedian)
- [ruleOfThree](#ruleofthree)

## Functions

### calcDistribution

▸ **calcDistribution**(`array`: _any_[], `numOfBins?`: _number_): IDistribution

Calculates the distribution of an arrays values

**`export`**

#### Parameters:

| Name         | Type     | Description |
| :----------- | :------- | :---------- |
| `array`      | _any_[]  | Input array |
| `numOfBins?` | _number_ | -           |

**Returns:** IDistribution

The distribution

---

### calcDomain

▸ **calcDomain**(`array`: _any_[], `property?`: _string_): [*number*, *number*] \| [*any*, *any*]

Gets the [min, max] value in an array

**`export`**

#### Parameters:

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `array`     | _any_[]  | Input array |
| `property?` | _string_ | -           |

**Returns:** [*number*, *number*] \| [*any*, *any*]

The domain

---

### calcDiff

▸ **calcDiff**(`array`: *any*[], `property?`: *string*): *number*

Gets the absolute difference between the max and min value in an array

**`export`** 

#### Parameters:

| Name        | Type     | Description   |
| :---------- | :------- | :------------ |
| `array`     | *any*[]  | Input array   |
| `property?` | *string* | -             |

**Returns:** *number*

Absolute difference between the max and min of an array

___

### calcHistogram

▸ **calcHistogram**(`array`: _any_[], `numberOfBins?`: _number_, `property?`: _string_): _number_[]

Calculates a histogram from array values

**`export`**

#### Parameters:

| Name           | Type     | Default value | Description |
| :------------- | :------- | :------------ | :---------- |
| `array`        | _any_[]  | -             | Input array |
| `numberOfBins` | _number_ | 4             | -           |
| `property?`    | _string_ | -             | -           |

**Returns:** _number_[]

The histogram

---

### calcMax

▸ **calcMax**(`array`: _any_[], `property?`: _string_): _number_

Gets the max value in an array

**`export`**

#### Parameters:

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `array`     | _any_[]  | Input array |
| `property?` | _string_ | -           |

**Returns:** _number_

The maximum value in the array

---

### calcMean

▸ **calcMean**(`array`: _any_[], `property?`: _string_): _number_ \| _undefined_

Gets the mean value for an array

**`export`**

#### Parameters:

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `array`     | _any_[]  | Input array |
| `property?` | _string_ | -           |

**Returns:** _number_ \| _undefined_

The mean value

---

### calcMedian

▸ **calcMedian**(`array`: _any_[], `property?`: _string_): _number_ \| _undefined_

Gets an array median

**`export`**

#### Parameters:

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `array`     | _any_[]  | Input array |
| `property?` | _string_ | -           |

**Returns:** _number_ \| _undefined_

The resulting median

---

### calcMin

▸ **calcMin**(`array`: _any_[], `property?`: _string_): _number_

Gets the min value in an array

**`export`**

#### Parameters:

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `array`     | _any_[]  | Input array |
| `property?` | _string_ | -           |

**Returns:** _number_

The minimum value in the array

---

### calcPercent

▸ **calcPercent**(`toCalc`: _number_, `total`: _number_): _number_

Calculates the percentage of a value, given a total

**`export`**

#### Parameters:

| Name     | Type     | Description                 |
| :------- | :------- | :-------------------------- |
| `toCalc` | _number_ | Number to get percentage of |
| `total`  | _number_ | Total                       |

**Returns:** _number_

Percentage of the total

---

### calcQuartiles

▸ **calcQuartiles**(`array`: _any_[], `property`: _string_): [*number*, *number*, *number*]

Gets the quartiles of an array

**`export`**

#### Parameters:

| Name       | Type     | Description        |
| :--------- | :------- | :----------------- |
| `array`    | _any_[]  | Input array        |
| `property` | _string_ | Property to map by |

**Returns:** [*number*, *number*, *number*]

The quartiles

---

### calcSum

▸ **calcSum**(`array`: _any_[], `property?`: _string_): _number_

Gets the sum of the values in an array

**`export`**

#### Parameters:

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `array`     | _any_[]  | Input array |
| `property?` | _string_ | -           |

**Returns:** _number_

The sum

---

### calcWeightedMean

▸ **calcWeightedMean**(`array`: _any_[], `valueProperty`: _string_, `weightProperty`: _string_): _number_

Gets the weighted mean for an array

**`export`**

#### Parameters:

| Name             | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `array`          | _any_[]  | Input array                |
| `valueProperty`  | _string_ | Property to use for value  |
| `weightProperty` | _string_ | Property to use for weight |

**Returns:** _number_

The weighted mean

---

### calcWeightedMedian

▸ **calcWeightedMedian**(`array`: _any_[], `valueProperty`: _string_, `weightProperty`: _string_): _number_

Gets an array weighted median

**`export`**

#### Parameters:

| Name             | Type     | Description                   |
| :--------------- | :------- | :---------------------------- |
| `array`          | _any_[]  | Input array                   |
| `valueProperty`  | _string_ | The property to use as value  |
| `weightProperty` | _string_ | The property to use as weight |

**Returns:** _number_

The resulting median

---

### ruleOfThree

▸ **ruleOfThree**(`ifThis`: _number_, `isThis`: _number_, `thenThat`: _number_): _number_

Performs a simple rule of three

**`export`**

#### Parameters:

| Name       | Type     | Description  |
| :--------- | :------- | :----------- |
| `ifThis`   | _number_ | First param  |
| `isThis`   | _number_ | First result |
| `thenThat` | _number_ | Second param |

**Returns:** _number_

Second result
