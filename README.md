<a name="MathFunctions"></a>

## MathFunctions

**Kind**: global class

- [MathFunctions](#MathFunctions)
  - [new MathFunctions()](#new_MathFunctions_new)
  - [.calcMax(array, [property])](#MathFunctions.calcMax) ⇒ <code>Number</code>
  - [.calcSum(array, [property])](#MathFunctions.calcSum) ⇒ <code>Number</code>
  - [.calcMin(array, [property])](#MathFunctions.calcMin) ⇒ <code>Number</code>
  - [.calcDomain(array, [property])](#MathFunctions.calcDomain) ⇒ <code>Array.&lt;number&gt;</code>
  - [.calcMedian(array, [property])](#MathFunctions.calcMedian) ⇒ <code>number</code>
  - [.calcMean(array, [property])](#MathFunctions.calcMean) ⇒ <code>Number</code>
  - [.calcWeightedMean(array, valueProperty, weightProperty)](#MathFunctions.calcWeightedMean) ⇒ <code>number</code>
  - [.calcPercent(toCalc, total)](#MathFunctions.calcPercent) ⇒ <code>Number</code>
  - [.calcDistribution(array, [numOfBins])](#MathFunctions.calcDistribution) ⇒ <code>object</code>
  - [.calcQuartiles(array, [property])](#MathFunctions.calcQuartiles) ⇒ <code>Array.&lt;number&gt;</code>
  - [.calcHistogram(array, [numberOfBins], [property])](#MathFunctions.calcHistogram) ⇒ <code>Array.&lt;number&gt;</code>
  - [.ruleOfThree(ifThis, isThis, thenThat)](#MathFunctions.ruleOfThree) ⇒ <code>number</code>

<a name="new_MathFunctions_new"></a>

### new MathFunctions()

MathFunctions class
Compendium of math-related functions

<a name="MathFunctions.calcMax"></a>

### MathFunctions.calcMax(array, [property]) ⇒ <code>Number</code>

Returns array max value

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>Number</code> - Max array value

| Param      | Type                | Default           | Description                |
| ---------- | ------------------- | ----------------- | -------------------------- |
| array      | <code>Array</code>  |                   | Array to find max value of |
| [property] | <code>string</code> | <code>null</code> | Property name to iterate   |

<a name="MathFunctions.calcSum"></a>

### MathFunctions.calcSum(array, [property]) ⇒ <code>Number</code>

Returns the sum of an array

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>Number</code> - Sum of array values

| Param      | Type                | Default           | Description              |
| ---------- | ------------------- | ----------------- | ------------------------ |
| array      | <code>Array</code>  |                   | Array to find sum of     |
| [property] | <code>string</code> | <code>null</code> | Property name to iterate |

<a name="MathFunctions.calcMin"></a>

### MathFunctions.calcMin(array, [property]) ⇒ <code>Number</code>

Returns min value in array

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>Number</code> - Min array value

| Param      | Type                | Default           | Description                |
| ---------- | ------------------- | ----------------- | -------------------------- |
| array      | <code>Array</code>  |                   | Array to find min value of |
| [property] | <code>string</code> | <code>null</code> | Property name to iterate   |

<a name="MathFunctions.calcDomain"></a>

### MathFunctions.calcDomain(array, [property]) ⇒ <code>Array.&lt;number&gt;</code>

Returns min and max values in array

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>Array.&lt;number&gt;</code> - Min and max values in array

| Param      | Type                                                                   | Default           | Description              |
| ---------- | ---------------------------------------------------------------------- | ----------------- | ------------------------ |
| array      | <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> |                   | Array to calc domain of  |
| [property] | <code>string</code>                                                    | <code>null</code> | Property name to iterate |

<a name="MathFunctions.calcMedian"></a>

### MathFunctions.calcMedian(array, [property]) ⇒ <code>number</code>

Returns median value of array

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>number</code> - Median of an array

| Param      | Type                | Default           | Description              |
| ---------- | ------------------- | ----------------- | ------------------------ |
| array      | <code>Array</code>  |                   | Array to find median of  |
| [property] | <code>string</code> | <code>null</code> | Property name to iterate |

<a name="MathFunctions.calcMean"></a>

### MathFunctions.calcMean(array, [property]) ⇒ <code>Number</code>

Returns mean value of array

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>Number</code> - Mean of an array

| Param      | Type                | Default           | Description              |
| ---------- | ------------------- | ----------------- | ------------------------ |
| array      | <code>Array</code>  |                   | Array to find mean of    |
| [property] | <code>string</code> | <code>null</code> | Property name to iterate |

<a name="MathFunctions.calcWeightedMean"></a>

### MathFunctions.calcWeightedMean(array, valueProperty, weightProperty) ⇒ <code>number</code>

Returns weighted mean of array

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>number</code> - Weighted mean

| Param          | Type                              | Description                           |
| -------------- | --------------------------------- | ------------------------------------- |
| array          | <code>Array.&lt;object&gt;</code> | Array to find weighted mean of        |
| valueProperty  | <code>string</code>               | Property to use for array item value  |
| weightProperty | <code>string</code>               | Property to use for array item weight |

<a name="MathFunctions.calcPercent"></a>

### MathFunctions.calcPercent(toCalc, total) ⇒ <code>Number</code>

Calculate percentage using rule of three

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>Number</code> - Percentage

| Param  | Type                | Description               |
| ------ | ------------------- | ------------------------- |
| toCalc | <code>Number</code> | Number to find percent of |
| total  | <code>Number</code> | Total                     |

<a name="MathFunctions.calcDistribution"></a>

### MathFunctions.calcDistribution(array, [numOfBins]) ⇒ <code>object</code>

Gets array distribution

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>object</code> - Distribution of the array's values

| Param       | Type                                                                   | Description                      |
| ----------- | ---------------------------------------------------------------------- | -------------------------------- |
| array       | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> | Array to find distribution of    |
| [numOfBins] | <code>number</code>                                                    | Number of bins to use (optional) |

<a name="MathFunctions.calcQuartiles"></a>

### MathFunctions.calcQuartiles(array, [property]) ⇒ <code>Array.&lt;number&gt;</code>

Calcs quartiles of data array

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>Array.&lt;number&gt;</code> - [min, mean, max] quartiles

| Param      | Type                           | Description                                                                         |
| ---------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| array      | <code>Array.&lt;any&gt;</code> | Array to find quartiles of                                                          |
| [property] | <code>string</code>            | Property to access in object arrays. Supports nested properties (ex: 'propA.propB') |

<a name="MathFunctions.calcHistogram"></a>

### MathFunctions.calcHistogram(array, [numberOfBins], [property]) ⇒ <code>Array.&lt;number&gt;</code>

Calcs histogram from data array

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>Array.&lt;number&gt;</code> - Distribution data array

| Param          | Type                           | Default        | Description                                                                         |
| -------------- | ------------------------------ | -------------- | ----------------------------------------------------------------------------------- |
| array          | <code>Array.&lt;any&gt;</code> |                | Array to get histogram from                                                         |
| [numberOfBins] | <code>number</code>            | <code>4</code> | Number of bins to distribute data                                                   |
| [property]     | <code>string</code>            |                | Property to access in object arrays. Supports nested properties (ex: 'propA.propB') |

<a name="MathFunctions.ruleOfThree"></a>

### MathFunctions.ruleOfThree(ifThis, isThis, thenThat) ⇒ <code>number</code>

Performs a rule of three calculation

**Kind**: static method of [<code>MathFunctions</code>](#MathFunctions)  
**Returns**: <code>number</code> - The result of the rule of three

| Param    | Type                | Description    |
| -------- | ------------------- | -------------- |
| ifThis   | <code>number</code> | First premise  |
| isThis   | <code>number</code> | First result   |
| thenThat | <code>number</code> | Second premise |
