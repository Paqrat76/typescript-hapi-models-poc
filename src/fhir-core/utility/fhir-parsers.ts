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
 * Parsing (deserialization) utilities
 *
 * @privateRemarks
 * Due to TypeScript circular references, these functions have been gathered here rather than
 * incorporating them into the data type classes.
 *
 * @module
 */

import { strict as assert } from 'node:assert';
import {
  INSTANCE_EMPTY_ERROR_MSG,
  INVALID_VALUEX_MULTIPLE_PROPERTIES,
  INVALID_VALUEX_PROPERTY,
  REQUIRED_PROPERTIES_REQD_IN_JSON,
} from '@src/fhir-core/constants';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { BackboneElement, DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Resource } from '@src/fhir-core/base-models/Resource';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { FhirDataType, OPEN_DATE_TYPE_KEY_NAMES } from '@src/fhir-core/data-types/FhirDataType';
import { Base64BinaryType } from '@src/fhir-core/data-types/primitive/Base64BinaryType';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CanonicalType } from '@src/fhir-core/data-types/primitive/CanonicalType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { ContactPoint } from '@src/fhir-core/data-types/complex/ContactPoint';
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
import { Address } from '@src/fhir-core/data-types/complex/Address';
import { Attachment } from '@src/fhir-core/data-types/complex/Attachment';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/SimpleQuantity';
import { FhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import { isEmpty, upperFirst } from '@src/fhir-core/utility/common-util';
import { getChoiceDatatypeDefsForField } from '@src/fhir-core/utility/decorators';
import { assertIsDefined, assertIsString, isDefined } from '@src/fhir-core/utility/type-guards';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

//region CoreTypes

/**
 * Parse the provided json into Extension data model.
 *
 * @remarks
 * Refer to the "Notes" section the linked "Extension Element" for rules for FHIR Extensions.
 * The following rules are applicable to parsing JSON into an Extension:
 * The following rules are applicable to parsing JSON into an Extension:
 * - The `url` is a mandatory attribute / property
 * - An extension SHALL have either a value (i.e. a `value[x]` element) or sub-extensions, but not both.
 *   If present, the `value[x]` element SHALL have content (value attribute or other elements)
 *
 * @param json - JSON representing Extension
 * @returns Extension data model or undefined
 *
 * @category Utilities: FHIR Parsers
 * @see [Extension Element](https://hl7.org/fhir/R4/extensibility.html#extension)
 */
export function parseExtension(json: JSON.Object | undefined): Extension | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const extensionJsonObj: JSON.Object = JSON.asObject(json!, 'Extension JSON');
  const instance = new Extension(null);

  if ('url' in extensionJsonObj) {
    instance.setUrl(JSON.asString(extensionJsonObj['url'], 'Extension.url JSON'));
  } else {
    throw new FhirError(`${REQUIRED_PROPERTIES_REQD_IN_JSON} Extension.url`);
  }

  if ('id' in extensionJsonObj) {
    instance.setId(JSON.asString(extensionJsonObj['id'], 'Extension.id JSON'));
  }

  const extensions = [] as Extension[];
  if ('extension' in extensionJsonObj) {
    // Extension has child extensions only
    const extensionJsonArray: JSON.Array = JSON.asArray(extensionJsonObj['extension']);
    extensionJsonArray.forEach((extensionJson: JSON.Value) => {
      const extension: Extension | undefined = parseExtension(extensionJson as JSON.Object);
      if (extension !== undefined) {
        extensions.push(extension);
      }
    });
  }

  if (extensions.length > 0) {
    instance.setExtension(extensions);
  } else {
    // Extension might have one value[x]
    const dataTypeValue: DataType | undefined = getValueXData(extensionJsonObj, 'value');
    if (dataTypeValue !== undefined) {
      instance.setValue(dataTypeValue);
    }
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

//endregion

//region Helpers

/**
 * PrimitiveTypeJson
 *
 * @privateRemarks
 * Single object containing the JSON for for both the primitive data value and its sibling data Element, if any.
 *
 * @param dtJson - primitive data JSON
 * @param dtSiblingJson - primitive data's sibling Element JSON
 *
 * @interface
 * @category Utilities: FHIR Parsers
 */
export interface PrimitiveTypeJson {
  dtJson: JSON.Value | undefined;
  dtSiblingJson: JSON.Object | undefined;
}

/**
 * Add `Element.id` and/or `Element.extension` to the DataType instance.
 *
 * @param instance - instance of DataType on which to add Element properties from dataTypeJson
 * @param dataTypeJson - DataType JSON containing Element properties, if any
 *
 * @category Utilities: FHIR Parsers
 */
export function processElementJson(instance: DataType, dataTypeJson: JSON.Value | undefined): void {
  assertIsDefined<DataType>(instance, `Provided instance is undefined/null`);
  if (!JSON.hasFhirData(dataTypeJson)) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const element: JSON.Object = JSON.asObject(dataTypeJson!, `${instance.constructor.name} Element`);

  if ('id' in element) {
    instance.setId(JSON.asString(element['id'], `${instance.constructor.name}.id`));
  }

  if ('extension' in element) {
    const extensions = [] as Extension[];
    const extensionArray = element['extension'] as JSON.Array;
    for (const extensionJson of extensionArray) {
      const extension: Extension | undefined = parseExtension(extensionJson as JSON.Object);
      if (extension !== undefined) {
        extensions.push(extension);
      }
    }
    if (extensions.length > 0) {
      instance.setExtension(extensions);
    }
  }
}

/**
 * Add `Element.id` and/or `Element.extension` and/or `BackboneElement.modifierExtension` to the BackboneElement instance.
 *
 * @param instance - instance of BackboneElement on which to add Element/BackboneElement properties from dataJson
 * @param dataJson - Data JSON containing Element/BackboneElement properties, if any
 *
 * @category Utilities: FHIR Parsers
 */
export function processBackboneElementJson(instance: BackboneElement, dataJson: JSON.Value | undefined): void {
  assertIsDefined<BackboneElement>(instance, `Provided instance is undefined/null`);
  if (!JSON.hasFhirData(dataJson)) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const backboneElement: JSON.Object = JSON.asObject(dataJson!, `${instance.constructor.name} BackboneElement`);

  if ('id' in backboneElement) {
    instance.setId(JSON.asString(backboneElement['id'], `${instance.constructor.name}.id`));
  }

  if ('extension' in backboneElement) {
    const extensions = [] as Extension[];
    const extensionArray = backboneElement['extension'] as JSON.Array;
    for (const extensionJson of extensionArray) {
      const extension: Extension | undefined = parseExtension(extensionJson as JSON.Object);
      if (extension !== undefined) {
        extensions.push(extension);
      }
    }
    if (extensions.length > 0) {
      instance.setExtension(extensions);
    }
  }

  if ('modifierExtension' in backboneElement) {
    const modifierExtensions = [] as Extension[];
    const modifierExtensionArray = backboneElement['modifierExtension'] as JSON.Array;
    for (const extensionJson of modifierExtensionArray) {
      const extension: Extension | undefined = parseExtension(extensionJson as JSON.Object);
      if (extension !== undefined) {
        modifierExtensions.push(extension);
      }
    }
    if (modifierExtensions.length > 0) {
      instance.setModifierExtension(modifierExtensions);
    }
  }
}

/**
 * Add `Resource.id`, `Resource.meta`, `Resource.implicitRules`, and/or `Resource.language` to the Resource instance.
 *
 * @param instance - instance of Resource on which to add Resource properties from dataJson
 * @param dataJson - Data JSON containing Resource properties, if any
 *
 * @category Utilities: FHIR Parsers
 */
export function processResourceJson(instance: Resource, dataJson: JSON.Value | undefined): void {
  assertIsDefined<Resource>(instance, `Provided instance is undefined/null`);
  if (!JSON.hasFhirData(dataJson)) {
    return;
  }

  const sourceResource: string = instance.constructor.name;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const resourceObj: JSON.Object = JSON.asObject(dataJson!, `${sourceResource} JSON`);

  if ('id' in resourceObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(resourceObj, `${sourceResource}.id`, 'id', 'string');
    const datatype: IdType | undefined = parseIdType(dtJson, dtSiblingJson);
    instance.setIdElement(datatype);
  }

  if ('meta' in resourceObj) {
    const datatype: Meta | undefined = parseMeta(resourceObj['meta'], `${sourceResource}.meta`);
    instance.setMeta(datatype);
  }

  if ('implicitRules' in resourceObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
      resourceObj,
      `${sourceResource}.implicitRules`,
      'implicitRules',
      'string',
    );
    const datatype: UriType | undefined = parseUriType(dtJson, dtSiblingJson);
    instance.setImplicitRulesElement(datatype);
  }

  if ('language' in resourceObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
      resourceObj,
      `${sourceResource}.language`,
      'language',
      'string',
    );
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setLanguageElement(datatype);
  }
}

