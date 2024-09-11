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
import { fhirUri, fhirUriSchema } from './primitive-types';

/**
 * Uri Class
 *
 * @remarks
 * Base StructureDefinition for uri Type: String of characters used to identify a name or a resource
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type uri
 * - **Definition:** String of characters used to identify a name or a resource
 * - **Comment:** see http://en.wikipedia.org/wiki/Uniform_resource_identifier
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR uri](http://hl7.org/fhir/StructureDefinition/uri)
 */
export class UriType extends PrimitiveType<fhirUri> {
  /**
   * @param value - the value of the primitive `fhirUri`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirUri) {
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
  static parse(value: string, errMessage?: string): fhirUri {
    const parseResult = fhirUriSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      const errMsg = errMessage ?? `Invalid value for UriType (${String(value)})`;
      throw new PrimitiveTypeError(errMsg, parseResult.error);
    }
  }

  public override setValue(value?: fhirUri): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirUri): string {
    return UriType.parse(value).toString();
  }

  public parseToPrimitive(value: string): fhirUri {
    return UriType.parse(value);
  }

  public override fhirType(): string {
    return 'uri';
  }

  public override copy(): UriType {
    const dest = new UriType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: UriType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirUri | undefined): void {
    if (value !== undefined) {
      super.setValue(UriType.parse(value));
    } else {
      super.setValue(undefined);
    }
  }
}
