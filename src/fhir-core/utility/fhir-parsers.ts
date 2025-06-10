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

import { BackboneElement, DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { FhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import { Resource } from '@src/fhir-core/base-models/Resource';
import {
  INSTANCE_EMPTY_ERROR_MSG,
  INVALID_VALUEX_MULTIPLE_PROPERTIES,
  INVALID_VALUEX_PROPERTY,
  REQUIRED_PROPERTIES_REQD_IN_JSON,
} from '@src/fhir-core/constants';
import { Address } from '@src/fhir-core/data-types/complex/Address';
import { Attachment } from '@src/fhir-core/data-types/complex/Attachment';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { ContactPoint } from '@src/fhir-core/data-types/complex/ContactPoint';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Quantity, SimpleQuantity } from '@src/fhir-core/data-types/complex/Quantity-variations';
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { Signature } from '@src/fhir-core/data-types/complex/Signature';
import { FhirDataType, OPEN_DATA_TYPE_KEY_NAMES, OPEN_DATA_TYPES } from '@src/fhir-core/data-types/FhirDataType';
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
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { isEmpty, upperFirst } from '@src/fhir-core/utility/common-util';
import { getChoiceDatatypeDefsForField, getOpenDatatypeFields } from '@src/fhir-core/utility/decorators';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { assertIsDefined, assertIsString, isDefined } from '@src/fhir-core/utility/type-guards';
import { AssertionError, strict as assert } from 'node:assert';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ParsableDataModel<T extends DataType | Resource> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
  parse: (sourceJson: JSON.Value | JSON.Object, optSourceField?: string) => T | undefined;
};

/**
 * Parse the provided sourceJson to return the class instance from the parser
 *
 * @param className - class having static parse method
 * @param sourceJson - source JSON to be parsed
 * @param optSourceField - option source field use to identify origin in error messages
 * @returns the class instance from the parser
 */
export function parser<T extends DataType | Resource>(
  className: ParsableDataModel<T>,
  sourceJson: JSON.Value | JSON.Object,
  optSourceField?: string,
): T | undefined {
  return className.parse(sourceJson, optSourceField);
}

