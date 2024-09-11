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
import { fhirId, fhirIdSchema } from './primitive-types';

/**
 * Id Class
 *
 * @remarks
 * Base StructureDefinition for id type: Any combination of letters, numerals, "-" and ".", with a length limit of 64 characters.  (This might be an integer, an unprefixed OID, UUID or any other identifier pattern that meets these constraints.) Ids are case-insensitive.
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type id
 * - **Definition:** Any combination of letters, numerals, "-" and ".", with a length limit of 64 characters.  (This might be an integer, an unprefixed OID, UUID or any other identifier pattern that meets these constraints.) Ids are case-insensitive.
 * - **Comment:** RFC 4122
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR id](http://hl7.org/fhir/StructureDefinition/id)
 */
export class IdType extends PrimitiveType<fhirId> {
  /**
   * @param value - the value of the primitive `fhirId`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirId) {
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
  static parse(value: string, errMessage?: string): fhirId {
    const parseResult = fhirIdSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      const errMsg = errMessage ?? `Invalid value for IdType (${String(value)})`;
      throw new PrimitiveTypeError(errMsg, parseResult.error);
    }
  }

  public override setValue(value?: fhirId): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirId): string {
    return IdType.parse(value).toString();
  }

  public parseToPrimitive(value: string): fhirId {
    return IdType.parse(value);
  }

  public override fhirType(): string {
    return 'id';
  }

  public override copy(): IdType {
    const dest = new IdType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: IdType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirId | undefined): void {
    if (value !== undefined) {
      super.setValue(IdType.parse(value));
    } else {
      super.setValue(undefined);
    }
  }
}
