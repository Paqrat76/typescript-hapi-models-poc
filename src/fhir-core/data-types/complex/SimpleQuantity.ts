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

import { strict as assert } from 'node:assert';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
import { isDefined } from '@src/fhir-core/utility/type-guards';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * SimpleQuantity Class
 *
 * @remarks
 * A fixed quantity (no comparator).
 *
 * **FHIR Specification**
 * - **Short:** A fixed quantity (no comparator)
 * - **Definition:** The comparator is not used on a SimpleQuantity
 * - **Comment:** The context of use may frequently define what kind of quantity this is and therefore what kind of units can be used. The context of use may also restrict the values for the comparator.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.SimpleQuantity
 *
 * @category Datatypes: Complex
 * @see [FHIR SimpleQuantity](http://hl7.org/fhir/StructureDefinition/SimpleQuantity)
 */
export class SimpleQuantity extends Quantity implements IBase {
  constructor() {
    super();
    // SimpleQuantity does not support the 'comparator' element so initialize to undefined.
    super.setComparator(undefined);
  }

  /**
   * **WARNING:** SimpleQuantity does not support the 'comparator' element.
   *
   * @param enumType - the `comparator` value;
   * @returns this
   * @throws AsseretionError if any defined enumType is passed in
   */
  public override setComparatorEnumType(enumType: EnumCodeType | undefined): this {
    assert(!isDefined<EnumCodeType | undefined>(enumType), `SimpleQuantity does not support the 'comparator' element.`);
    return this;
  }

  /**
   * **WARNING:** SimpleQuantity does not support the 'comparator' element.
   *
   * @param element - the `comparator` value
   * @returns this
   * @throws AsseretionError if any defined element is passed in
   */
  public override setComparatorElement(element: CodeType | undefined): this {
    assert(!isDefined<CodeType | undefined>(element), `SimpleQuantity does not support the 'comparator' element.`);
    return this;
  }

  /**
   * **WARNING:** SimpleQuantity does not support the 'comparator' element.
   *
   * @param value - the `comparator` value
   * @returns this
   * @throws AsseretionError if any defined value is passed in
   */
  public override setComparator(value: fhirCode | undefined): this {
    assert(!isDefined<fhirCode | undefined>(value), `SimpleQuantity does not support the 'comparator' element.`);
    return this;
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'SimpleQuantity';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty();
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): SimpleQuantity {
    const dest = new SimpleQuantity();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: SimpleQuantity): void {
    super.copyValues(dest);
  }

  /**
   * {@inheritDoc IBase.isComplexDataType}
   */
  public override isComplexDataType(): boolean {
    return true;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
