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
import { Address } from '@src/fhir-core/data-types/complex/Address';
import { AddressUseEnum } from '@src/fhir-core/data-types/code-systems/AddressUseEnum';
import { AddressTypeEnum } from '@src/fhir-core/data-types/code-systems/AddressTypeEnum';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { fhirString } from '@src/fhir-core/data-types/primitive/primitive-types';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { INVALID_NON_STRING_TYPE, INVALID_STRING, INVALID_STRING_TYPE, UNDEFINED_VALUE } from '../../../test-utils';

describe('Address', () => {
  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);

  const VALID_USE_HOME = `home`;
  const VALID_USE_HOME_TYPE = new CodeType(VALID_USE_HOME);
  const VALID_USE_WORK = `work`;
  const VALID_USE_WORK_TYPE = new CodeType(VALID_USE_WORK);
  const VALID_USE_TEMP = `temp`;
  const VALID_USE_TEMP_TYPE = new CodeType(VALID_USE_TEMP);

  const VALID_TYPE_POSTAL = `postal`;
  const VALID_TYPE_POSTAL_TYPE = new CodeType(VALID_TYPE_POSTAL);
  const VALID_TYPE_PHYSICAL = `physical`;
  const VALID_TYPE_PHYSICAL_TYPE = new CodeType(VALID_TYPE_PHYSICAL);
  const VALID_USE_BOTH = `both`;
  const VALID_USE_BOTH_TYPE = new CodeType(VALID_USE_BOTH);

  const UNSUPPORTED_ENUM_CODE = 'unsupportedEnumCode';
  const INVALID_CODE_TYPE = new CodeType(UNSUPPORTED_ENUM_CODE);

  const VALID_LINE_A = '1234 Main ST';
  const VALID_LINE_TYPE_A = new StringType(VALID_LINE_A);
  const VALID_LINE_B = 'APT 15A';
  const VALID_LINE_TYPE_B = new StringType(VALID_LINE_B);
  const VALID_LINE_A_2 = '4321 Mystreet ST';
  const VALID_LINE_TYPE_A_2 = new StringType(VALID_LINE_A_2);
  const VALID_LINE_B_2 = 'STE 76';
  const VALID_LINE_TYPE_B_2 = new StringType(VALID_LINE_B_2);

  const VALID_CITY = 'Nashua';
  const VALID_CITY_TYPE = new StringType(VALID_CITY);
  const VALID_CITY_2 = 'Renton';
  const VALID_CITY_TYPE_2 = new StringType(VALID_CITY_2);

  const VALID_DISTRICT = 'Hillsborough';
  const VALID_DISTRICT_TYPE = new StringType(VALID_DISTRICT);
  const VALID_DISTRICT_2 = 'King';
  const VALID_DISTRICT_TYPE_2 = new StringType(VALID_DISTRICT_2);

  const VALID_STATE = 'NH';
  const VALID_STATE_TYPE = new StringType(VALID_STATE);
  const VALID_STATE_2 = 'WA';
  const VALID_STATE_TYPE_2 = new StringType(VALID_STATE_2);

  const VALID_POSTAL = '03064';
  const VALID_POSTAL_TYPE = new StringType(VALID_POSTAL);
  const VALID_POSTAL_2 = '98058';
  const VALID_POSTAL_TYPE_2 = new StringType(VALID_POSTAL_2);

  const VALID_COUNTRY = 'US';
  const VALID_COUNTRY_TYPE = new StringType(VALID_COUNTRY);
  const VALID_COUNTRY_2 = 'USA';
  const VALID_COUNTRY_TYPE_2 = new StringType(VALID_COUNTRY_2);

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

  let addressUseEnum: AddressUseEnum;
  let addressTypeEnum: AddressTypeEnum;
  beforeAll(() => {
    addressUseEnum = new AddressUseEnum();
    addressTypeEnum = new AddressTypeEnum();
  });

  describe('Core', () => {
    it('should be properly instantiated as empty', () => {
      const testAddress = new Address();

      expect(testAddress).toBeDefined();
      expect(testAddress).toBeInstanceOf(DataType);
      expect(testAddress).toBeInstanceOf(Address);
      expect(testAddress.constructor.name).toStrictEqual('Address');
      expect(testAddress.fhirType()).toStrictEqual('Address');
      expect(testAddress.isEmpty()).toBe(true);
      expect(testAddress.isComplexDataType()).toBe(true);
      expect(testAddress.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testAddress.hasId()).toBe(false);
      expect(testAddress.getId()).toBeUndefined();
      expect(testAddress.hasExtension()).toBe(false);
      expect(testAddress.getExtension()).toEqual([] as Extension[]);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(false);
      expect(testAddress.getUseEnumType()).toBeUndefined();
      expect(testAddress.hasTypeEnumType()).toBe(false);
      expect(testAddress.getTypeEnumType()).toBeUndefined();

      expect(testAddress.hasUseElement()).toBe(false);
      expect(testAddress.getUseElement()).toBeUndefined();
      expect(testAddress.hasTypeElement()).toBe(false);
      expect(testAddress.getTypeElement()).toBeUndefined();
      expect(testAddress.hasTextElement()).toBe(false);
      expect(testAddress.getTextElement()).toEqual(new StringType());
      expect(testAddress.hasLineElement()).toBe(false);
      expect(testAddress.getLineElement()).toEqual([] as StringType[]);
      expect(testAddress.hasCityElement()).toBe(false);
      expect(testAddress.getCityElement()).toEqual(new StringType());
      expect(testAddress.hasDistrictElement()).toBe(false);
      expect(testAddress.getDistrictElement()).toEqual(new StringType());
      expect(testAddress.hasStateElement()).toBe(false);
      expect(testAddress.getStateElement()).toEqual(new StringType());
      expect(testAddress.hasPostalCodeElement()).toBe(false);
      expect(testAddress.getPostalCodeElement()).toEqual(new StringType());
      expect(testAddress.hasCountryElement()).toBe(false);
      expect(testAddress.getCountryElement()).toEqual(new StringType());
      expect(testAddress.hasPeriod()).toBe(false);
      expect(testAddress.getPeriod()).toEqual(new Period());

      expect(testAddress.hasUse()).toBe(false);
      expect(testAddress.getUse()).toBeUndefined();
      expect(testAddress.hasType()).toBe(false);
      expect(testAddress.getType()).toBeUndefined();
      expect(testAddress.hasText()).toBe(false);
      expect(testAddress.getText()).toBeUndefined();
      expect(testAddress.hasLine()).toBe(false);
      expect(testAddress.getLine()).toEqual([] as fhirString[]);
      expect(testAddress.hasCity()).toBe(false);
      expect(testAddress.getCity()).toBeUndefined();
      expect(testAddress.hasDistrict()).toBe(false);
      expect(testAddress.getDistrict()).toBeUndefined();
      expect(testAddress.hasState()).toBe(false);
      expect(testAddress.getState()).toBeUndefined();
      expect(testAddress.hasPostalCode()).toBe(false);
      expect(testAddress.getPostalCode()).toBeUndefined();
      expect(testAddress.hasCountry()).toBe(false);
      expect(testAddress.getCountry()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const address = new Address();

      address.setUse(VALID_USE_HOME);
      address.setType(VALID_TYPE_POSTAL);
      address.setText(VALID_STRING);
      address.setLine([VALID_LINE_A, VALID_LINE_B]);
      address.setCity(VALID_CITY);
      address.setDistrict(VALID_DISTRICT);
      address.setState(VALID_STATE);
      address.setPostalCode(VALID_POSTAL);
      address.setCountry(VALID_COUNTRY);
      address.setPeriod(VALID_PERIOD);

      let testAddress = address.copy();
      expect(testAddress).toBeDefined();
      expect(testAddress).toBeInstanceOf(DataType);
      expect(testAddress).toBeInstanceOf(Address);
      expect(testAddress.constructor.name).toStrictEqual('Address');
      expect(testAddress.fhirType()).toStrictEqual('Address');
      expect(testAddress.isEmpty()).toBe(false);
      expect(testAddress.isComplexDataType()).toBe(true);
      expect(testAddress.toJSON()).toBeDefined();

      // inherited properties from Element
      expect(testAddress.hasId()).toBe(false);
      expect(testAddress.getId()).toBeUndefined();
      expect(testAddress.hasExtension()).toBe(false);
      expect(testAddress.getExtension()).toEqual([] as Extension[]);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(true);
      expect(testAddress.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, addressUseEnum));
      expect(testAddress.hasTypeEnumType()).toBe(true);
      expect(testAddress.getTypeEnumType()).toEqual(new EnumCodeType(VALID_TYPE_POSTAL, addressTypeEnum));

      expect(testAddress.hasUseElement()).toBe(true);
      expect(testAddress.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testAddress.hasTypeElement()).toBe(true);
      expect(testAddress.getTypeElement()).toMatchObject(VALID_TYPE_POSTAL_TYPE);
      expect(testAddress.hasTextElement()).toBe(true);
      expect(testAddress.getTextElement()).toMatchObject(VALID_STRING_TYPE);
      expect(testAddress.hasLineElement()).toBe(true);
      expect(testAddress.getLineElement()).toMatchObject([VALID_LINE_TYPE_A, VALID_LINE_TYPE_B]);
      expect(testAddress.hasCityElement()).toBe(true);
      expect(testAddress.getCityElement()).toMatchObject(VALID_CITY_TYPE);
      expect(testAddress.hasDistrictElement()).toBe(true);
      expect(testAddress.getDistrictElement()).toMatchObject(VALID_DISTRICT_TYPE);
      expect(testAddress.hasStateElement()).toBe(true);
      expect(testAddress.getStateElement()).toMatchObject(VALID_STATE_TYPE);
      expect(testAddress.hasPostalCodeElement()).toBe(true);
      expect(testAddress.getPostalCodeElement()).toMatchObject(VALID_POSTAL_TYPE);
      expect(testAddress.hasCountryElement()).toBe(true);
      expect(testAddress.getCountryElement()).toMatchObject(VALID_COUNTRY_TYPE);
      expect(testAddress.hasPeriod()).toBe(true);
      expect(testAddress.getPeriod()).toEqual(VALID_PERIOD);

      expect(testAddress.hasUse()).toBe(true);
      expect(testAddress.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testAddress.hasType()).toBe(true);
      expect(testAddress.getType()).toStrictEqual(VALID_TYPE_POSTAL);
      expect(testAddress.hasText()).toBe(true);
      expect(testAddress.getText()).toStrictEqual(VALID_STRING);
      expect(testAddress.hasLine()).toBe(true);
      expect(testAddress.getLine()).toMatchObject([VALID_LINE_A, VALID_LINE_B]);
      expect(testAddress.hasCity()).toBe(true);
      expect(testAddress.getCity()).toStrictEqual(VALID_CITY);
      expect(testAddress.hasDistrict()).toBe(true);
      expect(testAddress.getDistrict()).toStrictEqual(VALID_DISTRICT);
      expect(testAddress.hasState()).toBe(true);
      expect(testAddress.getState()).toStrictEqual(VALID_STATE);
      expect(testAddress.hasPostalCode()).toBe(true);
      expect(testAddress.getPostalCode()).toStrictEqual(VALID_POSTAL);
      expect(testAddress.hasCountry()).toBe(true);
      expect(testAddress.getCountry()).toStrictEqual(VALID_COUNTRY);

      // Reset as empty

      address.setUse(UNDEFINED_VALUE);
      address.setType(UNDEFINED_VALUE);
      address.setText(UNDEFINED_VALUE);
      address.setLine(UNDEFINED_VALUE);
      address.setCity(UNDEFINED_VALUE);
      address.setDistrict(UNDEFINED_VALUE);
      address.setState(UNDEFINED_VALUE);
      address.setPostalCode(UNDEFINED_VALUE);
      address.setCountry(UNDEFINED_VALUE);
      address.setPeriod(UNDEFINED_VALUE);

      testAddress = address.copy();
      expect(testAddress).toBeDefined();
      expect(testAddress).toBeInstanceOf(DataType);
      expect(testAddress).toBeInstanceOf(Address);
      expect(testAddress.constructor.name).toStrictEqual('Address');
      expect(testAddress.fhirType()).toStrictEqual('Address');
      expect(testAddress.isEmpty()).toBe(true);
      expect(testAddress.isComplexDataType()).toBe(true);
      expect(testAddress.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testAddress.hasId()).toBe(false);
      expect(testAddress.getId()).toBeUndefined();
      expect(testAddress.hasExtension()).toBe(false);
      expect(testAddress.getExtension()).toEqual([] as Extension[]);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(false);
      expect(testAddress.getUseEnumType()).toBeUndefined();
      expect(testAddress.hasTypeEnumType()).toBe(false);
      expect(testAddress.getTypeEnumType()).toBeUndefined();

      expect(testAddress.hasUseElement()).toBe(false);
      expect(testAddress.getUseElement()).toBeUndefined();
      expect(testAddress.hasTypeElement()).toBe(false);
      expect(testAddress.getTypeElement()).toBeUndefined();
      expect(testAddress.hasTextElement()).toBe(false);
      expect(testAddress.getTextElement()).toEqual(new StringType());
      expect(testAddress.hasLineElement()).toBe(false);
      expect(testAddress.getLineElement()).toEqual([] as StringType[]);
      expect(testAddress.hasCityElement()).toBe(false);
      expect(testAddress.getCityElement()).toEqual(new StringType());
      expect(testAddress.hasDistrictElement()).toBe(false);
      expect(testAddress.getDistrictElement()).toEqual(new StringType());
      expect(testAddress.hasStateElement()).toBe(false);
      expect(testAddress.getStateElement()).toEqual(new StringType());
      expect(testAddress.hasPostalCodeElement()).toBe(false);
      expect(testAddress.getPostalCodeElement()).toEqual(new StringType());
      expect(testAddress.hasCountryElement()).toBe(false);
      expect(testAddress.getCountryElement()).toEqual(new StringType());
      expect(testAddress.hasPeriod()).toBe(false);
      expect(testAddress.getPeriod()).toEqual(new Period());

      expect(testAddress.hasUse()).toBe(false);
      expect(testAddress.getUse()).toBeUndefined();
      expect(testAddress.hasType()).toBe(false);
      expect(testAddress.getType()).toBeUndefined();
      expect(testAddress.hasText()).toBe(false);
      expect(testAddress.getText()).toBeUndefined();
      expect(testAddress.hasLine()).toBe(false);
      expect(testAddress.getLine()).toEqual([] as fhirString[]);
      expect(testAddress.hasCity()).toBe(false);
      expect(testAddress.getCity()).toBeUndefined();
      expect(testAddress.hasDistrict()).toBe(false);
      expect(testAddress.getDistrict()).toBeUndefined();
      expect(testAddress.hasState()).toBe(false);
      expect(testAddress.getState()).toBeUndefined();
      expect(testAddress.hasPostalCode()).toBe(false);
      expect(testAddress.getPostalCode()).toBeUndefined();
      expect(testAddress.hasCountry()).toBe(false);
      expect(testAddress.getCountry()).toBeUndefined();
    });

    it('should properly handle use enum', () => {
      const testAddress = new Address();

      testAddress.setUse(VALID_USE_HOME);
      expect(testAddress.hasUse()).toBe(true);
      expect(testAddress.getUse()).toStrictEqual(VALID_USE_HOME);

      testAddress.setUseElement(VALID_USE_WORK_TYPE);
      expect(testAddress.hasUseElement()).toBe(true);
      expect(testAddress.getUseElement()).toMatchObject(VALID_USE_WORK_TYPE);

      testAddress.setUseEnumType(new EnumCodeType(VALID_USE_TEMP, addressUseEnum));
      expect(testAddress.hasUseEnumType()).toBe(true);
      expect(testAddress.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_TEMP_TYPE, addressUseEnum));

      testAddress.setUse(UNDEFINED_VALUE);
      expect(testAddress.hasUse()).toBe(false);
      expect(testAddress.getUse()).toBeUndefined();

      testAddress.setUseElement(UNDEFINED_VALUE);
      expect(testAddress.hasUseElement()).toBe(false);
      expect(testAddress.getUseElement()).toBeUndefined();

      testAddress.setUseEnumType(UNDEFINED_VALUE);
      expect(testAddress.hasUseEnumType()).toBe(false);
      expect(testAddress.getUseEnumType()).toBeUndefined();

      let t = () => {
        testAddress.setUse(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AddressUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testAddress.setUseElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AddressUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAddress.setUseElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Address.use; Provided element is not an instance of CodeType.`);

      t = () => {
        testAddress.setUseEnumType(new EnumCodeType(UNSUPPORTED_ENUM_CODE, addressUseEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AddressUseEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should properly handle type enum', () => {
      const testAddress = new Address();

      testAddress.setType(VALID_TYPE_POSTAL);
      expect(testAddress.hasType()).toBe(true);
      expect(testAddress.getType()).toStrictEqual(VALID_TYPE_POSTAL);

      testAddress.setTypeElement(VALID_TYPE_PHYSICAL_TYPE);
      expect(testAddress.hasTypeElement()).toBe(true);
      expect(testAddress.getTypeElement()).toMatchObject(VALID_TYPE_PHYSICAL_TYPE);

      testAddress.setTypeEnumType(new EnumCodeType(VALID_USE_BOTH, addressTypeEnum));
      expect(testAddress.hasTypeEnumType()).toBe(true);
      expect(testAddress.getTypeEnumType()).toEqual(new EnumCodeType(VALID_USE_BOTH_TYPE, addressTypeEnum));

      testAddress.setType(UNDEFINED_VALUE);
      expect(testAddress.hasType()).toBe(false);
      expect(testAddress.getType()).toBeUndefined();

      testAddress.setTypeElement(UNDEFINED_VALUE);
      expect(testAddress.hasTypeElement()).toBe(false);
      expect(testAddress.getTypeElement()).toBeUndefined();

      testAddress.setTypeEnumType(UNDEFINED_VALUE);
      expect(testAddress.hasTypeEnumType()).toBe(false);
      expect(testAddress.getTypeEnumType()).toBeUndefined();

      let t = () => {
        testAddress.setType(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AddressTypeEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testAddress.setTypeElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AddressTypeEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAddress.setTypeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Address.type; Provided element is not an instance of CodeType.`);

      t = () => {
        testAddress.setTypeEnumType(new EnumCodeType(UNSUPPORTED_ENUM_CODE, addressTypeEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AddressTypeEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testAddress = new Address();
      testAddress.setUse(VALID_USE_HOME);
      testAddress.setType(VALID_TYPE_POSTAL);
      testAddress.setText(VALID_STRING);
      testAddress.setLine([VALID_LINE_A, VALID_LINE_B]);
      testAddress.setCity(VALID_CITY);
      testAddress.setDistrict(VALID_DISTRICT);
      testAddress.setState(VALID_STATE);
      testAddress.setPostalCode(VALID_POSTAL);
      testAddress.setCountry(VALID_COUNTRY);
      testAddress.setPeriod(VALID_PERIOD);

      expect(testAddress).toBeDefined();
      expect(testAddress.isEmpty()).toBe(false);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(true);
      expect(testAddress.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, addressUseEnum));
      expect(testAddress.hasTypeEnumType()).toBe(true);
      expect(testAddress.getTypeEnumType()).toEqual(new EnumCodeType(VALID_TYPE_POSTAL, addressTypeEnum));

      expect(testAddress.hasUseElement()).toBe(true);
      expect(testAddress.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testAddress.hasTypeElement()).toBe(true);
      expect(testAddress.getTypeElement()).toMatchObject(VALID_TYPE_POSTAL_TYPE);
      expect(testAddress.hasTextElement()).toBe(true);
      expect(testAddress.getTextElement()).toMatchObject(VALID_STRING_TYPE);
      expect(testAddress.hasLineElement()).toBe(true);
      expect(testAddress.getLineElement()).toMatchObject([VALID_LINE_TYPE_A, VALID_LINE_TYPE_B]);
      expect(testAddress.hasCityElement()).toBe(true);
      expect(testAddress.getCityElement()).toMatchObject(VALID_CITY_TYPE);
      expect(testAddress.hasDistrictElement()).toBe(true);
      expect(testAddress.getDistrictElement()).toMatchObject(VALID_DISTRICT_TYPE);
      expect(testAddress.hasStateElement()).toBe(true);
      expect(testAddress.getStateElement()).toMatchObject(VALID_STATE_TYPE);
      expect(testAddress.hasPostalCodeElement()).toBe(true);
      expect(testAddress.getPostalCodeElement()).toMatchObject(VALID_POSTAL_TYPE);
      expect(testAddress.hasCountryElement()).toBe(true);
      expect(testAddress.getCountryElement()).toMatchObject(VALID_COUNTRY_TYPE);
      expect(testAddress.hasPeriod()).toBe(true);
      expect(testAddress.getPeriod()).toEqual(VALID_PERIOD);

      expect(testAddress.hasUse()).toBe(true);
      expect(testAddress.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testAddress.hasType()).toBe(true);
      expect(testAddress.getType()).toStrictEqual(VALID_TYPE_POSTAL);
      expect(testAddress.hasText()).toBe(true);
      expect(testAddress.getText()).toStrictEqual(VALID_STRING);
      expect(testAddress.hasLine()).toBe(true);
      expect(testAddress.getLine()).toMatchObject([VALID_LINE_A, VALID_LINE_B]);
      expect(testAddress.hasCity()).toBe(true);
      expect(testAddress.getCity()).toStrictEqual(VALID_CITY);
      expect(testAddress.hasDistrict()).toBe(true);
      expect(testAddress.getDistrict()).toStrictEqual(VALID_DISTRICT);
      expect(testAddress.hasState()).toBe(true);
      expect(testAddress.getState()).toStrictEqual(VALID_STATE);
      expect(testAddress.hasPostalCode()).toBe(true);
      expect(testAddress.getPostalCode()).toStrictEqual(VALID_POSTAL);
      expect(testAddress.hasCountry()).toBe(true);
      expect(testAddress.getCountry()).toStrictEqual(VALID_COUNTRY);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testAddress = new Address();
      testAddress.setUse(VALID_USE_HOME);
      testAddress.setType(VALID_TYPE_POSTAL);
      testAddress.setText(VALID_STRING);
      testAddress.setLine([VALID_LINE_A, VALID_LINE_B]);
      testAddress.setCity(VALID_CITY);
      testAddress.setDistrict(VALID_DISTRICT);
      testAddress.setState(VALID_STATE);
      testAddress.setPostalCode(VALID_POSTAL);
      testAddress.setCountry(VALID_COUNTRY);
      testAddress.setPeriod(VALID_PERIOD);

      expect(testAddress).toBeDefined();
      expect(testAddress.isEmpty()).toBe(false);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(true);
      expect(testAddress.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, addressUseEnum));
      expect(testAddress.hasTypeEnumType()).toBe(true);
      expect(testAddress.getTypeEnumType()).toEqual(new EnumCodeType(VALID_TYPE_POSTAL, addressTypeEnum));

      expect(testAddress.hasUseElement()).toBe(true);
      expect(testAddress.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testAddress.hasTypeElement()).toBe(true);
      expect(testAddress.getTypeElement()).toMatchObject(VALID_TYPE_POSTAL_TYPE);
      expect(testAddress.hasTextElement()).toBe(true);
      expect(testAddress.getTextElement()).toMatchObject(VALID_STRING_TYPE);
      expect(testAddress.hasLineElement()).toBe(true);
      expect(testAddress.getLineElement()).toMatchObject([VALID_LINE_TYPE_A, VALID_LINE_TYPE_B]);
      expect(testAddress.hasCityElement()).toBe(true);
      expect(testAddress.getCityElement()).toMatchObject(VALID_CITY_TYPE);
      expect(testAddress.hasDistrictElement()).toBe(true);
      expect(testAddress.getDistrictElement()).toMatchObject(VALID_DISTRICT_TYPE);
      expect(testAddress.hasStateElement()).toBe(true);
      expect(testAddress.getStateElement()).toMatchObject(VALID_STATE_TYPE);
      expect(testAddress.hasPostalCodeElement()).toBe(true);
      expect(testAddress.getPostalCodeElement()).toMatchObject(VALID_POSTAL_TYPE);
      expect(testAddress.hasCountryElement()).toBe(true);
      expect(testAddress.getCountryElement()).toMatchObject(VALID_COUNTRY_TYPE);
      expect(testAddress.hasPeriod()).toBe(true);
      expect(testAddress.getPeriod()).toEqual(VALID_PERIOD);

      expect(testAddress.hasUse()).toBe(true);
      expect(testAddress.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testAddress.hasType()).toBe(true);
      expect(testAddress.getType()).toStrictEqual(VALID_TYPE_POSTAL);
      expect(testAddress.hasText()).toBe(true);
      expect(testAddress.getText()).toStrictEqual(VALID_STRING);
      expect(testAddress.hasLine()).toBe(true);
      expect(testAddress.getLine()).toMatchObject([VALID_LINE_A, VALID_LINE_B]);
      expect(testAddress.hasCity()).toBe(true);
      expect(testAddress.getCity()).toStrictEqual(VALID_CITY);
      expect(testAddress.hasDistrict()).toBe(true);
      expect(testAddress.getDistrict()).toStrictEqual(VALID_DISTRICT);
      expect(testAddress.hasState()).toBe(true);
      expect(testAddress.getState()).toStrictEqual(VALID_STATE);
      expect(testAddress.hasPostalCode()).toBe(true);
      expect(testAddress.getPostalCode()).toStrictEqual(VALID_POSTAL);
      expect(testAddress.hasCountry()).toBe(true);
      expect(testAddress.getCountry()).toStrictEqual(VALID_COUNTRY);

      // Reset

      testAddress.setUse(VALID_USE_WORK);
      testAddress.setType(VALID_TYPE_PHYSICAL);
      testAddress.setText(VALID_STRING_2);
      testAddress.setLine([VALID_LINE_A_2, VALID_LINE_B_2]);
      testAddress.setCity(VALID_CITY_2);
      testAddress.setDistrict(VALID_DISTRICT_2);
      testAddress.setState(VALID_STATE_2);
      testAddress.setPostalCode(VALID_POSTAL_2);
      testAddress.setCountry(VALID_COUNTRY_2);
      testAddress.setPeriod(VALID_PERIOD_2);

      expect(testAddress).toBeDefined();
      expect(testAddress.isEmpty()).toBe(false);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(true);
      expect(testAddress.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_WORK, addressUseEnum));
      expect(testAddress.hasTypeEnumType()).toBe(true);
      expect(testAddress.getTypeEnumType()).toEqual(new EnumCodeType(VALID_TYPE_PHYSICAL, addressTypeEnum));

      expect(testAddress.hasUseElement()).toBe(true);
      expect(testAddress.getUseElement()).toMatchObject(VALID_USE_WORK_TYPE);
      expect(testAddress.hasTypeElement()).toBe(true);
      expect(testAddress.getTypeElement()).toMatchObject(VALID_TYPE_PHYSICAL_TYPE);
      expect(testAddress.hasTextElement()).toBe(true);
      expect(testAddress.getTextElement()).toMatchObject(VALID_STRING_TYPE_2);
      expect(testAddress.hasLineElement()).toBe(true);
      expect(testAddress.getLineElement()).toMatchObject([VALID_LINE_TYPE_A_2, VALID_LINE_TYPE_B_2]);
      expect(testAddress.hasCityElement()).toBe(true);
      expect(testAddress.getCityElement()).toMatchObject(VALID_CITY_TYPE_2);
      expect(testAddress.hasDistrictElement()).toBe(true);
      expect(testAddress.getDistrictElement()).toMatchObject(VALID_DISTRICT_TYPE_2);
      expect(testAddress.hasStateElement()).toBe(true);
      expect(testAddress.getStateElement()).toMatchObject(VALID_STATE_TYPE_2);
      expect(testAddress.hasPostalCodeElement()).toBe(true);
      expect(testAddress.getPostalCodeElement()).toMatchObject(VALID_POSTAL_TYPE_2);
      expect(testAddress.hasCountryElement()).toBe(true);
      expect(testAddress.getCountryElement()).toMatchObject(VALID_COUNTRY_TYPE_2);
      expect(testAddress.hasPeriod()).toBe(true);
      expect(testAddress.getPeriod()).toEqual(VALID_PERIOD_2);

      expect(testAddress.hasUse()).toBe(true);
      expect(testAddress.getUse()).toStrictEqual(VALID_USE_WORK);
      expect(testAddress.hasType()).toBe(true);
      expect(testAddress.getType()).toStrictEqual(VALID_TYPE_PHYSICAL);
      expect(testAddress.hasText()).toBe(true);
      expect(testAddress.getText()).toStrictEqual(VALID_STRING_2);
      expect(testAddress.hasLine()).toBe(true);
      expect(testAddress.getLine()).toMatchObject([VALID_LINE_A_2, VALID_LINE_B_2]);
      expect(testAddress.hasCity()).toBe(true);
      expect(testAddress.getCity()).toStrictEqual(VALID_CITY_2);
      expect(testAddress.hasDistrict()).toBe(true);
      expect(testAddress.getDistrict()).toStrictEqual(VALID_DISTRICT_2);
      expect(testAddress.hasState()).toBe(true);
      expect(testAddress.getState()).toStrictEqual(VALID_STATE_2);
      expect(testAddress.hasPostalCode()).toBe(true);
      expect(testAddress.getPostalCode()).toStrictEqual(VALID_POSTAL_2);
      expect(testAddress.hasCountry()).toBe(true);
      expect(testAddress.getCountry()).toStrictEqual(VALID_COUNTRY_2);

      // Reset as empty

      testAddress.setUse(UNDEFINED_VALUE);
      testAddress.setType(UNDEFINED_VALUE);
      testAddress.setText(UNDEFINED_VALUE);
      testAddress.setLine(UNDEFINED_VALUE);
      testAddress.setCity(UNDEFINED_VALUE);
      testAddress.setDistrict(UNDEFINED_VALUE);
      testAddress.setState(UNDEFINED_VALUE);
      testAddress.setPostalCode(UNDEFINED_VALUE);
      testAddress.setCountry(UNDEFINED_VALUE);
      testAddress.setPeriod(UNDEFINED_VALUE);

      expect(testAddress).toBeDefined();
      expect(testAddress.isEmpty()).toBe(true);

      // inherited properties from Element
      expect(testAddress.hasId()).toBe(false);
      expect(testAddress.getId()).toBeUndefined();
      expect(testAddress.hasExtension()).toBe(false);
      expect(testAddress.getExtension()).toEqual([] as Extension[]);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(false);
      expect(testAddress.getUseEnumType()).toBeUndefined();
      expect(testAddress.hasTypeEnumType()).toBe(false);
      expect(testAddress.getTypeEnumType()).toBeUndefined();

      expect(testAddress.hasUseElement()).toBe(false);
      expect(testAddress.getUseElement()).toBeUndefined();
      expect(testAddress.hasTypeElement()).toBe(false);
      expect(testAddress.getTypeElement()).toBeUndefined();
      expect(testAddress.hasTextElement()).toBe(false);
      expect(testAddress.getTextElement()).toEqual(new StringType());
      expect(testAddress.hasLineElement()).toBe(false);
      expect(testAddress.getLineElement()).toEqual([] as StringType[]);
      expect(testAddress.hasCityElement()).toBe(false);
      expect(testAddress.getCityElement()).toEqual(new StringType());
      expect(testAddress.hasDistrictElement()).toBe(false);
      expect(testAddress.getDistrictElement()).toEqual(new StringType());
      expect(testAddress.hasStateElement()).toBe(false);
      expect(testAddress.getStateElement()).toEqual(new StringType());
      expect(testAddress.hasPostalCodeElement()).toBe(false);
      expect(testAddress.getPostalCodeElement()).toEqual(new StringType());
      expect(testAddress.hasCountryElement()).toBe(false);
      expect(testAddress.getCountryElement()).toEqual(new StringType());
      expect(testAddress.hasPeriod()).toBe(false);
      expect(testAddress.getPeriod()).toEqual(new Period());

      expect(testAddress.hasUse()).toBe(false);
      expect(testAddress.getUse()).toBeUndefined();
      expect(testAddress.hasType()).toBe(false);
      expect(testAddress.getType()).toBeUndefined();
      expect(testAddress.hasText()).toBe(false);
      expect(testAddress.getText()).toBeUndefined();
      expect(testAddress.hasLine()).toBe(false);
      expect(testAddress.getLine()).toEqual([] as fhirString[]);
      expect(testAddress.hasCity()).toBe(false);
      expect(testAddress.getCity()).toBeUndefined();
      expect(testAddress.hasDistrict()).toBe(false);
      expect(testAddress.getDistrict()).toBeUndefined();
      expect(testAddress.hasState()).toBe(false);
      expect(testAddress.getState()).toBeUndefined();
      expect(testAddress.hasPostalCode()).toBe(false);
      expect(testAddress.getPostalCode()).toBeUndefined();
      expect(testAddress.hasCountry()).toBe(false);
      expect(testAddress.getCountry()).toBeUndefined();
    });

    it('should be properly reset by adding data elements to primitive lists', () => {
      const testAddress = new Address();
      expect(testAddress).toBeDefined();
      expect(testAddress.isEmpty()).toBe(true);

      testAddress.addLine(VALID_LINE_A);
      testAddress.addLine(VALID_LINE_B);
      testAddress.addLine(UNDEFINED_VALUE);
      expect(testAddress.hasLine()).toBe(true);
      expect(testAddress.getLine()).toHaveLength(2);
      expect(testAddress.getLine()).toMatchObject([VALID_LINE_A, VALID_LINE_B]);
    });

    it('should throw errors for invalid primitive values', () => {
      const testAddress = new Address();

      let t = () => {
        testAddress.setText(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Address.text ()`);

      t = () => {
        testAddress.setLine([INVALID_STRING]);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Address.line array item ()`);

      t = () => {
        testAddress.addLine(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Address.line array item ()`);

      t = () => {
        testAddress.setCity(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Address.city ()`);

      t = () => {
        testAddress.setDistrict(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Address.district ()`);

      t = () => {
        testAddress.setState(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Address.state ()`);

      t = () => {
        testAddress.setPostalCode(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Address.postalCode ()`);

      t = () => {
        testAddress.setCountry(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Address.country ()`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with DataType values', () => {
      const testAddress = new Address();
      testAddress.setUseElement(VALID_USE_HOME_TYPE);
      testAddress.setTypeElement(VALID_TYPE_POSTAL_TYPE);
      testAddress.setTextElement(VALID_STRING_TYPE);
      testAddress.setLineElement([VALID_LINE_TYPE_A, VALID_LINE_TYPE_B]);
      testAddress.setCityElement(VALID_CITY_TYPE);
      testAddress.setDistrictElement(VALID_DISTRICT_TYPE);
      testAddress.setStateElement(VALID_STATE_TYPE);
      testAddress.setPostalCodeElement(VALID_POSTAL_TYPE);
      testAddress.setCountryElement(VALID_COUNTRY_TYPE);
      testAddress.setPeriod(VALID_PERIOD);

      expect(testAddress).toBeDefined();
      expect(testAddress.isEmpty()).toBe(false);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(true);
      expect(testAddress.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, addressUseEnum));
      expect(testAddress.hasTypeEnumType()).toBe(true);
      expect(testAddress.getTypeEnumType()).toEqual(new EnumCodeType(VALID_TYPE_POSTAL, addressTypeEnum));

      expect(testAddress.hasUseElement()).toBe(true);
      expect(testAddress.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testAddress.hasTypeElement()).toBe(true);
      expect(testAddress.getTypeElement()).toMatchObject(VALID_TYPE_POSTAL_TYPE);
      expect(testAddress.hasTextElement()).toBe(true);
      expect(testAddress.getTextElement()).toMatchObject(VALID_STRING_TYPE);
      expect(testAddress.hasLineElement()).toBe(true);
      expect(testAddress.getLineElement()).toMatchObject([VALID_LINE_TYPE_A, VALID_LINE_TYPE_B]);
      expect(testAddress.hasCityElement()).toBe(true);
      expect(testAddress.getCityElement()).toMatchObject(VALID_CITY_TYPE);
      expect(testAddress.hasDistrictElement()).toBe(true);
      expect(testAddress.getDistrictElement()).toMatchObject(VALID_DISTRICT_TYPE);
      expect(testAddress.hasStateElement()).toBe(true);
      expect(testAddress.getStateElement()).toMatchObject(VALID_STATE_TYPE);
      expect(testAddress.hasPostalCodeElement()).toBe(true);
      expect(testAddress.getPostalCodeElement()).toMatchObject(VALID_POSTAL_TYPE);
      expect(testAddress.hasCountryElement()).toBe(true);
      expect(testAddress.getCountryElement()).toMatchObject(VALID_COUNTRY_TYPE);
      expect(testAddress.hasPeriod()).toBe(true);
      expect(testAddress.getPeriod()).toEqual(VALID_PERIOD);

      expect(testAddress.hasUse()).toBe(true);
      expect(testAddress.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testAddress.hasType()).toBe(true);
      expect(testAddress.getType()).toStrictEqual(VALID_TYPE_POSTAL);
      expect(testAddress.hasText()).toBe(true);
      expect(testAddress.getText()).toStrictEqual(VALID_STRING);
      expect(testAddress.hasLine()).toBe(true);
      expect(testAddress.getLine()).toMatchObject([VALID_LINE_A, VALID_LINE_B]);
      expect(testAddress.hasCity()).toBe(true);
      expect(testAddress.getCity()).toStrictEqual(VALID_CITY);
      expect(testAddress.hasDistrict()).toBe(true);
      expect(testAddress.getDistrict()).toStrictEqual(VALID_DISTRICT);
      expect(testAddress.hasState()).toBe(true);
      expect(testAddress.getState()).toStrictEqual(VALID_STATE);
      expect(testAddress.hasPostalCode()).toBe(true);
      expect(testAddress.getPostalCode()).toStrictEqual(VALID_POSTAL);
      expect(testAddress.hasCountry()).toBe(true);
      expect(testAddress.getCountry()).toStrictEqual(VALID_COUNTRY);
    });

    it('should be properly reset by modifying all properties with DataType values', () => {
      const testAddress = new Address();
      testAddress.setUseElement(VALID_USE_HOME_TYPE);
      testAddress.setTypeElement(VALID_TYPE_POSTAL_TYPE);
      testAddress.setTextElement(VALID_STRING_TYPE);
      testAddress.setLineElement([VALID_LINE_TYPE_A, VALID_LINE_TYPE_B]);
      testAddress.setCityElement(VALID_CITY_TYPE);
      testAddress.setDistrictElement(VALID_DISTRICT_TYPE);
      testAddress.setStateElement(VALID_STATE_TYPE);
      testAddress.setPostalCodeElement(VALID_POSTAL_TYPE);
      testAddress.setCountryElement(VALID_COUNTRY_TYPE);
      testAddress.setPeriod(VALID_PERIOD);

      expect(testAddress).toBeDefined();
      expect(testAddress.isEmpty()).toBe(false);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(true);
      expect(testAddress.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME, addressUseEnum));
      expect(testAddress.hasTypeEnumType()).toBe(true);
      expect(testAddress.getTypeEnumType()).toEqual(new EnumCodeType(VALID_TYPE_POSTAL, addressTypeEnum));

      expect(testAddress.hasUseElement()).toBe(true);
      expect(testAddress.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testAddress.hasTypeElement()).toBe(true);
      expect(testAddress.getTypeElement()).toMatchObject(VALID_TYPE_POSTAL_TYPE);
      expect(testAddress.hasTextElement()).toBe(true);
      expect(testAddress.getTextElement()).toMatchObject(VALID_STRING_TYPE);
      expect(testAddress.hasLineElement()).toBe(true);
      expect(testAddress.getLineElement()).toMatchObject([VALID_LINE_TYPE_A, VALID_LINE_TYPE_B]);
      expect(testAddress.hasCityElement()).toBe(true);
      expect(testAddress.getCityElement()).toMatchObject(VALID_CITY_TYPE);
      expect(testAddress.hasDistrictElement()).toBe(true);
      expect(testAddress.getDistrictElement()).toMatchObject(VALID_DISTRICT_TYPE);
      expect(testAddress.hasStateElement()).toBe(true);
      expect(testAddress.getStateElement()).toMatchObject(VALID_STATE_TYPE);
      expect(testAddress.hasPostalCodeElement()).toBe(true);
      expect(testAddress.getPostalCodeElement()).toMatchObject(VALID_POSTAL_TYPE);
      expect(testAddress.hasCountryElement()).toBe(true);
      expect(testAddress.getCountryElement()).toMatchObject(VALID_COUNTRY_TYPE);
      expect(testAddress.hasPeriod()).toBe(true);
      expect(testAddress.getPeriod()).toEqual(VALID_PERIOD);

      expect(testAddress.hasUse()).toBe(true);
      expect(testAddress.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testAddress.hasType()).toBe(true);
      expect(testAddress.getType()).toStrictEqual(VALID_TYPE_POSTAL);
      expect(testAddress.hasText()).toBe(true);
      expect(testAddress.getText()).toStrictEqual(VALID_STRING);
      expect(testAddress.hasLine()).toBe(true);
      expect(testAddress.getLine()).toMatchObject([VALID_LINE_A, VALID_LINE_B]);
      expect(testAddress.hasCity()).toBe(true);
      expect(testAddress.getCity()).toStrictEqual(VALID_CITY);
      expect(testAddress.hasDistrict()).toBe(true);
      expect(testAddress.getDistrict()).toStrictEqual(VALID_DISTRICT);
      expect(testAddress.hasState()).toBe(true);
      expect(testAddress.getState()).toStrictEqual(VALID_STATE);
      expect(testAddress.hasPostalCode()).toBe(true);
      expect(testAddress.getPostalCode()).toStrictEqual(VALID_POSTAL);
      expect(testAddress.hasCountry()).toBe(true);
      expect(testAddress.getCountry()).toStrictEqual(VALID_COUNTRY);

      // Reset

      testAddress.setUseElement(VALID_USE_WORK_TYPE);
      testAddress.setTypeElement(VALID_TYPE_PHYSICAL_TYPE);
      testAddress.setTextElement(VALID_STRING_TYPE_2);
      testAddress.setLineElement([VALID_LINE_TYPE_A_2, VALID_LINE_TYPE_B_2]);
      testAddress.setCityElement(VALID_CITY_TYPE_2);
      testAddress.setDistrictElement(VALID_DISTRICT_TYPE_2);
      testAddress.setStateElement(VALID_STATE_TYPE_2);
      testAddress.setPostalCodeElement(VALID_POSTAL_TYPE_2);
      testAddress.setCountryElement(VALID_COUNTRY_TYPE_2);
      testAddress.setPeriod(VALID_PERIOD_2);

      expect(testAddress).toBeDefined();
      expect(testAddress.isEmpty()).toBe(false);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(true);
      expect(testAddress.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_WORK, addressUseEnum));
      expect(testAddress.hasTypeEnumType()).toBe(true);
      expect(testAddress.getTypeEnumType()).toEqual(new EnumCodeType(VALID_TYPE_PHYSICAL, addressTypeEnum));

      expect(testAddress.hasUseElement()).toBe(true);
      expect(testAddress.getUseElement()).toMatchObject(VALID_USE_WORK_TYPE);
      expect(testAddress.hasTypeElement()).toBe(true);
      expect(testAddress.getTypeElement()).toMatchObject(VALID_TYPE_PHYSICAL_TYPE);
      expect(testAddress.hasTextElement()).toBe(true);
      expect(testAddress.getTextElement()).toMatchObject(VALID_STRING_TYPE_2);
      expect(testAddress.hasLineElement()).toBe(true);
      expect(testAddress.getLineElement()).toMatchObject([VALID_LINE_TYPE_A_2, VALID_LINE_TYPE_B_2]);
      expect(testAddress.hasCityElement()).toBe(true);
      expect(testAddress.getCityElement()).toMatchObject(VALID_CITY_TYPE_2);
      expect(testAddress.hasDistrictElement()).toBe(true);
      expect(testAddress.getDistrictElement()).toMatchObject(VALID_DISTRICT_TYPE_2);
      expect(testAddress.hasStateElement()).toBe(true);
      expect(testAddress.getStateElement()).toMatchObject(VALID_STATE_TYPE_2);
      expect(testAddress.hasPostalCodeElement()).toBe(true);
      expect(testAddress.getPostalCodeElement()).toMatchObject(VALID_POSTAL_TYPE_2);
      expect(testAddress.hasCountryElement()).toBe(true);
      expect(testAddress.getCountryElement()).toMatchObject(VALID_COUNTRY_TYPE_2);
      expect(testAddress.hasPeriod()).toBe(true);
      expect(testAddress.getPeriod()).toEqual(VALID_PERIOD_2);

      expect(testAddress.hasUse()).toBe(true);
      expect(testAddress.getUse()).toStrictEqual(VALID_USE_WORK);
      expect(testAddress.hasType()).toBe(true);
      expect(testAddress.getType()).toStrictEqual(VALID_TYPE_PHYSICAL);
      expect(testAddress.hasText()).toBe(true);
      expect(testAddress.getText()).toStrictEqual(VALID_STRING_2);
      expect(testAddress.hasLine()).toBe(true);
      expect(testAddress.getLine()).toMatchObject([VALID_LINE_A_2, VALID_LINE_B_2]);
      expect(testAddress.hasCity()).toBe(true);
      expect(testAddress.getCity()).toStrictEqual(VALID_CITY_2);
      expect(testAddress.hasDistrict()).toBe(true);
      expect(testAddress.getDistrict()).toStrictEqual(VALID_DISTRICT_2);
      expect(testAddress.hasState()).toBe(true);
      expect(testAddress.getState()).toStrictEqual(VALID_STATE_2);
      expect(testAddress.hasPostalCode()).toBe(true);
      expect(testAddress.getPostalCode()).toStrictEqual(VALID_POSTAL_2);
      expect(testAddress.hasCountry()).toBe(true);
      expect(testAddress.getCountry()).toStrictEqual(VALID_COUNTRY_2);

      // Reset as empty

      testAddress.setUseElement(UNDEFINED_VALUE);
      testAddress.setTypeElement(UNDEFINED_VALUE);
      testAddress.setTextElement(UNDEFINED_VALUE);
      testAddress.setLineElement(UNDEFINED_VALUE);
      testAddress.setCityElement(UNDEFINED_VALUE);
      testAddress.setDistrictElement(UNDEFINED_VALUE);
      testAddress.setStateElement(UNDEFINED_VALUE);
      testAddress.setPostalCodeElement(UNDEFINED_VALUE);
      testAddress.setCountryElement(UNDEFINED_VALUE);
      testAddress.setPeriod(UNDEFINED_VALUE);

      expect(testAddress).toBeDefined();
      expect(testAddress.isEmpty()).toBe(true);

      // inherited properties from Element
      expect(testAddress.hasId()).toBe(false);
      expect(testAddress.getId()).toBeUndefined();
      expect(testAddress.hasExtension()).toBe(false);
      expect(testAddress.getExtension()).toEqual([] as Extension[]);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(false);
      expect(testAddress.getUseEnumType()).toBeUndefined();
      expect(testAddress.hasTypeEnumType()).toBe(false);
      expect(testAddress.getTypeEnumType()).toBeUndefined();

      expect(testAddress.hasUseElement()).toBe(false);
      expect(testAddress.getUseElement()).toBeUndefined();
      expect(testAddress.hasTypeElement()).toBe(false);
      expect(testAddress.getTypeElement()).toBeUndefined();
      expect(testAddress.hasTextElement()).toBe(false);
      expect(testAddress.getTextElement()).toEqual(new StringType());
      expect(testAddress.hasLineElement()).toBe(false);
      expect(testAddress.getLineElement()).toEqual([] as StringType[]);
      expect(testAddress.hasCityElement()).toBe(false);
      expect(testAddress.getCityElement()).toEqual(new StringType());
      expect(testAddress.hasDistrictElement()).toBe(false);
      expect(testAddress.getDistrictElement()).toEqual(new StringType());
      expect(testAddress.hasStateElement()).toBe(false);
      expect(testAddress.getStateElement()).toEqual(new StringType());
      expect(testAddress.hasPostalCodeElement()).toBe(false);
      expect(testAddress.getPostalCodeElement()).toEqual(new StringType());
      expect(testAddress.hasCountryElement()).toBe(false);
      expect(testAddress.getCountryElement()).toEqual(new StringType());
      expect(testAddress.hasPeriod()).toBe(false);
      expect(testAddress.getPeriod()).toEqual(new Period());

      expect(testAddress.hasUse()).toBe(false);
      expect(testAddress.getUse()).toBeUndefined();
      expect(testAddress.hasType()).toBe(false);
      expect(testAddress.getType()).toBeUndefined();
      expect(testAddress.hasText()).toBe(false);
      expect(testAddress.getText()).toBeUndefined();
      expect(testAddress.hasLine()).toBe(false);
      expect(testAddress.getLine()).toEqual([] as fhirString[]);
      expect(testAddress.hasCity()).toBe(false);
      expect(testAddress.getCity()).toBeUndefined();
      expect(testAddress.hasDistrict()).toBe(false);
      expect(testAddress.getDistrict()).toBeUndefined();
      expect(testAddress.hasState()).toBe(false);
      expect(testAddress.getState()).toBeUndefined();
      expect(testAddress.hasPostalCode()).toBe(false);
      expect(testAddress.getPostalCode()).toBeUndefined();
      expect(testAddress.hasCountry()).toBe(false);
      expect(testAddress.getCountry()).toBeUndefined();
    });

    it('should be properly reset by adding data elements to DataType lists', () => {
      const testAddress = new Address();
      expect(testAddress).toBeDefined();
      expect(testAddress.isEmpty()).toBe(true);

      testAddress.addLineElement(VALID_LINE_TYPE_A);
      testAddress.addLineElement(VALID_LINE_TYPE_B);
      testAddress.addLineElement(UNDEFINED_VALUE);
      expect(testAddress.hasLineElement()).toBe(true);
      expect(testAddress.getLineElement()).toHaveLength(2);
      expect(testAddress.getLineElement()).toMatchObject([VALID_LINE_TYPE_A, VALID_LINE_TYPE_B]);
    });

    it('should throw errors for invalid DataType values', () => {
      const testAddress = new Address();

      let t = () => {
        // @ts-expect-error: allow for testing
        testAddress.setTextElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Address.text; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAddress.setLineElement([INVALID_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Address.line; Provided value array has an element that is not an instance of StringType.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testAddress.addLineElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Address.line; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAddress.setCityElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Address.city; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAddress.setDistrictElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Address.district; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAddress.setStateElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Address.state; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAddress.setPostalCodeElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Address.postalCode; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAddress.setCountryElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Address.country; Provided element is not an instance of StringType.`);
    });
  });

  describe('Serialization/Deserialization', () => {
    it('should properly create serialized content', () => {
      const textType = new StringType(VALID_STRING);
      const textId = 'T1357';
      const textExtension = new Extension('textUrl', new StringType('text extension string value'));
      textType.setId(textId);
      textType.addExtension(textExtension);

      const testAddress = new Address();
      const testId = 'id1234';
      testAddress.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testAddress.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testAddress.addExtension(testExtension2);

      testAddress.setUseElement(VALID_USE_HOME_TYPE);
      testAddress.setTypeElement(VALID_TYPE_POSTAL_TYPE);
      testAddress.setTextElement(textType);
      testAddress.setLineElement([VALID_LINE_TYPE_A, VALID_LINE_TYPE_B]);
      testAddress.setCityElement(VALID_CITY_TYPE);
      testAddress.setDistrictElement(VALID_DISTRICT_TYPE);
      testAddress.setStateElement(VALID_STATE_TYPE);
      testAddress.setPostalCodeElement(VALID_POSTAL_TYPE);
      testAddress.setCountryElement(VALID_COUNTRY_TYPE);
      testAddress.setPeriod(VALID_PERIOD);

      expect(testAddress).toBeDefined();
      expect(testAddress).toBeInstanceOf(DataType);
      expect(testAddress).toBeInstanceOf(Address);
      expect(testAddress.constructor.name).toStrictEqual('Address');
      expect(testAddress.fhirType()).toStrictEqual('Address');
      expect(testAddress.isEmpty()).toBe(false);
      expect(testAddress.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testAddress.hasId()).toBe(true);
      expect(testAddress.getId()).toStrictEqual(testId);
      expect(testAddress.hasExtension()).toBe(true);
      expect(testAddress.getExtension()).toEqual([testExtension1, testExtension2]);

      // Address properties
      expect(testAddress.hasUseEnumType()).toBe(true);
      expect(testAddress.getUseEnumType()).toEqual(new EnumCodeType(VALID_USE_HOME_TYPE, addressUseEnum));
      expect(testAddress.hasTypeEnumType()).toBe(true);
      expect(testAddress.getTypeEnumType()).toEqual(new EnumCodeType(VALID_TYPE_POSTAL_TYPE, addressTypeEnum));

      expect(testAddress.hasUseElement()).toBe(true);
      expect(testAddress.getUseElement()).toMatchObject(VALID_USE_HOME_TYPE);
      expect(testAddress.hasTypeElement()).toBe(true);
      expect(testAddress.getTypeElement()).toMatchObject(VALID_TYPE_POSTAL_TYPE);
      expect(testAddress.hasTextElement()).toBe(true);
      expect(testAddress.getTextElement()).toMatchObject(textType);
      expect(testAddress.hasLineElement()).toBe(true);
      expect(testAddress.getLineElement()).toMatchObject([VALID_LINE_TYPE_A, VALID_LINE_TYPE_B]);
      expect(testAddress.hasCityElement()).toBe(true);
      expect(testAddress.getCityElement()).toMatchObject(VALID_CITY_TYPE);
      expect(testAddress.hasDistrictElement()).toBe(true);
      expect(testAddress.getDistrictElement()).toMatchObject(VALID_DISTRICT_TYPE);
      expect(testAddress.hasStateElement()).toBe(true);
      expect(testAddress.getStateElement()).toMatchObject(VALID_STATE_TYPE);
      expect(testAddress.hasPostalCodeElement()).toBe(true);
      expect(testAddress.getPostalCodeElement()).toMatchObject(VALID_POSTAL_TYPE);
      expect(testAddress.hasCountryElement()).toBe(true);
      expect(testAddress.getCountryElement()).toMatchObject(VALID_COUNTRY_TYPE);
      expect(testAddress.hasPeriod()).toBe(true);
      expect(testAddress.getPeriod()).toEqual(VALID_PERIOD);

      expect(testAddress.hasUse()).toBe(true);
      expect(testAddress.getUse()).toStrictEqual(VALID_USE_HOME);
      expect(testAddress.hasType()).toBe(true);
      expect(testAddress.getType()).toStrictEqual(VALID_TYPE_POSTAL);
      expect(testAddress.hasText()).toBe(true);
      expect(testAddress.getText()).toStrictEqual(VALID_STRING);
      expect(testAddress.hasLine()).toBe(true);
      expect(testAddress.getLine()).toMatchObject([VALID_LINE_A, VALID_LINE_B]);
      expect(testAddress.hasCity()).toBe(true);
      expect(testAddress.getCity()).toStrictEqual(VALID_CITY);
      expect(testAddress.hasDistrict()).toBe(true);
      expect(testAddress.getDistrict()).toStrictEqual(VALID_DISTRICT);
      expect(testAddress.hasState()).toBe(true);
      expect(testAddress.getState()).toStrictEqual(VALID_STATE);
      expect(testAddress.hasPostalCode()).toBe(true);
      expect(testAddress.getPostalCode()).toStrictEqual(VALID_POSTAL);
      expect(testAddress.hasCountry()).toBe(true);
      expect(testAddress.getCountry()).toStrictEqual(VALID_COUNTRY);

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
        use: 'home',
        type: 'postal',
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
        line: ['1234 Main ST', 'APT 15A'],
        city: 'Nashua',
        district: 'Hillsborough',
        state: 'NH',
        postalCode: '03064',
        country: 'US',
        period: {
          start: '2017-01-01T00:00:00.000Z',
          end: '2017-01-01T01:00:00.000Z',
        },
      };
      expect(testAddress.toJSON()).toEqual(expectedJson);
    });
  });
});
