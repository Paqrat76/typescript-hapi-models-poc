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
import { fhirCanonical, fhirCanonicalSchema, parseFhirPrimitiveData } from './primitive-types';

/**
 * Canonical Class
 *
 * @remarks
 * Base StructureDefinition for canonical type: A URI that is a reference to a canonical URL on a FHIR resource
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type canonical
 * - **Definition:** A URI that is a reference to a canonical URL on a FHIR resource
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR canonical](http://hl7.org/fhir/StructureDefinition/canonical)
 */
export class CanonicalType extends PrimitiveType<fhirCanonical> {
  /**
   * @param value - the value of the primitive `fhirCanonical`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirCanonical) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirCanonical): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirCanonical): string {
    return parseFhirPrimitiveData(value, fhirCanonicalSchema, this.typeErrorMessage(value)).toString();
  }

  public parseToPrimitive(value: string): fhirCanonical {
    return parseFhirPrimitiveData(value, fhirCanonicalSchema, this.typeErrorMessage(value));
  }

  public override fhirType(): string {
    return 'canonical';
  }

  public override isStringPrimitive(): boolean {
    return true;
  }

  public override copy(): CanonicalType {
    const dest = new CanonicalType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: CanonicalType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirCanonical | undefined): void {
    if (value !== undefined) {
      super.setValue(parseFhirPrimitiveData(value, fhirCanonicalSchema, this.typeErrorMessage(value)));
    } else {
      super.setValue(undefined);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private typeErrorMessage(value: any): string {
    return `Invalid value for CanonicalType (${String(value)})`;
  }
}
