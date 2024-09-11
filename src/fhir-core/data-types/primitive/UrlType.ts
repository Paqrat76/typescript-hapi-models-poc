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
import { fhirUrl, fhirUrlSchema } from './primitive-types';

/**
 * Url Class
 *
 * @remarks
 * Base StructureDefinition for url type: A URI that is a literal reference
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type url
 * - **Definition:** A URI that is a literal reference
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR url](http://hl7.org/fhir/StructureDefinition/url)
 */
export class UrlType extends PrimitiveType<fhirUrl> {
  /**
   * @param value - the value of the primitive `fhirUrl`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirUrl) {
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
  static parse(value: string, errMessage?: string): fhirUrl {
    const parseResult = fhirUrlSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      const errMsg = errMessage ?? `Invalid value for UrlType (${String(value)})`;
      throw new PrimitiveTypeError(errMsg, parseResult.error);
    }
  }

  public override setValue(value?: fhirUrl): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirUrl): string {
    return UrlType.parse(value).toString();
  }

  public parseToPrimitive(value: string): fhirUrl {
    return UrlType.parse(value);
  }

  public override fhirType(): string {
    return 'url';
  }

  public override copy(): UrlType {
    const dest = new UrlType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: UrlType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirUrl | undefined): void {
    if (value !== undefined) {
      super.setValue(UrlType.parse(value));
    } else {
      super.setValue(undefined);
    }
  }
}
