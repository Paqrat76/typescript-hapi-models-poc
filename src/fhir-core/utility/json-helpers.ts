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

/*
 * Content includes portions copied/modified from ts-typed-json (https://github.com/dherman/ts-typed-json)
 *
 * Copyright (c) 2017 David Herman
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

/**
 * JSON Helpers
 *
 * @remarks
 * This module contains a set of type definitions and utilities for dealing with JSON data in a type-safe way with
 * TypeScript. The most important type definitions are JSON.Value, JSON.Object, and JSON.Array, which correspond
 * respectively to JSON values, objects, and arrays, as the names suggest.
 *
 * @privateRemarks
 * Due to TypeScript circular references, JSON FHIR helper functions are in core-fhir-models.ts.
 *
 * @module
 */

import {
  assertIsDefined,
  assertIsString,
  isBoolean,
  isDefined,
  isNumber,
  isString,
} from '@src/fhir-core/utility/type-guards';
import { isEmpty } from '@src/fhir-core/utility/common-util';

export { JsonObject as Object, JsonArray as Array };

/**
 * JSON data types, as returned by `JSON.parse()`.
 *
 * @category Utilities: JSON
 */
export type Value = null | boolean | number | string | JsonObject | JsonArray;

/**
 * JSON object values.
 *
 * @category Utilities: JSON
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface JsonObject extends Record<string, Value> {}

/**
 * JSON array values.
 *
 * @category Utilities: JSON
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface JsonArray extends Array<Value> {}

/**
 * Tests a JSON value to see if it is `null`.
 *
 * @param x - JSON Value
 * @returns true if null; false otherwise
 *
 * @category Utilities: JSON
 */
export function isNull(x: Value): x is null {
  return x === null;
}

/**
 * Cast a JSON value to `null`, throwing a `TypeError` if the cast fails.
 *
 * @param x - JSON value to cast
 * @param prefix - optional error message prefix
 * @returns null
 *
 * @category Utilities: JSON
 */
export function asNull(x: Value, prefix?: string): null {
  if (!isNull(x)) {
    throw new TypeError(msg(prefix, 'null'));
  }
  return null;
}

/**
 * Tests a JSON value to see if it is a boolean.
 *
 * @param x - JSON Value
 * @returns true if null; false otherwise
 *
 * @category Utilities: JSON
 */
export function isJsonBoolean(x: Value): x is boolean {
  return isBoolean(x);
}

/**
 * Cast a JSON value to `boolean`, throwing a `TypeError` if the cast fails.
 *
 * @param x - JSON value to cast
 * @param prefix - optional error message prefix
 * @returns boolean
 *
 * @category Utilities: JSON
 */
export function asBoolean(x: Value, prefix?: string): boolean {
  if (!isJsonBoolean(x)) {
    throw new TypeError(msg(prefix, 'a boolean'));
  }
  return x;
}

/**
 * Tests a JSON value to see if it is a number.
 *
 * @param x - JSON Value
 * @returns true if null; false otherwise
 *
 * @category Utilities: JSON
 */
export function isJsonNumber(x: Value): x is number {
  return isNumber(x);
}

/**
 * Cast a JSON value to `number`, throwing a `TypeError` if the cast fails.
 *
 * @param x - JSON value to cast
 * @param prefix - optional error message prefix
 * @returns boolean
 *
 * @category Utilities: JSON
 */
export function asNumber(x: Value, prefix?: string): number {
  if (!isJsonNumber(x)) {
    throw new TypeError(msg(prefix, 'a number'));
  }
  return x;
}

/**
 * Tests a JSON value to see if it is a string.
 *
 * @param x - JSON Value
 * @returns true if null; false otherwise
 *
 * @category Utilities: JSON
 */
export function isJsonString(x: Value): x is string {
  return isString(x);
}

/**
 * Cast a JSON value to `string`, throwing a `TypeError` if the cast fails.
 *
 * @param x - JSON value to cast
 * @param prefix - optional error message prefix
 * @returns boolean
 *
 * @category Utilities: JSON
 */
