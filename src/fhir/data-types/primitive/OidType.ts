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

import { fhirOid, fhirOidSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Oid Class
 *
 * @remarks
 * Base StructureDefinition for oid type: An OID represented as a URI
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type oid
 * - **Definition:** An OID represented as a URI
 * - **Comment:** RFC 3001. See also ISO/IEC 8824:1990
 * - **FHIR Version:** 4.0.1
 *
 * @category Datatypes: Primitive
 * @see [FHIR oid](http://hl7.org/fhir/StructureDefinition/oid)
 */
export class OidType extends PrimitiveType<fhirOid> {
  /**
   * @param value - the value of the primitive `fhirOid`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirOid) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirOid): this {
    this.assignValue(value);
    return this;
  }

  public encode(value: fhirOid): string {
    const parseResult = fhirOidSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for OidType`, parseResult.error);
    }
  }

  public parse(value: string): fhirOid {
    const parseResult = fhirOidSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for OidType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'oid';
  }

  public override copy(): OidType {
    const dest = new OidType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: OidType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirOid | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirOidSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value (${value}) for OidType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
  }
}
