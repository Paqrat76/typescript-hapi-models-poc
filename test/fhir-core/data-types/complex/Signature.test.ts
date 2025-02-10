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

import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { Signature } from '@src/fhir-core/data-types/complex/Signature';
import { Base64BinaryType } from '@src/fhir-core/data-types/primitive/Base64BinaryType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { InstantType } from '@src/fhir-core/data-types/primitive/InstantType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { AssertionError } from 'node:assert';
import {
  INVALID_BASE64BINARY,
  INVALID_CODE_TYPE,
  INVALID_CODE_VALUE,
  INVALID_NON_STRING_TYPE,
  INVALID_NON_STRING_TYPE_VALUE,
  INVALID_STRING_TYPE_VALUE,
  UNDEFINED_VALUE,
} from '../../../test-utils';

describe('Signature', () => {
  const VALID_TYPE = new Coding();
  VALID_TYPE.setSystem('urn:iso-astm:E1762-95:2013').setCode('1.2.840.10065.1.12.1.1').setDisplay(`Author's Signature`);
  const VALID_TYPE_2 = new Coding();
  VALID_TYPE_2.setSystem('urn:iso-astm:E1762-95:2013')
    .setCode('1.2.840.10065.1.12.1.8')
    .setDisplay(`Signature Witness Signature`);

  const VALID_WHEN = '2024-02-07T13:28:00.000+04:00';
  const VALID_WHEN_TYPE = new InstantType(VALID_WHEN);
  const VALID_WHEN_2 = '2024-02-07T13:28:00.000+04:00';
  const VALID_WHEN_TYPE_2 = new InstantType(VALID_WHEN_2);

  const VALID_WHO = new Reference();
  VALID_WHO.setReference('Practitioner/13579');
  const VALID_WHO_2 = new Reference();
  VALID_WHO_2.setReference('RelatedPerson/24680');
  const INVALID_REFERENCE = new Reference();
  INVALID_REFERENCE.setReference('Basic/123');

  const ONBEHALFOF_REFERENCE = new Reference();
  ONBEHALFOF_REFERENCE.setReference('Organization/24680');
  const ONBEHALFOF_REFERENCE_2 = new Reference();
  ONBEHALFOF_REFERENCE_2.setReference('Organization/98765');

  const VALID_TARGET_FORMAT_CODE = 'xml';
  const VALID_TARGET_FORMAT_CODE_2 = 'json';
  const VALID_SIG_FORMAT_CODE = 'application/signature+xml';
  const VALID_SIG_FORMAT_CODE_2 = 'application/jose';
  const VALID_DATA = 'VGhpcyBpcyBhbiBleGFtcGxlIG9mIGEgRkhJUiBTaWduYXR1cmUgZGF0YS4=';
  const VALID_DATA_2 = 'VGhpcyBpcyBhIHNlY29uZCB2YWxpZCBkYXRhIHR5cGU=';

  describe('Core', () => {
    it(`should be properly instantiated as empty`, () => {
      const testSignature = new Signature(null, null, null);

      expect(testSignature).toBeDefined();
      expect(testSignature).toBeInstanceOf(DataType);
      expect(testSignature).toBeInstanceOf(Signature);
      expect(testSignature.constructor.name).toStrictEqual('Signature');
      expect(testSignature.fhirType()).toStrictEqual('Signature');
      expect(testSignature.isEmpty()).toBe(true);
      expect(testSignature.isComplexDataType()).toBe(true);
      const t = () => {
        testSignature.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties do not exist: Signature.type, Signature.when, Signature.who`,
      );

      // inherited properties from Element
      expect(testSignature.hasId()).toBe(false);
      expect(testSignature.getId()).toBeUndefined();
      expect(testSignature.hasExtension()).toBe(false);
      expect(testSignature.getExtension()).toEqual([] as Extension[]);

      // Signature properties
      expect(testSignature.hasType()).toBe(false);
      expect(testSignature.getType()).toBeNull();
      expect(testSignature.hasWhenElement()).toBe(false);
      expect(testSignature.getWhenElement()).toBeNull();
      expect(testSignature.hasWhen()).toBe(false);
      expect(testSignature.getWhen()).toBeNull();
      expect(testSignature.hasWho()).toBe(false);
      expect(testSignature.getWho()).toBeNull();
      expect(testSignature.hasOnBehalfOf()).toBe(false);
      expect(testSignature.getOnBehalfOf()).toEqual(new Reference());
      expect(testSignature.hasTargetFormatElement()).toBe(false);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType());
      expect(testSignature.hasTargetFormat()).toBe(false);
      expect(testSignature.getTargetFormat()).toBeUndefined();
      expect(testSignature.hasSigFormatElement()).toBe(false);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType());
      expect(testSignature.hasSigFormat()).toBe(false);
      expect(testSignature.getSigFormat()).toBeUndefined();
      expect(testSignature.hasDataElement()).toBe(false);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType());
      expect(testSignature.hasData()).toBe(false);
      expect(testSignature.getData()).toBeUndefined();
    });

    it('should properly copy() when initialized with null', () => {
      const signature = new Signature(null, null, null);

      const testSignature = signature.copy();
      expect(testSignature).toBeDefined();
      expect(testSignature).toBeInstanceOf(DataType);
      expect(testSignature).toBeInstanceOf(Signature);
      expect(testSignature.constructor.name).toStrictEqual('Signature');
      expect(testSignature.fhirType()).toStrictEqual('Signature');
      expect(testSignature.isEmpty()).toBe(true);
      expect(testSignature.isComplexDataType()).toBe(true);
      const t = () => {
        testSignature.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties do not exist: Signature.type, Signature.when, Signature.who`,
      );

      // inherited properties from Element
      expect(testSignature.hasId()).toBe(false);
      expect(testSignature.getId()).toBeUndefined();
      expect(testSignature.hasExtension()).toBe(false);
      expect(testSignature.getExtension()).toEqual([] as Extension[]);

      // Signature properties
      expect(testSignature.hasType()).toBe(false);
      expect(testSignature.getType()).toBeNull();
      expect(testSignature.hasWhenElement()).toBe(false);
      expect(testSignature.getWhenElement()).toBeNull();
      expect(testSignature.hasWhen()).toBe(false);
      expect(testSignature.getWhen()).toBeNull();
      expect(testSignature.hasWho()).toBe(false);
      expect(testSignature.getWho()).toBeNull();
      expect(testSignature.hasOnBehalfOf()).toBe(false);
      expect(testSignature.getOnBehalfOf()).toEqual(new Reference());
      expect(testSignature.hasTargetFormatElement()).toBe(false);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType());
      expect(testSignature.hasTargetFormat()).toBe(false);
      expect(testSignature.getTargetFormat()).toBeUndefined();
      expect(testSignature.hasSigFormatElement()).toBe(false);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType());
      expect(testSignature.hasSigFormat()).toBe(false);
      expect(testSignature.getSigFormat()).toBeUndefined();
      expect(testSignature.hasDataElement()).toBe(false);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType());
      expect(testSignature.hasData()).toBe(false);
      expect(testSignature.getData()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const signature = new Signature([VALID_TYPE], VALID_WHEN, VALID_WHO);
      signature.setOnBehalfOf(ONBEHALFOF_REFERENCE);
      signature.setTargetFormat(VALID_TARGET_FORMAT_CODE);
      signature.setSigFormat(VALID_SIG_FORMAT_CODE);
      signature.setData(VALID_DATA);

      let testSignature = signature.copy();
      expect(testSignature).toBeDefined();
      expect(testSignature).toBeInstanceOf(DataType);
      expect(testSignature).toBeInstanceOf(Signature);
      expect(testSignature.constructor.name).toStrictEqual('Signature');
      expect(testSignature.fhirType()).toStrictEqual('Signature');
      expect(testSignature.isEmpty()).toBe(false);
      expect(testSignature.isComplexDataType()).toBe(true);
      expect(testSignature.toJSON()).toBeDefined();

      // inherited properties from Element
      expect(testSignature.hasId()).toBe(false);
      expect(testSignature.getId()).toBeUndefined();
      expect(testSignature.hasExtension()).toBe(false);
      expect(testSignature.getExtension()).toEqual([] as Extension[]);

      // Signature properties
      expect(testSignature.hasType()).toBe(true);
      expect(testSignature.getType()).toEqual([VALID_TYPE]);
      expect(testSignature.hasWhenElement()).toBe(true);
      expect(testSignature.getWhenElement()).toEqual(VALID_WHEN_TYPE);
      expect(testSignature.hasWhen()).toBe(true);
      expect(testSignature.getWhen()).toEqual(VALID_WHEN);
      expect(testSignature.hasWho()).toBe(true);
      expect(testSignature.getWho()).toEqual(VALID_WHO);
      expect(testSignature.hasOnBehalfOf()).toBe(true);
      expect(testSignature.getOnBehalfOf()).toEqual(ONBEHALFOF_REFERENCE);
      expect(testSignature.hasTargetFormatElement()).toBe(true);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType(VALID_TARGET_FORMAT_CODE));
      expect(testSignature.hasTargetFormat()).toBe(true);
      expect(testSignature.getTargetFormat()).toEqual(VALID_TARGET_FORMAT_CODE);
      expect(testSignature.hasSigFormatElement()).toBe(true);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType(VALID_SIG_FORMAT_CODE));
      expect(testSignature.hasSigFormat()).toBe(true);
      expect(testSignature.getSigFormat()).toEqual(VALID_SIG_FORMAT_CODE);
      expect(testSignature.hasDataElement()).toBe(true);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType(VALID_DATA));
      expect(testSignature.hasData()).toBe(true);
      expect(testSignature.getData()).toEqual(VALID_DATA);

      // Reset to empty
      // type, when, and who are required and cannot be reset

      signature.setOnBehalfOf(UNDEFINED_VALUE);
      signature.setTargetFormat(UNDEFINED_VALUE);
      signature.setSigFormat(UNDEFINED_VALUE);
      signature.setData(UNDEFINED_VALUE);

      testSignature = signature.copy();
      expect(testSignature.hasType()).toBe(true);
      expect(testSignature.getType()).toEqual([VALID_TYPE]);
      expect(testSignature.hasWhenElement()).toBe(true);
      expect(testSignature.getWhenElement()).toEqual(VALID_WHEN_TYPE);
      expect(testSignature.hasWhen()).toBe(true);
      expect(testSignature.getWhen()).toEqual(VALID_WHEN);
      expect(testSignature.hasWho()).toBe(true);
      expect(testSignature.getWho()).toEqual(VALID_WHO);
      expect(testSignature.hasOnBehalfOf()).toBe(false);
      expect(testSignature.getOnBehalfOf()).toEqual(new Reference());
      expect(testSignature.hasTargetFormatElement()).toBe(false);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType());
      expect(testSignature.hasTargetFormat()).toBe(false);
      expect(testSignature.getTargetFormat()).toBeUndefined();
      expect(testSignature.hasSigFormatElement()).toBe(false);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType());
      expect(testSignature.hasSigFormat()).toBe(false);
      expect(testSignature.getSigFormat()).toBeUndefined();
      expect(testSignature.hasDataElement()).toBe(false);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType());
      expect(testSignature.hasData()).toBe(false);
      expect(testSignature.getData()).toBeUndefined();
    });

    it('should be properly reset by adding data elements to the type list', () => {
      const testSignature = new Signature(null, null, null);

      expect(testSignature).toBeDefined();
      expect(testSignature.isEmpty()).toBe(true);

      expect(testSignature.hasType()).toBe(false);
      expect(testSignature.getType()).toBeNull();

      testSignature.addType(VALID_TYPE);
      testSignature.addType(VALID_TYPE_2);
      testSignature.addType(UNDEFINED_VALUE);
      expect(testSignature.hasType()).toBe(true);
      expect(testSignature.getType()).toHaveLength(2);
      expect(testSignature.getType()).toMatchObject([VALID_TYPE, VALID_TYPE_2]);
    });

    it('should throw errors for invalid required values', () => {
      let t = () => {
        // @ts-expect-error: allow for testing
        new Signature([INVALID_NON_STRING_TYPE], VALID_WHEN, VALID_WHO);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Signature.type; Provided value array has an element that is not an instance of Coding.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        new Signature([VALID_TYPE], INVALID_NON_STRING_TYPE, VALID_WHO);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Signature.when; Provided value is not an instance of InstantType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        new Signature([VALID_TYPE], INVALID_STRING_TYPE_VALUE, VALID_WHO);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Signature.when (12345)`);

      t = () => {
        // @ts-expect-error: allow for testing
        new Signature([VALID_TYPE], VALID_WHEN, INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setWho (Signature.who) expects a single argument to be type of 'Reference | undefined | null'`,
      );

      t = () => {
        new Signature([VALID_TYPE], VALID_WHEN, INVALID_REFERENCE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setWho (Signature.who) expects argument (Basic/123) to be a valid 'Reference' type`,
      );
    });

    // Tests using primitives

    it('should be properly initialized by primitive values', () => {
      const testSignature = new Signature([VALID_TYPE], VALID_WHEN, VALID_WHO);
      testSignature.setOnBehalfOf(ONBEHALFOF_REFERENCE);
      testSignature.setTargetFormat(VALID_TARGET_FORMAT_CODE);
      testSignature.setSigFormat(VALID_SIG_FORMAT_CODE);
      testSignature.setData(VALID_DATA);

      expect(testSignature).toBeDefined();
      expect(testSignature).toBeInstanceOf(DataType);
      expect(testSignature).toBeInstanceOf(Signature);
      expect(testSignature.constructor.name).toStrictEqual('Signature');
      expect(testSignature.fhirType()).toStrictEqual('Signature');
      expect(testSignature.isEmpty()).toBe(false);
      expect(testSignature.isComplexDataType()).toBe(true);
      expect(testSignature.toJSON()).toBeDefined();

      // inherited properties from Element
      expect(testSignature.hasId()).toBe(false);
      expect(testSignature.getId()).toBeUndefined();
      expect(testSignature.hasExtension()).toBe(false);
      expect(testSignature.getExtension()).toEqual([] as Extension[]);

      // Signature properties
      expect(testSignature.hasType()).toBe(true);
      expect(testSignature.getType()).toEqual([VALID_TYPE]);
      expect(testSignature.hasWhenElement()).toBe(true);
      expect(testSignature.getWhenElement()).toEqual(VALID_WHEN_TYPE);
      expect(testSignature.hasWhen()).toBe(true);
      expect(testSignature.getWhen()).toEqual(VALID_WHEN);
      expect(testSignature.hasWho()).toBe(true);
      expect(testSignature.getWho()).toEqual(VALID_WHO);
      expect(testSignature.hasOnBehalfOf()).toBe(true);
      expect(testSignature.getOnBehalfOf()).toEqual(ONBEHALFOF_REFERENCE);
      expect(testSignature.hasTargetFormatElement()).toBe(true);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType(VALID_TARGET_FORMAT_CODE));
      expect(testSignature.hasTargetFormat()).toBe(true);
      expect(testSignature.getTargetFormat()).toEqual(VALID_TARGET_FORMAT_CODE);
      expect(testSignature.hasSigFormatElement()).toBe(true);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType(VALID_SIG_FORMAT_CODE));
      expect(testSignature.hasSigFormat()).toBe(true);
      expect(testSignature.getSigFormat()).toEqual(VALID_SIG_FORMAT_CODE);
      expect(testSignature.hasDataElement()).toBe(true);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType(VALID_DATA));
      expect(testSignature.hasData()).toBe(true);
      expect(testSignature.getData()).toEqual(VALID_DATA);
    });

    it('should be properly reset by modifying properties with primitive values', () => {
      const testSignature = new Signature(null, null, null);
      testSignature.setType([VALID_TYPE]);
      testSignature.setWhen(VALID_WHEN);
      testSignature.setWho(VALID_WHO);
      testSignature.setOnBehalfOf(ONBEHALFOF_REFERENCE);
      testSignature.setTargetFormat(VALID_TARGET_FORMAT_CODE);
      testSignature.setSigFormat(VALID_SIG_FORMAT_CODE);
      testSignature.setData(VALID_DATA);

      expect(testSignature).toBeDefined();
      expect(testSignature.isEmpty()).toBe(false);

      // Signature properties
      expect(testSignature.hasType()).toBe(true);
      expect(testSignature.getType()).toEqual([VALID_TYPE]);
      expect(testSignature.hasWhenElement()).toBe(true);
      expect(testSignature.getWhenElement()).toEqual(VALID_WHEN_TYPE);
      expect(testSignature.hasWhen()).toBe(true);
      expect(testSignature.getWhen()).toEqual(VALID_WHEN);
      expect(testSignature.hasWho()).toBe(true);
      expect(testSignature.getWho()).toEqual(VALID_WHO);
      expect(testSignature.hasOnBehalfOf()).toBe(true);
      expect(testSignature.getOnBehalfOf()).toEqual(ONBEHALFOF_REFERENCE);
      expect(testSignature.hasTargetFormatElement()).toBe(true);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType(VALID_TARGET_FORMAT_CODE));
      expect(testSignature.hasTargetFormat()).toBe(true);
      expect(testSignature.getTargetFormat()).toEqual(VALID_TARGET_FORMAT_CODE);
      expect(testSignature.hasSigFormatElement()).toBe(true);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType(VALID_SIG_FORMAT_CODE));
      expect(testSignature.hasSigFormat()).toBe(true);
      expect(testSignature.getSigFormat()).toEqual(VALID_SIG_FORMAT_CODE);
      expect(testSignature.hasDataElement()).toBe(true);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType(VALID_DATA));
      expect(testSignature.hasData()).toBe(true);
      expect(testSignature.getData()).toEqual(VALID_DATA);

      // Reset

      testSignature.setType([VALID_TYPE_2]);
      testSignature.setWhen(VALID_WHEN_2);
      testSignature.setWho(VALID_WHO_2);
      testSignature.setOnBehalfOf(ONBEHALFOF_REFERENCE_2);
      testSignature.setTargetFormat(VALID_TARGET_FORMAT_CODE_2);
      testSignature.setSigFormat(VALID_SIG_FORMAT_CODE_2);
      testSignature.setData(VALID_DATA_2);

      expect(testSignature).toBeDefined();
      expect(testSignature.isEmpty()).toBe(false);

      expect(testSignature.hasType()).toBe(true);
      expect(testSignature.getType()).toEqual([VALID_TYPE_2]);
      expect(testSignature.hasWhenElement()).toBe(true);
      expect(testSignature.getWhenElement()).toEqual(VALID_WHEN_TYPE_2);
      expect(testSignature.hasWhen()).toBe(true);
      expect(testSignature.getWhen()).toEqual(VALID_WHEN_2);
      expect(testSignature.hasWho()).toBe(true);
      expect(testSignature.getWho()).toEqual(VALID_WHO_2);
      expect(testSignature.hasOnBehalfOf()).toBe(true);
      expect(testSignature.getOnBehalfOf()).toEqual(ONBEHALFOF_REFERENCE_2);
      expect(testSignature.hasTargetFormatElement()).toBe(true);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType(VALID_TARGET_FORMAT_CODE_2));
      expect(testSignature.hasTargetFormat()).toBe(true);
      expect(testSignature.getTargetFormat()).toEqual(VALID_TARGET_FORMAT_CODE_2);
      expect(testSignature.hasSigFormatElement()).toBe(true);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType(VALID_SIG_FORMAT_CODE_2));
      expect(testSignature.hasSigFormat()).toBe(true);
      expect(testSignature.getSigFormat()).toEqual(VALID_SIG_FORMAT_CODE_2);
      expect(testSignature.hasDataElement()).toBe(true);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType(VALID_DATA_2));
      expect(testSignature.hasData()).toBe(true);
      expect(testSignature.getData()).toEqual(VALID_DATA_2);

      // Reset tu empty

      testSignature.setOnBehalfOf(UNDEFINED_VALUE);
      testSignature.setTargetFormat(UNDEFINED_VALUE);
      testSignature.setSigFormat(UNDEFINED_VALUE);
      testSignature.setData(UNDEFINED_VALUE);

      expect(testSignature).toBeDefined();
      expect(testSignature.isEmpty()).toBe(false);

      expect(testSignature.hasOnBehalfOf()).toBe(false);
      expect(testSignature.getOnBehalfOf()).toEqual(new Reference());
      expect(testSignature.hasTargetFormatElement()).toBe(false);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType());
      expect(testSignature.hasTargetFormat()).toBe(false);
      expect(testSignature.getTargetFormat()).toBeUndefined();
      expect(testSignature.hasSigFormatElement()).toBe(false);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType());
      expect(testSignature.hasSigFormat()).toBe(false);
      expect(testSignature.getSigFormat()).toBeUndefined();
      expect(testSignature.hasDataElement()).toBe(false);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType());
      expect(testSignature.hasData()).toBe(false);
      expect(testSignature.getData()).toBeUndefined();
    });

    it('should throw errors for invalid primitive values', () => {
      const testSignature = new Signature([VALID_TYPE], VALID_WHEN, VALID_WHO);

      let t = () => {
        // @ts-expect-error: allow for testing
        testSignature.setWhenElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Signature.when; Provided value is not an instance of InstantType.`);

      t = () => {
        testSignature.setWhen(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Signature.when (Invalid datatype)`);

      t = () => {
        // @ts-expect-error: allow for testing
        testSignature.setTargetFormatElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Signature.targetFormat; Provided element is not an instance of CodeType.`);

      t = () => {
        testSignature.setTargetFormat(INVALID_CODE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Signature.targetFormat ( Invalid code )`);

      t = () => {
        // @ts-expect-error: allow for testing
        testSignature.setSigFormatElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Signature.sigFormat; Provided element is not an instance of CodeType.`);

      t = () => {
        testSignature.setSigFormat(INVALID_CODE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Signature.sigFormat ( Invalid code )`);

      t = () => {
        // @ts-expect-error: allow for testing
        testSignature.setDataElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Signature.data; Provided element is not an instance of Base64BinaryType.`);

      t = () => {
        testSignature.setData(INVALID_BASE64BINARY);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Signature.data (invalidBase64Binary)`);
    });

    // Tests using DataType elements

    it('should be properly initialized by DataType values', () => {
      const testSignature = new Signature([VALID_TYPE], VALID_WHEN_TYPE, VALID_WHO);
      testSignature.setOnBehalfOf(ONBEHALFOF_REFERENCE);
      testSignature.setTargetFormatElement(new CodeType(VALID_TARGET_FORMAT_CODE));
      testSignature.setSigFormatElement(new CodeType(VALID_SIG_FORMAT_CODE));
      testSignature.setDataElement(new Base64BinaryType(VALID_DATA));

      expect(testSignature).toBeDefined();
      expect(testSignature).toBeInstanceOf(DataType);
      expect(testSignature).toBeInstanceOf(Signature);
      expect(testSignature.constructor.name).toStrictEqual('Signature');
      expect(testSignature.fhirType()).toStrictEqual('Signature');
      expect(testSignature.isEmpty()).toBe(false);
      expect(testSignature.isComplexDataType()).toBe(true);
      expect(testSignature.toJSON()).toBeDefined();

      // inherited properties from Element
      expect(testSignature.hasId()).toBe(false);
      expect(testSignature.getId()).toBeUndefined();
      expect(testSignature.hasExtension()).toBe(false);
      expect(testSignature.getExtension()).toEqual([] as Extension[]);

      // Signature properties
      expect(testSignature.hasType()).toBe(true);
      expect(testSignature.getType()).toEqual([VALID_TYPE]);
      expect(testSignature.hasWhenElement()).toBe(true);
      expect(testSignature.getWhenElement()).toEqual(VALID_WHEN_TYPE);
      expect(testSignature.hasWhen()).toBe(true);
      expect(testSignature.getWhen()).toEqual(VALID_WHEN);
      expect(testSignature.hasWho()).toBe(true);
      expect(testSignature.getWho()).toEqual(VALID_WHO);
      expect(testSignature.hasOnBehalfOf()).toBe(true);
      expect(testSignature.getOnBehalfOf()).toEqual(ONBEHALFOF_REFERENCE);
      expect(testSignature.hasTargetFormatElement()).toBe(true);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType(VALID_TARGET_FORMAT_CODE));
      expect(testSignature.hasTargetFormat()).toBe(true);
      expect(testSignature.getTargetFormat()).toEqual(VALID_TARGET_FORMAT_CODE);
      expect(testSignature.hasSigFormatElement()).toBe(true);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType(VALID_SIG_FORMAT_CODE));
      expect(testSignature.hasSigFormat()).toBe(true);
      expect(testSignature.getSigFormat()).toEqual(VALID_SIG_FORMAT_CODE);
      expect(testSignature.hasDataElement()).toBe(true);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType(VALID_DATA));
      expect(testSignature.hasData()).toBe(true);
      expect(testSignature.getData()).toEqual(VALID_DATA);
    });

    it('should be properly reset by modifying properties with DataType values', () => {
      const testSignature = new Signature(null, null, null);
      testSignature.setType([VALID_TYPE]);
      testSignature.setWhenElement(VALID_WHEN_TYPE);
      testSignature.setWho(VALID_WHO);
      testSignature.setOnBehalfOf(ONBEHALFOF_REFERENCE);
      testSignature.setTargetFormatElement(new CodeType(VALID_TARGET_FORMAT_CODE));
      testSignature.setSigFormatElement(new CodeType(VALID_SIG_FORMAT_CODE));
      testSignature.setDataElement(new Base64BinaryType(VALID_DATA));

      expect(testSignature).toBeDefined();
      expect(testSignature.isEmpty()).toBe(false);

      // Signature properties
      expect(testSignature.hasType()).toBe(true);
      expect(testSignature.getType()).toEqual([VALID_TYPE]);
      expect(testSignature.hasWhenElement()).toBe(true);
      expect(testSignature.getWhenElement()).toEqual(VALID_WHEN_TYPE);
      expect(testSignature.hasWhen()).toBe(true);
      expect(testSignature.getWhen()).toEqual(VALID_WHEN);
      expect(testSignature.hasWho()).toBe(true);
      expect(testSignature.getWho()).toEqual(VALID_WHO);
      expect(testSignature.hasOnBehalfOf()).toBe(true);
      expect(testSignature.getOnBehalfOf()).toEqual(ONBEHALFOF_REFERENCE);
      expect(testSignature.hasTargetFormatElement()).toBe(true);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType(VALID_TARGET_FORMAT_CODE));
      expect(testSignature.hasTargetFormat()).toBe(true);
      expect(testSignature.getTargetFormat()).toEqual(VALID_TARGET_FORMAT_CODE);
      expect(testSignature.hasSigFormatElement()).toBe(true);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType(VALID_SIG_FORMAT_CODE));
      expect(testSignature.hasSigFormat()).toBe(true);
      expect(testSignature.getSigFormat()).toEqual(VALID_SIG_FORMAT_CODE);
      expect(testSignature.hasDataElement()).toBe(true);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType(VALID_DATA));
      expect(testSignature.hasData()).toBe(true);
      expect(testSignature.getData()).toEqual(VALID_DATA);

      // Reset

      testSignature.setType([VALID_TYPE_2]);
      testSignature.setWhenElement(VALID_WHEN_TYPE_2);
      testSignature.setWho(VALID_WHO_2);
      testSignature.setOnBehalfOf(ONBEHALFOF_REFERENCE_2);
      testSignature.setTargetFormatElement(new CodeType(VALID_TARGET_FORMAT_CODE_2));
      testSignature.setSigFormatElement(new CodeType(VALID_SIG_FORMAT_CODE_2));
      testSignature.setDataElement(new Base64BinaryType(VALID_DATA_2));

      expect(testSignature).toBeDefined();
      expect(testSignature.isEmpty()).toBe(false);

      expect(testSignature.hasType()).toBe(true);
      expect(testSignature.getType()).toEqual([VALID_TYPE_2]);
      expect(testSignature.hasWhenElement()).toBe(true);
      expect(testSignature.getWhenElement()).toEqual(VALID_WHEN_TYPE_2);
      expect(testSignature.hasWhen()).toBe(true);
      expect(testSignature.getWhen()).toEqual(VALID_WHEN_2);
      expect(testSignature.hasWho()).toBe(true);
      expect(testSignature.getWho()).toEqual(VALID_WHO_2);
      expect(testSignature.hasOnBehalfOf()).toBe(true);
      expect(testSignature.getOnBehalfOf()).toEqual(ONBEHALFOF_REFERENCE_2);
      expect(testSignature.hasTargetFormatElement()).toBe(true);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType(VALID_TARGET_FORMAT_CODE_2));
      expect(testSignature.hasTargetFormat()).toBe(true);
      expect(testSignature.getTargetFormat()).toEqual(VALID_TARGET_FORMAT_CODE_2);
      expect(testSignature.hasSigFormatElement()).toBe(true);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType(VALID_SIG_FORMAT_CODE_2));
      expect(testSignature.hasSigFormat()).toBe(true);
      expect(testSignature.getSigFormat()).toEqual(VALID_SIG_FORMAT_CODE_2);
      expect(testSignature.hasDataElement()).toBe(true);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType(VALID_DATA_2));
      expect(testSignature.hasData()).toBe(true);
      expect(testSignature.getData()).toEqual(VALID_DATA_2);

      // Reset tu empty

      testSignature.setOnBehalfOf(UNDEFINED_VALUE);
      testSignature.setTargetFormatElement(UNDEFINED_VALUE);
      testSignature.setSigFormatElement(UNDEFINED_VALUE);
      testSignature.setDataElement(UNDEFINED_VALUE);

      expect(testSignature).toBeDefined();
      expect(testSignature.isEmpty()).toBe(false);

      expect(testSignature.hasOnBehalfOf()).toBe(false);
      expect(testSignature.getOnBehalfOf()).toEqual(new Reference());
      expect(testSignature.hasTargetFormatElement()).toBe(false);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType());
      expect(testSignature.hasTargetFormat()).toBe(false);
      expect(testSignature.getTargetFormat()).toBeUndefined();
      expect(testSignature.hasSigFormatElement()).toBe(false);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType());
      expect(testSignature.hasSigFormat()).toBe(false);
      expect(testSignature.getSigFormat()).toBeUndefined();
      expect(testSignature.hasDataElement()).toBe(false);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType());
      expect(testSignature.hasData()).toBe(false);
      expect(testSignature.getData()).toBeUndefined();
    });

    it('should throw errors for invalid DataType values', () => {
      const testSignature = new Signature([VALID_TYPE], VALID_WHEN, VALID_WHO);

      let t = () => {
        // @ts-expect-error: allow for testing
        testSignature.setType([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Signature.type; Provided value array has an element that is not an instance of Coding.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testSignature.addType(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Signature.type; Provided element is not an instance of Coding.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testSignature.setWho(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setWho (Signature.who) expects a single argument to be type of 'Reference | undefined | null'`,
      );

      t = () => {
        testSignature.setWho(INVALID_REFERENCE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setWho (Signature.who) expects argument (Basic/123) to be a valid 'Reference' type`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testSignature.setOnBehalfOf(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setOnBehalfOf (Signature.onBehalfOf) expects a single argument to be type of 'Reference | undefined | null'`,
      );

      t = () => {
        testSignature.setOnBehalfOf(INVALID_REFERENCE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setOnBehalfOf (Signature.onBehalfOf) expects argument (Basic/123) to be a valid 'Reference' type`,
      );
    });
  });

  describe('Serialization/Deserialization', () => {
    const VALID_JSON = {
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
      type: [
        {
          system: 'urn:iso-astm:E1762-95:2013',
          code: '1.2.840.10065.1.12.1.1',
          display: "Author's Signature",
        },
      ],
      when: '2024-02-07T13:28:00.000+04:00',
      _when: {
        id: 'S-1357',
        extension: [
          {
            url: 'simpleUrl',
            valueString: 'simple extension string value',
          },
        ],
      },
      who: {
        reference: 'Practitioner/13579',
      },
      onBehalfOf: {
        extension: [
          {
            id: 'C-2468',
            url: 'complexUrl',
            extension: [
              {
                url: 'complexChildUrl1',
                valueString: 'complex child extension string value 1',
              },
              {
                url: 'complexChildUrl2',
                valueString: 'complex child extension string value 2',
              },
            ],
          },
        ],
        reference: 'Organization/24680',
      },
      targetFormat: 'xml',
      sigFormat: 'application/signature+xml',
      data: 'VGhpcyBpcyBhbiBleGFtcGxlIG9mIGEgRkhJUiBTaWduYXR1cmUgZGF0YS4=',
    };

    it('should return undefined for empty json', () => {
      let testType = Signature.parse({});
      expect(testType).toBeUndefined();

      // @ts-expect-error: allow for testing
      testType = Signature.parse(undefined);
      expect(testType).toBeUndefined();

      testType = Signature.parse(null);
      expect(testType).toBeUndefined();
    });

    it('should throw FhirError for missing required fields', () => {
      const INVALID_JSON = { bogus: true };

      const t = () => {
        Signature.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: Signature.type, Signature.when, Signature.who`,
      );
    });

    it('should throw FhirError for missing type', () => {
      const INVALID_JSON = { when: '2024-02-07T13:28:00.000+04:00', who: { reference: 'Practitioner/13579' } };

      const t = () => {
        Signature.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties must be included in the provided JSON: Signature.type`);
    });

    it('should throw TypeError for invalid type', () => {
      const INVALID_JSON = {
        type: 'bogus type',
        when: '2024-02-07T13:28:00.000+04:00',
        who: { reference: 'Practitioner/13579' },
      };

      const t = () => {
        Signature.parse(INVALID_JSON);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Signature.type is not a JSON array.`);
    });

    it('should throw FhirError for missing when', () => {
      const INVALID_JSON = { type: [{ code: '1.2.840.10065.1.12.1.1' }], who: { reference: 'Practitioner/13579' } };

      const t = () => {
        Signature.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties must be included in the provided JSON: Signature.when`);
    });

    it('should throw PrimitiveTypeError for invalid when', () => {
      const INVALID_JSON = {
        type: [{ code: '1.2.840.10065.1.12.1.1' }],
        when: 'bogus type',
        who: { reference: 'Practitioner/13579' },
      };

      const t = () => {
        Signature.parse(INVALID_JSON);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for InstantType (bogus type)`);
    });

    it('should throw FhirError for missing who', () => {
      const INVALID_JSON = { type: [{ code: '1.2.840.10065.1.12.1.1' }], when: '2024-02-07T13:28:00.000+04:00' };

      const t = () => {
        Signature.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties must be included in the provided JSON: Signature.who`);
    });

    it('should throw TypeError for invalid who', () => {
      const INVALID_JSON = {
        type: [{ code: '1.2.840.10065.1.12.1.1' }],
        when: '2024-02-07T13:28:00.000+04:00',
        who: 'Practitioner/13579',
      };

      const t = () => {
        Signature.parse(INVALID_JSON);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Signature.who JSON is not a JSON object.`);
    });

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testId = 'id1234';
      const testSignature = new Signature(null, null, null);
      testSignature.setId(testId);

      const t = () => {
        testSignature.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties do not exist: Signature.type, Signature.when, Signature.who`,
      );
    });

    it('should properly create serialized content', () => {
      const VALID_TYPE = new Coding();
      VALID_TYPE.setSystem('urn:iso-astm:E1762-95:2013')
        .setCode('1.2.840.10065.1.12.1.1')
        .setDisplay(`Author's Signature`);

      const VALID_WHEN = '2024-02-07T13:28:00.000+04:00';
      const testWhen = VALID_WHEN_TYPE.copy();
      testWhen.setId('S-1357');
      const WHEN_EXTENSION = new Extension('simpleUrl', new StringType('simple extension string value'));
      testWhen.addExtension(WHEN_EXTENSION);

      const VALID_WHO = new Reference();
      VALID_WHO.setReference('Practitioner/13579');

      const testSignature = new Signature([VALID_TYPE], testWhen, VALID_WHO);
      const testId = 'id1234';
      testSignature.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testSignature.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testSignature.addExtension(testExtension2);

      const CHILD_EXTENSION_1 = new Extension(
        'complexChildUrl1',
        new StringType('complex child extension string value 1'),
      );
      const CHILD_EXTENSION_2 = new Extension(
        'complexChildUrl2',
        new StringType('complex child extension string value 2'),
      );
      const ONBEHALFOF_EXTENSION = new Extension('complexUrl');
      ONBEHALFOF_EXTENSION.setId('C-2468');
      ONBEHALFOF_EXTENSION.addExtension(CHILD_EXTENSION_1);
      ONBEHALFOF_EXTENSION.addExtension(CHILD_EXTENSION_2);
      const onBehalfOf = ONBEHALFOF_REFERENCE.copy();
      onBehalfOf.addExtension(ONBEHALFOF_EXTENSION);
      testSignature.setOnBehalfOf(onBehalfOf);

      testSignature.setTargetFormat(VALID_TARGET_FORMAT_CODE);
      testSignature.setSigFormat(VALID_SIG_FORMAT_CODE);
      testSignature.setData(VALID_DATA);

      expect(testSignature).toBeDefined();
      expect(testSignature).toBeInstanceOf(DataType);
      expect(testSignature).toBeInstanceOf(Signature);
      expect(testSignature.constructor.name).toStrictEqual('Signature');
      expect(testSignature.fhirType()).toStrictEqual('Signature');
      expect(testSignature.isEmpty()).toBe(false);
      expect(testSignature.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testSignature.hasId()).toBe(true);
      expect(testSignature.getId()).toStrictEqual(testId);
      expect(testSignature.hasExtension()).toBe(true);
      expect(testSignature.getExtension()).toEqual([testExtension1, testExtension2]);

      // Signature properties
      expect(testSignature.hasType()).toBe(true);
      expect(testSignature.getType()).toEqual([VALID_TYPE]);
      expect(testSignature.hasWhenElement()).toBe(true);
      expect(testSignature.getWhenElement()).toEqual(testWhen);
      expect(testSignature.hasWhen()).toBe(true);
      expect(testSignature.getWhen()).toEqual(VALID_WHEN);
      expect(testSignature.hasWho()).toBe(true);
      expect(testSignature.getWho()).toEqual(VALID_WHO);
      expect(testSignature.hasOnBehalfOf()).toBe(true);
      expect(testSignature.getOnBehalfOf()).toEqual(onBehalfOf);
      expect(testSignature.hasTargetFormatElement()).toBe(true);
      expect(testSignature.getTargetFormatElement()).toEqual(new CodeType(VALID_TARGET_FORMAT_CODE));
      expect(testSignature.hasTargetFormat()).toBe(true);
      expect(testSignature.getTargetFormat()).toEqual(VALID_TARGET_FORMAT_CODE);
      expect(testSignature.hasSigFormatElement()).toBe(true);
      expect(testSignature.getSigFormatElement()).toEqual(new CodeType(VALID_SIG_FORMAT_CODE));
      expect(testSignature.hasSigFormat()).toBe(true);
      expect(testSignature.getSigFormat()).toEqual(VALID_SIG_FORMAT_CODE);
      expect(testSignature.hasDataElement()).toBe(true);
      expect(testSignature.getDataElement()).toEqual(new Base64BinaryType(VALID_DATA));
      expect(testSignature.hasData()).toBe(true);
      expect(testSignature.getData()).toEqual(VALID_DATA);

      expect(testSignature.toJSON()).toEqual(VALID_JSON);
    });

    it('should return Signature for valid json', () => {
      const testType: Signature | undefined = Signature.parse(VALID_JSON);

      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(Signature);
      expect(testType?.constructor.name).toStrictEqual('Signature');
      expect(testType?.fhirType()).toStrictEqual('Signature');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });
});