/**
 * Add Resource properties, if any, plus `DomainResource.contained`, `DomainResource.extension`,
 * and/or * `DomainResource.modifierExtension` to the DomainResource instance.
 *
 * @param instance - instance of DomainResource on which to add DomainResource properties from dataJson
 * @param dataJson - Data JSON containing DomainResource properties, if any
 *
 * @category Utilities: FHIR Parsers
 * @see {@link processResourceJson}
 */
export function processDomainResourceJson(instance: DomainResource, dataJson: JSON.Value | undefined): void {
  assertIsDefined<DomainResource>(instance, `Provided instance is undefined/null`);
  if (!JSON.hasFhirData(dataJson)) {
    return;
  }

  const sourceResource: string = instance.constructor.name;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const resourceObj: JSON.Object = JSON.asObject(dataJson!, `${sourceResource} JSON`);

  processResourceJson(instance, resourceObj);

  if ('text' in resourceObj) {
    const datatype: Narrative | undefined = parseNarrative(resourceObj['text'], `${sourceResource}.text`);
    instance.setText(datatype);
  }

  // NOTE: "contained" is handled in Resource-based FHIR model rather than here in processDomainResourceJson
  //       to minimize circular references!
  // if ('contained' in resourceObj) {}

  if ('extension' in resourceObj) {
    const extensionArray = JSON.asArray(resourceObj['extension'], `${sourceResource}.extension`);
    extensionArray.forEach((extensionJson: JSON.Value) => {
      const datatype: Extension | undefined = parseExtension(extensionJson as JSON.Object);
      instance.addExtension(datatype);
    });
  }

  if ('modifierExtension' in resourceObj) {
    const modifierExtensionArray = JSON.asArray(
      resourceObj['modifierExtension'],
      `${sourceResource}.modifierExtension`,
    );
    modifierExtensionArray.forEach((extensionJson: JSON.Value) => {
      const datatype: Extension | undefined = parseExtension(extensionJson as JSON.Object);
      instance.addModifierExtension(datatype);
    });
  }
}

// Ignore for coverage because all parse functions have their own tests
/* istanbul ignore next */
/**
 * Return an instance of DataType for the `value[x]` if it exists.
 *
 * @param jsonObj - source JSON object
 * @param fieldName - JSON field name (without '[x]' if polymorphic)
 * @returns the appropriate DataType instance or undefined
 *
 * @hidden
 */
