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

import { IBase } from './IBase';
import * as JSON from '@src/fhir-core/utility/json-helpers';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Abstract Base Class
 *
 * @remarks
 * Base Type: Base definition for all types defined in FHIR type system.
 *
 * The Base type that all other types specialize.
 * This type has no properties or constraints.
 * This class contains abstract methods useful to all FHIR classes.
 *
 * **FHIR Specification**
 * - **Short**: Base for all types and resources
 * - **Definition**: Base definition for all types defined in FHIR type system.
 * - **FHIR Version**: 5.0.0; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Base
 *
 * @category Base Models
 * @see [FHIR Base](http://hl7.org/fhir/StructureDefinition/Base)
 */
export abstract class Base implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {}

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public abstract fhirType(): string;

  /**
   * {@inheritDoc IBase.hasFireType}
   */
  public hasFireType(...typeNames: string[]): boolean {
    const ft = this.fhirType();
    let retValue = false;
    for (const tn of typeNames) {
      if (tn.toLowerCase() === ft.toLowerCase()) {
        retValue = true;
        break;
      }
    }
    return retValue;
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public abstract isEmpty(): boolean;

  /**
   * Creates a copy of the current instance.
   *
   * @returns the a new instance copied from the current instance
   */
  public abstract copy(): Base;

  /**
   * Copies the current instance's elements into the provided object.
   *
   * @param dest - the copied instance
   * @protected
   */
  protected abstract copyValues(dest: Base): void;

  /**
   * {@inheritDoc IBase.isResource}
   */
  public isResource(): boolean {
    return false;
  }

  /**
   * {@inheritDoc IBase.isComplexDataType}
   */
  public isComplexDataType(): boolean {
    return false;
  }

  /**
   * {@inheritDoc IBase.isPrimitive}
   */
  public isPrimitive(): boolean {
    return false;
  }

  /**
   * {@inheritDoc IBase.isBooleanPrimitive}
   */
  public isBooleanPrimitive(): boolean {
    return false;
  }

  /**
   * {@inheritDoc IBase.isStringPrimitive}
   */
  public isStringPrimitive(): boolean {
    return false;
  }

  /**
   * {@inheritDoc IBase.isNumberPrimitive}
   */
  public isNumberPrimitive(): boolean {
    return false;
  }

  /**
   * {@inheritDoc IBase.isBigIntPrimitive}
   */
  public isBigIntPrimitive(): boolean {
    return false;
  }

  /**
   * {@inheritDoc IBase.isDateTimePrimitive}
   */
  public isDateTimePrimitive(): boolean {
    return false;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public abstract toJSON(): JSON.Value | undefined;

  // TODO: Add additional methods as required
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
