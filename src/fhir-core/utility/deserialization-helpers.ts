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
 * Deserialization utilities
 *
 * @privateRemarks
 * Due to TypeScript circular references, these functions have been gathered here rather than
 * incorporating them into the data type classes.
 *
 * @module
 */

import { strict as assert } from 'node:assert';
import { isEmpty, isNil } from 'lodash';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { OPEN_DATE_TYPE_KEY_NAMES } from '@src/fhir-core/data-types/FhirDataType';
import { Base64BinaryType } from '@src/fhir-core/data-types/primitive/Base64BinaryType';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CanonicalType } from '@src/fhir-core/data-types/primitive/CanonicalType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { DateType } from '@src/fhir-core/data-types/primitive/DateType';
import { DecimalType } from '@src/fhir-core/data-types/primitive/DecimalType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { InstantType } from '@src/fhir-core/data-types/primitive/InstantType';
import { Integer64Type } from '@src/fhir-core/data-types/primitive/Integer64Type';
import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import { MarkdownType } from '@src/fhir-core/data-types/primitive/MarkdownType';
import { OidType } from '@src/fhir-core/data-types/primitive/OidType';
import { PositiveIntType } from '@src/fhir-core/data-types/primitive/PositiveIntType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { TimeType } from '@src/fhir-core/data-types/primitive/TimeType';
import { UnsignedIntType } from '@src/fhir-core/data-types/primitive/UnsignedIntType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { UrlType } from '@src/fhir-core/data-types/primitive/UrlType';
import { UuidType } from '@src/fhir-core/data-types/primitive/UuidType';
import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/SimpleQuantity';

const INSTANCE_EMPTY_ERROR_MSG = `Deserialized instance is unexpectedly "empty"`;

//region CoreTypes

/**
 * Deserialize the provided json into Extension data model.
 *
 * @remarks
 * Refer to the "Notes" section the linked "Extension Element" for rules for FHIR Extensions.
 * The following rules are applicable to deserializing JSON into an Extension:
 * - The `url` is a mandatory attribute / property
 * - An extension SHALL have either a value (i.e. a `value[x]` element) or sub-extensions, but not both.
 *   If present, the `value[x]` element SHALL have content (value attribute or other elements)
 *
 * @param json - JSON representing Extension
 * @returns Extension data model or undefined
 *
 * @category Utilities: Deserialization
 * @see [Extension Element](https://hl7.org/fhir/R4/extensibility.html#extension)
 */