export function getValueXData(jsonObj: JSON.Object, fieldName: string): DataType | undefined {
  assertIsDefined<JSON.Object>(jsonObj, `Provided jsonObj is undefined/null`);
  const valueXKey = Object.keys(jsonObj).find((key) =>
    OPEN_DATE_TYPE_KEY_NAMES.includes(key.replace(fieldName, 'value')),
  );

  if (valueXKey !== undefined && valueXKey in jsonObj) {
    const dataValue: JSON.Value | undefined = jsonObj[valueXKey];
    const siblingDataValue: JSON.Value | undefined = jsonObj[`_${valueXKey}`];
    const switchKey = valueXKey.replace(fieldName, 'value');

    if (dataValue !== undefined) {
      switch (switchKey) {
        case 'valueBase64Binary':
          return parseBase64BinaryType(dataValue, siblingDataValue);
        case 'valueBoolean':
          return parseBooleanType(dataValue, siblingDataValue);
        case 'valueCanonical':
          return parseCanonicalType(dataValue, siblingDataValue);
        case 'valueCode':
          // NOTE - EnumCodeType is a subclass of CodeType and will always be serialized/parsed as a CodeType
          return parseCodeType(dataValue, siblingDataValue);
        case 'valueDateTime':
          return parseDateTimeType(dataValue, siblingDataValue);
        case 'valueDate':
          return parseDateType(dataValue, siblingDataValue);
        case 'valueDecimal':
          return parseDecimalType(dataValue, siblingDataValue);
        case 'valueId':
          return parseIdType(dataValue, siblingDataValue);
        case 'valueInstant':
          return parseInstantType(dataValue, siblingDataValue);
        case 'valueInteger64':
          return parseInteger64Type(dataValue, siblingDataValue);
        case 'valueInteger':
          return parseIntegerType(dataValue, siblingDataValue);
        case 'valueMarkdown':
          return parseMarkdownType(dataValue, siblingDataValue);
        case 'valueOid':
          return parseOidType(dataValue, siblingDataValue);
        case 'valuePositiveInt':
          return parsePositiveIntType(dataValue, siblingDataValue);
        case 'valueString':
          return parseStringType(dataValue, siblingDataValue);
        case 'valueTime':
          return parseTimeType(dataValue, siblingDataValue);
        case 'valueUnsignedInt':
          return parseUnsignedIntType(dataValue, siblingDataValue);
        case 'valueUri':
          return parseUriType(dataValue, siblingDataValue);
        case 'valueUrl':
          return parseUrlType(dataValue, siblingDataValue);
        case 'valueUuid':
          return parseUuidType(dataValue, siblingDataValue);
        case 'valueXhtml':
          return parseXhtmlType(dataValue, siblingDataValue);

        case 'valueAddress':
          return parseAddress(dataValue);
        case 'valueAttachment':
          return parseAttachment(dataValue);
        case 'valueCodeableConcept':
          return parseCodeableConcept(dataValue);
        case 'valueCoding':
          return parseCoding(dataValue);
        case 'valueContactPoint':
          return parseContactPoint(dataValue);
        case 'valueHumanName':
          return parseHumanName(dataValue);
        case 'valueIdentifier':
          return parseIdentifier(dataValue);
        case 'valueMeta':
          return parseMeta(dataValue);
        case 'valueNarrative':
          return parseNarrative(dataValue);
        case 'valuePeriod':
          return parsePeriod(dataValue);
        case 'valueQuantity':
          return parseQuantity(dataValue);
        case 'valueRange':
          return parseRange(dataValue);
        case 'valueReference':
          return parseReference(dataValue);
        case 'valueSimpleQuantity':
          return parseSimpleQuantity(dataValue);

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
 * @param sourceField - source data type name
 * @param primitiveFieldName - primitive's field name in datatypeJsonObj
 * @param jsonType - type of expected field's data
 * @returns object containing the primitive data plus its Element data, if any
 *
 * @category Utilities: FHIR Parsers
 */
export function getPrimitiveTypeJson(
  datatypeJsonObj: JSON.Object,
  sourceField: string,
  primitiveFieldName: string,
  jsonType: 'boolean' | 'number' | 'string',
): PrimitiveTypeJson {
  if (!JSON.hasFhirData(datatypeJsonObj)) {
    return { dtJson: undefined, dtSiblingJson: undefined };
  }
  assertIsDefined<string>(sourceField, `Provided sourceField is undefined/null`);
  assertIsString(sourceField, `Provided sourceField is not a string`);
  assertIsDefined<string>(primitiveFieldName, `Provided primitiveFieldName is undefined/null`);
  assertIsString(primitiveFieldName, `Provided primitiveFieldName is not a string`);
  assertIsDefined<string>(jsonType, `Provided jsonType is undefined/null`);
  assertIsString(jsonType, `Provided jsonType is not a string`);

  let dtJson: JSON.Value | undefined = undefined;
  if (isDefined<JSON.Value | undefined>(datatypeJsonObj[primitiveFieldName])) {
    if (jsonType === 'boolean') {
      dtJson = JSON.asBoolean(datatypeJsonObj[primitiveFieldName], sourceField);
    } else if (jsonType === 'number') {
      dtJson = JSON.asNumber(datatypeJsonObj[primitiveFieldName], sourceField);
    } else {
      dtJson = JSON.asString(datatypeJsonObj[primitiveFieldName], sourceField);
    }
  }

  const siblingFieldName = `_${primitiveFieldName}`;
  let dtSiblingJson: JSON.Object | undefined = undefined;
  if (siblingFieldName in datatypeJsonObj) {
    if (datatypeJsonObj[siblingFieldName] !== undefined) {
      dtSiblingJson = JSON.asObject(
        datatypeJsonObj[siblingFieldName],
        sourceField.replace(primitiveFieldName, siblingFieldName),
      );
    }
  }

  return { dtJson: dtJson, dtSiblingJson: dtSiblingJson };
}

/**
 * Returns an array containing the primitive data type's value and its sibling Element, if any.
 *
 * @param datatypeJsonObj - source JSON object
 * @param sourceField - source data type name
 * @param primitiveFieldName - primitive's field name in datatypeJsonObj
 * @param jsonType - type of expected field's data
 * @returns array containing objects of the primitive data plus its Element data, if any
 *
 * @category Utilities: FHIR Parsers
 */
export function getPrimitiveTypeListJson(
  datatypeJsonObj: JSON.Object,
  sourceField: string,
  primitiveFieldName: string,
  jsonType: 'boolean' | 'number' | 'string',
): PrimitiveTypeJson[] {
  if (!JSON.hasFhirData(datatypeJsonObj)) {
    return [];
  }
  assertIsDefined<string>(sourceField, `Provided sourceField is undefined/null`);
  assertIsString(sourceField, `Provided sourceField is not a string`);
  assertIsDefined<string>(primitiveFieldName, `Provided primitiveFieldName is undefined/null`);
  assertIsString(primitiveFieldName, `Provided primitiveFieldName is not a string`);
  assertIsDefined<string>(jsonType, `Provided jsonType is undefined/null`);
  assertIsString(jsonType, `Provided jsonType is not a string`);
  // Calling function should have already ensured this is true!
  assert(primitiveFieldName in datatypeJsonObj, `${primitiveFieldName} does not exist in provided JSON.Object!`);

  const dataJsonArray: JSON.Array = JSON.asArray(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    datatypeJsonObj[primitiveFieldName]!,
    sourceField,
  );

  const siblingFieldName = `_${primitiveFieldName}`;
  let dataElementJsonArray: JSON.Array | undefined = undefined;
  if (siblingFieldName in datatypeJsonObj) {
    dataElementJsonArray = JSON.asArray(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      datatypeJsonObj[siblingFieldName]!,
      sourceField.replace(primitiveFieldName, siblingFieldName),
    );
    // FHIR specification requires both arrays to be same size with null sibling values when there is no matching sibling element
    // [JSON representation of primitive elements](https://hl7.org/fhir/R4/json.html#primitive)
    assert(
      dataJsonArray.length === dataElementJsonArray.length,
      `Invalid JSON: Contrary to FHIR Specification, ${sourceField} and ${sourceField.replace(primitiveFieldName, siblingFieldName)} have different sizes!`,
    );
  }

  // At this point, dataJsonArray and dataElementJsonArray, if defined, have the same length
  const primitiveTypeJsonArray: PrimitiveTypeJson[] = [];
  dataJsonArray.forEach((dataJson: JSON.Value, idx) => {
    const primitiveJsonObj = {} as JSON.Object;
    primitiveJsonObj[primitiveFieldName] = dataJson;
    if (
      isDefined<JSON.Array | undefined>(dataElementJsonArray) &&
      isDefined<JSON.Value | undefined>(dataElementJsonArray[idx])
    ) {
      primitiveJsonObj[siblingFieldName] = dataElementJsonArray[idx];
    }
    const result: PrimitiveTypeJson = getPrimitiveTypeJson(primitiveJsonObj, sourceField, primitiveFieldName, jsonType);
    primitiveTypeJsonArray.push(result);
  });

  return primitiveTypeJsonArray;
}

/**
 * Asserts the provided JSON object represents a valid FHIR Resource.
 *
 * @param dataJsonObj - source JSON object
 * @param fhirResourceType - expected FhirResourceType
 * @throws AssertionError for invalid arguments
 * @throws InvalidTypeError for invalid fhirResourceType
 *
 * @category Type Guards/Assertions
 */
export function assertFhirResourceTypeJson(dataJsonObj: JSON.Object, fhirResourceType: FhirResourceType): void {
  assertIsDefined<JSON.Object>(dataJsonObj, `The dataJsonObj argument is undefined/null.`);
  assertIsDefined<FhirResourceType>(fhirResourceType, `The fhirResourceType argument is undefined/null.`);
  assert(!isEmpty(fhirResourceType), `The fhirResourceType argument is empty.`);
  assert(JSON.isJsonObject(dataJsonObj), `The provided JSON does not represent a JSON object.`);

  if ('resourceType' in dataJsonObj) {
    const resourceTypeValue = JSON.asString(dataJsonObj['resourceType'], `${fhirResourceType}.resourceType`);
    if (resourceTypeValue !== fhirResourceType) {
      throw new InvalidTypeError(
        `Invalid JSON 'resourceType' ('${resourceTypeValue}') value; Should be '${fhirResourceType}'.`,
      );
    }
  } else {
    throw new InvalidTypeError(
      `The provided JSON does not represent a FHIR Resource (missing 'resourceType' element).`,
    );
  }
}

//endregion

//region PrimitiveTypes

/**
 * Parse the provided json into Base64BinaryType data model.
 *
 * @param json - JSON representing Base64BinaryType
 * @param siblingJson - JSON representing the Base64BinaryType's inherited Element
 * @returns Base64BinaryType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseBase64BinaryType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): Base64BinaryType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new Base64BinaryType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into BooleanType data model.
 *
 * @param json - JSON representing BooleanType
 * @param siblingJson - JSON representing the BooleanType's inherited Element
 * @returns BooleanType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseBooleanType(json: JSON.Value | undefined, siblingJson?: JSON.Value): BooleanType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new BooleanType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asBoolean(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into a CanonicalType data model.
 *
 * @param json - JSON representing a CanonicalType
 * @param siblingJson - JSON representing the CanonicalType's inherited Element
 * @returns an CanonicalType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseCanonicalType(json: JSON.Value | undefined, siblingJson?: JSON.Value): CanonicalType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new CanonicalType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into CodeType data model.
 *
 * @remarks
 * EnumCodeType is a subclass of CodeType and will always be serialized/parsed as a CodeType.
 *
 * @param json - JSON representing CodeType
 * @param siblingJson - JSON representing the CodeType's inherited Element
 * @returns CodeType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseCodeType(json: JSON.Value | undefined, siblingJson?: JSON.Value): CodeType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new CodeType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into DateTimeType data model.
 *
 * @param json - JSON representing DateTimeType
 * @param siblingJson - JSON representing the DateTimeType's inherited Element
 * @returns DateTimeType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseDateTimeType(json: JSON.Value | undefined, siblingJson?: JSON.Value): DateTimeType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new DateTimeType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into DateType data model.
 *
 * @param json - JSON representing DateType
 * @param siblingJson - JSON representing the DateType's inherited Element
 * @returns DateType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseDateType(json: JSON.Value | undefined, siblingJson?: JSON.Value): DateType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new DateType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into DecimalType data model.
 *
 * @param json - JSON representing DecimalType
 * @param siblingJson - JSON representing the DecimalType's inherited Element
 * @returns DecimalType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseDecimalType(json: JSON.Value | undefined, siblingJson?: JSON.Value): DecimalType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new DecimalType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asNumber(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into IdType data model.
 *
 * @param json - JSON representing IdType
 * @param siblingJson - JSON representing the IdType's inherited Element
 * @returns IdType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseIdType(json: JSON.Value | undefined, siblingJson?: JSON.Value): IdType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new IdType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into InstantType data model.
 *
 * @param json - JSON representing InstantType
 * @param siblingJson - JSON representing the InstantType's inherited Element
 * @returns InstantType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseInstantType(json: JSON.Value | undefined, siblingJson?: JSON.Value): InstantType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new InstantType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into Integer64Type data model.
 *
 * @remarks
 * Integer64 serializes the underlying BigInt as a string. Therefore, parse a JSON string value into a BigInt.
 *
 * @param json - JSON representing Integer64Type
 * @param siblingJson - JSON representing the Integer64Type's inherited Element
 * @returns Integer64Type data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseInteger64Type(json: JSON.Value | undefined, siblingJson?: JSON.Value): Integer64Type | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new Integer64Type();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const int64Value = JSON.asString(json!, `json argument for ${instance.constructor.name}`);
  instance.setValue(BigInt(int64Value));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into IntegerType data model.
 *
 * @param json - JSON representing IntegerType
 * @param siblingJson - JSON representing the IntegerType's inherited Element
 * @returns IntegerType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseIntegerType(json: JSON.Value | undefined, siblingJson?: JSON.Value): IntegerType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new IntegerType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asNumber(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into MarkdownType data model.
 *
 * @param json - JSON representing MarkdownType
 * @param siblingJson - JSON representing the MarkdownType's inherited Element
 * @returns MarkdownType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseMarkdownType(json: JSON.Value | undefined, siblingJson?: JSON.Value): MarkdownType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new MarkdownType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into OidType data model.
 *
 * @param json - JSON representing OidType
 * @param siblingJson - JSON representing the OidType's inherited Element
 * @returns OidType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseOidType(json: JSON.Value | undefined, siblingJson?: JSON.Value): OidType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new OidType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into PositiveIntType data model.
 *
 * @param json - JSON representing PositiveIntType
 * @param siblingJson - JSON representing the PositiveIntType's inherited Element
 * @returns PositiveIntType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parsePositiveIntType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): PositiveIntType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new PositiveIntType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asNumber(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into StringType data model.
 *
 * @param json - JSON representing StringType
 * @param siblingJson - JSON representing the StringType's inherited Element
 * @returns StringType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseStringType(json: JSON.Value | undefined, siblingJson?: JSON.Value): StringType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new StringType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into TimeType data model.
 *
 * @param json - JSON representing TimeType
 * @param siblingJson - JSON representing the TimeType's inherited Element
 * @returns TimeType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseTimeType(json: JSON.Value | undefined, siblingJson?: JSON.Value): TimeType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new TimeType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into UnsignedIntType data model.
 *
 * @param json - JSON representing UnsignedIntType
 * @param siblingJson - JSON representing the UnsignedIntType's inherited Element
 * @returns UnsignedIntType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseUnsignedIntType(
  json: JSON.Value | undefined,
  siblingJson?: JSON.Value,
): UnsignedIntType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new UnsignedIntType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asNumber(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into UriType data model.
 *
 * @param json - JSON representing UriType
 * @param siblingJson - JSON representing the UriType's inherited Element
 * @returns UriType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseUriType(json: JSON.Value | undefined, siblingJson?: JSON.Value): UriType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new UriType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into UrlType data model.
 *
 * @param json - JSON representing UrlType
 * @param siblingJson - JSON representing the UrlType's inherited Element
 * @returns UrlType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseUrlType(json: JSON.Value | undefined, siblingJson?: JSON.Value): UrlType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new UrlType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into UuidType data model.
 *
 * @param json - JSON representing UuidType
 * @param siblingJson - JSON representing the UuidType's inherited Element
 * @returns UuidType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseUuidType(json: JSON.Value | undefined, siblingJson?: JSON.Value): UuidType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new UuidType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into XhtmlType data model.
 *
 * @remarks
 * The following rules are applicable to parsing JSON into XhtmlType:
 * - An empty string is an invalid xhtml value.
 * - According to the FHIR specification, Extensions are not permitted on the xhtml type.
 *
 * @param json - JSON representing XhtmlType
 * @param siblingJson - JSON representing the XhtmlType's inherited Element
 * @returns XhtmlType data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseXhtmlType(json: JSON.Value | undefined, siblingJson?: JSON.Value): XhtmlType | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const instance = new XhtmlType();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  instance.setValue(JSON.asString(json!, `json argument for ${instance.constructor.name}`));
  processElementJson(instance, siblingJson);

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

//endregion

//region ComplexTypes

/**
 * Parse the provided json into the appropriate data model for the choice data types.
 *
 * @param jsonObj - JSON representing the choice data type
 * @param sourceField - data source field (e.g. `<TypeName>.<TypeFieldName>`)
 * @param fieldName - JSON field name (without '[x]' if polymorphic)
 * @param metadata - ChoiceDataTypesMeta decorator metadata
 * @returns choice data type data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parsePolymorphicDataType(
  jsonObj: JSON.Object,
  sourceField: string,
  fieldName: string,
  metadata: DecoratorMetadataObject | null,
): DataType | undefined {
  if (!JSON.hasFhirData(jsonObj)) {
    return undefined;
  }
  assertIsDefined<string>(sourceField, `The sourceField argument is undefined/null.`);
  assertIsDefined<string>(fieldName, `The fieldName argument is undefined/null.`);
  assertIsDefined<DecoratorMetadataObject | null>(metadata, `The metadata argument is undefined/null.`);

  const choiceDataTypes: FhirDataType[] = getChoiceDatatypeDefsForField(metadata, fieldName);
  const supportedFieldNames = choiceDataTypes.map((item) => `${fieldName}${upperFirst(item)}`);

  // e.g., ['boolean', 'CodeableConcept', 'Quantity', 'Range', 'Reference']
  const valueKeys = Object.keys(jsonObj).filter((key) => key.startsWith(fieldName));
  if (fieldName in jsonObj) {
    throw new FhirError(INVALID_VALUEX_PROPERTY);
  } else if (valueKeys.length > 1) {
    throw new FhirError(`${INVALID_VALUEX_MULTIPLE_PROPERTIES} ${valueKeys.join(', ')}`);
  } else if (valueKeys[0] !== undefined && supportedFieldNames.includes(valueKeys[0])) {
    let instance: DataType | undefined = undefined;
    try {
      instance = getValueXData(jsonObj, fieldName);
    } catch (err) {
      if (err instanceof TypeError) {
        throw new TypeError(`Failed to parse ${sourceField}: ${err.message}`, err);
      } else {
        throw new Error(`Unexpected error parsing ${sourceField} from the provided JSON`);
      }
    }
    if (instance === undefined) {
      throw new Error(`Failed to parse ${sourceField} from the provided JSON`);
    }
    return instance;
  }
  return undefined;
}

/**
 * Parse the provided json into Address data model.
 *
 * @param json - JSON representing Address
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to HumanName
 * @returns Address data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseAddress(json: JSON.Value | undefined, sourceField?: string): Address | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'Address';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new Address();

  processElementJson(instance, datatypeJsonObj);

  if ('use' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'use', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setUseElement(datatype);
  }

  if ('type' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'type', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setTypeElement(datatype);
  }

  if ('text' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'text', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setTextElement(datatype);
  }

  if ('line' in datatypeJsonObj) {
    const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(datatypeJsonObj, source, 'line', 'string');
    dataJsonArray.forEach((dataJson: PrimitiveTypeJson) => {
      const datatype: StringType | undefined = parseStringType(dataJson.dtJson, dataJson.dtSiblingJson);
      instance.addLineElement(datatype);
    });
  }

  if ('city' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'city', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setCityElement(datatype);
  }

  if ('district' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'district', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setDistrictElement(datatype);
  }

  if ('state' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'state', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setStateElement(datatype);
  }

  if ('postalCode' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'postalCode', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setPostalCodeElement(datatype);
  }

  if ('country' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'country', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setCountryElement(datatype);
  }

  if ('period' in datatypeJsonObj) {
    const datatype: Period | undefined = parsePeriod(datatypeJsonObj['period'], `${source}.period`);
    instance.setPeriod(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into Attachment data model.
 *
 * @param json - JSON representing Attachment
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to HumanName
 * @returns Attachment data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseAttachment(json: JSON.Value | undefined, sourceField?: string): Attachment | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'Attachment';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new Attachment();

  processElementJson(instance, datatypeJsonObj);

  if ('contentType' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'contentType', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setContentTypeElement(datatype);
  }

  if ('language' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'language', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setLanguageElement(datatype);
  }

  if ('data' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'data', 'string');
    const datatype: Base64BinaryType | undefined = parseBase64BinaryType(dtJson, dtSiblingJson);
    instance.setDataElement(datatype);
  }

  if ('url' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'url', 'string');
    const datatype: UrlType | undefined = parseUrlType(dtJson, dtSiblingJson);
    instance.setUrlElement(datatype);
  }

  if ('size' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'size', 'number');
    const datatype: UnsignedIntType | undefined = parseUnsignedIntType(dtJson, dtSiblingJson);
    instance.setSizeElement(datatype);
  }

  if ('hash' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'hash', 'string');
    const datatype: Base64BinaryType | undefined = parseBase64BinaryType(dtJson, dtSiblingJson);
    instance.setHashElement(datatype);
  }

  if ('title' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'title', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setTitleElement(datatype);
  }

  if ('creation' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'creation', 'string');
    const datatype: DateTimeType | undefined = parseDateTimeType(dtJson, dtSiblingJson);
    instance.setCreationElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into CodeableConcept data model.
 *
 * @param json - JSON representing CodeableConcept
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to CodeableConcept
 * @returns CodeableConcept data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseCodeableConcept(json: JSON.Value | undefined, sourceField?: string): CodeableConcept | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'CodeableConcept';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new CodeableConcept();

  processElementJson(instance, datatypeJsonObj);

  if ('coding' in datatypeJsonObj) {
    const dataElementJsonArray: JSON.Array = JSON.asArray(datatypeJsonObj['coding'], `${source}.coding`);
    dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
      const datatype: Coding | undefined = parseCoding(dataElementJson, `${source}.coding[${String(idx)}]`);
      instance.addCoding(datatype);
    });
  }

  if ('text' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'text', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setTextElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into Coding data model.
 *
 * @param json - JSON representing Coding
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Coding
 * @returns Coding data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseCoding(json: JSON.Value | undefined, sourceField?: string): Coding | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'Coding';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new Coding();

  processElementJson(instance, datatypeJsonObj);

  if ('system' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'system', 'string');
    const datatype: UriType | undefined = parseUriType(dtJson, dtSiblingJson);
    instance.setSystemElement(datatype);
  }

  if ('version' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'version', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setVersionElement(datatype);
  }

  if ('code' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'code', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setCodeElement(datatype);
  }

  if ('display' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'display', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setDisplayElement(datatype);
  }

  if ('userSelected' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'userSelected', 'boolean');
    const datatype: BooleanType | undefined = parseBooleanType(dtJson, dtSiblingJson);
    instance.setUserSelectedElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into ContactPoint data model.
 *
 * @param json - JSON representing ContactPoint
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to ContactPoint
 * @returns ContactPoint data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseContactPoint(json: JSON.Value | undefined, sourceField?: string): ContactPoint | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'ContactPoint';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new ContactPoint();

  processElementJson(instance, datatypeJsonObj);

  if ('system' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'system', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setSystemElement(datatype);
  }

  if ('value' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'value', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setValueElement(datatype);
  }

  if ('use' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'use', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setUseElement(datatype);
  }

  if ('rank' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'rank', 'number');
    const datatype: PositiveIntType | undefined = parsePositiveIntType(dtJson, dtSiblingJson);
    instance.setRankElement(datatype);
  }

  if ('period' in datatypeJsonObj) {
    const datatype: Period | undefined = parsePeriod(datatypeJsonObj['period'], `${source}.period`);
    instance.setPeriod(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into HumanName data model.
 *
 * @param json - JSON representing HumanName
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to HumanName
 * @returns HumanName data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseHumanName(json: JSON.Value | undefined, sourceField?: string): HumanName | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'HumanName';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new HumanName();

  processElementJson(instance, datatypeJsonObj);

  if ('use' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'use', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setUseElement(datatype);
  }

  if ('text' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'text', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setTextElement(datatype);
  }

  if ('family' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'family', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setFamilyElement(datatype);
  }

  if ('given' in datatypeJsonObj) {
    const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(datatypeJsonObj, source, 'given', 'string');
    dataJsonArray.forEach((dataJson: PrimitiveTypeJson) => {
      const datatype: StringType | undefined = parseStringType(dataJson.dtJson, dataJson.dtSiblingJson);
      instance.addGivenElement(datatype);
    });
  }

  if ('prefix' in datatypeJsonObj) {
    const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(datatypeJsonObj, source, 'prefix', 'string');
    dataJsonArray.forEach((dataJson: PrimitiveTypeJson) => {
      const datatype: StringType | undefined = parseStringType(dataJson.dtJson, dataJson.dtSiblingJson);
      instance.addPrefixElement(datatype);
    });
  }

  if ('suffix' in datatypeJsonObj) {
    const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(datatypeJsonObj, source, 'suffix', 'string');
    dataJsonArray.forEach((dataJson: PrimitiveTypeJson) => {
      const datatype: StringType | undefined = parseStringType(dataJson.dtJson, dataJson.dtSiblingJson);
      instance.addSuffixElement(datatype);
    });
  }

  if ('period' in datatypeJsonObj) {
    const datatype: Period | undefined = parsePeriod(datatypeJsonObj['period'], `${source}.period`);
    instance.setPeriod(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into Identifier data model.
 *
 * @param json - JSON representing Identifier
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Identifier
 * @returns Identifier data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseIdentifier(json: JSON.Value | undefined, sourceField?: string): Identifier | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'Identifier';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new Identifier();

  processElementJson(instance, datatypeJsonObj);

  if ('use' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'use', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setUseElement(datatype);
  }

  if ('type' in datatypeJsonObj) {
    const datatype: CodeableConcept | undefined = parseCodeableConcept(datatypeJsonObj['type'], `${source}.type`);
    instance.setType(datatype);
  }

  if ('system' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'system', 'string');
    const datatype: UriType | undefined = parseUriType(dtJson, dtSiblingJson);
    instance.setSystemElement(datatype);
  }

  if ('value' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'value', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setValueElement(datatype);
  }

  if ('period' in datatypeJsonObj) {
    const datatype: Period | undefined = parsePeriod(datatypeJsonObj['period'], `${source}.period`);
    instance.setPeriod(datatype);
  }

  if ('assigner' in datatypeJsonObj) {
    const datatype: Reference | undefined = parseReference(datatypeJsonObj['assigner'], `${source}.assigner`);
    instance.setAssigner(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into Meta data model.
 *
 * @param json - JSON representing Meta
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Meta
 * @returns Meta data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseMeta(json: JSON.Value | undefined, sourceField?: string): Meta | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'Meta';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new Meta();

  processElementJson(instance, datatypeJsonObj);

  if ('versionId' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'versionId', 'string');
    const datatype: IdType | undefined = parseIdType(dtJson, dtSiblingJson);
    instance.setVersionIdElement(datatype);
  }

  if ('lastUpdated' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'lastUpdated', 'string');
    const datatype: InstantType | undefined = parseInstantType(dtJson, dtSiblingJson);
    instance.setLastUpdatedElement(datatype);
  }

  if ('source' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'source', 'string');
    const datatype: UriType | undefined = parseUriType(dtJson, dtSiblingJson);
    instance.setSourceElement(datatype);
  }

  if ('profile' in datatypeJsonObj) {
    const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(datatypeJsonObj, source, 'profile', 'string');
    dataJsonArray.forEach((dataJson: PrimitiveTypeJson) => {
      const datatype: CanonicalType | undefined = parseCanonicalType(dataJson.dtJson, dataJson.dtSiblingJson);
      instance.addProfileElement(datatype);
    });
  }

  if ('security' in datatypeJsonObj) {
    const dataElementJsonArray: JSON.Array = JSON.asArray(datatypeJsonObj['security'], `${source}.security`);
    dataElementJsonArray.forEach((dataElementJson: JSON.Value) => {
      const datatype: Coding | undefined = parseCoding(dataElementJson, `${source}.security.coding`);
      instance.addSecurity(datatype);
    });
  }

  if ('tag' in datatypeJsonObj) {
    const dataElementJsonArray: JSON.Array = JSON.asArray(datatypeJsonObj['tag'], `${source}.tag`);
    dataElementJsonArray.forEach((dataElementJson: JSON.Value) => {
      const datatype: Coding | undefined = parseCoding(dataElementJson, `${source}.tag.coding`);
      instance.addTag(datatype);
    });
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into Narrative data model.
 *
 * @param json - JSON representing Narrative
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Narrative
 * @returns Narrative data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseNarrative(json: JSON.Value | undefined, sourceField?: string): Narrative | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'Narrative';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new Narrative(null, null);

  processElementJson(instance, datatypeJsonObj);

  const missingReqdProperties: string[] = [];

  if ('status' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'status', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    if (datatype === undefined) {
      missingReqdProperties.push(`${source}.status`);
    } else {
      instance.setStatusElement(datatype);
    }
  } else {
    missingReqdProperties.push(`${source}.status`);
  }

  if ('div' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'div', 'string');
    const datatype: XhtmlType | undefined = parseXhtmlType(dtJson, dtSiblingJson);
    if (datatype === undefined) {
      missingReqdProperties.push(`${source}.div`);
    } else {
      instance.setDivElement(datatype);
    }
  } else {
    missingReqdProperties.push(`${source}.div`);
  }

  if (missingReqdProperties.length > 0) {
    const errMsg = `${REQUIRED_PROPERTIES_REQD_IN_JSON} ${missingReqdProperties.join(', ')}`;
    throw new FhirError(errMsg);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into Period data model.
 *
 * @param json - JSON representing Period
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Period
 * @returns Period data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parsePeriod(json: JSON.Value | undefined, sourceField?: string): Period | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'Period';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new Period();

  processElementJson(instance, datatypeJsonObj);

  if ('start' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'start', 'string');
    const datatype: DateTimeType | undefined = parseDateTimeType(dtJson, dtSiblingJson);
    instance.setStartElement(datatype);
  }

  if ('end' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'end', 'string');
    const datatype: DateTimeType | undefined = parseDateTimeType(dtJson, dtSiblingJson);
    instance.setEndElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into Quantity data model.
 *
 * @param json - JSON representing Quantity
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Quantity
 * @returns Quantity data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseQuantity(json: JSON.Value | undefined, sourceField?: string): Quantity | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'Quantity';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new Quantity();

  processElementJson(instance, datatypeJsonObj);

  if ('value' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'value', 'number');
    const datatype: DecimalType | undefined = parseDecimalType(dtJson, dtSiblingJson);
    instance.setValueElement(datatype);
  }

  if ('comparator' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'comparator', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setComparatorElement(datatype);
  }

  if ('unit' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'unit', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setUnitElement(datatype);
  }

  if ('system' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'system', 'string');
    const datatype: UriType | undefined = parseUriType(dtJson, dtSiblingJson);
    instance.setSystemElement(datatype);
  }

  if ('code' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'code', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setCodeElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into Range data model.
 *
 * @param json - JSON representing Range
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Range
 * @returns Range data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseRange(json: JSON.Value | undefined, sourceField?: string): Range | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'Range';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new Range();

  processElementJson(instance, datatypeJsonObj);

  if ('low' in datatypeJsonObj) {
    const datatype: SimpleQuantity | undefined = parseSimpleQuantity(datatypeJsonObj['low'], `${source}.low`);
    instance.setLow(datatype);
  }

  if ('high' in datatypeJsonObj) {
    const datatype: SimpleQuantity | undefined = parseSimpleQuantity(datatypeJsonObj['high'], `${source}.high`);
    instance.setHigh(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into Reference data model.
 *
 * @param json - JSON representing Reference
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Reference
 * @returns Reference data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseReference(json: JSON.Value | undefined, sourceField?: string): Reference | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'Reference';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new Reference();

  processElementJson(instance, datatypeJsonObj);

  if ('reference' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'reference', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setReferenceElement(datatype);
  }

  if ('type' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'type', 'string');
    const datatype: UriType | undefined = parseUriType(dtJson, dtSiblingJson);
    instance.setTypeElement(datatype);
  }

  if ('identifier' in datatypeJsonObj) {
    const datatype: Identifier | undefined = parseIdentifier(datatypeJsonObj['identifier'], `${source}.identifier`);
    instance.setIdentifier(datatype);
  }

  if ('display' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'display', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setDisplayElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

/**
 * Parse the provided json into SimpleQuantity data model.
 *
 * @param json - JSON representing SimpleQuantity
 * @param sourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to SimpleQuantity
 * @returns SimpleQuantity data model or undefined
 *
 * @category Utilities: FHIR Parsers
 */
export function parseSimpleQuantity(json: JSON.Value | undefined, sourceField?: string): SimpleQuantity | undefined {
  if (!JSON.hasFhirData(json)) {
    return undefined;
  }

  const source = isDefined<string | undefined>(sourceField) ? sourceField : 'SimpleQuantity';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const datatypeJsonObj: JSON.Object = JSON.asObject(json!, `${source} JSON`);
  const instance = new SimpleQuantity();

  processElementJson(instance, datatypeJsonObj);

  if ('value' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'value', 'number');
    const datatype: DecimalType | undefined = parseDecimalType(dtJson, dtSiblingJson);
    instance.setValueElement(datatype);
  }

  if ('unit' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'unit', 'string');
    const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
    instance.setUnitElement(datatype);
  }

  if ('system' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'system', 'string');
    const datatype: UriType | undefined = parseUriType(dtJson, dtSiblingJson);
    instance.setSystemElement(datatype);
  }

  if ('code' in datatypeJsonObj) {
    const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(datatypeJsonObj, source, 'code', 'string');
    const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
    instance.setCodeElement(datatype);
  }

  assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
  return instance;
}

//endregion
