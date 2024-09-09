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

import { FHIR_MAX_STRING_LENGTH } from '@src/fhir-core/data-types/primitive/primitive-types';
import { IBase } from '@src/fhir-core/base-models/IBase';

export {
  FHIR_MIN_INTEGER,
  FHIR_MAX_INTEGER,
  FHIR_MIN_INTEGER64,
  FHIR_MAX_INTEGER64,
} from '@src/fhir-core/data-types/primitive/primitive-types';

export const TOO_BIG_STRING = getString(FHIR_MAX_STRING_LENGTH + 2);

export function getString(maxLength: number): string {
  // https://www.geeksforgeeks.org/javascript-program-for-generating-a-string-of-specific-length/#using-for-loop
  let str = '';
  const characters = '!( abcdefghijklmnopqrstuvwxyz . ABCDEFGHIJKLMNOPQRSTUVWXYZ )?';
  const charLen = characters.length;

  for (let i = 0; i < maxLength; i++) {
    // Generating a random index
    const idx = Math.floor(Math.random() * charLen);
    str += characters.charAt(idx);
  }

  return str;
}

export class MockFhirModel implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor,@typescript-eslint/no-empty-function
  constructor() {}

  public fhirType(): string {
    return 'MockFhirModel';
  }

  public isEmpty(): boolean {
    return true;
  }
}
