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
import { fhirCode, fhirCodeSchema } from '@src/fhir/data-types/primitive/primitive-types';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Base FHIR code system definition for a particular code.
 *
 * @category CodeSystems
 * @interface
 */
export interface IBaseFhirCode {
  /**
   * Enum name (all UPPERCASE)
   */
  name: string;
  /**
   * A string pattern that identifies a concept as defined by the code system
   */
  code: fhirCode;
  /**
   * A URI that identifies the system
   */
  system?: string | undefined;
  /**
   * A description of the concept as defined by the code system
   */
  display?: string | undefined;
  /**
   * Additional descriptive information about the code
   */
  definition?: string | undefined;

  /**
   * @returns the 'code' for this FHIR code definition
   */
  toJSON: () => string;
}

/**
 * Representation of a FHIR code system definition for a particular code.
 *
 * @category CodeSystems
 */
export class BaseFhirCode implements IBaseFhirCode {
  public readonly name: string;
  public readonly code: fhirCode;
  public readonly system?: string | undefined;
  public readonly display?: string | undefined;
  public readonly definition?: string | undefined;

  /**
   * @param name - Enum name (all UPPERCASE)
   * @param code - A string pattern that identifies a concept as defined by the code system
   * @param system - A URI that identifies the system
   * @param display - A description of the concept as defined by the code system
   * @param definition - Additional descriptive information about the code
   * @throws PrimitiveTypeError when provided code is not valid
   * @private
   */
  constructor(name: string, code: fhirCode, system?: string, display?: string, definition?: string) {
    // Ensure the code value is a valid fhirCode
    const parseResult = fhirCodeSchema.safeParse(code);
    if (parseResult.success) {
      this.code = parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid code (${code})`, parseResult.error);
    }

    this.name = name;
    this.display = display;
    this.system = system;
    this.definition = definition;
  }

  /**
   * @returns the 'code' for this FHIR code definition
   */
  public toJSON(): string {
    return this.code;
  }
}

/**
 * FHIR code system for a "pseudo-enumeration" of code values.
 *
 * @category CodeSystems
 * @interface
 */
export interface IFhirCodeEnum {
  /**
   * @returns an IBaseFhirCode[] containing the enumeration of code system code definitions
   */
  values: () => IBaseFhirCode[];

  /**
   * @param code - fhirCode primitive value
   * @returns the IBaseFhirCode instance for the provided code value
   * @throws InvalidCodeError for undefined or invalid code value
   */
  fromCode: (code: fhirCode | undefined) => IBaseFhirCode;
}