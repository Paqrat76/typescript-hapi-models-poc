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
 * FHIR CodeSystem: DaysOfWeek
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem DaysOfWeek](http://hl7.org/fhir/days-of-week)
 */
export class DaysOfWeekEnum implements IFhirCodeEnum {
  public static readonly MON = new FhirCodeDefinition(
    'MON',
    `mon`,
    `http://hl7.org/fhir/days-of-week`,
    `Monday`,
    `Monday.`,
  );
  public static readonly TUE = new FhirCodeDefinition(
    'TUE',
    `tue`,
    `http://hl7.org/fhir/days-of-week`,
    `Tuesday`,
    `Tuesday.`,
  );
  public static readonly WED = new FhirCodeDefinition(
    'WED',
    `wed`,
    `http://hl7.org/fhir/days-of-week`,
    `Wednesday`,
    `Wednesday.`,
  );
  public static readonly THU = new FhirCodeDefinition(
    'THU',
    `thu`,
    `http://hl7.org/fhir/days-of-week`,
    `Thursday`,
    `Thursday.`,
  );
  public static readonly FRI = new FhirCodeDefinition(
    'FRI',
    `fri`,
    `http://hl7.org/fhir/days-of-week`,
    `Friday`,
    `Friday.`,
  );
  public static readonly SAT = new FhirCodeDefinition(
    'SAT',
    `sat`,
    `http://hl7.org/fhir/days-of-week`,
    `Saturday`,
    `Saturday.`,
  );
  public static readonly SUN = new FhirCodeDefinition(
    'SUN',
    `sun`,
    `http://hl7.org/fhir/days-of-week`,
    `Sunday`,
    `Sunday.`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      DaysOfWeekEnum.MON,
      DaysOfWeekEnum.TUE,
      DaysOfWeekEnum.WED,
      DaysOfWeekEnum.THU,
      DaysOfWeekEnum.FRI,
      DaysOfWeekEnum.SAT,
      DaysOfWeekEnum.SUN,
      DaysOfWeekEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (DaysOfWeekEnum.MON.code === code) {
      return DaysOfWeekEnum.MON;
    } else if (DaysOfWeekEnum.TUE.code === code) {
      return DaysOfWeekEnum.TUE;
    } else if (DaysOfWeekEnum.WED.code === code) {
      return DaysOfWeekEnum.WED;
    } else if (DaysOfWeekEnum.THU.code === code) {
      return DaysOfWeekEnum.THU;
    } else if (DaysOfWeekEnum.FRI.code === code) {
      return DaysOfWeekEnum.FRI;
    } else if (DaysOfWeekEnum.SAT.code === code) {
      return DaysOfWeekEnum.SAT;
    } else if (DaysOfWeekEnum.SUN.code === code) {
      return DaysOfWeekEnum.SUN;
    } else if (DaysOfWeekEnum.NULL.code === code) {
      return DaysOfWeekEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown DaysOfWeekEnum 'code' value '${code}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
