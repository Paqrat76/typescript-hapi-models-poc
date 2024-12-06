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
 * FHIR Contained Resource Parsing (deserialization) utilities
 *
 * @privateRemarks
 * Due to TypeScript circular references, these functions have been gathered here rather than
 * incorporating them into the fhir-parsers module or into the DomainResource.
 *
 * Non-fatal circular references still exist between this module and each FHIR data model class.
 *
 * @module
 */

import { strict as assert } from 'node:assert';
import { Resource } from '@src/fhir-core/base-models/Resource';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { isFhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { Group } from '@src/fhir-models/Group';
import { PractitionerRole } from '@src/fhir-models/PractitionerRole';
import { isDefined } from '@src/fhir-core/utility/type-guards';
import { isEmpty } from '@src/fhir-core/utility/common-util';

// Ignore for coverage because all parse methods have their own tests
/* istanbul ignore next */
/**
 * Executes the static `parse(...)` method for the implementation of the resourceTypeValue
 *
 * @privateRemarks
 * The FHIR resource code generator will fill out the switch statement for all FHIR resources.
 *
 * @param resourceTypeValue - String name of FHIR model to do the parsing
 * @param jsonObj - JSON object to parse by the resourceTypeValue implementation of `parse()`
 * @returns the parsed Resource or undefined
 */
function getFhirModelParseResults(resourceTypeValue: string, jsonObj: JSON.Object): Resource | undefined {
  let parseResult: Resource | undefined = undefined;
  switch (resourceTypeValue) {
    case 'Group':
      parseResult = Group.parse(jsonObj);
      break;
    case 'PractitionerRole':
      parseResult = PractitionerRole.parse(jsonObj);
      break;
    default:
      throw new InvalidTypeError(`Unexpected resource type ${resourceTypeValue}`);
  }
  return parseResult;
}

/**
 * Obtains the parsed `contained` Resource for the provided json
 *
 * @param json - JSON value to be parsed
 * @param sourceField - Source of the provided json
 * @returns the parsed Resource or undefined
 */
function parseContainedResource(json: JSON.Value | undefined, sourceField: string): Resource | undefined {
  if (!isDefined<JSON.Value | undefined>(json) || (JSON.isJsonObject(json) && isEmpty(json))) {
    return undefined;
  }
  const jsonObj: JSON.Object = JSON.asObject(json, sourceField);

  let resourceTypeValue: string;
  if ('resourceType' in jsonObj) {
    resourceTypeValue = JSON.asString(jsonObj['resourceType'], `${sourceField}.resourceType`);
    if (!isFhirResourceType(resourceTypeValue)) {
      throw new InvalidTypeError(`Invalid JSON 'resourceType' ('${resourceTypeValue}') value.`);
    }
  } else {
    throw new InvalidTypeError(
      `The provided JSON does not represent a FHIR Resource (missing 'resourceType' element).`,
    );
  }

  return getFhirModelParseResults(resourceTypeValue, jsonObj);
}

/**
 * Obtains the parsed `contained` Resources for the provided json and adds it to the provided instance (instance.addContained(...))
 *
 * @param instance - FHIR model instance that is a subclass of DomainResource
 * @param containedJsonArray - JSON array containing the `contained` JSON resources
 * @param sourceField - Source of the provided json
 *
 * @category Utilities: FHIR Parsers
 */
export function parseContainedResources(
  instance: DomainResource,
  containedJsonArray: JSON.Array,
  sourceField: string,
): void {
  assert.ok(instance, 'instance argument is required');
  assert.ok(containedJsonArray, 'containedJsonArray argument is required');
  assert.ok(sourceField, 'sourceField argument is required');

  containedJsonArray.forEach((containedJson: JSON.Value, idx) => {
    const datatype: Resource | undefined = parseContainedResource(containedJson, `${sourceField}[${String(idx)}]`);
    instance.addContained(datatype);
  });
}
