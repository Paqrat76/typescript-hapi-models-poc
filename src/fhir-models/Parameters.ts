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
  PrimitiveType,
  setFhirBackboneElementListJson,
  setFhirPrimitiveJson,
  setPolymorphicValueJson,
} from '@src/fhir-core/base-models/core-fhir-models';
import { FhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { assertFhirResourceType, Resource, setFhirResourceJson } from '@src/fhir-core/base-models/Resource';
import { REQUIRED_PROPERTIES_DO_NOT_EXIST, REQUIRED_PROPERTIES_REQD_IN_JSON } from '@src/fhir-core/constants';
import {
  fhirString,
  fhirStringSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { isEmpty } from '@src/fhir-core/utility/common-util';
import { OpenDataTypesMeta } from '@src/fhir-core/utility/decorators';
import {
  assertFhirResourceTypeJson,
  getPrimitiveTypeJson,
  parseOpenDataType,
  parseStringType,
  processBackboneElementJson,
  processResourceJson,
} from '@src/fhir-core/utility/fhir-parsers';
import { copyListValues, isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import {
  assertFhirType,
  assertFhirTypeList,
  assertIsDefined,
  isDefined,
  isDefinedList,
} from '@src/fhir-core/utility/type-guards';
import { parseInlineResource } from '@src/fhir-models/fhir-contained-resource-parser';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Parameters Class
 *
 * @remarks
 * This resource is a non-persisted resource used to pass information into and back from an [operation](https://hl7.org/fhir/R4/operations.html). It has no other use, and there is no RESTful endpoint associated with it.
 *
 * **FHIR Specification**
 * - **Short:** Operation Request or Response
 * - **Definition:** This resource is a non-persisted resource used to pass information into and back from an [operation](https://hl7.org/fhir/R4/operations.html). It has no other use, and there is no RESTful endpoint associated with it.
 * - **Comment:** The parameters that may be used are defined by the OperationDefinition resource.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Parameters
 *
 * @category Resource Models
 * @see [FHIR Parameters](http://hl7.org/fhir/StructureDefinition/Parameters)
 */
export class Parameters extends Resource implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Parse the provided `Parameters` json to instantiate the Parameters model.
   *
   * @param sourceJson - JSON representing FHIR `Parameters`
   * @param optSourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Parameters
   * @returns Parameters data model or undefined for `Parameters`
   */
  public static override parse(sourceJson: JSON.Value, optSourceField?: string): Parameters | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField) ? optSourceField : 'Parameters';
    const classJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    assertFhirResourceTypeJson(classJsonObj, 'Parameters');
    const instance = new Parameters();
    processResourceJson(instance, classJsonObj);

    let fieldName: string;
    let sourceField: string;
    //let primitiveJsonType: 'boolean' | 'number' | 'string';

    // eslint-disable-next-line prefer-const
    fieldName = 'parameter';
    // eslint-disable-next-line prefer-const
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const componentJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      componentJsonArray.forEach((componentJson: JSON.Value, idx) => {
        const component: ParametersParameterComponent | undefined = ParametersParameterComponent.parse(
          componentJson,
          `${sourceField}[${String(idx)}]`,
        );
        if (component !== undefined) {
          instance.addParameter(component);
        }
      });
    }

    return instance;
  }

  /**
   * Parameters.parameter Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Operation Parameter
   * - **Definition:** A parameter passed to or received from the operation.
   * - **FHIR Type:** `BackboneElement`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private parameter?: ParametersParameterComponent[] | undefined;

  /**
   * {@inheritDoc Resource.resourceType}
   */
  public resourceType(): FhirResourceType {
    return this.fhirType() as FhirResourceType;
  }

  /**
   * @returns the `parameter` property value as a ParametersParameterComponent array
   */
  public getParameter(): ParametersParameterComponent[] {
    return this.parameter ?? ([] as ParametersParameterComponent[]);
  }

  /**
   * Assigns the provided ParametersParameterComponent array value to the `parameter` property.
   *
   * @param value - the `parameter` array value
   * @returns this
   */
  public setParameter(value: ParametersParameterComponent[] | undefined): this {
    if (isDefinedList<ParametersParameterComponent>(value)) {
      const optErrMsg = `Invalid Parameters.parameter; Provided value array has an element that is not an instance of ParametersParameterComponent.`;
      assertFhirTypeList<ParametersParameterComponent>(value, ParametersParameterComponent, optErrMsg);
      this.parameter = value;
    } else {
      this.parameter = undefined;
    }
    return this;
  }

  /**
   * Add the provided ParametersParameterComponent value to the `parameter` array property.
   *
   * @param value - the `parameter` value
   * @returns this
   */
  public addParameter(value: ParametersParameterComponent | undefined): this {
    if (isDefined<ParametersParameterComponent>(value)) {
      const optErrMsg = `Invalid Parameters.parameter; Provided element is not an instance of ParametersParameterComponent.`;
      assertFhirType<ParametersParameterComponent>(value, ParametersParameterComponent, optErrMsg);
      this.initParameter();
      this.parameter?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `parameter` property exists and has a value; `false` otherwise
   */
  public hasParameter(): boolean {
    return (
      isDefinedList<ParametersParameterComponent>(this.parameter) &&
      this.parameter.some((item: ParametersParameterComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `parameter` property
   */
  private initParameter(): void {
    this.parameter ??= [] as ParametersParameterComponent[];
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public fhirType(): string {
    return 'Parameters';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.parameter);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Parameters {
    const dest = new Parameters();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: Parameters): void {
    super.copyValues(dest);
    const parameterList = copyListValues<ParametersParameterComponent>(this.parameter);
    dest.parameter = parameterList.length === 0 ? undefined : parameterList;
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

    if (this.hasParameter()) {
      setFhirBackboneElementListJson(this.getParameter(), 'parameter', jsonObj);
    }

    // jsonObj will always have, at least, the 'resourceType' property from Resource.
    // If that is all jsonObj has, return undefined.
    return Object.keys(jsonObj).length > 1 ? jsonObj : undefined;
  }
}

/**
 * ParametersParameterComponent Subclass for `Parameters.parameter`
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** Operation Parameter
 * - **Definition:** A parameter passed to or received from the operation.
 *
 * @category Resource Models
 * @see [FHIR Parameters](http://hl7.org/fhir/StructureDefinition/Parameters)
 */
export class ParametersParameterComponent extends BackboneElement {
  /**
   * @param name - Name from the definition
   */
  constructor(name: StringType | fhirString | null) {
    super();

    this.name = null;
    if (isDefined<StringType | fhirString>(name)) {
      if (name instanceof PrimitiveType) {
        this.setNameElement(name);
      } else {
        this.setName(name);
      }
    }
  }

  /**
   * Parse the provided `Parameters.parameter` json to instantiate the ParametersParameterComponent data model.
   *
   * @param sourceJson - JSON representing FHIR `Parameters.parameter`
   * @param optSourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Parameters.parameter
   * @returns ParametersParameterComponent data model or undefined for `Parameters.parameter`
   */
  public static parse(sourceJson: JSON.Value, optSourceField?: string): ParametersParameterComponent | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField) ? optSourceField : 'Parameters.parameter';
    const classJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    const instance = new ParametersParameterComponent(null);
    processBackboneElementJson(instance, classJsonObj);

    let fieldName: string;
    let sourceField: string;
    let primitiveJsonType: 'boolean' | 'number' | 'string';

    const classMetadata: DecoratorMetadataObject | null = ParametersParameterComponent[Symbol.metadata];
    const errorMessage = `DecoratorMetadataObject does not exist for ParametersParameterComponent`;
    assertIsDefined<DecoratorMetadataObject>(classMetadata, errorMessage);

    const missingReqdProperties: string[] = [];

    fieldName = 'name';
    sourceField = `${source}.${fieldName}`;
    // eslint-disable-next-line prefer-const
    primitiveJsonType = 'string';
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, primitiveJsonType);
      const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setNameElement(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'value[x]';
    sourceField = `${source}.${fieldName}`;
    const value: DataType | undefined = parseOpenDataType(classJsonObj, sourceField, fieldName, classMetadata);
    instance.setValue(value);

    fieldName = 'resource';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      const datatype: Resource | undefined = parseInlineResource(classJsonObj[fieldName], sourceField);
      instance.setResource(datatype);
    }

    fieldName = 'part';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const componentJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      componentJsonArray.forEach((componentJson: JSON.Value, idx) => {
        const component: ParametersParameterComponent | undefined = ParametersParameterComponent.parse(
          componentJson,
          `${sourceField}[${String(idx)}]`,
        );
        if (component !== undefined) {
          instance.addPart(component);
        }
      });
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_REQD_IN_JSON} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return instance;
  }

  /**
   * Parameters.parameter.name Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Name from the definition
   * - **Definition:** The name of the parameter (reference to the operation definition).
   * - **FHIR Type:** `string`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private name: StringType | null;

  /**
   * Parameters.parameter.value[x] Element
   *
   * @decorator `@OpenDataTypesMeta('Parameters.parameter.value[x]')`
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** If parameter is a data type
   * - **Definition:** If the parameter is a data type.
   * - **FHIR Types:**
   *   - [Open Type](https://hl7.org/fhir/r4/datatypes.html#open)
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  // TODO: Document logic for these combinations for @OpenDataTypesMeta()
  @OpenDataTypesMeta('Parameters.parameter.value[x]')
  @OpenDataTypesMeta('Parameters.parameter[i].value[x]')
  @OpenDataTypesMeta('Parameters.parameter.part[i].value[x]')
  @OpenDataTypesMeta('Parameters.parameter[i].part[i].value[x]')
  private value?: DataType | undefined;

  /**
   * Parameters.parameter.resource Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** If parameter is a whole resource
   * - **Definition:** If the parameter is a whole resource.
   * - **Comment:** When resolving references in resources, the operation definition may specify how references may be resolved between parameters. If a reference cannot be resolved between the parameters, the application should fall back to it's general resource resolution methods.
   * - **FHIR Type:** `Resource`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private resource?: Resource | undefined;

  /**
   * Parameters.parameter.part Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Named part of a multi-part parameter
   * - **Definition:** A named part of a multi-part parameter.
   * - **Comment:** Only one level of nested parameters is allowed.
   * - **FHIR Type:** `Parameters.parameter`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private part?: ParametersParameterComponent[] | undefined;

  /**
   * @returns the `name` property value as a PrimitiveType
   */
  public getNameElement(): StringType | null {
    return this.name;
  }

  /**
   * Assigns the provided PrimitiveType value to the `name` property.
   *
   * @param element - the `name` value
   * @returns this
   */
  public setNameElement(element: StringType): this {
    assertIsDefined<StringType>(element, `Parameters.parameter.name is required`);
    const optErrMsg = `Invalid Parameters.parameter.name; Provided value is not an instance of StringType.`;
    assertFhirType<StringType>(element, StringType, optErrMsg);
    this.name = element;
    return this;
  }

  /**
   * @returns `true` if the `name` property exists and has a value; `false` otherwise
   */
  public hasNameElement(): boolean {
    return isDefined<StringType>(this.name) && !this.name.isEmpty();
  }

  /**
   * @returns the `name` property value as a primitive value
   */
  public getName(): fhirString | null {
    if (this.name?.getValue() === undefined) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.name.getValue()!;
  }

  /**
   * Assigns the provided primitive value to the `name` property.
   *
   * @param value - the `name` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setName(value: fhirString): this {
    assertIsDefined<fhirString>(value, `Parameters.parameter.name is required`);
    const optErrMsg = `Invalid Parameters.parameter.name (${String(value)})`;
    this.name = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `name` property exists and has a value; `false` otherwise
   */
  public hasName(): boolean {
    return this.hasNameElement();
  }

  /**
   * @returns the `value` property value as a DataType object
   */
  public getValue(): DataType | undefined {
    return this.value;
  }

  /**
   * Assigns the provided DataType object value to the `value` property.
   *
   * @decorator `@OpenDataTypes('Parameters.parameter.value[x]')`
   *
   * @param value - the `value` object value
   * @returns this
   */
  @OpenDataTypes('Parameters.parameter.value[x]')
  public setValue(value: DataType | undefined): this {
    if (isDefined<DataType>(value)) {
      // assertFhirType<DataType>(value, DataType) unnecessary because @OpenDataTypes decorator ensures proper type/value
      this.value = value;
    } else {
      this.value = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `value` property exists and has a value; `false` otherwise
   */
  public hasValue(): boolean {
    return isDefined<DataType>(this.value) && !this.value.isEmpty();
  }

  /**
   * @returns the `resource` property value as a Resource object
   */
  public getResource(): Resource | undefined {
    return this.resource;
  }

  /**
   * Assigns the provided Resource object value to the `resource` property.
   *
   * @param value - the `resource` object value
   * @returns this
   */
  public setResource(value: Resource | undefined): this {
    if (isDefined<Resource>(value)) {
      const optErrMsg = `Invalid Parameters.parameter.resource; Provided element is not an instance of Resource.`;
      assertFhirResourceType(value, optErrMsg);
      this.resource = value;
    } else {
      this.resource = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `resource` property exists and has a value; `false` otherwise
   */
  public hasResource(): boolean {
    return isDefined<Resource>(this.resource) && !this.resource.isEmpty();
  }

  /**
   * @returns the `part` property value as a ParametersParameterComponent array
   */
  public getPart(): ParametersParameterComponent[] {
    return this.part ?? ([] as ParametersParameterComponent[]);
  }

  /**
   * Assigns the provided ParametersParameterComponent array value to the `part` property.
   *
   * @param value - the `part` array value
   * @returns this
   */
  public setPart(value: ParametersParameterComponent[] | undefined): this {
    if (isDefinedList<ParametersParameterComponent>(value)) {
      const optErrMsg = `Invalid Parameters.parameter.part; Provided value array has an element that is not an instance of ParametersParameterComponent.`;
      assertFhirTypeList<ParametersParameterComponent>(value, ParametersParameterComponent, optErrMsg);
      this.part = value;
    } else {
      this.part = undefined;
    }
    return this;
  }

  /**
   * Add the provided ParametersParameterComponent value to the `part` array property.
   *
   * @param value - the `part` value
   * @returns this
   */
  public addPart(value: ParametersParameterComponent | undefined): this {
    if (isDefined<ParametersParameterComponent>(value)) {
      const optErrMsg = `Invalid Parameters.parameter.part; Provided element is not an instance of ParametersParameterComponent.`;
      assertFhirType<ParametersParameterComponent>(value, ParametersParameterComponent, optErrMsg);
      this.initPart();
      this.part?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `part` property exists and has a value; `false` otherwise
   */
  public hasPart(): boolean {
    return (
      isDefinedList<ParametersParameterComponent>(this.part) &&
      this.part.some((item: ParametersParameterComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `part` property
   */
  private initPart(): void {
    if (!this.hasPart()) {
      this.part = [] as ParametersParameterComponent[];
    }
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Parameters.parameter';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.name, this.value, this.resource, this.part);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): ParametersParameterComponent {
    const dest = new ParametersParameterComponent(this.name);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: ParametersParameterComponent): void {
    super.copyValues(dest);
    dest.name = this.name ? this.name.copy() : null;
    dest.value = this.value?.copy();
    dest.resource = this.resource?.copy();
    const partList = copyListValues<ParametersParameterComponent>(this.part);
    dest.part = partList.length === 0 ? undefined : partList;
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
    jsonObj ??= {} as JSON.Object;

    const missingReqdProperties: string[] = [];

    if (this.hasNameElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirString>(this.getNameElement()!, 'name', jsonObj);
    } else {
      missingReqdProperties.push(`Parameters.parameter.name`);
    }

    if (this.hasValue()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPolymorphicValueJson(this.getValue()!, 'value', jsonObj);
    }

    if (this.hasResource()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirResourceJson(this.getResource()!, 'resource', jsonObj);
    }

    if (this.hasPart()) {
      setFhirBackboneElementListJson(this.getPart(), 'part', jsonObj);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_DO_NOT_EXIST} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
