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

import { fhirBoolean, fhirBooleanSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

/**
 * Boolean Class
 *
 * @remarks
 * Base StructureDefinition for boolean Type: Value of "true" or "false"
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type boolean
 * - **Definition:** Value of "true" or "false"
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR boolean](http://hl7.org/fhir/StructureDefinition/boolean)
 */
export class BooleanType extends PrimitiveType<fhirBoolean> {
  private boolValue: boolean | undefined;

  /**
   * @param value - the value of the primitive `fhirBoolean`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirBoolean) {
    super();
    this.assignValue(value);
  }

  public override getValue(): fhirBoolean | undefined {
    return this.boolValue;
  }

  public override setValue(value?: fhirBoolean): this {
    this.assignValue(value);
    return this;
  }

  public override hasValue(): boolean {
    return this.boolValue !== undefined;
  }

  public override getValueAsString(): string | undefined {
    return this.boolValue !== undefined ? String(this.boolValue) : undefined;
  }

  public override setValueAsString(value?: string): void {
    if (value === undefined) {
      this.boolValue = undefined;
    } else {
      this.boolValue = this.parse(value);
    }
  }

  public encode(value: fhirBoolean): string {
    const parseResult = fhirBooleanSchema.safeParse(value);
    if (!parseResult.success) {
      throw new PrimitiveTypeError(`Invalid value for BooleanType`, parseResult.error);
    }
    return value ? 'true' : 'false';
  }

  public parse(value: string): fhirBoolean {
    let retVal: fhirBoolean = false;
    if ('true' === value.trim().toLowerCase()) {
      retVal = true;
    } else if ('false' === value.trim().toLowerCase()) {
      retVal = false;
    } else {
      // This should always result is a parse error. Used to create consistent error.
      const parseResult = fhirBooleanSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid value for BooleanType`, parseResult.error);
      } else {
        // Should never happen, but...
        throw new Error('Unexpected error executing BooleanType parse.');
      }
    }
    return retVal;
  }

  public override fhirType(): string {
    return 'boolean';
  }

  public override copy(): BooleanType {
    const dest = new BooleanType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: BooleanType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirBoolean | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirBooleanSchema.safeParse(value);
      if (parseResult.success) {
        this.boolValue = parseResult.data;
      } else {
        throw new PrimitiveTypeError(`Invalid value for BooleanType`, parseResult.error);
      }
    } else {
      this.boolValue = undefined;
    }
  }
}
