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
 * Primitive data type schema definitions
 *
 * Zod schema definitions for FHIR primitive data types with their associated inferred TypeScript type.
 * Except for integer64 (added in R5), all FHIR primitive datatypes are consistent across FHIR releases.
 * The integer64 primitive will be excluded in R4 implementations.
 *
 * @see [Zod](https://zod.dev)
 * @see [FHIR R5 Primitives]( https://hl7.org/fhir/R5/datatypes.html#primitive)
 *
 * @module
 */

import { z } from 'zod';

/** @ignore */
export const FHIR_MIN_INTEGER = -2147483648;
/** @ignore */
export const FHIR_MAX_INTEGER = 2147483647;
/** @ignore */
export const FHIR_MAX_STRING_LENGTH = 1048576;
/** @ignore */
export const FHIR_MIN_INTEGER64 = -9223372036854775808n;
/** @ignore */
export const FHIR_MAX_INTEGER64 = 9223372036854775807n;

// FHIR Regex Usage:
// - FHIR regexs are used "as is" without modification EXCEPT the addition of start (^) and end ($).
// - When FHIR regexs are specified, use the Zod string() schema with regex rather than native Zod schemas.
const FHIR_REGEX_BASE64BINARY = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$');
const FHIR_REGEX_CODE = new RegExp('^[^\\s]+( [^\\s]+)*$');
const FHIR_REGEX_ID = new RegExp('^[A-Za-z0-9\\-\\.]{1,64}$');
const FHIR_REGEX_DECIMAL = new RegExp('^-?(0|[1-9][0-9]{0,17})(\\.[0-9]{1,17})?([eE][+-]?[0-9]{1,9}})?$');
const FHIR_REGEX_URI = new RegExp('^\\S*$');
const FHIR_REGEX_UUID = new RegExp('^urn:uuid:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');
const FHIR_REGEX_OID = new RegExp('^urn:oid:[0-2](\\.(0|[1-9][0-9]*))+$');
const FHIR_REGEX_DATE = new RegExp(
  '^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?$',
);
const FHIR_REGEX_DATETIME = new RegExp(
  '^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\\.[0-9]{1,9})?)?)?(Z|(\\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)?)?)?$',
);
const FHIR_REGEX_TIME = new RegExp('^([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\\.[0-9]{1,9})?$');
const FHIR_REGEX_INSTANT = new RegExp(
  '^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\\.[0-9]{1,9})?(Z|(\\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))$',
);
const FHIR_REGEX_XHTML = new RegExp('^[ \\r\\n\\t\\S]+$');

// FHIR boolean primitive

/**
 * @category Datatypes: Primitive Types
 */
export const fhirBooleanSchema = z.boolean().default(false);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirBoolean = z.infer<typeof fhirBooleanSchema>;

// FHIR string primitive

/**
 * @category Datatypes: Primitive Types
 */
export const fhirBase64BinarySchema = z.string().regex(FHIR_REGEX_BASE64BINARY);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirBase64Binary = z.infer<typeof fhirBase64BinarySchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirStringSchema = z.string().min(1).max(FHIR_MAX_STRING_LENGTH);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirString = z.infer<typeof fhirStringSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirMarkdownSchema = fhirStringSchema.brand<'fhirMarkdown'>();
/**
 * @category Datatypes: Primitive Types
 */
export type fhirMarkdown = z.infer<typeof fhirMarkdownSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirCodeSchema = z.string().regex(FHIR_REGEX_CODE);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirCode = z.infer<typeof fhirCodeSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirIdSchema = z.string().regex(FHIR_REGEX_ID);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirId = z.infer<typeof fhirIdSchema>;

// FHIR number primitive

// NOTE: This FHIR decimal schema definition DOES NOT currently support the FHIR precision requirements.
//       See the "warning" box at https://hl7.org/fhir/R5/json.html#primitive).
/**
 * @category Datatypes: Primitive Types
 */
export const fhirDecimalSchema = z.number().refine((val) => {
  const valStr = String(val);
  // Decimals in FHIR cannot have more than 18 digits and a decimal point.
  if (valStr.includes('.')) {
    return valStr.length <= 19 && FHIR_REGEX_DECIMAL.test(valStr);
  }
  return valStr.length <= 18 && FHIR_REGEX_DECIMAL.test(valStr);
});
/**
 * @category Datatypes: Primitive Types
 */
export type fhirDecimal = z.infer<typeof fhirDecimalSchema>;

// integer64 was added to the FHIR specification in FHIR R5
/**
 * @category Datatypes: Primitive Types
 */
export const fhirInteger64Schema = z.bigint().gte(FHIR_MIN_INTEGER64).lte(FHIR_MAX_INTEGER64);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirInteger64 = z.infer<typeof fhirInteger64Schema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirIntegerSchema = z.number().int().gte(FHIR_MIN_INTEGER).lte(FHIR_MAX_INTEGER);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirInteger = z.infer<typeof fhirIntegerSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirUnsignedIntSchema = z.number().int().gte(0).lte(FHIR_MAX_INTEGER);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirUnsignedInt = z.infer<typeof fhirUnsignedIntSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirPositiveIntSchema = z.number().int().gte(1).lte(FHIR_MAX_INTEGER);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirPositiveInt = z.infer<typeof fhirPositiveIntSchema>;

// FHIR uri primitive

/**
 * @category Datatypes: Primitive Types
 */
export const fhirUriSchema = z.string().regex(FHIR_REGEX_URI);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirUri = z.infer<typeof fhirUriSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirUrlSchema = fhirUriSchema.brand('fhirUrl');
/**
 * @category Datatypes: Primitive Types
 */
export type fhirUrl = z.infer<typeof fhirUrlSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirCanonicalSchema = fhirUriSchema.brand('fhirCanonical');
/**
 * @category Datatypes: Primitive Types
 */
export type fhirCanonical = z.infer<typeof fhirCanonicalSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirUuidSchema = z.string().regex(FHIR_REGEX_UUID);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirUuid = z.infer<typeof fhirUuidSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirOidSchema = z.string().regex(FHIR_REGEX_OID);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirOid = z.infer<typeof fhirOidSchema>;

// FHIR date/time primitive

/**
 * @category Datatypes: Primitive Types
 */
export const fhirDateSchema = z.string().regex(FHIR_REGEX_DATE);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirDate = z.infer<typeof fhirDateSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirDateTimeSchema = z.string().regex(FHIR_REGEX_DATETIME);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirDateTime = z.infer<typeof fhirDateTimeSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirTimeSchema = z.string().regex(FHIR_REGEX_TIME);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirTime = z.infer<typeof fhirTimeSchema>;

/**
 * @category Datatypes: Primitive Types
 */
export const fhirInstantSchema = z.string().regex(FHIR_REGEX_INSTANT);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirInstant = z.infer<typeof fhirInstantSchema>;

// FHIR xhtml fragment

/**
 * @category Datatypes: Primitive Types
 */
export const fhirXhtmlSchema = z.string().regex(FHIR_REGEX_XHTML);
/**
 * @category Datatypes: Primitive Types
 */
export type fhirXhtml = z.infer<typeof fhirXhtmlSchema>;
