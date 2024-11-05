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
 * @remarks
 * Zod schema definitions for FHIR primitive data types with their associated inferred TypeScript type.
 * Except for integer64 (added in R5), all FHIR primitive datatypes are consistent across FHIR releases.
 * The integer64 primitive will be excluded in R4 implementations.
 *
 * @privateRemarks
 * Zod Schema provides the `describe()` method to add a `description` property to the resulting schema.
 * This feature is used to tag specific characteristics relating to the following FHIR types:
 * - boolean
 * - decimal
 * - bigint
 * - int
 * These descriptions are used to properly process these data types in the generic `parseFhirPrimitiveData()`.
 *
 * @see [Zod](https://zod.dev)
 * @see [FHIR R5 Primitives](https://hl7.org/fhir/R5/datatypes.html#primitive)
 *
 * @module
 */

import { TypeOf, z } from 'zod';
import { DateTime } from 'luxon';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { DateTimeOpts } from '@src/fhir-core/utility/date-time-util';

/**
 * FHIR DateType implementation
 *
 * @interface
 * @category Datatypes: Primitive
 */
export interface DateTypeImpl {
  /**
   * Returns a Luxon DateTime object for the PrimitiveType's `getValue()`.
   *
   * @remarks
   * Uses DateTime.fromISO() static method to create a DateTime object.
   *
   * @param opts - Optional DateTime options object to affect the creation of the DateTime instance
   * @returns an instance of a DateTime object
   * @throws InvalidDateTimeError if the instantiated DataTime object is invalid
   *
   * @see [Luxon DateTime.fromISO()](https://moment.github.io/luxon/api-docs/index.html#datetimefromiso)
   */
  getValueAsDateTime: (opts?: DateTimeOpts) => DateTime | undefined;
  /**
   * Returns a Luxon DateTime object having the UTC time zone for the PrimitiveType's `getValue()`.
   *
   * @remarks
   * Uses DateTime.fromISO() static method to create a DateTime object.
   *
   * @returns an instance of a DateTime object having the UTC time zone
   * @throws InvalidDateTimeError if the instantiated DataTime object is invalid
   */
  getValueAsDateTimeUTC: () => DateTime | undefined;
  /**
   * Sets the PrimitiveType's value of the provided dt argument as 'YYYY'
   *
   * @param dt - DateTime object from which to obtain a string value
   * @returns this
   * @throws InvalidDateTimeError for an invalid dt argument
   */
  setValueAsYear: (dt: DateTime | undefined) => this;
  /**
   * Sets the PrimitiveType's value of the provided dt argument as 'YYYY-MM'
   *
   * @param dt - DateTime object from which to obtain a string value
   * @returns this
   * @throws InvalidDateTimeError for an invalid dt argument
   */
  setValueAsYearMonth: (dt: DateTime | undefined) => this;
  /**
   * Sets the PrimitiveType's value of the provided dt argument as 'YYYY-MM-DD'
   *
   * @param dt - DateTime object from which to obtain a string value
   * @returns this
   * @throws InvalidDateTimeError for an invalid dt argument
   */
  setValueAsDateOnly: (dt: DateTime | undefined) => this;
}

/**
 * FHIR DateTimeType implementation
 *
 * @interface
 * @category Datatypes: Primitive
 */
export interface DateTimeTypeImpl extends DateTypeImpl {
  /**
   * Sets the PrimitiveType's value of the provided dt argument as an ISO datetime string excluding
   * milliseconds from the format if they are 0
   *
   * @param dt - DateTime object from which to obtain a string value
   * @returns this
   * @throws InvalidDateTimeError for an invalid dt argument
   */
  setValueAsDateTime: (dt: DateTime | undefined) => this;
  /**
   * Sets the PrimitiveType's value of the provided dt argument as an ISO datetime string including
   * milliseconds
   *
   * @param dt - DateTime object from which to obtain a string value
   * @returns this
   * @throws InvalidDateTimeError for an invalid dt argument
   */
  setValueAsInstant: (dt: DateTime | undefined) => this;
}

/**
 * FHIR InstantType implementation
 *
 * @interface
 * @category Datatypes: Primitive
 */
export interface InstantTypeImpl {
  /**
   * Returns a Luxon DateTime object for the PrimitiveType's `getValue()`.
   *
   * @remarks
   * Uses DateTime.fromISO() static method to create a DateTime object.
   *
   * @param opts - Optional DateTime options object to affect the creation of the DateTime instance
   * @returns an instance of a DateTime object
   * @throws InvalidDateTimeError if the instantiated DataTime object is invalid
   *
   * @see [Luxon DateTime.fromISO()](https://moment.github.io/luxon/api-docs/index.html#datetimefromiso)
   */
  getValueAsDateTime: (opts?: DateTimeOpts) => DateTime | undefined;
  /**
   * Returns a Luxon DateTime object having the UTC time zone for the PrimitiveType's `getValue()`.
   *
   * @remarks
   * Uses DateTime.fromISO() static method to create a DateTime object.
   *
   * @returns an instance of a DateTime object having the UTC time zone
   * @throws InvalidDateTimeError if the instantiated DataTime object is invalid
   */
  getValueAsDateTimeUTC: () => DateTime | undefined;
  /**
   * Sets the PrimitiveType's value of the provided dt argument as an ISO datetime string including
   * milliseconds
   *
   * @param dt - DateTime object from which to obtain a string value
   * @returns this
   * @throws InvalidDateTimeError for an invalid dt argument
   */
  setValueAsInstant: (dt: DateTime | undefined) => this;
}

/**
 * Parses the provided value and returns the desired FHIR primitive value.
 *
 * @param data - value to be parsed
 * @param schema - custom Zod schema for FHIR primitive
 * @param errMessage - optional error message to override the default
 * @returns the FHIR primitive value as the FHIR primitive type
 * @throws PrimitiveTypeError for invalid data value
 *
 * @category Datatypes: Primitive Base Types
 */
export function parseFhirPrimitiveData<T extends z.ZodTypeAny>(
  data: unknown,
  schema: T,
  errMessage?: string,
): TypeOf<T> {
  let dataValue = data;

  // A string representation of data for the following datatypes cannot be processed directly by
  // schema.safeParse(). They must be converted to the appropriate data types. The schema.description
  // property is used to identify these data types.
  if (schema.description !== undefined && typeof data === 'string') {
    const schemaDesc = schema.description;
    if (schemaDesc === 'CORETYPE:boolean') {
      if ('true' === data.trim().toLowerCase()) {
        dataValue = true;
      } else if ('false' === data.trim().toLowerCase()) {
        dataValue = false;
      }
    } else if (schemaDesc === 'CORETYPE:decimal') {
      dataValue = Number.parseFloat(data);
    } else if (schemaDesc === 'CORETYPE:bigint') {
      dataValue = BigInt(data);
    } else if (schemaDesc === 'CORETYPE:int') {
      dataValue = Number.parseInt(data);
    }
  }

  const parseResult = schema.safeParse(dataValue);
  if (parseResult.success) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return parseResult.data as z.infer<T>;
  } else {
    const errMsg = errMessage ?? `Invalid FHIR primitive data value`;
    throw new PrimitiveTypeError(errMsg, parseResult.error);
  }
}

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
 * @category Datatypes: Primitive Base Types
 */
export const fhirBooleanSchema = z.boolean().describe('CORETYPE:boolean').default(false);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirBoolean = z.infer<typeof fhirBooleanSchema>;

// FHIR string primitive

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirBase64BinarySchema = z.string().regex(FHIR_REGEX_BASE64BINARY);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirBase64Binary = z.infer<typeof fhirBase64BinarySchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirStringSchema = z.string().min(1).max(FHIR_MAX_STRING_LENGTH);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirString = z.infer<typeof fhirStringSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirMarkdownSchema = z.string().min(1).max(FHIR_MAX_STRING_LENGTH);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirMarkdown = z.infer<typeof fhirMarkdownSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirCodeSchema = z.string().regex(FHIR_REGEX_CODE);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirCode = z.infer<typeof fhirCodeSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirIdSchema = z.string().regex(FHIR_REGEX_ID);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirId = z.infer<typeof fhirIdSchema>;

// FHIR number primitive

// NOTE: This FHIR decimal schema definition DOES NOT currently support the FHIR precision requirements.
//       See the "warning" box at https://hl7.org/fhir/R5/json.html#primitive).
// NOTE: The describe() method must follow the refined() method when chaining.
/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirDecimalSchema = z
  .number()
  .refine((val) => {
    const valStr = String(val);
    // Decimals in FHIR cannot have more than 18 digits and a decimal point.
    if (valStr.includes('.')) {
      return valStr.length <= 19 && FHIR_REGEX_DECIMAL.test(valStr);
    }
    return valStr.length <= 18 && FHIR_REGEX_DECIMAL.test(valStr);
  })
  .describe('CORETYPE:decimal');
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirDecimal = z.infer<typeof fhirDecimalSchema>;

// integer64 was added to the FHIR specification in FHIR R5
/**
 * @since 5.0.0
 * @category Datatypes: Primitive Base Types
 */
export const fhirInteger64Schema = z
  .bigint()
  .describe('CORETYPE:bigint')
  .gte(FHIR_MIN_INTEGER64)
  .lte(FHIR_MAX_INTEGER64);
/**
 * @since 5.0.0
 * @category Datatypes: Primitive Base Types
 */
export type fhirInteger64 = z.infer<typeof fhirInteger64Schema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirIntegerSchema = z.number().describe('CORETYPE:int').int().gte(FHIR_MIN_INTEGER).lte(FHIR_MAX_INTEGER);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirInteger = z.infer<typeof fhirIntegerSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirUnsignedIntSchema = z.number().describe('CORETYPE:int').int().gte(0).lte(FHIR_MAX_INTEGER);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirUnsignedInt = z.infer<typeof fhirUnsignedIntSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirPositiveIntSchema = z.number().describe('CORETYPE:int').int().gte(1).lte(FHIR_MAX_INTEGER);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirPositiveInt = z.infer<typeof fhirPositiveIntSchema>;

// FHIR uri primitive

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirUriSchema = z.string().regex(FHIR_REGEX_URI);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirUri = z.infer<typeof fhirUriSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirUrlSchema = z.string().regex(FHIR_REGEX_URI);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirUrl = z.infer<typeof fhirUrlSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirCanonicalSchema = z.string().regex(FHIR_REGEX_URI);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirCanonical = z.infer<typeof fhirCanonicalSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirUuidSchema = z.string().regex(FHIR_REGEX_UUID);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirUuid = z.infer<typeof fhirUuidSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirOidSchema = z.string().regex(FHIR_REGEX_OID);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirOid = z.infer<typeof fhirOidSchema>;

// FHIR date/time primitive

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirDateSchema = z.string().regex(FHIR_REGEX_DATE);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirDate = z.infer<typeof fhirDateSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirDateTimeSchema = z.string().regex(FHIR_REGEX_DATETIME);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirDateTime = z.infer<typeof fhirDateTimeSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirTimeSchema = z.string().regex(FHIR_REGEX_TIME);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirTime = z.infer<typeof fhirTimeSchema>;

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirInstantSchema = z.string().regex(FHIR_REGEX_INSTANT);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirInstant = z.infer<typeof fhirInstantSchema>;

// FHIR xhtml fragment

/**
 * @category Datatypes: Primitive Base Types
 */
export const fhirXhtmlSchema = z.string().regex(FHIR_REGEX_XHTML);
/**
 * @category Datatypes: Primitive Base Types
 */
export type fhirXhtml = z.infer<typeof fhirXhtmlSchema>;
