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
import {
  ChoiceDatatypeDef,
  ChoiceDataTypes,
  ChoiceDataTypesMeta,
  getChoiceDatatypeDefs,
} from '@src/fhir-core/utility/decorators';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { MockResource, MockTask } from '../../test-utils';

describe('decorators', () => {
  describe('ChoiceDataTypesMeta', () => {
    it('should throw AssertionError for multiple Datatypes in @ChoiceDataTypesMeta', () => {
      const t = () => {
        const TestClass = class {
          @ChoiceDataTypesMeta(['id', 'string', 'id'])
          protected value?: DataType | undefined;
        };
        new TestClass();
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`choiceDataTypes contains duplicate FhirDataType(s)`);
    });

    it('should throw AssertionError for invalid Datatypes in @ChoiceDataTypesMeta', () => {
      const t = () => {
        const TestClass = class {
          // @ts-expect-error: allow 'invalid' for testing
          @ChoiceDataTypesMeta(['id', 'string', 'invalid'])
          protected value?: DataType | undefined;
        };
        new TestClass();
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`choiceDataTypes contains invalid FhirDataType(s)`);
    });

    it('should empty decorator metadata for empty array in @ChoiceDataTypesMeta', () => {
      const TestClass = class {
        @ChoiceDataTypesMeta([])
        protected value?: DataType | undefined;
      };
      const choiceDatatypeDefs: ChoiceDatatypeDef[] = getChoiceDatatypeDefs(TestClass[Symbol.metadata]);
      expect(choiceDatatypeDefs).toBeDefined();
      expect(choiceDatatypeDefs).toHaveLength(1);
      expect(choiceDatatypeDefs[0]?.fieldTypes).toHaveLength(0);
    });

    it('should return with valid decorator metadata', () => {
      const choiceDatatypeDefs: ChoiceDatatypeDef[] = getChoiceDatatypeDefs(MockTaskR1[Symbol.metadata]);
      expect(choiceDatatypeDefs).toBeDefined();

      // *** Actual content ***
      // console.log(MockTaskR1[Symbol.metadata]);
      // [Object: null prototype] {
      //   ChoiceDataTypes: [
      //     { fieldName: 'value1', fieldTypes: [Array] },
      //     { fieldName: 'value2', fieldTypes: [Array] }
      //   ]
      // }
      // console.log(metaObj);
      // {
      //   ChoiceDataTypes: [
      //     { fieldName: 'value1', fieldTypes: [Array] },
      //     { fieldName: 'value2', fieldTypes: [Array] }
      //   ]
      // }
      // console.log(metaObj.ChoiceDataTypes);
      // [
      //   { fieldName: 'value1', fieldTypes: [ 'id', 'string' ] },
      //   { fieldName: 'value2', fieldTypes: [ 'uri', 'uuid' ] }
      // ]

      const expected: ChoiceDatatypeDef[] = [
        {
          fieldName: 'value1',
          fieldTypes: ['id', 'string'],
        },
        {
          fieldName: 'value2',
          fieldTypes: ['uri', 'uuid'],
        },
      ];
      expect(choiceDatatypeDefs).toEqual(expected);
    });
  });

  describe('ChoiceDataTypes', () => {
    it('should throw AssertionError with invalid Resource value', () => {
      const testValue = new MockResource();
      const testMockTaskR1 = new MockTaskR1();
      const t = () => {
        // @ts-expect-error: allow for testing
        testMockTaskR1.setValue1(testValue);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Decorator expects setValue1 to have one argument with type of 'DataType | undefined | null'`);
    });

    it('should throw AssertionError with invalid value DataType', () => {
      const markdown = 'markdown' as fhirMarkdown;
      const testValue = new MarkdownType(markdown);
      const testMockTaskR1 = new MockTaskR1();
      const t = () => {
        testMockTaskR1.setValue1(testValue);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`setValue1: 'value' argument type (markdown) is not for a supported DataType`);
    });

    it('should return with provided value DataType for empty array in @ChoiceDataTypesMeta', () => {
      const TestClass = class {
        @ChoiceDataTypesMeta([])
        protected value?: DataType | undefined;
        @ChoiceDataTypes()
        public setValue(value?: DataType): this {
          this.value = value;
          return this;
        }
        public getValue(): DataType | undefined {
          return this.value;
        }
      };
      const testValue = new StringType('string value');
      const testInstance = new TestClass();
      testInstance.setValue(testValue);
      expect(testInstance.getValue()).toStrictEqual(testValue);
    });

    it('should return with valid value DataType', () => {
      const testValue = new StringType('string value');
      const testMockTaskR1 = new MockTaskR1();
      testMockTaskR1.setValue1(testValue);
      expect(testMockTaskR1.getValue1()).toStrictEqual(testValue);
    });

    it('should return with undefined method arg', () => {
      const testMockTaskR1 = new MockTaskR1();
      testMockTaskR1.setValue1(undefined);
      expect(testMockTaskR1.getValue1()).toBeUndefined();
    });

    it('should return with null method arg', () => {
      const testMockTaskR1 = new MockTaskR1();
      // @ts-expect-error: allow for testing
      testMockTaskR1.setValue1(null);
      expect(testMockTaskR1.getValue1()).toBeNull();
    });

    it('should return with invalid method name', () => {
      const TestClass = class {
        @ChoiceDataTypesMeta(['string'])
        protected value?: DataType | undefined;
        @ChoiceDataTypes()
        public xxxValue(value?: DataType): this {
          this.value = value;
          return this;
        }
        public getValue(): DataType | undefined {
          return this.value;
        }
      };

      const testInstance = new TestClass();
      const testValue = new StringType('string value');
      testInstance.xxxValue(testValue);
      expect(testInstance.getValue()).toStrictEqual(testValue);
    });
  });
});

export class MockTaskR1 extends MockTask {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  @ChoiceDataTypesMeta(['id', 'string'])
  protected value1?: DataType | undefined;

  @ChoiceDataTypes()
  public setValue1(value?: DataType): this {
    this.value1 = value;
    return this;
  }
  public getValue1(): DataType | undefined {
    return this.value1;
  }

  @ChoiceDataTypesMeta(['uri', 'uuid'])
  protected value2?: DataType | undefined;

  @ChoiceDataTypes()
  public setValue2(value?: DataType): this {
    this.value2 = value;
    return this;
  }
  public getValue2(): DataType | undefined {
    return this.value2;
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
