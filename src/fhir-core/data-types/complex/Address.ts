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

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

import { IBase } from '@src/fhir-core/base-models/IBase';
import {
  DataType,
  setFhirComplexJson,
  setFhirPrimitiveJson,
  setFhirPrimitiveListJson,
} from '@src/fhir-core/base-models/core-fhir-models';
import { AddressTypeEnum } from '@src/fhir-core/data-types/code-systems/AddressTypeEnum';
import { AddressUseEnum } from '@src/fhir-core/data-types/code-systems/AddressUseEnum';
import { assertEnumCodeType, CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import {
  fhirCode,
  fhirCodeSchema,
  fhirString,
  fhirStringSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { copyListValues, isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import { assertFhirType, assertFhirTypeList, isDefined } from '@src/fhir-core/utility/type-guards';
import * as JSON from '@src/fhir-core/utility/json-helpers';

/**
 * Address Class
 *
 * @remarks
 * Base StructureDefinition for Address Type: An address expressed using postal conventions (as opposed to GPS or other location definition formats).  This data type may be used to convey addresses for use in delivering mail as well as for visiting locations which might not be valid for mail delivery.  There are a variety of postal address formats defined around the world.
 *
 * Need to be able to record postal addresses, along with notes about their use.
 *
 * **FHIR Specification**
 * - **Short:** An address expressed using postal conventions (as opposed to GPS or other location definition formats)
 * - **Definition:** An address expressed using postal conventions (as opposed to GPS or other location definition formats).  This data type may be used to convey addresses for use in delivering mail as well as for visiting locations which might not be valid for mail delivery.  There are a variety of postal address formats defined around the world.
 * - **Comment:** Note: address is intended to describe postal addresses for administrative purposes, not to describe absolute geographical coordinates.  Postal addresses are often used as proxies for physical locations (also see the [Location](https://hl7.org/fhir/location.html#) resource).
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Address
 *
 * @category Datatypes: Complex
 * @see [FHIR Address](http://hl7.org/fhir/StructureDefinition/Address)
 */
export class Address extends DataType implements IBase {
  constructor() {
    super();
    this.addressUseEnum = new AddressUseEnum();
    this.addressTypeEnum = new AddressTypeEnum();
  }

  /**
   * FHIR CodeSystem: AddressUseEnum
   *
   * @see {@link AddressUseEnum}
   */
  private readonly addressUseEnum: AddressUseEnum;

  /**
   * FHIR CodeSystem: AddressTypeEnum
   *
   * @see {@link AddressTypeEnum}
   */
  private readonly addressTypeEnum: AddressTypeEnum;

  /**
   * Address.use Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** home | work | temp | old | billing - purpose of this address
   * - **Definition:** The purpose of this address.
   * - **Comment:** Applications can assume that an address is current unless it explicitly says that it is temporary or old.
   * - **Requirements:** Allows an appropriate address to be chosen from a list of many.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** true
   * - **isModifierReason:** This is labeled as "Is Modifier" because applications should not mistake a temporary or old address etc.for a current/permanent one
   * - **isSummary:** true
   */
  private use?: EnumCodeType | undefined;

  /**
   * Address.type Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** postal | physical | both
   * - **Definition:** Distinguishes between physical addresses (those you can visit) and mailing addresses (e.g. PO Boxes and care-of addresses). Most addresses are both..
   * - **Comment:** The definition of Address states that "address is intended to describe postal addresses, not physical locations". However, many applications track whether an address has a dual purpose of being a location that can be visited as well as being a valid delivery destination, and Postal addresses are often used as proxies for physical locations (also see the [Location](https://hl7.org/fhir/location.html#) resource).
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private type?: EnumCodeType | undefined;

  /**
   * Address.text Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Text representation of the address
   * - **Definition:** Specifies the entire address as it should be displayed e.g. on a postal label. This may be provided instead of or as well as the specific parts.
   * - **Comment:** Can provide both a text representation and parts. Applications updating an address SHALL ensure that  when both text and parts are present,  no content is included in the text that isn't found in a part.
   * - **Requirements:** A renderable, unencoded form.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private text?: StringType | undefined;

  /**
   * Address.line Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Street name, number, direction & P.O. Box etc.
   * - **Definition:** This component contains the house number, apartment number, street name, street direction,  P.O. Box number, delivery hints, and similar address information.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private line?: StringType[] | undefined;

  /**
   * Address.city Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Name of city, town etc.
   * - **Definition:** The name of the city, town, suburb, village or other community or delivery center.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private city?: StringType | undefined;

  /**
   * Address.district Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** District name (aka county)
   * - **Definition:** The name of the administrative area (county).
   * - **Comment:** District is sometimes known as county, but in some regions 'county' is used in place of city (municipality), so county name should be conveyed in city instead.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private district?: StringType | undefined;

  /**
   * Address.state Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Sub-unit of country (abbreviations ok)
   * - **Definition:** Sub-unit of a country with limited sovereignty in a federally organized country. A code may be used if codes are in common use (e.g. US 2 letter state codes).
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private state?: StringType | undefined;

  /**
   * Address.postalCode Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Postal code for area
   * - **Definition:** A postal code designating a region defined by the postal service.
   * - **Requirements:** A renderable, unencoded form.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private postalCode?: StringType | undefined;

  /**
   * Address.country Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Country (e.g. can be ISO 3166 2 or 3 letter code)
   * - **Definition:** Country - a nation as commonly understood or generally accepted.
   * - **Comment:** ISO 3166 3 letter codes can be used in place of a human readable country name.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private country?: StringType | undefined;

  /**
   * Address.period Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Time period when address was/is in use
   * - **Definition:** Time period when address was/is in use.
   * - **Requirements:** Allows addresses to be placed in historical context.
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
    if (isDefined<EnumCodeType | undefined>(enumType)) {
      const errMsgPrefix = 'Invalid Address.use';
      assertEnumCodeType<AddressUseEnum>(enumType, AddressUseEnum, errMsgPrefix);
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
    if (isDefined<CodeType | undefined>(element)) {
      const optErrMsg = `Invalid Address.use; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.use = new EnumCodeType(element, this.addressUseEnum);
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
    if (isDefined<fhirCode | undefined>(value)) {
      const optErrMsg = `Invalid Address.use; Provided value is not an instance of fhirCode.`;
      this.use = new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.addressUseEnum);
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
   * @returns the `type` property value as a EnumCodeType
   */
  public getTypeEnumType(): EnumCodeType | undefined {
    return this.type;
  }

  /**
   * Assigns the provided EnumCodeType value to the `type` property.
   *
   * @param enumType - the `type` value
   * @returns this
   */
  public setTypeEnumType(enumType: EnumCodeType | undefined): this {
    if (isDefined<EnumCodeType | undefined>(enumType)) {
      const errMsgPrefix = 'Invalid Address.type';
      assertEnumCodeType<AddressTypeEnum>(enumType, AddressTypeEnum, errMsgPrefix);
      this.type = enumType;
    } else {
      this.type = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasTypeEnumType(): boolean {
    return this.type !== undefined && !this.type.isEmpty() && this.type.fhirCodeEnumeration.length > 0;
  }

  /**
   * @returns the `type` property value as a PrimitiveType
   */
  public getTypeElement(): CodeType | undefined {
    if (this.type === undefined) {
      return undefined;
    }
    return this.type as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `type` property.
   *
   * @param element - the `type` value
   * @returns this
   */
  public setTypeElement(element: CodeType | undefined): this {
    if (isDefined<CodeType | undefined>(element)) {
      const optErrMsg = `Invalid Address.type; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.type = new EnumCodeType(element, this.addressTypeEnum);
    } else {
      this.type = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasTypeElement(): boolean {
    return this.hasTypeEnumType();
  }

  /**
   * @returns the `type` property value as a primitive value
   */
  public getType(): fhirCode | undefined {
    if (this.type === undefined) {
      return undefined;
    }
    return this.type.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `type` property.
   *
   * @param value - the `type` value
   * @returns this
   */
  public setType(value: fhirCode | undefined): this {
    if (isDefined<fhirCode | undefined>(value)) {
      const optErrMsg = `Invalid Address.type; Provided value is not an instance of fhirCode.`;
      this.type = new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.addressTypeEnum);
    } else {
      this.type = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasType(): boolean {
    return this.hasTypeEnumType();
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
    if (isDefined<StringType | undefined>(element)) {
      const optErrMsg = `Invalid Address.text; Provided element is not an instance of StringType.`;
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
    if (isDefined<fhirString | undefined>(value)) {
      const optErrMsg = `Invalid Address.text (${String(value)})`;
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
   * @returns the `line` property value as a StringType array
   */
  public getLineElement(): StringType[] {
    return this.line ?? ([] as StringType[]);
  }

  /**
   * Assigns the provided StringType array value to the `line` property.
   *
   * @param element - the `line` array value
   * @returns this
   */
  public setLineElement(element: StringType[] | undefined): this {
    if (isDefined<StringType[] | undefined>(element)) {
      const optErrMsg = `Invalid Address.line; Provided value array has an element that is not an instance of StringType.`;
      assertFhirTypeList<StringType>(element, StringType, optErrMsg);
      this.line = element;
    } else {
      this.line = undefined;
    }
    return this;
  }

  /**
   * Add the provided StringType value to the `line` array property.
   *
   * @param element - the `line` value
   * @returns this
   */
  public addLineElement(element: StringType | undefined): this {
    if (isDefined<StringType | undefined>(element)) {
      const optErrMsg = `Invalid Address.line; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.initLine();
      this.line?.push(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `line` property exists and has a value; `false` otherwise
   */
  public hasLineElement(): boolean {
    return this.line !== undefined && this.line.length > 0 && this.line.some((item: StringType) => !item.isEmpty());
  }

  /**
   * @returns the `line` property value as a primitive value array
   */
  public getLine(): fhirString[] {
    this.initLine();
    const lineValues = [] as fhirString[];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const line of this.line!) {
      const value = line.getValue();
      if (value !== undefined) {
        lineValues.push(value);
      }
    }
    return lineValues;
  }

  /**
   * Assigns the provided primitive value array to the `line` property.
   *
   * @param value - the `line` value array
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setLine(value: fhirString[] | undefined): this {
    if (isDefined<fhirString[] | undefined>(value)) {
      const lineElements = [] as StringType[];
      for (const lineValue of value) {
        const optErrMsg = `Invalid Address.line array item (${String(lineValue)})`;
        const element = new StringType(parseFhirPrimitiveData(lineValue, fhirStringSchema, optErrMsg));
        lineElements.push(element);
      }
      this.line = lineElements;
    } else {
      this.line = undefined;
    }
    return this;
  }

  /**
   * Add the provided primitive value to the `line` array property.
   *
   * @param value - the `line` value
   * @returns this
   */
  public addLine(value: fhirString | undefined): this {
    if (isDefined<fhirString | undefined>(value)) {
      const optErrMsg = `Invalid Address.line array item (${String(value)})`;
      const element = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
      this.addLineElement(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `line` property exists and has a value; `false` otherwise
   */
  public hasLine(): boolean {
    return this.hasLineElement();
  }

  /**
   * Initialize the `line` property
   */
  private initLine(): void {
    if (this.line === undefined) {
      this.line = [] as StringType[];
    }
  }

  /**
   * @returns the `city` property value as a PrimitiveType
   */
  public getCityElement(): StringType {
    return this.city ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `city` property.
   *
   * @param element - the `city` value
   * @returns this
   */
  public setCityElement(element: StringType | undefined): this {
    if (isDefined<StringType | undefined>(element)) {
      const optErrMsg = `Invalid Address.city; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.city = element;
    } else {
      this.city = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `city` property exists and has a value; `false` otherwise
   */
  public hasCityElement(): boolean {
    return this.city !== undefined && !this.city.isEmpty();
  }

  /**
   * @returns the `city` property value as a primitive value
   */
  public getCity(): fhirString | undefined {
    return this.city?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `city` property.
   *
   * @param value - the `city` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setCity(value: fhirString | undefined): this {
    if (isDefined<fhirString | undefined>(value)) {
      const optErrMsg = `Invalid Address.city (${String(value)})`;
      this.city = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.city = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `city` property exists and has a value; `false` otherwise
   */
  public hasCity(): boolean {
    return this.hasCityElement();
  }

  /**
   * @returns the `district` property value as a PrimitiveType
   */
  public getDistrictElement(): StringType {
    return this.district ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `district` property.
   *
   * @param element - the `district` value
   * @returns this
   */
  public setDistrictElement(element: StringType | undefined): this {
    if (isDefined<StringType | undefined>(element)) {
      const optErrMsg = `Invalid Address.district; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.district = element;
    } else {
      this.district = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `district` property exists and has a value; `false` otherwise
   */
  public hasDistrictElement(): boolean {
    return this.district !== undefined && !this.district.isEmpty();
  }

  /**
   * @returns the `district` property value as a primitive value
   */
  public getDistrict(): fhirString | undefined {
    return this.district?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `district` property.
   *
   * @param value - the `district` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setDistrict(value: fhirString | undefined): this {
    if (isDefined<fhirString | undefined>(value)) {
      const optErrMsg = `Invalid Address.district (${String(value)})`;
      this.district = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.district = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `district` property exists and has a value; `false` otherwise
   */
  public hasDistrict(): boolean {
    return this.hasDistrictElement();
  }

  /**
   * @returns the `state` property value as a PrimitiveType
   */
  public getStateElement(): StringType {
    return this.state ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `state` property.
   *
   * @param element - the `state` value
   * @returns this
   */
  public setStateElement(element: StringType | undefined): this {
    if (isDefined<StringType | undefined>(element)) {
      const optErrMsg = `Invalid Address.state; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.state = element;
    } else {
      this.state = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `state` property exists and has a value; `false` otherwise
   */
  public hasStateElement(): boolean {
    return this.state !== undefined && !this.state.isEmpty();
  }

  /**
   * @returns the `state` property value as a primitive value
   */
  public getState(): fhirString | undefined {
    return this.state?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `state` property.
   *
   * @param value - the `state` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setState(value: fhirString | undefined): this {
    if (isDefined<fhirString | undefined>(value)) {
      const optErrMsg = `Invalid Address.state (${String(value)})`;
      this.state = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.state = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `state` property exists and has a value; `false` otherwise
   */
  public hasState(): boolean {
    return this.hasStateElement();
  }

  /**
   * @returns the `postalCode` property value as a PrimitiveType
   */
  public getPostalCodeElement(): StringType {
    return this.postalCode ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `postalCode` property.
   *
   * @param element - the `postalCode` value
   * @returns this
   */
  public setPostalCodeElement(element: StringType | undefined): this {
    if (isDefined<StringType | undefined>(element)) {
      const optErrMsg = `Invalid Address.postalCode; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.postalCode = element;
    } else {
      this.postalCode = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `postalCode` property exists and has a value; `false` otherwise
   */
  public hasPostalCodeElement(): boolean {
    return this.postalCode !== undefined && !this.postalCode.isEmpty();
  }

  /**
   * @returns the `postalCode` property value as a primitive value
   */
  public getPostalCode(): fhirString | undefined {
    return this.postalCode?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `postalCode` property.
   *
   * @param value - the `postalCode` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setPostalCode(value: fhirString | undefined): this {
    if (isDefined<fhirString | undefined>(value)) {
      const optErrMsg = `Invalid Address.postalCode (${String(value)})`;
      this.postalCode = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.postalCode = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `postalCode` property exists and has a value; `false` otherwise
   */
  public hasPostalCode(): boolean {
    return this.hasPostalCodeElement();
  }

  /**
   * @returns the `country` property value as a PrimitiveType
   */
  public getCountryElement(): StringType {
    return this.country ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `country` property.
   *
   * @param element - the `country` value
   * @returns this
   */
  public setCountryElement(element: StringType | undefined): this {
    if (isDefined<StringType | undefined>(element)) {
      const optErrMsg = `Invalid Address.country; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.country = element;
    } else {
      this.country = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `country` property exists and has a value; `false` otherwise
   */
  public hasCountryElement(): boolean {
    return this.country !== undefined && !this.country.isEmpty();
  }

  /**
   * @returns the `country` property value as a primitive value
   */
  public getCountry(): fhirString | undefined {
    return this.country?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `country` property.
   *
   * @param value - the `country` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setCountry(value: fhirString | undefined): this {
    if (isDefined<fhirString | undefined>(value)) {
      const optErrMsg = `Invalid Address.country (${String(value)})`;
      this.country = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.country = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `country` property exists and has a value; `false` otherwise
   */
  public hasCountry(): boolean {
    return this.hasCountryElement();
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
    if (isDefined<Period | undefined>(value)) {
      const optErrMsg = `Invalid Address.period; Provided element is not an instance of Period.`;
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
    return 'Address';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(
        this.use,
        this.type,
        this.text,
        this.line,
        this.city,
        this.district,
        this.state,
        this.postalCode,
        this.country,
        this.period,
      )
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Address {
    const dest = new Address();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Address): void {
    super.copyValues(dest);
    dest.use = this.use?.copy();
    dest.type = this.type?.copy();
    dest.text = this.text?.copy();
    const lineList = copyListValues<StringType>(this.line);
    dest.line = lineList.length === 0 ? undefined : lineList;
    dest.city = this.city?.copy();
    dest.district = this.district?.copy();
    dest.state = this.state?.copy();
    dest.postalCode = this.postalCode?.copy();
    dest.country = this.country?.copy();
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

    if (this.hasTypeElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getTypeElement()!, 'type', jsonObj);
    }

    if (this.hasTextElement()) {
      setFhirPrimitiveJson<fhirString>(this.getTextElement(), 'text', jsonObj);
    }

    if (this.hasLine()) {
      setFhirPrimitiveListJson(this.getLineElement(), 'line', jsonObj);
    }

    if (this.hasCityElement()) {
      setFhirPrimitiveJson<fhirString>(this.getCityElement(), 'city', jsonObj);
    }

    if (this.hasDistrictElement()) {
      setFhirPrimitiveJson<fhirString>(this.getDistrictElement(), 'district', jsonObj);
    }

    if (this.hasStateElement()) {
      setFhirPrimitiveJson<fhirString>(this.getStateElement(), 'state', jsonObj);
    }

    if (this.hasPostalCodeElement()) {
      setFhirPrimitiveJson<fhirString>(this.getPostalCodeElement(), 'postalCode', jsonObj);
    }

    if (this.hasCountryElement()) {
      setFhirPrimitiveJson<fhirString>(this.getCountryElement(), 'country', jsonObj);
    }

    if (this.hasPeriod()) {
      setFhirComplexJson(this.getPeriod(), 'period', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
