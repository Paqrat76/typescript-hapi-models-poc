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

import { Base } from '@src/fhir-core/base-models/Base';
import { MockBase } from '../../test-utils';

describe('Base', () => {
  it('should be properly instantiated', () => {
    const mockBase = new MockBase();
    expect(mockBase).toBeDefined();
    expect(mockBase).toBeInstanceOf(Base);
    expect(mockBase.constructor.name).toStrictEqual('MockBase');
    expect(mockBase.mockValue).toBeUndefined();
    expect(mockBase.fhirType()).toStrictEqual('MockBase');
    expect(mockBase.isEmpty()).toBe(true);
  });

  it('should correctly execute copy()', () => {
    const testString = 'testValue';
    const mockBase = new MockBase(testString);
    expect(mockBase).toBeDefined();
    expect(mockBase.mockValue).toBeDefined();
    expect(mockBase.mockValue).toStrictEqual(testString);
    expect(mockBase.fhirType()).toStrictEqual('MockBase');
    expect(mockBase.isEmpty()).toBe(false);

    const testBase = mockBase.copy();
    expect(testBase).toBeDefined();
    expect(mockBase.mockValue).toBeDefined();
    expect(mockBase.mockValue).toStrictEqual(testString);
    expect(testBase.fhirType()).toStrictEqual('MockBase');
    expect(testBase.isEmpty()).toBe(false);
  });

  it('should return expected values for hasFireType()', () => {
    const mockBase = new MockBase();
    expect(mockBase.hasFireType('MockBase')).toBe(true);
    expect(mockBase.hasFireType('MockBase', 'TypeA', 'TypeB')).toBe(true);
    expect(mockBase.hasFireType('TypeA', 'MockBase', 'TypeB')).toBe(true);
    expect(mockBase.hasFireType('InvalidType')).toBe(false);
  });

  it('should return default value of false for all is[Type] methods', () => {
    const mockBase = new MockBase();
    // The is[Type] methods default to false and must be overridden in subclasses as appropriate
    expect(mockBase.isResource()).toBe(false);
    expect(mockBase.isComplexDataType()).toBe(false);
    expect(mockBase.isPrimitive()).toBe(false);
    expect(mockBase.isBooleanPrimitive()).toBe(false);
    expect(mockBase.isStringPrimitive()).toBe(false);
    expect(mockBase.isNumberPrimitive()).toBe(false);
    expect(mockBase.isBigIntPrimitive()).toBe(false);
    expect(mockBase.isDateTimePrimitive()).toBe(false);
  });
});
