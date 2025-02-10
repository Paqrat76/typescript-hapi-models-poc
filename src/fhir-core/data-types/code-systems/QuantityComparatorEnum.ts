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

import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';
import { fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR CodeSystem: QuantityComparator
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * **NOTE:** The `ad` code was added in FHIR R5.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem QuantityComparator](http://hl7.org/fhir/quantity-comparator)
 */
export class QuantityComparatorEnum implements IFhirCodeEnum {
  public static readonly LESS_THAN = new FhirCodeDefinition(
    'LESS_THAN',
    `<`,
    `http://hl7.org/fhir/quantity-comparator`,
    `Less than`,
    `The actual value is less than the given value.`,
  );
  public static readonly LESS_THAN_EQUAL = new FhirCodeDefinition(
    'LESS_THAN_EQUAL',
    `<=`,
    `http://hl7.org/fhir/quantity-comparator`,
    `Less or Equal to`,
    `The actual value is less than or equal to the given value.`,
  );
  public static readonly GREATER_THAN_EQUAL = new FhirCodeDefinition(
    'GREATER_THAN_EQUAL',
    `>=`,
    `http://hl7.org/fhir/quantity-comparator`,
    `Greater or Equal to`,
    `The actual value is greater than or equal to the given value.`,
  );
  public static readonly GREATER_THAN = new FhirCodeDefinition(
    'GREATER_THAN',
    `>`,
    `http://hl7.org/fhir/quantity-comparator`,
    `Greater than`,
    `The actual value is greater than the given value.`,
  );
  public static readonly AD = new FhirCodeDefinition(
    'AD',
    `ad`,
    `http://hl7.org/fhir/quantity-comparator`,
    `Sufficient to achieve this total quantity`,
    `The actual value is sufficient for the total quantity to equal the given value.`,
  );
  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      QuantityComparatorEnum.LESS_THAN,
      QuantityComparatorEnum.LESS_THAN_EQUAL,
      QuantityComparatorEnum.GREATER_THAN_EQUAL,
      QuantityComparatorEnum.GREATER_THAN,
      QuantityComparatorEnum.AD,
      QuantityComparatorEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (QuantityComparatorEnum.LESS_THAN.code === code) {
      return QuantityComparatorEnum.LESS_THAN;
    } else if (QuantityComparatorEnum.LESS_THAN_EQUAL.code === code) {
      return QuantityComparatorEnum.LESS_THAN_EQUAL;
    } else if (QuantityComparatorEnum.GREATER_THAN_EQUAL.code === code) {
      return QuantityComparatorEnum.GREATER_THAN_EQUAL;
    } else if (QuantityComparatorEnum.GREATER_THAN.code === code) {
      return QuantityComparatorEnum.GREATER_THAN;
    } else if (QuantityComparatorEnum.AD.code === code) {
      return QuantityComparatorEnum.AD;
    } else if (QuantityComparatorEnum.NULL.code === code) {
      return QuantityComparatorEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown QuantityComparatorEnum 'code' value '${code}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
