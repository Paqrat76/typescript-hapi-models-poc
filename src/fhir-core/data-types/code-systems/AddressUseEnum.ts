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

/* istanbul ignore file */
/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR CodeSystem: AddressUseEnum
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem AddressUse](http://hl7.org/fhir/address-use)
 */
export class AddressUseEnum implements IFhirCodeEnum {
  public static readonly HOME = new FhirCodeDefinition(
    'HOME',
    `home`,
    `http://hl7.org/fhir/address-use`,
    `Home`,
    `A communication address at a home.`,
  );
  public static readonly WORK = new FhirCodeDefinition(
    'WORK',
    `work`,
    `http://hl7.org/fhir/address-use`,
    `Work`,
    `An office address. First choice for business related contacts during business hours.`,
  );
  public static readonly TEMP = new FhirCodeDefinition(
    'TEMP',
    `temp`,
    `http://hl7.org/fhir/address-use`,
    `Temporary`,
    `A temporary address. The period can provide more detailed information.`,
  );
  public static readonly OLD = new FhirCodeDefinition(
    'OLD',
    `old`,
    `http://hl7.org/fhir/address-use`,
    `Old / Incorrect`,
    `This address is no longer in use (or was never correct but retained for records).`,
  );
  public static readonly BILLING = new FhirCodeDefinition(
    'BILLING',
    `billing`,
    `http://hl7.org/fhir/address-use`,
    `Billing`,
    `An address to be used to send bills, invoices, receipts etc.`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      AddressUseEnum.HOME,
      AddressUseEnum.WORK,
      AddressUseEnum.TEMP,
      AddressUseEnum.OLD,
      AddressUseEnum.BILLING,
      AddressUseEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (AddressUseEnum.HOME.code === code) {
      return AddressUseEnum.HOME;
    } else if (AddressUseEnum.WORK.code === code) {
      return AddressUseEnum.WORK;
    } else if (AddressUseEnum.TEMP.code === code) {
      return AddressUseEnum.TEMP;
    } else if (AddressUseEnum.OLD.code === code) {
      return AddressUseEnum.OLD;
    } else if (AddressUseEnum.BILLING.code === code) {
      return AddressUseEnum.BILLING;
    } else if (AddressUseEnum.NULL.code === code) {
      return AddressUseEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown AddressUseEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
