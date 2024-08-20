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

import { isEmpty as _isEmpty } from 'lodash';
import { Base } from '@src/fhir/base-models/Base';

describe('Base', () => {
  it('should be properly instantiated', () => {
    const mockBase = new MockBase();
    expect(mockBase).toBeDefined();
    expect(mockBase).toBeInstanceOf(Base);
    expect(mockBase.constructor.name).toStrictEqual('MockBase');
    expect(mockBase.mockValue).toBeUndefined();
    expect(mockBase.fhirType()).toStrictEqual('Base');
    expect(mockBase.isEmpty()).toBe(true);
  });

  it('should correctly execute copy()', () => {
    const testString = 'testValue';
    const mockBase = new MockBase(testString);
    expect(mockBase).toBeDefined();
    expect(mockBase.mockValue).toBeDefined();
    expect(mockBase.mockValue).toStrictEqual(testString);
    expect(mockBase.fhirType()).toStrictEqual('Base');
    expect(mockBase.isEmpty()).toBe(false);

    const testBase = mockBase.copy();
    expect(testBase).toBeDefined();
    expect(mockBase.mockValue).toBeDefined();
    expect(mockBase.mockValue).toStrictEqual(testString);
    expect(testBase.fhirType()).toStrictEqual('Base');
    expect(testBase.isEmpty()).toBe(false);
  });
});

class MockBase extends Base {
  public mockValue: string | undefined = undefined;

  constructor(value?: string) {
    super();
    if (value) {
      this.mockValue = value;
    }
  }

  public fhirType(): string {
    return 'Base';
  }

  public isEmpty(): boolean {
    return _isEmpty(this.mockValue);
  }

  public copy(): MockBase {
    const dest = new MockBase();
    this.copyValues(dest);
    return dest;
  }

  public copyValues(dest: MockBase): void {
    dest.mockValue = this.mockValue;
  }
}
