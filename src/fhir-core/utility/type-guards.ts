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
 * @remarks
 * All TypeScript type guards and type assertion functions should be included in this module.
 * However, due to TypeScript circular references, the following have been moved to the
 * indicated module:
 * - assertFhirResourceType() placed in Resource.ts
 *
 * @module
 */

import { AssertionError } from 'node:assert';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { DataType } from '@src/fhir-core/base-models/core-fhir-models';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { EnumCodeType } from '@src/fhir-core/data-types/primitive/EnumCodeType';

/**
 * Assertion that the value is defined (i.e., not `undefined` and not `null`)
 *
 * @param value - value to be evaluated
 * @param errorMessage - optional error message to override the default
 * @throws AssertionError when instance is either `undefined` or `null`
 *
 * @category Type Guards/Assertions
 */
export function assertIsDefined<T>(value: T, errorMessage?: string): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    const errMsg = errorMessage ?? `Value is ${value === undefined ? 'undefined' : 'null'}.`;
    throw new AssertionError({ message: errMsg });
  }
}

/**
 * Generic type for TypeScript classes used by type assertion functions
 *
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
 * FHIR DataType assertion for any FHIR data type class
 *
 * @param classInstance - class instance to evaluate
 * @param errorMessage - optional error message to override the default
 * @throws InvalidTypeError when DataType assertion is false
 *
 * @category Type Guards/Assertions
 */
export function assertFhirDataType(classInstance: unknown, errorMessage?: string): asserts classInstance is DataType {
  if (!(classInstance instanceof DataType)) {
    const errMsg = errorMessage ?? `Provided instance is not an instance of DataType.`;
    throw new InvalidTypeError(errMsg);
  }
}

/**
 * EnumCodeType assertion for any EnumCodeType class
 *
 * @param type - class instance to evaluate
 * @param enumCodeType - class name for evaluation
 * @param errorMessagePrefix - optional error message prefix for the error mesage
 * @throws InvalidTypeError when EnumCodeType assertion is false
 *
 * @category Type Guards/Assertions
 */
export function assertEnumCodeType<T>(
  type: unknown,
  enumCodeType: Class<T>,
  errorMessagePrefix?: string,
): asserts type is T {
  const prefix = errorMessagePrefix ? `${errorMessagePrefix}: ` : '';
  if (type instanceof EnumCodeType) {
    if (type.enumSource() !== enumCodeType.name) {
      const errMsg = `${prefix}Invalid type parameter: ${type.enumSource()}; Should be ${enumCodeType.name}.`;
      throw new InvalidCodeError(errMsg);
    }
  } else {
    const errMsg = `${prefix}Provided type is not an instance of ${EnumCodeType.name}.`;
    throw new InvalidTypeError(errMsg);
  }
}
