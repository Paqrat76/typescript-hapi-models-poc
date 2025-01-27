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

import { IBase } from '@src/fhir-core/base-models/IBase';
import { DataType, setFhirComplexJson, setFhirPrimitiveJson } from '@src/fhir-core/base-models/core-fhir-models';
import { assertEnumCodeType, CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { ContactPointSystemEnum } from '@src/fhir-core/data-types/code-systems/ContactPointSystemEnum';
import { ContactPointUseEnum } from '@src/fhir-core/data-types/code-systems/ContactPointUseEnum';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { PositiveIntType } from '@src/fhir-core/data-types/primitive/PositiveIntType';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import {
  fhirCode,
  fhirCodeSchema,
  fhirPositiveInt,
  fhirPositiveIntSchema,
  fhirString,
  fhirStringSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import { assertFhirType, isDefined } from '@src/fhir-core/utility/type-guards';
import * as JSON from '@src/fhir-core/utility/json-helpers';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * ContactPoint Class
 *
 * @remarks
 * Base StructureDefinition for ContactPoint Type: Base StructureDefinition for ContactPoint Type: Details for all kinds of technology mediated contact points for a person or organization, including telephone, email, etc.
 *
 * **FHIR Specification**
 * - **Short:** Details of a Technology mediated contact point (phone, fax, email, etc.)
 * - **Definition:** Details for all kinds of technology mediated contact points for a person or organization, including telephone, email, etc.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.ContactPoint
 *
 * @category Datatypes: Complex
 * @see [FHIR ContactPoint](http://hl7.org/fhir/StructureDefinition/ContactPoint)
 */
export class ContactPoint extends DataType implements IBase {
  constructor() {
    super();
    this.contactPointSystemEnum = new ContactPointSystemEnum();
    this.contactPointUseEnum = new ContactPointUseEnum();
  }

  /**
   * FHIR CodeSystem: ContactPointSystem
   *
   * @see {@link ContactPointSystemEnum}
   */
  private readonly contactPointSystemEnum: ContactPointSystemEnum;

  /**
   * FHIR CodeSystem: ContactPointUse
   *
   * @see {@link ContactPointUseEnum}
   */
  private readonly contactPointUseEnum: ContactPointUseEnum;

  /**
   * ContactPoint.system Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** phone | fax | email | pager | url | sms | other
   * - **Definition:** Telecommunications form for contact point - what communications system is required to make use of the contact.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private system?: EnumCodeType | undefined;

  /**
   * ContactPoint.value Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The actual contact point details
   * - **Definition:** The actual contact point details, in a form that is meaningful to the designated communication system (i.e. phone number or email address).
   * - **Comment:** Additional text data such as phone extension numbers, or notes about use of the contact are sometimes included in the value.
   * - **Requirements:** Need to support legacy numbers that are not in a tightly controlled format.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private value?: StringType | undefined;

  /**
   * ContactPoint.use Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** home | work | temp | old | mobile - purpose of this contact point
   * - **Definition:** Identifies the purpose for the contact point.
   * - **Comment:** Applications can assume that a contact is current unless it explicitly says that it is temporary or old.
   * - **Requirements:** Need to track the way a person uses this contact, so a user can choose which is appropriate for their purpose.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** true
   * - **isSummary:** true
   */
  private use?: EnumCodeType | undefined;

  /**
   * ContactPoint.rank Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Specify preferred order of use (1 = highest)
   * - **Definition:** Specifies a preferred order in which to use a set of contacts. ContactPoints with lower rank values are more preferred than those with higher rank values.
   * - **Comment:** Note that rank does not necessarily follow the order in which the contacts are represented in the instance.
   * - **FHIR Type:** `positiveInt`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private rank?: PositiveIntType | undefined;

  /**
   * ContactPoint.period Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Time period when the contact point was/is in use
   * - **Definition:** Time period when the contact point was/is in use.
   * - **FHIR Type:** `Period`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private period?: Period | undefined;

  /**
   * @returns the `system` property value as a EnumCodeType
   */
  public getSystemEnumType(): EnumCodeType | undefined {
    return this.system;
  }

  /**
   * Assigns the provided EnumCodeType value to the `system` property.
   *
   * @param enumType - the `system` value
   * @returns this
   */
  public setSystemEnumType(enumType: EnumCodeType | undefined): this {
    if (isDefined<EnumCodeType>(enumType)) {
      const errMsgPrefix = 'ContactPoint.system';
      assertEnumCodeType<ContactPointSystemEnum>(enumType, ContactPointSystemEnum, errMsgPrefix);
      this.system = enumType;
    } else {
      this.system = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasSystemEnumType(): boolean {
    return isDefined<EnumCodeType>(this.system) && !this.system.isEmpty() && this.system.fhirCodeEnumeration.length > 0;
  }

  /**
   * @returns the `system` property value as a PrimitiveType
   */
  public getSystemElement(): CodeType | undefined {
    if (this.system === undefined) {
      return undefined;
    }
    return this.system as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `system` property.
   *
   * @param element - the `system` value
   * @returns this
   */
  public setSystemElement(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid ContactPoint.system; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.system = new EnumCodeType(element, this.contactPointSystemEnum);
    } else {
      this.system = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasSystemElement(): boolean {
    return this.hasSystemEnumType();
  }

  /**
   * @returns the `system` property value as a primitive value
   */
  public getSystem(): fhirCode | undefined {
    if (this.system === undefined) {
      return undefined;
    }
    return this.system.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `system` property.
   *
   * @param value - the `system` value
   * @returns this
   */
  public setSystem(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid ContactPoint.system; Provided value is not an instance of fhirCode.`;
      this.system = new EnumCodeType(
        parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg),
        this.contactPointSystemEnum,
      );
    } else {
      this.system = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasSystem(): boolean {
    return this.hasSystemEnumType();
  }

  /**
   * @returns the `value` property value as a PrimitiveType
   */
  public getValueElement(): StringType {
    return this.value ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `value` property.
   *
   * @param element - the `value` value
   * @returns this
   */
  public setValueElement(element: StringType | undefined): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid ContactPoint.value; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.value = element;
    } else {
      this.value = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `value` property exists and has a value; `false` otherwise
   */
  public hasValueElement(): boolean {
    return isDefined<StringType>(this.value) && !this.value.isEmpty();
  }

  /**
   * @returns the `value` property value as a primitive value
   */
  public getValue(): fhirString | undefined {
    return this.value?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `value` property.
   *
   * @param value - the `value` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setValue(value: fhirString | undefined): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid ContactPoint.value`;
      this.value = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.value = undefined;
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
   * @returns the `use` property value as a EnumCodeType
   */
  public getUseEnumType(): EnumCodeType | undefined {
    return this.use;
  }

  /**
   * Assigns the provided EnumCodeType value to the `use` property.
   *
   * @param enumType - the `use` value
   * @returns this
   */
  public setUseEnumType(enumType: EnumCodeType | undefined): this {
    if (isDefined<EnumCodeType>(enumType)) {
      const errMsgPrefix = 'ContactPoint.use';
      assertEnumCodeType<ContactPointUseEnum>(enumType, ContactPointUseEnum, errMsgPrefix);
      this.use = enumType;
    } else {
      this.use = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `use` property exists and has a value; `false` otherwise
   */
  public hasUseEnumType(): boolean {
    return isDefined<EnumCodeType>(this.use) && !this.use.isEmpty() && this.use.fhirCodeEnumeration.length > 0;
  }

  /**
   * @returns the `use` property value as a PrimitiveType
   */
  public getUseElement(): CodeType | undefined {
    if (this.use === undefined) {
      return undefined;
    }
    return this.use as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `use` property.
   *
   * @param element - the `use` value
   * @returns this
   */
  public setUseElement(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid ContactPoint.use; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.use = new EnumCodeType(element, this.contactPointUseEnum);
    } else {
      this.use = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `use` property exists and has a value; `false` otherwise
   */
  public hasUseElement(): boolean {
    return this.hasUseEnumType();
  }

  /**
   * @returns the `use` property value as a primitive value
   */
  public getUse(): fhirCode | undefined {
    if (this.use === undefined) {
      return undefined;
    }
    return this.use.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `use` property.
   *
   * @param value - the `use` value
   * @returns this
   */
  public setUse(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid ContactPoint.use; Provided value is not an instance of fhirCode.`;
      this.use = new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.contactPointUseEnum);
    } else {
      this.use = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `use` property exists and has a value; `false` otherwise
   */
  public hasUse(): boolean {
    return this.hasUseEnumType();
  }

  /**
   * @returns the `rank` property value as a PrimitiveType
   */
  public getRankElement(): PositiveIntType {
    return this.rank ?? new PositiveIntType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `rank` property.
   *
   * @param element - the `rank` value
   * @returns this
   */
  public setRankElement(element: PositiveIntType | undefined): this {
    if (isDefined<PositiveIntType>(element)) {
      const optErrMsg = `Invalid ContactPoint.rank; Provided element is not an instance of PositiveIntType.`;
      assertFhirType<PositiveIntType>(element, PositiveIntType, optErrMsg);
      this.rank = element;
    } else {
      this.rank = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `rank` property exists and has a value; `false` otherwise
   */
  public hasRankElement(): boolean {
    return isDefined<PositiveIntType>(this.rank) && !this.rank.isEmpty();
  }

  /**
   * @returns the `rank` property value as a primitive value
   */
  public getRank(): fhirPositiveInt | undefined {
    return this.rank?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `rank` property.
   *
   * @param value - the `rank` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setRank(value: fhirPositiveInt | undefined): this {
    if (isDefined<fhirPositiveInt>(value)) {
      const optErrMsg = `Invalid ContactPoint.rank (${String(value)})`;
      this.rank = new PositiveIntType(parseFhirPrimitiveData(value, fhirPositiveIntSchema, optErrMsg));
    } else {
      this.rank = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `rank` property exists and has a value; `false` otherwise
   */
  public hasRank(): boolean {
    return this.hasRankElement();
  }

  /**
   * @returns the `period` property value as a Period object
   */
  public getPeriod(): Period {
    return this.period ?? new Period();
  }

  /**
   * Assigns the provided Period object value to the `period` property.
   *
   * @param value - the `period` object value
   * @returns this
   */
  public setPeriod(value: Period | undefined): this {
    if (isDefined<Period>(value)) {
      const optErrMsg = `Invalid ContactPoint.period; Provided element is not an instance of Period.`;
      assertFhirType<Period>(value, Period, optErrMsg);
      this.period = value;
    } else {
      this.period = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `period` property exists and has a value; `false` otherwise
   */
  public hasPeriod(): boolean {
    return isDefined<Period>(this.period) && !this.period.isEmpty();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'ContactPoint';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.system, this.value, this.use, this.rank, this.period);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): ContactPoint {
    const dest = new ContactPoint();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: ContactPoint): void {
    super.copyValues(dest);
    dest.system = this.system?.copy();
    dest.value = this.value?.copy();
    dest.use = this.use?.copy();
    dest.rank = this.rank?.copy();
    dest.period = this.period?.copy();
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

    if (this.hasSystemElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getSystemElement()!, 'system', jsonObj);
    }

    if (this.hasValueElement()) {
      setFhirPrimitiveJson<fhirString>(this.getValueElement(), 'value', jsonObj);
    }

    if (this.hasUseElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getUseElement()!, 'use', jsonObj);
    }

    if (this.hasRankElement()) {
      setFhirPrimitiveJson<fhirPositiveInt>(this.getRankElement(), 'rank', jsonObj);
    }

    if (this.hasPeriod()) {
      setFhirComplexJson(this.getPeriod(), 'period', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
