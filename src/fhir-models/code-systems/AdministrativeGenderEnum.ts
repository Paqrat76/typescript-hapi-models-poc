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
 * FHIR CodeSystem: AdministrativeGenderEnum
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem AdministrativeGender](http://hl7.org/fhir/administrative-gender)
 */
export class AdministrativeGenderEnum implements IFhirCodeEnum {
  public static readonly MALE = new FhirCodeDefinition(
    'MALE',
    `male`,
    `http://hl7.org/fhir/administrative-gende`,
    `Male`,
    `Male.`,
  );
  public static readonly FEMALE = new FhirCodeDefinition(
    'FEMALE',
    `female`,
    `http://hl7.org/fhir/administrative-gende`,
    `Female`,
    `Female.`,
  );
  public static readonly OTHER = new FhirCodeDefinition(
    'OTHER',
    `other`,
    `http://hl7.org/fhir/administrative-gende`,
    `Other`,
    `Other.`,
  );
  public static readonly UNKNOWN = new FhirCodeDefinition(
    'UNKNOWN',
    `unknown`,
    `http://hl7.org/fhir/administrative-gende`,
    `Unknown`,
    `Unknown.`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      AdministrativeGenderEnum.MALE,
      AdministrativeGenderEnum.FEMALE,
      AdministrativeGenderEnum.OTHER,
      AdministrativeGenderEnum.UNKNOWN,
      AdministrativeGenderEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (AdministrativeGenderEnum.MALE.code === code) {
      return AdministrativeGenderEnum.MALE;
    } else if (AdministrativeGenderEnum.FEMALE.code === code) {
      return AdministrativeGenderEnum.FEMALE;
    } else if (AdministrativeGenderEnum.OTHER.code === code) {
      return AdministrativeGenderEnum.OTHER;
    } else if (AdministrativeGenderEnum.UNKNOWN.code === code) {
      return AdministrativeGenderEnum.UNKNOWN;
    } else if (AdministrativeGenderEnum.NULL.code === code) {
      return AdministrativeGenderEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown AdministrativeGenderEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
