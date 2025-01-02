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

import { fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';

/* istanbul ignore file */
/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR CodeSystem: AddressTypeEnum
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem AddressType](http://hl7.org/fhir/address-type)
 */
export class AddressTypeEnum implements IFhirCodeEnum {
  public static readonly POSTAL = new FhirCodeDefinition(
    'POSTAL',
    `postal`,
    `http://hl7.org/fhir/address-type`,
    `Postal`,
    `Mailing addresses - PO Boxes and care-of addresses.`,
  );
  public static readonly PHYSICAL = new FhirCodeDefinition(
    'PHYSICAL',
    `physical`,
    `http://hl7.org/fhir/address-type`,
    `Physical`,
    `A physical address that can be visited.`,
  );
  public static readonly BOTH = new FhirCodeDefinition(
    'BOTH',
    `both`,
    `http://hl7.org/fhir/address-type`,
    `Postal & Physical`,
    `An address that is both physical and postal.`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [AddressTypeEnum.POSTAL, AddressTypeEnum.PHYSICAL, AddressTypeEnum.BOTH, AddressTypeEnum.NULL];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (AddressTypeEnum.POSTAL.code === code) {
      return AddressTypeEnum.POSTAL;
    } else if (AddressTypeEnum.PHYSICAL.code === code) {
      return AddressTypeEnum.PHYSICAL;
    } else if (AddressTypeEnum.BOTH.code === code) {
      return AddressTypeEnum.BOTH;
    } else if (AddressTypeEnum.NULL.code === code) {
      return AddressTypeEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown AddressTypeEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
