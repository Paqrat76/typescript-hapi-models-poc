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

import { fhirUuid, fhirUuidSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

/**
 * Uuid Class
 *
 * @remarks
 * Base StructureDefinition for uuid type: A UUID, represented as a URI
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type uuid
 * - **Definition:** A UUID, represented as a URI
 * - **Comment:** See The Open Group, CDE 1.1 Remote Procedure Call specification, Appendix A
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR uuid](http://hl7.org/fhir/StructureDefinition/uuid)
 */
export class UuidType extends PrimitiveType<fhirUuid> {
  /**
   * @param value - the value of the primitive `fhirUuid`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirUuid) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirUuid): this {
    this.assignValue(value);
    return this;
  }

  public encode(value: fhirUuid): string {
    const parseResult = fhirUuidSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for UuidType`, parseResult.error);
    }
  }

  public parse(value: string): fhirUuid {
    const parseResult = fhirUuidSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for UuidType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'uuid';
  }

  public override copy(): UuidType {
    const dest = new UuidType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: UuidType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirUuid | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirUuidSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value (${value}) for UuidType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
  }
}
