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

import { Period } from '@src/fhir-core/data-types/complex/Period';
import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

describe('Period', () => {
  const VALID_START_DATETIME = `2017-01-01T00:00:00.000Z`;
  const VALID_START_DATETIME_2 = `2017-01-01T00:15:00.000Z`;
  const VALID_END_DATETIME = `2017-01-01T01:00:00.000Z`;
  const VALID_END_DATETIME_2 = `2017-01-01T01:15:00.000Z`;
  const INVALID_DATETIME = `invalid date time`;
  const INVALID_DATETIME_TYPE = new StringType(`invalid date time`);
  const UNDEFINED_DATETIME = undefined;

  describe('Core', () => {
    const expectedJson1 = { start: VALID_START_DATETIME, end: VALID_END_DATETIME };
    const expectedJson2 = { start: VALID_START_DATETIME, end: VALID_START_DATETIME };
    const expectedJson3a = { start: VALID_START_DATETIME };
    const expectedJson3b = { end: VALID_END_DATETIME };

    it('should be properly instantiated as empty', () => {
      const testPeriod = new Period();
      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(true);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(false);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType());
      expect(testPeriod.hasEndElement()).toBe(false);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType());

      expect(testPeriod.hasStart()).toBe(false);
      expect(testPeriod.getStart()).toBeUndefined();
      expect(testPeriod.hasEnd()).toBe(false);
      expect(testPeriod.getEnd()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const periodType = new Period();
      periodType.setStart(VALID_START_DATETIME);
      periodType.setEnd(VALID_END_DATETIME);
      let testPeriod = periodType.copy();

      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(false);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toEqual(expectedJson1);

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(true);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType(VALID_START_DATETIME));
      expect(testPeriod.hasEndElement()).toBe(true);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType(VALID_END_DATETIME));

      expect(testPeriod.hasStart()).toBe(true);
      expect(testPeriod.getStart()).toStrictEqual(VALID_START_DATETIME);
      expect(testPeriod.hasEnd()).toBe(true);
      expect(testPeriod.getEnd()).toStrictEqual(VALID_END_DATETIME);

      periodType.setStart(UNDEFINED_DATETIME);
      periodType.setEnd(UNDEFINED_DATETIME);
      testPeriod = periodType.copy();
      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(true);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(false);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType());
      expect(testPeriod.hasEndElement()).toBe(false);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType());

      expect(testPeriod.hasStart()).toBe(false);
      expect(testPeriod.getStart()).toBeUndefined();
      expect(testPeriod.hasEnd()).toBe(false);
      expect(testPeriod.getEnd()).toBeUndefined();
    });

    // Tests using primitives

    it('should be properly initialized by primitive values', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME);
      testPeriod.setEnd(VALID_END_DATETIME);
      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(false);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toEqual(expectedJson1);

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(true);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType(VALID_START_DATETIME));
      expect(testPeriod.hasEndElement()).toBe(true);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType(VALID_END_DATETIME));

      expect(testPeriod.hasStart()).toBe(true);
      expect(testPeriod.getStart()).toStrictEqual(VALID_START_DATETIME);
      expect(testPeriod.hasEnd()).toBe(true);
      expect(testPeriod.getEnd()).toStrictEqual(VALID_END_DATETIME);
    });

    it('should be properly initialized by primitive values when start and end are the same', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME);
      testPeriod.setEnd(VALID_START_DATETIME);
      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(false);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toEqual(expectedJson2);

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(true);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType(VALID_START_DATETIME));
      expect(testPeriod.hasEndElement()).toBe(true);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType(VALID_START_DATETIME));

      expect(testPeriod.hasStart()).toBe(true);
      expect(testPeriod.getStart()).toStrictEqual(VALID_START_DATETIME);
      expect(testPeriod.hasEnd()).toBe(true);
      expect(testPeriod.getEnd()).toStrictEqual(VALID_START_DATETIME);
    });

    it('should be properly initialized by primitive values with only start', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME);
      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(false);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toEqual(expectedJson3a);

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(true);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType(VALID_START_DATETIME));
      expect(testPeriod.hasEndElement()).toBe(false);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType());

      expect(testPeriod.hasStart()).toBe(true);
      expect(testPeriod.getStart()).toStrictEqual(VALID_START_DATETIME);
      expect(testPeriod.hasEnd()).toBe(false);
      expect(testPeriod.getEnd()).toBeUndefined();
    });

    it('should be properly initialized by primitive values with only end', () => {
      const testPeriod = new Period();
      testPeriod.setEnd(VALID_END_DATETIME);
      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(false);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toEqual(expectedJson3b);

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(false);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType());
      expect(testPeriod.hasEndElement()).toBe(true);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType(VALID_END_DATETIME));

      expect(testPeriod.hasStart()).toBe(false);
      expect(testPeriod.getStart()).toBeUndefined();
      expect(testPeriod.hasEnd()).toBe(true);
      expect(testPeriod.getEnd()).toStrictEqual(VALID_END_DATETIME);
    });

    it('should throw PrimitiveTypeError when initialized with invalid primitive Period.start value', () => {
      const testPeriod = new Period();
      const t = () => {
        testPeriod.setStart(INVALID_DATETIME);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Period.start (${INVALID_DATETIME})`);
    });

    it('should throw PrimitiveTypeError when initialized with invalid primitive Period.end value', () => {
      const testPeriod = new Period();
      const t = () => {
        testPeriod.setEnd(INVALID_DATETIME);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Period.end (${INVALID_DATETIME})`);
    });

    it('should be properly reset by modifying Period.start and Period.end with primitive values', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME);
      testPeriod.setEnd(VALID_END_DATETIME);
      expect(testPeriod).toBeDefined();
      expect(testPeriod.isEmpty()).toBe(false);

      testPeriod.setStart(VALID_START_DATETIME_2);
      testPeriod.setEnd(VALID_END_DATETIME_2);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(true);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType(VALID_START_DATETIME_2));
      expect(testPeriod.hasEndElement()).toBe(true);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType(VALID_END_DATETIME_2));

      expect(testPeriod.hasStart()).toBe(true);
      expect(testPeriod.getStart()).toStrictEqual(VALID_START_DATETIME_2);
      expect(testPeriod.hasEnd()).toBe(true);
      expect(testPeriod.getEnd()).toStrictEqual(VALID_END_DATETIME_2);
    });

    it('should be properly reset by modifying Period.start and Period.end with undefined primitive values', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME);
      testPeriod.setEnd(VALID_END_DATETIME);
      expect(testPeriod).toBeDefined();
      expect(testPeriod.isEmpty()).toBe(false);

      testPeriod.setStart(UNDEFINED_DATETIME);
      testPeriod.setEnd(UNDEFINED_DATETIME);
      expect(testPeriod.isEmpty()).toBe(true);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(false);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType());
      expect(testPeriod.hasEndElement()).toBe(false);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType());

      expect(testPeriod.hasStart()).toBe(false);
      expect(testPeriod.getStart()).toBeUndefined();
      expect(testPeriod.hasEnd()).toBe(false);
      expect(testPeriod.getEnd()).toBeUndefined();
    });

    it('should throw TypeError when modifying Period.start > Period.end with primitive', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME);
      testPeriod.setEnd(VALID_END_DATETIME);
      const t = () => {
        testPeriod.setStart(VALID_END_DATETIME_2);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow('Invalid Period; Period.start is not before or the same as Period.end');
    });

    it('should throw TypeError when modifying Period.end < Period.start with primitive', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME_2);
      testPeriod.setEnd(VALID_END_DATETIME_2);
      const t = () => {
        testPeriod.setEnd(VALID_START_DATETIME);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow('Invalid Period; Period.start is not before or the same as Period.end');
    });

    // Tests using DataType elements

    it('should be properly initialized by DataType element values', () => {
      const startDt = new DateTimeType(VALID_START_DATETIME);
      const endDt = new DateTimeType(VALID_END_DATETIME);

      const testPeriod = new Period();
      testPeriod.setStartElement(startDt);
      testPeriod.setEndElement(endDt);

      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(false);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toEqual(expectedJson1);

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(true);
      expect(testPeriod.getStartElement()).toEqual(startDt);
      expect(testPeriod.hasEndElement()).toBe(true);
      expect(testPeriod.getEndElement()).toEqual(endDt);

      expect(testPeriod.hasStart()).toBe(true);
      expect(testPeriod.getStart()).toStrictEqual(VALID_START_DATETIME);
      expect(testPeriod.hasEnd()).toBe(true);
      expect(testPeriod.getEnd()).toStrictEqual(VALID_END_DATETIME);
    });

    it('should be properly initialized by DataType element values when start and end are the same', () => {
      const startDt = new DateTimeType(VALID_START_DATETIME);
      const endDt = new DateTimeType(VALID_START_DATETIME);

      const testPeriod = new Period();
      testPeriod.setStartElement(startDt);
      testPeriod.setEndElement(endDt);
      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(false);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toEqual(expectedJson2);

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(true);
      expect(testPeriod.getStartElement()).toEqual(startDt);
      expect(testPeriod.hasEndElement()).toBe(true);
      expect(testPeriod.getEndElement()).toEqual(endDt);

      expect(testPeriod.hasStart()).toBe(true);
      expect(testPeriod.getStart()).toStrictEqual(VALID_START_DATETIME);
      expect(testPeriod.hasEnd()).toBe(true);
      expect(testPeriod.getEnd()).toStrictEqual(VALID_START_DATETIME);
    });

    it('should be properly initialized by DataType element values with only start', () => {
      const startDt = new DateTimeType(VALID_START_DATETIME);

      const testPeriod = new Period();
      testPeriod.setStartElement(startDt);
      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(false);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toEqual(expectedJson3a);

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(true);
      expect(testPeriod.getStartElement()).toEqual(startDt);
      expect(testPeriod.hasEndElement()).toBe(false);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType());

      expect(testPeriod.hasStart()).toBe(true);
      expect(testPeriod.getStart()).toStrictEqual(VALID_START_DATETIME);
      expect(testPeriod.hasEnd()).toBe(false);
      expect(testPeriod.getEnd()).toBeUndefined();
    });

    it('should be properly initialized by DataType element values with only end', () => {
      const endDt = new DateTimeType(VALID_END_DATETIME);

      const testPeriod = new Period();
      testPeriod.setEndElement(endDt);
      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(false);
      expect(testPeriod.isComplexDataType()).toBe(true);
      expect(testPeriod.toJSON()).toEqual(expectedJson3b);

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(false);
      expect(testPeriod.getId()).toBeUndefined();
      expect(testPeriod.hasExtension()).toBe(false);
      expect(testPeriod.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(false);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType());
      expect(testPeriod.hasEndElement()).toBe(true);
      expect(testPeriod.getEndElement()).toEqual(endDt);

      expect(testPeriod.hasStart()).toBe(false);
      expect(testPeriod.getStart()).toBeUndefined();
      expect(testPeriod.hasEnd()).toBe(true);
      expect(testPeriod.getEnd()).toStrictEqual(VALID_END_DATETIME);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Period.start value', () => {
      const testPeriod = new Period();
      const t = () => {
        // @ts-expect-error: ignore invalid type for test
        testPeriod.setStartElement(INVALID_DATETIME_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Period.start; Provided element is not an instance of DateTimeType.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Period.end value', () => {
      const testPeriod = new Period();
      const t = () => {
        // @ts-expect-error: ignore invalid type for test
        testPeriod.setEndElement(INVALID_DATETIME_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Period.end; Provided element is not an instance of DateTimeType.`);
    });

    it('should throw TypeError when initialized with DataType element Period.start > Period.end', () => {
      const startDt = new DateTimeType(VALID_END_DATETIME);
      const endDt = new DateTimeType(VALID_START_DATETIME);

      const testPeriod = new Period();
      testPeriod.setStartElement(startDt);
      const t = () => {
        testPeriod.setEndElement(endDt);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow('Invalid Period; Period.start is not before or the same as Period.end');
    });

    it('should be properly reset by modifying Period.start and Period.end with DataType element values', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME);
      testPeriod.setEnd(VALID_END_DATETIME);
      expect(testPeriod).toBeDefined();
      expect(testPeriod.isEmpty()).toBe(false);

      const startPlus15Min = new DateTimeType(VALID_START_DATETIME_2);
      testPeriod.setStartElement(startPlus15Min);
      const endPlus15Min = new DateTimeType(VALID_END_DATETIME_2);
      testPeriod.setEndElement(endPlus15Min);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(true);
      expect(testPeriod.getStartElement()).toEqual(startPlus15Min);
      expect(testPeriod.hasEndElement()).toBe(true);
      expect(testPeriod.getEndElement()).toEqual(endPlus15Min);

      expect(testPeriod.hasStart()).toBe(true);
      expect(testPeriod.getStart()).toStrictEqual(VALID_START_DATETIME_2);
      expect(testPeriod.hasEnd()).toBe(true);
      expect(testPeriod.getEnd()).toStrictEqual(VALID_END_DATETIME_2);
    });

    it('should be properly reset by modifying Period.start and Period.end with undefined DataType element values', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME);
      testPeriod.setEnd(VALID_END_DATETIME);
      expect(testPeriod).toBeDefined();
      expect(testPeriod.isEmpty()).toBe(false);

      testPeriod.setStartElement(UNDEFINED_DATETIME);
      testPeriod.setEndElement(UNDEFINED_DATETIME);
      expect(testPeriod.isEmpty()).toBe(true);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(false);
      expect(testPeriod.getStartElement()).toEqual(new DateTimeType());
      expect(testPeriod.hasEndElement()).toBe(false);
      expect(testPeriod.getEndElement()).toEqual(new DateTimeType());

      expect(testPeriod.hasStart()).toBe(false);
      expect(testPeriod.getStart()).toBeUndefined();
      expect(testPeriod.hasEnd()).toBe(false);
      expect(testPeriod.getEnd()).toBeUndefined();
    });

    it('should throw TypeError when modifying Period.start > Period.end with DataType element', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME);
      testPeriod.setEnd(VALID_END_DATETIME);
      const t = () => {
        testPeriod.setStartElement(new DateTimeType(VALID_END_DATETIME_2));
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow('Invalid Period; Period.start is not before or the same as Period.end');
    });

    it('should throw TypeError when modifying Period.end < Period.start with DataType element', () => {
      const testPeriod = new Period();
      testPeriod.setStart(VALID_START_DATETIME_2);
      testPeriod.setEnd(VALID_END_DATETIME_2);
      const t = () => {
        testPeriod.setEndElement(new DateTimeType(VALID_START_DATETIME));
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow('Invalid Period; Period.start is not before or the same as Period.end');
    });
  });

  describe('Serialization/Deserialization', () => {
    it('should properly create serialized content', () => {
      const startDt = new DateTimeType(VALID_START_DATETIME);
      const startId = 'S1357';
      const startExtension = new Extension('startUrl', new StringType('start extension string value'));
      startDt.setId(startId);
      startDt.addExtension(startExtension);
      const endDt = new DateTimeType(VALID_END_DATETIME);

      const testPeriod = new Period();
      const testId = 'id1234';
      testPeriod.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testPeriod.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testPeriod.addExtension(testExtension2);

      testPeriod.setStartElement(startDt);
      testPeriod.setEndElement(endDt);

      expect(testPeriod).toBeDefined();
      expect(testPeriod).toBeInstanceOf(DataType);
      expect(testPeriod).toBeInstanceOf(Period);
      expect(testPeriod.constructor.name).toStrictEqual('Period');
      expect(testPeriod.fhirType()).toStrictEqual('Period');
      expect(testPeriod.isEmpty()).toBe(false);
      expect(testPeriod.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testPeriod.hasId()).toBe(true);
      expect(testPeriod.getId()).toStrictEqual(testId);
      expect(testPeriod.hasExtension()).toBe(true);
      expect(testPeriod.getExtension()).toEqual([testExtension1, testExtension2]);

      // Period properties
      expect(testPeriod.hasStartElement()).toBe(true);
      expect(testPeriod.getStartElement()).toEqual(startDt);
      expect(testPeriod.hasEndElement()).toBe(true);
      expect(testPeriod.getEndElement()).toEqual(endDt);

      expect(testPeriod.hasStart()).toBe(true);
      expect(testPeriod.getStart()).toStrictEqual(VALID_START_DATETIME);
      expect(testPeriod.hasEnd()).toBe(true);
      expect(testPeriod.getEnd()).toStrictEqual(VALID_END_DATETIME);

      const expectedJson = {
        id: 'id1234',
        extension: [
          {
            url: 'testUrl1',
            valueString: 'base extension string value 1',
          },
          {
            url: 'testUrl2',
            valueString: 'base extension string value 2',
          },
        ],
        start: '2017-01-01T00:00:00.000Z',
        _start: {
          id: 'S1357',
          extension: [
            {
              url: 'startUrl',
              valueString: 'start extension string value',
            },
          ],
        },
        end: '2017-01-01T01:00:00.000Z',
      };
      expect(testPeriod.toJSON()).toEqual(expectedJson);
    });
  });
});
