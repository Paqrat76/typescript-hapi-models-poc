/*
 * Copyright (c) 2025. Joe Paquette
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

import { setFhirComplexJson, setFhirPrimitiveJson } from '@src/fhir-core/base-models/core-fhir-models';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { FhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { Address } from '@src/fhir-core/data-types/complex/Address';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { Identifier } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import {
  fhirString,
  fhirStringSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import {
  assertFhirResourceTypeJson,
  getPrimitiveTypeJson,
  parseStringType,
  processDomainResourceJson,
} from '@src/fhir-core/utility/fhir-parsers';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { assertFhirType, isDefined } from '@src/fhir-core/utility/type-guards';
import { parseContainedResources } from '@src/fhir-models/fhir-contained-resource-parser';
import { isEmpty } from '../fhir-core/utility/common-util';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * SimplePersonModel Class
 *
 * This class represents a very simple FHIR data model for a non-existent FHIR StructureDefinition.
 * Its purpose is to provide a test (mock) data model to be used in testing the TestDataModel's
 * `DomainResource.contained` feature.
 *
 * Refer to [README-TestModels](./README-TestModels.md) for details.
 */
export class SimplePersonModel extends DomainResource implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  public static override parse(sourceJson: JSON.Object, optSourceField?: string): SimplePersonModel | undefined {
    if (!isDefined<JSON.Object>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField) ? optSourceField : 'SimplePersonModel';
    const classJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    // Must be a valid FHIR resource type. Uses 'Person' for testing purposes.
    assertFhirResourceTypeJson(classJsonObj, 'Person');
    const instance = new SimplePersonModel();
    processDomainResourceJson(instance, classJsonObj);

    let fieldName: string;
    let sourceField: string;
    let primitiveJsonType: 'boolean' | 'number' | 'string';

