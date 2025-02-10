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

import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { ContactPointSystemEnum } from '@src/fhir-core/data-types/code-systems/ContactPointSystemEnum';
import { ContactPointUseEnum } from '@src/fhir-core/data-types/code-systems/ContactPointUseEnum';
import { ContactPoint } from '@src/fhir-core/data-types/complex/ContactPoint';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { PositiveIntType } from '@src/fhir-core/data-types/primitive/PositiveIntType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import {
  INVALID_NON_STRING_TYPE,
  INVALID_NON_STRING_TYPE_VALUE,
  INVALID_STRING,
  INVALID_STRING_TYPE,
  UNDEFINED_VALUE,
} from '../../../test-utils';

describe('ContactPoint', () => {
  const VALID_SYSTEM_PHONE = `phone`;
  const VALID_SYSTEM_PHONE_TYPE = new CodeType(VALID_SYSTEM_PHONE);
  const VALID_SYSTEM_EMAIL = `email`;
  const VALID_SYSTEM_EMAIL_TYPE = new CodeType(VALID_SYSTEM_EMAIL);
  const VALID_SYSTEM_FAX = `fax`;
  const VALID_SYSTEM_FAX_TYPE = new CodeType(VALID_SYSTEM_FAX);

  const VALID_USE_HOME = `home`;
  const VALID_USE_HOME_TYPE = new CodeType(VALID_USE_HOME);
  const VALID_USE_WORK = `work`;
  const VALID_USE_WORK_TYPE = new CodeType(VALID_USE_WORK);
  const VALID_USE_TEMP = `temp`;
  const VALID_USE_TEMP_TYPE = new CodeType(VALID_USE_TEMP);

  const UNSUPPORTED_ENUM_CODE = 'unsupportedEnumCode';
  const INVALID_CODE_TYPE = new CodeType(UNSUPPORTED_ENUM_CODE);

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);

  const VALID_POSITIVEINT = 13579;
  const VALID_POSITIVEINT_TYPE = new PositiveIntType(VALID_POSITIVEINT);
  const VALID_POSITIVEINT_2 = 24680;
  const VALID_POSITIVEINT_TYPE_2 = new PositiveIntType(VALID_POSITIVEINT_2);

  const VALID_START_DATETIME = `2017-01-01T00:00:00.000Z`;
  const VALID_START_DATETIME_2 = `2017-01-01T00:15:00.000Z`;
  const VALID_END_DATETIME = `2017-01-01T01:00:00.000Z`;
  const VALID_END_DATETIME_2 = `2017-01-01T01:15:00.000Z`;
  const VALID_PERIOD = new Period();
  VALID_PERIOD.setStart(VALID_START_DATETIME);
  VALID_PERIOD.setEnd(VALID_END_DATETIME);
  const VALID_PERIOD_2 = new Period();
  VALID_PERIOD_2.setStart(VALID_START_DATETIME_2);
  VALID_PERIOD_2.setEnd(VALID_END_DATETIME_2);

  let testContactPointSystemEnum: ContactPointSystemEnum;
  let testContactPointUseEnum: ContactPointUseEnum;
  beforeAll(() => {
    testContactPointSystemEnum = new ContactPointSystemEnum();
    testContactPointUseEnum = new ContactPointUseEnum();
  });

  describe('Core', () => {
    const expectedJson = {
      system: VALID_SYSTEM_PHONE,
      value: VALID_STRING,
      use: VALID_USE_HOME,
      rank: VALID_POSITIVEINT,
      period: { start: VALID_START_DATETIME, end: VALID_END_DATETIME },
    };

    it('should be properly instantiated as empty', () => {
      const testContactPoint = new ContactPoint();
      expect(testContactPoint).toBeDefined();
      expect(testContactPoint).toBeInstanceOf(DataType);
      expect(testContactPoint).toBeInstanceOf(ContactPoint);
      expect(testContactPoint.constructor.name).toStrictEqual('ContactPoint');
      expect(testContactPoint.fhirType()).toStrictEqual('ContactPoint');
      expect(testContactPoint.isEmpty()).toBe(true);
      expect(testContactPoint.isComplexDataType()).toBe(true);
      expect(testContactPoint.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testContactPoint.hasId()).toBe(false);
      expect(testContactPoint.getId()).toBeUndefined();
      expect(testContactPoint.hasExtension()).toBe(false);
      expect(testContactPoint.getExtension()).toEqual([] as Extension[]);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(false);
      expect(testContactPoint.getSystemEnumType()).toBeUndefined();
      expect(testContactPoint.hasUseEnumType()).toBe(false);
      expect(testContactPoint.getUseEnumType()).toBeUndefined();

      expect(testContactPoint.hasSystemElement()).toBe(false);
      expect(testContactPoint.getSystemElement()).toBeUndefined();
      expect(testContactPoint.hasValueElement()).toBe(false);
      expect(testContactPoint.getValueElement()).toEqual(new StringType());
      expect(testContactPoint.hasUseElement()).toBe(false);
      expect(testContactPoint.getUseElement()).toBeUndefined();
      expect(testContactPoint.hasRankElement()).toBe(false);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType());
      expect(testContactPoint.hasPeriod()).toBe(false);
      expect(testContactPoint.getPeriod()).toEqual(new Period());

      expect(testContactPoint.hasSystem()).toBe(false);
      expect(testContactPoint.getSystem()).toBeUndefined();
      expect(testContactPoint.hasValue()).toBe(false);
      expect(testContactPoint.getValue()).toBeUndefined();
      expect(testContactPoint.hasUse()).toBe(false);
      expect(testContactPoint.getUse()).toBeUndefined();
      expect(testContactPoint.hasRank()).toBe(false);
      expect(testContactPoint.getRank()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const contactPoint = new ContactPoint();
      contactPoint.setSystem(VALID_SYSTEM_PHONE);
      contactPoint.setValue(VALID_STRING);
      contactPoint.setUse(VALID_USE_HOME);
      contactPoint.setRank(VALID_POSITIVEINT);
      contactPoint.setPeriod(VALID_PERIOD);

      let testContactPoint = contactPoint.copy();
      expect(testContactPoint).toBeDefined();
      expect(testContactPoint).toBeInstanceOf(DataType);
      expect(testContactPoint).toBeInstanceOf(ContactPoint);
      expect(testContactPoint.constructor.name).toStrictEqual('ContactPoint');
      expect(testContactPoint.fhirType()).toStrictEqual('ContactPoint');
      expect(testContactPoint.isEmpty()).toBe(false);
      expect(testContactPoint.isComplexDataType()).toBe(true);
      expect(testContactPoint.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testContactPoint.hasId()).toBe(false);
      expect(testContactPoint.getId()).toBeUndefined();
      expect(testContactPoint.hasExtension()).toBe(false);
      expect(testContactPoint.getExtension()).toEqual([] as Extension[]);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_PHONE, testContactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, testContactPointUseEnum));

      expect(testContactPoint.hasSystemElement()).toBe(true);
      expect(testContactPoint.getSystemElement()).toMatchObject(VALID_SYSTEM_PHONE_TYPE);
      expect(testContactPoint.hasValueElement()).toBe(true);
      expect(testContactPoint.getValueElement()).toEqual(new StringType(VALID_STRING));
      expect(testContactPoint.hasUseElement()).toBe(true);
      expect(testContactPoint.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testContactPoint.hasRankElement()).toBe(true);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType(VALID_POSITIVEINT));
      expect(testContactPoint.hasPeriod()).toBe(true);
      expect(testContactPoint.getPeriod()).toEqual(VALID_PERIOD);

      expect(testContactPoint.hasSystem()).toBe(true);
      expect(testContactPoint.getSystem()).toStrictEqual(VALID_SYSTEM_PHONE);
      expect(testContactPoint.hasValue()).toBe(true);
      expect(testContactPoint.getValue()).toStrictEqual(VALID_STRING);
      expect(testContactPoint.hasUse()).toBe(true);
      expect(testContactPoint.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testContactPoint.hasRank()).toBe(true);
      expect(testContactPoint.getRank()).toStrictEqual(VALID_POSITIVEINT);

      // Reset to empty

      contactPoint.setSystem(UNDEFINED_VALUE);
      contactPoint.setValue(UNDEFINED_VALUE);
      contactPoint.setUse(UNDEFINED_VALUE);
      contactPoint.setRank(UNDEFINED_VALUE);
      contactPoint.setPeriod(UNDEFINED_VALUE);

      testContactPoint = contactPoint.copy();
      expect(testContactPoint).toBeDefined();
      expect(testContactPoint).toBeInstanceOf(DataType);
      expect(testContactPoint).toBeInstanceOf(ContactPoint);
      expect(testContactPoint.constructor.name).toStrictEqual('ContactPoint');
      expect(testContactPoint.fhirType()).toStrictEqual('ContactPoint');
      expect(testContactPoint.isEmpty()).toBe(true);
      expect(testContactPoint.isComplexDataType()).toBe(true);
      expect(testContactPoint.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testContactPoint.hasId()).toBe(false);
      expect(testContactPoint.getId()).toBeUndefined();
      expect(testContactPoint.hasExtension()).toBe(false);
      expect(testContactPoint.getExtension()).toEqual([] as Extension[]);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(false);
      expect(testContactPoint.getSystemEnumType()).toBeUndefined();
      expect(testContactPoint.hasUseEnumType()).toBe(false);
      expect(testContactPoint.getUseEnumType()).toBeUndefined();

      expect(testContactPoint.hasSystemElement()).toBe(false);
      expect(testContactPoint.getSystemElement()).toBeUndefined();
      expect(testContactPoint.hasValueElement()).toBe(false);
      expect(testContactPoint.getValueElement()).toEqual(new StringType());
      expect(testContactPoint.hasUseElement()).toBe(false);
      expect(testContactPoint.getUseElement()).toBeUndefined();
      expect(testContactPoint.hasRankElement()).toBe(false);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType());
      expect(testContactPoint.hasPeriod()).toBe(false);
      expect(testContactPoint.getPeriod()).toEqual(new Period());

      expect(testContactPoint.hasSystem()).toBe(false);
      expect(testContactPoint.getSystem()).toBeUndefined();
      expect(testContactPoint.hasValue()).toBe(false);
      expect(testContactPoint.getValue()).toBeUndefined();
      expect(testContactPoint.hasUse()).toBe(false);
      expect(testContactPoint.getUse()).toBeUndefined();
      expect(testContactPoint.hasRank()).toBe(false);
      expect(testContactPoint.getRank()).toBeUndefined();
    });

    it('should properly handle system enum', () => {
      const testContactPoint = new ContactPoint();

      testContactPoint.setSystem(VALID_SYSTEM_PHONE);
      expect(testContactPoint.hasSystem()).toBe(true);
      expect(testContactPoint.getSystem()).toStrictEqual(VALID_SYSTEM_PHONE);

      testContactPoint.setSystemElement(VALID_SYSTEM_EMAIL_TYPE);
      expect(testContactPoint.hasSystemElement()).toBe(true);
      expect(testContactPoint.getSystemElement()).toMatchObject(VALID_SYSTEM_EMAIL_TYPE);

      testContactPoint.setSystemEnumType(new EnumCodeType(VALID_SYSTEM_FAX_TYPE, testContactPointSystemEnum));
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_FAX_TYPE, testContactPointSystemEnum),
      );

      testContactPoint.setSystem(UNDEFINED_VALUE);
      expect(testContactPoint.hasSystem()).toBe(false);
      expect(testContactPoint.getSystem()).toBeUndefined();

      testContactPoint.setSystemElement(UNDEFINED_VALUE);
      expect(testContactPoint.hasSystemElement()).toBe(false);
      expect(testContactPoint.getSystemElement()).toBeUndefined();

      testContactPoint.setSystemEnumType(UNDEFINED_VALUE);
      expect(testContactPoint.hasSystemEnumType()).toBe(false);
      expect(testContactPoint.getSystemEnumType()).toBeUndefined();

      let t = () => {
        testContactPoint.setSystem(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointSystemEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testContactPoint.setSystemElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointSystemEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testContactPoint.setSystemElement(new EnumCodeType(UNSUPPORTED_ENUM_CODE, testContactPointSystemEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointSystemEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should properly handle use enum', () => {
      const testContactPoint = new ContactPoint();

      testContactPoint.setUse(VALID_USE_HOME);
      expect(testContactPoint.hasUse()).toBe(true);
      expect(testContactPoint.getUse()).toStrictEqual(VALID_USE_HOME);

      testContactPoint.setUseElement(VALID_USE_WORK_TYPE);
      expect(testContactPoint.hasUseElement()).toBe(true);
      expect(testContactPoint.getUseElement()).toMatchObject(VALID_USE_WORK_TYPE);

      testContactPoint.setUseEnumType(new EnumCodeType(VALID_USE_TEMP, testContactPointUseEnum));
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_TEMP_TYPE, testContactPointUseEnum));

      testContactPoint.setUse(UNDEFINED_VALUE);
      expect(testContactPoint.hasUse()).toBe(false);
      expect(testContactPoint.getUse()).toBeUndefined();

      testContactPoint.setUseElement(UNDEFINED_VALUE);
      expect(testContactPoint.hasUseElement()).toBe(false);
      expect(testContactPoint.getUseElement()).toBeUndefined();

      testContactPoint.setUseEnumType(UNDEFINED_VALUE);
      expect(testContactPoint.hasUseEnumType()).toBe(false);
      expect(testContactPoint.getUseEnumType()).toBeUndefined();

      let t = () => {
        testContactPoint.setUse(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testContactPoint.setUseElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testContactPoint.setUseEnumType(new EnumCodeType(UNSUPPORTED_ENUM_CODE, testContactPointUseEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testContactPoint = new ContactPoint();
      testContactPoint.setSystem(VALID_SYSTEM_PHONE);
      testContactPoint.setValue(VALID_STRING);
      testContactPoint.setUse(VALID_USE_HOME);
      testContactPoint.setRank(VALID_POSITIVEINT);
      testContactPoint.setPeriod(VALID_PERIOD);

      expect(testContactPoint).toBeDefined();
      expect(testContactPoint).toBeInstanceOf(DataType);
      expect(testContactPoint).toBeInstanceOf(ContactPoint);
      expect(testContactPoint.constructor.name).toStrictEqual('ContactPoint');
      expect(testContactPoint.fhirType()).toStrictEqual('ContactPoint');
      expect(testContactPoint.isEmpty()).toBe(false);
      expect(testContactPoint.isComplexDataType()).toBe(true);
      expect(testContactPoint.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testContactPoint.hasId()).toBe(false);
      expect(testContactPoint.getId()).toBeUndefined();
      expect(testContactPoint.hasExtension()).toBe(false);
      expect(testContactPoint.getExtension()).toEqual([] as Extension[]);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_PHONE, testContactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, testContactPointUseEnum));

      expect(testContactPoint.hasSystemElement()).toBe(true);
      expect(testContactPoint.getSystemElement()).toMatchObject(VALID_SYSTEM_PHONE_TYPE);
      expect(testContactPoint.hasValueElement()).toBe(true);
      expect(testContactPoint.getValueElement()).toEqual(new StringType(VALID_STRING));
      expect(testContactPoint.hasUseElement()).toBe(true);
      expect(testContactPoint.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testContactPoint.hasRankElement()).toBe(true);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType(VALID_POSITIVEINT));
      expect(testContactPoint.hasPeriod()).toBe(true);
      expect(testContactPoint.getPeriod()).toEqual(VALID_PERIOD);

      expect(testContactPoint.hasSystem()).toBe(true);
      expect(testContactPoint.getSystem()).toStrictEqual(VALID_SYSTEM_PHONE);
      expect(testContactPoint.hasValue()).toBe(true);
      expect(testContactPoint.getValue()).toStrictEqual(VALID_STRING);
      expect(testContactPoint.hasUse()).toBe(true);
      expect(testContactPoint.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testContactPoint.hasRank()).toBe(true);
      expect(testContactPoint.getRank()).toStrictEqual(VALID_POSITIVEINT);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testContactPoint = new ContactPoint();
      testContactPoint.setSystem(VALID_SYSTEM_PHONE);
      testContactPoint.setValue(VALID_STRING);
      testContactPoint.setUse(VALID_USE_HOME);
      testContactPoint.setRank(VALID_POSITIVEINT);
      testContactPoint.setPeriod(VALID_PERIOD);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_PHONE, testContactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, testContactPointUseEnum));

      expect(testContactPoint.hasSystemElement()).toBe(true);
      expect(testContactPoint.getSystemElement()).toMatchObject(VALID_SYSTEM_PHONE_TYPE);
      expect(testContactPoint.hasValueElement()).toBe(true);
      expect(testContactPoint.getValueElement()).toEqual(new StringType(VALID_STRING));
      expect(testContactPoint.hasUseElement()).toBe(true);
      expect(testContactPoint.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testContactPoint.hasRankElement()).toBe(true);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType(VALID_POSITIVEINT));
      expect(testContactPoint.hasPeriod()).toBe(true);
      expect(testContactPoint.getPeriod()).toEqual(VALID_PERIOD);

      expect(testContactPoint.hasSystem()).toBe(true);
      expect(testContactPoint.getSystem()).toStrictEqual(VALID_SYSTEM_PHONE);
      expect(testContactPoint.hasValue()).toBe(true);
      expect(testContactPoint.getValue()).toStrictEqual(VALID_STRING);
      expect(testContactPoint.hasUse()).toBe(true);
      expect(testContactPoint.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testContactPoint.hasRank()).toBe(true);
      expect(testContactPoint.getRank()).toStrictEqual(VALID_POSITIVEINT);

      // Reset

      testContactPoint.setSystem(VALID_SYSTEM_EMAIL);
      testContactPoint.setValue(VALID_STRING_2);
      testContactPoint.setUse(VALID_USE_WORK);
      testContactPoint.setRank(VALID_POSITIVEINT_2);
      testContactPoint.setPeriod(VALID_PERIOD_2);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_EMAIL, testContactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_WORK, testContactPointUseEnum));

      expect(testContactPoint.hasSystemElement()).toBe(true);
      expect(testContactPoint.getSystemElement()).toMatchObject(VALID_SYSTEM_EMAIL_TYPE);
      expect(testContactPoint.hasValueElement()).toBe(true);
      expect(testContactPoint.getValueElement()).toEqual(new StringType(VALID_STRING_2));
      expect(testContactPoint.hasUseElement()).toBe(true);
      expect(testContactPoint.getUseElement()).toMatchObject(VALID_USE_WORK_TYPE);
      expect(testContactPoint.hasRankElement()).toBe(true);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType(VALID_POSITIVEINT_2));
      expect(testContactPoint.hasPeriod()).toBe(true);
      expect(testContactPoint.getPeriod()).toEqual(VALID_PERIOD_2);

      expect(testContactPoint.hasSystem()).toBe(true);
      expect(testContactPoint.getSystem()).toStrictEqual(VALID_SYSTEM_EMAIL);
      expect(testContactPoint.hasValue()).toBe(true);
      expect(testContactPoint.getValue()).toStrictEqual(VALID_STRING_2);
      expect(testContactPoint.hasUse()).toBe(true);
      expect(testContactPoint.getUse()).toStrictEqual(VALID_USE_WORK);
      expect(testContactPoint.hasRank()).toBe(true);
      expect(testContactPoint.getRank()).toStrictEqual(VALID_POSITIVEINT_2);

      // Reset to empty

      testContactPoint.setSystem(UNDEFINED_VALUE);
      testContactPoint.setValue(UNDEFINED_VALUE);
      testContactPoint.setUse(UNDEFINED_VALUE);
      testContactPoint.setRank(UNDEFINED_VALUE);
      testContactPoint.setPeriod(UNDEFINED_VALUE);

      expect(testContactPoint.hasSystemEnumType()).toBe(false);
      expect(testContactPoint.getSystemEnumType()).toBeUndefined();
      expect(testContactPoint.hasUseEnumType()).toBe(false);
      expect(testContactPoint.getUseEnumType()).toBeUndefined();

      expect(testContactPoint.hasSystemElement()).toBe(false);
      expect(testContactPoint.getSystemElement()).toBeUndefined();
      expect(testContactPoint.hasValueElement()).toBe(false);
      expect(testContactPoint.getValueElement()).toEqual(new StringType());
      expect(testContactPoint.hasUseElement()).toBe(false);
      expect(testContactPoint.getUseElement()).toBeUndefined();
      expect(testContactPoint.hasRankElement()).toBe(false);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType());
      expect(testContactPoint.hasPeriod()).toBe(false);
      expect(testContactPoint.getPeriod()).toEqual(new Period());

      expect(testContactPoint.hasSystem()).toBe(false);
      expect(testContactPoint.getSystem()).toBeUndefined();
      expect(testContactPoint.hasValue()).toBe(false);
      expect(testContactPoint.getValue()).toBeUndefined();
      expect(testContactPoint.hasUse()).toBe(false);
      expect(testContactPoint.getUse()).toBeUndefined();
      expect(testContactPoint.hasRank()).toBe(false);
      expect(testContactPoint.getRank()).toBeUndefined();
    });

    it('should throw errors for invalid primitive values', () => {
      const testContactPoint = new ContactPoint();

      let t = () => {
        testContactPoint.setValue(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid ContactPoint.value`);

      t = () => {
        // @ts-expect-error: allow for testing
        testContactPoint.setRank(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid ContactPoint.rank (${INVALID_NON_STRING_TYPE_VALUE})`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with DataType values', () => {
      const testContactPoint = new ContactPoint();
      testContactPoint.setSystemElement(VALID_SYSTEM_PHONE_TYPE);
      testContactPoint.setValueElement(VALID_STRING_TYPE);
      testContactPoint.setUseElement(VALID_USE_HOME_TYPE);
      testContactPoint.setRankElement(VALID_POSITIVEINT_TYPE);
      testContactPoint.setPeriod(VALID_PERIOD);

      expect(testContactPoint).toBeDefined();
      expect(testContactPoint).toBeInstanceOf(DataType);
      expect(testContactPoint).toBeInstanceOf(ContactPoint);
      expect(testContactPoint.constructor.name).toStrictEqual('ContactPoint');
      expect(testContactPoint.fhirType()).toStrictEqual('ContactPoint');
      expect(testContactPoint.isEmpty()).toBe(false);
      expect(testContactPoint.isComplexDataType()).toBe(true);
      expect(testContactPoint.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testContactPoint.hasId()).toBe(false);
      expect(testContactPoint.getId()).toBeUndefined();
      expect(testContactPoint.hasExtension()).toBe(false);
      expect(testContactPoint.getExtension()).toEqual([] as Extension[]);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_PHONE, testContactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, testContactPointUseEnum));

      expect(testContactPoint.hasSystemElement()).toBe(true);
      expect(testContactPoint.getSystemElement()).toMatchObject(VALID_SYSTEM_PHONE_TYPE);
      expect(testContactPoint.hasValueElement()).toBe(true);
      expect(testContactPoint.getValueElement()).toEqual(new StringType(VALID_STRING));
      expect(testContactPoint.hasUseElement()).toBe(true);
      expect(testContactPoint.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testContactPoint.hasRankElement()).toBe(true);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType(VALID_POSITIVEINT));
      expect(testContactPoint.hasPeriod()).toBe(true);
      expect(testContactPoint.getPeriod()).toEqual(VALID_PERIOD);

      expect(testContactPoint.hasSystem()).toBe(true);
      expect(testContactPoint.getSystem()).toStrictEqual(VALID_SYSTEM_PHONE);
      expect(testContactPoint.hasValue()).toBe(true);
      expect(testContactPoint.getValue()).toStrictEqual(VALID_STRING);
      expect(testContactPoint.hasUse()).toBe(true);
      expect(testContactPoint.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testContactPoint.hasRank()).toBe(true);
      expect(testContactPoint.getRank()).toStrictEqual(VALID_POSITIVEINT);
    });

    it('should be properly reset by modifying all properties with DataType values', () => {
      const testContactPoint = new ContactPoint();
      testContactPoint.setSystemElement(VALID_SYSTEM_PHONE_TYPE);
      testContactPoint.setValueElement(VALID_STRING_TYPE);
      testContactPoint.setUseElement(VALID_USE_HOME_TYPE);
      testContactPoint.setRankElement(VALID_POSITIVEINT_TYPE);
      testContactPoint.setPeriod(VALID_PERIOD);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_PHONE, testContactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, testContactPointUseEnum));

      expect(testContactPoint.hasSystemElement()).toBe(true);
      expect(testContactPoint.getSystemElement()).toMatchObject(VALID_SYSTEM_PHONE_TYPE);
      expect(testContactPoint.hasValueElement()).toBe(true);
      expect(testContactPoint.getValueElement()).toEqual(new StringType(VALID_STRING));
      expect(testContactPoint.hasUseElement()).toBe(true);
      expect(testContactPoint.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testContactPoint.hasRankElement()).toBe(true);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType(VALID_POSITIVEINT));
      expect(testContactPoint.hasPeriod()).toBe(true);
      expect(testContactPoint.getPeriod()).toEqual(VALID_PERIOD);

      expect(testContactPoint.hasSystem()).toBe(true);
      expect(testContactPoint.getSystem()).toStrictEqual(VALID_SYSTEM_PHONE);
      expect(testContactPoint.hasValue()).toBe(true);
      expect(testContactPoint.getValue()).toStrictEqual(VALID_STRING);
      expect(testContactPoint.hasUse()).toBe(true);
      expect(testContactPoint.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testContactPoint.hasRank()).toBe(true);
      expect(testContactPoint.getRank()).toStrictEqual(VALID_POSITIVEINT);

      // Reset

      testContactPoint.setSystemElement(VALID_SYSTEM_EMAIL_TYPE);
      testContactPoint.setValueElement(VALID_STRING_TYPE_2);
      testContactPoint.setUseElement(VALID_USE_WORK_TYPE);
      testContactPoint.setRankElement(VALID_POSITIVEINT_TYPE_2);
      testContactPoint.setPeriod(VALID_PERIOD_2);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_EMAIL, testContactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_WORK, testContactPointUseEnum));

      expect(testContactPoint.hasSystemElement()).toBe(true);
      expect(testContactPoint.getSystemElement()).toMatchObject(VALID_SYSTEM_EMAIL_TYPE);
      expect(testContactPoint.hasValueElement()).toBe(true);
      expect(testContactPoint.getValueElement()).toEqual(new StringType(VALID_STRING_2));
      expect(testContactPoint.hasUseElement()).toBe(true);
      expect(testContactPoint.getUseElement()).toMatchObject(VALID_USE_WORK_TYPE);
      expect(testContactPoint.hasRankElement()).toBe(true);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType(VALID_POSITIVEINT_2));
      expect(testContactPoint.hasPeriod()).toBe(true);
      expect(testContactPoint.getPeriod()).toEqual(VALID_PERIOD_2);

      expect(testContactPoint.hasSystem()).toBe(true);
      expect(testContactPoint.getSystem()).toStrictEqual(VALID_SYSTEM_EMAIL);
      expect(testContactPoint.hasValue()).toBe(true);
      expect(testContactPoint.getValue()).toStrictEqual(VALID_STRING_2);
      expect(testContactPoint.hasUse()).toBe(true);
      expect(testContactPoint.getUse()).toStrictEqual(VALID_USE_WORK);
      expect(testContactPoint.hasRank()).toBe(true);
      expect(testContactPoint.getRank()).toStrictEqual(VALID_POSITIVEINT_2);

      // Reset to empty

      testContactPoint.setSystemElement(UNDEFINED_VALUE);
      testContactPoint.setValueElement(UNDEFINED_VALUE);
      testContactPoint.setUseElement(UNDEFINED_VALUE);
      testContactPoint.setRankElement(UNDEFINED_VALUE);
      testContactPoint.setPeriod(UNDEFINED_VALUE);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(false);
      expect(testContactPoint.getSystemEnumType()).toBeUndefined();
      expect(testContactPoint.hasUseEnumType()).toBe(false);
      expect(testContactPoint.getUseEnumType()).toBeUndefined();

      expect(testContactPoint.hasSystemElement()).toBe(false);
      expect(testContactPoint.getSystemElement()).toBeUndefined();
      expect(testContactPoint.hasValueElement()).toBe(false);
      expect(testContactPoint.getValueElement()).toEqual(new StringType());
      expect(testContactPoint.hasUseElement()).toBe(false);
      expect(testContactPoint.getUseElement()).toBeUndefined();
      expect(testContactPoint.hasRankElement()).toBe(false);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType());
      expect(testContactPoint.hasPeriod()).toBe(false);
      expect(testContactPoint.getPeriod()).toEqual(new Period());

      expect(testContactPoint.hasSystem()).toBe(false);
      expect(testContactPoint.getSystem()).toBeUndefined();
      expect(testContactPoint.hasValue()).toBe(false);
      expect(testContactPoint.getValue()).toBeUndefined();
      expect(testContactPoint.hasUse()).toBe(false);
      expect(testContactPoint.getUse()).toBeUndefined();
      expect(testContactPoint.hasRank()).toBe(false);
      expect(testContactPoint.getRank()).toBeUndefined();
    });

    it('should throw errors for invalid DataType values', () => {
      const testContactPoint = new ContactPoint();

      let t = () => {
        // @ts-expect-error: allow for testing
        testContactPoint.setValueElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid ContactPoint.value`);

      t = () => {
        // @ts-expect-error: allow for testing
        testContactPoint.setRankElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid ContactPoint.rank; Provided element is not an instance of PositiveIntType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testContactPoint.setPeriod(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid ContactPoint.period; Provided element is not an instance of Period.`);
    });
  });

  describe('Serialization/Deserialization', () => {
    const VALID_JSON = {
      id: 'id1234',
      extension: [
        {
          url: 'testUrl1',
          valueString: 'base extension string value 1',
        },
        {
          url: 'testUrl2',
          valueString: 'base extension string value 2',
        },
      ],
      system: 'phone',
      value: 'This is a valid string.',
      _value: {
        id: 'V1357',
        extension: [
          {
            url: 'valueUrl',
            valueString: 'value extension string value',
          },
        ],
      },
      use: 'home',
      rank: 13579,
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };

    it('should return undefined for empty json', () => {
      let testType = ContactPoint.parse({});
      expect(testType).toBeUndefined();

      // @ts-expect-error: allow for testing
      testType = ContactPoint.parse(undefined);
      expect(testType).toBeUndefined();

      testType = ContactPoint.parse(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        ContactPoint.parse('NOT AN OBJECT');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`ContactPoint JSON is not a JSON object.`);
    });

    it('should properly create serialized content', () => {
      const valueType = new StringType(VALID_STRING);
      const valueId = 'V1357';
      const valueExtension = new Extension('valueUrl', new StringType('value extension string value'));
      valueType.setId(valueId);
      valueType.addExtension(valueExtension);

      const testContactPoint = new ContactPoint();
      const testId = 'id1234';
      testContactPoint.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testContactPoint.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testContactPoint.addExtension(testExtension2);

      testContactPoint.setSystemElement(VALID_SYSTEM_PHONE_TYPE);
      testContactPoint.setValueElement(valueType);
      testContactPoint.setUseElement(VALID_USE_HOME_TYPE);
      testContactPoint.setRankElement(VALID_POSITIVEINT_TYPE);
      testContactPoint.setPeriod(VALID_PERIOD);

      expect(testContactPoint).toBeDefined();
      expect(testContactPoint).toBeInstanceOf(DataType);
      expect(testContactPoint).toBeInstanceOf(ContactPoint);
      expect(testContactPoint.constructor.name).toStrictEqual('ContactPoint');
      expect(testContactPoint.fhirType()).toStrictEqual('ContactPoint');
      expect(testContactPoint.isEmpty()).toBe(false);
      expect(testContactPoint.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testContactPoint.hasId()).toBe(true);
      expect(testContactPoint.getId()).toStrictEqual(testId);
      expect(testContactPoint.hasExtension()).toBe(true);
      expect(testContactPoint.getExtension()).toEqual([testExtension1, testExtension2]);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_PHONE, testContactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, testContactPointUseEnum));

      expect(testContactPoint.hasSystemElement()).toBe(true);
      expect(testContactPoint.getSystemElement()).toMatchObject(VALID_SYSTEM_PHONE_TYPE);
      expect(testContactPoint.hasValueElement()).toBe(true);
      expect(testContactPoint.getValueElement()).toEqual(valueType);
      expect(testContactPoint.hasUseElement()).toBe(true);
      expect(testContactPoint.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testContactPoint.hasRankElement()).toBe(true);
      expect(testContactPoint.getRankElement()).toEqual(new PositiveIntType(VALID_POSITIVEINT));
      expect(testContactPoint.hasPeriod()).toBe(true);
      expect(testContactPoint.getPeriod()).toEqual(VALID_PERIOD);

      expect(testContactPoint.hasSystem()).toBe(true);
      expect(testContactPoint.getSystem()).toStrictEqual(VALID_SYSTEM_PHONE);
      expect(testContactPoint.hasValue()).toBe(true);
      expect(testContactPoint.getValue()).toStrictEqual(VALID_STRING);
      expect(testContactPoint.hasUse()).toBe(true);
      expect(testContactPoint.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testContactPoint.hasRank()).toBe(true);
      expect(testContactPoint.getRank()).toStrictEqual(VALID_POSITIVEINT);

      expect(testContactPoint.toJSON()).toEqual(VALID_JSON);
    });

    it('should return ContactPoint for valid json', () => {
      const testType: ContactPoint | undefined = ContactPoint.parse(VALID_JSON);

      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(ContactPoint);
      expect(testType?.constructor.name).toStrictEqual('ContactPoint');
      expect(testType?.fhirType()).toStrictEqual('ContactPoint');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });
});
