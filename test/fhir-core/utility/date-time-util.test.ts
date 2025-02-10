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

import { InvalidDateTimeError } from '@src/fhir-core/errors/InvalidDateTimeError';
import {
  DateTimeOpts,
  getDateTimeObject,
  getDateTimeObjectAsUTC,
  getValueAsDateOnly,
  getValueAsDateTime,
  getValueAsInstant,
  getValueAsYear,
  getValueAsYearMonth,
} from '@src/fhir-core/utility/date-time-util';
import { DateTime, FixedOffsetZone, Zone } from 'luxon';

describe('date-time-util', () => {
  const INVALID_DATE = '2020-03-32';
  const INVALID_DATETIME = '2020-03-31T25:00:00';
  const VALID_YEAR_ONLY = '2020';
  const VALID_YEAR_MONTH = '2020-03';
  const VALID_DATE = '2020-03-15';
  const VALID_DATETIME = '2020-03-15T23:57:00';
  const VALID_DATETIME_OFFSET = '2020-03-15T23:57:00-07:00';
  const VALID_DATETIME_UTC = '2020-03-15T23:57:00Z';

  describe('getDateTimeObject', () => {
    describe('General tests', () => {
      it('should return undefined for undefined value argument', () => {
        expect(getDateTimeObject(undefined)).toBeUndefined();
      });

      it('should properly handle milliseconds', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATETIME);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedZone = DateTime.now().zone;
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T23:57:00.000${expectedOffsetString}`);
        expect(dt.toISO({ suppressMilliseconds: true })).toStrictEqual(`2020-03-15T23:57:00${expectedOffsetString}`);
      });
    });

    describe('Throw InvalidDateTimeError', () => {
      it('should throw InvalidDateTimeError for invalid value argument', () => {
        const t = () => {
          getDateTimeObject('invalidArgument');
        };
        expect(t).toThrow(InvalidDateTimeError);
        expect(t).toThrow(`Invalid DateTime: unparsable: the input "invalidArgument" can't be parsed as ISO 8601`);
      });

      it('should throw InvalidDateTimeError for invalid date value argument', () => {
        const t = () => {
          getDateTimeObject(INVALID_DATE);
        };
        expect(t).toThrow(InvalidDateTimeError);
        expect(t).toThrow(
          `Invalid DateTime: unit out of range: you specified 32 (of type number) as a day, which is invalid`,
        );
      });

      it('should throw InvalidDateTimeError for invalid datetime value argument', () => {
        const t = () => {
          getDateTimeObject(INVALID_DATETIME);
        };
        expect(t).toThrow(InvalidDateTimeError);
        expect(t).toThrow(
          `Invalid DateTime: unit out of range: you specified 25 (of type number) as a hour, which is invalid`,
        );
      });
    });

    describe(`No DateTime options provided - defaults to 'local' zone`, () => {
      // Get default system zone data
      let expectedZone: Zone;
      let expectedZoneType: string;
      let expectedZoneName: string;

      beforeAll(() => {
        expectedZone = DateTime.now().zone;
        expectedZoneType = expectedZone.type;
        expectedZoneName = expectedZone.name;
      });

      it('should return a valid DateTime object for the provided year only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_YEAR_ONLY);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = expectedZone.offset(dt.toMillis());
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(1);
        expect(dt.day).toStrictEqual(1);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-01-01T00:00:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided year-month only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_YEAR_MONTH);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = expectedZone.offset(dt.toMillis());
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(1);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-01T00:00:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided date only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATE);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = expectedZone.offset(dt.toMillis());
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T00:00:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided datetime only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATETIME);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = expectedZone.offset(dt.toMillis());
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T23:57:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided datetime with offset value argument', () => {
        // Expected: offset applied to provided time and zone set to UTC
        // 23:57:00-07:00 => 06:57:00 UTC
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATETIME_OFFSET);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = expectedZone.offset(dt.toMillis());
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(16);
        expect(dt.hour).toStrictEqual(2);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-16T02:57:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided datetime with UTC value argument ', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATETIME_UTC);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = expectedZone.offset(dt.toMillis());
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23 + expectedOffset / 60);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T19:57:00.000${expectedOffsetString}`);
      });
    });

    describe('DateTime with opts.zone provided', () => {
      // Use provided opts.zone if no offset is specified in the input string itself; Will also convert the time to this zone
      let testZone: Zone;
      let expectedZoneType: string;
      let expectedZoneName: string;
      let dtOpts: DateTimeOpts;

      beforeAll(() => {
        // set test Zone to -06:00 / -360
        testZone = FixedOffsetZone.instance(-360);
        expect(testZone.isValid).toBe(true);
        expect(testZone.isUniversal).toBe(true);
        expectedZoneType = testZone.type;
        expect(expectedZoneType).toStrictEqual('fixed');
        expectedZoneName = testZone.name;
        expect(expectedZoneName).toStrictEqual('UTC-6');

        dtOpts = { zone: testZone };
      });

      it('should return a valid DateTime object for the provided year only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_YEAR_ONLY, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = testZone.offset(dt.toMillis());
        const expectedOffsetString = testZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(1);
        expect(dt.day).toStrictEqual(1);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(testZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-01-01T00:00:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided year-month only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_YEAR_MONTH, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = testZone.offset(dt.toMillis());
        const expectedOffsetString = testZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(1);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(testZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-01T00:00:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided date only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATE, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = testZone.offset(dt.toMillis());
        const expectedOffsetString = testZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(testZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T00:00:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided datetime only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATETIME, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = testZone.offset(dt.toMillis());
        const expectedOffsetString = testZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(testZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T23:57:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided datetime with offset value argument', () => {
        // Expected: offset applied between provided -07:00 and the changed zone of -06:00
        // 23:57:00-07:00 => 00:57:00 UTC-6
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATETIME_OFFSET, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = testZone.offset(dt.toMillis());
        const expectedOffsetString = testZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(16);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(testZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-16T00:57:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided datetime with UTC value argument ', () => {
        // Expected: offset applied between provided UTC and the changed zone of -06:00
        // 23:57:00Z => 17:57:00 UTC-6
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATETIME_UTC, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = testZone.offset(dt.toMillis());
        const expectedOffsetString = testZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23 + expectedOffset / 60);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(testZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T17:57:00.000${expectedOffsetString}`);
      });
    });

    describe('DateTime with opts.setZone provided as true', () => {
      // Override the zone with a fixed-offset zone specified in the string itself, if it specifies one;
      // otherwise, use the default system zone

      // Get default system zone data
      let expectedZone: Zone;
      let expectedZoneType: string;
      let expectedZoneName: string;
      let dtOpts: DateTimeOpts;

      beforeAll(() => {
        expectedZone = DateTime.now().zone;
        expectedZoneType = expectedZone.type;
        expectedZoneName = expectedZone.name;
        dtOpts = { setZone: true };
      });

      it('should return a valid DateTime object for the provided year only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_YEAR_ONLY, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = expectedZone.offset(dt.toMillis());
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(1);
        expect(dt.day).toStrictEqual(1);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-01-01T00:00:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided year-month only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_YEAR_MONTH, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = expectedZone.offset(dt.toMillis());
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(1);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-01T00:00:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided date only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATE, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = expectedZone.offset(dt.toMillis());
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T00:00:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided datetime only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATETIME, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        const expectedOffset = expectedZone.offset(dt.toMillis());
        const expectedOffsetString = expectedZone.formatOffset(dt.toMillis(), 'short');

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T23:57:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided datetime with offset value argument', () => {
        // Expected: The provided offset in the provided datetime string will be used rather than the default system zone
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATETIME_OFFSET, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        // From the offset in VALID_DATETIME_OFFSET
        const expectedOffset = -420;
        const expectedOffsetString = '-07:00';

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual({ fixed: -420 });
        expect(dt.zone.type).toStrictEqual('fixed');
        expect(dt.zoneName).toStrictEqual('UTC-7');
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T23:57:00.000${expectedOffsetString}`);
      });

      it('should return a valid DateTime object for the provided datetime with UTC value argument ', () => {
        // Expected: offset is 'Z' therefore this is a UTC datetime
        const dt: DateTime | undefined = getDateTimeObject(VALID_DATETIME_UTC, dtOpts);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }
        // From the 'Z' in VALID_DATETIME_UTC
        const expectedOffset = 0;
        const expectedOffsetString = 'Z';

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual({ fixed: 0 });
        expect(dt.zone.type).toStrictEqual('fixed');
        expect(dt.zoneName).toStrictEqual('UTC');
        expect(dt.offset).toStrictEqual(expectedOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T23:57:00.000${expectedOffsetString}`);
      });
    });
  });

  describe('getDateTimeObjectAsUTC', () => {
    describe('General tests', () => {
      it('should return undefined for undefined value argument', () => {
        expect(getDateTimeObjectAsUTC(undefined)).toBeUndefined();
      });

      it('should properly handle milliseconds', () => {
        const dt: DateTime | undefined = getDateTimeObjectAsUTC(VALID_DATETIME);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T23:57:00.000Z`);
        expect(dt.toISO({ suppressMilliseconds: true })).toStrictEqual(`2020-03-15T23:57:00Z`);
      });
    });

    describe('Throw InvalidDateTimeError', () => {
      it('should throw InvalidDateTimeError for invalid value argument', () => {
        const t = () => {
          getDateTimeObjectAsUTC('invalidArgument');
        };
        expect(t).toThrow(InvalidDateTimeError);
        expect(t).toThrow(`Invalid DateTime: unparsable: the input "invalidArgument" can't be parsed as ISO 8601`);
      });

      it('should throw InvalidDateTimeError for invalid date value argument', () => {
        const t = () => {
          getDateTimeObjectAsUTC(INVALID_DATE);
        };
        expect(t).toThrow(InvalidDateTimeError);
        expect(t).toThrow(
          `Invalid DateTime: unit out of range: you specified 32 (of type number) as a day, which is invalid`,
        );
      });

      it('should throw InvalidDateTimeError for invalid datetime value argument', () => {
        const t = () => {
          getDateTimeObjectAsUTC(INVALID_DATETIME);
        };
        expect(t).toThrow(InvalidDateTimeError);
        expect(t).toThrow(
          `Invalid DateTime: unit out of range: you specified 25 (of type number) as a hour, which is invalid`,
        );
      });
    });

    describe(`No DateTime options provided - function sets 'UTC' zone`, () => {
      // The default time zone will be UTC
      let expectedZone: FixedOffsetZone;
      let expectedZoneType: string;
      let expectedZoneName: string;
      let expectedZoneOffset: number;

      beforeAll(() => {
        expectedZone = FixedOffsetZone.instance(0); // { fixed: 0 }
        expectedZoneType = expectedZone.type; // fixed
        expectedZoneName = expectedZone.name; // UTC
        expectedZoneOffset = 0;
      });

      it('should return a valid DateTime object for the provided year only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObjectAsUTC(VALID_YEAR_ONLY);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(1);
        expect(dt.day).toStrictEqual(1);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedZoneOffset);
        expect(dt.toISO()).toStrictEqual(`2020-01-01T00:00:00.000Z`);
      });

      it('should return a valid DateTime object for the provided year-month only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObjectAsUTC(VALID_YEAR_MONTH);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(1);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedZoneOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-01T00:00:00.000Z`);
      });

      it('should return a valid DateTime object for the provided date only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObjectAsUTC(VALID_DATE);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(0);
        expect(dt.minute).toStrictEqual(0);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedZoneOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T00:00:00.000Z`);
      });

      it('should return a valid DateTime object for the provided datetime only value argument', () => {
        const dt: DateTime | undefined = getDateTimeObjectAsUTC(VALID_DATETIME);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedZoneOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T23:57:00.000Z`);
      });

      it('should return a valid DateTime object for the provided datetime with offset value argument', () => {
        // Expected: offset applied to provided time and zone set to UTC
        // 23:57:00-07:00 => 06:57:00 UTC
        const dt: DateTime | undefined = getDateTimeObjectAsUTC(VALID_DATETIME_OFFSET);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(16);
        expect(dt.hour).toStrictEqual(6);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedZoneOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-16T06:57:00.000Z`);
      });

      it('should return a valid DateTime object for the provided datetime with UTC value argument ', () => {
        const dt: DateTime | undefined = getDateTimeObjectAsUTC(VALID_DATETIME_UTC);
        if (dt === undefined) {
          fail('Undefined DateTime was not expected');
        }

        expect(dt).toBeDefined();
        expect(dt.isValid).toBe(true);
        expect(dt.year).toStrictEqual(2020);
        expect(dt.month).toStrictEqual(3);
        expect(dt.day).toStrictEqual(15);
        expect(dt.hour).toStrictEqual(23);
        expect(dt.minute).toStrictEqual(57);
        expect(dt.second).toStrictEqual(0);
        expect(dt.zone).toEqual(expectedZone);
        expect(dt.zone.type).toStrictEqual(expectedZoneType);
        expect(dt.zoneName).toStrictEqual(expectedZoneName);
        expect(dt.offset).toStrictEqual(expectedZoneOffset);
        expect(dt.toISO()).toStrictEqual(`2020-03-15T23:57:00.000Z`);
      });
    });
  });

  describe('Get DateTime as FHIR primitive date/dataTime/instant strings', () => {
    it('should throw InvalidDateTimeError for non-DateTime argument', () => {
      const t = () => {
        getValueAsYear({ invalid: 'object' });
      };
      expect(t).toThrow(InvalidDateTimeError);
      expect(t).toThrow(`Provided dt argument is not a DataTime object`);
    });

    it('should throw InvalidDateTimeError for invalid DateTime argument', () => {
      const dt = DateTime.fromISO(INVALID_DATE);
      const t = () => {
        getValueAsYear(dt);
      };
      expect(t).toThrow(InvalidDateTimeError);
      expect(t).toThrow(
        `Invalid DateTime: unit out of range: you specified 32 (of type number) as a day, which is invalid`,
      );
    });

    it('should return expected FHIR YYYY value', () => {
      const dt = DateTime.fromISO(VALID_DATETIME);
      const dtValue = getValueAsYear(dt);
      expect(dtValue).toBeDefined();
      expect(dtValue).toStrictEqual('2020');
    });

    it('should return undefined for undefined FHIR YYYY value', () => {
      const dtValue = getValueAsYear(undefined);
      expect(dtValue).toBeUndefined();
    });

    it('should return expected FHIR YYYY-MM value', () => {
      const dt = DateTime.fromISO(VALID_DATETIME);
      const dtValue = getValueAsYearMonth(dt);
      expect(dtValue).toBeDefined();
      expect(dtValue).toStrictEqual('2020-03');
    });

    it('should return undefined for undefined FHIR YYYY-MM value', () => {
      const dtValue = getValueAsYearMonth(undefined);
      expect(dtValue).toBeUndefined();
    });

    it('should return expected FHIR date value', () => {
      const dt = DateTime.fromISO(VALID_DATETIME);
      const dtValue = getValueAsDateOnly(dt);
      expect(dtValue).toBeDefined();
      expect(dtValue).toStrictEqual('2020-03-15');
    });

    it('should return undefined for undefined FHIR date value', () => {
      const dtValue = getValueAsDateOnly(undefined);
      expect(dtValue).toBeUndefined();
    });

    it('should return expected FHIR dateTime value', () => {
      const dt = DateTime.fromISO(VALID_DATETIME_UTC, { zone: 'utc' });
      const dtValue = getValueAsDateTime(dt);
      expect(dtValue).toBeDefined();
      expect(dtValue).toStrictEqual('2020-03-15T23:57:00Z');
    });

    it('should return undefined for undefined FHIR dateTime value', () => {
      const dtValue = getValueAsDateTime(undefined);
      expect(dtValue).toBeUndefined();
    });

    it('should return expected FHIR instant value', () => {
      const dt = DateTime.fromISO(VALID_DATETIME_UTC, { zone: 'utc' });
      const dtValue = getValueAsInstant(dt);
      expect(dtValue).toBeDefined();
      expect(dtValue).toStrictEqual('2020-03-15T23:57:00.000Z');
    });

    it('should return undefined for undefined FHIR instant value', () => {
      const dtValue = getValueAsInstant(undefined);
      expect(dtValue).toBeUndefined();
    });
  });
});
