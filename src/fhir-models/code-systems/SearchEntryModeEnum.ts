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
 * FHIR CodeSystem: SearchEntryModeEnum
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem SearchEntryMode](http://hl7.org/fhir/search-entry-mode)
 */
export class SearchEntryModeEnum implements IFhirCodeEnum {
  public static readonly MATCH = new FhirCodeDefinition(
    'MATCH',
    `match`,
    `http://hl7.org/fhir/search-entry-mode`,
    `Match`,
    `This resource matched the search specification.`,
  );
  public static readonly INCLUDE = new FhirCodeDefinition(
    'INCLUDE',
    `include`,
    `http://hl7.org/fhir/search-entry-mode`,
    `Include`,
    `This resource is returned because it is referred to from another resource in the search set.`,
  );
  public static readonly OUTCOME = new FhirCodeDefinition(
    'OUTCOME',
    `outcome`,
    `http://hl7.org/fhir/search-entry-mode`,
    `Outcome`,
    `An OperationOutcome that provides additional information about the processing of a search.`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      SearchEntryModeEnum.MATCH,
      SearchEntryModeEnum.INCLUDE,
      SearchEntryModeEnum.OUTCOME,
      SearchEntryModeEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (SearchEntryModeEnum.MATCH.code === code) {
      return SearchEntryModeEnum.MATCH;
    } else if (SearchEntryModeEnum.INCLUDE.code === code) {
      return SearchEntryModeEnum.INCLUDE;
    } else if (SearchEntryModeEnum.OUTCOME.code === code) {
      return SearchEntryModeEnum.OUTCOME;
    } else if (SearchEntryModeEnum.NULL.code === code) {
      return SearchEntryModeEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown SearchEntryModeEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
