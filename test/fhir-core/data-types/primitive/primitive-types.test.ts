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

import {
  FHIR_MAX_INTEGER,
  FHIR_MAX_INTEGER64,
  FHIR_MIN_INTEGER,
  FHIR_MIN_INTEGER64,
  fhirBase64BinarySchema,
  fhirBooleanSchema,
  fhirCanonicalSchema,
  fhirCodeSchema,
  fhirDateSchema,
  fhirDateTimeSchema,
  fhirDecimalSchema,
  fhirIdSchema,
  fhirInstantSchema,
  fhirInteger64Schema,
  fhirIntegerSchema,
  fhirMarkdownSchema,
  fhirOidSchema,
  fhirPositiveIntSchema,
  fhirStringSchema,
  fhirTimeSchema,
  fhirUnsignedIntSchema,
  fhirUriSchema,
  fhirUrlSchema,
  fhirUuidSchema,
  fhirXhtmlSchema,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { TOO_BIG_STRING } from '../../../test-utils';

describe('Primitive Type Schemas', () => {
  describe('fhirBooleanSchema', () => {
    it('should return appropriate parseResults', () => {
      let parseResult = fhirBooleanSchema.safeParse(true);
      expect(parseResult.success).toBe(true);

      parseResult = fhirBooleanSchema.safeParse('true');
      expect(parseResult.success).toBe(false);

      parseResult = fhirBooleanSchema.safeParse(1);
      expect(parseResult.success).toBe(false);

      parseResult = fhirBooleanSchema.safeParse(false);
      expect(parseResult.success).toBe(true);

      parseResult = fhirBooleanSchema.safeParse('false');
      expect(parseResult.success).toBe(false);

      parseResult = fhirBooleanSchema.safeParse(0);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirBase64BinarySchema', () => {
    it('should return appropriate parseResults', () => {
      const validBase64 = `cmF3IHRlc3QgZm9yIEJhc2U2NCB0ZXN0IHN0cmluZw==`;
      let parseResult = fhirBase64BinarySchema.safeParse(validBase64);
      expect(parseResult.success).toBe(true);

      const invalidBase64 = `invalid Base64 text!`;
      parseResult = fhirBase64BinarySchema.safeParse(invalidBase64);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirStringSchema', () => {
    it('should return appropriate parseResults', () => {
      const validString = `Valid string value!`;
      let parseResult = fhirStringSchema.safeParse(validString);
      expect(parseResult.success).toBe(true);

      const invalidString = ``;
      parseResult = fhirStringSchema.safeParse(invalidString);
      expect(parseResult.success).toBe(false);

      parseResult = fhirStringSchema.safeParse(TOO_BIG_STRING);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirMarkdownSchema', () => {
    it('should return appropriate parseResults', () => {
      const validMarkdown = `**Valid** _string_ value!`;
      let parseResult = fhirMarkdownSchema.safeParse(validMarkdown);
      expect(parseResult.success).toBe(true);

      const invalidMarkdown = ``;
      parseResult = fhirMarkdownSchema.safeParse(invalidMarkdown);
      expect(parseResult.success).toBe(false);

      parseResult = fhirMarkdownSchema.safeParse(TOO_BIG_STRING);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirCodeSchema', () => {
    it('should return appropriate parseResults', () => {
      let validCode = `code`;
      let parseResult = fhirCodeSchema.safeParse(validCode);
      expect(parseResult.success).toBe(true);

      validCode = `valid-code`;
      parseResult = fhirCodeSchema.safeParse(validCode);
      expect(parseResult.success).toBe(true);

      validCode = `Valid Code`;
      parseResult = fhirCodeSchema.safeParse(validCode);
      expect(parseResult.success).toBe(true);

      validCode = `x`;
      parseResult = fhirCodeSchema.safeParse(validCode);
      expect(parseResult.success).toBe(true);

      let invalidCode = ``;
      parseResult = fhirCodeSchema.safeParse(invalidCode);
      expect(parseResult.success).toBe(false);

      invalidCode = ` code`;
      parseResult = fhirCodeSchema.safeParse(invalidCode);
      expect(parseResult.success).toBe(false);

      invalidCode = `code `;
      parseResult = fhirCodeSchema.safeParse(invalidCode);
      expect(parseResult.success).toBe(false);

      invalidCode = `invalid  code`;
      parseResult = fhirCodeSchema.safeParse(invalidCode);
      expect(parseResult.success).toBe(false);

      invalidCode = `invalid\ncode`;
      parseResult = fhirCodeSchema.safeParse(invalidCode);
      expect(parseResult.success).toBe(false);

      invalidCode = `invalid\tcode`;
      parseResult = fhirCodeSchema.safeParse(invalidCode);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirIdSchema', () => {
    it('should return appropriate parseResults', () => {
      let validId = `a-432.E-12345`;
      let parseResult = fhirIdSchema.safeParse(validId);
      expect(parseResult.success).toBe(true);

      validId = `ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz.0123456789`; // 64 characters
      parseResult = fhirIdSchema.safeParse(validId);
      expect(parseResult.success).toBe(true);

      let invalidId = ``;
      parseResult = fhirIdSchema.safeParse(invalidId);
      expect(parseResult.success).toBe(false);

      invalidId = `a[432]!E{12345}`;
      parseResult = fhirIdSchema.safeParse(invalidId);
      expect(parseResult.success).toBe(false);

      invalidId = `$a#432!`;
      parseResult = fhirIdSchema.safeParse(invalidId);
      expect(parseResult.success).toBe(false);

      invalidId = `ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz.0123456789-`; // 65 characters
      parseResult = fhirIdSchema.safeParse(invalidId);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirDecimalSchema', () => {
    it('should return appropriate parseResults', () => {
      let validDecimal = 0;
      let parseResult = fhirDecimalSchema.safeParse(validDecimal);
      expect(parseResult.success).toBe(true);

      validDecimal = -0;
      parseResult = fhirDecimalSchema.safeParse(validDecimal);
      expect(parseResult.success).toBe(true);

      validDecimal = +0;
      parseResult = fhirDecimalSchema.safeParse(validDecimal);
      expect(parseResult.success).toBe(true);

      validDecimal = 0.0;
      parseResult = fhirDecimalSchema.safeParse(validDecimal);
      expect(parseResult.success).toBe(true);

      // eslint-disable-next-line no-loss-of-precision
      validDecimal = 0.12345678901234567;
      parseResult = fhirDecimalSchema.safeParse(validDecimal);
      expect(parseResult.success).toBe(true);

      // eslint-disable-next-line no-loss-of-precision
      validDecimal = 123456789012345678;
      parseResult = fhirDecimalSchema.safeParse(validDecimal);
      expect(parseResult.success).toBe(true);

      // eslint-disable-next-line no-loss-of-precision
      validDecimal = 123456789012345678.9;
      parseResult = fhirDecimalSchema.safeParse(validDecimal);
      expect(parseResult.success).toBe(true);

      const invalidDecimal = Number.MAX_VALUE;
      parseResult = fhirDecimalSchema.safeParse(invalidDecimal);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirInteger64Schema', () => {
    it('should return appropriate parseResults', () => {
      let validInt64 = BigInt(0);
      let parseResult = fhirInteger64Schema.safeParse(validInt64);
      expect(parseResult.success).toBe(true);

      validInt64 = BigInt(FHIR_MIN_INTEGER64);
      parseResult = fhirInteger64Schema.safeParse(validInt64);
      expect(parseResult.success).toBe(true);

      validInt64 = BigInt(FHIR_MAX_INTEGER64);
      parseResult = fhirInteger64Schema.safeParse(validInt64);
      expect(parseResult.success).toBe(true);

      let invalidInt64 = BigInt(FHIR_MIN_INTEGER64) - 1n;
      parseResult = fhirInteger64Schema.safeParse(invalidInt64);
      expect(parseResult.success).toBe(false);

      invalidInt64 = BigInt(FHIR_MAX_INTEGER64) + 1n;
      parseResult = fhirInteger64Schema.safeParse(invalidInt64);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirIntegerSchema', () => {
    it('should return appropriate parseResults', () => {
      let validInt = 0;
      let parseResult = fhirIntegerSchema.safeParse(validInt);
      expect(parseResult.success).toBe(true);

      validInt = FHIR_MIN_INTEGER;
      parseResult = fhirIntegerSchema.safeParse(validInt);
      expect(parseResult.success).toBe(true);

      validInt = FHIR_MAX_INTEGER;
      parseResult = fhirIntegerSchema.safeParse(validInt);
      expect(parseResult.success).toBe(true);

      let invalidInt = FHIR_MIN_INTEGER - 1;
      parseResult = fhirIntegerSchema.safeParse(invalidInt);
      expect(parseResult.success).toBe(false);

      invalidInt = FHIR_MAX_INTEGER + 1;
      parseResult = fhirIntegerSchema.safeParse(invalidInt);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirUnsignedIntSchema', () => {
    it('should return appropriate parseResults', () => {
      let validInt = 0;
      let parseResult = fhirUnsignedIntSchema.safeParse(validInt);
      expect(parseResult.success).toBe(true);

      validInt = FHIR_MAX_INTEGER;
      parseResult = fhirUnsignedIntSchema.safeParse(validInt);
      expect(parseResult.success).toBe(true);

      let invalidInt = -1;
      parseResult = fhirUnsignedIntSchema.safeParse(invalidInt);
      expect(parseResult.success).toBe(false);

      invalidInt = FHIR_MAX_INTEGER + 1;
      parseResult = fhirUnsignedIntSchema.safeParse(invalidInt);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirPositiveIntSchema', () => {
    it('should return appropriate parseResults', () => {
      let validInt = 1;
      let parseResult = fhirPositiveIntSchema.safeParse(validInt);
      expect(parseResult.success).toBe(true);

      validInt = FHIR_MAX_INTEGER;
      parseResult = fhirPositiveIntSchema.safeParse(validInt);
      expect(parseResult.success).toBe(true);

      let invalidInt = 0;
      parseResult = fhirPositiveIntSchema.safeParse(invalidInt);
      expect(parseResult.success).toBe(false);

      invalidInt = FHIR_MAX_INTEGER + 1;
      parseResult = fhirPositiveIntSchema.safeParse(invalidInt);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirUriSchema', () => {
    it('should return appropriate parseResults', () => {
      let validUri = `Valid-URI-has-no-whitespace`;
      let parseResult = fhirUriSchema.safeParse(validUri);
      expect(parseResult.success).toBe(true);

      validUri = ``;
      parseResult = fhirUriSchema.safeParse(validUri);
      expect(parseResult.success).toBe(true);

      let invalidUri = ` uriValue`;
      parseResult = fhirUriSchema.safeParse(invalidUri);
      expect(parseResult.success).toBe(false);

      invalidUri = `uriValue `;
      parseResult = fhirUriSchema.safeParse(invalidUri);
      expect(parseResult.success).toBe(false);

      invalidUri = `uri Value`;
      parseResult = fhirUriSchema.safeParse(invalidUri);
      expect(parseResult.success).toBe(false);

      invalidUri = `uri\nValue`;
      parseResult = fhirUriSchema.safeParse(invalidUri);
      expect(parseResult.success).toBe(false);

      invalidUri = `uri\tValue`;
      parseResult = fhirUriSchema.safeParse(invalidUri);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirUrlSchema', () => {
    it('should return appropriate parseResults', () => {
      let validUrl = `Valid-URL-has-no-whitespace`;
      let parseResult = fhirUrlSchema.safeParse(validUrl);
      expect(parseResult.success).toBe(true);

      validUrl = ``;
      parseResult = fhirUrlSchema.safeParse(validUrl);
      expect(parseResult.success).toBe(true);

      let invalidUrl = ` urlValue`;
      parseResult = fhirUrlSchema.safeParse(invalidUrl);
      expect(parseResult.success).toBe(false);

      invalidUrl = `urlValue `;
      parseResult = fhirUrlSchema.safeParse(invalidUrl);
      expect(parseResult.success).toBe(false);

      invalidUrl = `url Value`;
      parseResult = fhirUrlSchema.safeParse(invalidUrl);
      expect(parseResult.success).toBe(false);

      invalidUrl = `url\nValue`;
      parseResult = fhirUrlSchema.safeParse(invalidUrl);
      expect(parseResult.success).toBe(false);

      invalidUrl = `url\tValue`;
      parseResult = fhirUrlSchema.safeParse(invalidUrl);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirCanonicalSchema', () => {
    it('should return appropriate parseResults', () => {
      let validUrl = `Valid-canonical-URL-has-no-whitespace`;
      let parseResult = fhirCanonicalSchema.safeParse(validUrl);
      expect(parseResult.success).toBe(true);

      validUrl = ``;
      parseResult = fhirCanonicalSchema.safeParse(validUrl);
      expect(parseResult.success).toBe(true);

      let invalidUrl = ` urlValue`;
      parseResult = fhirCanonicalSchema.safeParse(invalidUrl);
      expect(parseResult.success).toBe(false);

      invalidUrl = `urlValue `;
      parseResult = fhirCanonicalSchema.safeParse(invalidUrl);
      expect(parseResult.success).toBe(false);

      invalidUrl = `url Value`;
      parseResult = fhirCanonicalSchema.safeParse(invalidUrl);
      expect(parseResult.success).toBe(false);

      invalidUrl = `url\nValue`;
      parseResult = fhirCanonicalSchema.safeParse(invalidUrl);
      expect(parseResult.success).toBe(false);

      invalidUrl = `url\tValue`;
      parseResult = fhirCanonicalSchema.safeParse(invalidUrl);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirUuidSchema', () => {
    it('should return appropriate parseResults', () => {
      const validUuid = `urn:uuid:c757873d-ec9a-4326-a141-556f43239520`;
      let parseResult = fhirUuidSchema.safeParse(validUuid);
      expect(parseResult.success).toBe(true);

      let invalidUuid = `invalid UUID`;
      parseResult = fhirUuidSchema.safeParse(invalidUuid);
      expect(parseResult.success).toBe(false);

      invalidUuid = `URN:UUID:C757873D-EC9A-4326-A141-556F43239520`;
      parseResult = fhirUuidSchema.safeParse(invalidUuid);
      expect(parseResult.success).toBe(false);

      invalidUuid = `c757873d-ec9a-4326-a141-556f43239520`;
      parseResult = fhirUuidSchema.safeParse(invalidUuid);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirOidSchema', () => {
    it('should return appropriate parseResults', () => {
      const validOid = `urn:oid:1.2.3.4.5`;
      let parseResult = fhirOidSchema.safeParse(validOid);
      expect(parseResult.success).toBe(true);

      let invalidOid = `invalid OID`;
      parseResult = fhirOidSchema.safeParse(invalidOid);
      expect(parseResult.success).toBe(false);

      invalidOid = `URN:OID:1.2.3.4.5`;
      parseResult = fhirOidSchema.safeParse(invalidOid);
      expect(parseResult.success).toBe(false);

      invalidOid = `urn:oid:3.2.3.4.5`;
      parseResult = fhirOidSchema.safeParse(invalidOid);
      expect(parseResult.success).toBe(false);

      invalidOid = `1.2.3.4.5`;
      parseResult = fhirOidSchema.safeParse(invalidOid);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirDateSchema', () => {
    it('should return appropriate parseResults', () => {
      let validDate = `2018`;
      let parseResult = fhirDateSchema.safeParse(validDate);
      expect(parseResult.success).toBe(true);

      validDate = `1973-06`;
      parseResult = fhirDateSchema.safeParse(validDate);
      expect(parseResult.success).toBe(true);

      validDate = `1905-08-23`;
      parseResult = fhirDateSchema.safeParse(validDate);
      expect(parseResult.success).toBe(true);

      let invalidDate = `invalid date`;
      parseResult = fhirDateSchema.safeParse(invalidDate);
      expect(parseResult.success).toBe(false);

      invalidDate = `06-1973`;
      parseResult = fhirDateSchema.safeParse(invalidDate);
      expect(parseResult.success).toBe(false);

      invalidDate = `08-23-1905`;
      parseResult = fhirDateSchema.safeParse(invalidDate);
      expect(parseResult.success).toBe(false);

      invalidDate = `2024/07/03`;
      parseResult = fhirDateSchema.safeParse(invalidDate);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirDateTimeSchema', () => {
    it('should return appropriate parseResults', () => {
      let validDateTime = `2018`;
      let parseResult = fhirDateTimeSchema.safeParse(validDateTime);
      expect(parseResult.success).toBe(true);

      validDateTime = `1973-06`;
      parseResult = fhirDateTimeSchema.safeParse(validDateTime);
      expect(parseResult.success).toBe(true);

      validDateTime = `1905-08-23`;
      parseResult = fhirDateTimeSchema.safeParse(validDateTime);
      expect(parseResult.success).toBe(true);

      validDateTime = `2015-02-07T13:28:17-05:00`;
      parseResult = fhirDateTimeSchema.safeParse(validDateTime);
      expect(parseResult.success).toBe(true);

      validDateTime = `2017-01-01T00:00:00.000Z`;
      parseResult = fhirDateTimeSchema.safeParse(validDateTime);
      expect(parseResult.success).toBe(true);

      let invalidDateTime = `invalid date time`;
      parseResult = fhirDateTimeSchema.safeParse(invalidDateTime);
      expect(parseResult.success).toBe(false);

      invalidDateTime = `06-2008`;
      parseResult = fhirDateTimeSchema.safeParse(invalidDateTime);
      expect(parseResult.success).toBe(false);

      invalidDateTime = `07-03-2024`;
      parseResult = fhirDateTimeSchema.safeParse(invalidDateTime);
      expect(parseResult.success).toBe(false);

      invalidDateTime = `2024/07/03`;
      parseResult = fhirDateTimeSchema.safeParse(invalidDateTime);
      expect(parseResult.success).toBe(false);

      invalidDateTime = `2015-02-07T24:00:00-05:00`;
      parseResult = fhirDateTimeSchema.safeParse(invalidDateTime);
      expect(parseResult.success).toBe(false);

      invalidDateTime = `2015-02-07 13:28:17-05:00`;
      parseResult = fhirDateTimeSchema.safeParse(invalidDateTime);
      expect(parseResult.success).toBe(false);

      invalidDateTime = `2015-02-07 01:28:17 PM`;
      parseResult = fhirDateTimeSchema.safeParse(invalidDateTime);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirTimeSchema', () => {
    it('should return appropriate parseResults', () => {
      let validTime = `00:00:00`;
      let parseResult = fhirTimeSchema.safeParse(validTime);
      expect(parseResult.success).toBe(true);

      validTime = `23:59:59`;
      parseResult = fhirTimeSchema.safeParse(validTime);
      expect(parseResult.success).toBe(true);

      validTime = `23:59:60`;
      parseResult = fhirTimeSchema.safeParse(validTime);
      expect(parseResult.success).toBe(true);

      validTime = `13:28:17.123456789`;
      parseResult = fhirTimeSchema.safeParse(validTime);
      expect(parseResult.success).toBe(true);

      let invalidTime = `invalid time`;
      parseResult = fhirTimeSchema.safeParse(invalidTime);
      expect(parseResult.success).toBe(false);

      invalidTime = `24:00:00`;
      parseResult = fhirTimeSchema.safeParse(invalidTime);
      expect(parseResult.success).toBe(false);

      invalidTime = `13:28:17.0123456789`;
      parseResult = fhirTimeSchema.safeParse(invalidTime);
      expect(parseResult.success).toBe(false);

      invalidTime = `13:28:17.000Z`;
      parseResult = fhirTimeSchema.safeParse(invalidTime);
      expect(parseResult.success).toBe(false);

      invalidTime = `13:28:17-05:00`;
      parseResult = fhirTimeSchema.safeParse(invalidTime);
      expect(parseResult.success).toBe(false);

      invalidTime = `13:60:17`;
      parseResult = fhirTimeSchema.safeParse(invalidTime);
      expect(parseResult.success).toBe(false);

      invalidTime = `13:28:90`;
      parseResult = fhirTimeSchema.safeParse(invalidTime);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirInstantSchema', () => {
    it('should return appropriate parseResults', () => {
      let validInstant = `2015-02-07T13:28:17.239+02:00`;
      let parseResult = fhirInstantSchema.safeParse(validInstant);
      expect(parseResult.success).toBe(true);

      validInstant = `2017-01-01T00:00:00Z`;
      parseResult = fhirInstantSchema.safeParse(validInstant);
      expect(parseResult.success).toBe(true);

      validInstant = `2017-01-01T23:59:60.999Z`;
      parseResult = fhirInstantSchema.safeParse(validInstant);
      expect(parseResult.success).toBe(true);

      validInstant = `2015-02-07T13:28:17+05:00`;
      parseResult = fhirInstantSchema.safeParse(validInstant);
      expect(parseResult.success).toBe(true);

      let invalidInstant = `invalid instant`;
      parseResult = fhirInstantSchema.safeParse(invalidInstant);
      expect(parseResult.success).toBe(false);

      invalidInstant = `1954`;
      parseResult = fhirInstantSchema.safeParse(invalidInstant);
      expect(parseResult.success).toBe(false);

      invalidInstant = `06-2008`;
      parseResult = fhirInstantSchema.safeParse(invalidInstant);
      expect(parseResult.success).toBe(false);

      invalidInstant = `07-03-2024`;
      parseResult = fhirInstantSchema.safeParse(invalidInstant);
      expect(parseResult.success).toBe(false);

      invalidInstant = `2024/07/03`;
      parseResult = fhirInstantSchema.safeParse(invalidInstant);
      expect(parseResult.success).toBe(false);

      invalidInstant = `2015-02-07T24:00:00-05:00`;
      parseResult = fhirInstantSchema.safeParse(invalidInstant);
      expect(parseResult.success).toBe(false);

      invalidInstant = `2015-02-07 13:28:17-05:00`;
      parseResult = fhirInstantSchema.safeParse(invalidInstant);
      expect(parseResult.success).toBe(false);

      invalidInstant = `2015-02-07 01:28:17 PM`;
      parseResult = fhirInstantSchema.safeParse(invalidInstant);
      expect(parseResult.success).toBe(false);
    });
  });

  describe('fhirXhtmlSchema', () => {
    it('should return appropriate parseResults', () => {
      let validXhtml = `<div xmlns="http://www.w3.org/1999/xhtml">text</div>`;
      let parseResult = fhirXhtmlSchema.safeParse(validXhtml);
      expect(parseResult.success).toBe(true);

      validXhtml = ` any\tstring\r\nlike this that passes the regex `;
      parseResult = fhirXhtmlSchema.safeParse(validXhtml);
      expect(parseResult.success).toBe(true);

      const invalidXhtml = ``;
      parseResult = fhirXhtmlSchema.safeParse(invalidXhtml);
      expect(parseResult.success).toBe(false);
    });
  });
});
