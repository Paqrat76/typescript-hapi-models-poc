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

import { fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';

/* istanbul ignore file */
/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR CodeSystem: IdentifierUseEnum
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem IdentifierUse](http://hl7.org/fhir/identifier-use)
 */
export class IdentifierUseEnum implements IFhirCodeEnum {
  public static readonly USUAL = new FhirCodeDefinition(
    'USUAL',
    `usual`,
    `http://hl7.org/fhir/identifier-use`,
    `Usual`,
    `The identifier recommended for display and use in real-world interactions.`,
  );
  public static readonly OFFICIAL = new FhirCodeDefinition(
    'OFFICIAL',
    `official`,
    `http://hl7.org/fhir/identifier-use`,
    `Official`,
    `The identifier considered to be most trusted for the identification of this item. Sometimes also known as "primary" and "main". The determination of "official" is subjective and implementation guides often provide additional guidelines for use.`,
  );
  public static readonly TEMP = new FhirCodeDefinition(
    'TEMP',
    `temp`,
    `http://hl7.org/fhir/identifier-use`,
    `Temp`,
    `A temporary identifier.`,
  );
  public static readonly SECONDARY = new FhirCodeDefinition(
    'SECONDARY',
    `secondary`,
    `http://hl7.org/fhir/identifier-use`,
    `Secondary`,
    `An identifier that was assigned in secondary use - it serves to identify the object in a relative context, but cannot be consistently assigned to the same object again in a different context.`,
  );
  public static readonly OLD = new FhirCodeDefinition(
    'OLD',
    `old`,
    `http://hl7.org/fhir/identifier-use`,
    `Old`,
    `The identifier id no longer considered valid, but may be relevant for search purposes. E.g. Changes to identifier schemes, account merges, etc.`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      IdentifierUseEnum.USUAL,
      IdentifierUseEnum.OFFICIAL,
      IdentifierUseEnum.TEMP,
      IdentifierUseEnum.SECONDARY,
      IdentifierUseEnum.OLD,
      IdentifierUseEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (IdentifierUseEnum.USUAL.code === code) {
      return IdentifierUseEnum.USUAL;
    } else if (IdentifierUseEnum.OFFICIAL.code === code) {
      return IdentifierUseEnum.OFFICIAL;
    } else if (IdentifierUseEnum.TEMP.code === code) {
      return IdentifierUseEnum.TEMP;
    } else if (IdentifierUseEnum.SECONDARY.code === code) {
      return IdentifierUseEnum.SECONDARY;
    } else if (IdentifierUseEnum.OLD.code === code) {
      return IdentifierUseEnum.OLD;
    } else if (IdentifierUseEnum.NULL.code === code) {
      return IdentifierUseEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown IdentifierUseEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
