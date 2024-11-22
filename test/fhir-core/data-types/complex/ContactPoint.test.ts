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
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { PositiveIntType } from '@src/fhir-core/data-types/primitive/PositiveIntType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { ContactPoint } from '@src/fhir-core/data-types/complex/ContactPoint';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { ContactPointSystemEnum } from '@src/fhir-core/data-types/code-systems/ContactPointSystemEnum';
import { ContactPointUseEnum } from '@src/fhir-core/data-types/code-systems/ContactPointUseEnum';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { FHIR_MAX_INTEGER } from '../../../test-utils';

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
  const INVALID_ENUM_CODE_TYPE = new CodeType(UNSUPPORTED_ENUM_CODE);
  const INVALID_CODE_TYPE = new CodeType(UNSUPPORTED_ENUM_CODE);

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);
  const INVALID_STRING = '';
  const INVALID_STRING_TYPE = new CodeType(VALID_USE_TEMP);

  const VALID_POSITIVEINT = 13579;
  const VALID_POSITIVEINT_TYPE = new PositiveIntType(VALID_POSITIVEINT);
  const VALID_POSITIVEINT_2 = 24680;
  const VALID_POSITIVEINT_TYPE_2 = new PositiveIntType(VALID_POSITIVEINT_2);
  const INVALID_POSITIVEINT = FHIR_MAX_INTEGER + 1;
  const INVALID_POSITIVEINT_TYPE = new StringType('invalid PositiveInt');

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
  const INVALID_PERIOD_TYPE = new StringType(`Invalid Period`);

  const UNDEFINED_VALUE = undefined;

  let contactPointSystemEnum: ContactPointSystemEnum;
  let contactPointUseEnum: ContactPointUseEnum;
  beforeAll(() => {
    contactPointSystemEnum = new ContactPointSystemEnum();
    contactPointUseEnum = new ContactPointUseEnum();
  });

  describe('Core', () => {
    const expectedJson = {
      system: 'phone',
      value: 'This is a valid string.',
      use: 'home',
      rank: 13579,
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
        new EnumCodeType(VALID_SYSTEM_PHONE, contactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, contactPointUseEnum));

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

      contactPoint.setSystemElement(UNDEFINED_VALUE);
      contactPoint.setValueElement(UNDEFINED_VALUE);
      contactPoint.setUseElement(UNDEFINED_VALUE);
      contactPoint.setRankElement(UNDEFINED_VALUE);
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
      const contactPoint = new ContactPoint();

      contactPoint.setSystem(VALID_SYSTEM_PHONE);
      expect(contactPoint.hasSystem()).toBe(true);
      expect(contactPoint.getSystem()).toStrictEqual(VALID_SYSTEM_PHONE);

      contactPoint.setSystemElement(VALID_SYSTEM_EMAIL_TYPE);
      expect(contactPoint.hasSystemElement()).toBe(true);
      expect(contactPoint.getSystemElement()).toMatchObject(VALID_SYSTEM_EMAIL_TYPE);

      contactPoint.setSystemEnumType(new EnumCodeType(VALID_SYSTEM_FAX_TYPE, contactPointSystemEnum));
      expect(contactPoint.hasSystemEnumType()).toBe(true);
      expect(contactPoint.getSystemEnumType()).toEqual(new EnumCodeType(VALID_SYSTEM_FAX_TYPE, contactPointSystemEnum));

      contactPoint.setSystem(UNDEFINED_VALUE);
      expect(contactPoint.hasSystemEnumType()).toBe(false);
      expect(contactPoint.getSystemEnumType()).toBeUndefined();
    });

    it('should properly handle use enum', () => {
      const contactPoint = new ContactPoint();

      contactPoint.setUse(VALID_USE_HOME);
      expect(contactPoint.hasUse()).toBe(true);
      expect(contactPoint.getUse()).toStrictEqual(VALID_USE_HOME);

      contactPoint.setUseElement(VALID_USE_WORK_TYPE);
      expect(contactPoint.hasUseElement()).toBe(true);
      expect(contactPoint.getUseElement()).toMatchObject(VALID_USE_WORK_TYPE);

      contactPoint.setUseEnumType(new EnumCodeType(VALID_USE_TEMP_TYPE, contactPointUseEnum));
      expect(contactPoint.hasUseEnumType()).toBe(true);
      expect(contactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_TEMP_TYPE, contactPointUseEnum));

      contactPoint.setUse(UNDEFINED_VALUE);
      expect(contactPoint.hasUseEnumType()).toBe(false);
      expect(contactPoint.getUseEnumType()).toBeUndefined();
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
        new EnumCodeType(VALID_SYSTEM_PHONE, contactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, contactPointUseEnum));

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

      expect(testContactPoint).toBeDefined();
      expect(testContactPoint.isEmpty()).toBe(false);

      testContactPoint.setSystem(VALID_SYSTEM_EMAIL);
      testContactPoint.setValue(VALID_STRING_2);
      testContactPoint.setUse(VALID_USE_WORK);
      testContactPoint.setRank(VALID_POSITIVEINT_2);
      testContactPoint.setPeriod(VALID_PERIOD_2);

      // inherited properties from Element
      expect(testContactPoint.hasId()).toBe(false);
      expect(testContactPoint.getId()).toBeUndefined();
      expect(testContactPoint.hasExtension()).toBe(false);
      expect(testContactPoint.getExtension()).toEqual([] as Extension[]);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_EMAIL, contactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_WORK, contactPointUseEnum));

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

    it('should throw InvalidCodeError when reset with unsupported primitive ContactPoint.system value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        testContactPoint.setSystem(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointSystemEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should throw PrimitiveTypeError when reset with invalid primitive ContactPoint.value value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        testContactPoint.setValue(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid ContactPoint.value`);
    });

    it('should throw InvalidCodeError when reset with unsupported primitive ContactPoint.use value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        testContactPoint.setUse(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should throw PrimitiveTypeError when reset with invalid primitive ContactPoint.rank value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        testContactPoint.setRank(INVALID_POSITIVEINT);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid ContactPoint.rank (${String(INVALID_POSITIVEINT)})`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with PrimitiveType values', () => {
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
        new EnumCodeType(VALID_SYSTEM_PHONE, contactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, contactPointUseEnum));

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

    it('should be properly reset by modifying all properties with PrimitiveType values', () => {
      const testContactPoint = new ContactPoint();
      testContactPoint.setSystemElement(VALID_SYSTEM_PHONE_TYPE);
      testContactPoint.setValueElement(VALID_STRING_TYPE);
      testContactPoint.setUseElement(VALID_USE_HOME_TYPE);
      testContactPoint.setRankElement(VALID_POSITIVEINT_TYPE);
      testContactPoint.setPeriod(VALID_PERIOD);

      expect(testContactPoint).toBeDefined();
      expect(testContactPoint.isEmpty()).toBe(false);

      testContactPoint.setSystemElement(VALID_SYSTEM_EMAIL_TYPE);
      testContactPoint.setValueElement(VALID_STRING_TYPE_2);
      testContactPoint.setUseElement(VALID_USE_WORK_TYPE);
      testContactPoint.setRankElement(VALID_POSITIVEINT_TYPE_2);
      testContactPoint.setPeriod(VALID_PERIOD_2);

      // inherited properties from Element
      expect(testContactPoint.hasId()).toBe(false);
      expect(testContactPoint.getId()).toBeUndefined();
      expect(testContactPoint.hasExtension()).toBe(false);
      expect(testContactPoint.getExtension()).toEqual([] as Extension[]);

      // ContactPoint properties
      expect(testContactPoint.hasSystemEnumType()).toBe(true);
      expect(testContactPoint.getSystemEnumType()).toEqual(
        new EnumCodeType(VALID_SYSTEM_EMAIL, contactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_WORK, contactPointUseEnum));

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
    });

    it('should throw InvalidCodeError when reset with unsupported EnumCodeType ContactPoint.system value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        testContactPoint.setSystemEnumType(new EnumCodeType(INVALID_ENUM_CODE_TYPE, contactPointSystemEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointSystemEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should throw InvalidCodeError when reset with unsupported PrimitiveType ContactPoint.system value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        testContactPoint.setSystemElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointSystemEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType ContactPoint.value value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        // @ts-expect-error: allow for testing
        testContactPoint.setValueElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid ContactPoint.value`);
    });

    it('should throw InvalidCodeError when reset with unsupported EnumCodeType ContactPoint.use value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        testContactPoint.setUseEnumType(new EnumCodeType(INVALID_ENUM_CODE_TYPE, contactPointUseEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should throw InvalidCodeError when reset with unsupported PrimitiveType ContactPoint.use value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        testContactPoint.setUseElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown ContactPointUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType ContactPoint.rank value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        // @ts-expect-error: allow for testing
        testContactPoint.setRankElement(INVALID_POSITIVEINT_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`ContactPoint.rank; Provided element is not an instance of PositiveIntType.`);
    });

    it('should throw InvalidTypeError when reset with invalid Period ContactPoint.period value', () => {
      const testContactPoint = new ContactPoint();
      const t = () => {
        // @ts-expect-error: allow for testing
        testContactPoint.setPeriod(INVALID_PERIOD_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid ContactPoint.period; Provided element is not an instance of Period.`);
    });
  });

  describe('Serialization/Deserialization', () => {
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
        new EnumCodeType(VALID_SYSTEM_PHONE, contactPointSystemEnum),
      );
      expect(testContactPoint.hasUseEnumType()).toBe(true);
      expect(testContactPoint.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, contactPointUseEnum));

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

      const expectedJson = {
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
      expect(testContactPoint.toJSON()).toEqual(expectedJson);
    });
  });
});
