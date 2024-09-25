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

/**
 * Common FHIR related utilities
 *
 * @module
 */

import { strict as assert } from 'node:assert';
import { isEmpty as _isEmpty } from 'lodash';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { isNonBlank } from '@src/fhir-core/utility/common-util';
import { fhirUriSchema } from '@src/fhir-core/data-types/primitive/primitive-types';

/**
 * Determine if all the provided elements are empty
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR ca.uhn.fhir-core.util.ElementUtil
 *
 * @param elements - FHIR instance's data elements
 * @returns `true` if all provided elements are empty; `false` if at least one element is not empty
 *
 * @category Utilities
 */
export function isElementEmpty(...elements: (IBase | IBase[] | undefined | null)[]): boolean {
  if (elements.length === 1 && _isEmpty(elements[0])) {
    return true;
  } else {
    for (const element of elements) {
      if (Array.isArray(element)) {
        // IBase[]
        for (const item of element) {
          if (!item.isEmpty()) {
            return false;
          }
        }
      } else {
        // IBase or undefined
        if (element !== undefined && element !== null && !element.isEmpty()) {
          return false;
        }
      }
    }
  }
  return true;
}

/**
 * Validate the provided url. The url must be a non-blank valid fhirUri.
 *
 * @param url - url to test
 * @throws AssertionError for invalid url
 *
 * @category Utilities
 */
export function validateUrl(url: string): void {
  assert(isNonBlank(url), 'The url must be defined and cannot be blank');
  const parseResult = fhirUriSchema.safeParse(url);
  assert(parseResult.success, 'The url must be a valid fhirUri');
}
