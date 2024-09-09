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

import { DataType } from '@src/fhir-core/base-models/core-fhir-models';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { DecimalType } from '@src/fhir-core/data-types/primitive/DecimalType';
import { EnumCodeType } from '@src/fhir-core/data-types/primitive/EnumCodeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { isElementEmpty } from '@src/fhir-core/utility/element-util';
import { QuantityComparatorEnum } from '@src/fhir-core/data-types/complex/code-systems/QuantityComparatorEnum';
import {
  fhirCode,
  fhirCodeSchema,
  fhirDecimal,
  fhirDecimalSchema,
  fhirString,
  fhirStringSchema,
  fhirUri,
  fhirUriSchema,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Quantity Class
 *
 * @remarks
 * Base StructureDefinition for Quantity Type: A measured amount (or an amount that can potentially be measured). Note that measured amounts include amounts that are not precisely quantified, including amounts involving arbitrary units and floating currencies.
 *
 * **FHIR Specification**
 * - **Short:** A measured or measurable amount
 * - **Definition:** A measured amount (or an amount that can potentially be measured). Note that measured amounts include amounts that are not precisely quantified, including amounts involving arbitrary units and floating currencies.
 * - **Comment:** The context of use may frequently define what kind of quantity this is and therefore what kind of units can be used. The context of use may also restrict the values for the comparator.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Quantity
 *
 * @category Datatypes: Complex
 * @see [FHIR Quantity](http://hl7.org/fhir/StructureDefinition/Quantity)
 */
export class Quantity extends DataType implements IBase {
  constructor() {
    super();
    this.quantityComparatorEnum = new QuantityComparatorEnum();
  }

  private readonly quantityComparatorEnum: QuantityComparatorEnum;

  /**
   * Quantity.value Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Numerical value (with implicit precision)
   * - **Definition:** The value of the measured amount. The value includes an implicit precision in the presentation of the value.
   * - **Comment:** The implicit precision in the value should always be honored. Monetary values have their own rules for handling precision (refer to standard accounting text books).
   * - **Requirements:** Precision is handled implicitly in almost all cases of measurement.
   * - **FHIR Type:** `decimal`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected value?: DecimalType | undefined;

  /**
   * Quantity.comparator Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** < | <= | >= | > | ad - how to understand the value
   * - **Definition:** How the value should be understood and represented - whether the actual value is greater or less than the stated value due to measurement issues; e.g. if the comparator is "<" , then the real value is < stated value.
   * - **Requirements:** Need a framework for handling measures where the value is <5ug/L or >400mg/L due to the limitations of measuring methodology.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** true
   * - **isModifierReason:** This is labeled as "Is Modifier" because the comparator modifies the interpretation of the value significantly. If there is no comparator, then there is no modification of the value
   * - **isSummary:** true
   */
  protected comparator?: EnumCodeType | undefined;

  /**
   * Quantity.unit Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Unit representation
   * - **Definition:** A human-readable form of the unit.
   * - **Requirements:** There are many representations for units of measure and in many contexts, particular representations are fixed and required. I.e. mcg for micrograms.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected unit?: StringType | undefined;

  /**
   * Quantity.system Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** System that defines coded unit form
   * - **Definition:** The identification of the system that provides the coded form of the unit.
   * - **Requirements:** Need to know the system that defines the coded form of the unit.
   * - **FHIR Type:** `uri`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected system?: UriType | undefined;

  /**
   * Quantity.code Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Coded form of the unit
   * - **Definition:** A computer processable form of the unit in some unit representation system.
   * - **Comment:** The preferred system is UCUM, but SNOMED CT can also be used (for customary units) or ISO 4217 for currency.  The context of use may additionally require a code from a particular system.
   * - **Requirements:** Need a computable form of the unit that is fixed across all forms. UCUM provides this for quantities, but SNOMED CT provides many units of interest.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected code?: CodeType | undefined;

  /**
   * @returns the `value` property value as a PrimitiveType
   */
  public getValueElement(): DecimalType {
    return this.value ?? new DecimalType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `value` property.
   *
   * @param element - the `value` value
   * @returns this
   */
  public setValueElement(element: DecimalType | undefined): this {
    this.value = element;
    return this;
  }

  /**
   * @returns `true` if the `value` property exists and has a value; `false` otherwise
   */
  public hasValueElement(): boolean {
    return this.value !== undefined && !this.value.isEmpty();
  }

  /**
   * @returns the `value` property value as a primitive value
   */
  public getValue(): fhirDecimal | undefined {
    return this.value?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `value` property.
   *
   * @param value - the `value` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setValue(value: fhirDecimal | undefined): this {
    if (value === undefined) {
      this.value = undefined;
    } else {
      const parseResult = fhirDecimalSchema.safeParse(value);
      if (!parseResult.success) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new PrimitiveTypeError(`Invalid Quantity.value (${value})`, parseResult.error);
      }
      this.value = new DecimalType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `value` property exists and has a value; `false` otherwise
   */
  public hasValue(): boolean {
    return this.hasValueElement();
  }

  /**
   * @returns the `comparator` property value as a EnumCodeType
   */
  public getComparatorEnumType(): EnumCodeType | undefined {
    return this.comparator;
  }

  /**
   * Assigns the provided EnumCodeType value to the `comparator` property.
   *
   * @param enumType - the `comparator` value
   * @returns this
   */
  public setComparatorEnumType(enumType: EnumCodeType | undefined): this {
    this.comparator = enumType;
    return this;
  }

  /**
   * @returns `true` if the `comparator` property exists and has a value; `false` otherwise
   */
  public hasComparatorEnumType(): boolean {
    return (
      this.comparator !== undefined && !this.comparator.isEmpty() && this.comparator.fhirCodeEnumeration.length > 0
    );
  }

  /**
   * @returns the `comparator` property value as a PrimitiveType
   */
  public getComparatorElement(): CodeType | undefined {
    if (this.comparator === undefined) {
      return undefined;
    }
    return this.comparator as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `comparator` property.
   *
   * @param element - the `comparator` value
   * @returns this
   */
  public setComparatorElement(element: CodeType | undefined): this {
    if (element === undefined) {
      this.comparator = undefined;
      return this;
    }
    this.comparator = new EnumCodeType(element, this.quantityComparatorEnum);
    return this;
  }

  /**
   * @returns `true` if the `comparator` property exists and has a value; `false` otherwise
   */
  public hasComparatorElement(): boolean {
    return this.hasComparatorEnumType();
  }

  /**
   * @returns the `comparator` property value as a primitive value
   */
  public getComparator(): fhirCode | undefined {
    if (this.comparator === undefined) {
      return undefined;
    }
    return this.comparator.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `comparator` property.
   *
   * @param value - the `comparator` value
   * @returns this
   */
  public setComparator(value: fhirCode | undefined): this {
    if (value === undefined) {
      this.comparator = undefined;
      return this;
    }
    this.comparator = new EnumCodeType(value, this.quantityComparatorEnum);
    return this;
  }

  /**
   * @returns `true` if the `comparator` property exists and has a value; `false` otherwise
   */
  public hasComparator(): boolean {
    return this.hasComparatorEnumType();
  }

  /**
   * @returns the `unit` property value as a PrimitiveType
   */
  public getUnitElement(): StringType {
    return this.unit ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `unit` property.
   *
   * @param element - the `unit` value
   * @returns this
   */
  public setUnitElement(element: StringType | undefined): this {
    this.unit = element;
    return this;
  }

  /**
   * @returns `true` if the `unit` property exists and has a value; `false` otherwise
   */
  public hasUnitElement(): boolean {
    return this.unit !== undefined && !this.unit.isEmpty();
  }

  /**
   * @returns the `unit` property value as a primitive value
   */
  public getUnit(): fhirString | undefined {
    return this.unit?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `unit` property.
   *
   * @param value - the `unit` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setUnit(value: fhirString | undefined): this {
    if (value === undefined) {
      this.unit = undefined;
    } else {
      const parseResult = fhirStringSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Quantity.unit (${value})`, parseResult.error);
      }
      this.unit = new StringType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `unit` property exists and has a value; `false` otherwise
   */
  public hasUnit(): boolean {
    return this.hasUnitElement();
  }

  /**
   * @returns the `system` property value as a PrimitiveType
   */
  public getSystemElement(): UriType {
    return this.system ?? new UriType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `system` property.
   *
   * @param element - the `system` value
   * @returns this
   */
  public setSystemElement(element: UriType | undefined): this {
    this.system = element;
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasSystemElement(): boolean {
    return this.system !== undefined && !this.system.isEmpty();
  }

  /**
   * @returns the `system` property value as a primitive value
   */
  public getSystem(): fhirUri | undefined {
    return this.system?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `system` property.
   *
   * @param value - the `system` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setSystem(value: fhirUri | undefined): this {
    if (value === undefined) {
      this.system = undefined;
    } else {
      const parseResult = fhirUriSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Quantity.system (${value})`, parseResult.error);
      }
      this.system = new UriType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasSystem(): boolean {
    return this.hasSystemElement();
  }

  /**
   * @returns the `code` property value as a PrimitiveType
   */
  public getCodeElement(): CodeType {
    return this.code ?? new CodeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `code` property.
   *
   * @param element - the `code` value
   * @returns this
   */
  public setCodeElement(element: CodeType | undefined): this {
    this.code = element;
    return this;
  }

  /**
   * @returns `true` if the `code` property exists and has a value; `false` otherwise
   */
  public hasCodeElement(): boolean {
    return this.code !== undefined && !this.code.isEmpty();
  }

  /**
   * @returns the `code` property value as a primitive value
   */
  public getCode(): fhirCode | undefined {
    return this.code?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `code` property.
   *
   * @param value - the `code` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setCode(value: fhirCode | undefined): this {
    if (value === undefined) {
      this.code = undefined;
    } else {
      const parseResult = fhirCodeSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Quantity.code (${value})`, parseResult.error);
      }
      this.code = new CodeType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `code` property exists and has a value; `false` otherwise
   */
  public hasCode(): boolean {
    return this.hasCodeElement();
  }

  /**
   * {@inheritDoc Base.fhirType}
   */
  public override fhirType(): string {
    return 'Quantity';
  }

  /**
   * {@inheritDoc Base.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.value, this.comparator, this.unit, this.system, this.code);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Quantity {
    const dest = new Quantity();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Quantity): void {
    super.copyValues(dest);
    dest.value = this.value?.copy();
    dest.comparator = this.comparator?.copy();
    dest.unit = this.unit?.copy();
    dest.system = this.system?.copy();
    dest.code = this.code?.copy();
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */