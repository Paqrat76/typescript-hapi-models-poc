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

/**
 * Common non-FHIR related utilities
 *
 * @module
 */

import { assertIsDefined, assertIsString, isString } from '@src/fhir-core/utility/type-guards';

/**
 * Determines if provided string value is blank (whitespace, empty, `undefined`, `null`)
 *
 * @param value - value to be evaluated
 * @returns `true` if blank; otherwise `false`
 *
 * @category Utilities
 */
export function isBlank(value: string | undefined | null): boolean {
  return value === undefined || value === null || (isString(value) && value.trim().length === 0);
}

/**
 * Determines if provided string value is not blank (not whitespace, empty, `undefined`, `null`)
 *
 * @param value - value to be evaluated
 * @returns `true` if not blank; otherwise `false`
 *
 * @category Utilities
 */
export function isNonBlank(value: string | undefined | null): boolean {
  return !isBlank(value);
}

/**
 * Returns the provided value with the first character capitalized and remaining characters untouched
 *
 * @param value - string value to capitalize
 * @returns the provided value with the first letter capitalized
 *
 * @category Utilities
 */
export function upperFirst(value: string): string {
  assertIsDefined<string>(value, `Provided value is undefined/null`);
  assertIsString(value, `Provided value is not a string`);
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

/**
 * Returns the provided value with the first character un-capitalized and remaining characters untouched
 *
 * @param value - string value to un-capitalize
 * @returns the provided value with the first letter un-capitalized
 *
 * @category Utilities
 */
export function lowerFirst(value: string): string {
  assertIsDefined<string>(value, `Provided value is undefined/null`);
  assertIsString(value, `Provided value is not a string`);
  return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}

/**
 * Determines if the provided value is "empty"
 *
 * @remarks
 * Both `null` and `undefined` are considered "empty". Arrays and `string`s are empty if their `length`
 * property is 0. FHIR data models (data types or resources) have the `isEmpty()` method to determine
 * if they are empty. While rarely used in this library, `Map` and `Set` objects are empty is their
 * `size` property is 0. Object types are empty if `Object.keys(value).length === 0`. Other types such as
 * `number`, `boolean`, `BigInt`, etc. are never considered "empty" and will always return `false`.
 *
 * @param value - value to be evaluated
 * @returns `true` if `value` is empty, otherwise `false`
 *
 * @category Utilities
 */
export function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null) {
    return true;
  } else if (Array.isArray(value) || isString(value)) {
    return value.length === 0;
  } else if (typeof value === 'object' && 'isEmpty' in value && typeof value.isEmpty === 'function') {
    // FHIR data model (data type or resource)
    // To reduce circular reference with Base/IBase, use the above "if" construct rather than `value instanceof Base`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return value.isEmpty() as boolean;
  } else if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  } else if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  // Return false because other value types (e.g., number, boolean, BigInt, etc.)
  // do not have a concept of "empty", so by definition, they are never "empty".
  return false;
}