export function asString(x: Value, prefix?: string): string {
  if (!isJsonString(x)) {
    throw new TypeError(msg(prefix, 'a string'));
  }
  return x;
}

/**
 * Tests a JSON value to see if it is a JSON object.
 *
 * @param x - JSON Value
 * @returns true if null; false otherwise
 *
 * @category Utilities: JSON
 */
export function isJsonObject(x: Value): x is JsonObject {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}

/**
 * Cast a JSON value to `Object`, throwing a `TypeError` if the cast fails.
 *
 * @param x - JSON value to cast
 * @param prefix - optional error message prefix
 * @returns boolean
 *
 * @category Utilities: JSON
 */
export function asObject(x: Value, prefix?: string): JsonObject {
  if (!isJsonObject(x)) {
    throw new TypeError(msg(prefix, 'a JSON object'));
  }
  return x;
}

/**
 * Tests a JSON value to see if it is a JSON array.
 *
 * @param x - JSON Value
 * @returns true if array; false otherwise
 *
 * @category Utilities: JSON
 */
export function isJsonArray(x: Value): x is JsonArray {
  return Array.isArray(x);
}

/**
 * Cast a JSON value to `Array`, throwing a `TypeError` if the cast fails.
 *
 * @param x - JSON value to cast
 * @param prefix - optional error message prefix
 * @returns boolean
 *
 * @category Utilities: JSON
 */
export function asArray(x: Value, prefix?: string): JsonArray {
  if (!isJsonArray(x)) {
    throw new TypeError(msg(prefix, 'a JSON array'));
  }
  return x;
}

/**
 * A more safely typed version of `JSON.parse()`.
 *
 * @param source - JSON string value to parse
 * @returns parsed JSON Value
 *
 * @category Utilities: JSON
 */
export function safeParse(source: string): Value {
  assertIsDefined<string>(source, `Provided source is undefined/null`);
  assertIsString(source, `Provided source is not a string`);
  return JSON.parse(source) as Value;
}

/**
 * A more safely typed version of `JSON.stringify()`.
 *
 * @param value - JSON value to stringify
 * @returns stringified JSON value
 *
 * @category Utilities: JSON
 */
export function safeStringify(value: Value): string {
  return JSON.stringify(value);
}

/**
 * Tests a JSON value to determine if it contains data.
 *
 * @remarks
 * The FHIR specification provides requirements on how to represent FHIR data in JSON.
 * These requirements are stricter than the JSON specifications. For our purposes, the
 * following requirements must guide our implementations for how JSON values are handled:
 * - Objects are never empty (implies arrays are also never empty). If an element is
 *   present in the resource, it SHALL have properties as defined for its type, or 1 or
 *   more extensions.
 * - String property values can never be empty. Either the property is absent, or it is
 *   present with at least one character of content.
 * - The FHIR types `integer`, `unsignedInt`, `positiveInt` and `decimal` are represented
 *   as a JSON number, the FHIR type `boolean` as a JSON boolean, and all other types
 *   (including `integer64`) are represented as a JSON string which has the same content
 *   as that specified for the relevant datatype. Whitespace is always significant
 *   (i.e. no leading and trailing spaces for non-strings).
 *
 * @param x - JSON Value
 * @returns true if argument has actual data; false otherwise
 *
 * @see [JSON Representation of Resources](https://hl7.org/fhir/json.html)
 * @category Utilities: JSON
 */
export function hasFhirData(x: Value | undefined): boolean {
  return (
    isDefined<Value | undefined>(x) &&
    !((isJsonObject(x) && isEmpty(x)) || (isJsonArray(x) && isEmpty(x)) || (isJsonString(x) && isEmpty(x)))
  );
}

/**
 * Generates a cast error message
 *
 * @param prefix - optional error message prefix
 * @param expected - string describing the expected JSON type
 * @returns error message
 */
function msg(prefix: string | undefined, expected: string): string {
  return `${prefix ? prefix + ' is' : 'Is'} not ${expected}.`;
}
