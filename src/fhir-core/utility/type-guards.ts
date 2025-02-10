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
 * Common FHIR related TypeScript type guards and assertion functions
 *
 * @privateRemarks
 * All TypeScript type guards and type assertion functions should be included in this module.
 * However, due to TypeScript circular references, the following have been moved to the
 * indicated module:
 * - assertFhirResourceTypeJson() placed in Resource.ts
 * - assertFhirDataType() placed in core-fhir-models.ts
 * - assertFhirPrimitiveType() placed in core-fhir-models.ts
 * - assertEnumCodeType() placed in CodeType.ts
 * - assertFhirResourceTypeJson() placed in fhir-parsers.ts
 *
 * @module
 */

import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { AssertionError } from 'node:assert';

/**
 * Value type guard that determines if the provided value is defined (i.e., not `undefined` and not `null`)
 *
 * @typeParam T - the value type
 * @param value - value to be evaluated
 * @returns true if value is not `undefined` and not `null`; false otherwise
 *
 * @category Type Guards/Assertions
 */
export function isDefined<T>(value: T | undefined | null): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

/**
 * Assertion that the provided value is defined (i.e., not `undefined` and not `null`)
 *
 * @typeParam T - the value type
 * @param value - value to be evaluated
 * @param errorMessage - optional error message to override the default
 * @throws AssertionError when instance is either `undefined` or `null`
 *
 * @category Type Guards/Assertions
 */
export function assertIsDefined<T>(
  value: T | undefined | null,
  errorMessage?: string,
): asserts value is NonNullable<T> {
  if (!isDefined<T>(value)) {
    const errMsg = errorMessage ?? `Value is ${value === undefined ? 'undefined' : 'null'}.`;
    throw new AssertionError({ message: errMsg });
  }
}

/**
 * Generic type for non-empty arrays
 *
 * @typeParam T - the array type
 * @category Type Guards/Assertions
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Value type guard that determines if the provided arr is defined (i.e., not `undefined` and not `null`) and
 * is not an empty array
 *
 * @typeParam T - the array type
 * @param arr - array to be evaluated
 * @returns true if arr is not `undefined` and not `null` and not an empty array; false otherwise
 *
 * @category Type Guards/Assertions
 */
export function isDefinedList<T>(arr: T[] | undefined | null): arr is NonEmptyArray<T> {
  return isDefined(arr) && arr.length > 0;
}

/**
 * Assertion that the provided array is defined (i.e., not `undefined` and not `null` and not empty)
 *
 * @typeParam T - the value type
 * @param arr - array to be evaluated
 * @param errorMessage - optional error message to override the default
 * @throws AssertionError when instance is either `undefined` or `null` or an empty array
 *
 * @category Type Guards/Assertions
 */
export function assertIsDefinedList<T>(
  arr: T[] | undefined | null,
  errorMessage?: string,
): asserts arr is NonEmptyArray<T> {
  if (!isDefinedList(arr)) {
    const errMsg = errorMessage ?? `Array argument is not defined (i.e., undefined or null or an empty array.`;
    throw new AssertionError({ message: errMsg });
  }
}

/**
 * Generic type for TypeScript classes used by type assertion functions
 *
 * @typeParam T - the class type
 * @category Type Guards/Assertions
 * @see [A generic type for classes: Class<T>](https://exploringjs.com/tackling-ts/ch_classes-as-values.html#a-generic-type-for-classes-classt)
 * @see [TypeScript constructors and generic types](https://www.simonholywell.com/post/typescript-constructor-type/)
 */
// eslint-disable-next-line
export type Class<T> = { new (...args: any[]): T };

/**
 * FHIR class type guard for any FHIR class (PrimitiveTypes, complex Types, resources)
 *
 * @remarks
 * Because FHIR types may be undefined (for optional fields) or null (for required fields),
 * both `undefined` and `null` are considered valid FHIR types.
 *
 * @typeParam T - the FHIR class type
 * @param classInstance - class instance to evaluate
 * @param className - class name for evaluation
 * @returns true if classInstance is undefined or null or instanceof className; false otherwise
 *
 * @category Type Guards/Assertions
 */
export function FhirTypeGuard<T>(classInstance: unknown, className: Class<T>): classInstance is T {
  return classInstance === undefined || classInstance === null || classInstance instanceof className;
}

