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
import { isDefined } from '@src/fhir-core/utility/type-guards';
import { fhirUnsignedInt, fhirUnsignedIntSchema, parseFhirPrimitiveData } from './primitive-types';

/**
 * UnsignedInt Class
 *
 * @remarks
 * Base StructureDefinition for unsignedInt type: An integer with a value that is not negative (e.g. >= 0)
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type unsignedInt
 * - **Definition:** An integer with a value that is not negative (e.g. >= 0)
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR unsignedInt](http://hl7.org/fhir/StructureDefinition/unsignedInt)
 */
export class UnsignedIntType extends PrimitiveType<fhirUnsignedInt> {
  /**
   * @param value - the value of the primitive `fhirUnsignedInt`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirUnsignedInt) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirUnsignedInt): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirUnsignedInt): string {
    return parseFhirPrimitiveData(value, fhirUnsignedIntSchema, this.typeErrorMessage(value)).toString();
  }

  public parseToPrimitive(value: string): fhirUnsignedInt {
    return parseFhirPrimitiveData(value, fhirUnsignedIntSchema, this.typeErrorMessage(value));
  }

  public override fhirType(): string {
    return 'unsignedInt';
  }

  public override isNumberPrimitive(): boolean {
    return true;
  }

  public override copy(): UnsignedIntType {
    const dest = new UnsignedIntType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: UnsignedIntType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirUnsignedInt | undefined): void {
    if (isDefined<fhirUnsignedInt | undefined>(value)) {
      super.setValue(parseFhirPrimitiveData(value, fhirUnsignedIntSchema, this.typeErrorMessage(value)));
    } else {
      super.setValue(undefined);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private typeErrorMessage(value: any): string {
    return `Invalid value for UnsignedIntType (${String(value)})`;
  }
}
