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
import { NameUseEnum } from '@src/fhir-core/data-types/code-systems/NameUseEnum';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { fhirString } from '@src/fhir-core/data-types/primitive/primitive-types';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { INVALID_NON_STRING_TYPE, INVALID_STRING, INVALID_STRING_TYPE, UNDEFINED_VALUE } from '../../../test-utils';

describe('HumanName', () => {
  const VALID_USE_USUAL = `usual`;
  const VALID_USE_USUAL_TYPE = new CodeType(VALID_USE_USUAL);
  const VALID_USE_OFFICIAL = `official`;
  const VALID_USE_OFFICIAL_TYPE = new CodeType(VALID_USE_OFFICIAL);
  const VALID_USE_TEMP = `temp`;
  const VALID_USE_TEMP_TYPE = new CodeType(VALID_USE_TEMP);
  const UNSUPPORTED_ENUM_CODE = 'unsupportedEnumCode';
  const INVALID_CODE_TYPE = new CodeType(UNSUPPORTED_ENUM_CODE);

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);

  const VALID_FAMILY = 'Surname';
  const VALID_FAMILY_TYPE = new StringType(VALID_FAMILY);
  const VALID_FAMILY_2 = 'Familyname';
  const VALID_FAMILY_TYPE_2 = new StringType(VALID_FAMILY_2);

  const VALID_FIRST_NAME = 'First';
  const VALID_FIRST_NAME_TYPE = new StringType(VALID_FIRST_NAME);
  const VALID_MIDDLE_NAME = 'Middle';
  const VALID_MIDDLE_NAME_TYPE = new StringType(VALID_MIDDLE_NAME);
  const VALID_GIVEN_NAMES = [VALID_FIRST_NAME, VALID_MIDDLE_NAME];
  const VALID_GIVEN_NAME_TYPES = [VALID_FIRST_NAME_TYPE, VALID_MIDDLE_NAME_TYPE];
  const VALID_FIRST_NAME_2 = 'Given1';
  const VALID_FIRST_NAME_TYPE_2 = new StringType(VALID_FIRST_NAME_2);
  const VALID_MIDDLE_NAME_2 = 'Given2';
  const VALID_MIDDLE_NAME_TYPE_2 = new StringType(VALID_MIDDLE_NAME_2);
  const VALID_GIVEN_NAMES_2 = [VALID_FIRST_NAME_2, VALID_MIDDLE_NAME_2];
  const VALID_GIVEN_NAME_TYPES_2 = [VALID_FIRST_NAME_TYPE_2, VALID_MIDDLE_NAME_TYPE_2];

  const VALID_PREFIX = 'Mr.';
  const VALID_PREFIX_TYPE = new StringType(VALID_PREFIX);
  const VALID_PREFIXES = [VALID_PREFIX];
  const VALID_PREFIX_TYPES = [VALID_PREFIX_TYPE];
  const VALID_PREFIX_2 = 'Ms.';
  const VALID_PREFIX_TYPE_2 = new StringType(VALID_PREFIX_2);
  const VALID_PREFIXES_2 = [VALID_PREFIX_2];
  const VALID_PREFIX_TYPES_2 = [VALID_PREFIX_TYPE_2];

  const VALID_SUFFIX = 'Sr.';
  const VALID_SUFFIX_TYPE = new StringType(VALID_SUFFIX);
  const VALID_SUFFIXES = [VALID_SUFFIX];
  const VALID_SUFFIX_TYPES = [VALID_SUFFIX_TYPE];
  const VALID_SUFFIX_2 = 'PhD';
  const VALID_SUFFIX_TYPE_2 = new StringType(VALID_SUFFIX_2);
  const VALID_SUFFIXES_2 = [VALID_SUFFIX_2];
  const VALID_SUFFIX_TYPES_2 = [VALID_SUFFIX_TYPE_2];

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

  let nameUseEnum: NameUseEnum;
  beforeAll(() => {
    nameUseEnum = new NameUseEnum();
  });

  describe('Core', () => {
    const expectedJson = {
      use: VALID_USE_USUAL,
      text: VALID_STRING,
      family: VALID_FAMILY,
      given: [VALID_FIRST_NAME, VALID_MIDDLE_NAME],
      prefix: [VALID_PREFIX],
      suffix: [VALID_SUFFIX],
      period: {
        start: VALID_START_DATETIME,
        end: VALID_END_DATETIME,
      },
    };

    it('should be properly instantiated as empty', () => {
      const testHumanName = new HumanName();
      expect(testHumanName).toBeDefined();
      expect(testHumanName).toBeInstanceOf(DataType);
      expect(testHumanName).toBeInstanceOf(HumanName);
      expect(testHumanName.constructor.name).toStrictEqual('HumanName');
      expect(testHumanName.fhirType()).toStrictEqual('HumanName');
      expect(testHumanName.isEmpty()).toBe(true);
      expect(testHumanName.isComplexDataType()).toBe(true);
      expect(testHumanName.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testHumanName.hasId()).toBe(false);
      expect(testHumanName.getId()).toBeUndefined();
      expect(testHumanName.hasExtension()).toBe(false);
      expect(testHumanName.getExtension()).toEqual([] as Extension[]);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(false);
      expect(testHumanName.getUseEnumType()).toBeUndefined();

      expect(testHumanName.hasUseElement()).toBe(false);
      expect(testHumanName.getUseElement()).toBeUndefined();
      expect(testHumanName.hasTextElement()).toBe(false);
      expect(testHumanName.getTextElement()).toEqual(new StringType());
      expect(testHumanName.hasFamilyElement()).toBe(false);
      expect(testHumanName.getFamilyElement()).toEqual(new StringType());
      expect(testHumanName.hasGivenElement()).toBe(false);
      expect(testHumanName.getGivenElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasPrefixElement()).toBe(false);
      expect(testHumanName.getPrefixElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasSuffixElement()).toBe(false);
      expect(testHumanName.getSuffixElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasPeriod()).toBe(false);
      expect(testHumanName.getPeriod()).toEqual(new Period());

      expect(testHumanName.hasUse()).toBe(false);
      expect(testHumanName.getUse()).toBeUndefined();
      expect(testHumanName.hasText()).toBe(false);
      expect(testHumanName.getText()).toBeUndefined();
      expect(testHumanName.hasFamily()).toBe(false);
      expect(testHumanName.getFamily()).toBeUndefined();
      expect(testHumanName.hasGiven()).toBe(false);
      expect(testHumanName.getGiven()).toEqual([] as fhirString[]);
      expect(testHumanName.hasPrefix()).toBe(false);
      expect(testHumanName.getPrefix()).toEqual([] as fhirString[]);
      expect(testHumanName.hasSuffix()).toBe(false);
      expect(testHumanName.getSuffix()).toEqual([] as fhirString[]);
    });

    it('should properly copy()', () => {
      const humanName = new HumanName();
      humanName.setUse(VALID_USE_USUAL);
      humanName.setText(VALID_STRING);
      humanName.setFamily(VALID_FAMILY);
      humanName.setGiven(VALID_GIVEN_NAMES);
      humanName.setPrefix(VALID_PREFIXES);
      humanName.setSuffix(VALID_SUFFIXES);
      humanName.setPeriod(VALID_PERIOD);

      let testHumanName = humanName.copy();
      expect(testHumanName).toBeDefined();
      expect(testHumanName).toBeInstanceOf(DataType);
      expect(testHumanName).toBeInstanceOf(HumanName);
      expect(testHumanName.constructor.name).toStrictEqual('HumanName');
      expect(testHumanName.fhirType()).toStrictEqual('HumanName');
      expect(testHumanName.isEmpty()).toBe(false);
      expect(testHumanName.isComplexDataType()).toBe(true);
      expect(testHumanName.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testHumanName.hasId()).toBe(false);
      expect(testHumanName.getId()).toBeUndefined();
      expect(testHumanName.hasExtension()).toBe(false);
      expect(testHumanName.getExtension()).toEqual([] as Extension[]);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(true);
      expect(testHumanName.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_USUAL, nameUseEnum));

      expect(testHumanName.hasUseElement()).toBe(true);
      expect(testHumanName.getUseElement()).toMatchObject(VALID_USE_USUAL_TYPE);
      expect(testHumanName.hasTextElement()).toBe(true);
      expect(testHumanName.getTextElement()).toMatchObject(VALID_STRING_TYPE);
      expect(testHumanName.hasFamilyElement()).toBe(true);
      expect(testHumanName.getFamilyElement()).toMatchObject(VALID_FAMILY_TYPE);
      expect(testHumanName.hasGivenElement()).toBe(true);
      expect(testHumanName.getGivenElement()).toEqual([VALID_FIRST_NAME_TYPE, VALID_MIDDLE_NAME_TYPE]);
      expect(testHumanName.hasPrefixElement()).toBe(true);
      expect(testHumanName.getPrefixElement()).toEqual([VALID_PREFIX_TYPE]);
      expect(testHumanName.hasSuffixElement()).toBe(true);
      expect(testHumanName.getSuffixElement()).toEqual([VALID_SUFFIX_TYPE]);
      expect(testHumanName.hasPeriod()).toBe(true);
      expect(testHumanName.getPeriod()).toEqual(VALID_PERIOD);

      expect(testHumanName.hasUse()).toBe(true);
      expect(testHumanName.getUse()).toStrictEqual(VALID_USE_USUAL);
      expect(testHumanName.hasText()).toBe(true);
      expect(testHumanName.getText()).toStrictEqual(VALID_STRING);
      expect(testHumanName.hasFamily()).toBe(true);
      expect(testHumanName.getFamily()).toStrictEqual(VALID_FAMILY);
      expect(testHumanName.hasGiven()).toBe(true);
      expect(testHumanName.getGiven()).toEqual(VALID_GIVEN_NAMES);
      expect(testHumanName.hasPrefix()).toBe(true);
      expect(testHumanName.getPrefix()).toEqual(VALID_PREFIXES);
      expect(testHumanName.hasSuffix()).toBe(true);
      expect(testHumanName.getSuffix()).toEqual(VALID_SUFFIXES);

      // Reset as empty

      humanName.setUse(UNDEFINED_VALUE);
      humanName.setText(UNDEFINED_VALUE);
      humanName.setFamily(UNDEFINED_VALUE);
      humanName.setGiven(UNDEFINED_VALUE);
      humanName.setPrefix(UNDEFINED_VALUE);
      humanName.setSuffix(UNDEFINED_VALUE);
      humanName.setPeriod(UNDEFINED_VALUE);

      testHumanName = humanName.copy();
      expect(testHumanName).toBeDefined();
      expect(testHumanName).toBeInstanceOf(DataType);
      expect(testHumanName).toBeInstanceOf(HumanName);
      expect(testHumanName.constructor.name).toStrictEqual('HumanName');
      expect(testHumanName.fhirType()).toStrictEqual('HumanName');
      expect(testHumanName.isEmpty()).toBe(true);
      expect(testHumanName.isComplexDataType()).toBe(true);
      expect(testHumanName.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testHumanName.hasId()).toBe(false);
      expect(testHumanName.getId()).toBeUndefined();
      expect(testHumanName.hasExtension()).toBe(false);
      expect(testHumanName.getExtension()).toEqual([] as Extension[]);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(false);
      expect(testHumanName.getUseEnumType()).toBeUndefined();

      expect(testHumanName.hasUseElement()).toBe(false);
      expect(testHumanName.getUseElement()).toBeUndefined();
      expect(testHumanName.hasTextElement()).toBe(false);
      expect(testHumanName.getTextElement()).toEqual(new StringType());
      expect(testHumanName.hasFamilyElement()).toBe(false);
      expect(testHumanName.getFamilyElement()).toEqual(new StringType());
      expect(testHumanName.hasGivenElement()).toBe(false);
      expect(testHumanName.getGivenElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasPrefixElement()).toBe(false);
      expect(testHumanName.getPrefixElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasSuffixElement()).toBe(false);
      expect(testHumanName.getSuffixElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasPeriod()).toBe(false);
      expect(testHumanName.getPeriod()).toEqual(new Period());

      expect(testHumanName.hasUse()).toBe(false);
      expect(testHumanName.getUse()).toBeUndefined();
      expect(testHumanName.hasText()).toBe(false);
      expect(testHumanName.getText()).toBeUndefined();
      expect(testHumanName.hasFamily()).toBe(false);
      expect(testHumanName.getFamily()).toBeUndefined();
      expect(testHumanName.hasGiven()).toBe(false);
      expect(testHumanName.getGiven()).toEqual([] as fhirString[]);
      expect(testHumanName.hasPrefix()).toBe(false);
      expect(testHumanName.getPrefix()).toEqual([] as fhirString[]);
      expect(testHumanName.hasSuffix()).toBe(false);
      expect(testHumanName.getSuffix()).toEqual([] as fhirString[]);
    });

    it('should properly handle use enum', () => {
      const testHumanName = new HumanName();

      testHumanName.setUse(VALID_USE_USUAL);
      expect(testHumanName.hasUse()).toBe(true);
      expect(testHumanName.getUse()).toStrictEqual(VALID_USE_USUAL);

      testHumanName.setUseElement(VALID_USE_OFFICIAL_TYPE);
      expect(testHumanName.hasUseElement()).toBe(true);
      expect(testHumanName.getUseElement()).toMatchObject(VALID_USE_OFFICIAL_TYPE);

      testHumanName.setUseEnumType(new EnumCodeType(VALID_USE_TEMP, nameUseEnum));
      expect(testHumanName.hasUseEnumType()).toBe(true);
      expect(testHumanName.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_TEMP_TYPE, nameUseEnum));

      testHumanName.setUse(UNDEFINED_VALUE);
      expect(testHumanName.hasUse()).toBe(false);
      expect(testHumanName.getUse()).toBeUndefined();

      testHumanName.setUseElement(UNDEFINED_VALUE);
      expect(testHumanName.hasUseElement()).toBe(false);
      expect(testHumanName.getUseElement()).toBeUndefined();

      testHumanName.setUseEnumType(UNDEFINED_VALUE);
      expect(testHumanName.hasUseEnumType()).toBe(false);
      expect(testHumanName.getUseEnumType()).toBeUndefined();

      let t = () => {
        testHumanName.setUse(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown NameUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testHumanName.setUseElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown NameUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        // @ts-expect-error: allow for testing
        testHumanName.setUseElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid HumanName.use; Provided element is not an instance of CodeType.`);

      t = () => {
        testHumanName.setUseEnumType(new EnumCodeType(UNSUPPORTED_ENUM_CODE, nameUseEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown NameUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testHumanName = new HumanName();
      testHumanName.setUse(VALID_USE_USUAL);
      testHumanName.setText(VALID_STRING);
      testHumanName.setFamily(VALID_FAMILY);
      testHumanName.setGiven(VALID_GIVEN_NAMES);
      testHumanName.setPrefix(VALID_PREFIXES);
      testHumanName.setSuffix(VALID_SUFFIXES);
      testHumanName.setPeriod(VALID_PERIOD);

      expect(testHumanName).toBeDefined();
      expect(testHumanName.isEmpty()).toBe(false);

      // inherited properties from Element
      expect(testHumanName.hasId()).toBe(false);
      expect(testHumanName.getId()).toBeUndefined();
      expect(testHumanName.hasExtension()).toBe(false);
      expect(testHumanName.getExtension()).toEqual([] as Extension[]);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(true);
      expect(testHumanName.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_USUAL, nameUseEnum));

      expect(testHumanName.hasUseElement()).toBe(true);
      expect(testHumanName.getUseElement()).toMatchObject(VALID_USE_USUAL_TYPE);
      expect(testHumanName.hasTextElement()).toBe(true);
      expect(testHumanName.getTextElement()).toMatchObject(VALID_STRING_TYPE);
      expect(testHumanName.hasFamilyElement()).toBe(true);
      expect(testHumanName.getFamilyElement()).toMatchObject(VALID_FAMILY_TYPE);
      expect(testHumanName.hasGivenElement()).toBe(true);
      expect(testHumanName.getGivenElement()).toEqual([VALID_FIRST_NAME_TYPE, VALID_MIDDLE_NAME_TYPE]);
      expect(testHumanName.hasPrefixElement()).toBe(true);
      expect(testHumanName.getPrefixElement()).toEqual([VALID_PREFIX_TYPE]);
      expect(testHumanName.hasSuffixElement()).toBe(true);
      expect(testHumanName.getSuffixElement()).toEqual([VALID_SUFFIX_TYPE]);
      expect(testHumanName.hasPeriod()).toBe(true);
      expect(testHumanName.getPeriod()).toEqual(VALID_PERIOD);

      expect(testHumanName.hasUse()).toBe(true);
      expect(testHumanName.getUse()).toStrictEqual(VALID_USE_USUAL);
      expect(testHumanName.hasText()).toBe(true);
      expect(testHumanName.getText()).toStrictEqual(VALID_STRING);
      expect(testHumanName.hasFamily()).toBe(true);
      expect(testHumanName.getFamily()).toStrictEqual(VALID_FAMILY);
      expect(testHumanName.hasGiven()).toBe(true);
      expect(testHumanName.getGiven()).toEqual(VALID_GIVEN_NAMES);
      expect(testHumanName.hasPrefix()).toBe(true);
      expect(testHumanName.getPrefix()).toEqual(VALID_PREFIXES);
      expect(testHumanName.hasSuffix()).toBe(true);
      expect(testHumanName.getSuffix()).toEqual(VALID_SUFFIXES);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testHumanName = new HumanName();
      testHumanName.setUse(VALID_USE_USUAL);
      testHumanName.setText(VALID_STRING);
      testHumanName.setFamily(VALID_FAMILY);
      testHumanName.setGiven(VALID_GIVEN_NAMES);
      testHumanName.setPrefix(VALID_PREFIXES);
      testHumanName.setSuffix(VALID_SUFFIXES);
      testHumanName.setPeriod(VALID_PERIOD);

      expect(testHumanName).toBeDefined();
      expect(testHumanName.isEmpty()).toBe(false);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(true);
      expect(testHumanName.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_USUAL, nameUseEnum));

      expect(testHumanName.hasUseElement()).toBe(true);
      expect(testHumanName.getUseElement()).toMatchObject(VALID_USE_USUAL_TYPE);
      expect(testHumanName.hasTextElement()).toBe(true);
      expect(testHumanName.getTextElement()).toMatchObject(VALID_STRING_TYPE);
      expect(testHumanName.hasFamilyElement()).toBe(true);
      expect(testHumanName.getFamilyElement()).toMatchObject(VALID_FAMILY_TYPE);
      expect(testHumanName.hasGivenElement()).toBe(true);
      expect(testHumanName.getGivenElement()).toEqual([VALID_FIRST_NAME_TYPE, VALID_MIDDLE_NAME_TYPE]);
      expect(testHumanName.hasPrefixElement()).toBe(true);
      expect(testHumanName.getPrefixElement()).toEqual([VALID_PREFIX_TYPE]);
      expect(testHumanName.hasSuffixElement()).toBe(true);
      expect(testHumanName.getSuffixElement()).toEqual([VALID_SUFFIX_TYPE]);
      expect(testHumanName.hasPeriod()).toBe(true);
      expect(testHumanName.getPeriod()).toEqual(VALID_PERIOD);

      expect(testHumanName.hasUse()).toBe(true);
      expect(testHumanName.getUse()).toStrictEqual(VALID_USE_USUAL);
      expect(testHumanName.hasText()).toBe(true);
      expect(testHumanName.getText()).toStrictEqual(VALID_STRING);
      expect(testHumanName.hasFamily()).toBe(true);
      expect(testHumanName.getFamily()).toStrictEqual(VALID_FAMILY);
      expect(testHumanName.hasGiven()).toBe(true);
      expect(testHumanName.getGiven()).toEqual(VALID_GIVEN_NAMES);
      expect(testHumanName.hasPrefix()).toBe(true);
      expect(testHumanName.getPrefix()).toEqual(VALID_PREFIXES);
      expect(testHumanName.hasSuffix()).toBe(true);
      expect(testHumanName.getSuffix()).toEqual(VALID_SUFFIXES);

      // Reset

      testHumanName.setUse(VALID_USE_OFFICIAL);
      testHumanName.setText(VALID_STRING_2);
      testHumanName.setFamily(VALID_FAMILY_2);
      testHumanName.setGiven(VALID_GIVEN_NAMES_2);
      testHumanName.setPrefix(VALID_PREFIXES_2);
      testHumanName.setSuffix(VALID_SUFFIXES_2);
      testHumanName.setPeriod(VALID_PERIOD_2);

      expect(testHumanName).toBeDefined();
      expect(testHumanName.isEmpty()).toBe(false);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(true);
      expect(testHumanName.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_OFFICIAL, nameUseEnum));

      expect(testHumanName.hasUseElement()).toBe(true);
      expect(testHumanName.getUseElement()).toMatchObject(VALID_USE_OFFICIAL_TYPE);
      expect(testHumanName.hasTextElement()).toBe(true);
      expect(testHumanName.getTextElement()).toMatchObject(VALID_STRING_TYPE_2);
      expect(testHumanName.hasFamilyElement()).toBe(true);
      expect(testHumanName.getFamilyElement()).toMatchObject(VALID_FAMILY_TYPE_2);
      expect(testHumanName.hasGivenElement()).toBe(true);
      expect(testHumanName.getGivenElement()).toEqual([VALID_FIRST_NAME_TYPE_2, VALID_MIDDLE_NAME_TYPE_2]);
      expect(testHumanName.hasPrefixElement()).toBe(true);
      expect(testHumanName.getPrefixElement()).toEqual([VALID_PREFIX_TYPE_2]);
      expect(testHumanName.hasSuffixElement()).toBe(true);
      expect(testHumanName.getSuffixElement()).toEqual([VALID_SUFFIX_TYPE_2]);
      expect(testHumanName.hasPeriod()).toBe(true);
      expect(testHumanName.getPeriod()).toEqual(VALID_PERIOD_2);

      expect(testHumanName.hasUse()).toBe(true);
      expect(testHumanName.getUse()).toStrictEqual(VALID_USE_OFFICIAL);
      expect(testHumanName.hasText()).toBe(true);
      expect(testHumanName.getText()).toStrictEqual(VALID_STRING_2);
      expect(testHumanName.hasFamily()).toBe(true);
      expect(testHumanName.getFamily()).toStrictEqual(VALID_FAMILY_2);
      expect(testHumanName.hasGiven()).toBe(true);
      expect(testHumanName.getGiven()).toEqual(VALID_GIVEN_NAMES_2);
      expect(testHumanName.hasPrefix()).toBe(true);
      expect(testHumanName.getPrefix()).toEqual(VALID_PREFIXES_2);
      expect(testHumanName.hasSuffix()).toBe(true);
      expect(testHumanName.getSuffix()).toEqual(VALID_SUFFIXES_2);

      // Reset as empty

      testHumanName.setUse(UNDEFINED_VALUE);
      testHumanName.setText(UNDEFINED_VALUE);
      testHumanName.setFamily(UNDEFINED_VALUE);
      testHumanName.setGiven(UNDEFINED_VALUE);
      testHumanName.setPrefix(UNDEFINED_VALUE);
      testHumanName.setSuffix(UNDEFINED_VALUE);
      testHumanName.setPeriod(UNDEFINED_VALUE);

      expect(testHumanName).toBeDefined();
      expect(testHumanName.isEmpty()).toBe(true);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(false);
      expect(testHumanName.getUseEnumType()).toBeUndefined();

      expect(testHumanName.hasUseElement()).toBe(false);
      expect(testHumanName.getUseElement()).toBeUndefined();
      expect(testHumanName.hasTextElement()).toBe(false);
      expect(testHumanName.getTextElement()).toEqual(new StringType());
      expect(testHumanName.hasFamilyElement()).toBe(false);
      expect(testHumanName.getFamilyElement()).toEqual(new StringType());
      expect(testHumanName.hasGivenElement()).toBe(false);
      expect(testHumanName.getGivenElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasPrefixElement()).toBe(false);
      expect(testHumanName.getPrefixElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasSuffixElement()).toBe(false);
      expect(testHumanName.getSuffixElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasPeriod()).toBe(false);
      expect(testHumanName.getPeriod()).toEqual(new Period());

      expect(testHumanName.hasUse()).toBe(false);
      expect(testHumanName.getUse()).toBeUndefined();
      expect(testHumanName.hasText()).toBe(false);
      expect(testHumanName.getText()).toBeUndefined();
      expect(testHumanName.hasFamily()).toBe(false);
      expect(testHumanName.getFamily()).toBeUndefined();
      expect(testHumanName.hasGiven()).toBe(false);
      expect(testHumanName.getGiven()).toEqual([] as fhirString[]);
      expect(testHumanName.hasPrefix()).toBe(false);
      expect(testHumanName.getPrefix()).toEqual([] as fhirString[]);
      expect(testHumanName.hasSuffix()).toBe(false);
      expect(testHumanName.getSuffix()).toEqual([] as fhirString[]);
    });

    it('should be properly reset by adding data elements to primitive lists', () => {
      const testHumanName = new HumanName();
      expect(testHumanName).toBeDefined();
      expect(testHumanName.isEmpty()).toBe(true);

      testHumanName.addGiven(VALID_FIRST_NAME);
      testHumanName.addGiven(VALID_MIDDLE_NAME);
      testHumanName.addGiven(UNDEFINED_VALUE);
      expect(testHumanName.hasGiven()).toBe(true);
      expect(testHumanName.getGiven()).toHaveLength(2);
      expect(testHumanName.getGiven()).toEqual(VALID_GIVEN_NAMES);
      expect(testHumanName.hasGivenElement()).toBe(true);
      expect(testHumanName.getGivenElement()).toHaveLength(2);
      expect(testHumanName.getGivenElement()).toEqual(VALID_GIVEN_NAME_TYPES);

      testHumanName.addPrefix(VALID_PREFIX);
      testHumanName.addPrefix(VALID_PREFIX_2);
      testHumanName.addPrefix(UNDEFINED_VALUE);
      expect(testHumanName.hasPrefix()).toBe(true);
      expect(testHumanName.getPrefix()).toHaveLength(2);
      expect(testHumanName.getPrefix()).toEqual([VALID_PREFIX, VALID_PREFIX_2]);
      expect(testHumanName.hasPrefixElement()).toBe(true);
      expect(testHumanName.getPrefixElement()).toHaveLength(2);
      expect(testHumanName.getPrefixElement()).toEqual([VALID_PREFIX_TYPE, VALID_PREFIX_TYPE_2]);

      testHumanName.addSuffix(VALID_SUFFIX);
      testHumanName.addSuffix(VALID_SUFFIX_2);
      testHumanName.addSuffix(UNDEFINED_VALUE);
      expect(testHumanName.hasSuffix()).toBe(true);
      expect(testHumanName.getSuffix()).toHaveLength(2);
      expect(testHumanName.getSuffix()).toEqual([VALID_SUFFIX, VALID_SUFFIX_2]);
      expect(testHumanName.hasSuffixElement()).toBe(true);
      expect(testHumanName.getSuffixElement()).toHaveLength(2);
      expect(testHumanName.getSuffixElement()).toEqual([VALID_SUFFIX_TYPE, VALID_SUFFIX_TYPE_2]);
    });

    it('should throw errors for invalid primitive values', () => {
      const testHumanName = new HumanName();

      let t = () => {
        testHumanName.setText(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid HumanName.text ()`);

      t = () => {
        testHumanName.setFamily(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid HumanName.family ()`);

      t = () => {
        testHumanName.setGiven([INVALID_STRING]);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid HumanName.given array item ()`);

      t = () => {
        testHumanName.addGiven(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid HumanName.given array item ()`);

      t = () => {
        testHumanName.setPrefix([INVALID_STRING]);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid HumanName.prefix array item ()`);

      t = () => {
        testHumanName.addPrefix(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid HumanName.prefix array item ()`);

      t = () => {
        testHumanName.setSuffix([INVALID_STRING]);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid HumanName.suffix array item ()`);

      t = () => {
        testHumanName.addSuffix(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid HumanName.suffix array item ()`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with DataType values', () => {
      const testHumanName = new HumanName();
      testHumanName.setUseElement(VALID_USE_USUAL_TYPE);
      testHumanName.setTextElement(VALID_STRING_TYPE);
      testHumanName.setFamilyElement(VALID_FAMILY_TYPE);
      testHumanName.setGivenElement(VALID_GIVEN_NAME_TYPES);
      testHumanName.setPrefixElement(VALID_PREFIX_TYPES);
      testHumanName.setSuffixElement(VALID_SUFFIX_TYPES);
      testHumanName.setPeriod(VALID_PERIOD);

      expect(testHumanName).toBeDefined();
      expect(testHumanName.isEmpty()).toBe(false);

      // inherited properties from Element
      expect(testHumanName.hasId()).toBe(false);
      expect(testHumanName.getId()).toBeUndefined();
      expect(testHumanName.hasExtension()).toBe(false);
      expect(testHumanName.getExtension()).toEqual([] as Extension[]);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(true);
      expect(testHumanName.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_USUAL, nameUseEnum));

      expect(testHumanName.hasUseElement()).toBe(true);
      expect(testHumanName.getUseElement()).toMatchObject(VALID_USE_USUAL_TYPE);
      expect(testHumanName.hasTextElement()).toBe(true);
      expect(testHumanName.getTextElement()).toMatchObject(VALID_STRING_TYPE);
      expect(testHumanName.hasFamilyElement()).toBe(true);
      expect(testHumanName.getFamilyElement()).toMatchObject(VALID_FAMILY_TYPE);
      expect(testHumanName.hasGivenElement()).toBe(true);
      expect(testHumanName.getGivenElement()).toEqual([VALID_FIRST_NAME_TYPE, VALID_MIDDLE_NAME_TYPE]);
      expect(testHumanName.hasPrefixElement()).toBe(true);
      expect(testHumanName.getPrefixElement()).toEqual([VALID_PREFIX_TYPE]);
      expect(testHumanName.hasSuffixElement()).toBe(true);
      expect(testHumanName.getSuffixElement()).toEqual([VALID_SUFFIX_TYPE]);
      expect(testHumanName.hasPeriod()).toBe(true);
      expect(testHumanName.getPeriod()).toEqual(VALID_PERIOD);

      expect(testHumanName.hasUse()).toBe(true);
      expect(testHumanName.getUse()).toStrictEqual(VALID_USE_USUAL);
      expect(testHumanName.hasText()).toBe(true);
      expect(testHumanName.getText()).toStrictEqual(VALID_STRING);
      expect(testHumanName.hasFamily()).toBe(true);
      expect(testHumanName.getFamily()).toStrictEqual(VALID_FAMILY);
      expect(testHumanName.hasGiven()).toBe(true);
      expect(testHumanName.getGiven()).toEqual(VALID_GIVEN_NAMES);
      expect(testHumanName.hasPrefix()).toBe(true);
      expect(testHumanName.getPrefix()).toEqual(VALID_PREFIXES);
      expect(testHumanName.hasSuffix()).toBe(true);
      expect(testHumanName.getSuffix()).toEqual(VALID_SUFFIXES);
    });

    it('should be properly reset by modifying all properties with DataType values', () => {
      const testHumanName = new HumanName();
      testHumanName.setUseElement(VALID_USE_USUAL_TYPE);
      testHumanName.setTextElement(VALID_STRING_TYPE);
      testHumanName.setFamilyElement(VALID_FAMILY_TYPE);
      testHumanName.setGivenElement(VALID_GIVEN_NAME_TYPES);
      testHumanName.setPrefixElement(VALID_PREFIX_TYPES);
      testHumanName.setSuffixElement(VALID_SUFFIX_TYPES);
      testHumanName.setPeriod(VALID_PERIOD);

      expect(testHumanName).toBeDefined();
      expect(testHumanName.isEmpty()).toBe(false);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(true);
      expect(testHumanName.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_USUAL, nameUseEnum));

      expect(testHumanName.hasUseElement()).toBe(true);
      expect(testHumanName.getUseElement()).toMatchObject(VALID_USE_USUAL_TYPE);
      expect(testHumanName.hasTextElement()).toBe(true);
      expect(testHumanName.getTextElement()).toMatchObject(VALID_STRING_TYPE);
      expect(testHumanName.hasFamilyElement()).toBe(true);
      expect(testHumanName.getFamilyElement()).toMatchObject(VALID_FAMILY_TYPE);
      expect(testHumanName.hasGivenElement()).toBe(true);
      expect(testHumanName.getGivenElement()).toEqual([VALID_FIRST_NAME_TYPE, VALID_MIDDLE_NAME_TYPE]);
      expect(testHumanName.hasPrefixElement()).toBe(true);
      expect(testHumanName.getPrefixElement()).toEqual([VALID_PREFIX_TYPE]);
      expect(testHumanName.hasSuffixElement()).toBe(true);
      expect(testHumanName.getSuffixElement()).toEqual([VALID_SUFFIX_TYPE]);
      expect(testHumanName.hasPeriod()).toBe(true);
      expect(testHumanName.getPeriod()).toEqual(VALID_PERIOD);

      expect(testHumanName.hasUse()).toBe(true);
      expect(testHumanName.getUse()).toStrictEqual(VALID_USE_USUAL);
      expect(testHumanName.hasText()).toBe(true);
      expect(testHumanName.getText()).toStrictEqual(VALID_STRING);
      expect(testHumanName.hasFamily()).toBe(true);
      expect(testHumanName.getFamily()).toStrictEqual(VALID_FAMILY);
      expect(testHumanName.hasGiven()).toBe(true);
      expect(testHumanName.getGiven()).toEqual(VALID_GIVEN_NAMES);
      expect(testHumanName.hasPrefix()).toBe(true);
      expect(testHumanName.getPrefix()).toEqual(VALID_PREFIXES);
      expect(testHumanName.hasSuffix()).toBe(true);
      expect(testHumanName.getSuffix()).toEqual(VALID_SUFFIXES);

      // Reset

      testHumanName.setUseElement(VALID_USE_OFFICIAL_TYPE);
      testHumanName.setTextElement(VALID_STRING_TYPE_2);
      testHumanName.setFamilyElement(VALID_FAMILY_TYPE_2);
      testHumanName.setGivenElement(VALID_GIVEN_NAME_TYPES_2);
      testHumanName.setPrefixElement(VALID_PREFIX_TYPES_2);
      testHumanName.setSuffixElement(VALID_SUFFIX_TYPES_2);
      testHumanName.setPeriod(VALID_PERIOD_2);

      expect(testHumanName).toBeDefined();
      expect(testHumanName.isEmpty()).toBe(false);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(true);
      expect(testHumanName.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_OFFICIAL, nameUseEnum));

      expect(testHumanName.hasUseElement()).toBe(true);
      expect(testHumanName.getUseElement()).toMatchObject(VALID_USE_OFFICIAL_TYPE);
      expect(testHumanName.hasTextElement()).toBe(true);
      expect(testHumanName.getTextElement()).toMatchObject(VALID_STRING_TYPE_2);
      expect(testHumanName.hasFamilyElement()).toBe(true);
      expect(testHumanName.getFamilyElement()).toMatchObject(VALID_FAMILY_TYPE_2);
      expect(testHumanName.hasGivenElement()).toBe(true);
      expect(testHumanName.getGivenElement()).toEqual([VALID_FIRST_NAME_TYPE_2, VALID_MIDDLE_NAME_TYPE_2]);
      expect(testHumanName.hasPrefixElement()).toBe(true);
      expect(testHumanName.getPrefixElement()).toEqual([VALID_PREFIX_TYPE_2]);
      expect(testHumanName.hasSuffixElement()).toBe(true);
      expect(testHumanName.getSuffixElement()).toEqual([VALID_SUFFIX_TYPE_2]);
      expect(testHumanName.hasPeriod()).toBe(true);
      expect(testHumanName.getPeriod()).toEqual(VALID_PERIOD_2);

      expect(testHumanName.hasUse()).toBe(true);
      expect(testHumanName.getUse()).toStrictEqual(VALID_USE_OFFICIAL);
      expect(testHumanName.hasText()).toBe(true);
      expect(testHumanName.getText()).toStrictEqual(VALID_STRING_2);
      expect(testHumanName.hasFamily()).toBe(true);
      expect(testHumanName.getFamily()).toStrictEqual(VALID_FAMILY_2);
      expect(testHumanName.hasGiven()).toBe(true);
      expect(testHumanName.getGiven()).toEqual(VALID_GIVEN_NAMES_2);
      expect(testHumanName.hasPrefix()).toBe(true);
      expect(testHumanName.getPrefix()).toEqual(VALID_PREFIXES_2);
      expect(testHumanName.hasSuffix()).toBe(true);
      expect(testHumanName.getSuffix()).toEqual(VALID_SUFFIXES_2);

      // Reset as empty

      testHumanName.setUseElement(UNDEFINED_VALUE);
      testHumanName.setTextElement(UNDEFINED_VALUE);
      testHumanName.setFamilyElement(UNDEFINED_VALUE);
      testHumanName.setGivenElement(UNDEFINED_VALUE);
      testHumanName.setPrefixElement(UNDEFINED_VALUE);
      testHumanName.setSuffixElement(UNDEFINED_VALUE);
      testHumanName.setPeriod(UNDEFINED_VALUE);

      expect(testHumanName).toBeDefined();
      expect(testHumanName.isEmpty()).toBe(true);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(false);
      expect(testHumanName.getUseEnumType()).toBeUndefined();

      expect(testHumanName.hasUseElement()).toBe(false);
      expect(testHumanName.getUseElement()).toBeUndefined();
      expect(testHumanName.hasTextElement()).toBe(false);
      expect(testHumanName.getTextElement()).toEqual(new StringType());
      expect(testHumanName.hasFamilyElement()).toBe(false);
      expect(testHumanName.getFamilyElement()).toEqual(new StringType());
      expect(testHumanName.hasGivenElement()).toBe(false);
      expect(testHumanName.getGivenElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasPrefixElement()).toBe(false);
      expect(testHumanName.getPrefixElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasSuffixElement()).toBe(false);
      expect(testHumanName.getSuffixElement()).toEqual([] as StringType[]);
      expect(testHumanName.hasPeriod()).toBe(false);
      expect(testHumanName.getPeriod()).toEqual(new Period());

      expect(testHumanName.hasUse()).toBe(false);
      expect(testHumanName.getUse()).toBeUndefined();
      expect(testHumanName.hasText()).toBe(false);
      expect(testHumanName.getText()).toBeUndefined();
      expect(testHumanName.hasFamily()).toBe(false);
      expect(testHumanName.getFamily()).toBeUndefined();
      expect(testHumanName.hasGiven()).toBe(false);
      expect(testHumanName.getGiven()).toEqual([] as fhirString[]);
      expect(testHumanName.hasPrefix()).toBe(false);
      expect(testHumanName.getPrefix()).toEqual([] as fhirString[]);
      expect(testHumanName.hasSuffix()).toBe(false);
      expect(testHumanName.getSuffix()).toEqual([] as fhirString[]);
    });

    it('should be properly reset by adding data elements to DataType lists', () => {
      const testHumanName = new HumanName();
      expect(testHumanName).toBeDefined();
      expect(testHumanName.isEmpty()).toBe(true);

      testHumanName.addGivenElement(VALID_FIRST_NAME_TYPE);
      testHumanName.addGivenElement(VALID_MIDDLE_NAME_TYPE);
      testHumanName.addGivenElement(UNDEFINED_VALUE);
      expect(testHumanName.hasGiven()).toBe(true);
      expect(testHumanName.getGiven()).toHaveLength(2);
      expect(testHumanName.getGiven()).toEqual(VALID_GIVEN_NAMES);
      expect(testHumanName.hasGivenElement()).toBe(true);
      expect(testHumanName.getGivenElement()).toHaveLength(2);
      expect(testHumanName.getGivenElement()).toEqual(VALID_GIVEN_NAME_TYPES);

      testHumanName.addPrefixElement(VALID_PREFIX_TYPE);
      testHumanName.addPrefixElement(VALID_PREFIX_TYPE_2);
      testHumanName.addPrefixElement(UNDEFINED_VALUE);
      expect(testHumanName.hasPrefix()).toBe(true);
      expect(testHumanName.getPrefix()).toHaveLength(2);
      expect(testHumanName.getPrefix()).toEqual([VALID_PREFIX, VALID_PREFIX_2]);
      expect(testHumanName.hasPrefixElement()).toBe(true);
      expect(testHumanName.getPrefixElement()).toHaveLength(2);
      expect(testHumanName.getPrefixElement()).toEqual([VALID_PREFIX_TYPE, VALID_PREFIX_TYPE_2]);

      testHumanName.addSuffixElement(VALID_SUFFIX_TYPE);
      testHumanName.addSuffixElement(VALID_SUFFIX_TYPE_2);
      testHumanName.addSuffixElement(UNDEFINED_VALUE);
      expect(testHumanName.hasSuffix()).toBe(true);
      expect(testHumanName.getSuffix()).toHaveLength(2);
      expect(testHumanName.getSuffix()).toEqual([VALID_SUFFIX, VALID_SUFFIX_2]);
      expect(testHumanName.hasSuffixElement()).toBe(true);
      expect(testHumanName.getSuffixElement()).toHaveLength(2);
      expect(testHumanName.getSuffixElement()).toEqual([VALID_SUFFIX_TYPE, VALID_SUFFIX_TYPE_2]);
    });

    it('should throw errors for invalid DataType values', () => {
      const testHumanName = new HumanName();

      let t = () => {
        // @ts-expect-error: allow for testing
        testHumanName.setTextElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid HumanName.text; Provided value is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testHumanName.setFamilyElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid HumanName.family; Provided value is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testHumanName.setGivenElement([INVALID_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid HumanName.given; Provided value array has an element that is not an instance of StringType.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testHumanName.addGivenElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid HumanName.given; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testHumanName.setPrefixElement([INVALID_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid HumanName.prefix; Provided value array has an element that is not an instance of StringType.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testHumanName.addPrefixElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid HumanName.prefix; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testHumanName.setSuffixElement([INVALID_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid HumanName.suffix; Provided value array has an element that is not an instance of StringType.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testHumanName.addSuffixElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid HumanName.suffix; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testHumanName.setPeriod(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid HumanName.period; Provided element is not an instance of Period.`);
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
      use: 'usual',
      text: 'This is a valid string.',
      _text: {
        id: 'T1357',
        extension: [
          {
            url: 'textUrl',
            valueString: 'text extension string value',
          },
        ],
      },
      family: 'Surname',
      given: ['First', 'Middle'],
      prefix: ['Mr.'],
      suffix: ['Sr.'],
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };

    it('should return undefined for empty json', () => {
      let testType = HumanName.parse({});
      expect(testType).toBeUndefined();

      // @ts-expect-error: allow for testing
      testType = HumanName.parse(undefined);
      expect(testType).toBeUndefined();

      testType = HumanName.parse(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        HumanName.parse('NOT AN OBJECT');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`HumanName JSON is not a JSON object.`);
    });

    it('should properly create serialized content', () => {
      const textType = new StringType(VALID_STRING);
      const textId = 'T1357';
      const textExtension = new Extension('textUrl', new StringType('text extension string value'));
      textType.setId(textId);
      textType.addExtension(textExtension);

      const testHumanName = new HumanName();
      const testId = 'id1234';
      testHumanName.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testHumanName.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testHumanName.addExtension(testExtension2);

      testHumanName.setUseElement(VALID_USE_USUAL_TYPE);
      testHumanName.setTextElement(textType);
      testHumanName.setFamilyElement(VALID_FAMILY_TYPE);
      testHumanName.setGiven(VALID_GIVEN_NAMES);
      testHumanName.setPrefix(VALID_PREFIXES);
      testHumanName.setSuffix(VALID_SUFFIXES);
      testHumanName.setPeriod(VALID_PERIOD);

      expect(testHumanName).toBeDefined();
      expect(testHumanName).toBeInstanceOf(DataType);
      expect(testHumanName).toBeInstanceOf(HumanName);
      expect(testHumanName.constructor.name).toStrictEqual('HumanName');
      expect(testHumanName.fhirType()).toStrictEqual('HumanName');
      expect(testHumanName.isEmpty()).toBe(false);
      expect(testHumanName.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testHumanName.hasId()).toBe(true);
      expect(testHumanName.getId()).toStrictEqual(testId);
      expect(testHumanName.hasExtension()).toBe(true);
      expect(testHumanName.getExtension()).toEqual([testExtension1, testExtension2]);

      // HumanName properties
      expect(testHumanName.hasUseEnumType()).toBe(true);
      expect(testHumanName.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_USUAL_TYPE, nameUseEnum));

      expect(testHumanName.hasUseElement()).toBe(true);
      expect(testHumanName.getUseElement()).toMatchObject(VALID_USE_USUAL_TYPE);
      expect(testHumanName.hasTextElement()).toBe(true);
      expect(testHumanName.getTextElement()).toMatchObject(textType);
      expect(testHumanName.hasFamilyElement()).toBe(true);
      expect(testHumanName.getFamilyElement()).toMatchObject(VALID_FAMILY_TYPE);
      expect(testHumanName.hasGivenElement()).toBe(true);
      expect(testHumanName.getGivenElement()).toMatchObject([VALID_FIRST_NAME_TYPE, VALID_MIDDLE_NAME_TYPE]);
      expect(testHumanName.hasPrefixElement()).toBe(true);
      expect(testHumanName.getPrefixElement()).toMatchObject([VALID_PREFIX_TYPE]);
      expect(testHumanName.hasSuffixElement()).toBe(true);
      expect(testHumanName.getSuffixElement()).toMatchObject([VALID_SUFFIX_TYPE]);
      expect(testHumanName.hasPeriod()).toBe(true);
      expect(testHumanName.getPeriod()).toEqual(VALID_PERIOD);

      expect(testHumanName.hasUse()).toBe(true);
      expect(testHumanName.getUse()).toStrictEqual(VALID_USE_USUAL);
      expect(testHumanName.hasText()).toBe(true);
      expect(testHumanName.getText()).toStrictEqual(VALID_STRING);
      expect(testHumanName.hasFamily()).toBe(true);
      expect(testHumanName.getFamily()).toStrictEqual(VALID_FAMILY);
      expect(testHumanName.hasGiven()).toBe(true);
      expect(testHumanName.getGiven()).toStrictEqual([VALID_FIRST_NAME, VALID_MIDDLE_NAME]);
      expect(testHumanName.hasPrefix()).toBe(true);
      expect(testHumanName.getPrefix()).toStrictEqual([VALID_PREFIX]);
      expect(testHumanName.hasSuffix()).toBe(true);
      expect(testHumanName.getSuffix()).toStrictEqual([VALID_SUFFIX]);

      expect(testHumanName.toJSON()).toEqual(VALID_JSON);
    });

    it('should return HumanName for valid json', () => {
      const testType: HumanName | undefined = HumanName.parse(VALID_JSON);

      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(HumanName);
      expect(testType?.constructor.name).toStrictEqual('HumanName');
      expect(testType?.fhirType()).toStrictEqual('HumanName');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });
});
