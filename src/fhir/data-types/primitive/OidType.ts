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
 * Primitive type "oid" in FHIR: An OID represented as a URI (RFC 3001 icon);
 * e.g. urn:oid:1.2.3.4.5
 *
 * @see {@link https://hl7.org/fhir/R5/datatypes.html#oid|oid}
 */
export class OidType extends PrimitiveType<fhirOid> {
  constructor(value?: fhirOid) {
    super();
    this.setValue(value);
  }

  public override setValue(value?: fhirOid): this {
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

  public override copyValues(dest: OidType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }
}
