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
import {
  DataType,
  setFhirComplexJson,
  setFhirPrimitiveJson,
  setFhirPrimitiveListJson,
} from '@src/fhir-core/base-models/core-fhir-models';
import { NameUseEnum } from '@src/fhir-core/data-types/code-systems/NameUseEnum';
import { assertEnumCodeType, CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import {
  fhirCode,
  fhirCodeSchema,
  fhirString,
  fhirStringSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { Period } from '@src/fhir-core/data-types/complex/Period';
// import { copyListValues, isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import { copyListValues, isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import { assertFhirType, assertFhirTypeList, isDefined, isDefinedList } from '@src/fhir-core/utility/type-guards';
import * as JSON from '@src/fhir-core/utility/json-helpers';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * HumanName Class
 *
 * @remarks
 * Base StructureDefinition for HumanName Type: A human's name with the ability to identify parts and usage.
 *
 * **FHIR Specification**
 * - **Short:** Name of a human - parts and usage
 * - **Definition:** A human's name with the ability to identify parts and usage.
 * - **Comment:** Names may be changed, or repudiated, or people may have different names in different contexts. Names may be divided into parts of different type that have variable significance depending on context, though the division into parts does not always matter. With personal names, the different parts might or might not be imbued with some implicit meaning; various cultures associate different importance with the name parts and the degree to which systems must care about name parts around the world varies widely.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.HumanName
 *
 * @category Datatypes: Complex
 * @see [FHIR HumanName](http://hl7.org/fhir/StructureDefinition/HumanName)
 */
export class HumanName extends DataType implements IBase {
  constructor() {
    super();
    this.nameUseEnum = new NameUseEnum();
  }

  /**
   * FHIR CodeSystem: NameUse
   *
   * @see {@link NameUseEnum}
   */
  private readonly nameUseEnum: NameUseEnum;

  /**
   * HumanName.use Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** usual | official | temp | nickname | anonymous | old | maiden
   * - **Definition:** Identifies the purpose for this name.
   * - **Comment:** Applications can assume that a name is current unless it explicitly says that it is temporary or old.
   * - **Requirements:** Allows the appropriate name for a particular context of use to be selected from among a set of names.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** true
   * - **isModifierReason:** This is labeled as "Is Modifier" because applications should not mistake a temporary or old name etc. for a current/permanent one
   * - **isSummary:** true
   */
  private use?: EnumCodeType | undefined;

  /**
   * HumanName.text Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Text representation of the full name
   * - **Definition:** Specifies the entire name as it should be displayed e.g. on an application UI. This may be provided instead of or as well as the specific parts.
   * - **Comment:** Can provide both a text representation and parts. Applications updating a name SHALL ensure that when both text and parts are present,  no content is included in the text that isn't found in a part.
   * - **Requirements:** A renderable, unencoded form.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private text?: StringType | undefined;

  /**
   * HumanName.family Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Family name (often called 'Surname')
   * - **Definition:** The part of a name that links to the genealogy. In some cultures (e.g. Eritrea) the family name of a son is the first name of his father.
   * - **Comment:** Family Name may be decomposed into specific parts using extensions (de, nl, es related cultures).
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private family?: StringType | undefined;

  /**
   * HumanName.given Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Given names (not always 'first'). Includes middle names
   * - **Definition:** Given name.
   * - **Comment:** If only initials are recorded, they may be used in place of the full name parts. Initials may be separated into multiple given names but often aren't due to paractical limitations.  This element is not called "first name" since given names do not always come first.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private given?: StringType[] | undefined;

  /**
   * HumanName.prefix Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Parts that come before the name
   * - **Definition:** Part of the name that is acquired as a title due to academic, legal, employment or nobility status, etc. and that appears at the start of the name.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private prefix?: StringType[] | undefined;

  /**
   * HumanName.suffix Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Parts that come after the name
   * - **Definition:** Part of the name that is acquired as a title due to academic, legal, employment or nobility status, etc. and that appears at the end of the name.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private suffix?: StringType[] | undefined;

  /**
   * HumanName.period Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Time period when name was/is in use
   * - **Definition:** Indicates the period of time when this name was valid for the named person.
   * - **Requirements:** Allows names to be placed in historical context.
   * - **FHIR Type:** `Period`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private period?: Period | undefined;

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
      const errMsgPrefix = 'Invalid HumanName.use';
      assertEnumCodeType<NameUseEnum>(enumType, NameUseEnum, errMsgPrefix);
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
    return this.use !== undefined && !this.use.isEmpty() && this.use.fhirCodeEnumeration.length > 0;
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
      const optErrMsg = `Invalid HumanName.use; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.use = new EnumCodeType(element, this.nameUseEnum);
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
      const optErrMsg = `Invalid HumanName.use; Provided value is not an instance of fhirCode.`;
      this.use = new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.nameUseEnum);
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
   * @returns the `text` property value as a PrimitiveType
   */
  public getTextElement(): StringType {
    return this.text ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `text` property.
   *
   * @param element - the `text` value
   * @returns this
   */
  public setTextElement(element: StringType | undefined): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid HumanName.text; Provided value is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.text = element;
    } else {
      this.text = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `text` property exists and has a value; `false` otherwise
   */
  public hasTextElement(): boolean {
    return this.text !== undefined && !this.text.isEmpty();
  }

  /**
   * @returns the `text` property value as a primitive value
   */
  public getText(): fhirString | undefined {
    return this.text?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `text` property.
   *
   * @param value - the `text` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setText(value: fhirString | undefined): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid HumanName.text (${String(value)})`;
      this.text = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.text = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `text` property exists and has a value; `false` otherwise
   */
  public hasText(): boolean {
    return this.hasTextElement();
  }

  /**
   * @returns the `family` property value as a PrimitiveType
   */
  public getFamilyElement(): StringType {
    return this.family ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `family` property.
   *
   * @param element - the `family` value
   * @returns this
   */
  public setFamilyElement(element: StringType | undefined): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid HumanName.family; Provided value is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.family = element;
    } else {
      this.family = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `family` property exists and has a value; `false` otherwise
   */
  public hasFamilyElement(): boolean {
    return this.family !== undefined && !this.family.isEmpty();
  }

  /**
   * @returns the `family` property value as a primitive value
   */
  public getFamily(): fhirString | undefined {
    return this.family?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `family` property.
   *
   * @param value - the `family` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setFamily(value: fhirString | undefined): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid HumanName.family (${String(value)})`;
      this.family = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.family = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `family` property exists and has a value; `false` otherwise
   */
  public hasFamily(): boolean {
    return this.hasFamilyElement();
  }

  /**
   * @returns the `given` property value as a StringType array
   */
  public getGivenElement(): StringType[] {
    return this.given ?? ([] as StringType[]);
  }

  /**
   * Assigns the provided StringType array value to the `given` property.
   *
   * @param element - the `given` array value
   * @returns this
   */
  public setGivenElement(element: StringType[] | undefined): this {
    if (isDefinedList<StringType>(element)) {
      const optErrMsg = `Invalid HumanName.given; Provided value array has an element that is not an instance of StringType.`;
      assertFhirTypeList<StringType>(element, StringType, optErrMsg);
      this.given = element;
    } else {
      this.given = undefined;
    }
    return this;
  }

  /**
   * Add the provided StringType value to the `given` array property.
   *
   * @param element - the `given` value
   * @returns this
   */
  public addGivenElement(element: StringType | undefined): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid HumanName.given; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.initGiven();
      this.given?.push(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `given` property exists and has a value; `false` otherwise
   */
  public hasGivenElement(): boolean {
    return isDefinedList<StringType>(this.given) && this.given.some((item: StringType) => !item.isEmpty());
  }

  /**
   * @returns the `given` property value as a primitive value array
   */
  public getGiven(): fhirString[] {
    this.initGiven();
    const givenValues = [] as fhirString[];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const given of this.given!) {
      const value = given.getValue();
      if (value !== undefined) {
        givenValues.push(value);
      }
    }
    return givenValues;
  }

  /**
   * Assigns the provided primitive value array to the `given` property.
   *
   * @param value - the `given` value array
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setGiven(value: fhirString[] | undefined): this {
    if (isDefinedList<fhirString>(value)) {
      const givenElements = [] as StringType[];
      for (const givenValue of value) {
        const optErrMsg = `Invalid HumanName.given array item (${String(givenValue)})`;
        const element = new StringType(parseFhirPrimitiveData(givenValue, fhirStringSchema, optErrMsg));
        givenElements.push(element);
      }
      this.given = givenElements;
    } else {
      this.given = undefined;
    }
    return this;
  }

  /**
   * Add the provided primitive value to the `given` array property.
   *
   * @param value - the `given` value
   * @returns this
   */
  public addGiven(value: fhirString | undefined): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid HumanName.given array item (${String(value)})`;
      const element = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
      this.addGivenElement(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `given` property exists and has a value; `false` otherwise
   */
  public hasGiven(): boolean {
    return this.hasGivenElement();
  }

  /**
   * Initialize the `given` property
   */
  private initGiven(): void {
    if (this.given === undefined) {
      this.given = [] as StringType[];
    }
  }

  /**
   * @returns the `prefix` property value as a StringType array
   */
  public getPrefixElement(): StringType[] {
    return this.prefix ?? ([] as StringType[]);
  }

  /**
   * Assigns the provided StringType array value to the `prefix` property.
   *
   * @param element - the `prefix` array value
   * @returns this
   */
  public setPrefixElement(element: StringType[] | undefined): this {
    if (isDefinedList<StringType>(element)) {
      const optErrMsg = `Invalid HumanName.prefix; Provided value array has an element that is not an instance of StringType.`;
      assertFhirTypeList<StringType>(element, StringType, optErrMsg);
      this.prefix = element;
    } else {
      this.prefix = undefined;
    }
    return this;
  }

  /**
   * Add the provided StringType value to the `prefix` array property.
   *
   * @param element - the `prefix` value
   * @returns this
   */
  public addPrefixElement(element: StringType | undefined): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid HumanName.prefix; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.initPrefix();
      this.prefix?.push(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `prefix` property exists and has a value; `false` otherwise
   */
  public hasPrefixElement(): boolean {
    return isDefinedList<StringType>(this.prefix) && this.prefix.some((item: StringType) => !item.isEmpty());
  }

  /**
   * @returns the `prefix` property value as a primitive value array
   */
  public getPrefix(): fhirString[] {
    this.initPrefix();
    const prefixValues = [] as fhirString[];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const prefix of this.prefix!) {
      const value = prefix.getValue();
      if (value !== undefined) {
        prefixValues.push(value);
      }
    }
    return prefixValues;
  }

  /**
   * Assigns the provided primitive value array to the `prefix` property.
   *
   * @param value - the `prefix` value array
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setPrefix(value: fhirString[] | undefined): this {
    if (isDefinedList<fhirString>(value)) {
      const prefixElements = [] as StringType[];
      for (const prefixValue of value) {
        const optErrMsg = `Invalid HumanName.prefix array item (${String(prefixValue)})`;
        const element = new StringType(parseFhirPrimitiveData(prefixValue, fhirStringSchema, optErrMsg));
        prefixElements.push(element);
      }
      this.prefix = prefixElements;
    } else {
      this.prefix = undefined;
    }
    return this;
  }

  /**
   * Add the provided primitive value to the `prefix` array property.
   *
   * @param value - the `prefix` value
   * @returns this
   */
  public addPrefix(value: fhirString | undefined): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid HumanName.prefix array item (${String(value)})`;
      const element = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
      this.addPrefixElement(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `prefix` property exists and has a value; `false` otherwise
   */
  public hasPrefix(): boolean {
    return this.hasPrefixElement();
  }

  /**
   * Initialize the `prefix` property
   */
  private initPrefix(): void {
    if (this.prefix === undefined) {
      this.prefix = [] as StringType[];
    }
  }

  /**
   * @returns the `suffix` property value as a StringType array
   */
  public getSuffixElement(): StringType[] {
    return this.suffix ?? ([] as StringType[]);
  }

  /**
   * Assigns the provided StringType array value to the `suffix` property.
   *
   * @param element - the `suffix` array value
   * @returns this
   */
  public setSuffixElement(element: StringType[] | undefined): this {
    if (isDefinedList<StringType>(element)) {
      const optErrMsg = `Invalid HumanName.suffix; Provided value array has an element that is not an instance of StringType.`;
      assertFhirTypeList<StringType>(element, StringType, optErrMsg);
      this.suffix = element;
    } else {
      this.suffix = undefined;
    }
    return this;
  }

  /**
   * Add the provided StringType value to the `suffix` array property.
   *
   * @param element - the `suffix` value
   * @returns this
   */
  public addSuffixElement(element: StringType | undefined): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid HumanName.suffix; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.initSuffix();
      this.suffix?.push(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `suffix` property exists and has a value; `false` otherwise
   */
  public hasSuffixElement(): boolean {
    return isDefinedList<StringType>(this.suffix) && this.suffix.some((item: StringType) => !item.isEmpty());
  }

  /**
   * @returns the `suffix` property value as a primitive value array
   */
  public getSuffix(): fhirString[] {
    this.initSuffix();
    const suffixValues = [] as fhirString[];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const suffix of this.suffix!) {
      const value = suffix.getValue();
      if (value !== undefined) {
        suffixValues.push(value);
      }
    }
    return suffixValues;
  }

  /**
   * Assigns the provided primitive value array to the `suffix` property.
   *
   * @param value - the `suffix` value array
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setSuffix(value: fhirString[] | undefined): this {
    if (isDefinedList<fhirString>(value)) {
      const suffixElements = [] as StringType[];
      for (const suffixValue of value) {
        const optErrMsg = `Invalid HumanName.suffix array item (${String(suffixValue)})`;
        const element = new StringType(parseFhirPrimitiveData(suffixValue, fhirStringSchema, optErrMsg));
        suffixElements.push(element);
      }
      this.suffix = suffixElements;
    } else {
      this.suffix = undefined;
    }
    return this;
  }

  /**
   * Add the provided primitive value to the `suffix` array property.
   *
   * @param value - the `suffix` value
   * @returns this
   */
  public addSuffix(value: fhirString | undefined): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid HumanName.suffix array item (${String(value)})`;
      const element = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
      this.addSuffixElement(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `suffix` property exists and has a value; `false` otherwise
   */
  public hasSuffix(): boolean {
    return this.hasSuffixElement();
  }

  /**
   * Initialize the `suffix` property
   */
  private initSuffix(): void {
    if (this.suffix === undefined) {
      this.suffix = [] as StringType[];
    }
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
      const optErrMsg = `Invalid HumanName.period; Provided element is not an instance of Period.`;
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
    return this.period !== undefined && !this.period.isEmpty();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'HumanName';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(this.use, this.text, this.family, this.given, this.prefix, this.suffix, this.period)
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): HumanName {
    const dest = new HumanName();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: HumanName): void {
    super.copyValues(dest);
    dest.use = this.use?.copy();
    dest.text = this.text?.copy();
    dest.family = this.family?.copy();
    const givenList = copyListValues<StringType>(this.given);
    dest.given = givenList.length === 0 ? undefined : givenList;
    const prefixList = copyListValues<StringType>(this.prefix);
    dest.prefix = prefixList.length === 0 ? undefined : prefixList;
    const suffixList = copyListValues<StringType>(this.suffix);
    dest.suffix = suffixList.length === 0 ? undefined : suffixList;
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

    if (this.hasUseElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getUseElement()!, 'use', jsonObj);
    }

    if (this.hasTextElement()) {
      setFhirPrimitiveJson<fhirString>(this.getTextElement(), 'text', jsonObj);
    }

    if (this.hasFamilyElement()) {
      setFhirPrimitiveJson<fhirString>(this.getFamilyElement(), 'family', jsonObj);
    }

    if (this.hasGivenElement()) {
      setFhirPrimitiveListJson(this.getGivenElement(), 'given', jsonObj);
    }

    if (this.hasPrefixElement()) {
      setFhirPrimitiveListJson(this.getPrefixElement(), 'prefix', jsonObj);
    }

    if (this.hasSuffixElement()) {
      setFhirPrimitiveListJson(this.getSuffixElement(), 'suffix', jsonObj);
    }

    if (this.hasPeriod()) {
      setFhirComplexJson(this.getPeriod(), 'period', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
