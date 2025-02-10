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
 * FHIR CodeSystem: ContributorTypeEnum
 *
 * Used for testing purposes only!
 */
export class ContributorTypeEnum implements IFhirCodeEnum {
  public static readonly AUTHOR = new FhirCodeDefinition('AUTHOR', `author`, `http://hl7.org/fhir/contributor-type`);
  public static readonly EDITOR = new FhirCodeDefinition('EDITOR', `editor`, `http://hl7.org/fhir/contributor-type`);
  public static readonly REVIEWER = new FhirCodeDefinition(
    'REVIEWER',
    `reviewer`,
    `http://hl7.org/fhir/contributor-type`,
  );
  public static readonly ENDORSER = new FhirCodeDefinition(
    'ENDORSER',
    `endorser`,
    `http://hl7.org/fhir/contributor-type`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      ContributorTypeEnum.AUTHOR,
      ContributorTypeEnum.EDITOR,
      ContributorTypeEnum.REVIEWER,
      ContributorTypeEnum.ENDORSER,
      ContributorTypeEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (ContributorTypeEnum.AUTHOR.code === code) {
      return ContributorTypeEnum.AUTHOR;
    } else if (ContributorTypeEnum.EDITOR.code === code) {
      return ContributorTypeEnum.EDITOR;
    } else if (ContributorTypeEnum.REVIEWER.code === code) {
      return ContributorTypeEnum.REVIEWER;
    } else if (ContributorTypeEnum.ENDORSER.code === code) {
      return ContributorTypeEnum.ENDORSER;
    } else if (ContributorTypeEnum.NULL.code === code) {
      return ContributorTypeEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown ContributorTypeEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
