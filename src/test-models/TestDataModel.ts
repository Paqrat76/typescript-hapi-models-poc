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

import {
  BackboneElement,
  DataType,
  OpenDataTypes,
  setFhirBackboneElementJson,
  setFhirBackboneElementListJson,
  setFhirComplexJson,
  setFhirComplexListJson,
  setFhirPrimitiveJson,
  setFhirPrimitiveListJson,
  setPolymorphicValueJson,
} from '@src/fhir-core/base-models/core-fhir-models';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { FhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { assertFhirResourceType, Resource, setFhirResourceJson } from '@src/fhir-core/base-models/Resource';
import { REQUIRED_PROPERTIES_DO_NOT_EXIST, REQUIRED_PROPERTIES_REQD_IN_JSON } from '@src/fhir-core/constants';
import { Address } from '@src/fhir-core/data-types/complex/Address';
import { Attachment } from '@src/fhir-core/data-types/complex/Attachment';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Reference, ReferenceTargets } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import {
  assertEnumCodeType,
  assertEnumCodeTypeList,
  CodeType,
  constructorCodeValueAsEnumCodeType,
  constructorCodeValueAsEnumCodeTypeList,
  EnumCodeType,
} from '@src/fhir-core/data-types/primitive/CodeType';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import {
  fhirBoolean,
  fhirBooleanSchema,
  fhirCode,
  fhirCodeSchema,
  fhirDateTime,
  fhirDateTimeSchema,
  fhirInteger,
  fhirIntegerSchema,
  fhirString,
  fhirStringSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { isEmpty } from '@src/fhir-core/utility/common-util';
import { ChoiceDataTypes, ChoiceDataTypesMeta, OpenDataTypesMeta } from '@src/fhir-core/utility/decorators';
import {
  assertFhirResourceTypeJson,
  getPrimitiveTypeJson,
  getPrimitiveTypeListJson,
  parseBooleanType,
  parseCodeType,
  parseDateTimeType,
  parseIntegerType,
  parseOpenDataType,
  parsePolymorphicDataType,
  parseStringType,
  PrimitiveTypeJson,
  processBackboneElementJson,
  processDomainResourceJson,
} from '@src/fhir-core/utility/fhir-parsers';
import { copyListValues, isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import {
  assertFhirType,
  assertFhirTypeList,
  assertIsDefined,
  assertIsDefinedList,
  isDefined,
  isDefinedList,
} from '@src/fhir-core/utility/type-guards';
import { parseContainedResources, parseInlineResource } from '@src/fhir-models/fhir-contained-resource-parser';
import { ConsentStateEnum } from '@src/test-models/code-systems/ConsentStateEnum';
import { ContributorTypeEnum } from '@src/test-models/code-systems/ContributorTypeEnum';
import { TaskCodeEnum } from '@src/test-models/code-systems/TaskCodeEnum';
import { TaskStatusEnum } from '@src/test-models/code-systems/TaskStatusEnum';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * TestDataModel Class
 *
 * This class represents a FHIR data model for a non-existent FHIR StructureDefinition. Its purpose is to
 * provide a test (mock) data model that contains all possible FHIR patterns for data model elements
 * representing all types of FHIR data types having each possible cardinality type. The BackboneElement classes
 * will handle a subset of FHIR data types. This class includes choice, open, and Resource data types along with
 * nested BackboneElement data types.
 *
 * This test class will be tested by a comprehensive test suite to ensure all possible FHIR patterns are tested
 * to ensure reliable generated FHIR data models that use all of these possible patterns.
 *
 * Refer to [README-TestModels](./README-TestModels.md) for details.
 */
export class TestDataModel extends DomainResource implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  public static override parse(sourceJson: JSON.Object, optSourceField?: string): TestDataModel | undefined {
    if (!isDefined<JSON.Object>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField) ? optSourceField : 'TestDataModel';
    const classJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    // Must be a valid FHIR resource type. Uses 'Basic' for testing purposes.
    assertFhirResourceTypeJson(classJsonObj, 'Basic');
    const instance = new TestDataModel();
    processDomainResourceJson(instance, classJsonObj);

    let fieldName: string;
    let sourceField: string;
    // let primitiveJsonType: 'boolean' | 'number' | 'string';

    // NOTE: "contained" is handled in Resource-based FHIR model rather than in processDomainResourceJson above
    //       to minimize circular references!
    fieldName = 'contained';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const containedJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      parseContainedResources(instance, containedJsonArray, sourceField);
    }

    const classMetadata: DecoratorMetadataObject | null = TestDataModel[Symbol.metadata];
    const errorMessage = `DecoratorMetadataObject does not exist for TestDataModel`;
    assertIsDefined<DecoratorMetadataObject>(classMetadata, errorMessage);

    fieldName = 'choice01[x]';
    sourceField = `${source}.${fieldName}`;
    const choice01: DataType | undefined = parsePolymorphicDataType(
      classJsonObj,
      sourceField,
      fieldName,
      classMetadata,
    );
    instance.setChoice01(choice01);

    fieldName = 'open01[x]';
    sourceField = `${source}.${fieldName}`;
    const open01: DataType | undefined = parseOpenDataType(classJsonObj, sourceField, fieldName, classMetadata);
    instance.setOpen01(open01);

    fieldName = 'resource01';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      const datatype: Resource | undefined = parseInlineResource(classJsonObj[fieldName], sourceField);
      instance.setResource01(datatype);
    }

    fieldName = 'backbonePrimitive0x';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const componentJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      componentJsonArray.forEach((componentJson: JSON.Value, idx) => {
        const component: TestDataModelPrimitiveComponent | undefined = TestDataModelPrimitiveComponent.parse(
          componentJson,
          `${sourceField}[${String(idx)}]`,
        );
        if (component !== undefined) {
          instance.addBackbonePrimitive0x(component);
        }
      });
    }

    fieldName = 'backboneComplex01';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      const datatype: TestDataModelComplexComponent | undefined = TestDataModelComplexComponent.parse(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        classJsonObj[fieldName]!,
        sourceField,
      );
      instance.setBackboneComplex01(datatype);
    }

    return instance;
  }

  @ChoiceDataTypesMeta('TestDataModel.choice01[x]', ['Range', 'Quantity'])
  private choice01?: DataType | undefined;

  @OpenDataTypesMeta('TestDataModel.open01[x]')
  private open01?: DataType | undefined;

  private resource01?: Resource | undefined;

  private backbonePrimitive0x?: TestDataModelPrimitiveComponent[] | undefined;

  private backboneComplex01?: TestDataModelComplexComponent | undefined;

  /**
   * {@inheritDoc Resource.resourceType}
   */
  public override resourceType(): FhirResourceType {
    // Must be a valid FHIR resource type. Uses 'Basic' for testing purposes.
    return 'Basic';
  }

  /**
   * @returns the `choice01` property value as a DataType object if defined; else undefined
   */
  public getChoice01(): DataType | undefined {
    return this.choice01;
  }

  /**
   * Assigns the provided DataType object value to the `choice01` property.
   *
   * @decorator `@ChoiceDataTypes('TestDataModel.choice01[x]')`
   *
   * @param value - the `choice01` object value
   * @returns this
   */
  @ChoiceDataTypes('TestDataModel.choice01[x]')
  public setChoice01(value: DataType | undefined): this {
    if (isDefined<DataType>(value)) {
      // assertFhirType<DataType>(value, DataType) unnecessary because @ChoiceDataTypes decorator ensures proper type/value
      this.choice01 = value;
    } else {
      this.choice01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `choice01` property exists and has a value; `false` otherwise
   */
  public hasChoice01(): boolean {
    return isDefined<DataType>(this.choice01) && !this.choice01.isEmpty();
  }

  /**
   * @returns the `open01` property value as a DataType object if defined; else undefined
   */
  public getOpen01(): DataType | undefined {
    return this.open01;
  }

  /**
   * Assigns the provided DataType object value to the `open01` property.
   *
   * @decorator `@OpenDataTypes('TestDataModel.open01[x]')`
   *
   * @param value - the `open01` object value
   * @returns this
   */
  @OpenDataTypes('TestDataModel.open01[x]')
  public setOpen01(value: DataType | undefined): this {
    if (isDefined<DataType>(value)) {
      // assertFhirType<DataType>(value, DataType) unnecessary because @OpenDataTypes decorator ensures proper type/value
      this.open01 = value;
    } else {
      this.open01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `open01` property exists and has a value; `false` otherwise
   */
  public hasOpen01(): boolean {
    return isDefined<DataType>(this.open01) && !this.open01.isEmpty();
  }

  /**
   * @returns the `resource01` property value as a Resource01 object if defined; else undefined
   */
  public getResource01(): Resource | undefined {
    return this.resource01;
  }

  /**
   * Assigns the provided Resource01 object value to the `resource01` property.
   *
   * @param value - the `resource01` object value
   * @returns this
   */
  public setResource01(value: Resource | undefined): this {
    if (isDefined<Resource>(value)) {
      const optErrMsg = `Invalid TestDataModel.resource01; Provided element is not an instance of Resource.`;
      assertFhirResourceType(value, optErrMsg);
      this.resource01 = value;
    } else {
      this.resource01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `resource01` property exists and has a value; `false` otherwise
   */
  public hasResource01(): boolean {
    return isDefined<Resource>(this.resource01) && !this.resource01.isEmpty();
  }

  /**
   * @returns the `backbonePrimitive0x` property value as a TestDataModelPrimitiveComponent array
   */
  public getBackbonePrimitive0x(): TestDataModelPrimitiveComponent[] {
    return this.backbonePrimitive0x ?? ([] as TestDataModelPrimitiveComponent[]);
  }

  /**
   * Assigns the provided TestDataModelPrimitiveComponent array value to the `backbonePrimitive0x` property.
   *
   * @param value - the `backbonePrimitive0x` array value
   * @returns this
   */
  public setBackbonePrimitive0x(value: TestDataModelPrimitiveComponent[] | undefined): this {
    if (isDefinedList<TestDataModelPrimitiveComponent>(value)) {
      const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x; Provided value array has an element that is not an instance of TestDataModelPrimitiveComponent.`;
      assertFhirTypeList<TestDataModelPrimitiveComponent>(value, TestDataModelPrimitiveComponent, optErrMsg);
      this.backbonePrimitive0x = value;
    } else {
      this.backbonePrimitive0x = undefined;
    }
    return this;
  }

  /**
   * Add the provided TestDataModelPrimitiveComponent value to the `backbonePrimitive0x` array property.
   *
   * @param value - the `backbonePrimitive0x` value
   * @returns this
   */
  public addBackbonePrimitive0x(value: TestDataModelPrimitiveComponent | undefined): this {
    if (isDefined<TestDataModelPrimitiveComponent>(value)) {
      const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x; Provided element is not an instance of TestDataModelPrimitiveComponent.`;
      assertFhirType<TestDataModelPrimitiveComponent>(value, TestDataModelPrimitiveComponent, optErrMsg);
      this.initBackbonePrimitive0x();
      this.backbonePrimitive0x?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `backbonePrimitive0x` property exists and has a value; `false` otherwise
   */
  public hasBackbonePrimitive0x(): boolean {
    return (
      isDefinedList<TestDataModelPrimitiveComponent>(this.backbonePrimitive0x) &&
      this.backbonePrimitive0x.some((item: TestDataModelPrimitiveComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `backbonePrimitive0x` property
   */
  private initBackbonePrimitive0x(): void {
    if (!this.hasBackbonePrimitive0x()) {
      this.backbonePrimitive0x = [] as TestDataModelPrimitiveComponent[];
    }
  }

  /**
   * @returns the `backboneComplex01` property value as a TestDataModelComplexComponent object if defined; else an empty TestDataModelComplexComponent object
   */
  public getBackboneComplex01(): TestDataModelComplexComponent {
    return this.backboneComplex01 ?? new TestDataModelComplexComponent(null, null, null, null);
  }

  /**
   * Assigns the provided BackboneComplex01 object value to the `backboneComplex01` property.
   *
   * @param value - the `backboneComplex01` object value
   * @returns this
   */
  public setBackboneComplex01(value: TestDataModelComplexComponent | undefined): this {
    if (isDefined<TestDataModelComplexComponent>(value)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01; Provided element is not an instance of TestDataModelComplexComponent.`;
      assertFhirType<TestDataModelComplexComponent>(value, TestDataModelComplexComponent, optErrMsg);
      this.backboneComplex01 = value;
    } else {
      this.backboneComplex01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `backboneComplex01` property exists and has a value; `false` otherwise
   */
  public hasBackboneComplex01(): boolean {
    return isDefined<TestDataModelComplexComponent>(this.backboneComplex01) && !this.backboneComplex01.isEmpty();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'TestDataModel';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(this.choice01, this.open01, this.resource01, this.backbonePrimitive0x, this.backboneComplex01)
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): TestDataModel {
    const dest = new TestDataModel();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: TestDataModel): void {
    super.copyValues(dest);
    dest.choice01 = this.choice01?.copy();
    dest.open01 = this.open01?.copy();
    dest.resource01 = this.resource01?.copy();
    const backbonePrimitive0xList = copyListValues<TestDataModelPrimitiveComponent>(this.backbonePrimitive0x);
    dest.backbonePrimitive0x = backbonePrimitive0xList.length === 0 ? undefined : backbonePrimitive0xList;
    dest.backboneComplex01 = this.backboneComplex01?.copy();
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

    if (this.hasChoice01()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPolymorphicValueJson(this.getChoice01()!, 'choice01', jsonObj);
    }

    if (this.hasOpen01()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPolymorphicValueJson(this.getOpen01()!, 'open01', jsonObj);
    }

    if (this.hasResource01()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirResourceJson(this.getResource01()!, 'resource01', jsonObj);
    }

    if (this.hasBackbonePrimitive0x()) {
      setFhirBackboneElementListJson(this.getBackbonePrimitive0x(), 'backbonePrimitive0x', jsonObj);
    }

    if (this.hasBackboneComplex01()) {
      setFhirBackboneElementJson(this.getBackboneComplex01(), 'backboneComplex01', jsonObj);
    }

    // jsonObj will always have, at least, the 'resourceType' property from Resource.
    // If that is all jsonObj has, return undefined.
    return Object.keys(jsonObj).length > 1 ? jsonObj : undefined;
  }
}

/**
 * TestDataModelPrimitiveComponent Class
 *
 * This class represents a FHIR data model for a BackboneElement in a non-existent FHIR StructureDefinition.
 * Its purpose is to provide a test (mock) data model that contains all possible FHIR patterns for primitive and
 * choice FHIR data types having each possible cardinality type.
 *
 * This test class will be tested by a comprehensive test suite to ensure all possible FHIR patterns are tested
 * to ensure reliable generated FHIR data models that use all of these possible patterns.
 *
 * Refer to [README-TestModels](./README-TestModels.md) for details.
 */
export class TestDataModelPrimitiveComponent extends BackboneElement {
  constructor(
    primitive11: BooleanType | fhirBoolean | null,
    primitive1x: StringType[] | fhirString[] | null,
    choice11: DataType | null,
  ) {
    super();

    this.primitive11 = null;
    if (isDefined<BooleanType | fhirBoolean>(primitive11)) {
      if (primitive11 instanceof DataType) {
        this.setPrimitive11Element(primitive11);
      } else {
        this.setPrimitive11(primitive11);
      }
    }

    this.primitive1x = null;
    if (isDefinedList<StringType | fhirString>(primitive1x)) {
      if (primitive1x[0] instanceof DataType) {
        this.setPrimitive1xElement(primitive1x as StringType[]);
      } else {
        this.setPrimitive1x(primitive1x as fhirString[]);
      }
    }

    this.choice11 = null;
    if (isDefined<DataType>(choice11)) {
      this.setChoice11(choice11);
    }
  }

  public static parse(sourceJson: JSON.Value, optSourceField?: string): TestDataModelPrimitiveComponent | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField) ? optSourceField : 'TestDataModel.backbonePrimitive0x';
    const classJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    const instance = new TestDataModelPrimitiveComponent(null, null, null);
    processBackboneElementJson(instance, classJsonObj);

    let fieldName: string;
    let sourceField: string;
    let primitiveJsonType: 'boolean' | 'number' | 'string';

    const classMetadata: DecoratorMetadataObject | null = TestDataModelPrimitiveComponent[Symbol.metadata];
    const errorMessage = `DecoratorMetadataObject does not exist for TestDataModelPrimitiveComponent`;
    assertIsDefined<DecoratorMetadataObject>(classMetadata, errorMessage);

    const missingReqdProperties: string[] = [];

    fieldName = 'primitive01';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, primitiveJsonType);
      const datatype: DateTimeType | undefined = parseDateTimeType(dtJson, dtSiblingJson);
      instance.setPrimitive01Element(datatype);
    }

    fieldName = 'primitive0x';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'number';
    if (fieldName in classJsonObj) {
      const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(
        classJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      dataJsonArray.forEach((dataJson: PrimitiveTypeJson) => {
        const datatype: IntegerType | undefined = parseIntegerType(dataJson.dtJson, dataJson.dtSiblingJson);
        if (datatype !== undefined) {
          instance.addPrimitive0xElement(datatype);
        }
      });
    }

    fieldName = 'primitive11';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'boolean';
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, primitiveJsonType);
      const datatype: BooleanType | undefined = parseBooleanType(dtJson, dtSiblingJson);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setPrimitive11Element(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'primitive1x';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in classJsonObj) {
      const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(
        classJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      dataJsonArray.forEach((dataJson: PrimitiveTypeJson, idx) => {
        const datatype: StringType | undefined = parseStringType(dataJson.dtJson, dataJson.dtSiblingJson);
        if (datatype === undefined) {
          missingReqdProperties.push(`${sourceField}[${String(idx)}]`);
        } else {
          instance.addPrimitive1xElement(datatype);
        }
      });
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'choice11[x]';
    sourceField = `${source}.${fieldName}`;
    const choice11: DataType | undefined = parsePolymorphicDataType(
      classJsonObj,
      sourceField,
      fieldName,
      classMetadata,
    );
    if (choice11 === undefined) {
      missingReqdProperties.push(sourceField);
    } else {
      instance.setChoice11(choice11);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_REQD_IN_JSON} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return instance;
  }

  private primitive01?: DateTimeType | undefined;

  private primitive0x?: IntegerType[] | undefined;

  private primitive11: BooleanType | null;

  private primitive1x: StringType[] | null;

  @ChoiceDataTypesMeta('TestDataModel.backbonePrimitive0x.choice11[x]', ['uri', 'string'])
  private choice11: DataType | null;

  /**
   * @returns the `primitive01` property value as a DateTimeType object if defined; else an empty DateTimeType object
   */
  public getPrimitive01Element(): DateTimeType {
    return this.primitive01 ?? new DateTimeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `primitive01` property.
   *
   * @param element - the `primitive01` value
   * @returns this
   */
  public setPrimitive01Element(element: DateTimeType | undefined): this {
    if (isDefined<DateTimeType>(element)) {
      const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive01; Provided element is not an instance of DateTimeType.`;
      assertFhirType<DateTimeType>(element, DateTimeType, optErrMsg);
      this.primitive01 = element;
    } else {
      this.primitive01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `primitive01` property exists and has a value; `false` otherwise
   */
  public hasPrimitive01Element(): boolean {
    return isDefined<DateTimeType>(this.primitive01) && !this.primitive01.isEmpty();
  }

  /**
   * @returns the `primitive01` property value as a fhirDateTime if defined; else undefined
   */
  public getPrimitive01(): fhirDateTime | undefined {
    return this.primitive01?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `primitive01` property.
   *
   * @param value - the `primitive01` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setPrimitive01(value: fhirDateTime | undefined): this {
    if (isDefined<fhirDateTime>(value)) {
      const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive01 (${String(value)})`;
      this.primitive01 = new DateTimeType(parseFhirPrimitiveData(value, fhirDateTimeSchema, optErrMsg));
    } else {
      this.primitive01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `primitive01` property exists and has a value; `false` otherwise
   */
  public hasPrimitive01(): boolean {
    return this.hasPrimitive01Element();
  }

  /**
   * @returns the `primitive0x` property value as a IntegerType array
   */
  public getPrimitive0xElement(): IntegerType[] {
    return this.primitive0x ?? ([] as IntegerType[]);
  }

  /**
   * Assigns the provided IntegerType array value to the `primitive0x` property.
   *
   * @param element - the `primitive0x` array value
   * @returns this
   */
  public setPrimitive0xElement(element: IntegerType[] | undefined): this {
    if (isDefinedList<IntegerType>(element)) {
      const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive0x; Provided value array has an element that is not an instance of IntegerType.`;
      assertFhirTypeList<IntegerType>(element, IntegerType, optErrMsg);
      this.primitive0x = element;
    } else {
      this.primitive0x = undefined;
    }
    return this;
  }

  /**
   * Add the provided IntegerType value to the `primitive0x` array property.
   *
   * @param element - the `primitive0x` value
   * @returns this
   */
  public addPrimitive0xElement(element: IntegerType | undefined): this {
    if (isDefined<IntegerType>(element)) {
      const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive0x; Provided element is not an instance of IntegerType.`;
      assertFhirType<IntegerType>(element, IntegerType, optErrMsg);
      this.initPrimitive0x();
      this.primitive0x?.push(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `primitive0x` property exists and has a value; `false` otherwise
   */
  public hasPrimitive0xElement(): boolean {
    return (
      isDefinedList<IntegerType>(this.primitive0x) && this.primitive0x.some((item: IntegerType) => !item.isEmpty())
    );
  }

  /**
   * @returns the `primitive0x` property value as a fhirInteger array
   */
  public getPrimitive0x(): fhirInteger[] {
    this.initPrimitive0x();
    const primitive0xValues = [] as fhirInteger[];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const primitive0x of this.primitive0x!) {
      const value = primitive0x.getValue();
      if (value !== undefined) {
        primitive0xValues.push(value);
      }
    }
    return primitive0xValues;
  }

  /**
   * Assigns the provided primitive value array to the `primitive0x` property.
   *
   * @param value - the `primitive0x` value array
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setPrimitive0x(value: fhirInteger[] | undefined): this {
    if (isDefinedList<fhirInteger>(value)) {
      const primitive0xElements = [] as IntegerType[];
      for (const primitive0xValue of value) {
        const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive0x array item (${String(primitive0xValue)})`;
        const element = new IntegerType(parseFhirPrimitiveData(primitive0xValue, fhirIntegerSchema, optErrMsg));
        primitive0xElements.push(element);
      }
      this.primitive0x = primitive0xElements;
    } else {
      this.primitive0x = undefined;
    }
    return this;
  }

  /**
   * Add the provided primitive value to the `primitive0x` array property.
   *
   * @param value - the `primitive0x` value
   * @returns this
   */
  public addPrimitive0x(value: fhirInteger | undefined): this {
    if (isDefined<fhirInteger>(value)) {
      const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive0x array item (${String(value)})`;
      const element = new IntegerType(parseFhirPrimitiveData(value, fhirIntegerSchema, optErrMsg));
      this.initPrimitive0x();
      this.addPrimitive0xElement(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `primitive0x` property exists and has a value; `false` otherwise
   */
  public hasPrimitive0x(): boolean {
    return this.hasPrimitive0xElement();
  }

  /**
   * Initialize the `primitive0x` property
   */
  private initPrimitive0x(): void {
    if (!this.hasPrimitive0x()) {
      this.primitive0x = [] as IntegerType[];
    }
  }

  /**
   * @returns the `primitive11` property value as a BooleanType object if defined; else null
   */
  public getPrimitive11Element(): BooleanType | null {
    return this.primitive11;
  }

  /**
   * Assigns the provided PrimitiveType value to the `primitive11` property.
   *
   * @param element - the `primitive11` value
   * @returns this
   */
  public setPrimitive11Element(element: BooleanType): this {
    assertIsDefined<BooleanType>(element, `TestDataModel.backbonePrimitive0x.primitive11 is required`);
    const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive11; Provided value is not an instance of BooleanType.`;
    assertFhirType<BooleanType>(element, BooleanType, optErrMsg);
    this.primitive11 = element;
    return this;
  }

  /**
   * @returns `true` if the `primitive11` property exists and has a value; `false` otherwise
   */
  public hasPrimitive11Element(): boolean {
    return isDefined<BooleanType>(this.primitive11) && !this.primitive11.isEmpty();
  }

  /**
   * @returns the `primitive11` property value as a fhirBoolean if defined; else null
   */
  public getPrimitive11(): fhirBoolean | null {
    if (this.primitive11?.getValue() === undefined) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.primitive11.getValue()!;
  }

  /**
   * Assigns the provided primitive value to the `primitive11` property.
   *
   * @param value - the `primitive11` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setPrimitive11(value: fhirBoolean): this {
    assertIsDefined<fhirBoolean>(value, `TestDataModel.backbonePrimitive0x.primitive11 is required`);
    const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive11 (${String(value)})`;
    this.primitive11 = new BooleanType(parseFhirPrimitiveData(value, fhirBooleanSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `primitive11` property exists and has a value; `false` otherwise
   */
  public hasPrimitive11(): boolean {
    return this.hasPrimitive11Element();
  }

  /**
   * @returns the `primitive1x` property value as a StringType array
   */
  public getPrimitive1xElement(): StringType[] {
    return this.primitive1x ?? ([] as StringType[]);
  }

  /**
   * Assigns the provided StringType array value to the `primitive1x` property.
   *
   * @param element - the `primitive1x` array value
   * @returns this
   */
  public setPrimitive1xElement(element: StringType[]): this {
    assertIsDefinedList<StringType>(element, `TestDataModel.backbonePrimitive0x.primitive1x is required`);
    const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive1x; Provided value array has an element that is not an instance of StringType.`;
    assertFhirTypeList<StringType>(element, StringType, optErrMsg);
    this.primitive1x = element;
    return this;
  }

  /**
   * Add the provided StringType value to the `primitive1x` array property.
   *
   * @param element - the `primitive1x` value
   * @returns this
   */
  public addPrimitive1xElement(element: StringType): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive1x; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.initPrimitive1x();
      this.primitive1x?.push(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `primitive1x` property exists and has a value; `false` otherwise
   */
  public hasPrimitive1xElement(): boolean {
    return isDefinedList<StringType>(this.primitive1x) && this.primitive1x.some((item: StringType) => !item.isEmpty());
  }

  /**
   * @returns the `primitive1x` property value as a fhirString array
   */
  public getPrimitive1x(): fhirString[] {
    this.initPrimitive1x();
    const primitive1xValues = [] as fhirString[];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const primitive1x of this.primitive1x!) {
      const value = primitive1x.getValue();
      if (value !== undefined) {
        primitive1xValues.push(value);
      }
    }
    return primitive1xValues;
  }

  /**
   * Assigns the provided primitive value array to the `primitive1x` property.
   *
   * @param value - the `primitive1x` value array
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setPrimitive1x(value: fhirString[]): this {
    assertIsDefinedList<fhirString>(value, `TestDataModel.backbonePrimitive0x.primitive1x is required`);
    const primitive1xElements = [] as StringType[];
    for (const primitive1xValue of value) {
      const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive1x array item (${String(primitive1xValue)})`;
      const element = new StringType(parseFhirPrimitiveData(primitive1xValue, fhirStringSchema, optErrMsg));
      primitive1xElements.push(element);
    }
    this.primitive1x = primitive1xElements;
    return this;
  }

  /**
   * Add the provided primitive value to the `primitive1x` array property.
   *
   * @param value - the `primitive1x` value
   * @returns this
   */
  public addPrimitive1x(value: fhirString): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid TestDataModel.backbonePrimitive0x.primitive1x array item (${String(value)})`;
      const element = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
      this.initPrimitive1x();
      this.addPrimitive1xElement(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `primitive1x` property exists and has a value; `false` otherwise
   */
  public hasPrimitive1x(): boolean {
    return this.hasPrimitive1xElement();
  }

  /**
   * Initialize the `primitive1x` property
   */
  private initPrimitive1x(): void {
    if (!this.hasPrimitive1x()) {
      this.primitive1x = [] as StringType[];
    }
  }

  /**
   * @returns the `choice11` property value as a DataType object; else null
   */
  public getChoice11(): DataType | null {
    return this.choice11;
  }

  /**
   * Assigns the provided DataType object value to the `choice11` property.
   *
   * @decorator `@ChoiceDataTypes('TestDataModel.backbonePrimitive0x.choice11[x]')`
   *
   * @param value - the `choice11` object value
   * @returns this
   */
  @ChoiceDataTypes('TestDataModel.backbonePrimitive0x.choice11[x]')
  public setChoice11(value: DataType): this {
    assertIsDefined<DataType>(value, `TestDataModel.backbonePrimitive0x.choice11[x] is required`);
    // assertFhirType<DataType>(value, DataType) unnecessary because @ChoiceDataTypes decorator ensures proper type/value
    this.choice11 = value;
    return this;
  }

  /**
   * @returns `true` if the `choice11` property exists and has a value; `false` otherwise
   */
  public hasChoice11(): boolean {
    return isDefined<DataType>(this.choice11) && !this.choice11.isEmpty();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'TestDataModel.backbonePrimitive0x';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(this.primitive01, this.primitive0x, this.primitive11, this.primitive1x, this.choice11)
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): TestDataModelPrimitiveComponent {
    const dest = new TestDataModelPrimitiveComponent(null, null, null);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: TestDataModelPrimitiveComponent): void {
    super.copyValues(dest);
    dest.primitive01 = this.primitive01?.copy();
    const primitive0xList = copyListValues<IntegerType>(this.primitive0x);
    dest.primitive0x = primitive0xList.length === 0 ? undefined : primitive0xList;
    dest.primitive11 = this.primitive11 ? this.primitive11.copy() : null;
    const primitive1xList = copyListValues<StringType>(this.primitive1x);
    dest.primitive1x = primitive1xList.length === 0 ? null : primitive1xList;
    dest.choice11 = this.choice11 ? this.choice11.copy() : null;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    // Required class properties exist (have a min cardinality > 0); therefore do not check for this.isEmpty()!
    // if (this.isEmpty()) {
    //   return undefined;
    // }

    let jsonObj = super.toJSON() as JSON.Object | undefined;
    if (jsonObj === undefined) {
      jsonObj = {} as JSON.Object;
    }

    const missingReqdProperties: string[] = [];

    if (this.hasPrimitive01Element()) {
      setFhirPrimitiveJson<fhirDateTime>(this.getPrimitive01Element(), 'primitive01', jsonObj);
    }

    if (this.hasPrimitive0x()) {
      setFhirPrimitiveListJson(this.getPrimitive0xElement(), 'primitive0x', jsonObj);
    }

    if (this.hasPrimitive11Element()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirBoolean>(this.getPrimitive11Element()!, 'primitive11', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backbonePrimitive0x.primitive11`);
    }

    if (this.hasPrimitive1xElement()) {
      setFhirPrimitiveListJson(this.getPrimitive1xElement(), 'primitive1x', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backbonePrimitive0x.primitive1x`);
    }

    if (this.hasChoice11()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPolymorphicValueJson(this.getChoice11()!, 'choice11', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backbonePrimitive0x.choice11[x]`);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_DO_NOT_EXIST} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return jsonObj;
  }
}

/**
 * TestDataModelComplexComponent Class
 *
 * This class represents a FHIR data model for a BackboneElement in a non-existent FHIR StructureDefinition.
 * Its purpose is to provide a test (mock) data model that contains all possible FHIR patterns for complex and
 * open FHIR data types having each possible cardinality type along with a nested BackboneElement data type.
 *
 * This test class will be tested by a comprehensive test suite to ensure all possible FHIR patterns are tested
 * to ensure reliable generated FHIR data models that use all of these possible patterns.
 *
 * Refer to [README-TestModels](./README-TestModels.md) for details.
 */
export class TestDataModelComplexComponent extends BackboneElement {
  constructor(
    complex11: Period | null,
    complex1x: Attachment[] | null,
    open11: DataType | null,
    backboneReference11: TestDataModelReferenceComponent | null,
  ) {
    super();

    this.complex11 = null;
    if (isDefined<Period>(complex11)) {
      this.setComplex11(complex11);
    }

    this.complex1x = null;
    if (isDefinedList<Attachment>(complex1x)) {
      this.setComplex1x(complex1x);
    }

    this.open11 = null;
    if (isDefined<DataType>(open11)) {
      this.setOpen11(open11);
    }

    this.backboneReference11 = null;
    if (isDefined<TestDataModelReferenceComponent>(backboneReference11)) {
      this.setBackboneReference11(backboneReference11);
    }
  }

  public static parse(sourceJson: JSON.Value, optSourceField?: string): TestDataModelComplexComponent | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField) ? optSourceField : 'TestDataModel.backboneComplex01';
    const classJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    const instance = new TestDataModelComplexComponent(null, null, null, null);
    processBackboneElementJson(instance, classJsonObj);

    let fieldName: string;
    let sourceField: string;
    // let primitiveJsonType: 'boolean' | 'number' | 'string';

    const classMetadata: DecoratorMetadataObject | null = TestDataModelComplexComponent[Symbol.metadata];
    const errorMessage = `DecoratorMetadataObject does not exist for TestDataModelComplexComponent`;
    assertIsDefined<DecoratorMetadataObject>(classMetadata, errorMessage);

    const missingReqdProperties: string[] = [];

    fieldName = 'complex01';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const datatype: HumanName | undefined = HumanName.parse(classJsonObj[fieldName]!, sourceField);
      instance.setComplex01(datatype);
    }

    fieldName = 'complex0x';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Address | undefined = Address.parse(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addComplex0x(datatype);
        }
      });
    }

    fieldName = 'complex11';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const datatype: Period | undefined = Period.parse(classJsonObj[fieldName]!, sourceField);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setComplex11(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'complex1x';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Attachment | undefined = Attachment.parse(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype === undefined) {
          missingReqdProperties.push(`${sourceField}[${String(idx)}]`);
        } else {
          instance.addComplex1x(datatype);
        }
      });
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'open11[x]';
    sourceField = `${source}.${fieldName}`;
    const open11: DataType | undefined = parseOpenDataType(classJsonObj, sourceField, fieldName, classMetadata);
    if (open11 === undefined) {
      missingReqdProperties.push(sourceField);
    } else {
      instance.setOpen11(open11);
    }

    fieldName = 'backboneReference11';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      const datatype: TestDataModelReferenceComponent | undefined = TestDataModelReferenceComponent.parse(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        classJsonObj[fieldName]!,
        sourceField,
      );
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setBackboneReference11(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_REQD_IN_JSON} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return instance;
  }

  private complex01?: HumanName | undefined;

  private complex0x?: Address[] | undefined;

  private complex11: Period | null;

  private complex1x: Attachment[] | null;

  @OpenDataTypesMeta('TestDataModel.backboneComplex01.open11[x]')
  private open11: DataType | null;

  private backboneReference11: TestDataModelReferenceComponent | null;

  /**
   * @returns the `complex01` property value as a Signature object if defined; else an empty HumanName object
   */
  public getComplex01(): HumanName {
    return this.complex01 ?? new HumanName();
  }

  /**
   * Assigns the provided Complex01 object value to the `complex01` property.
   *
   * @param value - the `complex01` object value
   * @returns this
   */
  public setComplex01(value: HumanName | undefined): this {
    if (isDefined<HumanName>(value)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.complex01; Provided element is not an instance of HumanName.`;
      assertFhirType<HumanName>(value, HumanName, optErrMsg);
      this.complex01 = value;
    } else {
      this.complex01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `complex01` property exists and has a value; `false` otherwise
   */
  public hasComplex01(): boolean {
    return isDefined<HumanName>(this.complex01) && !this.complex01.isEmpty();
  }

  /**
   * @returns the `complex0x` property value as a Address array
   */
  public getComplex0x(): Address[] {
    return this.complex0x ?? ([] as Address[]);
  }

  /**
   * Assigns the provided Coding array value to the `complex0x` property.
   *
   * @param value - the `complex0x` array value
   * @returns this
   */
  public setComplex0x(value: Address[] | undefined): this {
    if (isDefinedList<Address>(value)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.complex0x; Provided value array has an element that is not an instance of Address.`;
      assertFhirTypeList<Address>(value, Address, optErrMsg);
      this.complex0x = value;
    } else {
      this.complex0x = undefined;
    }
    return this;
  }

  /**
   * Add the provided Address value to the `complex0x` array property.
   *
   * @param value - the `complex0x` value
   * @returns this
   */
  public addComplex0x(value: Address | undefined): this {
    if (isDefined<Address>(value)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.complex0x; Provided element is not an instance of Address.`;
      assertFhirType<Address>(value, Address, optErrMsg);
      this.initComplex0x();
      this.complex0x?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `complex0x` property exists and has a value; `false` otherwise
   */
  public hasComplex0x(): boolean {
    return isDefinedList<Address>(this.complex0x) && this.complex0x.some((item: Address) => !item.isEmpty());
  }

  /**
   * Initialize the `complex0x` property
   */
  private initComplex0x(): void {
    if (!this.hasComplex0x()) {
      this.complex0x = [] as Address[];
    }
  }

  /**
   * @returns the `complex11` property value as a Period object if defined; else null
   */
  public getComplex11(): Period | null {
    return this.complex11;
  }

  /**
   * Assigns the provided Period object value to the `complex11` property.
   *
   * @param value - the `complex11` object value
   * @returns this
   */
  public setComplex11(value: Period): this {
    assertIsDefined<Period>(value, `TestDataModel.backboneComplex01.complex11 is required`);
    const optErrMsg = `Invalid TestDataModel.backboneComplex01.complex11; Provided element is not an instance of Period.`;
    assertFhirType<Period>(value, Period, optErrMsg);
    this.complex11 = value;
    return this;
  }

  /**
   * @returns `true` if the `complex11` property exists and has a value; `false` otherwise
   */
  public hasComplex11(): boolean {
    return isDefined<Period>(this.complex11) && !this.complex11.isEmpty();
  }

  /**
   * @returns the `complex1x` property value as a Attachment array
   */
  public getComplex1x(): Attachment[] {
    return this.complex1x ?? ([] as Attachment[]);
  }

  /**
   * Assigns the provided Attachment array value to the `complex1x` property.
   *
   * @param value - the `complex1x` array value
   * @returns this
   */
  public setComplex1x(value: Attachment[]): this {
    assertIsDefinedList<Attachment>(value, `TestDataModel.backboneComplex01.complex1x is required`);
    const optErrMsg = `Invalid TestDataModel.backboneComplex01.complex1x; Provided value array has an element that is not an instance of Attachment.`;
    assertFhirTypeList<Attachment>(value, Attachment, optErrMsg);
    this.complex1x = value;
    return this;
  }

  /**
   * Add the provided Attachment value to the `complex1x` array property.
   *
   * @param value - the `complex1x` value
   * @returns this
   */
  public addComplex1x(value: Attachment | undefined): this {
    if (isDefined<Attachment>(value)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.complex1x; Provided element is not an instance of Attachment.`;
      assertFhirType<Attachment>(value, Attachment, optErrMsg);
      this.initComplex1x();
      this.complex1x?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `complex1x` property exists and has a value; `false` otherwise
   */
  public hasComplex1x(): boolean {
    return isDefinedList<Attachment>(this.complex1x) && this.complex1x.some((item: Attachment) => !item.isEmpty());
  }

  /**
   * Initialize the `complex1x` property
   */
  private initComplex1x(): void {
    if (!this.hasComplex1x()) {
      this.complex1x = [] as Attachment[];
    }
  }

  /**
   * @returns the `open11` property value as a DataType object; else null
   */
  public getOpen11(): DataType | null {
    return this.open11;
  }

  /**
   * Assigns the provided DataType object value to the `open11` property.
   *
   * @decorator `@OpenDataTypes('TestDataModel.backboneComplex01.open11[x]')`
   *
   * @param value - the `open11` object value
   * @returns this
   */
  @OpenDataTypes('TestDataModel.backboneComplex01.open11[x]')
  public setOpen11(value: DataType): this {
    assertIsDefined<DataType>(value, `TestDataModel.backboneComplex01.open11[x] is required`);
    // assertFhirType<DataType>(value, DataType) unnecessary because @OpenDataTypes decorator ensures proper type/value
    this.open11 = value;
    return this;
  }

  /**
   * @returns `true` if the `open11` property exists and has a value; `false` otherwise
   */
  public hasOpen11(): boolean {
    return isDefined<DataType>(this.open11) && !this.open11.isEmpty();
  }

  /**
   * @returns the `backboneReference11` property value as a TestDataModelReferenceComponent object if defined; else null
   */
  public getBackboneReference11(): TestDataModelReferenceComponent | null {
    return this.backboneReference11;
  }

  /**
   * Assigns the provided TestDataModelReferenceComponent object value to the `backboneReference11` property.
   *
   * @param value - the `backboneReference11` object value
   * @returns this
   */
  public setBackboneReference11(value: TestDataModelReferenceComponent): this {
    assertIsDefined<TestDataModelReferenceComponent>(
      value,
      `TestDataModel.backboneComplex01.backboneReference11 is required`,
    );
    const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11; Provided element is not an instance of TestDataModelReferenceComponent.`;
    assertFhirType<TestDataModelReferenceComponent>(value, TestDataModelReferenceComponent, optErrMsg);
    this.backboneReference11 = value;
    return this;
  }

  /**
   * @returns `true` if the `backboneReference11` property exists and has a value; `false` otherwise
   */
  public hasBackboneReference11(): boolean {
    return isDefined<TestDataModelReferenceComponent>(this.backboneReference11) && !this.backboneReference11.isEmpty();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'TestDataModel.backboneComplex01';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(
        this.complex01,
        this.complex0x,
        this.complex11,
        this.complex1x,
        this.open11,
        this.backboneReference11,
      )
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): TestDataModelComplexComponent {
    const dest = new TestDataModelComplexComponent(null, null, null, null);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: TestDataModelComplexComponent): void {
    super.copyValues(dest);
    dest.complex01 = this.complex01?.copy();
    const complex0xList = copyListValues<Address>(this.complex0x);
    dest.complex0x = complex0xList.length === 0 ? undefined : complex0xList;
    dest.complex11 = this.complex11 ? this.complex11.copy() : null;
    const complex1xList = copyListValues<Attachment>(this.complex1x);
    dest.complex1x = complex1xList.length === 0 ? null : complex1xList;
    dest.open11 = this.open11 ? this.open11.copy() : null;
    dest.backboneReference11 = this.backboneReference11 ? this.backboneReference11.copy() : null;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    // Required class properties exist (have a min cardinality > 0); therefore do not check for this.isEmpty()!
    // if (this.isEmpty()) {
    //   return undefined;
    // }

    let jsonObj = super.toJSON() as JSON.Object | undefined;
    if (jsonObj === undefined) {
      jsonObj = {} as JSON.Object;
    }

    const missingReqdProperties: string[] = [];

    if (this.hasComplex01()) {
      setFhirComplexJson(this.getComplex01(), 'complex01', jsonObj);
    }

    if (this.hasComplex0x()) {
      setFhirComplexListJson(this.getComplex0x(), 'complex0x', jsonObj);
    }

    if (this.hasComplex11()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirComplexJson(this.getComplex11()!, 'complex11', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backboneComplex01.complex11`);
    }

    if (this.hasComplex1x()) {
      setFhirComplexListJson(this.getComplex1x(), 'complex1x', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backboneComplex01.complex1x`);
    }

    if (this.hasOpen11()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPolymorphicValueJson(this.getOpen11()!, 'open11[x]', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backboneComplex01.open11[x]`);
    }

    if (this.hasBackboneReference11()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirBackboneElementJson(this.getBackboneReference11()!, 'backboneReference11', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backboneComplex01.backboneReference11`);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_DO_NOT_EXIST} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return jsonObj;
  }
}

/**
 * TestDataModelReferenceComponent Class
 *
 * This class represents a FHIR data model for a BackboneElement in a non-existent FHIR StructureDefinition.
 * Its purpose is to provide a test (mock) data model that contains all possible FHIR patterns for Reference FHIR
 * data types having each possible cardinality type along with a nested BackboneElement data type.
 *
 * This test class will be tested by a comprehensive test suite to ensure all possible FHIR patterns are tested
 * to ensure reliable generated FHIR data models that use all of these possible patterns.
 *
 * Refer to [README-TestModels](./README-TestModels.md) for details.
 */
export class TestDataModelReferenceComponent extends BackboneElement {
  constructor(
    reference11: Reference | null,
    reference1x: Reference[] | null,
    backboneEnumCode1x: TestDataModelEnumCodeComponent[] | null,
  ) {
    super();

    this.reference11 = null;
    if (isDefined<Reference>(reference11)) {
      this.setReference11(reference11);
    }

    this.reference1x = null;
    if (isDefinedList<Reference>(reference1x)) {
      this.setReference1x(reference1x);
    }

    this.backboneEnumCode1x = null;
    if (isDefinedList<TestDataModelEnumCodeComponent>(backboneEnumCode1x)) {
      this.setBackboneEnumCode1x(backboneEnumCode1x);
    }
  }

  public static parse(sourceJson: JSON.Value, optSourceField?: string): TestDataModelReferenceComponent | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField)
      ? optSourceField
      : 'TestDataModel.backboneComplex01.backboneReference11';
    const classJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    const instance = new TestDataModelReferenceComponent(null, null, null);
    processBackboneElementJson(instance, classJsonObj);

    let fieldName: string;
    let sourceField: string;
    // let primitiveJsonType: 'boolean' | 'number' | 'string';

    const missingReqdProperties: string[] = [];

    fieldName = 'reference01';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const datatype: Reference | undefined = Reference.parse(classJsonObj[fieldName]!, sourceField);
      instance.setReference01(datatype);
    }

    fieldName = 'reference0x';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Reference | undefined = Reference.parse(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addReference0x(datatype);
        }
      });
    }

    fieldName = 'reference11';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const datatype: Reference | undefined = Reference.parse(classJsonObj[fieldName]!, sourceField);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setReference11(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'reference1x';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Reference | undefined = Reference.parse(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype === undefined) {
          missingReqdProperties.push(`${sourceField}[${String(idx)}]`);
        } else {
          instance.addReference1x(datatype);
        }
      });
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'backboneEnumCode1x';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const componentJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      componentJsonArray.forEach((componentJson: JSON.Value, idx) => {
        const component: TestDataModelEnumCodeComponent | undefined = TestDataModelEnumCodeComponent.parse(
          componentJson,
          `${sourceField}[${String(idx)}]`,
        );
        if (component === undefined) {
          missingReqdProperties.push(sourceField);
        } else {
          instance.addBackboneEnumCode1x(component);
        }
      });
    } else {
      missingReqdProperties.push(sourceField);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_REQD_IN_JSON} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return instance;
  }

  private reference01?: Reference | undefined;

  private reference0x?: Reference[] | undefined;

  private reference11: Reference | null;

  private reference1x: Reference[] | null;

  private backboneEnumCode1x: TestDataModelEnumCodeComponent[] | null;

  /**
   * @returns the `reference01` property value as a Reference object; else an empty Reference object
   */
  public getReference01(): Reference {
    return this.reference01 ?? new Reference();
  }

  /**
   * Assigns the provided Reference01 object value to the `reference01` property.
   *
   * @decorator `@ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference01', [])`
   *
   * @param value - the `reference01` object value
   * @returns this
   */
  @ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference01', [])
  public setReference01(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.reference01 = value;
    } else {
      this.reference01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `reference01` property exists and has a value; `false` otherwise
   */
  public hasReference01(): boolean {
    return isDefined<Reference>(this.reference01) && !this.reference01.isEmpty();
  }

  /**
   * @returns the `reference0x` property value as a Reference array
   */
  public getReference0x(): Reference[] {
    return this.reference0x ?? ([] as Reference[]);
  }

  /**
   * Assigns the provided Reference array value to the `reference0x` property.
   *
   * @decorator `@ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference0x', ['Practitioner', 'PractitionerRole', 'Organization'])`
   *
   * @param value - the `reference0x` array value
   * @returns this
   */
  @ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference0x', [
    'Practitioner',
    'PractitionerRole',
    'Organization',
  ])
  public setReference0x(value: Reference[] | undefined): this {
    if (isDefinedList<Reference>(value)) {
      // assertFhirTypeList<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.reference0x = value;
    } else {
      this.reference0x = undefined;
    }
    return this;
  }

  /**
   * Add the provided Reference value to the `reference0x` array property.
   *
   * @decorator `@ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference0x', ['Practitioner', 'PractitionerRole', 'Organization'])`
   *
   * @param value - the `reference0x` value
   * @returns this
   */
  @ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference0x', [
    'Practitioner',
    'PractitionerRole',
    'Organization',
  ])
  public addReference0x(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.initReference0x();
      this.reference0x?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `reference0x` property exists and has a value; `false` otherwise
   */
  public hasReference0x(): boolean {
    return isDefinedList<Reference>(this.reference0x) && this.reference0x.some((item: Reference) => !item.isEmpty());
  }

  /**
   * Initialize the `reference0x` property
   */
  private initReference0x(): void {
    if (!this.hasReference0x()) {
      this.reference0x = [] as Reference[];
    }
  }

  /**
   * @returns the `reference11` property value as a Reference object if defined; else null
   */
  public getReference11(): Reference | null {
    return this.reference11;
  }

  /**
   * Assigns the provided Reference11 object value to the `reference11` property.
   *
   * @decorator `@ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference11', ['Patient', 'Person'])`
   *
   * @param value - the `reference11` object value
   * @returns this
   */
  @ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference11', ['Patient', 'Person'])
  public setReference11(value: Reference): this {
    assertIsDefined<Reference>(value, `TestDataModel.backboneComplex01.backboneReference11.reference11 is required`);
    // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
    this.reference11 = value;
    return this;
  }

  /**
   * @returns `true` if the `reference11` property exists and has a value; `false` otherwise
   */
  public hasReference11(): boolean {
    return isDefined<Reference>(this.reference11) && !this.reference11.isEmpty();
  }

  /**
   * @returns the `reference1x` property value as a Reference array
   */
  public getReference1x(): Reference[] {
    return this.reference1x ?? ([] as Reference[]);
  }

  /**
   * Assigns the provided Reference array value to the `reference1x` property.
   *
   * @decorator `@ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference1x', ['Condition'])`
   *
   * @param value - the `reference1x` array value
   * @returns this
   */
  @ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference1x', ['Condition'])
  public setReference1x(value: Reference[]): this {
    assertIsDefinedList<Reference>(
      value,
      `TestDataModel.backboneComplex01.backboneReference11.reference1x is required`,
    );
    // assertFhirTypeList<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
    this.reference1x = value;
    return this;
  }

  /**
   * Add the provided Reference value to the `reference1x` array property.
   *
   * @decorator `@ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference1x', ['Condition'])`
   *
   * @param value - the `reference1x` value
   * @returns this
   */
  @ReferenceTargets('TestDataModel.backboneComplex01.backboneReference11.reference1x', ['Condition'])
  public addReference1x(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.initReference1x();
      this.reference1x?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `reference1x` property exists and has a value; `false` otherwise
   */
  public hasReference1x(): boolean {
    return isDefinedList<Reference>(this.reference1x) && this.reference1x.some((item: Reference) => !item.isEmpty());
  }

  /**
   * Initialize the `reference1x` property
   */
  private initReference1x(): void {
    if (!this.hasReference1x()) {
      this.reference1x = [] as Reference[];
    }
  }

  /**
   * @returns the `backboneEnumCode1x` property value as a TestDataModelEnumCodeComponent array
   */
  public getBackboneEnumCode1x(): TestDataModelEnumCodeComponent[] {
    return this.backboneEnumCode1x ?? ([] as TestDataModelEnumCodeComponent[]);
  }

  /**
   * Assigns the provided TestDataModelEnumCodeComponent array value to the `backboneEnumCode1x` property.
   *
   * @param value - the `backboneEnumCode1x` array value
   * @returns this
   */
  public setBackboneEnumCode1x(value: TestDataModelEnumCodeComponent[]): this {
    assertIsDefinedList<TestDataModelEnumCodeComponent>(
      value,
      `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x is required`,
    );
    const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x; Provided value array has an element that is not an instance of TestDataModelEnumCodeComponent.`;
    assertFhirTypeList<TestDataModelEnumCodeComponent>(value, TestDataModelEnumCodeComponent, optErrMsg);
    this.backboneEnumCode1x = value;
    return this;
  }

  /**
   * Add the provided TestDataModelEnumCodeComponent value to the `backboneEnumCode1x` array property.
   *
   * @param value - the `backboneEnumCode1x` value
   * @returns this
   */
  public addBackboneEnumCode1x(value: TestDataModelEnumCodeComponent | undefined): this {
    if (isDefined<TestDataModelEnumCodeComponent>(value)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x; Provided element is not an instance of TestDataModelEnumCodeComponent.`;
      assertFhirType<TestDataModelEnumCodeComponent>(value, TestDataModelEnumCodeComponent, optErrMsg);
      this.initBackboneEnumCode1x();
      this.backboneEnumCode1x?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `backboneEnumCode1x` property exists and has a value; `false` otherwise
   */
  public hasBackboneEnumCode1x(): boolean {
    return (
      isDefinedList<TestDataModelEnumCodeComponent>(this.backboneEnumCode1x) &&
      this.backboneEnumCode1x.some((item: TestDataModelEnumCodeComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `backboneEnumCode1x` property
   */
  private initBackboneEnumCode1x(): void {
    if (!this.hasBackboneEnumCode1x()) {
      this.backboneEnumCode1x = [] as TestDataModelEnumCodeComponent[];
    }
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'TestDataModel.backboneComplex01.backboneReference11';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(this.reference01, this.reference0x, this.reference11, this.reference1x, this.backboneEnumCode1x)
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): TestDataModelReferenceComponent {
    const dest = new TestDataModelReferenceComponent(null, null, null);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: TestDataModelReferenceComponent): void {
    super.copyValues(dest);
    dest.reference01 = this.reference01?.copy();
    const reference0xList = copyListValues<Reference>(this.reference0x);
    dest.reference0x = reference0xList.length === 0 ? undefined : reference0xList;
    dest.reference11 = this.reference11 ? this.reference11.copy() : null;
    const reference1xList = copyListValues<Reference>(this.reference1x);
    dest.reference1x = reference1xList.length === 0 ? null : reference1xList;
    const backboneEnumCode1xList = copyListValues<TestDataModelEnumCodeComponent>(this.backboneEnumCode1x);
    dest.backboneEnumCode1x = backboneEnumCode1xList.length === 0 ? null : backboneEnumCode1xList;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    // Required class properties exist (have a min cardinality > 0); therefore do not check for this.isEmpty()!
    // if (this.isEmpty()) {
    //   return undefined;
    // }

    let jsonObj = super.toJSON() as JSON.Object | undefined;
    if (jsonObj === undefined) {
      jsonObj = {} as JSON.Object;
    }

    const missingReqdProperties: string[] = [];

    if (this.hasReference01()) {
      setFhirComplexJson(this.getReference01(), 'reference01', jsonObj);
    }

    if (this.hasReference0x()) {
      setFhirComplexListJson(this.getReference0x(), 'reference0x', jsonObj);
    }

    if (this.hasReference11()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirComplexJson(this.getReference11()!, 'reference11', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backboneComplex01.backboneReference11.reference11`);
    }

    if (this.hasReference1x()) {
      setFhirComplexListJson(this.getReference1x(), 'reference1x', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backboneComplex01.backboneReference11.reference1x`);
    }

    if (this.hasBackboneEnumCode1x()) {
      setFhirBackboneElementListJson(this.getBackboneEnumCode1x(), 'backboneEnumCode1x', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x`);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_DO_NOT_EXIST} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return jsonObj;
  }
}

/**
 * TestDataModelEnumCodeComponent Class
 *
 * This class represents a FHIR data model for a BackboneElement in a non-existent FHIR StructureDefinition.
 * Its purpose is to provide a test (mock) data model that contains all possible FHIR patterns for EnumCodeType FHIR
 * data types having each possible cardinality type along with a nested BackboneElement data type.
 *
 * This test class will be tested by a comprehensive test suite to ensure all possible FHIR patterns are tested
 * to ensure reliable generated FHIR data models that use all of these possible patterns.
 *
 * Refer to [README-TestModels](./README-TestModels.md) for details.
 */
export class TestDataModelEnumCodeComponent extends BackboneElement {
  constructor(
    enumCode11: EnumCodeType | CodeType | fhirCode | null,
    enumCode1x: EnumCodeType[] | CodeType[] | fhirCode[] | null,
  ) {
    super();

    this.taskCodeEnum = new TaskCodeEnum();

    this.contributorTypeEnum = new ContributorTypeEnum();

    this.taskStatusEnum = new TaskStatusEnum();
    this.enumCode11 = constructorCodeValueAsEnumCodeType<TaskStatusEnum>(
      enumCode11,
      TaskStatusEnum,
      this.taskStatusEnum,
      'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11',
    );

    this.consentStateEnum = new ConsentStateEnum();
    this.enumCode1x = constructorCodeValueAsEnumCodeTypeList<ConsentStateEnum>(
      enumCode1x,
      ConsentStateEnum,
      this.consentStateEnum,
      'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x',
    );
  }

  public static parse(sourceJson: JSON.Value, optSourceField?: string): TestDataModelEnumCodeComponent | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField)
      ? optSourceField
      : 'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x';
    const classJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    const instance = new TestDataModelEnumCodeComponent(null, null);
    processBackboneElementJson(instance, classJsonObj);

    let fieldName: string;
    let sourceField: string;
    let primitiveJsonType: 'boolean' | 'number' | 'string';

    const missingReqdProperties: string[] = [];

    fieldName = 'enumCode01';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, primitiveJsonType);
      const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
      instance.setEnumCode01Element(datatype);
    }

    fieldName = 'enumCode0x';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in classJsonObj) {
      const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(
        classJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      dataJsonArray.forEach((dataJson: PrimitiveTypeJson) => {
        const datatype: CodeType | undefined = parseCodeType(dataJson.dtJson, dataJson.dtSiblingJson);
        if (datatype !== undefined) {
          instance.addEnumCode0xElement(datatype);
        }
      });
    }

    fieldName = 'enumCode11';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, primitiveJsonType);
      const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setEnumCode11Element(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'enumCode1x';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in classJsonObj) {
      const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(
        classJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      dataJsonArray.forEach((dataJson: PrimitiveTypeJson, idx) => {
        const datatype: CodeType | undefined = parseCodeType(dataJson.dtJson, dataJson.dtSiblingJson);
        if (datatype === undefined) {
          missingReqdProperties.push(`${sourceField}[${String(idx)}]`);
        } else {
          instance.addEnumCode1xElement(datatype);
        }
      });
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'backbonePrimitive0x';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const componentJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      componentJsonArray.forEach((componentJson: JSON.Value, idx) => {
        const component: TestDataModelPrimitiveComponent | undefined = TestDataModelPrimitiveComponent.parse(
          componentJson,
          `${sourceField}[${String(idx)}]`,
        );
        if (component !== undefined) {
          instance.addBackbonePrimitive0x(component);
        }
      });
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_REQD_IN_JSON} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return instance;
  }

  private readonly taskCodeEnum: TaskCodeEnum;
  private readonly contributorTypeEnum: ContributorTypeEnum;
  private readonly taskStatusEnum: TaskStatusEnum;
  private readonly consentStateEnum: ConsentStateEnum;

  private enumCode01?: EnumCodeType | undefined;

  private enumCode0x?: EnumCodeType[] | undefined;

  private enumCode11: EnumCodeType | null;

  private enumCode1x: EnumCodeType[] | null;

  private backbonePrimitive0x?: TestDataModelPrimitiveComponent[] | undefined;

  /**
   * @returns the `enumCode01` property value as a EnumCodeType if defined; else undefined
   */
  public getEnumCode01EnumType(): EnumCodeType | undefined {
    return this.enumCode01;
  }

  /**
   * Assigns the provided EnumCodeType value to the `enumCode01` property.
   *
   * @param enumType - the `enumCode01` value
   * @returns this
   */
  public setEnumCode01EnumType(enumType: EnumCodeType | undefined): this {
    if (isDefined<EnumCodeType>(enumType)) {
      const errMsgPrefix = 'Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode01';
      assertEnumCodeType<TaskCodeEnum>(enumType, TaskCodeEnum, errMsgPrefix);
      this.enumCode01 = enumType;
    } else {
      this.enumCode01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `enumCode01` property exists and has a value; `false` otherwise
   */
  public hasEnumCode01EnumType(): boolean {
    return (
      isDefined<EnumCodeType>(this.enumCode01) &&
      !this.enumCode01.isEmpty() &&
      this.enumCode01.fhirCodeEnumeration.length > 0
    );
  }

  /**
   * @returns the `enumCode01` property value as a CodeType if defined; else undefined
   */
  public getEnumCode01Element(): CodeType | undefined {
    if (this.enumCode01 === undefined) {
      return undefined;
    }
    return this.enumCode01 as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `enumCode01` property.
   *
   * @param element - the `enumCode01` value
   * @returns this
   */
  public setEnumCode01Element(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode01; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.enumCode01 = new EnumCodeType(element, this.taskCodeEnum);
    } else {
      this.enumCode01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `enumCode01` property exists and has a value; `false` otherwise
   */
  public hasEnumCode01Element(): boolean {
    return this.hasEnumCode01EnumType();
  }

  /**
   * @returns the `enumCode01` property value as a fhirCode if defined; else undefined
   */
  public getEnumCode01(): fhirCode | undefined {
    if (this.enumCode01 === undefined) {
      return undefined;
    }
    return this.enumCode01.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `enumCode01` property.
   *
   * @param value - the `enumCode01` value
   * @returns this
   */
  public setEnumCode01(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode01; Provided value is not an instance of fhirCode.`;
      this.enumCode01 = new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.taskCodeEnum);
    } else {
      this.enumCode01 = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `enumCode01` property exists and has a value; `false` otherwise
   */
  public hasEnumCode01(): boolean {
    return this.hasEnumCode01EnumType();
  }

  /**
   * @returns the `enumCode0x` property value as a EnumCodeType array
   */
  public getEnumCode0xEnumType(): EnumCodeType[] {
    return this.enumCode0x ?? ([] as EnumCodeType[]);
  }

  /**
   * Assigns the provided EnumCodeType array value to the `enumCode0x` property.
   *
   * @param enumType - the `enumCode0x` array value
   * @returns this
   */
  public setEnumCode0xEnumType(enumType: EnumCodeType[] | undefined): this {
    if (isDefinedList<EnumCodeType>(enumType)) {
      const errMsgPrefix = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x`;
      assertEnumCodeTypeList<ContributorTypeEnum>(enumType, ContributorTypeEnum, errMsgPrefix);
      this.enumCode0x = enumType;
    } else {
      this.enumCode0x = undefined;
    }
    return this;
  }

  /**
   * Add the provided EnumCodeType value to the `enumCode0x` array property.
   *
   * @param enumType - the `enumCode0x` value
   * @returns this
   */
  public addEnumCode0xEnumType(enumType: EnumCodeType | undefined): this {
    if (isDefined<EnumCodeType>(enumType)) {
      const errMsgPrefix = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x`;
      assertEnumCodeType<ContributorTypeEnum>(enumType, ContributorTypeEnum, errMsgPrefix);
      this.initEnumCode0x();
      this.enumCode0x?.push(enumType);
    }
    return this;
  }

  /**
   * @returns `true` if the `enumCode0x` property exists and has a value; `false` otherwise
   */
  public hasEnumCode0xEnumType(): boolean {
    return (
      isDefinedList<EnumCodeType>(this.enumCode0x) &&
      this.enumCode0x.some((item: EnumCodeType) => !item.isEmpty()) &&
      this.enumCode0x.every((item: EnumCodeType) => item.fhirCodeEnumeration.length > 0)
    );
  }

  /**
   * @returns the `enumCode0x` property value as a CodeType array
   */
  public getEnumCode0xElement(): CodeType[] {
    if (this.enumCode0x === undefined) {
      return [] as CodeType[];
    }
    return this.enumCode0x as CodeType[];
  }

  /**
   * Assigns the provided PrimitiveType array value to the `enumCode0x` property.
   *
   * @param element - the `enumCode0x` array value
   * @returns this
   */
  public setEnumCode0xElement(element: CodeType[] | undefined): this {
    if (isDefinedList<CodeType>(element)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x; Provided element array has an element that is not an instance of CodeType.`;
      assertFhirTypeList<CodeType>(element, CodeType, optErrMsg);
      const enumCodeTypes = [] as EnumCodeType[];
      element.forEach((type: CodeType) => {
        enumCodeTypes.push(new EnumCodeType(type, this.contributorTypeEnum));
      });
      this.enumCode0x = enumCodeTypes;
    } else {
      this.enumCode0x = undefined;
    }
    return this;
  }

  /**
   * Add the provided PrimitiveType value to the `enumCode0x` array property.
   *
   * @param element - the `enumCode0x` value
   * @returns this
   */
  public addEnumCode0xElement(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.initEnumCode0x();
      this.enumCode0x?.push(new EnumCodeType(element, this.contributorTypeEnum));
    }
    return this;
  }

  /**
   * @returns `true` if the `enumCode0x` property exists and has a value; `false` otherwise
   */
  public hasEnumCode0xElement(): boolean {
    return this.hasEnumCode0xEnumType();
  }

  /**
   * @returns the `enumCode0x` property value as a fhirCode array
   */
  public getEnumCode0x(): fhirCode[] {
    if (this.enumCode0x === undefined) {
      return [] as fhirCode[];
    }
    const values = [] as fhirCode[];
    for (const item of this.enumCode0x) {
      values.push(item.fhirCode.code);
    }
    return values;
  }

  /**
   * Assigns the provided primitive value array to the `enumCode0x` property.
   *
   * @param value - the `enumCode0x` value array
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setEnumCode0x(value: fhirCode[] | undefined): this {
    if (isDefinedList<fhirCode>(value)) {
      const enumCodeTypes = [] as EnumCodeType[];
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x; Provided value is not an instance of fhirCode.`;
      value.forEach((val: fhirCode) => {
        enumCodeTypes.push(
          new EnumCodeType(parseFhirPrimitiveData(val, fhirCodeSchema, optErrMsg), this.contributorTypeEnum),
        );
      });
      this.enumCode0x = enumCodeTypes;
    } else {
      this.enumCode0x = undefined;
    }
    return this;
  }

  /**
   * Add the provided primitive value to the `enumCode0x` array property.
   *
   * @param value - the `enumCode0x` value
   * @returns this
   */
  public addEnumCode0x(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      this.initEnumCode0x();
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x; Provided value is not an instance of fhirCode.`;
      this.enumCode0x?.push(
        new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.contributorTypeEnum),
      );
    }
    return this;
  }

  /**
   * @returns `true` if the `enumCode0x` property exists and has a value; `false` otherwise
   */
  public hasEnumCode0x(): boolean {
    return this.hasEnumCode0xEnumType();
  }

  /**
   * Initialize the enumCode0x property
   */
  private initEnumCode0x(): void {
    if (!this.hasEnumCode0xEnumType()) {
      this.enumCode0x = [] as EnumCodeType[];
    }
  }

  /**
   * @returns the `enumCode11` property value as a EnumCodeType if defined; else null
   */
  public getEnumCode11EnumType(): EnumCodeType | null {
    return this.enumCode11;
  }

  /**
   * Assigns the provided EnumCodeType value to the `enumCode11` property.
   *
   * @param enumType - the `enumCode11` value
   * @returns this
   */
  public setEnumCode11EnumType(enumType: EnumCodeType): this {
    assertIsDefined<EnumCodeType>(
      enumType,
      `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required`,
    );
    const errMsgPrefix = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11`;
    assertEnumCodeType<TaskStatusEnum>(enumType, TaskStatusEnum, errMsgPrefix);
    this.enumCode11 = enumType;
    return this;
  }

  /**
   * @returns `true` if the `enumCode11` property exists and has a value; `false` otherwise
   */
  public hasEnumCode11EnumType(): boolean {
    return (
      isDefined<EnumCodeType>(this.enumCode11) &&
      !this.enumCode11.isEmpty() &&
      this.enumCode11.fhirCodeEnumeration.length > 0
    );
  }

  /**
   * @returns the `enumCode11` property value as a CodeType if defined; else null
   */
  public getEnumCode11Element(): CodeType | null {
    if (this.enumCode11 === null) {
      return null;
    }
    return this.enumCode11 as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `enumCode11` property.
   *
   * @param element - the `enumCode11` value
   * @returns this
   */
  public setEnumCode11Element(element: CodeType): this {
    assertIsDefined<CodeType>(
      element,
      `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required`,
    );
    const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11; Provided value is not an instance of CodeType.`;
    assertFhirType<CodeType>(element, CodeType, optErrMsg);
    this.enumCode11 = new EnumCodeType(element, this.taskStatusEnum);
    return this;
  }

  /**
   * @returns `true` if the `enumCode11` property exists and has a value; `false` otherwise
   */
  public hasEnumCode11Element(): boolean {
    return this.hasEnumCode11EnumType();
  }

  /**
   * @returns the `enumCode11` property value as a fhirCode if defined; else null
   */
  public getEnumCode11(): fhirCode | null {
    if (this.enumCode11 === null) {
      return null;
    }
    return this.enumCode11.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `enumCode11` property.
   *
   * @param value - the `enumCode11` value
   * @returns this
   */
  public setEnumCode11(value: fhirCode): this {
    assertIsDefined<fhirCode>(
      value,
      `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required`,
    );
    const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 (${String(value)})`;
    this.enumCode11 = new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.taskStatusEnum);
    return this;
  }

  /**
   * @returns `true` if the `enumCode11` property exists and has a value; `false` otherwise
   */
  public hasEnumCode11(): boolean {
    return this.hasEnumCode11EnumType();
  }

  /**
   * @returns the `enumCode1x` property value as a EnumCodeType array
   */
  public getEnumCode1xEnumType(): EnumCodeType[] {
    return this.enumCode1x ?? ([] as EnumCodeType[]);
  }

  /**
   * Assigns the provided EnumCodeType array value to the `enumCode1x` property.
   *
   * @param enumType - the `enumCode1x` array value
   * @returns this
   */
  public setEnumCode1xEnumType(enumType: EnumCodeType[]): this {
    assertIsDefinedList<EnumCodeType>(
      enumType,
      `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required`,
    );
    const errMsgPrefix = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x`;
    assertEnumCodeTypeList<ConsentStateEnum>(enumType, ConsentStateEnum, errMsgPrefix);
    this.enumCode1x = enumType;
    return this;
  }

  /**
   * Add the provided EnumCodeType value to the `enumCode1x` array property.
   *
   * @param enumType - the `enumCode1x` value
   * @returns this
   */
  public addEnumCode1xEnumType(enumType: EnumCodeType | undefined): this {
    if (isDefined<EnumCodeType>(enumType)) {
      const errMsgPrefix = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x)`;
      assertEnumCodeType<ConsentStateEnum>(enumType, ConsentStateEnum, errMsgPrefix);
      this.initEnumCode1x();
      this.enumCode1x?.push(enumType);
    }
    return this;
  }

  /**
   * @returns `true` if the `enumCode1x` property exists and has a value; `false` otherwise
   */
  public hasEnumCode1xEnumType(): boolean {
    return (
      isDefinedList<EnumCodeType>(this.enumCode1x) &&
      this.enumCode1x.some((item: EnumCodeType) => !item.isEmpty()) &&
      this.enumCode1x.every((item: EnumCodeType) => item.fhirCodeEnumeration.length > 0)
    );
  }

  /**
   * @returns the `enumCode1x` property value as a CodeType array
   */
  public getEnumCode1xElement(): CodeType[] {
    if (this.enumCode1x === null) {
      return [] as CodeType[];
    }
    return this.enumCode1x as CodeType[];
  }

  /**
   * Assigns the provided PrimitiveType array value to the `enumCode1x` property.
   *
   * @param element - the `enumCode1x` array value
   * @returns this
   */
  public setEnumCode1xElement(element: CodeType[]): this {
    assertIsDefinedList<CodeType>(
      element,
      `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required`,
    );
    const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Provided element array has an element that is not an instance of CodeType.`;
    assertFhirTypeList<CodeType>(element, CodeType, optErrMsg);
    const enumCodeTypes = [] as EnumCodeType[];
    element.forEach((type: CodeType) => {
      enumCodeTypes.push(new EnumCodeType(type, this.consentStateEnum));
    });
    this.enumCode1x = enumCodeTypes;
    return this;
  }

  /**
   * Add the provided PrimitiveType value to the `enumCode1x` array property.
   *
   * @param element - the `enumCode1x` value
   * @returns this
   */
  public addEnumCode1xElement(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.initEnumCode1x();
      this.enumCode1x?.push(new EnumCodeType(element, this.consentStateEnum));
    }
    return this;
  }

  /**
   * @returns `true` if the `enumCode1x` property exists and has a value; `false` otherwise
   */
  public hasEnumCode1xElement(): boolean {
    return this.hasEnumCode1xEnumType();
  }

  /**
   * @returns the `enumCode1x` property value as a fhirCode array
   */
  public getEnumCode1x(): fhirCode[] {
    if (this.enumCode1x === null) {
      return [] as fhirCode[];
    }
    const values = [] as fhirCode[];
    for (const item of this.enumCode1x) {
      values.push(item.fhirCode.code);
    }
    return values;
  }

  /**
   * Assigns the provided primitive value array to the `enumCode1x` property.
   *
   * @param value - the `enumCode1x` value array
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setEnumCode1x(value: fhirCode[]): this {
    assertIsDefinedList<fhirCode>(
      value,
      `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required`,
    );
    const enumCodeTypes = [] as EnumCodeType[];
    const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Provided value is not an instance of fhirCode.`;
    value.forEach((val: fhirCode) => {
      enumCodeTypes.push(
        new EnumCodeType(parseFhirPrimitiveData(val, fhirCodeSchema, optErrMsg), this.consentStateEnum),
      );
    });
    this.enumCode1x = enumCodeTypes;
    return this;
  }

  /**
   * Add the provided primitive value to the `enumCode1x` array property.
   *
   * @param value - the `enumCode1x` value
   * @returns this
   */
  public addEnumCode1x(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      this.initEnumCode1x();
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Provided value is not an instance of fhirCode.`;
      this.enumCode1x?.push(
        new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.consentStateEnum),
      );
    }
    return this;
  }

  /**
   * @returns `true` if the `enumCode1x` property exists and has a value; `false` otherwise
   */
  public hasEnumCode1x(): boolean {
    return this.hasEnumCode1xEnumType();
  }

  /**
   * Initialize the enumCode1x property
   */
  private initEnumCode1x(): void {
    if (!this.hasEnumCode1xEnumType()) {
      this.enumCode1x = [] as EnumCodeType[];
    }
  }

  /**
   * @returns the `backbonePrimitive0x` property value as a TestDataModelPrimitiveComponent array
   */
  public getBackbonePrimitive0x(): TestDataModelPrimitiveComponent[] {
    return this.backbonePrimitive0x ?? ([] as TestDataModelPrimitiveComponent[]);
  }

  /**
   * Assigns the provided TestDataModelPrimitiveComponent array value to the `backbonePrimitive0x` property.
   *
   * @param value - the `backbonePrimitive0x` array value
   * @returns this
   */
  public setBackbonePrimitive0x(value: TestDataModelPrimitiveComponent[] | undefined): this {
    if (isDefinedList<TestDataModelPrimitiveComponent>(value)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.backbonePrimitive0x; Provided value array has an element that is not an instance of TestDataModelPrimitiveComponent.`;
      assertFhirTypeList<TestDataModelPrimitiveComponent>(value, TestDataModelPrimitiveComponent, optErrMsg);
      this.backbonePrimitive0x = value;
    } else {
      this.backbonePrimitive0x = undefined;
    }
    return this;
  }

  /**
   * Add the provided TestDataModelPrimitiveComponent value to the `backbonePrimitive0x` array property.
   *
   * @param value - the `backbonePrimitive0x` value
   * @returns this
   */
  public addBackbonePrimitive0x(value: TestDataModelPrimitiveComponent | undefined): this {
    if (isDefined<TestDataModelPrimitiveComponent>(value)) {
      const optErrMsg = `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.backbonePrimitive0x; Provided element is not an instance of TestDataModelPrimitiveComponent.`;
      assertFhirType<TestDataModelPrimitiveComponent>(value, TestDataModelPrimitiveComponent, optErrMsg);
      this.initBackbonePrimitive0x();
      this.backbonePrimitive0x?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `backbonePrimitive0x` property exists and has a value; `false` otherwise
   */
  public hasBackbonePrimitive0x(): boolean {
    return (
      isDefinedList<TestDataModelPrimitiveComponent>(this.backbonePrimitive0x) &&
      this.backbonePrimitive0x.some((item: TestDataModelPrimitiveComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `backbonePrimitive0x` property
   */
  private initBackbonePrimitive0x(): void {
    if (!this.hasBackbonePrimitive0x()) {
      this.backbonePrimitive0x = [] as TestDataModelPrimitiveComponent[];
    }
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(this.enumCode01, this.enumCode0x, this.enumCode11, this.enumCode1x, this.backbonePrimitive0x)
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): TestDataModelEnumCodeComponent {
    const dest = new TestDataModelEnumCodeComponent(null, null);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: TestDataModelEnumCodeComponent): void {
    super.copyValues(dest);
    dest.enumCode01 = this.enumCode01?.copy();
    const enumCode0xList = copyListValues<EnumCodeType>(this.enumCode0x);
    dest.enumCode0x = enumCode0xList.length === 0 ? undefined : enumCode0xList;
    dest.enumCode11 = this.enumCode11 ? this.enumCode11.copy() : null;
    const enumCode1xList = copyListValues<EnumCodeType>(this.enumCode1x);
    dest.enumCode1x = enumCode1xList.length === 0 ? null : enumCode1xList;
    const backbonePrimitive0xList = copyListValues<TestDataModelPrimitiveComponent>(this.backbonePrimitive0x);
    dest.backbonePrimitive0x = backbonePrimitive0xList.length === 0 ? undefined : backbonePrimitive0xList;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    // Required class properties exist (have a min cardinality > 0); therefore do not check for this.isEmpty()!
    // if (this.isEmpty()) {
    //   return undefined;
    // }

    let jsonObj = super.toJSON() as JSON.Object | undefined;
    if (jsonObj === undefined) {
      jsonObj = {} as JSON.Object;
    }

    const missingReqdProperties: string[] = [];

    if (this.hasEnumCode01Element()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getEnumCode01Element()!, 'enumCode01', jsonObj);
    }

    if (this.hasEnumCode0xElement()) {
      setFhirPrimitiveListJson<fhirCode>(this.getEnumCode0xElement(), 'enumCode0x', jsonObj);
    }

    if (this.hasEnumCode11Element()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getEnumCode11Element()!, 'enumCode11', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11`);
    }

    if (this.hasEnumCode1xElement()) {
      setFhirPrimitiveListJson<fhirCode>(this.getEnumCode1xElement(), 'enumCode1x', jsonObj);
    } else {
      missingReqdProperties.push(`TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x`);
    }

    if (this.hasBackbonePrimitive0x()) {
      setFhirBackboneElementListJson(this.getBackbonePrimitive0x(), 'backbonePrimitive0x', jsonObj);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_DO_NOT_EXIST} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
