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

const INSTANCE_EMPTY_ERROR_MSG = `Deserialized instance is unexpectedly "empty"`;

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
 * @returns Extension data model
 *
 * @category Utilities: Deserialization
 * @see [Extension Element](https://hl7.org/fhir/R4/extensibility.html#extension)
 */
export function deserializeExtension(json: JSON.Object): Extension | undefined {
  if (isNil(json) || isEmpty(json)) {
    return undefined;
  }

  const extensionJsonObj: JSON.Object = JSON.asObject(json, 'extensionJson');
  const instance = new Extension(null);

  if ('url' in extensionJsonObj) {
    instance.setUrl(JSON.asString(extensionJsonObj['url']));
  } else {
    throw new TypeError(`Extension.url is a required data element`);
  }

  if ('id' in extensionJsonObj) {
    instance.setId(JSON.asString(extensionJsonObj['id']));
  }

  const extensions = [] as Extension[];
  if ('extension' in extensionJsonObj) {
    // Extension has child extensions only
    const extensionJasonArray = extensionJsonObj['extension'] as JSON.Array;
    extensionJasonArray.forEach((extensionJson: JSON.Value) => {
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

/**
 * Deserialize the provided json into Base64BinaryType data model.
 *
 * @param json - JSON representing Base64BinaryType
 * @param siblingJson - JSON representing the Base64BinaryType's inherited Element
 * @returns Base64BinaryType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeBase64BinaryType(json: JSON.Value, siblingJson?: JSON.Value): Base64BinaryType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new Base64BinaryType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into BooleanType data model.
 *
 * @param json - JSON representing BooleanType
 * @param siblingJson - JSON representing the BooleanType's inherited Element
 * @returns BooleanType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeBooleanType(json: JSON.Value, siblingJson?: JSON.Value): BooleanType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new BooleanType();
  instance.setValue(JSON.asBoolean(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into a CanonicalType data model.
 *
 * @param json - JSON representing a CanonicalType
 * @param siblingJson - JSON representing the CanonicalType's inherited Element
 * @returns an CanonicalType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeCanonicalType(json: JSON.Value, siblingJson?: JSON.Value): CanonicalType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new CanonicalType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

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
 * @returns CodeType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeCodeType(json: JSON.Value, siblingJson?: JSON.Value): CodeType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new CodeType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into DateTimeType data model.
 *
 * @param json - JSON representing DateTimeType
 * @param siblingJson - JSON representing the DateTimeType's inherited Element
 * @returns DateTimeType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeDateTimeType(json: JSON.Value, siblingJson?: JSON.Value): DateTimeType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new DateTimeType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into DateType data model.
 *
 * @param json - JSON representing DateType
 * @param siblingJson - JSON representing the DateType's inherited Element
 * @returns DateType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeDateType(json: JSON.Value, siblingJson?: JSON.Value): DateType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new DateType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into DecimalType data model.
 *
 * @param json - JSON representing DecimalType
 * @param siblingJson - JSON representing the DecimalType's inherited Element
 * @returns DecimalType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeDecimalType(json: JSON.Value, siblingJson?: JSON.Value): DecimalType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new DecimalType();
  instance.setValue(JSON.asNumber(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into IdType data model.
 *
 * @param json - JSON representing IdType
 * @param siblingJson - JSON representing the IdType's inherited Element
 * @returns IdType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeIdType(json: JSON.Value, siblingJson?: JSON.Value): IdType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new IdType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into InstantType data model.
 *
 * @param json - JSON representing InstantType
 * @param siblingJson - JSON representing the InstantType's inherited Element
 * @returns InstantType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeInstantType(json: JSON.Value, siblingJson?: JSON.Value): InstantType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new InstantType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

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
 * @returns Integer64Type data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeInteger64Type(json: JSON.Value, siblingJson?: JSON.Value): Integer64Type | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new Integer64Type();
  const int64Value = JSON.asString(json, `json argument`);
  instance.setValue(BigInt(int64Value));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into IntegerType data model.
 *
 * @param json - JSON representing IntegerType
 * @param siblingJson - JSON representing the IntegerType's inherited Element
 * @returns IntegerType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeIntegerType(json: JSON.Value, siblingJson?: JSON.Value): IntegerType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new IntegerType();
  instance.setValue(JSON.asNumber(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into MarkdownType data model.
 *
 * @param json - JSON representing MarkdownType
 * @param siblingJson - JSON representing the MarkdownType's inherited Element
 * @returns MarkdownType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeMarkdownType(json: JSON.Value, siblingJson?: JSON.Value): MarkdownType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new MarkdownType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into OidType data model.
 *
 * @param json - JSON representing OidType
 * @param siblingJson - JSON representing the OidType's inherited Element
 * @returns OidType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeOidType(json: JSON.Value, siblingJson?: JSON.Value): OidType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new OidType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into PositiveIntType data model.
 *
 * @param json - JSON representing PositiveIntType
 * @param siblingJson - JSON representing the PositiveIntType's inherited Element
 * @returns PositiveIntType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializePositiveIntType(json: JSON.Value, siblingJson?: JSON.Value): PositiveIntType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new PositiveIntType();
  instance.setValue(JSON.asNumber(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into StringType data model.
 *
 * @param json - JSON representing StringType
 * @param siblingJson - JSON representing the StringType's inherited Element
 * @returns StringType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeStringType(json: JSON.Value, siblingJson?: JSON.Value): StringType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new StringType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into TimeType data model.
 *
 * @param json - JSON representing TimeType
 * @param siblingJson - JSON representing the TimeType's inherited Element
 * @returns TimeType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeTimeType(json: JSON.Value, siblingJson?: JSON.Value): TimeType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new TimeType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into UnsignedIntType data model.
 *
 * @param json - JSON representing UnsignedIntType
 * @param siblingJson - JSON representing the UnsignedIntType's inherited Element
 * @returns UnsignedIntType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeUnsignedIntType(json: JSON.Value, siblingJson?: JSON.Value): UnsignedIntType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new UnsignedIntType();
  instance.setValue(JSON.asNumber(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into UriType data model.
 *
 * @param json - JSON representing UriType
 * @param siblingJson - JSON representing the UriType's inherited Element
 * @returns UriType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeUriType(json: JSON.Value, siblingJson?: JSON.Value): UriType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new UriType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into UrlType data model.
 *
 * @param json - JSON representing UrlType
 * @param siblingJson - JSON representing the UrlType's inherited Element
 * @returns UrlType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeUrlType(json: JSON.Value, siblingJson?: JSON.Value): UrlType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new UrlType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Deserialize the provided json into UuidType data model.
 *
 * @param json - JSON representing UuidType
 * @param siblingJson - JSON representing the UuidType's inherited Element
 * @returns UuidType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeUuidType(json: JSON.Value, siblingJson?: JSON.Value): UuidType | undefined {
  if (isNil(json) || (typeof json === 'string' && json.trim().length === 0)) {
    return undefined;
  }

  const instance = new UuidType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

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
 * @returns XhtmlType data model
 *
 * @category Utilities: Deserialization
 */
export function deserializeXhtmlType(json: JSON.Value, siblingJson?: JSON.Value): XhtmlType | undefined {
  if (isNil(json)) {
    return undefined;
  }

  const instance = new XhtmlType();
  instance.setValue(JSON.asString(json, `json argument`));
  processSiblingJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Add `Element.id` and/or `Element.extension` to the DataType instance.
 *
 * @param instance - instance of DataType on which to add Element properties from siblingJson
 * @param siblingJson - JSON containing Element properties, if any
 * @private
 */
function processSiblingJson(instance: DataType, siblingJson: JSON.Value | undefined): void {
  if (siblingJson === undefined) {
    return;
  }

  const element: JSON.Object = JSON.asObject(siblingJson, `${instance.constructor.name} Element`);

  if ('id' in element) {
    instance.setId(JSON.asString(element['id']));
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

        default:
          return undefined;
      }
    }
  }

  return undefined;
}
