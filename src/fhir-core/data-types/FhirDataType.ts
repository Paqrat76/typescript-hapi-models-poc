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

import { upperFirst } from '@src/fhir-core/utility/common-util';

/**
 * FHIR open data types
 *
 * @remarks
 * Some elements do not have a specified type. The type is represented by the wildcard symbol "*".
 * In these cases, the element type may be one of these.
 * Open types are used in the following places: ElementDefinition, Extension, Parameters, Task, and Transport (R5).
 *
 * NOTE: This set of data types is a subset of DATA_TYPES.
 *
 * @category Base Models
 * @see [Open Type Element](https://hl7.org/fhir/R5/datatypes.html#open)
 */
export const OPEN_DATA_TYPES = [
  // Primitive Types
  'base64Binary',
  'boolean',
  'canonical',
  'code',
  'date',
  'dateTime',
  'decimal',
  'id',
  'instant',
  'integer',
  'integer64', // added in FHIR R5
  'markdown',
  'oid',
  'positiveInt',
  'string',
  'time',
  'unsignedInt',
  'uri',
  'url',
  'uuid',
  // Datatypes
  'Address',
  'Age',
  'Annotation',
  'Attachment',
  'CodeableConcept',
  'CodeableReference', // added in FHIR R5
  'Coding',
  'ContactPoint',
  'Count',
  'Distance',
  'Duration',
  'HumanName',
  'Identifier',
  'Money',
  'Period',
  'Quantity',
  'Range',
  'Ratio',
  'RatioRange', // added in FHIR R5
  'Reference',
  'SampledData',
  'Signature',
  'Timing',
  // Metadata Types
  'Availability', // added in FHIR R5
  'ContactDetail',
  'Contributor', // removed in R5
  'DataRequirement',
  'Expression',
  'ExtendedContactDetail', // added in FHIR R5
  'ParameterDefinition',
  'RelatedArtifact',
  'TriggerDefinition',
  'UsageContext',
  // Special Types
  'Dosage',
  'Meta',
] as const;

/**
 * FhirOpenDataType
 *
 * @remarks
 * Type definition based on OPEN_DATA_TYPES array.
 *
 * @category Base Models
 */
export type FhirOpenDataType = (typeof OPEN_DATA_TYPES)[number];

/**
 * FHIR open data types key names (i.e., valueString, valuePeriod, etc.)
 *
 * @category Base Models
 * @see [Open Type Element](https://hl7.org/fhir/R5/datatypes.html#open)
 */
export const OPEN_DATA_TYPE_KEY_NAMES = OPEN_DATA_TYPES.map((odt) => `value${upperFirst(odt)}`);

/**
 * Non-open data types that are valid data types
 */
const NON_OPEN_DATA_TYPES = ['MonetaryComponent', 'VirtualServiceDetail', 'Narrative', 'xhtml'] as const;

/**
 * FHIR data types
 *
 * @remarks
 * All defined FHIR data types for complex and primitive data types.
 *
 * @category Base Models
 * @see [DataTypes](https://hl7.org/fhir/R5/datatypes.html)
 */
export const DATA_TYPES = [...OPEN_DATA_TYPES, ...NON_OPEN_DATA_TYPES] as const;

/**
 * FhirDataType
 *
 * @remarks
 * Type definition based on DATA_TYPES array.
 *
 * @category Base Models
 */
export type FhirDataType = (typeof DATA_TYPES)[number];
