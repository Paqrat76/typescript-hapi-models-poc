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

import { AssertionError } from 'node:assert';
import { DataType } from '@src/fhir-core/base-models/core-fhir-models';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import { OpenDataTypes } from '@src/fhir-core/base-models/core-fhir-models';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { MockResource, MockTask } from '../../test-utils';

describe('OpenDataTypes', () => {
  it('should throw AssertionError with invalid value DataType', () => {
    const testValue = new MockResource();
    const testMockTaskR1 = new MockTaskR1();
    const t = () => {
      // @ts-expect-error: allow for testing
      testMockTaskR1.setValue(testValue);
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(
      `OpenDataTypes decorator on setValue (MockTaskR1.value[x]) expects a single argument to be type of 'DataType | undefined | null'`,
    );
  });

  it('should throw InvalidTypeError with unsupported value DataType', () => {
    const testValue = new XhtmlType();
    const testMockTaskR1 = new MockTaskR1();
    const t = () => {
      testMockTaskR1.setValue(testValue);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(
      `OpenDataTypes decorator on setValue (MockTaskR1.value[x]) expects the 'value' argument type (xhtml) to be a supported DataType`,
    );
  });

  it('should return with valid value DataType', () => {
    const testValue = new StringType('string value');
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.setValue(testValue);
    expect(testMockTaskR1.getValue()).toStrictEqual(testValue);
  });

  it('should return with invalid method name', () => {
    const testValue = new StringType('string value');
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.xxxValue(testValue);
    expect(testMockTaskR1.getValue()).toStrictEqual(testValue);
  });

  it('should return with undefined method arg', () => {
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.setValue(undefined);
    expect(testMockTaskR1.getValue()).toBeUndefined();
  });

  it('should return with null method arg', () => {
    const testMockTaskR1 = new MockTaskR1();
    // @ts-expect-error: allow for testing
    testMockTaskR1.setValue(null);
    expect(testMockTaskR1.getValue()).toBeNull();
  });
});

export class MockTaskR1 extends MockTask {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  protected value?: DataType | undefined;

  @OpenDataTypes('MockTaskR1.value[x]')
  public setValue(value?: DataType): this {
    this.value = value;
    return this;
  }
  public getValue(): DataType | undefined {
    return this.value;
  }

  @OpenDataTypes('MockTaskR1.value[x]')
  public xxxValue(value?: DataType): this {
    this.value = value;
    return this;
  }

  public override fhirType(): string {
    return 'MockTaskR1';
  }

  public override copy(): MockTaskR1 {
    const dest = new MockTaskR1();
    this.copyValues(dest);
    return dest;
  }
}
