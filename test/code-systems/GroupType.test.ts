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

import { GroupTypeEnum } from '@src/fhir/code-systems/GroupTypeEnum';
import { FhirCodeDefinition } from '@src/fhir/base-models/core-fhir-codes';
import { InvalidCodeError } from '@src/fhir/errors/InvalidCodeError';

describe('GroupTypeEnum', () => {
  const INVALID_CODE = ' invalid CodeType ';
  const UNDEFINED_CODE = undefined;
  const testGroupTypeEnum = new GroupTypeEnum();

  it('should be fully defined', () => {
    expect(testGroupTypeEnum.values()).toHaveLength(7);
    const expectedEnums = [
      GroupTypeEnum.PERSON,
      GroupTypeEnum.ANIMAL,
      GroupTypeEnum.PRACTITIONER,
      GroupTypeEnum.DEVICE,
      GroupTypeEnum.MEDICATION,
      GroupTypeEnum.SUBSTANCE,
      GroupTypeEnum.NULL,
    ];
    expect(testGroupTypeEnum.values()).toEqual(expect.arrayContaining(expectedEnums));

    let enumValue = testGroupTypeEnum.fromCode('person');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(GroupTypeEnum.PERSON);

    enumValue = testGroupTypeEnum.fromCode('animal');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(GroupTypeEnum.ANIMAL);

    enumValue = testGroupTypeEnum.fromCode('practitioner');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(GroupTypeEnum.PRACTITIONER);

    enumValue = testGroupTypeEnum.fromCode('device');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(GroupTypeEnum.DEVICE);

    enumValue = testGroupTypeEnum.fromCode('medication');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(GroupTypeEnum.MEDICATION);

    enumValue = testGroupTypeEnum.fromCode('substance');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(GroupTypeEnum.SUBSTANCE);

    enumValue = testGroupTypeEnum.fromCode('null');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(GroupTypeEnum.NULL);
  });

  it('should throw InvalidCodeError when executing fromCode() with undefined code value', () => {
    const t = () => {
      testGroupTypeEnum.fromCode(UNDEFINED_CODE);
    };
    expect(t).toThrow(InvalidCodeError);
    expect(t).toThrow(`The provided 'code' value is undefined`);
  });

  it('should throw InvalidCodeError when executing fromCode() with unknown code value', () => {
    const t = () => {
      testGroupTypeEnum.fromCode(INVALID_CODE);
    };
    expect(t).toThrow(InvalidCodeError);
    expect(t).toThrow(`Unknown GroupTypeEnum 'code' value '${INVALID_CODE}'`);
  });

  it('should properly define GroupTypeEnum.PERSON', () => {
    expect(GroupTypeEnum.PERSON).toBeDefined();
    expect(GroupTypeEnum.PERSON).toBeInstanceOf(FhirCodeDefinition);
    expect(GroupTypeEnum.PERSON.name).toStrictEqual('PERSON');
    expect(GroupTypeEnum.PERSON.code).toStrictEqual('person');
    expect(GroupTypeEnum.PERSON.system).toStrictEqual('http://hl7.org/fhir/group-type');
    expect(GroupTypeEnum.PERSON.display).toStrictEqual('Person');
    expect(GroupTypeEnum.PERSON.definition).toStrictEqual(`Group contains "person" Patient resources.`);
    expect(GroupTypeEnum.PERSON.toJSON()).toStrictEqual('person');
  });

  it('should properly define GroupTypeEnum.ANIMAL', () => {
    expect(GroupTypeEnum.ANIMAL).toBeDefined();
    expect(GroupTypeEnum.ANIMAL).toBeInstanceOf(FhirCodeDefinition);
    expect(GroupTypeEnum.ANIMAL.name).toStrictEqual('ANIMAL');
    expect(GroupTypeEnum.ANIMAL.code).toStrictEqual('animal');
    expect(GroupTypeEnum.ANIMAL.system).toStrictEqual('http://hl7.org/fhir/group-type');
    expect(GroupTypeEnum.ANIMAL.display).toStrictEqual('Animal');
    expect(GroupTypeEnum.ANIMAL.definition).toStrictEqual(`Group contains "animal" Patient resources.`);
    expect(GroupTypeEnum.ANIMAL.toJSON()).toStrictEqual('animal');
  });

  it('should properly define GroupTypeEnum.PRACTITIONER', () => {
    expect(GroupTypeEnum.PRACTITIONER).toBeDefined();
    expect(GroupTypeEnum.PRACTITIONER).toBeInstanceOf(FhirCodeDefinition);
    expect(GroupTypeEnum.PRACTITIONER.name).toStrictEqual('PRACTITIONER');
    expect(GroupTypeEnum.PRACTITIONER.code).toStrictEqual('practitioner');
    expect(GroupTypeEnum.PRACTITIONER.system).toStrictEqual('http://hl7.org/fhir/group-type');
    expect(GroupTypeEnum.PRACTITIONER.display).toStrictEqual('Practitioner');
    expect(GroupTypeEnum.PRACTITIONER.definition).toStrictEqual(
      `Group contains healthcare practitioner resources (Practitioner or PractitionerRole).`,
    );
    expect(GroupTypeEnum.PRACTITIONER.toJSON()).toStrictEqual('practitioner');
  });

  it('should properly define GroupTypeEnum.DEVICE', () => {
    expect(GroupTypeEnum.DEVICE).toBeDefined();
    expect(GroupTypeEnum.DEVICE).toBeInstanceOf(FhirCodeDefinition);
    expect(GroupTypeEnum.DEVICE.name).toStrictEqual('DEVICE');
    expect(GroupTypeEnum.DEVICE.code).toStrictEqual('device');
    expect(GroupTypeEnum.DEVICE.system).toStrictEqual('http://hl7.org/fhir/group-type');
    expect(GroupTypeEnum.DEVICE.display).toStrictEqual('Device');
    expect(GroupTypeEnum.DEVICE.definition).toStrictEqual(`Group contains Device resources.`);
    expect(GroupTypeEnum.DEVICE.toJSON()).toStrictEqual('device');
  });

  it('should properly define GroupTypeEnum.MEDICATION', () => {
    expect(GroupTypeEnum.MEDICATION).toBeDefined();
    expect(GroupTypeEnum.MEDICATION).toBeInstanceOf(FhirCodeDefinition);
    expect(GroupTypeEnum.MEDICATION.name).toStrictEqual('MEDICATION');
    expect(GroupTypeEnum.MEDICATION.code).toStrictEqual('medication');
    expect(GroupTypeEnum.MEDICATION.system).toStrictEqual('http://hl7.org/fhir/group-type');
    expect(GroupTypeEnum.MEDICATION.display).toStrictEqual('Medication');
    expect(GroupTypeEnum.MEDICATION.definition).toStrictEqual(`Group contains Medication resources.`);
    expect(GroupTypeEnum.MEDICATION.toJSON()).toStrictEqual('medication');
  });

  it('should properly define GroupTypeEnum.SUBSTANCE', () => {
    expect(GroupTypeEnum.SUBSTANCE).toBeDefined();
    expect(GroupTypeEnum.SUBSTANCE).toBeInstanceOf(FhirCodeDefinition);
    expect(GroupTypeEnum.SUBSTANCE.name).toStrictEqual('SUBSTANCE');
    expect(GroupTypeEnum.SUBSTANCE.code).toStrictEqual('substance');
    expect(GroupTypeEnum.SUBSTANCE.system).toStrictEqual('http://hl7.org/fhir/group-type');
    expect(GroupTypeEnum.SUBSTANCE.display).toStrictEqual('Substance');
    expect(GroupTypeEnum.SUBSTANCE.definition).toStrictEqual(`Group contains Substance resources.`);
    expect(GroupTypeEnum.SUBSTANCE.toJSON()).toStrictEqual('substance');
  });
});
