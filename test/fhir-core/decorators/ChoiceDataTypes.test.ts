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
import { MarkdownType } from '@src/fhir-core/data-types/primitive/MarkdownType';
import { fhirMarkdown } from '@src/fhir-core/data-types/primitive/primitive-types';
import { ChoiceDataTypes } from '@src/fhir-core/utility/decorators';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { MockResource, MockTask } from '../../test-utils';

describe('ChoiceDataTypes', () => {
  it('should throw AssertionError with duplicate ChoiceDataTypes', () => {
    const testValue = new StringType('string value');
    const testMockTaskR1 = new MockTaskR1();
    const t = () => {
      testMockTaskR1.setValue1(testValue);
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(`choiceDataTypes contains duplicate DataTypes`);
  });

  it('should throw AssertionError with invalid ChoiceDataTypes', () => {
    const testValue = new StringType('string value');
    const testMockTaskR1 = new MockTaskR1();
    const t = () => {
      testMockTaskR1.setValue2(testValue);
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(`choiceDataTypes contains invalid FhirDataType(s)`);
  });

  it('should throw AssertionError with invalid value DataType', () => {
    const testValue = new MockResource();
    const testMockTaskR1 = new MockTaskR1();
    const t = () => {
      // @ts-expect-error: allow for testing
      testMockTaskR1.setValue3(testValue);
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(`Decorator expects setValue3 to have one argument with type of 'DataType | undefined | null'`);
  });

  it('should throw AssertionError with invalid value DataType', () => {
    const markdown = 'markdown' as fhirMarkdown;
    const testValue = new MarkdownType(markdown);
    const testMockTaskR1 = new MockTaskR1();
    const t = () => {
      testMockTaskR1.setValue3(testValue);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`setValue3: 'value' argument type (markdown) is not for a supported DataType`);
  });

  it('should return with valid value DataType', () => {
    const testValue = new StringType('string value');
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.setValue3(testValue);
    expect(testMockTaskR1.getValue3()).toStrictEqual(testValue);
  });

  it('should return with empty ChoiceDataTypes', () => {
    const testValue = new StringType('string value');
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.setValue4(testValue);
    expect(testMockTaskR1.getValue4()).toStrictEqual(testValue);
  });

  it('should return with invalid method name', () => {
    const testValue = new StringType('string value');
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.xxxValue5(testValue);
    expect(testMockTaskR1.getValue5()).toStrictEqual(testValue);
  });

  it('should return with undefined method arg', () => {
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.setValue3(undefined);
    expect(testMockTaskR1.getValue3()).toBeUndefined();
  });

  it('should return with null method arg', () => {
    const testMockTaskR1 = new MockTaskR1();
    // @ts-expect-error: allow for testing
    testMockTaskR1.setValue3(null);
    expect(testMockTaskR1.getValue3()).toBeNull();
  });
});

export class MockTaskR1 extends MockTask {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  protected value1?: DataType | undefined;

  @ChoiceDataTypes(['id', 'string', 'id'])
  public setValue1(value?: DataType): this {
    this.value1 = value;
    return this;
  }

  protected value2?: DataType | undefined;

  // @ts-expect-error: allow for testing
  @ChoiceDataTypes(['id', 'string', 'invalid'])
  public setValue2(value?: DataType): this {
    this.value2 = value;
    return this;
  }

  protected value3?: DataType | undefined;

  @ChoiceDataTypes(['id', 'string'])
  public setValue3(value?: DataType): this {
    this.value3 = value;
    return this;
  }
  public getValue3(): DataType | undefined {
    return this.value3;
  }

  protected value4?: DataType | undefined;

  @ChoiceDataTypes([])
  public setValue4(value?: DataType): this {
    this.value4 = value;
    return this;
  }
  public getValue4(): DataType | undefined {
    return this.value4;
  }

  protected value5?: DataType | undefined;

  @ChoiceDataTypes(['string'])
  public xxxValue5(value?: DataType): this {
    this.value4 = value;
    return this;
  }
  public getValue5(): DataType | undefined {
    return this.value4;
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