    // NOTE: "contained" is handled in Resource-based FHIR model rather than in processDomainResourceJson above
    //       to minimize circular references!
    fieldName = 'contained';
    sourceField = `${source}.${fieldName}`;
    /* istanbul ignore next */
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const containedJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      parseContainedResources(instance, containedJsonArray, sourceField);
    }

    fieldName = 'identifier';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const datatype: Identifier | undefined = Identifier.parse(classJsonObj[fieldName]!, sourceField);
      instance.setIdentifier(datatype);
    }

    fieldName = 'name';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const datatype: HumanName | undefined = HumanName.parse(classJsonObj[fieldName]!, sourceField);
      instance.setName(datatype);
    }

    fieldName = 'address';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const datatype: Address | undefined = Address.parse(classJsonObj[fieldName]!, sourceField);
      instance.setAddress(datatype);
    }

    fieldName = 'phone';
    sourceField = `${source}.${fieldName}`;
    // eslint-disable-next-line prefer-const
    primitiveJsonType = 'string';
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, primitiveJsonType);
      const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
      instance.setPhoneElement(datatype);
    }

    return instance;
  }

  private identifier?: Identifier | undefined;

  private name?: HumanName | undefined;

  private address?: Address | undefined;

  private phone?: StringType | undefined;

  /**
   * {@inheritDoc Resource.resourceType}
   */
  public override resourceType(): FhirResourceType {
    // Must be a valid FHIR resource type. Uses 'Person' for testing purposes.
    return 'Person';
  }

  /**
   * @returns the `identifier` property value as a Identifier object if defined; else an empty Identifier object
   */
  public getIdentifier(): Identifier {
    return this.identifier ?? new Identifier();
  }

  /**
   * Assigns the provided Identifier object value to the `identifier` property.
   *
   * @param value - the `identifier` object value
   * @returns this
   */
  public setIdentifier(value: Identifier | undefined): this {
    if (isDefined<Identifier>(value)) {
      const optErrMsg = `Invalid SimplePersonModel.identifier; Provided element is not an instance of Identifier.`;
      assertFhirType<Identifier>(value, Identifier, optErrMsg);
      this.identifier = value;
    } else {
      this.identifier = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `identifier` property exists and has a value; `false` otherwise
   */
  public hasIdentifier(): boolean {
    return isDefined<Identifier>(this.identifier) && !this.identifier.isEmpty();
  }

  /**
   * @returns the `name` property value as a HumanName object if defined; else an empty HumanName object
   */
  public getName(): HumanName {
    return this.name ?? new HumanName();
  }

  /**
   * Assigns the provided Name object value to the `name` property.
   *
   * @param value - the `name` object value
   * @returns this
   */
  public setName(value: HumanName | undefined): this {
    if (isDefined<HumanName>(value)) {
      const optErrMsg = `Invalid SimplePersonModel.name; Provided element is not an instance of HumanName.`;
      assertFhirType<HumanName>(value, HumanName, optErrMsg);
      this.name = value;
    } else {
      this.name = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `name` property exists and has a value; `false` otherwise
   */
  public hasName(): boolean {
    return isDefined<HumanName>(this.name) && !this.name.isEmpty();
  }

  /**
   * @returns the `address` property value as a Address object if defined; else an empty Address object
   */
  public getAddress(): Address {
    return this.address ?? new Address();
  }

  /**
   * Assigns the provided Address object value to the `address` property.
   *
   * @param value - the `address` object value
   * @returns this
   */
  public setAddress(value: Address | undefined): this {
    if (isDefined<Address>(value)) {
      const optErrMsg = `Invalid SimplePersonModel.address; Provided element is not an instance of Address.`;
      assertFhirType<Address>(value, Address, optErrMsg);
      this.address = value;
    } else {
      this.address = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `address` property exists and has a value; `false` otherwise
   */
  public hasAddress(): boolean {
    return isDefined<Address>(this.address) && !this.address.isEmpty();
  }

  /**
   * @returns the `phone` property value as a StringType object if defined; else an empty StringType object
   */
  public getPhoneElement(): StringType {
    return this.phone ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `phone` property.
   *
   * @param element - the `phone` value
   * @returns this
   */
  public setPhoneElement(element: StringType | undefined): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid SimplePersonModel.phone; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.phone = element;
    } else {
      this.phone = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `phone` property exists and has a value; `false` otherwise
   */
  public hasPhoneElement(): boolean {
    return isDefined<StringType>(this.phone) && !this.phone.isEmpty();
  }

  /**
   * @returns the `phone` property value as a fhirString if defined; else undefined
   */
  public getPhone(): fhirString | undefined {
    return this.phone?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `phone` property.
   *
   * @param value - the `phone` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setPhone(value: fhirString | undefined): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid SimplePersonModel.phone (${String(value)})`;
      this.phone = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.phone = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `phone` property exists and has a value; `false` otherwise
   */
  public hasPhone(): boolean {
    return this.hasPhoneElement();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'SimplePersonModel';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.identifier, this.name, this.address, this.phone);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): SimplePersonModel {
    const dest = new SimplePersonModel();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: SimplePersonModel): void {
    super.copyValues(dest);
    dest.identifier = this.identifier?.copy();
    dest.name = this.name?.copy();
    dest.address = this.address?.copy();
    dest.phone = this.phone?.copy();
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    // Will always have, at least, the 'resourceType' property from Resource
    const jsonObj = super.toJSON() as JSON.Object;

    if (this.hasIdentifier()) {
      setFhirComplexJson(this.getIdentifier(), 'identifier', jsonObj);
    }

    if (this.hasName()) {
      setFhirComplexJson(this.getName(), 'name', jsonObj);
    }

    if (this.hasAddress()) {
      setFhirComplexJson(this.getAddress(), 'address', jsonObj);
    }

    if (this.hasPhoneElement()) {
      setFhirPrimitiveJson<fhirString>(this.getPhoneElement(), 'phone', jsonObj);
    }

    // jsonObj will always have, at least, the 'resourceType' property from Resource.
    // If that is all jsonObj has, return undefined.
    return Object.keys(jsonObj).length > 1 ? jsonObj : undefined;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
