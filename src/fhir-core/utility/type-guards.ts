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
 * Common FHIR related TypeScript type guards and related assertion functions
 *
 * @module
 */

import { AssertionError } from 'node:assert';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

/**
 * Assertion that the value is defined (i.e., not `undefined` and not `null`)
 *
 * @param value - value to be evaluated
 * @param errorMessage - optional error message to override the default
 * @throws AssertionError when instance is either `undefined` or `null`
 *
 * @category Utilities
 */
export function assertIsDefined<T>(value: T, errorMessage?: string): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    const errMsg = errorMessage ?? `Value is ${value === undefined ? 'undefined' : 'null'}.`;
    throw new AssertionError({ message: errMsg });
  }
}

// eslint-disable-next-line
type Constructor<T> = { new (...args: any[]): T };

/**
 * FHIR class type guard for any FHIR class (PrimitiveTypes, complex Types, resources)
 *
 * @remarks
 * Because FHIR types may be undefined (for optional fields) or null (for required fields),
 * both `undefined` and `null` are considered valid FHIR types.
 *
 * @param classInstance - class instance to evaluate
 * @param className - class name for evaluation
 * @returns true if classInstance is undefined or null or instanceof className; false otherwise
 *
 * @category Utilities
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FhirTypeGuard<T>(classInstance: any, className: Constructor<T>): classInstance is T {
  return classInstance === undefined || classInstance === null || classInstance instanceof className;
}

/**
 * FHIR type assertion for any FHIR class (PrimitiveTypes, complex Types, resources)
 *
 * @param classInstance - class instance to evaluate
 * @param className - class name for evaluation
 * @param errorMessage - optional error message to override the default
 * @throws InvalidTypeError when FhirTypeGuard assertion is false
 *
 * @category Utilities
 */
export function assertFhirType<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classInstance: any,
  className: Constructor<T>,
  errorMessage?: string,
): asserts classInstance is T {
  if (!FhirTypeGuard(classInstance, className)) {
    const errMsg = errorMessage ?? `Provided instance is not an instance of ${className.name}.`;
    throw new InvalidTypeError(errMsg);
  }
}