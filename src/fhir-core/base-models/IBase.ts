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

import * as JSON from '@src/fhir-core/utility/json-helpers';

/**
 * Base interface to specify methods used by utilities, etc.
 *
 * @category Base Models
 * @interface
 */
export interface IBase {
  // TODO: Add/remove methods as needed

  /**
   * @returns the FHIR type defined in the FHIR standard
   */
  fhirType: () => string;

  /**
   * Determines if any value in typeNames equals the current fhirType() value
   *
   * @param typeNames - array of FHIR type names
   * @returns true if any value in typeNames equals (case-insensitive) the current fhirType() value; false otherwise
   */
  hasFireType: (...typeNames: string[]) => boolean;

  /**
   * @returns `true` if the instance is empty; `false` otherwise
   */
  isEmpty: () => boolean;

  /**
   * @returns `true` if the instance is a FHIR resource; `false` otherwise
   */
  isResource: () => boolean;

  /**
   * @returns `true` if the instance is a FHIR complex datatype; `false` otherwise
   */
  isComplexDataType: () => boolean;

  /**
   * @returns `true` if the instance is a FHIR primitive datatype; `false` otherwise
   */
  isPrimitive: () => boolean;

  /**
   * @returns `true` if the instance is a FHIR primitive boolean datatype; `false` otherwise
   */
  isBooleanPrimitive: () => boolean;

  /**
   * @returns `true` if the instance is a FHIR primitive string-based datatype; `false` otherwise
   */
  isStringPrimitive: () => boolean;

  /**
   * @returns `true` if the instance is a FHIR primitive number-based datatype; `false` otherwise
   */
  isNumberPrimitive: () => boolean;

  /**
   * @returns `true` if the instance is a FHIR primitive bigint-based datatype; `false` otherwise
   */
  isBigIntPrimitive: () => boolean;

  /**
   * @returns `true` if the instance is a FHIR primitive datetime-based datatype; `false` otherwise
   */
  isDateTimePrimitive: () => boolean;

  /**
   * @returns the JSON value
   */
  toJSON: () => JSON.Value | undefined;
}
