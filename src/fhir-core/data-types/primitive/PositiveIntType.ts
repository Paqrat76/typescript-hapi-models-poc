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
import { fhirPositiveInt, fhirPositiveIntSchema, parseFhirPrimitiveData } from './primitive-types';

/**
 * PositiveInt Class
 *
 * @remarks
 * Base StructureDefinition for positiveInt type: An integer with a value that is positive (e.g. >0)
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type positiveInt
 * - **Definition:** An integer with a value that is positive (e.g. >0)
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR positiveInt](http://hl7.org/fhir/StructureDefinition/positiveInt)
 */
export class PositiveIntType extends PrimitiveType<fhirPositiveInt> {
  /**
   * @param value - the value of the primitive `fhirPositiveInt`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirPositiveInt) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirPositiveInt): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirPositiveInt): string {
    return parseFhirPrimitiveData(value, fhirPositiveIntSchema, this.typeErrorMessage(value)).toString();
  }

  public parseToPrimitive(value: string): fhirPositiveInt {
    return parseFhirPrimitiveData(value, fhirPositiveIntSchema, this.typeErrorMessage(value));
  }

  public override fhirType(): string {
    return 'positiveInt';
  }

  public override isNumberPrimitive(): boolean {
    return true;
  }

  public override copy(): PositiveIntType {
    const dest = new PositiveIntType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: PositiveIntType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirPositiveInt | undefined): void {
    if (value !== undefined) {
      super.setValue(parseFhirPrimitiveData(value, fhirPositiveIntSchema, this.typeErrorMessage(value)));
    } else {
      super.setValue(undefined);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private typeErrorMessage(value: any): string {
    return `Invalid value for PositiveIntType (${String(value)})`;
  }
}
