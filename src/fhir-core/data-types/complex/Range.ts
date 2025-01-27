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

import { DataType, setFhirComplexJson } from '@src/fhir-core/base-models/core-fhir-models';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/SimpleQuantity';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { assertFhirType, isDefined } from '@src/fhir-core/utility/type-guards';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Range Class
 *
 * @remarks
 * Base StructureDefinition for Range Type: A set of ordered Quantities defined by a low and high limit.
 *
 * **FHIR Specification**
 * - **Short:** Set of values bounded by low and high
 * - **Definition:** A set of ordered Quantities defined by a low and high limit.
 * - **Comment:** The stated low and high value are assumed to have arbitrarily high precision when it comes to determining which values are in the range. I.e. 1.99 is not in the range 2 -> 3.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Range
 *
 * @category Datatypes: Complex
 * @see [FHIR Range](http://hl7.org/fhir/StructureDefinition/Range)
 */
export class Range extends DataType implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Range.low Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Low limit
   * - **Definition:** The low limit. The boundary is inclusive.
   * - **Comment:** If the low element is missing, the low boundary is not known.
   * - **FHIR Type:** `SimpleQuantity`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private low?: SimpleQuantity | undefined;

  /**
   * Range.high Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** High limit
   * - **Definition:** The high limit. The boundary is inclusive.
   * - **Comment:** If the high element is missing, the high boundary is not known.
   * - **FHIR Type:** `SimpleQuantity`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private high?: SimpleQuantity | undefined;

  /**
   * @returns the `low` property value as a SimpleQuantity object
   */
  public getLow(): SimpleQuantity {
    return this.low ?? new SimpleQuantity();
  }

  /**
   * Assigns the provided SimpleQuantity object value to the `low` property.
   *
   * @param value - the `low` object value
   * @returns this
   */
  public setLow(value: SimpleQuantity | undefined): this {
    if (isDefined<SimpleQuantity>(value)) {
      const optErrMsg = `Invalid Range.low; Provided value is not an instance of SimpleQuantity.`;
      assertFhirType<SimpleQuantity>(value, SimpleQuantity, optErrMsg);
      this.low = value;
    } else {
      this.low = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `low` property exists and has a value; `false` otherwise
   */
  public hasLow(): boolean {
    return this.low !== undefined && !this.low.isEmpty();
  }

  /**
   * @returns the `high` property value as a SimpleQuantity object
   */
  public getHigh(): SimpleQuantity {
    return this.high ?? new SimpleQuantity();
  }

  /**
   * Assigns the provided SimpleQuantity object value to the `high` property.
   *
   * @param value - the `high` object value
   * @returns this
   */
  public setHigh(value: SimpleQuantity | undefined): this {
    if (isDefined<SimpleQuantity>(value)) {
      const optErrMsg = `Invalid Range.high; Provided value is not an instance of SimpleQuantity.`;
      assertFhirType<SimpleQuantity>(value, SimpleQuantity, optErrMsg);
      this.high = value;
    } else {
      this.high = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `high` property exists and has a value; `false` otherwise
   */
  public hasHigh(): boolean {
    return this.high !== undefined && !this.high.isEmpty();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Range';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.low, this.high);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Range {
    const dest = new Range();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Range): void {
    super.copyValues(dest);
    dest.low = this.low?.copy();
    dest.high = this.high?.copy();
  }

  /**
   * {@inheritDoc IBase.isComplexDataType}
   */
  public override isComplexDataType(): boolean {
    return true;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    let jsonObj = super.toJSON() as JSON.Object | undefined;
    if (jsonObj === undefined) {
      jsonObj = {} as JSON.Object;
    }

    if (this.hasLow()) {
      setFhirComplexJson(this.getLow(), 'low', jsonObj);
    }

    if (this.hasHigh()) {
      setFhirComplexJson(this.getHigh(), 'high', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
