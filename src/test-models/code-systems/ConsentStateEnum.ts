/*
 * Copyright (c) 2025. Joe Paquette
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

import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '../../fhir-core/base-models/core-fhir-codes';
import { fhirCode } from '../../fhir-core/data-types/primitive/primitive-types';
import { InvalidCodeError } from '../../fhir-core/errors/InvalidCodeError';

/* istanbul ignore file */
/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR CodeSystem: ConsentStateEnum
 *
 * Used for testing purposes only!
 */
export class ConsentStateEnum implements IFhirCodeEnum {
  public static readonly DRAFT = new FhirCodeDefinition('DRAFT', `draft`, `http://hl7.org/fhir/consent-state-codes`);
  public static readonly PROPOSED = new FhirCodeDefinition(
    'PROPOSED',
    `proposed`,
    `http://hl7.org/fhir/consent-state-codes`,
  );
  public static readonly ACTIVE = new FhirCodeDefinition('ACTIVE', `active`, `http://hl7.org/fhir/consent-state-codes`);
  public static readonly REJECTED = new FhirCodeDefinition(
    'REJECTED',
    `rejected`,
    `http://hl7.org/fhir/consent-state-codes`,
  );
  public static readonly INACTIVE = new FhirCodeDefinition(
    'INACTIVE',
    `inactive`,
    `http://hl7.org/fhir/consent-state-codes`,
  );
  public static readonly ENTERED_IN_ERROR = new FhirCodeDefinition(
    'ENTERED_IN_ERROR',
    `entered-in-error`,
    `http://hl7.org/fhir/consent-state-codes`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      ConsentStateEnum.DRAFT,
      ConsentStateEnum.PROPOSED,
      ConsentStateEnum.ACTIVE,
      ConsentStateEnum.REJECTED,
      ConsentStateEnum.INACTIVE,
      ConsentStateEnum.ENTERED_IN_ERROR,
      ConsentStateEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (ConsentStateEnum.DRAFT.code === code) {
      return ConsentStateEnum.DRAFT;
    } else if (ConsentStateEnum.PROPOSED.code === code) {
      return ConsentStateEnum.PROPOSED;
    } else if (ConsentStateEnum.ACTIVE.code === code) {
      return ConsentStateEnum.ACTIVE;
    } else if (ConsentStateEnum.REJECTED.code === code) {
      return ConsentStateEnum.REJECTED;
    } else if (ConsentStateEnum.INACTIVE.code === code) {
      return ConsentStateEnum.INACTIVE;
    } else if (ConsentStateEnum.ENTERED_IN_ERROR.code === code) {
      return ConsentStateEnum.ENTERED_IN_ERROR;
    } else if (ConsentStateEnum.NULL.code === code) {
      return ConsentStateEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown ConsentStateEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
