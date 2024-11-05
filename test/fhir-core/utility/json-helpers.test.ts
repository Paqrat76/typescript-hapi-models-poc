/*
 * Copyright (c) 2024. Joe Paquette
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { AssertionError } from 'node:assert';
import { isEmpty as _isEmpty } from 'lodash';
import {
  Object,
  isNull,
  asNull,
  isBoolean,
  asBoolean,
  isNumber,
  asNumber,
  isString,
  asString,
  isObject,
  asObject,
  isArray,
  asArray,
  safeParse,
  safeStringify,
} from '@src/fhir-core/utility/json-helpers';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import {
  Extension,
  PrimitiveType,
  setPolymorphicValueJson,
  setFhirExtensionJson,
  setFhirPrimitiveJson,
  setFhirPrimitiveListJson,
  setFhirComplexJson,
  setFhirComplexListJson,
  setFhirBackboneElementJson,
  setFhirBackboneElementListJson,
  setFhirBackboneTypeJson,
  setFhirBackboneTypeListJson,
} from '@src/fhir-core/base-models/core-fhir-models';
import { setFhirResourceJson, setFhirResourceListJson } from '@src/fhir-core/base-models/Resource';
import { fhirString } from '@src/fhir-core/data-types/primitive/primitive-types';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { MockComplexDataType, MockFhirModel, MockTask, MockBackboneElement, MockBackboneType } from '../../test-utils';

describe('json-helpers', () => {
  const PRIMITIVE_DATA_TYPE_BOOLEAN_TRUE: BooleanType = new BooleanType(true);
  const PRIMITIVE_DATA_TYPE_BOOLEAN_FALSE: BooleanType = new BooleanType(false);
  const PRIMITIVE_DATA_TYPE_NUMBER: IntegerType = new IntegerType(1976);
  const PRIMITIVE_DATA_TYPE_STRING: StringType = new StringType('testString');
  const PRIMITIVE_DATA_TYPE_STRING_EXT: StringType = new StringType('testStringExt');
  PRIMITIVE_DATA_TYPE_STRING_EXT.setId('id1357');
  PRIMITIVE_DATA_TYPE_STRING_EXT.addExtension(new Extension('extUrl1P', new StringType('ext string 1P')));
  PRIMITIVE_DATA_TYPE_STRING_EXT.addExtension(new Extension('extUrl2P', new StringType('ext string 2P')));
  const COMPLEX_DATA_TYPE: Period = new Period();
  COMPLEX_DATA_TYPE.setStart(`2017-03-15T08:00:00.000Z`);
  COMPLEX_DATA_TYPE.setEnd(`2017-03-15T17:00:00.000Z`);
  const COMPLEX_DATA_TYPE_EXT: Period = new Period();
  COMPLEX_DATA_TYPE_EXT.setStart(`2017-03-15T08:00:00.000Z`);
  COMPLEX_DATA_TYPE_EXT.setEnd(`2017-03-15T17:00:00.000Z`);
  COMPLEX_DATA_TYPE_EXT.setId('id2468');
  COMPLEX_DATA_TYPE_EXT.addExtension(new Extension('extUrl1C', new StringType('ext string 1C')));
  COMPLEX_DATA_TYPE_EXT.addExtension(new Extension('extUrl2C', new StringType('ext string 2C')));

  describe('General JSON Utilities', () => {
    it('should return expected values for isNull()', () => {
      expect(isNull(null)).toBe(true);
      expect(isNull('null')).toBe(false);
    });

    it('should return expected values for asNull()', () => {
      expect(asNull(null)).toBeNull();

      let t = () => {
        asNull('null');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not null.`);

      t = () => {
        // @ts-expect-error: allow for testing
        asNull(undefined);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not null.`);

      t = () => {
        asNull('null', 'Test value');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Test value is not null.`);
    });

    it('should return expected values for isBoolean()', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean('notBoolean')).toBe(false);
    });

    it('should return expected values for asBoolean()', () => {
      expect(asBoolean(true)).toBe(true);
      expect(asBoolean(false)).toBe(false);
      expect(asBoolean(Boolean('true'))).toBe(true);
      expect(asBoolean(Boolean(''))).toBe(false);

      let t = () => {
        asBoolean('notBoolean');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not a boolean.`);

      t = () => {
        // @ts-expect-error: allow for testing
        asBoolean(undefined);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not a boolean.`);

      t = () => {
        asBoolean('notBoolean', 'Test value');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Test value is not a boolean.`);
    });

    it('should return expected values for isNumber()', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(-123)).toBe(true);
      expect(isNumber(123.456)).toBe(true);
      expect(isNumber('notNumber')).toBe(false);
    });

    it('should return expected values for asNumber()', () => {
      expect(asNumber(123)).toStrictEqual(123);
      expect(asNumber(-123)).toStrictEqual(-123);
      expect(asNumber(123.456)).toStrictEqual(123.456);

      let t = () => {
        asNumber('notNumber');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not a number.`);

      t = () => {
        // @ts-expect-error: allow for testing
        asNumber(undefined);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not a number.`);

      t = () => {
        asNumber('notNumber', 'Test value');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Test value is not a number.`);
    });

    it('should return expected values for isString()', () => {
      expect(isString('test string')).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
    });

    it('should return expected values for asString()', () => {
      expect(asString('test string')).toStrictEqual('test string');

      let t = () => {
        asString(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not a string.`);

      t = () => {
        // @ts-expect-error: allow for testing
        asString(undefined);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not a string.`);

      t = () => {
        asString(123, 'Test value');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Test value is not a string.`);
    });

    it('should return expected values for isObject()', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ prop: 'value' })).toBe(true);
      expect(isObject({ prop: 'value' })).toBe(true);
      expect(isObject([])).toBe(false);
      expect(isObject([1, 2])).toBe(false);
      expect(isObject(Number(123))).toBe(false);
      expect(isObject(String('123'))).toBe(false);
      expect(isObject('string value')).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(null)).toBe(false);
    });

    it('should return expected values for asObject()', () => {
      expect(asObject({})).toEqual({});
      expect(asObject({ prop: 'value' })).toEqual({ prop: 'value' });
      expect(asObject({ prop: 'value' })).toEqual({ prop: 'value' });

      let t = () => {
        asObject(null);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not a JSON object.`);

      t = () => {
        // @ts-expect-error: allow for testing
        asObject(undefined);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not a JSON object.`);

      t = () => {
        asObject(123, 'Test value');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Test value is not a JSON object.`);
    });

    it('should return expected values for isArray()', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2])).toBe(true);
      expect(isArray(['A', 'B'])).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-array-constructor
      expect(isArray(Array())).toBe(true);
      expect(isArray(Array.from('abcdef'))).toBe(true);
      expect(isArray({})).toBe(false);
      expect(isArray({ prop: 'value' })).toBe(false);
      expect(isArray('string value')).toBe(false);
      expect(isArray(123)).toBe(false);
      expect(isArray(null)).toBe(false);
    });

    it('should return expected values for asArray()', () => {
      expect(asArray([])).toStrictEqual([]);
      expect(asArray([1, 2])).toStrictEqual([1, 2]);
      expect(asArray(['A', 'B'])).toStrictEqual(['A', 'B']);
      // eslint-disable-next-line @typescript-eslint/no-array-constructor
      expect(asArray(Array())).toStrictEqual([]);
      expect(asArray(Array.from('abcdef'))).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);

      let t = () => {
        asArray(null);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not a JSON array.`);

      t = () => {
        // @ts-expect-error: allow for testing
        asArray(undefined);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Is not a JSON array.`);

      t = () => {
        asArray(123, 'Test value');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Test value is not a JSON array.`);
    });

    it('should return expected results for valid arguments for safeParse()', () => {
      expect(safeParse(`"stringValue"`)).toStrictEqual('stringValue');
      expect(safeParse(`123`)).toStrictEqual(123);
      expect(safeParse(`true`)).toStrictEqual(true);
      expect(safeParse(`false`)).toStrictEqual(false);
      expect(safeParse(`null`)).toStrictEqual(null);
      expect(safeParse(`{ "prop": "propValue" }`)).toEqual({ prop: 'propValue' });
      expect(safeParse(`[ 1, "a" ]`)).toStrictEqual([1, 'a']);
      expect(safeParse(`{ "prop": "propValue", "arr": [1, "a"] }`)).toEqual({ prop: 'propValue', arr: [1, 'a'] });
    });

    it('should throw SyntaxError for invalid single quotes for strings for safeParse()', () => {
      let t = () => {
        // strings must be wrapped in double quotes
        safeParse(`'stringValue'`);
      };
      expect(t).toThrow(SyntaxError);
      expect(t).toThrow(`Unexpected token ''', "'stringValue'" is not valid JSON`);

      t = () => {
        // object keys must be wrapped in double quotes
        safeParse(`{ prop: 'propValue' }`);
      };
      expect(t).toThrow(SyntaxError);
      expect(t).toThrow(`Expected property name or '}' in JSON at position 2`);

      t = () => {
        // strings must be wrapped in double quotes
        safeParse(`{ "prop": 'propValue' }`);
      };
      expect(t).toThrow(SyntaxError);
      expect(t).toThrow(`Unexpected token ''', ..."{ "prop": 'propValue"... is not valid JSON`);
    });

    it('should return expected results for valid arguments for safeStringify()', () => {
      // NOTE: JSON.stringify() returns object keys and string values wrapped in double quotes
      // and no whitespace in objects and arrays
      expect(safeStringify('stringValue')).toStrictEqual(`"stringValue"`);
      expect(safeStringify(123)).toStrictEqual('123');
      expect(safeStringify(true)).toStrictEqual('true');
      expect(safeStringify(false)).toStrictEqual('false');
      expect(safeStringify(null)).toStrictEqual('null');
      expect(safeStringify({ prop: 'propValue' })).toStrictEqual(`{"prop":"propValue"}`);
      expect(safeStringify({ prop: 'propValue' })).toStrictEqual(`{"prop":"propValue"}`);
      expect(safeStringify({ prop: 'propValue' })).toStrictEqual(`{"prop":"propValue"}`);
      expect(safeStringify([1, 'a'])).toStrictEqual(`[1,"a"]`);
      expect(safeStringify({ prop: 'propValue', arr: [1, 'a'] })).toStrictEqual(`{"prop":"propValue","arr":[1,"a"]}`);
    });
  });

  describe('FHIR related JSON Utilities', () => {
    // Due to TypeScript circular references, these functions are in various modules.

    it('should set expected JSON values in setPolymorphicValueJson()', () => {
      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setPolymorphicValueJson(new StringType(), jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = { valueBoolean: true } as Object;
      setPolymorphicValueJson(PRIMITIVE_DATA_TYPE_BOOLEAN_TRUE, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = { valueBoolean: false } as Object;
      setPolymorphicValueJson(PRIMITIVE_DATA_TYPE_BOOLEAN_FALSE, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = { valueInteger: 1976 } as Object;
      setPolymorphicValueJson(PRIMITIVE_DATA_TYPE_NUMBER, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = { valueString: 'testString' } as Object;
      setPolymorphicValueJson(PRIMITIVE_DATA_TYPE_STRING, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {} as Object;
      setPolymorphicValueJson(new Period(), jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = { valuePeriod: { start: '2017-03-15T08:00:00.000Z', end: '2017-03-15T17:00:00.000Z' } } as Object;
      setPolymorphicValueJson(COMPLEX_DATA_TYPE, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      // MockComplexDataType returns undefined for toJSON()
      jsonObj = {} as Object;
      expectedJson = {} as Object;
      setPolymorphicValueJson(new MockComplexDataType('testValue'), jsonObj);
      expect(jsonObj).toStrictEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setPolymorphicValueJson', () => {
      const jsonObj = {} as Object;
      const testDataType = new StringType('test string');
      const testNonDataType = new MockFhirModel();

      let t = () => {
        // @ts-expect-error: allow null for testing
        setPolymorphicValueJson(null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided value is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setPolymorphicValueJson(undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided value is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setPolymorphicValueJson(testDataType, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setPolymorphicValueJson(testDataType, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setPolymorphicValueJson(testNonDataType, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided value is not an instance of DataType`);
    });

    it('should set expected JSON values in setFhirExtensionJson()', () => {
      const testExtension1 = new Extension('testUrl1', new StringType('test string 1'));
      const testExtension2 = new Extension('testUrl2', new StringType('test string 2'));
      const expected1 = { extension: [{ url: 'testUrl1', valueString: 'test string 1' }] };
      const expected2 = {
        extension: [
          { url: 'testUrl1', valueString: 'test string 1' },
          { url: 'testUrl2', valueString: 'test string 2' },
        ],
      };

      let jsonObj = {} as Object;
      setFhirExtensionJson([], jsonObj);
      expect(jsonObj).toEqual({} as Object);

      jsonObj = {} as Object;
      setFhirExtensionJson([testExtension1], jsonObj);
      expect(jsonObj).toEqual(expected1);

      jsonObj = {} as Object;
      setFhirExtensionJson([testExtension1, testExtension2], jsonObj);
      expect(jsonObj).toEqual(expected2);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirExtensionJson', () => {
      const jsonObj = {} as Object;
      const testExtension = new Extension('testUrl', PRIMITIVE_DATA_TYPE_STRING);

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirExtensionJson(null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided extensions is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirExtensionJson(undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided extensions is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirExtensionJson([testExtension], null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirExtensionJson([testExtension], undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirExtensionJson([new Period()], jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided item in extensions is not an instance of Extension`);
    });

    it('should set expected JSON values in setFhirPrimitiveJson()', () => {
      const propName = 'testProp';

      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setFhirPrimitiveJson(new StringType(), propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = { testProp: 'testString' } as Object;
      setFhirPrimitiveJson(PRIMITIVE_DATA_TYPE_STRING, propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: 'testStringExt',
        _testProp: {
          id: 'id1357',
          extension: [
            {
              url: 'extUrl1P',
              valueString: 'ext string 1P',
            },
            {
              url: 'extUrl2P',
              valueString: 'ext string 2P',
            },
          ],
        },
      } as Object;
      setFhirPrimitiveJson(PRIMITIVE_DATA_TYPE_STRING_EXT, propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {} as Object;
      setFhirPrimitiveJson(new MockPrimitiveDataType<fhirString>('testString'), propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirPrimitiveJson', () => {
      const jsonObj = {} as Object;
      const propName = 'testProp';

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirPrimitiveJson(null, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided ptElement is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirPrimitiveJson(undefined, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided ptElement is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirPrimitiveJson(PRIMITIVE_DATA_TYPE_STRING, null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirPrimitiveJson(PRIMITIVE_DATA_TYPE_STRING, undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        setFhirPrimitiveJson(PRIMITIVE_DATA_TYPE_STRING, '', jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirPrimitiveJson(PRIMITIVE_DATA_TYPE_STRING, propName, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirPrimitiveJson(PRIMITIVE_DATA_TYPE_STRING, propName, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirPrimitiveJson(COMPLEX_DATA_TYPE, propName, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided ptElement is not an instance of PrimitiveType`);
    });

    it('should set expected JSON values in setFhirPrimitiveListJson()', () => {
      const propName = 'testProp';

      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setFhirPrimitiveListJson([], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {} as Object;
      setFhirPrimitiveListJson([new StringType()], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = { testProp: ['testString'] } as Object;
      setFhirPrimitiveListJson([PRIMITIVE_DATA_TYPE_STRING], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {} as Object;
      setFhirPrimitiveListJson([new MockPrimitiveDataType<fhirString>('testString')], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: ['testStringExt'],
        _testProp: [
          {
            id: 'id1357',
            extension: [
              {
                url: 'extUrl1P',
                valueString: 'ext string 1P',
              },
              {
                url: 'extUrl2P',
                valueString: 'ext string 2P',
              },
            ],
          },
        ],
      } as Object;
      setFhirPrimitiveListJson([PRIMITIVE_DATA_TYPE_STRING_EXT], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: ['testString', 'testStringExt'],
        _testProp: [
          null,
          {
            id: 'id1357',
            extension: [
              {
                url: 'extUrl1P',
                valueString: 'ext string 1P',
              },
              {
                url: 'extUrl2P',
                valueString: 'ext string 2P',
              },
            ],
          },
        ],
      } as Object;
      setFhirPrimitiveListJson([PRIMITIVE_DATA_TYPE_STRING, PRIMITIVE_DATA_TYPE_STRING_EXT], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirPrimitiveListJson', () => {
      const jsonObj = {} as Object;
      const propName = 'testProp';

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirPrimitiveListJson(null, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided ptElements is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirPrimitiveListJson(undefined, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided ptElements is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirPrimitiveListJson([PRIMITIVE_DATA_TYPE_STRING], null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirPrimitiveListJson([PRIMITIVE_DATA_TYPE_STRING], undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        setFhirPrimitiveListJson([PRIMITIVE_DATA_TYPE_STRING], '', jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirPrimitiveListJson([PRIMITIVE_DATA_TYPE_STRING], propName, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirPrimitiveListJson([PRIMITIVE_DATA_TYPE_STRING], propName, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirPrimitiveListJson([COMPLEX_DATA_TYPE], propName, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided item in ptElements is not an instance of PrimitiveType`);
    });

    it('should set expected JSON values in setFhirComplexJson()', () => {
      const propName = 'testProp';

      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setFhirComplexJson(new Period(), propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: {
          start: '2017-03-15T08:00:00.000Z',
          end: '2017-03-15T17:00:00.000Z',
        },
      } as Object;
      setFhirComplexJson(COMPLEX_DATA_TYPE, propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: {
          id: 'id2468',
          extension: [
            {
              url: 'extUrl1C',
              valueString: 'ext string 1C',
            },
            {
              url: 'extUrl2C',
              valueString: 'ext string 2C',
            },
          ],
          start: '2017-03-15T08:00:00.000Z',
          end: '2017-03-15T17:00:00.000Z',
        },
      } as Object;
      setFhirComplexJson(COMPLEX_DATA_TYPE_EXT, propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirComplexJson', () => {
      const jsonObj = {} as Object;
      const propName = 'testProp';

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirComplexJson(null, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided cElement is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirComplexJson(undefined, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided cElement is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirComplexJson(COMPLEX_DATA_TYPE, null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirComplexJson(COMPLEX_DATA_TYPE, undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        setFhirComplexJson(COMPLEX_DATA_TYPE, '', jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirComplexJson(COMPLEX_DATA_TYPE, propName, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirComplexJson(COMPLEX_DATA_TYPE, propName, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      const testNonDataType = new MockFhirModel();
      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirComplexJson(testNonDataType, propName, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided cElement is not an instance of DataType`);
    });

    it('should set expected JSON values in setFhirComplexListJson()', () => {
      const propName = 'testProp';

      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setFhirComplexListJson([], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {} as Object;
      setFhirComplexListJson([new Period()], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: [
          {
            start: '2017-03-15T08:00:00.000Z',
            end: '2017-03-15T17:00:00.000Z',
          },
        ],
      } as Object;
      setFhirComplexListJson([COMPLEX_DATA_TYPE], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: [
          {
            id: 'id2468',
            extension: [
              {
                url: 'extUrl1C',
                valueString: 'ext string 1C',
              },
              {
                url: 'extUrl2C',
                valueString: 'ext string 2C',
              },
            ],
            start: '2017-03-15T08:00:00.000Z',
            end: '2017-03-15T17:00:00.000Z',
          },
        ],
      } as Object;
      setFhirComplexListJson([COMPLEX_DATA_TYPE_EXT], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: [
          {
            start: '2017-03-15T08:00:00.000Z',
            end: '2017-03-15T17:00:00.000Z',
          },
          {
            id: 'id2468',
            extension: [
              {
                url: 'extUrl1C',
                valueString: 'ext string 1C',
              },
              {
                url: 'extUrl2C',
                valueString: 'ext string 2C',
              },
            ],
            start: '2017-03-15T08:00:00.000Z',
            end: '2017-03-15T17:00:00.000Z',
          },
        ],
      } as Object;
      setFhirComplexListJson([COMPLEX_DATA_TYPE, COMPLEX_DATA_TYPE_EXT], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirComplexListJson', () => {
      const jsonObj = {} as Object;
      const propName = 'testProp';

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirComplexListJson(null, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided cElements is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirComplexListJson(undefined, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided cElements is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirComplexListJson([COMPLEX_DATA_TYPE], null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirComplexListJson([COMPLEX_DATA_TYPE], undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        setFhirComplexListJson([COMPLEX_DATA_TYPE], '', jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirComplexListJson([COMPLEX_DATA_TYPE], propName, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirComplexListJson([COMPLEX_DATA_TYPE], propName, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      const testNonDataType = new MockFhirModel();
      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirComplexListJson([testNonDataType], propName, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided item in cElements is not an instance of DataType`);
    });

    it('should set expected JSON values in setFhirBackboneElementJson()', () => {
      const propName = 'testProp';

      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setFhirBackboneElementJson(new MockBackboneElement(), propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: {
          modifierExtension: [
            {
              url: 'testUrl',
            },
          ],
        },
      } as Object;
      setFhirBackboneElementJson(new MockBackboneElement([new Extension('testUrl')]), propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: {
          modifierExtension: [
            {
              url: 'testUrl',
              valueString: 'testString',
            },
          ],
        },
      } as Object;
      setFhirBackboneElementJson(
        new MockBackboneElement([new Extension('testUrl', new StringType('testString'))]),
        propName,
        jsonObj,
      );
      expect(jsonObj).toEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirBackboneElementJson', () => {
      const jsonObj = {} as Object;
      const propName = 'testProp';

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneElementJson(null, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided bElement is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneElementJson(undefined, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided bElement is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneElementJson(new MockBackboneElement(), null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneElementJson(new MockBackboneElement(), undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        setFhirBackboneElementJson(new MockBackboneElement(), '', jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneElementJson(new MockBackboneElement(), propName, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneElementJson(new MockBackboneElement(), propName, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      const testNonDataType = new MockFhirModel();
      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneElementJson(testNonDataType, propName, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided bElement is not an instance of BackboneElement`);
    });

    it('should set expected JSON values in setFhirBackboneElementListJson()', () => {
      const propName = 'testProp';

      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setFhirBackboneElementListJson([new MockBackboneElement()], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: [
          {
            modifierExtension: [
              {
                url: 'testUrl',
              },
            ],
          },
        ],
      } as Object;
      setFhirBackboneElementListJson([new MockBackboneElement([new Extension('testUrl')])], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: [
          {
            modifierExtension: [
              {
                url: 'testUrl',
                valueString: 'testString',
              },
            ],
          },
        ],
      } as Object;
      setFhirBackboneElementListJson(
        [new MockBackboneElement([new Extension('testUrl', new StringType('testString'))])],
        propName,
        jsonObj,
      );
      expect(jsonObj).toEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirBackboneElementListJson', () => {
      const jsonObj = {} as Object;
      const propName = 'testProp';

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneElementListJson(null, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided bElements is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneElementListJson(undefined, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided bElements is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneElementListJson([new MockBackboneElement()], null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneElementListJson([new MockBackboneElement()], undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        setFhirBackboneElementListJson([new MockBackboneElement()], '', jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneElementListJson([new MockBackboneElement()], propName, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneElementListJson([new MockBackboneElement()], propName, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      const testNonDataType = new MockFhirModel();
      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneElementListJson([testNonDataType], propName, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided bElement is not an instance of BackboneElement`);
    });

    it('should set expected JSON values in setFhirBackboneTypeJson()', () => {
      const propName = 'testProp';

      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setFhirBackboneTypeJson(new MockBackboneType(), propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: {
          modifierExtension: [
            {
              url: 'testUrl',
            },
          ],
        },
      } as Object;
      setFhirBackboneTypeJson(new MockBackboneType([new Extension('testUrl')]), propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: {
          modifierExtension: [
            {
              url: 'testUrl',
              valueString: 'testString',
            },
          ],
        },
      } as Object;
      setFhirBackboneTypeJson(
        new MockBackboneType([new Extension('testUrl', new StringType('testString'))]),
        propName,
        jsonObj,
      );
      expect(jsonObj).toEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirBackboneTypeJson', () => {
      const jsonObj = {} as Object;
      const propName = 'testProp';

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneTypeJson(null, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided bType is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneTypeJson(undefined, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided bType is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneTypeJson(new MockBackboneType(), null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneTypeJson(new MockBackboneType(), undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        setFhirBackboneTypeJson(new MockBackboneType(), '', jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneTypeJson(new MockBackboneType(), propName, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneTypeJson(new MockBackboneType(), propName, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      const testNonDataType = new MockFhirModel();
      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneTypeJson(testNonDataType, propName, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided bType is not an instance of BackboneType`);
    });

    it('should set expected JSON values in setFhirBackboneTypeListJson()', () => {
      const propName = 'testProp';

      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setFhirBackboneTypeListJson([new MockBackboneType()], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: [
          {
            modifierExtension: [
              {
                url: 'testUrl',
              },
            ],
          },
        ],
      } as Object;
      setFhirBackboneTypeListJson([new MockBackboneType([new Extension('testUrl')])], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: [
          {
            modifierExtension: [
              {
                url: 'testUrl',
                valueString: 'testString',
              },
            ],
          },
        ],
      } as Object;
      setFhirBackboneTypeListJson(
        [new MockBackboneType([new Extension('testUrl', new StringType('testString'))])],
        propName,
        jsonObj,
      );
      expect(jsonObj).toEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirBackboneTypeListJson', () => {
      const jsonObj = {} as Object;
      const propName = 'testProp';

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneTypeListJson(null, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided bTypes is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneTypeListJson(undefined, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided bTypes is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneTypeListJson([new MockBackboneType()], null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneTypeListJson([new MockBackboneType()], undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        setFhirBackboneTypeListJson([new MockBackboneType()], '', jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirBackboneTypeListJson([new MockBackboneType()], propName, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneTypeListJson([new MockBackboneType()], propName, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      const testNonDataType = new MockFhirModel();
      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirBackboneTypeListJson([testNonDataType], propName, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided bType is not an instance of BackboneType`);
    });

    it('should set expected JSON values in setFhirResourceJson()', () => {
      const propName = 'testProp';
      const mockTask = new MockTask();
      expect(mockTask.toJSON()).toBeUndefined();

      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setFhirResourceJson(mockTask, propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: {
          resourceType: 'Task',
          mockPrimitive: 'testString',
        },
      } as Object;
      setFhirResourceJson(new MockTask(PRIMITIVE_DATA_TYPE_STRING), propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: {
          resourceType: 'Task',
          mockPrimitive: 'testString',
          mockComplex: {
            start: '2017-03-15T08:00:00.000Z',
            end: '2017-03-15T17:00:00.000Z',
          },
        },
      } as Object;
      setFhirResourceJson(new MockTask(PRIMITIVE_DATA_TYPE_STRING, COMPLEX_DATA_TYPE), propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: {
          resourceType: 'Task',
          mockPrimitive: 'testStringExt',
          _mockPrimitive: {
            id: 'id1357',
            extension: [
              {
                url: 'extUrl1P',
                valueString: 'ext string 1P',
              },
              {
                url: 'extUrl2P',
                valueString: 'ext string 2P',
              },
            ],
          },
          mockComplex: {
            id: 'id2468',
            extension: [
              {
                url: 'extUrl1C',
                valueString: 'ext string 1C',
              },
              {
                url: 'extUrl2C',
                valueString: 'ext string 2C',
              },
            ],
            start: '2017-03-15T08:00:00.000Z',
            end: '2017-03-15T17:00:00.000Z',
          },
        },
      } as Object;
      setFhirResourceJson(new MockTask(PRIMITIVE_DATA_TYPE_STRING_EXT, COMPLEX_DATA_TYPE_EXT), propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirResourceJson', () => {
      const jsonObj = {} as Object;
      const propName = 'testProp';

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirResourceJson(null, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided resource is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirResourceJson(undefined, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided resource is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirResourceJson(new MockTask(), null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirResourceJson(new MockTask(), undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        setFhirResourceJson(new MockTask(), '', jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirResourceJson(new MockTask(), propName, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirResourceJson(new MockTask(), propName, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      const testNonDataType = new MockFhirModel();
      t = () => {
        // @ts-expect-error: allow testNonDataType for testing
        setFhirResourceJson(testNonDataType, propName, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided resource is not an instance of Resource`);
    });

    it('should set expected JSON values in setFhirResourceListJson()', () => {
      const propName = 'testProp';
      const mockTask = new MockTask();
      expect(mockTask.toJSON()).toBeUndefined();

      let jsonObj = {} as Object;
      let expectedJson = {} as Object;
      setFhirResourceListJson([mockTask], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: [
          {
            resourceType: 'Task',
            mockPrimitive: 'testString',
          },
        ],
      } as Object;
      setFhirResourceListJson([new MockTask(PRIMITIVE_DATA_TYPE_STRING)], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: [
          {
            resourceType: 'Task',
            mockPrimitive: 'testString',
            mockComplex: {
              start: '2017-03-15T08:00:00.000Z',
              end: '2017-03-15T17:00:00.000Z',
            },
          },
        ],
      } as Object;
      setFhirResourceListJson([new MockTask(PRIMITIVE_DATA_TYPE_STRING, COMPLEX_DATA_TYPE)], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);

      jsonObj = {} as Object;
      expectedJson = {
        testProp: [
          {
            resourceType: 'Task',
            mockPrimitive: 'testStringExt',
            _mockPrimitive: {
              id: 'id1357',
              extension: [
                {
                  url: 'extUrl1P',
                  valueString: 'ext string 1P',
                },
                {
                  url: 'extUrl2P',
                  valueString: 'ext string 2P',
                },
              ],
            },
            mockComplex: {
              id: 'id2468',
              extension: [
                {
                  url: 'extUrl1C',
                  valueString: 'ext string 1C',
                },
                {
                  url: 'extUrl2C',
                  valueString: 'ext string 2C',
                },
              ],
              start: '2017-03-15T08:00:00.000Z',
              end: '2017-03-15T17:00:00.000Z',
            },
          },
        ],
      } as Object;
      setFhirResourceListJson([new MockTask(PRIMITIVE_DATA_TYPE_STRING_EXT, COMPLEX_DATA_TYPE_EXT)], propName, jsonObj);
      expect(jsonObj).toEqual(expectedJson);
    });

    it('should throw AssertionErrors for invalid arguments for setFhirResourceListJson', () => {
      const jsonObj = {} as Object;
      const propName = 'testProp';

      let t = () => {
        // @ts-expect-error: allow null for testing
        setFhirResourceListJson(null, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided resources is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirResourceListJson(undefined, propName, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided resources is undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirResourceListJson([new MockTask()], null, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirResourceListJson([new MockTask()], undefined, jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        setFhirResourceListJson([new MockTask()], '', jsonObj);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided propName is empty/undefined/null`);

      t = () => {
        // @ts-expect-error: allow null for testing
        setFhirResourceListJson([new MockTask()], propName, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      t = () => {
        // @ts-expect-error: allow undefined for testing
        setFhirResourceListJson([new MockTask()], propName, undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided jsonObj is undefined/null`);

      const testNonDataType = new MockFhirModel();
      t = () => {
        // @ts-expect-error: allow testNonDataType for testing
        setFhirResourceListJson([testNonDataType], propName, jsonObj);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided resource is not an instance of Resource`);
    });
  });
});

class MockPrimitiveDataType<fhirString> extends PrimitiveType<fhirString> {
  public mockValue: string | undefined = undefined;

  constructor(value?: string) {
    super();
    if (value) {
      this.mockValue = value;
    }
  }

  public override fhirType(): string {
    return 'MockPrimitiveDataType';
  }

  override isEmpty(): boolean {
    return _isEmpty(this.mockValue);
  }

  // NOT USED
  public encodeToString(value: fhirString): string {
    return String(value);
  }

  // NOT USED
  public parseToPrimitive(value: string): fhirString {
    return value as fhirString;
  }

  // NOT USED
  copy(): MockPrimitiveDataType<fhirString> {
    const dest = new MockPrimitiveDataType<fhirString>();
    this.copyValues(dest);
    return dest;
  }

  // Returns undefined for testing purposes
  override toJSON(): JSON.Value | undefined {
    return undefined;
  }
}