export const PARSABLE_DATATYPE_MAP = new Map<string, ParsableDataModel<DataType | Resource>>();
PARSABLE_DATATYPE_MAP.set('Address', Address);
PARSABLE_DATATYPE_MAP.set('Attachment', Attachment);
PARSABLE_DATATYPE_MAP.set('CodeableConcept', CodeableConcept);
PARSABLE_DATATYPE_MAP.set('Coding', Coding);
PARSABLE_DATATYPE_MAP.set('ContactPoint', ContactPoint);
PARSABLE_DATATYPE_MAP.set('HumanName', HumanName);
PARSABLE_DATATYPE_MAP.set('Identifier', Identifier);
PARSABLE_DATATYPE_MAP.set('Meta', Meta);
PARSABLE_DATATYPE_MAP.set('Period', Period);
PARSABLE_DATATYPE_MAP.set('Quantity', Quantity);
PARSABLE_DATATYPE_MAP.set('Range', Range);
PARSABLE_DATATYPE_MAP.set('Reference', Reference);
PARSABLE_DATATYPE_MAP.set('Signature', Signature);
PARSABLE_DATATYPE_MAP.set('SimpleQuantity', SimpleQuantity);

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
 * Single object containing the JSON for both the primitive data value and its sibling data Element, if any.
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
    const datatype: Meta | undefined = Meta.parse(resourceObj['meta'], `${sourceResource}.meta`);
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
    const datatype: Narrative | undefined = Narrative.parse(resourceObj['text'], `${sourceResource}.text`);
    instance.setText(datatype);
  }

  // NOTE: "contained" is handled in Resource-based FHIR model rather than here in processDomainResourceJson
  //       to minimize circular references!
  // if ('contained' in resourceObj) {}

  if ('extension' in resourceObj) {
    const extensionArray = JSON.asArray(resourceObj['extension'], `${sourceResource}.extension`);
    extensionArray.forEach((extensionJson: JSON.Value) => {
      const datatype: Extension | undefined = parseExtension(extensionJson as JSON.Object);
      if (datatype !== undefined) {
        instance.addExtension(datatype);
      }
    });
  }

  if ('modifierExtension' in resourceObj) {
    const modifierExtensionArray = JSON.asArray(
      resourceObj['modifierExtension'],
      `${sourceResource}.modifierExtension`,
    );
    modifierExtensionArray.forEach((extensionJson: JSON.Value) => {
      const datatype: Extension | undefined = parseExtension(extensionJson as JSON.Object);
      if (datatype !== undefined) {
        instance.addModifierExtension(datatype);
      }
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
    OPEN_DATA_TYPE_KEY_NAMES.includes(key.replace(fieldName, 'value')),
  );

  if (valueXKey !== undefined && valueXKey in jsonObj) {
    const dataValue: JSON.Value | undefined = jsonObj[valueXKey];
    const siblingDataValue: JSON.Value | undefined = jsonObj[`_${valueXKey}`];
    const switchKey = valueXKey.replace(fieldName, 'value');
    const mapKey = valueXKey.replace(fieldName, '');

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
        case 'valueDate':
          return parseDateType(dataValue, siblingDataValue);
        case 'valueDateTime':
          return parseDateTimeType(dataValue, siblingDataValue);
        case 'valueDecimal':
          return parseDecimalType(dataValue, siblingDataValue);
        case 'valueId':
          return parseIdType(dataValue, siblingDataValue);
        case 'valueInstant':
          return parseInstantType(dataValue, siblingDataValue);
        case 'valueInteger':
          return parseIntegerType(dataValue, siblingDataValue);
        case 'valueInteger64':
          return parseInteger64Type(dataValue, siblingDataValue);
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
        // case 'valueXhtml': NOT INCLUDED IN OPEN DATATYPES

        // case 'valueAddress':
        //   return Address.parse(dataValue);
        // case 'valueAttachment':
        //   return Attachment.parse(dataValue);
        // case 'valueCodeableConcept':
        //   return CodeableConcept.parse(dataValue);
        // case 'valueCoding':
        //   return Coding.parse(dataValue);
        // case 'valueContactPoint':
        //   return ContactPoint.parse(dataValue);
        // case 'valueHumanName':
        //   return HumanName.parse(dataValue);
        // case 'valueIdentifier':
        //   return Identifier.parse(dataValue);
        // case 'valueMeta':
        //   return Meta.parse(dataValue);
        // // case 'valueNarrative': NOT INCLUDED IN OPEN DATATYPES
        // case 'valuePeriod':
        //   return Period.parse(dataValue);
        // case 'valueQuantity':
        //   return Quantity.parse(dataValue);
        // case 'valueRange':
        //   return Range.parse(dataValue);
        // case 'valueReference':
        //   return Reference.parse(dataValue);
        // case 'valueSignature':
        //   return Signature.parse(dataValue);
        // case 'valueSimpleQuantity':
        //   // Subclass of Quantity
        //   return SimpleQuantity.parse(dataValue);

        default:
          if (PARSABLE_DATATYPE_MAP.has(mapKey)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const parsableClass: ParsableDataModel<DataType | Resource> = PARSABLE_DATATYPE_MAP.get(mapKey)!;
            assert(parsableClass, `parsableClass data model for '${mapKey}' is not defined???`);
            return parser<DataType | Resource>(parsableClass, dataValue) as DataType | undefined;
          } else {
            return undefined;
          }
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
  // Calling function should have already ensured this is true!
  assert(primitiveFieldName in datatypeJsonObj, `${primitiveFieldName} does not exist in provided JSON.Object!`);

  let dtJson: JSON.Value | undefined = undefined;
  if (isDefined<JSON.Value>(datatypeJsonObj[primitiveFieldName])) {
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
    if (isDefined<JSON.Array>(dataElementJsonArray) && isDefined<JSON.Value>(dataElementJsonArray[idx])) {
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
 * Parse the provided json into the appropriate data model instance for the choice data types.
 *
 * @param jsonObj - JSON representing the choice data type
 * @param sourceField - data source field (e.g. `<TypeName>.<TypeFieldName>`)
 * @param fieldName - JSON field name (without '[x]')
 * @param metadata - ChoiceDataTypesMeta decorator metadata
 * @returns choice data type parsed instance or undefined
 * @throws AssertionError for missing parameters
 * @throws FhirError for invalid "value[x]" property
 * @throws TypeError for failure parsing "value[x]"
 * @throws Error for unexpected parsing error
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
  assertIsDefined<DecoratorMetadataObject>(metadata, `The metadata argument is undefined/null.`);

  // Strip the '[x]' from the fieldName but not the sourceField
  let plainFieldName = fieldName;
  const posX = fieldName.toLowerCase().lastIndexOf('[x]');
  if (posX > 0) {
    plainFieldName = fieldName.substring(0, posX);
  }

  const choiceDataTypes: FhirDataType[] = getChoiceDatatypeDefsForField(metadata, plainFieldName);
  const supportedFieldNames = choiceDataTypes.map((item) => `${plainFieldName}${upperFirst(item)}`);

  return getParsedType(jsonObj, sourceField, plainFieldName, supportedFieldNames);
}

/**
 * Parse the provided json into the appropriate data model instance for the open data types.
 *
 * @param jsonObj - JSON representing the open data type
 * @param sourceField - data source field (e.g. `<TypeName>.<TypeFieldName>`)
 * @param fieldName - JSON field name (without '[x]')
 * @param metadata - OpenDataTypesMeta decorator metadata
 * @returns open data type parsed instance or undefined
 * @throws AssertionError for missing parameters
 * @throws FhirError for invalid "value[x]" property
 * @throws TypeError for failure parsing "value[x]"
 * @throws Error for unexpected parsing error
 *
 * @category Utilities: FHIR Parsers
 */
export function parseOpenDataType(
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
  assertIsDefined<DecoratorMetadataObject>(metadata, `The metadata argument is undefined/null.`);

  // Strip the '[x]' from the fieldName but not the sourceField
  let plainFieldName = fieldName;
  const posX = fieldName.toLowerCase().lastIndexOf('[x]');
  if (posX > 0) {
    plainFieldName = fieldName.substring(0, posX);
  }
  // Replace any array indices with '[i].'
  const regex = new RegExp(/\[\d+\]\./g);
  const checkSourceField = sourceField.replaceAll(regex, '[i].');

  const openDatatypeFields: string[] = getOpenDatatypeFields(metadata);
  if (openDatatypeFields.includes(checkSourceField)) {
    const supportedFieldNames = OPEN_DATA_TYPES.map((item) => `${plainFieldName}${upperFirst(item)}`);
    return getParsedType(jsonObj, sourceField, plainFieldName, supportedFieldNames);
  }

  return undefined;
}

/**
 * Return the parsed instance from the provided json for the appropriate data type.
 *
 * @param jsonObj - JSON representing the open data type
 * @param sourceField - data source field (e.g. `<TypeName>.<TypeFieldName>`)
 * @param fieldName - JSON field name (without '[x]')
 * @param supportedFieldNames - polymorphic or open data type field names
 * @returns parsed instance or undefined
 * @throws FhirError for invalid "value[x]" property
 * @throws TypeError for failure parsing "value[x]"
 * @throws Error for unexpected parsing error
 *
 * @category Utilities: FHIR Parsers
 * @private
 */
function getParsedType(
  jsonObj: JSON.Object,
  sourceField: string,
  fieldName: string,
  supportedFieldNames: string[],
): DataType | undefined {
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
      } else if (err instanceof AssertionError) {
        throw new AssertionError({
          message: `Failed to parse ${sourceField}: ${err.message}`,
          expected: `Parsed instance for ${sourceField}`,
          actual: undefined,
        });
      } else {
        const unexpectedErrorMsg = `Unexpected error parsing ${sourceField} from the provided JSON`;
        throw new Error(unexpectedErrorMsg);
      }
    }
    return instance;
  }
  return undefined;
}

//endregion
