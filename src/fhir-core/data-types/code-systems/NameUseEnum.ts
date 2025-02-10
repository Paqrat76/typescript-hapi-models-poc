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
 * FHIR CodeSystem: NameUse
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem NameUse](http://hl7.org/fhir/name-use)
 */
export class NameUseEnum implements IFhirCodeEnum {
  public static readonly USUAL = new FhirCodeDefinition(
    'USUAL',
    `usual`,
    `http://hl7.org/fhir/name-use`,
    `Usual`,
    `Known as/conventional/the one you normally use.`,
  );
  public static readonly OFFICIAL = new FhirCodeDefinition(
    'OFFICIAL',
    `official`,
    `http://hl7.org/fhir/name-use`,
    `Official`,
    `The formal name as registered in an official (government) registry, but which name might not be commonly used. May be called "legal name".`,
  );
  public static readonly TEMP = new FhirCodeDefinition(
    'TEMP',
    `temp`,
    `http://hl7.org/fhir/name-use`,
    `Temp`,
    `A temporary name. Name.period can provide more detailed information. This may also be used for temporary names assigned at birth or in emergency situations.`,
  );
  public static readonly NICKNAME = new FhirCodeDefinition(
    'NICKNAME',
    `nickname`,
    `http://hl7.org/fhir/name-use`,
    `Nickname`,
    `A name that is used to address the person in an informal manner, but is not part of their formal or usual name.`,
  );
  public static readonly ANONYMOUS = new FhirCodeDefinition(
    'ANONYMOUS',
    `anonymous`,
    `http://hl7.org/fhir/name-use`,
    `Anonymous`,
    `Anonymous assigned name, alias, or pseudonym (used to protect a person's identity for privacy reasons).`,
  );
  public static readonly OLD = new FhirCodeDefinition(
    'OLD',
    `old`,
    `http://hl7.org/fhir/name-use`,
    `Old`,
    `This name is no longer in use (or was never correct, but retained for records).`,
  );
  public static readonly MAIDEN = new FhirCodeDefinition(
    'MAIDEN',
    `maiden`,
    `http://hl7.org/fhir/name-use`,
    `Name changed for Marriage`,
    `A name used prior to changing name because of marriage. This name use is for use by applications that collect and store names that were used prior to a marriage. Marriage naming customs vary greatly around the world, and are constantly changing. This term is not gender specific. The use of this term does not imply any particular history for a person's name.`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      NameUseEnum.USUAL,
      NameUseEnum.OFFICIAL,
      NameUseEnum.TEMP,
      NameUseEnum.NICKNAME,
      NameUseEnum.ANONYMOUS,
      NameUseEnum.OLD,
      NameUseEnum.MAIDEN,
      NameUseEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (NameUseEnum.USUAL.code === code) {
      return NameUseEnum.USUAL;
    } else if (NameUseEnum.OFFICIAL.code === code) {
      return NameUseEnum.OFFICIAL;
    } else if (NameUseEnum.TEMP.code === code) {
      return NameUseEnum.TEMP;
    } else if (NameUseEnum.NICKNAME.code === code) {
      return NameUseEnum.NICKNAME;
    } else if (NameUseEnum.ANONYMOUS.code === code) {
      return NameUseEnum.ANONYMOUS;
    } else if (NameUseEnum.OLD.code === code) {
      return NameUseEnum.OLD;
    } else if (NameUseEnum.MAIDEN.code === code) {
      return NameUseEnum.MAIDEN;
    } else if (NameUseEnum.NULL.code === code) {
      return NameUseEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown NameUseEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
