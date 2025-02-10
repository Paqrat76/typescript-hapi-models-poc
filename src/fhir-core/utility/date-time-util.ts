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
 * DateTime utilities
 *
 * @remarks
 * Luxon is a library for working with dates and times in JavaScript and is used in this project.
 * These functions are used in the following FHIR primitive types: DateType, DateTimeType, and
 * InstantType.
 *
 * @module
 *
 * @see [Luxon](https://moment.github.io/luxon/#/)
 */

import { InvalidDateTimeError } from '@src/fhir-core/errors/InvalidDateTimeError';
import { isDefined } from '@src/fhir-core/utility/type-guards';
import { DateTime, Zone } from 'luxon';

/**
 * Luxon DateTime options to affect the creation of the DateTime instance.
 *
 * @category Utilities: DateTime
 * @interface
 */
export interface DateTimeOpts {
  /**
   * Use this zone if no offset is specified in the input string itself. Will also convert the time to this zone.
   * Defaults to `'local'`.
   */
  zone?: string | Zone;
  /**
   * Override the zone with a fixed-offset zone specified in the string itself, if it specifies one.
   * Defaults to `false`
   */
  setZone?: boolean;
  /**
   * The locale to set on the resulting DateTime instance.
   * Defaults to the system's locale.
   */
  locale?: string;
  /**
   * The output calendar to set on the resulting DateTime instance.
   */
  outputCalendar?: string;
  /**
   * The numbering system to set on the resulting DateTime instance.
   */
  numberingSystem?: string;
  /**
   * The week settings to set on the resulting DateTime instance.
   */
  weekSettings?: string;
}

/**
 * Returns a Luxon DateTime object for the provided ISO 8601 string value.
 *
 * @remarks
 * Uses DateTime.fromISO() static method to create a DateTime object.
 *
 * @param value - string that represents an ISO 8601 value used to instantiate a DataTime object
 * @param opts - Optional DateTime options object to affect the creation of the DateTime instance
 * @returns an instance of a DateTime object
 * @throws InvalidDateTimeError if the instantiated DataTime object is invalid
 *
 * @category Utilities: DateTime
 * @see [Luxon DateTime.fromISO()](https://moment.github.io/luxon/api-docs/index.html#datetimefromiso)
 */
export function getDateTimeObject(value: string | undefined, opts?: DateTimeOpts): DateTime | undefined {
  if (!isDefined<string>(value)) {
    return undefined;
  }

  let dt;
  if (isDefined<DateTimeOpts>(opts)) {
    dt = DateTime.fromISO(value, opts);
  } else {
    dt = DateTime.fromISO(value);
  }

  if (!dt.isValid) {
    throw new InvalidDateTimeError(dt.invalidReason, dt.invalidExplanation);
  }

  return dt;
}

/**
 * Returns a Luxon DateTime object having the UTC time zone for the provided ISO 8601 string value.
 *
 * @remarks
 * Uses DateTime.fromISO() static method to create a DateTime object.
 *
 * @param value - string that represents an ISO 8601 value used to instantiate a DataTime object
 * @returns an instance of a DateTime object having the UTC time zone
 * @throws InvalidDateTimeError if the instantiated DataTime object is invalid
 *
 * @category Utilities: DateTime
 * @see [Luxon DateTime.fromISO()](https://moment.github.io/luxon/api-docs/index.html#datetimefromiso)
 */
export function getDateTimeObjectAsUTC(value: string | undefined): DateTime | undefined {
  if (!isDefined<string>(value)) {
    return undefined;
  }

  const dt = DateTime.fromISO(value, { zone: 'utc' });

  if (!dt.isValid) {
    throw new InvalidDateTimeError(dt.invalidReason, dt.invalidExplanation);
  }

  return dt;
}

/**
 * Returns the value of the provided dt argument as 'YYYY'
 *
 * @param dt - DateTime object from which to obtain a string value
 * @returns the FHIR primitive date/dateTime value as 'YYYY'
 * @throws InvalidDateTimeError for an invalid dt argument
 *
 * @category Utilities: DateTime
 */
export function getValueAsYear(dt: unknown): string | undefined {
  verifyDateTime(dt);
  return dt === undefined ? undefined : (dt as DateTime).toFormat('yyyy');
}

/**
 * Returns the value of the provided dt argument as 'YYYY-MM'
 *
 * @param dt - DateTime object from which to obtain a string value
 * @returns the FHIR primitive date/dateTime value as 'YYYY-MM'
 * @throws InvalidDateTimeError for an invalid dt argument
 *
 * @category Utilities: DateTime
 */
export function getValueAsYearMonth(dt: unknown): string | undefined {
  verifyDateTime(dt);
  return dt === undefined ? undefined : (dt as DateTime).toFormat('yyyy-MM');
}

/**
 * Returns the value of the provided dt argument as 'YYYY-MM-DD'
 *
 * @param dt - DateTime object from which to obtain a string value
 * @returns the FHIR primitive date/dateTime value as 'YYYY-MM-DD'
 * @throws InvalidDateTimeError for an invalid dt argument
 *
 * @category Utilities: DateTime
 */
export function getValueAsDateOnly(dt: unknown): string | undefined {
  verifyDateTime(dt);
  // dt.toISODate() returns null only if dt is not valid - verified in verifyDateTime()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return dt === undefined ? undefined : (dt as DateTime).toISODate()!;
}

/**
 * Returns the value of the provided dt argument as an ISO datetime string excluding
 * milliseconds from the format if they are 0
 *
 * @param dt - DateTime object from which to obtain a string value
 * @returns the FHIR primitive date/dateTime value as an ISO datetime string
 * @throws InvalidDateTimeError for an invalid dt argument
 *
 * @category Utilities: DateTime
 */
export function getValueAsDateTime(dt: unknown): string | undefined {
  verifyDateTime(dt);
  // dt.toISO() returns null only if dt is not valid - verified in verifyDateTime()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return dt === undefined ? undefined : (dt as DateTime).toISO({ suppressMilliseconds: true })!;
}

/**
 * Returns the value of the provided dt argument as an ISO datetime string including
 * milliseconds
 *
 * @param dt - DateTime object from which to obtain a string value
 * @returns the FHIR primitive date/dateTime value as an ISO datetime string
 * @throws InvalidDateTimeError for an invalid dt argument
 *
 * @category Utilities: DateTime
 */
export function getValueAsInstant(dt: unknown): string | undefined {
  verifyDateTime(dt);
  // dt.toISO() returns null only if dt is not valid - verified in verifyDateTime()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return dt === undefined ? undefined : (dt as DateTime).toISO()!;
}

/**
 * Verifies the provided dt argument is a valid DateTime object
 *
 * @param dt - expected DateTime object
 * @throws InvalidDateTimeError if not a valid DateTime object
 */
function verifyDateTime(dt: unknown): void {
  if (dt === undefined) {
    return;
  }
  if (!DateTime.isDateTime(dt)) {
    throw new InvalidDateTimeError('Provided dt argument is not a DataTime object', null);
  }
  if (!dt.isValid) {
    throw new InvalidDateTimeError(dt.invalidReason, dt.invalidExplanation);
  }
}