/**
 * FHIR type assertion for any FHIR class (PrimitiveTypes, complex Types, resources)
 *
 * @typeParam T - the FHIR class type
 * @param classInstance - class instance to evaluate
 * @param className - class name for evaluation
 * @param errorMessage - optional error message to override the default
 * @throws InvalidTypeError when FhirTypeGuard assertion is false
 *
 * @category Type Guards/Assertions
 */
export function assertFhirType<T>(
  classInstance: unknown,
  className: Class<T>,
  errorMessage?: string,
): asserts classInstance is T {
  if (!FhirTypeGuard(classInstance, className)) {
    const errMsg = errorMessage ?? `Provided instance is not an instance of ${className.name}.`;
    throw new InvalidTypeError(errMsg);
  }
}

/**
 * FHIR type assertion for a list of any FHIR class (PrimitiveTypes, complex Types, resources)
 *
 * @typeParam T - the FHIR class type
 * @param listInstance - array of class instances to evaluate
 * @param className - class name for evaluation
 * @param errorMessage - optional error message to override the default
 * @throws InvalidTypeError when FhirTypeGuard assertion is false
 *
 * @category Type Guards/Assertions
 */
export function assertFhirTypeList<T>(
  listInstance: unknown[] | undefined | null,
  className: Class<T>,
  errorMessage?: string,
): asserts listInstance is [T] {
  if (listInstance === undefined || listInstance === null || listInstance.length === 0) {
    return;
  }
  let invalidItemCount = 0;
  for (const classInstance of listInstance) {
    if (!FhirTypeGuard(classInstance, className)) {
      invalidItemCount++;
    }
  }
  if (invalidItemCount > 0) {
    const defaultMsg: string =
      invalidItemCount === 1
        ? `Provided instance array has an element that is not an instance of ${className.name}.`
        : `Provided instance array has ${String(invalidItemCount)} elements that are not an instance of ${className.name}.`;
    const errMsg = errorMessage ?? defaultMsg;
    throw new InvalidTypeError(errMsg);
  }
}

/**
 * Value type guard that determines if the provided value is a `string` type
 *
 * @param value - value to be evaluated
 * @returns true if value is a `string` type; false otherwise
 *
 * @category Type Guards/Assertions
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Assertion that the provided value is a `string` type
 *
 * @param value - value to be evaluated
 * @param errorMessage - optional error message to override the default
 * @throws AssertionError when instance is not a `string` type
 *
 * @category Type Guards/Assertions
 */
export function assertIsString(value: unknown, errorMessage?: string): asserts value is string {
  if (!isString(value)) {
    const errMsg = errorMessage ?? `Provided value is not an instance of string.`;
    throw new InvalidTypeError(errMsg);
  }
}

/**
 * Value type guard that determines if the provided value is a `number` type
 *
 * @param value - value to be evaluated
 * @returns true if value is a `number` type; false otherwise
 *
 * @category Type Guards/Assertions
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * Assertion that the provided value is a `number` type
 *
 * @param value - value to be evaluated
 * @param errorMessage - optional error message to override the default
 * @throws AssertionError when instance is not a `number` type
 *
 * @category Type Guards/Assertions
 */
export function assertIsNumber(value: unknown, errorMessage?: string): asserts value is number {
  if (!isNumber(value)) {
    const errMsg = errorMessage ?? `Provided value is not an instance of number.`;
    throw new InvalidTypeError(errMsg);
  }
}

/**
 * Value type guard that determines if the provided value is a `boolean` type
 *
 * @param value - value to be evaluated
 * @returns true if value is a `boolean` type; false otherwise
 *
 * @category Type Guards/Assertions
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Assertion that the provided value is a `boolean` type
 *
 * @param value - value to be evaluated
 * @param errorMessage - optional error message to override the default
 * @throws AssertionError when instance is not a `boolean` type
 *
 * @category Type Guards/Assertions
 */
export function assertIsBoolean(value: unknown, errorMessage?: string): asserts value is boolean {
  if (!isBoolean(value)) {
    const errMsg = errorMessage ?? `Provided value is not an instance of boolean.`;
    throw new InvalidTypeError(errMsg);
  }
}
