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
   * @returns the FHIR type defined in the FHIR standard
   */
  public abstract fhirType(): string;

  /**
   * @returns `true` if the instance is empty; `false` otherwise
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

  // TODO: Add additional methods as required
}
