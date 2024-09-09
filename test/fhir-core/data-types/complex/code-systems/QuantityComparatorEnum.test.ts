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

import { QuantityComparatorEnum } from '@src/fhir-core/data-types/complex/code-systems/QuantityComparatorEnum';
import { FhirCodeDefinition } from '@src/fhir-core/base-models/core-fhir-codes';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';

describe('QuantityComparatorEnum', () => {
  const INVALID_CODE = ' invalid CodeType ';
  const UNDEFINED_CODE = undefined;
  const testQuantityComparatorEnum = new QuantityComparatorEnum();

  it('should be fully defined', () => {
    expect(testQuantityComparatorEnum.values()).toHaveLength(6);
    const expectedEnums = [
      QuantityComparatorEnum.LESS_THAN,
      QuantityComparatorEnum.LESS_THAN_EQUAL,
      QuantityComparatorEnum.GREATER_THAN_EQUAL,
      QuantityComparatorEnum.GREATER_THAN,
      QuantityComparatorEnum.AD,
      QuantityComparatorEnum.NULL,
    ];
    expect(testQuantityComparatorEnum.values()).toEqual(expect.arrayContaining(expectedEnums));

    let enumValue = testQuantityComparatorEnum.fromCode('<');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(QuantityComparatorEnum.LESS_THAN);

    enumValue = testQuantityComparatorEnum.fromCode('<=');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(QuantityComparatorEnum.LESS_THAN_EQUAL);

    enumValue = testQuantityComparatorEnum.fromCode('>=');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(QuantityComparatorEnum.GREATER_THAN_EQUAL);

    enumValue = testQuantityComparatorEnum.fromCode('>');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(QuantityComparatorEnum.GREATER_THAN);

    enumValue = testQuantityComparatorEnum.fromCode('ad');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(QuantityComparatorEnum.AD);

    enumValue = testQuantityComparatorEnum.fromCode('null');
    expect(enumValue).toBeDefined();
    expect(enumValue).toMatchObject(QuantityComparatorEnum.NULL);
  });

  it('should throw InvalidCodeError when executing fromCode() with undefined code value', () => {
    const t = () => {
      testQuantityComparatorEnum.fromCode(UNDEFINED_CODE);
    };
    expect(t).toThrow(InvalidCodeError);
    expect(t).toThrow(`The provided 'code' value is undefined`);
  });

  it('should throw InvalidCodeError when executing fromCode() with unknown code value', () => {
    const t = () => {
      testQuantityComparatorEnum.fromCode(INVALID_CODE);
    };
    expect(t).toThrow(InvalidCodeError);
    expect(t).toThrow(`Unknown QuantityComparatorEnum 'code' value '${INVALID_CODE}'`);
  });

  it('should properly define QuantityComparatorEnum.LESS_THAN', () => {
    expect(QuantityComparatorEnum.LESS_THAN).toBeDefined();
    expect(QuantityComparatorEnum.LESS_THAN).toBeInstanceOf(FhirCodeDefinition);
    expect(QuantityComparatorEnum.LESS_THAN.name).toStrictEqual('LESS_THAN');
    expect(QuantityComparatorEnum.LESS_THAN.code).toStrictEqual('<');
    expect(QuantityComparatorEnum.LESS_THAN.system).toStrictEqual('http://hl7.org/fhir/quantity-comparator');
    expect(QuantityComparatorEnum.LESS_THAN.display).toStrictEqual('Less than');
    expect(QuantityComparatorEnum.LESS_THAN.definition).toStrictEqual(`The actual value is less than the given value.`);
    expect(QuantityComparatorEnum.LESS_THAN.toJSON()).toStrictEqual('<');
  });

  it('should properly define QuantityComparatorEnum.LESS_THAN_EQUAL', () => {
    expect(QuantityComparatorEnum.LESS_THAN_EQUAL).toBeDefined();
    expect(QuantityComparatorEnum.LESS_THAN_EQUAL).toBeInstanceOf(FhirCodeDefinition);
    expect(QuantityComparatorEnum.LESS_THAN_EQUAL.name).toStrictEqual('LESS_THAN_EQUAL');
    expect(QuantityComparatorEnum.LESS_THAN_EQUAL.code).toStrictEqual('<=');
    expect(QuantityComparatorEnum.LESS_THAN_EQUAL.system).toStrictEqual('http://hl7.org/fhir/quantity-comparator');
    expect(QuantityComparatorEnum.LESS_THAN_EQUAL.display).toStrictEqual('Less or Equal to');
    expect(QuantityComparatorEnum.LESS_THAN_EQUAL.definition).toStrictEqual(
      `The actual value is less than or equal to the given value.`,
    );
    expect(QuantityComparatorEnum.LESS_THAN_EQUAL.toJSON()).toStrictEqual('<=');
  });

  it('should properly define QuantityComparatorEnum.GREATER_THAN_EQUAL', () => {
    expect(QuantityComparatorEnum.GREATER_THAN_EQUAL).toBeDefined();
    expect(QuantityComparatorEnum.GREATER_THAN_EQUAL).toBeInstanceOf(FhirCodeDefinition);
    expect(QuantityComparatorEnum.GREATER_THAN_EQUAL.name).toStrictEqual('GREATER_THAN_EQUAL');
    expect(QuantityComparatorEnum.GREATER_THAN_EQUAL.code).toStrictEqual('>=');
    expect(QuantityComparatorEnum.GREATER_THAN_EQUAL.system).toStrictEqual('http://hl7.org/fhir/quantity-comparator');
    expect(QuantityComparatorEnum.GREATER_THAN_EQUAL.display).toStrictEqual('Greater or Equal to');
    expect(QuantityComparatorEnum.GREATER_THAN_EQUAL.definition).toStrictEqual(
      `The actual value is greater than or equal to the given value.`,
    );
    expect(QuantityComparatorEnum.GREATER_THAN_EQUAL.toJSON()).toStrictEqual('>=');
  });

  it('should properly define QuantityComparatorEnum.GREATER_THAN', () => {
    expect(QuantityComparatorEnum.GREATER_THAN).toBeDefined();
    expect(QuantityComparatorEnum.GREATER_THAN).toBeInstanceOf(FhirCodeDefinition);
    expect(QuantityComparatorEnum.GREATER_THAN.name).toStrictEqual('GREATER_THAN');
    expect(QuantityComparatorEnum.GREATER_THAN.code).toStrictEqual('>');
    expect(QuantityComparatorEnum.GREATER_THAN.system).toStrictEqual('http://hl7.org/fhir/quantity-comparator');
    expect(QuantityComparatorEnum.GREATER_THAN.display).toStrictEqual('Greater than');
    expect(QuantityComparatorEnum.GREATER_THAN.definition).toStrictEqual(
      `The actual value is greater than the given value.`,
    );
    expect(QuantityComparatorEnum.GREATER_THAN.toJSON()).toStrictEqual('>');
  });

  it('should properly define QuantityComparatorEnum.AD', () => {
    expect(QuantityComparatorEnum.AD).toBeDefined();
    expect(QuantityComparatorEnum.AD).toBeInstanceOf(FhirCodeDefinition);
    expect(QuantityComparatorEnum.AD.name).toStrictEqual('AD');
    expect(QuantityComparatorEnum.AD.code).toStrictEqual('ad');
    expect(QuantityComparatorEnum.AD.system).toStrictEqual('http://hl7.org/fhir/quantity-comparator');
    expect(QuantityComparatorEnum.AD.display).toStrictEqual('Sufficient to achieve this total quantity');
    expect(QuantityComparatorEnum.AD.definition).toStrictEqual(
      `The actual value is sufficient for the total quantity to equal the given value.`,
    );
    expect(QuantityComparatorEnum.AD.toJSON()).toStrictEqual('ad');
  });
});
