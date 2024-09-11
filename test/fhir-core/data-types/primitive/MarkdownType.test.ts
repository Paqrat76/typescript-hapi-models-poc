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

import { TOO_BIG_STRING } from '../../../test-utils';
import { MarkdownType } from '@src/fhir-core/data-types/primitive/MarkdownType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { fhirMarkdown } from '@src/fhir-core/data-types/primitive/primitive-types';

describe('MarkdownType', () => {
  const VALID_MARKDOWN = 'This is a **valid** _string_.' as fhirMarkdown;
  const VALID_MARKDOWN_2 = 'This is another **valid** _string_!' as fhirMarkdown;
  const EMPTY_STRING = '' as fhirMarkdown;

  it('should be properly instantiated as empty', () => {
    const testMarkdownType = new MarkdownType();
    expect(testMarkdownType).toBeDefined();
    expect(testMarkdownType).toBeInstanceOf(MarkdownType);
    expect(testMarkdownType).toBeInstanceOf(PrimitiveType);
    expect(testMarkdownType.constructor.name).toStrictEqual('MarkdownType');
    expect(testMarkdownType.fhirType()).toStrictEqual('markdown');
    expect(testMarkdownType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testMarkdownType.hasId()).toBe(false);
    expect(testMarkdownType.getId()).toBeUndefined();
    expect(testMarkdownType.hasExtension()).toBe(false);
    expect(testMarkdownType.getExtension()).toMatchObject([] as Extension[]);
    // primitive value properties
    expect(testMarkdownType.hasValue()).toBe(false);
    expect(testMarkdownType.getValue()).toBeUndefined();
    expect(testMarkdownType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testMarkdownType = new MarkdownType(VALID_MARKDOWN);
    expect(testMarkdownType).toBeDefined();
    expect(testMarkdownType).toBeInstanceOf(MarkdownType);
    expect(testMarkdownType.constructor.name).toStrictEqual('MarkdownType');
    expect(testMarkdownType.fhirType()).toStrictEqual('markdown');
    expect(testMarkdownType.isEmpty()).toBe(false);

    expect(testMarkdownType.hasValue()).toBe(true);
    expect(testMarkdownType.getValue()).toBeDefined();
    expect(testMarkdownType.getValue()).toStrictEqual(VALID_MARKDOWN);
    expect(testMarkdownType.getValueAsString()).toStrictEqual(VALID_MARKDOWN);
  });

  it('should throw PrimitiveTypeError when initialized with empty value', () => {
    const t = () => {
      new MarkdownType(EMPTY_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for MarkdownType');
  });

  it('should throw PrimitiveTypeError when initialized with too big value', () => {
    const t = () => {
      new MarkdownType(TOO_BIG_STRING as fhirMarkdown);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for MarkdownType');
  });

  it('should be properly reset by setValue()', () => {
    const testMarkdownType = new MarkdownType(VALID_MARKDOWN);
    expect(testMarkdownType.isEmpty()).toBe(false);
    expect(testMarkdownType.hasValue()).toBe(true);
    expect(testMarkdownType.getValue()).toBeDefined();
    expect(testMarkdownType.getValue()).toStrictEqual(VALID_MARKDOWN);
    expect(testMarkdownType.getValueAsString()).toStrictEqual(VALID_MARKDOWN);

    testMarkdownType.setValue(VALID_MARKDOWN_2);
    expect(testMarkdownType.isEmpty()).toBe(false);
    expect(testMarkdownType.hasValue()).toBe(true);
    expect(testMarkdownType.getValue()).toBeDefined();
    expect(testMarkdownType.getValue()).toStrictEqual(VALID_MARKDOWN_2);
    expect(testMarkdownType.getValueAsString()).toStrictEqual(VALID_MARKDOWN_2);

    testMarkdownType.setValue();
    expect(testMarkdownType.isEmpty()).toBe(true);
    expect(testMarkdownType.hasValue()).toBe(false);
    expect(testMarkdownType.getValue()).toBeUndefined();
    expect(testMarkdownType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with empty value', () => {
    const testMarkdownType = new MarkdownType();
    const t = () => {
      testMarkdownType.setValue(EMPTY_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for MarkdownType');
  });

  it('should throw PrimitiveTypeError when setValue() with too big value', () => {
    const testMarkdownType = new MarkdownType();
    const t = () => {
      testMarkdownType.setValue(TOO_BIG_STRING as fhirMarkdown);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for MarkdownType');
  });

  it('should properly setValueAsString() with correct values', () => {
    const testMarkdownType = new MarkdownType(VALID_MARKDOWN);
    testMarkdownType.setValueAsString(VALID_MARKDOWN_2);
    expect(testMarkdownType.getValue()).toStrictEqual(VALID_MARKDOWN_2);
    testMarkdownType.setValueAsString();
    expect(testMarkdownType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with empty value', () => {
    const testMarkdownType = new MarkdownType();
    const t = () => {
      testMarkdownType.setValueAsString(EMPTY_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for MarkdownType');
  });

  it('should throw PrimitiveTypeError when setValueAsString() with too big value', () => {
    const testMarkdownType = new MarkdownType();
    const t = () => {
      testMarkdownType.setValueAsString(TOO_BIG_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for MarkdownType');
  });

  it('should properly encodeToString with correct values', () => {
    const testMarkdownType = new MarkdownType();
    expect(testMarkdownType.encodeToString(VALID_MARKDOWN)).toStrictEqual(VALID_MARKDOWN);
  });

  it('should throw PrimitiveTypeError when encodeToString() with empty value', () => {
    const testMarkdownType = new MarkdownType();
    const t = () => {
      testMarkdownType.encodeToString(EMPTY_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for MarkdownType');
  });

  it('should throw PrimitiveTypeError when encodeToString() with too big value', () => {
    const testMarkdownType = new MarkdownType();
    const t = () => {
      testMarkdownType.encodeToString(TOO_BIG_STRING as fhirMarkdown);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for MarkdownType');
  });

  it('should properly parseToPrimitive with correct values', () => {
    const testMarkdownType = new MarkdownType();
    expect(testMarkdownType.parseToPrimitive(VALID_MARKDOWN)).toStrictEqual(VALID_MARKDOWN);
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with empty value', () => {
    const testMarkdownType = new MarkdownType();
    const t = () => {
      testMarkdownType.parseToPrimitive(EMPTY_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for MarkdownType');
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with too big value', () => {
    const testMarkdownType = new MarkdownType();
    const t = () => {
      testMarkdownType.parseToPrimitive(TOO_BIG_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for MarkdownType');
  });

  it('should properly copy()', () => {
    const markdownType = new MarkdownType(VALID_MARKDOWN);
    const testMarkdownType = markdownType.copy();
    expect(testMarkdownType).toBeDefined();
    expect(testMarkdownType).toBeInstanceOf(MarkdownType);
    expect(testMarkdownType.constructor.name).toStrictEqual('MarkdownType');
    expect(testMarkdownType.fhirType()).toStrictEqual('markdown');
    expect(testMarkdownType.isEmpty()).toBe(false);
    expect(testMarkdownType.hasValue()).toBe(true);
    expect(testMarkdownType.getValue()).toBeDefined();
    expect(testMarkdownType.getValue()).toStrictEqual(VALID_MARKDOWN);
    expect(testMarkdownType.getValueAsString()).toStrictEqual(VALID_MARKDOWN);
  });
});
