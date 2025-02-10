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

import { Base } from '@src/fhir-core/base-models/Base';
import { BackboneElement, DataType, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import { fhirInteger, fhirString } from '@src/fhir-core/data-types/primitive/primitive-types';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { TestDataModelPrimitiveComponent } from '@src/test-models/TestDataModel';
import { AssertionError } from 'node:assert';
import { TestData } from '../test-data';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_NON_STRING_TYPE,
  INVALID_NON_STRING_TYPE_VALUE,
  INVALID_STRING_TYPE,
  INVALID_STRING_TYPE_VALUE,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_EXTENSION_2,
  VALID_ID,
  VALID_ID_2,
  VALID_MODIFIER_EXTENSION,
  VALID_MODIFIER_EXTENSION_2,
} from '../test-utils';

describe('TestDataModelPrimitiveComponent', () => {
  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);

      expect(testTestDataModelPrimitiveComponent).toBeDefined();
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(TestDataModelPrimitiveComponent);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Element);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Base);
      expect(testTestDataModelPrimitiveComponent.constructor.name).toStrictEqual('TestDataModelPrimitiveComponent');
      expect(testTestDataModelPrimitiveComponent.fhirType()).toStrictEqual('TestDataModel.backbonePrimitive0x');
      expect(testTestDataModelPrimitiveComponent.isEmpty()).toBe(true);
      const t = () => {
        testTestDataModelPrimitiveComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        'The following required properties do not exist: TestDataModel.backbonePrimitive0x.primitive11, TestDataModel.backbonePrimitive0x.primitive1x, TestDataModel.backbonePrimitive0x.choice11[x]',
      );

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getId()).toBeUndefined();
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(new DateTimeType());
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toBeUndefined();
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([] as IntegerType[]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([] as fhirInteger[]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toBeNull();
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toBeNull();
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([] as StringType[]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([] as fhirString[]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toBeNull();
    });

    it('should be properly instantiated with required primitive elements', () => {
      const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(
        TestData.VALID_BOOLEAN_TRUE,
        [TestData.VALID_STRING],
        TestData.VALID_URI_TYPE,
      );

      expect(testTestDataModelPrimitiveComponent).toBeDefined();
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(TestDataModelPrimitiveComponent);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Element);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Base);
      expect(testTestDataModelPrimitiveComponent.constructor.name).toStrictEqual('TestDataModelPrimitiveComponent');
      expect(testTestDataModelPrimitiveComponent.fhirType()).toStrictEqual('TestDataModel.backbonePrimitive0x');
      expect(testTestDataModelPrimitiveComponent.isEmpty()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getId()).toBeUndefined();
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(new DateTimeType());
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toBeUndefined();
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([] as IntegerType[]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([] as fhirInteger[]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_TRUE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_TRUE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([TestData.VALID_STRING_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([TestData.VALID_STRING]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(TestData.VALID_URI_TYPE);
    });

    it('should be properly instantiated with required PrimitiveType elements', () => {
      const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(
        TestData.VALID_BOOLEAN_TRUE_TYPE,
        [TestData.VALID_STRING_TYPE],
        TestData.VALID_URI_TYPE,
      );

      expect(testTestDataModelPrimitiveComponent).toBeDefined();
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(TestDataModelPrimitiveComponent);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Element);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Base);
      expect(testTestDataModelPrimitiveComponent.constructor.name).toStrictEqual('TestDataModelPrimitiveComponent');
      expect(testTestDataModelPrimitiveComponent.fhirType()).toStrictEqual('TestDataModel.backbonePrimitive0x');
      expect(testTestDataModelPrimitiveComponent.isEmpty()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getId()).toBeUndefined();
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(new DateTimeType());
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toBeUndefined();
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([] as IntegerType[]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([] as fhirInteger[]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_TRUE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_TRUE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([TestData.VALID_STRING_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([TestData.VALID_STRING]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(TestData.VALID_URI_TYPE);
    });

    it('should properly copy() with primitive elements', () => {
      const testDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);

      testDataModelPrimitiveComponent.setId(VALID_ID);
      testDataModelPrimitiveComponent.setExtension([VALID_EXTENSION]);
      testDataModelPrimitiveComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testDataModelPrimitiveComponent.setPrimitive01(TestData.VALID_DATETIME);
      testDataModelPrimitiveComponent.setPrimitive0x([TestData.VALID_INTEGER]);
      testDataModelPrimitiveComponent.setPrimitive11(TestData.VALID_BOOLEAN_TRUE);
      testDataModelPrimitiveComponent.setPrimitive1x([TestData.VALID_STRING]);
      testDataModelPrimitiveComponent.setChoice11(TestData.VALID_URI_TYPE);

      let testTestDataModelPrimitiveComponent: TestDataModelPrimitiveComponent = testDataModelPrimitiveComponent.copy();

      expect(testTestDataModelPrimitiveComponent).toBeDefined();
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(TestDataModelPrimitiveComponent);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Element);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Base);
      expect(testTestDataModelPrimitiveComponent.constructor.name).toStrictEqual('TestDataModelPrimitiveComponent');
      expect(testTestDataModelPrimitiveComponent.fhirType()).toStrictEqual('TestDataModel.backbonePrimitive0x');
      expect(testTestDataModelPrimitiveComponent.isEmpty()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(TestData.VALID_DATETIME_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toEqual(TestData.VALID_DATETIME);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([TestData.VALID_INTEGER_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([TestData.VALID_INTEGER]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_TRUE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_TRUE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([TestData.VALID_STRING_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([TestData.VALID_STRING]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(TestData.VALID_URI_TYPE);

      // Reset to empty

      testDataModelPrimitiveComponent.setId(UNDEFINED_VALUE);
      testDataModelPrimitiveComponent.setExtension(UNDEFINED_VALUE);
      testDataModelPrimitiveComponent.setModifierExtension(UNDEFINED_VALUE);

      testDataModelPrimitiveComponent.setPrimitive01(UNDEFINED_VALUE);
      testDataModelPrimitiveComponent.setPrimitive0x(UNDEFINED_VALUE);
      let t = () => {
        // @ts-expect-error: allow for testing
        testDataModelPrimitiveComponent.setPrimitive11(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backbonePrimitive0x.primitive11 is required');
      t = () => {
        // @ts-expect-error: allow for testing
        testDataModelPrimitiveComponent.setPrimitive1x(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backbonePrimitive0x.primitive1x is required');
      t = () => {
        // @ts-expect-error: allow for testing
        testDataModelPrimitiveComponent.setChoice11(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backbonePrimitive0x.choice11[x] is required');

      testTestDataModelPrimitiveComponent = testDataModelPrimitiveComponent.copy();

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getId()).toBeUndefined();
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(new DateTimeType());
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toBeUndefined();
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([] as IntegerType[]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([] as fhirInteger[]);

      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_TRUE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_TRUE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([TestData.VALID_STRING_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([TestData.VALID_STRING]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(TestData.VALID_URI_TYPE);
    });

    it('should properly copy() with PrimitiveType elements', () => {
      const testDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);

      testDataModelPrimitiveComponent.setId(VALID_ID);
      testDataModelPrimitiveComponent.setExtension([VALID_EXTENSION]);
      testDataModelPrimitiveComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testDataModelPrimitiveComponent.setPrimitive01Element(TestData.VALID_DATETIME_TYPE);
      testDataModelPrimitiveComponent.setPrimitive0xElement([TestData.VALID_INTEGER_TYPE]);
      testDataModelPrimitiveComponent.setPrimitive11Element(TestData.VALID_BOOLEAN_TRUE_TYPE);
      testDataModelPrimitiveComponent.setPrimitive1xElement([TestData.VALID_STRING_TYPE]);
      testDataModelPrimitiveComponent.setChoice11(TestData.VALID_URI_TYPE);

      let testTestDataModelPrimitiveComponent: TestDataModelPrimitiveComponent = testDataModelPrimitiveComponent.copy();

      expect(testTestDataModelPrimitiveComponent).toBeDefined();
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(TestDataModelPrimitiveComponent);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Element);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Base);
      expect(testTestDataModelPrimitiveComponent.constructor.name).toStrictEqual('TestDataModelPrimitiveComponent');
      expect(testTestDataModelPrimitiveComponent.fhirType()).toStrictEqual('TestDataModel.backbonePrimitive0x');
      expect(testTestDataModelPrimitiveComponent.isEmpty()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(TestData.VALID_DATETIME_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toEqual(TestData.VALID_DATETIME);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([TestData.VALID_INTEGER_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([TestData.VALID_INTEGER]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_TRUE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_TRUE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([TestData.VALID_STRING_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([TestData.VALID_STRING]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(TestData.VALID_URI_TYPE);

      // Reset to empty

      testDataModelPrimitiveComponent.setId(UNDEFINED_VALUE);
      testDataModelPrimitiveComponent.setExtension(UNDEFINED_VALUE);
      testDataModelPrimitiveComponent.setModifierExtension(UNDEFINED_VALUE);

      testDataModelPrimitiveComponent.setPrimitive01Element(UNDEFINED_VALUE);
      testDataModelPrimitiveComponent.setPrimitive0xElement(UNDEFINED_VALUE);
      let t = () => {
        // @ts-expect-error: allow for testing
        testDataModelPrimitiveComponent.setPrimitive11Element(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backbonePrimitive0x.primitive11 is required');
      t = () => {
        // @ts-expect-error: allow for testing
        testDataModelPrimitiveComponent.setPrimitive1xElement(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backbonePrimitive0x.primitive1x is required');
      t = () => {
        // @ts-expect-error: allow for testing
        testDataModelPrimitiveComponent.setChoice11(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backbonePrimitive0x.choice11[x] is required');

      testTestDataModelPrimitiveComponent = testDataModelPrimitiveComponent.copy();

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getId()).toBeUndefined();
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(new DateTimeType());
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toBeUndefined();
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([] as IntegerType[]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([] as fhirInteger[]);

      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_TRUE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_TRUE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([TestData.VALID_STRING_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([TestData.VALID_STRING]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(TestData.VALID_URI_TYPE);
    });

    it('should be properly reset by modifying/adding all properties with primitive elements', () => {
      const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);

      testTestDataModelPrimitiveComponent.setId(VALID_ID);
      testTestDataModelPrimitiveComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelPrimitiveComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelPrimitiveComponent.setPrimitive01(TestData.VALID_DATETIME);
      testTestDataModelPrimitiveComponent.setPrimitive0x([TestData.VALID_INTEGER]);
      testTestDataModelPrimitiveComponent.setPrimitive11(TestData.VALID_BOOLEAN_TRUE);
      testTestDataModelPrimitiveComponent.setPrimitive1x([TestData.VALID_STRING]);
      testTestDataModelPrimitiveComponent.setChoice11(TestData.VALID_URI_TYPE);

      expect(testTestDataModelPrimitiveComponent).toBeDefined();
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(TestDataModelPrimitiveComponent);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Element);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Base);
      expect(testTestDataModelPrimitiveComponent.constructor.name).toStrictEqual('TestDataModelPrimitiveComponent');
      expect(testTestDataModelPrimitiveComponent.fhirType()).toStrictEqual('TestDataModel.backbonePrimitive0x');
      expect(testTestDataModelPrimitiveComponent.isEmpty()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(TestData.VALID_DATETIME_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toEqual(TestData.VALID_DATETIME);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([TestData.VALID_INTEGER_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([TestData.VALID_INTEGER]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_TRUE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_TRUE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([TestData.VALID_STRING_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([TestData.VALID_STRING]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(TestData.VALID_URI_TYPE);

      // Reset

      testTestDataModelPrimitiveComponent.setId(VALID_ID_2);
      testTestDataModelPrimitiveComponent.setExtension([VALID_EXTENSION_2]);
      testTestDataModelPrimitiveComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      testTestDataModelPrimitiveComponent.setPrimitive01(TestData.VALID_DATETIME_2);
      testTestDataModelPrimitiveComponent.addPrimitive0x(TestData.VALID_INTEGER_2);
      testTestDataModelPrimitiveComponent.setPrimitive11(TestData.VALID_BOOLEAN_FALSE);
      testTestDataModelPrimitiveComponent.addPrimitive1x(TestData.VALID_STRING_2);
      testTestDataModelPrimitiveComponent.setChoice11(TestData.VALID_URI_TYPE_2);

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(TestData.VALID_DATETIME_TYPE_2);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toEqual(TestData.VALID_DATETIME_2);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([
        TestData.VALID_INTEGER_TYPE,
        TestData.VALID_INTEGER_TYPE_2,
      ]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([
        TestData.VALID_INTEGER,
        TestData.VALID_INTEGER_2,
      ]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_FALSE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_FALSE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([
        TestData.VALID_STRING_TYPE,
        TestData.VALID_STRING_TYPE_2,
      ]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([
        TestData.VALID_STRING,
        TestData.VALID_STRING_2,
      ]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(TestData.VALID_URI_TYPE_2);
    });

    it('should be properly reset by modifying/adding all properties with PrimitiveType elements', () => {
      const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);

      testTestDataModelPrimitiveComponent.setId(VALID_ID);
      testTestDataModelPrimitiveComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelPrimitiveComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelPrimitiveComponent.setPrimitive01Element(TestData.VALID_DATETIME_TYPE);
      testTestDataModelPrimitiveComponent.setPrimitive0xElement([TestData.VALID_INTEGER_TYPE]);
      testTestDataModelPrimitiveComponent.setPrimitive11Element(TestData.VALID_BOOLEAN_TRUE_TYPE);
      testTestDataModelPrimitiveComponent.setPrimitive1xElement([TestData.VALID_STRING_TYPE]);
      testTestDataModelPrimitiveComponent.setChoice11(TestData.VALID_URI_TYPE);

      expect(testTestDataModelPrimitiveComponent).toBeDefined();
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(TestDataModelPrimitiveComponent);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Element);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Base);
      expect(testTestDataModelPrimitiveComponent.constructor.name).toStrictEqual('TestDataModelPrimitiveComponent');
      expect(testTestDataModelPrimitiveComponent.fhirType()).toStrictEqual('TestDataModel.backbonePrimitive0x');
      expect(testTestDataModelPrimitiveComponent.isEmpty()).toBe(false);
      expect(testTestDataModelPrimitiveComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(TestData.VALID_DATETIME_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toEqual(TestData.VALID_DATETIME);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([TestData.VALID_INTEGER_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([TestData.VALID_INTEGER]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_TRUE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_TRUE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([TestData.VALID_STRING_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([TestData.VALID_STRING]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(TestData.VALID_URI_TYPE);

      // Reset

      testTestDataModelPrimitiveComponent.setId(VALID_ID_2);
      testTestDataModelPrimitiveComponent.setExtension([VALID_EXTENSION_2]);
      testTestDataModelPrimitiveComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      testTestDataModelPrimitiveComponent.setPrimitive01Element(TestData.VALID_DATETIME_TYPE_2);
      testTestDataModelPrimitiveComponent.addPrimitive0xElement(TestData.VALID_INTEGER_TYPE_2);
      testTestDataModelPrimitiveComponent.setPrimitive11Element(TestData.VALID_BOOLEAN_FALSE_TYPE);
      testTestDataModelPrimitiveComponent.addPrimitive1xElement(TestData.VALID_STRING_TYPE_2);
      testTestDataModelPrimitiveComponent.setChoice11(TestData.VALID_URI_TYPE_2);

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(TestData.VALID_DATETIME_TYPE_2);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toEqual(TestData.VALID_DATETIME_2);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([
        TestData.VALID_INTEGER_TYPE,
        TestData.VALID_INTEGER_TYPE_2,
      ]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([
        TestData.VALID_INTEGER,
        TestData.VALID_INTEGER_2,
      ]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_FALSE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_FALSE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([
        TestData.VALID_STRING_TYPE,
        TestData.VALID_STRING_TYPE_2,
      ]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([
        TestData.VALID_STRING,
        TestData.VALID_STRING_2,
      ]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(TestData.VALID_URI_TYPE_2);
    });
  });

  describe('Serialization/Deserialization', () => {
    const VALID_JSON = {
      id: 'id12345',
      extension: [
        {
          url: 'extUrl',
          valueString: 'Extension string value',
        },
      ],
      modifierExtension: [
        {
          url: 'modExtUrl',
          valueString: 'ModifierExtension string value',
        },
      ],
      primitive01: '2024-01-28T14:30:00.000Z',
      primitive0x: [13579],
      primitive11: true,
      primitive1x: ['This is a valid string.'],
      choice11String: 'This is a valid string.',
      _choice11String: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
      },
    };
    const INVALID_JSON = {
      bogusField: 'bogus value',
    };

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);
      const t = () => {
        testTestDataModelPrimitiveComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties do not exist: TestDataModel.backbonePrimitive0x.primitive11, TestDataModel.backbonePrimitive0x.primitive1x, TestDataModel.backbonePrimitive0x.choice11[x]`,
      );
    });

    it('should throw FhirError from parse() when JSON is missing required properties', () => {
      const t = () => {
        TestDataModelPrimitiveComponent.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: TestDataModel.backbonePrimitive0x.primitive11, TestDataModel.backbonePrimitive0x.primitive1x, TestDataModel.backbonePrimitive0x.choice11[x]`,
      );
    });

    it('should return undefined when deserialize with no json', () => {
      let testTestDataModelPrimitiveComponent: TestDataModelPrimitiveComponent | undefined = undefined;
      testTestDataModelPrimitiveComponent = TestDataModelPrimitiveComponent.parse({});
      expect(testTestDataModelPrimitiveComponent).toBeUndefined();

      testTestDataModelPrimitiveComponent = TestDataModelPrimitiveComponent.parse(null);
      expect(testTestDataModelPrimitiveComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testTestDataModelPrimitiveComponent = TestDataModelPrimitiveComponent.parse(undefined);
      expect(testTestDataModelPrimitiveComponent).toBeUndefined();
    });

    it('should properly create serialized content', () => {
      const choice11: DataType = TestData.VALID_STRING_TYPE.copy();
      choice11.setId(DATATYPE_ID);
      choice11.setExtension([DATATYPE_EXTENSION]);

      const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);

      testTestDataModelPrimitiveComponent.setId(VALID_ID);
      testTestDataModelPrimitiveComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelPrimitiveComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelPrimitiveComponent.setPrimitive01(TestData.VALID_DATETIME);
      testTestDataModelPrimitiveComponent.setPrimitive0x([TestData.VALID_INTEGER]);
      testTestDataModelPrimitiveComponent.setPrimitive11(TestData.VALID_BOOLEAN_TRUE);
      testTestDataModelPrimitiveComponent.setPrimitive1x([TestData.VALID_STRING]);
      testTestDataModelPrimitiveComponent.setChoice11(choice11);

      expect(testTestDataModelPrimitiveComponent).toBeDefined();
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(TestDataModelPrimitiveComponent);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Element);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Base);
      expect(testTestDataModelPrimitiveComponent.constructor.name).toStrictEqual('TestDataModelPrimitiveComponent');
      expect(testTestDataModelPrimitiveComponent.fhirType()).toStrictEqual('TestDataModel.backbonePrimitive0x');
      expect(testTestDataModelPrimitiveComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testTestDataModelPrimitiveComponent.hasId()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelPrimitiveComponent.hasExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelPrimitiveComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelPrimitiveComponent properties
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01Element()).toEqual(TestData.VALID_DATETIME_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive01()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive01()).toEqual(TestData.VALID_DATETIME);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0xElement()).toEqual([TestData.VALID_INTEGER_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive0x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive0x()).toEqual([TestData.VALID_INTEGER]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11Element()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11Element()).toEqual(TestData.VALID_BOOLEAN_TRUE_TYPE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive11()).toEqual(TestData.VALID_BOOLEAN_TRUE);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1xElement()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1xElement()).toEqual([TestData.VALID_STRING_TYPE]);
      expect(testTestDataModelPrimitiveComponent.hasPrimitive1x()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getPrimitive1x()).toEqual([TestData.VALID_STRING]);
      expect(testTestDataModelPrimitiveComponent.hasChoice11()).toBe(true);
      expect(testTestDataModelPrimitiveComponent.getChoice11()).toEqual(choice11);

      expect(testTestDataModelPrimitiveComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should return TestDataModelPrimitiveComponent for valid json', () => {
      const testTestDataModelPrimitiveComponent: TestDataModelPrimitiveComponent | undefined =
        TestDataModelPrimitiveComponent.parse(VALID_JSON);

      expect(testTestDataModelPrimitiveComponent).toBeDefined();
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(TestDataModelPrimitiveComponent);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Element);
      expect(testTestDataModelPrimitiveComponent).toBeInstanceOf(Base);
      expect(testTestDataModelPrimitiveComponent?.constructor.name).toStrictEqual('TestDataModelPrimitiveComponent');
      expect(testTestDataModelPrimitiveComponent?.fhirType()).toStrictEqual('TestDataModel.backbonePrimitive0x');
      expect(testTestDataModelPrimitiveComponent?.isEmpty()).toBe(false);
      expect(testTestDataModelPrimitiveComponent?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    describe('constructor', () => {
      it('should throw appropriate errors when instantiated with an invalid required data elements', () => {
        let t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelPrimitiveComponent(TestData.VALID_QUANTITY, null, null);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backbonePrimitive0x.primitive11; Provided value is not an instance of BooleanType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelPrimitiveComponent(INVALID_NON_STRING_TYPE, null, null);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backbonePrimitive0x.primitive11; Provided value is not an instance of BooleanType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelPrimitiveComponent(INVALID_NON_STRING_TYPE_VALUE, null, null);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid TestDataModel.backbonePrimitive0x.primitive11 (Invalid datatype)`);

        t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelPrimitiveComponent(null, [TestData.VALID_QUANTITY], null);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backbonePrimitive0x.primitive1x; Provided value array has an element that is not an instance of StringType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelPrimitiveComponent(null, [INVALID_STRING_TYPE], null);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backbonePrimitive0x.primitive1x; Provided value array has an element that is not an instance of StringType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelPrimitiveComponent(null, [INVALID_STRING_TYPE_VALUE], null);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid TestDataModel.backbonePrimitive0x.primitive1x array item (12345)`);

        t = () => {
          new TestDataModelPrimitiveComponent(null, null, TestData.VALID_QUANTITY);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `ChoiceDataTypes decorator on setChoice11 (TestDataModel.backbonePrimitive0x.choice11[x]) expects the 'value' argument type (Quantity) to be a supported DataType`,
        );

        t = () => {
          new TestDataModelPrimitiveComponent(null, null, INVALID_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `ChoiceDataTypes decorator on setChoice11 (TestDataModel.backbonePrimitive0x.choice11[x]) expects the 'value' argument type (integer) to be a supported DataType`,
        );
      });
    });

    describe('primitive01', () => {
      it('should throw appropriate errors for an invalid dateTime primitive', () => {
        const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive01Element(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backbonePrimitive0x.primitive01; Provided element is not an instance of DateTimeType.`,
        );

        t = () => {
          testTestDataModelPrimitiveComponent.setPrimitive01(INVALID_NON_STRING_TYPE_VALUE);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid TestDataModel.backbonePrimitive0x.primitive01 (Invalid datatype)`);
      });
    });

    describe('primitive0x', () => {
      it('should throw appropriate errors for an invalid integer primitive', () => {
        const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive0xElement([INVALID_NON_STRING_TYPE]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backbonePrimitive0x.primitive0x; Provided value array has an element that is not an instance of IntegerType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.addPrimitive0xElement(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backbonePrimitive0x.primitive0x; Provided element is not an instance of IntegerType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive0x([INVALID_NON_STRING_TYPE_VALUE]);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid TestDataModel.backbonePrimitive0x.primitive0x array item (Invalid datatype)`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.addPrimitive0x(INVALID_NON_STRING_TYPE_VALUE);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid TestDataModel.backbonePrimitive0x.primitive0x array item (Invalid datatype)`);
      });
    });

    describe('primitive11', () => {
      it('should throw appropriate errors for an invalid boolean primitive', () => {
        const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive11Element(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backbonePrimitive0x.primitive11; Provided value is not an instance of BooleanType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive11(INVALID_NON_STRING_TYPE_VALUE);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid TestDataModel.backbonePrimitive0x.primitive11 (Invalid datatype)`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive11Element(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backbonePrimitive0x.primitive11 is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive11(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backbonePrimitive0x.primitive11 is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive11Element(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backbonePrimitive0x.primitive11 is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive11(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backbonePrimitive0x.primitive11 is required`);
      });
    });

    describe('primitive1x', () => {
      it('should throw appropriate errors for an invalid string primitive', () => {
        const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive1xElement([INVALID_STRING_TYPE]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backbonePrimitive0x.primitive1x; Provided value array has an element that is not an instance of StringType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.addPrimitive1xElement(INVALID_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backbonePrimitive0x.primitive1x; Provided element is not an instance of StringType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive1x([INVALID_STRING_TYPE_VALUE]);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid TestDataModel.backbonePrimitive0x.primitive1x array item (12345)`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.addPrimitive1x(INVALID_STRING_TYPE_VALUE);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid TestDataModel.backbonePrimitive0x.primitive1x array item (12345)`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive1xElement(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backbonePrimitive0x.primitive1x is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive1x(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backbonePrimitive0x.primitive1x is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive1xElement(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backbonePrimitive0x.primitive1x is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setPrimitive1x(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backbonePrimitive0x.primitive1x is required`);
      });
    });

    describe('choice11', () => {
      it('should throw appropriate errors for an invalid polymorphic values', () => {
        const testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(null, null, null);
        let t = () => {
          testTestDataModelPrimitiveComponent.setChoice11(TestData.VALID_QUANTITY);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `ChoiceDataTypes decorator on setChoice11 (TestDataModel.backbonePrimitive0x.choice11[x]) expects the 'value' argument type (Quantity) to be a supported DataType`,
        );

        t = () => {
          testTestDataModelPrimitiveComponent.setChoice11(INVALID_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `ChoiceDataTypes decorator on setChoice11 (TestDataModel.backbonePrimitive0x.choice11[x]) expects the 'value' argument type (integer) to be a supported DataType`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setChoice11(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backbonePrimitive0x.choice11[x] is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelPrimitiveComponent.setChoice11(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backbonePrimitive0x.choice11[x] is required`);
      });
    });
  });
});