export function deserializeExtension(json: JSON.Object | undefined): Extension | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const extensionJsonObj: JSON.Object = JSON.asObject(json, 'Extension JSON');
  const instance = new Extension(null);

  if ('url' in extensionJsonObj) {
    instance.setUrl(JSON.asString(extensionJsonObj['url'], 'Extension.url JSON'));
  } else {
    throw new TypeError(`Extension.url is a required data element`);
  }

  if ('id' in extensionJsonObj) {
    instance.setId(JSON.asString(extensionJsonObj['id'], 'Extension.id JSON'));
  }

  const extensions = [] as Extension[];
  if ('extension' in extensionJsonObj) {
    // Extension has child extensions only
    const extensionJsonArray: JSON.Array = JSON.asArray(extensionJsonObj['extension']);
    extensionJsonArray.forEach((extensionJson: JSON.Value) => {
      const extension: Extension | undefined = deserializeExtension(extensionJson as JSON.Object);
      if (extension !== undefined) {
        extensions.push(extension);
      }
    });
  }

  if (extensions.length > 0) {
    instance.setExtension(extensions);
  } else {
    // Extension might have one value[x]
    const dataTypeValue: DataType | undefined = getValueXData(extensionJsonObj);
    if (dataTypeValue !== undefined) {
      instance.setValue(dataTypeValue);
    }
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

//endregion

//region Private Helpers

/**
 * PrimitiveTypeJson
 *
 * @privateRemarks
 * Single object containing the JSON for for both the primitive data value and its sibling data Element, if any.
 *
 * @interface
 */
interface PrimitiveTypeJson {
  dtJson: JSON.Value | undefined;
  dtSiblingJson: JSON.Object | undefined;
}

/**
 * Add `Element.id` and/or `Element.extension` to the DataType instance.
 *
 * @param instance - instance of DataType on which to add Element properties from dataTypeJson
 * @param dataTypeJson - DataType JSON containing Element properties, if any
 * @private
 */
function processElementJson(instance: DataType, dataTypeJson: JSON.Value | undefined): void {
  if (dataTypeJson === undefined) {
    return;
  }

  const element: JSON.Object = JSON.asObject(dataTypeJson, `${instance.constructor.name} Element`);

  if ('id' in element) {
    instance.setId(JSON.asString(element['id'], `${instance.constructor.name}.id`));
  }

  if ('extension' in element) {
    const extensions = [] as Extension[];
    const extensionArray = element['extension'] as JSON.Array;
    for (const extensionJson of extensionArray) {
      const extension: Extension | undefined = deserializeExtension(extensionJson as JSON.Object);
      if (extension !== undefined) {
        extensions.push(extension);
      }
    }
    if (extensions.length > 0) {
      instance.setExtension(extensions);
    }
  }
}

/* istanbul ignore next */
/**
 * Return an instance of DataType for the `value[x]` if it exists.
 *
 * @param extensionJsonObj - source JSON object
 * @returns the appropriate DataType instance or undefined
 * @private
 */
function getValueXData(extensionJsonObj: JSON.Object): DataType | undefined {
  const valueXKey = Object.keys(extensionJsonObj).find((key) => OPEN_DATE_TYPE_KEY_NAMES.includes(key));

  if (valueXKey !== undefined && valueXKey in extensionJsonObj) {
    const dataValue: JSON.Value | undefined = extensionJsonObj[valueXKey];
    const siblingDataValue: JSON.Value | undefined = extensionJsonObj[`_${valueXKey}`];

    if (dataValue !== undefined) {
      switch (valueXKey) {
        case 'valueBase64Binary':
          return deserializeBase64BinaryType(dataValue, siblingDataValue);
        case 'valueBoolean':
          return deserializeBooleanType(dataValue, siblingDataValue);
        case 'valueCanonicalType':
          return deserializeCanonicalType(dataValue, siblingDataValue);
        case 'valueCodeType':
          // NOTE - EnumCodeType is a subclass of CodeType and will always be serialized/deserialized as a CodeType
          return deserializeCodeType(dataValue, siblingDataValue);
        case 'valueDateTimeType':
          return deserializeDateTimeType(dataValue, siblingDataValue);
        case 'valueDateType':
          return deserializeDateType(dataValue, siblingDataValue);
        case 'valueDecimalType':
          return deserializeDecimalType(dataValue, siblingDataValue);
        case 'valueIdType':
          return deserializeIdType(dataValue, siblingDataValue);
        case 'valueInstantType':
          return deserializeInstantType(dataValue, siblingDataValue);
        case 'valueInteger64Type':
          return deserializeInteger64Type(dataValue, siblingDataValue);
        case 'valueIntegerType':
          return deserializeIntegerType(dataValue, siblingDataValue);
        case 'valueMarkdownType':
          return deserializeMarkdownType(dataValue, siblingDataValue);
        case 'valueOidType':
          return deserializeOidType(dataValue, siblingDataValue);
        case 'valuePositiveIntType':
          return deserializePositiveIntType(dataValue, siblingDataValue);
        case 'valueString':
          return deserializeStringType(dataValue, siblingDataValue);
        case 'valueTimeType':
          return deserializeTimeType(dataValue, siblingDataValue);
        case 'valueUnsignedIntType':
          return deserializeUnsignedIntType(dataValue, siblingDataValue);
        case 'valueUriType':
          return deserializeUriType(dataValue, siblingDataValue);
        case 'valueUrlType':
          return deserializeUrlType(dataValue, siblingDataValue);
        case 'valueUuidType':
          return deserializeUuidType(dataValue, siblingDataValue);
        case 'valueXhtmlType':
          return deserializeXhtmlType(dataValue, siblingDataValue);

        case 'valueCodeableConcept':
          return deserializeCodeableConcept(dataValue);
        case 'valueCoding':
          return deserializeCoding(dataValue);
        case 'valueIdentifier':
          return deserializeIdentifier(dataValue);
        case 'valueMeta':
          return deserializeMeta(dataValue);
        case 'valueNarrative':
          return deserializeNarrative(dataValue);
        case 'valuePeriod':
          return deserializePeriod(dataValue);
        case 'valueQuantity':
          return deserializeQuantity(dataValue);
        case 'valueRange':
          return deserializeRange(dataValue);
        case 'valueReference':
          return deserializeReference(dataValue);
        case 'valueSimpleQuantity':
          return deserializeSimpleQuantity(dataValue);

        default:
          return undefined;
      }
    }
  }

  return undefined;
}

/**
 * Returns the primitive data type's value and its sibling Element, if any.
 *
 * @param datatypeJsonObj - source JSON object
 * @param datatypeName - source data type name
 * @param primitiveFieldName - primitive's field name in datatypeJsonObj
 * @param jsonType - type of expected field's data
 * @returns object containing the primitive data plus its Element data, if any
 */
function getPrimitiveTypeJson(
  datatypeJsonObj: JSON.Object,
  datatypeName: string,
  primitiveFieldName: string,
  jsonType: 'boolean' | 'number' | 'string',
): PrimitiveTypeJson {
  if (isNil(datatypeJsonObj) || (JSON.isObject(datatypeJsonObj) && isEmpty(datatypeJsonObj))) {
    return { dtJson: undefined, dtSiblingJson: undefined };
  }

  let dtJson: JSON.Value | undefined = undefined;
  if (datatypeJsonObj[primitiveFieldName] !== undefined) {
    const msgPrefix = `${datatypeName}.${primitiveFieldName}`;
    if (jsonType === 'boolean') {
      dtJson = JSON.asBoolean(datatypeJsonObj[primitiveFieldName], msgPrefix);
    } else if (jsonType === 'number') {
      dtJson = JSON.asNumber(datatypeJsonObj[primitiveFieldName], msgPrefix);
    } else {
      dtJson = JSON.asString(datatypeJsonObj[primitiveFieldName], msgPrefix);
    }
  }

  const siblingFieldName = `_${primitiveFieldName}`;
  let dtSiblingJson: JSON.Object | undefined = undefined;
  if (siblingFieldName in datatypeJsonObj) {
    if (datatypeJsonObj[siblingFieldName] !== undefined) {
      dtSiblingJson = JSON.asObject(datatypeJsonObj[siblingFieldName], `${datatypeName}._${primitiveFieldName}`);
    }
  }

  return { dtJson: dtJson, dtSiblingJson: dtSiblingJson };
}

/**
 * Returns an array containing the primitive data type's value and its sibling Element, if any.
 *
 * @param datatypeJsonObj - source JSON object
 * @param datatypeName - source data type name
 * @param primitiveFieldName - primitive's field name in datatypeJsonObj
 * @param jsonType - type of expected field's data
 * @returns array containing objects of the primitive data plus its Element data, if any
 */
function getPrimitiveTypeListJson(
  datatypeJsonObj: JSON.Object,
  datatypeName: string,
  primitiveFieldName: string,
  jsonType: 'boolean' | 'number' | 'string',
): PrimitiveTypeJson[] {
  if (isNil(datatypeJsonObj) || (JSON.isObject(datatypeJsonObj) && isEmpty(datatypeJsonObj))) {
    return [];
  }
  // Calling function should have already ensured this is true!
  assert(primitiveFieldName in datatypeJsonObj, `${primitiveFieldName} does not exist in provided JSON.Object!`);

  const dataJsonArray: JSON.Array = JSON.asArray(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    datatypeJsonObj[primitiveFieldName]!,
    `${datatypeName}.${primitiveFieldName}`,
  );

  const siblingFieldName = `_${primitiveFieldName}`;
  let dataElementJsonArray: JSON.Array | undefined = undefined;
  if (siblingFieldName in datatypeJsonObj) {
    dataElementJsonArray = JSON.asArray(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      datatypeJsonObj[siblingFieldName]!,
      `${datatypeName}.${siblingFieldName}`,
    );
    // FHIR specification requires both arrays to be same size with null sibling values when there is no matching sibling element
    // [JSON representation of primitive elements](https://hl7.org/fhir/R4/json.html#primitive)
    assert(
      dataJsonArray.length === dataElementJsonArray.length,
      `Invalid JSON: Contrary to FHIR Specification, ${datatypeName}.${primitiveFieldName} and ${datatypeName}.${siblingFieldName} have different sizes!`,
    );
  }

  // At this point, dataJsonArray and dataElementJsonArray, if defined, have the same length
  const primitiveTypeJsonArray: PrimitiveTypeJson[] = [];
  dataJsonArray.forEach((dataJson: JSON.Value, idx) => {
    const primitiveJsonObj = {} as JSON.Object;
    primitiveJsonObj[primitiveFieldName] = dataJson;
    if (dataElementJsonArray !== undefined && !isNil(dataElementJsonArray[idx])) {
      primitiveJsonObj[siblingFieldName] = dataElementJsonArray[idx];
    }
    const result: PrimitiveTypeJson = getPrimitiveTypeJson(
      primitiveJsonObj,
      datatypeName,
      primitiveFieldName,
      jsonType,
    );
    primitiveTypeJsonArray.push(result);
  });

  return primitiveTypeJsonArray;
}

//endregion

//region PrimitiveTypes

/**
 * Deserialize the provided json into Base64BinaryType data model.
 *
 * @param json - JSON representing Base64BinaryType
 * @param siblingJson - JSON representing the Base64BinaryType's inherited Element
 * @returns Base64BinaryType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeBase64BinaryType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): Base64BinaryType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new Base64BinaryType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into BooleanType data model.
 *
 * @param json - JSON representing BooleanType
 * @param siblingJson - JSON representing the BooleanType's inherited Element
 * @returns BooleanType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeBooleanType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): BooleanType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new BooleanType();
  instance.setValue(JSON.asBoolean(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into a CanonicalType data model.
 *
 * @param json - JSON representing a CanonicalType
 * @param siblingJson - JSON representing the CanonicalType's inherited Element
 * @returns an CanonicalType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeCanonicalType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): CanonicalType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new CanonicalType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into CodeType data model.
 *
 * @remarks
 * EnumCodeType is a subclass of CodeType and will always be serialized/deserialized as a CodeType.
 *
 * @param json - JSON representing CodeType
 * @param siblingJson - JSON representing the CodeType's inherited Element
 * @returns CodeType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeCodeType(json: JSON.Value | undefined, siblingJson?: JSON.Value): CodeType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new CodeType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into DateTimeType data model.
 *
 * @param json - JSON representing DateTimeType
 * @param siblingJson - JSON representing the DateTimeType's inherited Element
 * @returns DateTimeType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeDateTimeType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): DateTimeType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new DateTimeType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into DateType data model.
 *
 * @param json - JSON representing DateType
 * @param siblingJson - JSON representing the DateType's inherited Element
 * @returns DateType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeDateType(json: JSON.Value | undefined, siblingJson?: JSON.Value): DateType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new DateType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into DecimalType data model.
 *
 * @param json - JSON representing DecimalType
 * @param siblingJson - JSON representing the DecimalType's inherited Element
 * @returns DecimalType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeDecimalType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): DecimalType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new DecimalType();
  instance.setValue(JSON.asNumber(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into IdType data model.
 *
 * @param json - JSON representing IdType
 * @param siblingJson - JSON representing the IdType's inherited Element
 * @returns IdType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeIdType(json: JSON.Value | undefined, siblingJson?: JSON.Value): IdType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new IdType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into InstantType data model.
 *
 * @param json - JSON representing InstantType
 * @param siblingJson - JSON representing the InstantType's inherited Element
 * @returns InstantType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeInstantType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): InstantType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new InstantType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into Integer64Type data model.
 *
 * @remarks
 * Integer64 serializes the underlying BigInt as a string. Therefore, deserialize a JSON string value into a BigInt.
 *
 * @param json - JSON representing Integer64Type
 * @param siblingJson - JSON representing the Integer64Type's inherited Element
 * @returns Integer64Type data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeInteger64Type(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): Integer64Type | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new Integer64Type();
  const int64Value = JSON.asString(json, `json argument for ${instance.constructor.name}`);
  instance.setValue(BigInt(int64Value));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into IntegerType data model.
 *
 * @param json - JSON representing IntegerType
 * @param siblingJson - JSON representing the IntegerType's inherited Element
 * @returns IntegerType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeIntegerType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): IntegerType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new IntegerType();
  instance.setValue(JSON.asNumber(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into MarkdownType data model.
 *
 * @param json - JSON representing MarkdownType
 * @param siblingJson - JSON representing the MarkdownType's inherited Element
 * @returns MarkdownType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeMarkdownType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): MarkdownType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new MarkdownType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into OidType data model.
 *
 * @param json - JSON representing OidType
 * @param siblingJson - JSON representing the OidType's inherited Element
 * @returns OidType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeOidType(json: JSON.Value | undefined, siblingJson?: JSON.Value): OidType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new OidType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into PositiveIntType data model.
 *
 * @param json - JSON representing PositiveIntType
 * @param siblingJson - JSON representing the PositiveIntType's inherited Element
 * @returns PositiveIntType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializePositiveIntType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): PositiveIntType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new PositiveIntType();
  instance.setValue(JSON.asNumber(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into StringType data model.
 *
 * @param json - JSON representing StringType
 * @param siblingJson - JSON representing the StringType's inherited Element
 * @returns StringType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeStringType(json: JSON.Value | undefined, siblingJson?: JSON.Value): StringType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new StringType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into TimeType data model.
 *
 * @param json - JSON representing TimeType
 * @param siblingJson - JSON representing the TimeType's inherited Element
 * @returns TimeType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeTimeType(json: JSON.Value | undefined, siblingJson?: JSON.Value): TimeType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new TimeType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into UnsignedIntType data model.
 *
 * @param json - JSON representing UnsignedIntType
 * @param siblingJson - JSON representing the UnsignedIntType's inherited Element
 * @returns UnsignedIntType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeUnsignedIntType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): UnsignedIntType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new UnsignedIntType();
  instance.setValue(JSON.asNumber(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into UriType data model.
 *
 * @param json - JSON representing UriType
 * @param siblingJson - JSON representing the UriType's inherited Element
 * @returns UriType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeUriType(json: JSON.Value | undefined, siblingJson?: JSON.Value): UriType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new UriType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into UrlType data model.
 *
 * @param json - JSON representing UrlType
 * @param siblingJson - JSON representing the UrlType's inherited Element
 * @returns UrlType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeUrlType(json: JSON.Value | undefined, siblingJson?: JSON.Value): UrlType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new UrlType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into UuidType data model.
 *
 * @param json - JSON representing UuidType
 * @param siblingJson - JSON representing the UuidType's inherited Element
 * @returns UuidType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeUuidType(json: JSON.Value | undefined, siblingJson?: JSON.Value): UuidType | undefined {
  if (isNil(json) || (JSON.isString(json) && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new UuidType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into XhtmlType data model.
 *
 * @remarks
 * The following rules are applicable to deserializing JSON into XhtmlType:
 * - An empty string is an invalid xhtml value.
 * - According to the FHIR specification, Extensions are not permitted on the xhtml type.
 *
 * @param json - JSON representing XhtmlType
 * @param siblingJson - JSON representing the XhtmlType's inherited Element
 * @returns XhtmlType data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeXhtmlType(json: JSON.Value | undefined, siblingJson?: JSON.Value): XhtmlType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new XhtmlType();
  instance.setValue(JSON.asString(json, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

//endregion

//region ComplexTypes

/**
 * Deserialize the provided json into CodeableConcept data model.
 *
 * @param json - JSON representing CodeableConcept
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to CodeableConcept
 * @returns CodeableConcept data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeCodeableConcept(
  json: JSON.Value | undefined,
  sourceField?: string,
): CodeableConcept | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const source = sourceField ? sourceField : 'CodeableConcept';

  const datatypeJsonObj: JSON.Object = JSON.asObject(json, `${source} JSON`);
  const instance = new CodeableConcept();

  processElementJson(instance, datatypeJsonObj);

  if ('coding' in datatypeJsonObj) {
    const dataElementJsonArray: JSON.Array = JSON.asArray(datatypeJsonObj['coding'], `${source}.coding`);
    dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
      const datatype: Coding | undefined = deserializeCoding(dataElementJson, `${source}.coding[${String(idx)}]`);
      instance.addCoding(datatype);
    });
  }

  if ('text' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'text', 'string');
    const datatype: StringType | undefined = deserializeStringType(dtJson, dtSiblingJson);
    instance.setTextElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into Coding data model.
 *
 * @param json - JSON representing Coding
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Coding
 * @returns Coding data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeCoding(json: JSON.Value | undefined, sourceField?: string): Coding | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const source = sourceField ? sourceField : 'Coding';

  const datatypeJsonObj: JSON.Object = JSON.asObject(json, `${source} JSON`);
  const instance = new Coding();

  processElementJson(instance, datatypeJsonObj);

  if ('system' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'system', 'string');
    const datatype: UriType | undefined = deserializeUriType(dtJson, dtSiblingJson);
    instance.setSystemElement(datatype);
  }

  if ('version' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'version', 'string');
    const datatype: StringType | undefined = deserializeStringType(dtJson, dtSiblingJson);
    instance.setVersionElement(datatype);
  }

  if ('code' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'code', 'string');
    const datatype: CodeType | undefined = deserializeCodeType(dtJson, dtSiblingJson);
    instance.setCodeElement(datatype);
  }

  if ('display' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'display', 'string');
    const datatype: StringType | undefined = deserializeStringType(dtJson, dtSiblingJson);
    instance.setDisplayElement(datatype);
  }

  if ('userSelected' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'userSelected', 'boolean');
    const datatype: BooleanType | undefined = deserializeBooleanType(dtJson, dtSiblingJson);
    instance.setUserSelectedElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into Identifier data model.
 *
 * @param json - JSON representing Identifier
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Identifier
 * @returns Identifier data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeIdentifier(json: JSON.Value | undefined, sourceField?: string): Identifier | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const source = sourceField ? sourceField : 'Identifier';

  const datatypeJsonObj: JSON.Object = JSON.asObject(json, `${source} JSON`);
  const instance = new Identifier();

  processElementJson(instance, datatypeJsonObj);

  if ('use' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'use', 'string');
    const datatype: CodeType | undefined = deserializeCodeType(dtJson, dtSiblingJson);
    instance.setUseElement(datatype);
  }

  if ('type' in datatypeJsonObj) {
    const datatype: CodeableConcept | undefined = deserializeCodeableConcept(datatypeJsonObj['type'], `${source}.type`);
    instance.setType(datatype);
  }

  if ('system' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'system', 'string');
    const datatype: UriType | undefined = deserializeUriType(dtJson, dtSiblingJson);
    instance.setSystemElement(datatype);
  }

  if ('value' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'value', 'string');
    const datatype: StringType | undefined = deserializeStringType(dtJson, dtSiblingJson);
    instance.setValueElement(datatype);
  }

  if ('period' in datatypeJsonObj) {
    const datatype: Period | undefined = deserializePeriod(datatypeJsonObj['period'], `${source}.period`);
    instance.setPeriod(datatype);
  }

  if ('assigner' in datatypeJsonObj) {
    const datatype: Reference | undefined = deserializeReference(datatypeJsonObj['assigner'], `${source}.assigner`);
    instance.setAssigner(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into Meta data model.
 *
 * @param json - JSON representing Meta
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Meta
 * @returns Meta data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeMeta(json: JSON.Value | undefined, sourceField?: string): Meta | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const source = sourceField ? sourceField : 'Meta';

  const datatypeJsonObj: JSON.Object = JSON.asObject(json, `${source} JSON`);
  const instance = new Meta();

  processElementJson(instance, datatypeJsonObj);

  if ('versionId' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'versionId', 'string');
    const datatype: IdType | undefined = deserializeIdType(dtJson, dtSiblingJson);
    instance.setVersionIdElement(datatype);
  }

  if ('lastUpdated' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'lastUpdated', 'string');
    const datatype: InstantType | undefined = deserializeInstantType(dtJson, dtSiblingJson);
    instance.setLastUpdatedElement(datatype);
  }

  if ('source' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'source', 'string');
    const datatype: UriType | undefined = deserializeUriType(dtJson, dtSiblingJson);
    instance.setSourceElement(datatype);
  }

  if ('profile' in datatypeJsonObj) {
    const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(datatypeJsonObj, source, 'profile', 'string');
    dataJsonArray.forEach((dataJson: PrimitiveTypeJson) => {
      const datatype: CanonicalType | undefined = deserializeCanonicalType(dataJson.dtJson, dataJson.dtSiblingJson);
      instance.addProfileElement(datatype);
    });
  }

  if ('security' in datatypeJsonObj) {
    const dataElementJsonArray: JSON.Array = JSON.asArray(datatypeJsonObj['security'], `${source}.security`);
    dataElementJsonArray.forEach((dataElementJson: JSON.Value) => {
      const datatype: Coding | undefined = deserializeCoding(dataElementJson, `${source}.security.coding`);
      instance.addSecurity(datatype);
    });
  }

  if ('tag' in datatypeJsonObj) {
    const dataElementJsonArray: JSON.Array = JSON.asArray(datatypeJsonObj['tag'], `${source}.tag`);
    dataElementJsonArray.forEach((dataElementJson: JSON.Value) => {
      const datatype: Coding | undefined = deserializeCoding(dataElementJson, `${source}.tag.coding`);
      instance.addTag(datatype);
    });
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into Narrative data model.
 *
 * @param json - JSON representing Narrative
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Narrative
 * @returns Narrative data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeNarrative(json: JSON.Value | undefined, sourceField?: string): Narrative | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const source = sourceField ? sourceField : 'Narrative';

  const datatypeJsonObj: JSON.Object = JSON.asObject(json, `${source} JSON`);
  const instance = new Narrative(null, null);

  processElementJson(instance, datatypeJsonObj);

  if ('status' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'status', 'string');
    const datatype: CodeType | undefined = deserializeCodeType(dtJson, dtSiblingJson);
    if (datatype !== undefined) {
      // Narrative.status is required and cannot be set to undefined or null
      instance.setStatusElement(datatype);
    }
  }

  if ('div' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'div', 'string');
    const datatype: XhtmlType | undefined = deserializeXhtmlType(dtJson, dtSiblingJson);
    if (datatype !== undefined) {
      // Narrative.div is required and cannot be set to undefined or null
      instance.setDivElement(datatype);
    }
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into Period data model.
 *
 * @param json - JSON representing Period
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Period
 * @returns Period data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializePeriod(json: JSON.Value | undefined, sourceField?: string): Period | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const source = sourceField ? sourceField : 'Period';

  const datatypeJsonObj: JSON.Object = JSON.asObject(json, `${source} JSON`);
  const instance = new Period();

  processElementJson(instance, datatypeJsonObj);

  if ('start' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'start', 'string');
    const datatype: DateTimeType | undefined = deserializeDateTimeType(dtJson, dtSiblingJson);
    instance.setStartElement(datatype);
  }

  if ('end' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'end', 'string');
    const datatype: DateTimeType | undefined = deserializeDateTimeType(dtJson, dtSiblingJson);
    instance.setEndElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into Quantity data model.
 *
 * @param json - JSON representing Quantity
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Quantity
 * @returns Quantity data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeQuantity(json: JSON.Value | undefined, sourceField?: string): Quantity | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const source = sourceField ? sourceField : 'Quantity';

  const datatypeJsonObj: JSON.Object = JSON.asObject(json, `${source} JSON`);
  const instance = new Quantity();

  processElementJson(instance, datatypeJsonObj);

  if ('value' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'value', 'number');
    const datatype: DecimalType | undefined = deserializeDecimalType(dtJson, dtSiblingJson);
    instance.setValueElement(datatype);
  }

  if ('comparator' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'comparator', 'string');
    const datatype: CodeType | undefined = deserializeCodeType(dtJson, dtSiblingJson);
    instance.setComparatorElement(datatype);
  }

  if ('unit' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'unit', 'string');
    const datatype: StringType | undefined = deserializeStringType(dtJson, dtSiblingJson);
    instance.setUnitElement(datatype);
  }

  if ('system' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'system', 'string');
    const datatype: UriType | undefined = deserializeUriType(dtJson, dtSiblingJson);
    instance.setSystemElement(datatype);
  }

  if ('code' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'code', 'string');
    const datatype: CodeType | undefined = deserializeCodeType(dtJson, dtSiblingJson);
    instance.setCodeElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into Range data model.
 *
 * @param json - JSON representing Range
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Range
 * @returns Range data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeRange(json: JSON.Value | undefined, sourceField?: string): Range | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const source = sourceField ? sourceField : 'Range';

  const datatypeJsonObj: JSON.Object = JSON.asObject(json, `${source} JSON`);
  const instance = new Range();

  processElementJson(instance, datatypeJsonObj);

  if ('low' in datatypeJsonObj) {
    const datatype: SimpleQuantity | undefined = deserializeSimpleQuantity(datatypeJsonObj['low'], `${source}.low`);
    instance.setLow(datatype);
  }

  if ('high' in datatypeJsonObj) {
    const datatype: SimpleQuantity | undefined = deserializeSimpleQuantity(datatypeJsonObj['high'], `${source}.high`);
    instance.setHigh(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into Reference data model.
 *
 * @param json - JSON representing Reference
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Reference
 * @returns Reference data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeReference(json: JSON.Value | undefined, sourceField?: string): Reference | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const source = sourceField ? sourceField : 'Reference';

  const datatypeJsonObj: JSON.Object = JSON.asObject(json, `${source} JSON`);
  const instance = new Reference();

  processElementJson(instance, datatypeJsonObj);

  if ('reference' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'reference', 'string');
    const datatype: StringType | undefined = deserializeStringType(dtJson, dtSiblingJson);
    instance.setReferenceElement(datatype);
  }

  if ('type' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'type', 'string');
    const datatype: UriType | undefined = deserializeUriType(dtJson, dtSiblingJson);
    instance.setTypeElement(datatype);
  }

  if ('identifier' in datatypeJsonObj) {
    const datatype: Identifier | undefined = deserializeIdentifier(
      datatypeJsonObj['identifier'],
      `${source}.identifier`,
    );
    instance.setIdentifier(datatype);
  }

  if ('display' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'display', 'string');
    const datatype: StringType | undefined = deserializeStringType(dtJson, dtSiblingJson);
    instance.setDisplayElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into SimpleQuantity data model.
 *
 * @param json - JSON representing SimpleQuantity
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to SimpleQuantity
 * @returns SimpleQuantity data model or undefined
 *
 * @category Utilities: Deserialization
 */
export function deserializeSimpleQuantity(
  json: JSON.Value | undefined,
  sourceField?: string,
): SimpleQuantity | undefined {
  if (isNil(json) || (JSON.isObject(json) && isEmpty(json))) {
    return undefined;
  }

  const source = sourceField ? sourceField : 'SimpleQuantity';

  const datatypeJsonObj: JSON.Object = JSON.asObject(json, `${source} JSON`);
  const instance = new SimpleQuantity();

  processElementJson(instance, datatypeJsonObj);

  if ('value' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'value', 'number');
    const datatype: DecimalType | undefined = deserializeDecimalType(dtJson, dtSiblingJson);
    instance.setValueElement(datatype);
  }

  if ('unit' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'unit', 'string');
    const datatype: StringType | undefined = deserializeStringType(dtJson, dtSiblingJson);
    instance.setUnitElement(datatype);
  }

  if ('system' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'system', 'string');
    const datatype: UriType | undefined = deserializeUriType(dtJson, dtSiblingJson);
    instance.setSystemElement(datatype);
  }

  if ('code' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'code', 'string');
    const datatype: CodeType | undefined = deserializeCodeType(dtJson, dtSiblingJson);
    instance.setCodeElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

//endregion
