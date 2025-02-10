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

/**
 * This module contains the Quantity FHIR model and the Quantity variations FHIR models.
 *
 * @remarks
 * In TypeScript, having each of these models in separate files results in circular dependencies that cannot
 * be resolved by typical strategies such as extracting common elements into a sharable module. Therefore,
 * these modules are collected into this single file. This preserves the correct model representations with
 * their correct dependencies without introducing circular dependencies.
 *
 * @module
 */

import { DataType, setFhirPrimitiveJson } from '@src/fhir-core/base-models/core-fhir-models';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { INSTANCE_EMPTY_ERROR_MSG } from '@src/fhir-core/constants';
import { QuantityComparatorEnum } from '@src/fhir-core/data-types/code-systems/QuantityComparatorEnum';
import { assertEnumCodeType, CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { DecimalType } from '@src/fhir-core/data-types/primitive/DecimalType';
import {
  fhirCode,
  fhirCodeSchema,
  fhirDecimal,
  fhirDecimalSchema,
  fhirString,
  fhirStringSchema,
  fhirUri,
  fhirUriSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { isEmpty } from '@src/fhir-core/utility/common-util';
import {
  getPrimitiveTypeJson,
  parseCodeType,
  parseDecimalType,
  parseStringType,
  parseUriType,
  processElementJson,
} from '@src/fhir-core/utility/fhir-parsers';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { assertFhirType, isDefined } from '@src/fhir-core/utility/type-guards';
import { strict as assert } from 'node:assert';

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

  /**
   * Parse the provided `Quantity` json to instantiate the Quantity data model.
   *
   * @param sourceJson - JSON representing FHIR `Quantity`
   * @param optSourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Quantity
   * @returns Quantity data model or undefined for `Quantity`
   */
  public static parse(sourceJson: JSON.Value, optSourceField?: string): Quantity | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField) ? optSourceField : 'Quantity';
    const datatypeJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    const instance = new Quantity();
    processElementJson(instance, datatypeJsonObj);

    let fieldName: string;
    let sourceField: string;
    let primitiveJsonType: 'boolean' | 'number' | 'string';

    fieldName = 'value';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'number';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: DecimalType | undefined = parseDecimalType(dtJson, dtSiblingJson);
      instance.setValueElement(datatype);
    }

    fieldName = 'comparator';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
      instance.setComparatorElement(datatype);
    }

    fieldName = 'unit';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in datatypeJsonObj) {
      primitiveJsonType = 'string';
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
      instance.setUnitElement(datatype);
    }

    fieldName = 'system';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: UriType | undefined = parseUriType(dtJson, dtSiblingJson);
      instance.setSystemElement(datatype);
    }

    fieldName = 'code';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
      instance.setCodeElement(datatype);
    }

    assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
    return instance;
  }

  /**
   * FHIR CodeSystem: QuantityComparator
   *
   * @see {@link QuantityComparatorEnum}
   */
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
  private value?: DecimalType | undefined;

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
  private comparator?: EnumCodeType | undefined;

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
  private unit?: StringType | undefined;

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
  private system?: UriType | undefined;

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
  private code?: CodeType | undefined;

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
    if (isDefined<DecimalType>(element)) {
      const optErrMsg = `Invalid Quantity.value; Provided element is not an instance of DecimalType.`;
      assertFhirType<DecimalType>(element, DecimalType, optErrMsg);
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
    return isDefined<DecimalType>(this.value) && !this.value.isEmpty();
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
    if (isDefined<fhirDecimal>(value)) {
      const optErrMsg = `Invalid Quantity.value (${String(value)})`;
      this.value = new DecimalType(parseFhirPrimitiveData(value, fhirDecimalSchema, optErrMsg));
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
    if (isDefined<EnumCodeType>(enumType)) {
      const errMsgPrefix = 'Invalid Quantity.comparator';
      assertEnumCodeType<QuantityComparatorEnum>(enumType, QuantityComparatorEnum, errMsgPrefix);
      this.comparator = enumType;
    } else {
      this.comparator = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `comparator` property exists and has a value; `false` otherwise
   */
  public hasComparatorEnumType(): boolean {
    return (
      isDefined<EnumCodeType>(this.comparator) &&
      !this.comparator.isEmpty() &&
      this.comparator.fhirCodeEnumeration.length > 0
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
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid Quantity.comparator; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.comparator = new EnumCodeType(element, this.quantityComparatorEnum);
    } else {
      this.comparator = undefined;
    }
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
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid Quantity.comparator; Provided value is not an instance of fhirCode.`;
      this.comparator = new EnumCodeType(
        parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg),
        this.quantityComparatorEnum,
      );
    } else {
      this.comparator = undefined;
    }
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
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid Quantity.unit; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.unit = element;
    } else {
      this.unit = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `unit` property exists and has a value; `false` otherwise
   */
  public hasUnitElement(): boolean {
    return isDefined<StringType>(this.unit) && !this.unit.isEmpty();
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
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid Quantity.unit (${String(value)})`;
      this.unit = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.unit = undefined;
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
    if (isDefined<UriType>(element)) {
      const optErrMsg = `Invalid Quantity.system; Provided element is not an instance of UriType.`;
      assertFhirType<UriType>(element, UriType, optErrMsg);
      this.system = element;
    } else {
      this.system = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasSystemElement(): boolean {
    return isDefined<UriType>(this.system) && !this.system.isEmpty();
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
    if (isDefined<fhirUri>(value)) {
      const optErrMsg = `Invalid Quantity.system (${String(value)})`;
      this.system = new UriType(parseFhirPrimitiveData(value, fhirUriSchema, optErrMsg));
    } else {
      this.system = undefined;
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
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid Quantity.code; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.code = element;
    } else {
      this.code = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `code` property exists and has a value; `false` otherwise
   */
  public hasCodeElement(): boolean {
    return isDefined<CodeType>(this.code) && !this.code.isEmpty();
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
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid Quantity.code (${String(value)})`;
      this.code = new CodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg));
    } else {
      this.code = undefined;
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
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Quantity';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
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

    if (this.hasValueElement()) {
      setFhirPrimitiveJson<fhirDecimal>(this.getValueElement(), 'value', jsonObj);
    }

    if (this.hasComparatorElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getComparatorElement()!, 'comparator', jsonObj);
    }

    if (this.hasUnitElement()) {
      setFhirPrimitiveJson<fhirString>(this.getUnitElement(), 'unit', jsonObj);
    }

    if (this.hasSystemElement()) {
      setFhirPrimitiveJson<fhirUri>(this.getSystemElement(), 'system', jsonObj);
    }

    if (this.hasCodeElement()) {
      setFhirPrimitiveJson<fhirCode>(this.getCodeElement(), 'code', jsonObj);
    }

    return jsonObj;
  }
}

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
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.SimpleQuantity
 *
 * @category Datatypes: Complex
 * @see [FHIR SimpleQuantity](http://hl7.org/fhir/StructureDefinition/SimpleQuantity)
 */
export class SimpleQuantity extends DataType implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Parse the provided `SimpleQuantity` json to instantiate the SimpleQuantity data model.
   *
   * @param sourceJson - JSON representing FHIR `SimpleQuantity`
   * @param optSourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to SimpleQuantity
   * @returns SimpleQuantity data model or undefined for `SimpleQuantity`
   */
  public static parse(sourceJson: JSON.Value, optSourceField?: string): SimpleQuantity | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField) ? optSourceField : 'SimpleQuantity';
    const datatypeJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    const instance = new SimpleQuantity();
    processElementJson(instance, datatypeJsonObj);

    let fieldName: string;
    let sourceField: string;
    let primitiveJsonType: 'boolean' | 'number' | 'string';

    fieldName = 'value';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'number';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: DecimalType | undefined = parseDecimalType(dtJson, dtSiblingJson);
      instance.setValueElement(datatype);
    }

    fieldName = 'unit';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
      instance.setUnitElement(datatype);
    }

    fieldName = 'system';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: UriType | undefined = parseUriType(dtJson, dtSiblingJson);
      instance.setSystemElement(datatype);
    }

    fieldName = 'code';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
      instance.setCodeElement(datatype);
    }

    assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
    return instance;
  }

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
  private value?: DecimalType | undefined;

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
  private unit?: StringType | undefined;

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
  private system?: UriType | undefined;

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
  private code?: CodeType | undefined;

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
    if (isDefined<DecimalType>(element)) {
      const optErrMsg = `Invalid SimpleQuantity.value; Provided element is not an instance of DecimalType.`;
      assertFhirType<DecimalType>(element, DecimalType, optErrMsg);
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
    return isDefined<DecimalType>(this.value) && !this.value.isEmpty();
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
    if (isDefined<fhirDecimal>(value)) {
      const optErrMsg = `Invalid SimpleQuantity.value (${String(value)})`;
      this.value = new DecimalType(parseFhirPrimitiveData(value, fhirDecimalSchema, optErrMsg));
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
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid SimpleQuantity.unit; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.unit = element;
    } else {
      this.unit = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `unit` property exists and has a value; `false` otherwise
   */
  public hasUnitElement(): boolean {
    return isDefined<StringType>(this.unit) && !this.unit.isEmpty();
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
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid SimpleQuantity.unit (${String(value)})`;
      this.unit = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.unit = undefined;
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
    if (isDefined<UriType>(element)) {
      const optErrMsg = `Invalid SimpleQuantity.system; Provided element is not an instance of UriType.`;
      assertFhirType<UriType>(element, UriType, optErrMsg);
      this.system = element;
    } else {
      this.system = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasSystemElement(): boolean {
    return isDefined<UriType>(this.system) && !this.system.isEmpty();
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
    if (isDefined<fhirUri>(value)) {
      const optErrMsg = `Invalid SimpleQuantity.system (${String(value)})`;
      this.system = new UriType(parseFhirPrimitiveData(value, fhirUriSchema, optErrMsg));
    } else {
      this.system = undefined;
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
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid SimpleQuantity.code; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.code = element;
    } else {
      this.code = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `code` property exists and has a value; `false` otherwise
   */
  public hasCodeElement(): boolean {
    return isDefined<CodeType>(this.code) && !this.code.isEmpty();
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
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid SimpleQuantity.code (${String(value)})`;
      this.code = new CodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg));
    } else {
      this.code = undefined;
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
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'SimpleQuantity';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.value, this.unit, this.system, this.code);
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
    dest.value = this.value?.copy();
    dest.unit = this.unit?.copy();
    dest.system = this.system?.copy();
    dest.code = this.code?.copy();
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

    if (this.hasValueElement()) {
      setFhirPrimitiveJson<fhirDecimal>(this.getValueElement(), 'value', jsonObj);
    }

    if (this.hasUnitElement()) {
      setFhirPrimitiveJson<fhirString>(this.getUnitElement(), 'unit', jsonObj);
    }

    if (this.hasSystemElement()) {
      setFhirPrimitiveJson<fhirUri>(this.getSystemElement(), 'system', jsonObj);
    }

    if (this.hasCodeElement()) {
      setFhirPrimitiveJson<fhirCode>(this.getCodeElement(), 'code', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
