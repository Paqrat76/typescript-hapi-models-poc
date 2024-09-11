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

import { PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { fhirBase64Binary, fhirBase64BinarySchema } from './primitive-types';

/**
 * Base64Binary Class
 *
 * @remarks
 * Base StructureDefinition for base64Binary Type: A stream of bytes
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type base64Binary
 * - **Definition:** A stream of bytes
 * - **Comment:** A stream of bytes, base64 encoded
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR base64Binary](http://hl7.org/fhir/StructureDefinition/base64Binary)
 */
export class Base64BinaryType extends PrimitiveType<fhirBase64Binary> {
  /**
   * @param value - the value of the primitive `fhirBase64Binary`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirBase64Binary) {
    super();
    this.assignValue(value);
  }

  /**
   * Parses the provided value and returns the desired FHIR primitive value.
   *
   * @param value - value to be parsed
   * @param errMessage - optional error message to override the default
   * @returns the FHIR primitive value
   * @throws PrimitiveTypeError for invalid value
   */
  static parse(value: string, errMessage?: string): fhirBase64Binary {
    const parseResult = fhirBase64BinarySchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      const errMsg = errMessage ?? `Invalid value for Base64BinaryType`;
      throw new PrimitiveTypeError(errMsg, parseResult.error);
    }
  }

  public override setValue(value?: fhirBase64Binary): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirBase64Binary): string {
    return Base64BinaryType.parse(value).toString();
  }

  public parseToPrimitive(value: string): fhirBase64Binary {
    return Base64BinaryType.parse(value);
  }

  public override fhirType(): string {
    return 'base64Binary';
  }

  public override copy(): Base64BinaryType {
    const dest = new Base64BinaryType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: Base64BinaryType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirBase64Binary | undefined): void {
    if (value !== undefined) {
      super.setValue(Base64BinaryType.parse(value));
    } else {
      super.setValue(undefined);
    }
  }
}
