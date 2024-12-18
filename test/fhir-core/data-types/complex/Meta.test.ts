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

import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { fhirCanonical } from '@src/fhir-core/data-types/primitive/primitive-types';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { InstantType } from '@src/fhir-core/data-types/primitive/InstantType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { CanonicalType } from '@src/fhir-core/data-types/primitive/CanonicalType';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { INVALID_NON_STRING_TYPE, UNDEFINED_VALUE } from '../../../test-utils';

describe('Meta', () => {
  const VALID_ID = `a-432.E-12345`;
  const VALID_ID_TYPE = new IdType(VALID_ID);
  const VALID_ID_2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz.0123456789`;
  const VALID_ID_TYPE_2 = new IdType(VALID_ID_2);
  const INVALID_ID = `a[432]!E{12345}`;

  const VALID_INSTANT = `2015-02-07T13:28:17.239+02:00`;
  const VALID_INSTANT_TYPE = new InstantType(VALID_INSTANT);
  const VALID_INSTANT_2 = `2017-01-01T00:00:00Z`;
  const VALID_INSTANT_TYPE_2 = new InstantType(VALID_INSTANT_2);
  const INVALID_INSTANT = `invalid instant`;

  const VALID_URI = `testUriType`;
  const VALID_URI_TYPE = new UriType(VALID_URI);
  const VALID_URI_2 = `testUriType2`;
  const VALID_URI_TYPE_2 = new UriType(VALID_URI_2);
  const INVALID_URI = ' invalid Uri ';

  const VALID_CANONICAL = `testCanonical` as fhirCanonical;
  const VALID_CANONICAL_TYPE = new CanonicalType(VALID_CANONICAL);
  const VALID_CANONICAL_2 = `testCanonical2` as fhirCanonical;
  const VALID_CANONICAL_TYPE_2 = new CanonicalType(VALID_CANONICAL_2);
  const INVALID_CANONICAL = ' invalid Uri ' as fhirCanonical;

  const VALID_CODING_SECURITY = new Coding();
  VALID_CODING_SECURITY.setSystem('testSystemSecurity');
  VALID_CODING_SECURITY.setCode('testCodeSecurity');
  VALID_CODING_SECURITY.setDisplay('testDisplaySecurity');

  const VALID_CODING_SECURITY_2 = new Coding();
  VALID_CODING_SECURITY_2.setSystem('testSystemSecurity2');
  VALID_CODING_SECURITY_2.setCode('testCodeSecurity2');
  VALID_CODING_SECURITY_2.setDisplay('testDisplaySecurity2');

  const VALID_CODING_TAG = new Coding();
  VALID_CODING_TAG.setSystem('testSystemTag');
  VALID_CODING_TAG.setCode('testCodeTag');
  VALID_CODING_TAG.setDisplay('testDisplayTag');

  const VALID_CODING_TAG_2 = new Coding();
  VALID_CODING_TAG_2.setSystem('testSystemTag2');
  VALID_CODING_TAG_2.setCode('testCodeTag2');
  VALID_CODING_TAG_2.setDisplay('testDisplayTag2');

  describe('Core', () => {
    const expectedJson = {
      versionId: VALID_ID,
      lastUpdated: VALID_INSTANT,
      source: VALID_URI,
      profile: [VALID_CANONICAL],
      security: [
        {
          system: VALID_CODING_SECURITY.getSystem(),
          code: VALID_CODING_SECURITY.getCode(),
          display: VALID_CODING_SECURITY.getDisplay(),
        },
      ],
      tag: [
        {
          system: VALID_CODING_TAG.getSystem(),
          code: VALID_CODING_TAG.getCode(),
          display: VALID_CODING_TAG.getDisplay(),
        },
      ],
    };

    it('should be properly instantiated as empty', () => {
      const testMeta = new Meta();
      expect(testMeta).toBeDefined();
      expect(testMeta).toBeInstanceOf(DataType);
      expect(testMeta).toBeInstanceOf(Meta);
      expect(testMeta.constructor.name).toStrictEqual('Meta');
      expect(testMeta.fhirType()).toStrictEqual('Meta');
      expect(testMeta.isEmpty()).toBe(true);
      expect(testMeta.isComplexDataType()).toBe(true);
      expect(testMeta.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testMeta.hasId()).toBe(false);
      expect(testMeta.getId()).toBeUndefined();
      expect(testMeta.hasExtension()).toBe(false);
      expect(testMeta.getExtension()).toEqual([] as Extension[]);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(false);
      expect(testMeta.getVersionIdElement()).toEqual(new IdType());
      expect(testMeta.hasLastUpdatedElement()).toBe(false);
      expect(testMeta.getLastUpdatedElement()).toEqual(new InstantType());
      expect(testMeta.hasSourceElement()).toBe(false);
      expect(testMeta.getSourceElement()).toEqual(new UriType());
      expect(testMeta.hasProfileElement()).toBe(false);
      expect(testMeta.getProfileElement()).toEqual([] as CanonicalType[]);

      expect(testMeta.hasVersionId()).toBe(false);
      expect(testMeta.getVersionId()).toBeUndefined();
      expect(testMeta.hasLastUpdated()).toBe(false);
      expect(testMeta.getLastUpdated()).toBeUndefined();
      expect(testMeta.hasSource()).toBe(false);
      expect(testMeta.getSource()).toBeUndefined();
      expect(testMeta.hasProfile()).toBe(false);
      expect(testMeta.getProfile()).toEqual([] as CanonicalType[]);
      expect(testMeta.hasSecurity()).toBe(false);
      expect(testMeta.getSecurity()).toEqual([] as Coding[]);
      expect(testMeta.hasTag()).toBe(false);
      expect(testMeta.getTag()).toEqual([] as Coding[]);
    });

    it('should properly copy()', () => {
      const metaType = new Meta();
      metaType.setVersionId(VALID_ID);
      metaType.setLastUpdated(VALID_INSTANT);
      metaType.setSource(VALID_URI);
      metaType.setProfile([VALID_CANONICAL]);
      metaType.setSecurity([VALID_CODING_SECURITY]);
      metaType.setTag([VALID_CODING_TAG]);

      let testMeta = metaType.copy();
      expect(testMeta).toBeDefined();
      expect(testMeta).toBeInstanceOf(DataType);
      expect(testMeta).toBeInstanceOf(Meta);
      expect(testMeta.constructor.name).toStrictEqual('Meta');
      expect(testMeta.fhirType()).toStrictEqual('Meta');
      expect(testMeta.isEmpty()).toBe(false);
      expect(testMeta.isComplexDataType()).toBe(true);
      expect(testMeta.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testMeta.hasId()).toBe(false);
      expect(testMeta.getId()).toBeUndefined();
      expect(testMeta.hasExtension()).toBe(false);
      expect(testMeta.getExtension()).toEqual([] as Extension[]);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(true);
      expect(testMeta.getVersionIdElement()).toEqual(VALID_ID_TYPE);
      expect(testMeta.hasLastUpdatedElement()).toBe(true);
      expect(testMeta.getLastUpdatedElement()).toEqual(VALID_INSTANT_TYPE);
      expect(testMeta.hasSourceElement()).toBe(true);
      expect(testMeta.getSourceElement()).toEqual(VALID_URI_TYPE);
      expect(testMeta.hasProfileElement()).toBe(true);
      expect(testMeta.getProfileElement()).toEqual([VALID_CANONICAL_TYPE]);

      expect(testMeta.hasVersionId()).toBe(true);
      expect(testMeta.getVersionId()).toStrictEqual(VALID_ID);
      expect(testMeta.hasLastUpdated()).toBe(true);
      expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT);
      expect(testMeta.hasSource()).toBe(true);
      expect(testMeta.getSource()).toStrictEqual(VALID_URI);
      expect(testMeta.hasProfile()).toBe(true);
      expect(testMeta.getProfile()).toEqual([VALID_CANONICAL]);
      expect(testMeta.hasSecurity()).toBe(true);
      expect(testMeta.getSecurity()).toEqual([VALID_CODING_SECURITY]);
      expect(testMeta.hasTag()).toBe(true);
      expect(testMeta.getTag()).toEqual([VALID_CODING_TAG]);

      // Reset as empty

      metaType.setVersionId(UNDEFINED_VALUE);
      metaType.setLastUpdated(UNDEFINED_VALUE);
      metaType.setSource(UNDEFINED_VALUE);
      metaType.setProfile(UNDEFINED_VALUE);
      metaType.setSecurity(UNDEFINED_VALUE);
      metaType.setTag(UNDEFINED_VALUE);

      testMeta = metaType.copy();
      expect(testMeta).toBeDefined();
      expect(testMeta).toBeInstanceOf(DataType);
      expect(testMeta).toBeInstanceOf(Meta);
      expect(testMeta.constructor.name).toStrictEqual('Meta');
      expect(testMeta.fhirType()).toStrictEqual('Meta');
      expect(testMeta.isEmpty()).toBe(true);
      expect(testMeta.isComplexDataType()).toBe(true);
      expect(testMeta.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testMeta.hasId()).toBe(false);
      expect(testMeta.getId()).toBeUndefined();
      expect(testMeta.hasExtension()).toBe(false);
      expect(testMeta.getExtension()).toEqual([] as Extension[]);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(false);
      expect(testMeta.getVersionIdElement()).toEqual(new IdType());
      expect(testMeta.hasLastUpdatedElement()).toBe(false);
      expect(testMeta.getLastUpdatedElement()).toEqual(new InstantType());
      expect(testMeta.hasSourceElement()).toBe(false);
      expect(testMeta.getSourceElement()).toEqual(new UriType());
      expect(testMeta.hasProfileElement()).toBe(false);
      expect(testMeta.getProfileElement()).toEqual([] as CanonicalType[]);

      expect(testMeta.hasVersionId()).toBe(false);
      expect(testMeta.getVersionId()).toBeUndefined();
      expect(testMeta.hasLastUpdated()).toBe(false);
      expect(testMeta.getLastUpdated()).toBeUndefined();
      expect(testMeta.hasSource()).toBe(false);
      expect(testMeta.getSource()).toBeUndefined();
      expect(testMeta.hasProfile()).toBe(false);
      expect(testMeta.getProfile()).toEqual([] as CanonicalType[]);
      expect(testMeta.hasSecurity()).toBe(false);
      expect(testMeta.getSecurity()).toEqual([] as Coding[]);
      expect(testMeta.hasTag()).toBe(false);
      expect(testMeta.getTag()).toEqual([] as Coding[]);
    });

    // Tests using primitives

    it('should be properly initialized by setting all properties with primitive values', () => {
      const testMeta = new Meta();
      testMeta.setVersionId(VALID_ID);
      testMeta.setLastUpdated(VALID_INSTANT);
      testMeta.setSource(VALID_URI);
      testMeta.setProfile([VALID_CANONICAL]);
      testMeta.setSecurity([VALID_CODING_SECURITY]);
      testMeta.setTag([VALID_CODING_TAG]);

      expect(testMeta).toBeDefined();
      expect(testMeta).toBeInstanceOf(DataType);
      expect(testMeta).toBeInstanceOf(Meta);
      expect(testMeta.constructor.name).toStrictEqual('Meta');
      expect(testMeta.fhirType()).toStrictEqual('Meta');
      expect(testMeta.isEmpty()).toBe(false);
      expect(testMeta.isComplexDataType()).toBe(true);
      expect(testMeta.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testMeta.hasId()).toBe(false);
      expect(testMeta.getId()).toBeUndefined();
      expect(testMeta.hasExtension()).toBe(false);
      expect(testMeta.getExtension()).toEqual([] as Extension[]);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(true);
      expect(testMeta.getVersionIdElement()).toEqual(VALID_ID_TYPE);
      expect(testMeta.hasLastUpdatedElement()).toBe(true);
      expect(testMeta.getLastUpdatedElement()).toEqual(VALID_INSTANT_TYPE);
      expect(testMeta.hasSourceElement()).toBe(true);
      expect(testMeta.getSourceElement()).toEqual(VALID_URI_TYPE);
      expect(testMeta.hasProfileElement()).toBe(true);
      expect(testMeta.getProfileElement()).toEqual([VALID_CANONICAL_TYPE]);

      expect(testMeta.hasVersionId()).toBe(true);
      expect(testMeta.getVersionId()).toStrictEqual(VALID_ID);
      expect(testMeta.hasLastUpdated()).toBe(true);
      expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT);
      expect(testMeta.hasSource()).toBe(true);
      expect(testMeta.getSource()).toStrictEqual(VALID_URI);
      expect(testMeta.hasProfile()).toBe(true);
      expect(testMeta.getProfile()).toEqual([VALID_CANONICAL]);
      expect(testMeta.hasSecurity()).toBe(true);
      expect(testMeta.getSecurity()).toEqual([VALID_CODING_SECURITY]);
      expect(testMeta.hasTag()).toBe(true);
      expect(testMeta.getTag()).toEqual([VALID_CODING_TAG]);
    });

    it('should properly reset by modifying all properties with primitive values', () => {
      const testMeta = new Meta();
      testMeta.setVersionId(VALID_ID);
      testMeta.setLastUpdated(VALID_INSTANT);
      testMeta.setSource(VALID_URI);
      testMeta.setProfile([VALID_CANONICAL]);
      testMeta.setSecurity([VALID_CODING_SECURITY]);
      testMeta.setTag([VALID_CODING_TAG]);

      expect(testMeta).toBeDefined();
      expect(testMeta.isEmpty()).toBe(false);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(true);
      expect(testMeta.getVersionIdElement()).toEqual(VALID_ID_TYPE);
      expect(testMeta.hasLastUpdatedElement()).toBe(true);
      expect(testMeta.getLastUpdatedElement()).toEqual(VALID_INSTANT_TYPE);
      expect(testMeta.hasSourceElement()).toBe(true);
      expect(testMeta.getSourceElement()).toEqual(VALID_URI_TYPE);
      expect(testMeta.hasProfileElement()).toBe(true);
      expect(testMeta.getProfileElement()).toEqual([VALID_CANONICAL_TYPE]);

      expect(testMeta.hasVersionId()).toBe(true);
      expect(testMeta.getVersionId()).toStrictEqual(VALID_ID);
      expect(testMeta.hasLastUpdated()).toBe(true);
      expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT);
      expect(testMeta.hasSource()).toBe(true);
      expect(testMeta.getSource()).toStrictEqual(VALID_URI);
      expect(testMeta.hasProfile()).toBe(true);
      expect(testMeta.getProfile()).toEqual([VALID_CANONICAL]);
      expect(testMeta.hasSecurity()).toBe(true);
      expect(testMeta.getSecurity()).toEqual([VALID_CODING_SECURITY]);
      expect(testMeta.hasTag()).toBe(true);
      expect(testMeta.getTag()).toEqual([VALID_CODING_TAG]);

      // Reset

      testMeta.setVersionId(VALID_ID_2);
      testMeta.setLastUpdated(VALID_INSTANT_2);
      testMeta.setSource(VALID_URI_2);
      testMeta.setProfile([VALID_CANONICAL_2]);
      testMeta.setSecurity([VALID_CODING_SECURITY_2]);
      testMeta.setTag([VALID_CODING_TAG_2]);

      expect(testMeta).toBeDefined();
      expect(testMeta.isEmpty()).toBe(false);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(true);
      expect(testMeta.getVersionIdElement()).toEqual(new IdType(VALID_ID_2));
      expect(testMeta.hasLastUpdatedElement()).toBe(true);
      expect(testMeta.getLastUpdatedElement()).toEqual(new InstantType(VALID_INSTANT_2));
      expect(testMeta.hasSourceElement()).toBe(true);
      expect(testMeta.getSourceElement()).toEqual(new UriType(VALID_URI_2));
      expect(testMeta.hasProfileElement()).toBe(true);
      expect(testMeta.getProfileElement()).toEqual([VALID_CANONICAL_TYPE_2]);

      expect(testMeta.hasVersionId()).toBe(true);
      expect(testMeta.getVersionId()).toStrictEqual(VALID_ID_2);
      expect(testMeta.hasLastUpdated()).toBe(true);
      expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT_2);
      expect(testMeta.hasSource()).toBe(true);
      expect(testMeta.getSource()).toStrictEqual(VALID_URI_2);
      expect(testMeta.hasProfile()).toBe(true);
      expect(testMeta.getProfile()).toEqual([VALID_CANONICAL_2]);
      expect(testMeta.hasSecurity()).toBe(true);
      expect(testMeta.getSecurity()).toEqual([VALID_CODING_SECURITY_2]);
      expect(testMeta.hasTag()).toBe(true);
      expect(testMeta.getTag()).toEqual([VALID_CODING_TAG_2]);

      // Reset to empty

      testMeta.setVersionId(UNDEFINED_VALUE);
      testMeta.setLastUpdated(UNDEFINED_VALUE);
      testMeta.setSource(UNDEFINED_VALUE);
      testMeta.setProfile(UNDEFINED_VALUE);
      testMeta.setSecurity(UNDEFINED_VALUE);
      testMeta.setTag(UNDEFINED_VALUE);

      expect(testMeta).toBeDefined();
      expect(testMeta.isEmpty()).toBe(true);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(false);
      expect(testMeta.getVersionIdElement()).toEqual(new IdType());
      expect(testMeta.hasLastUpdatedElement()).toBe(false);
      expect(testMeta.getLastUpdatedElement()).toEqual(new InstantType());
      expect(testMeta.hasSourceElement()).toBe(false);
      expect(testMeta.getSourceElement()).toEqual(new UriType());
      expect(testMeta.hasProfileElement()).toBe(false);
      expect(testMeta.getProfileElement()).toEqual([] as CanonicalType[]);

      expect(testMeta.hasVersionId()).toBe(false);
      expect(testMeta.getVersionId()).toBeUndefined();
      expect(testMeta.hasLastUpdated()).toBe(false);
      expect(testMeta.getLastUpdated()).toBeUndefined();
      expect(testMeta.hasSource()).toBe(false);
      expect(testMeta.getSource()).toBeUndefined();
      expect(testMeta.hasProfile()).toBe(false);
      expect(testMeta.getProfile()).toEqual([] as CanonicalType[]);
      expect(testMeta.hasSecurity()).toBe(false);
      expect(testMeta.getSecurity()).toEqual([] as Coding[]);
      expect(testMeta.hasTag()).toBe(false);
      expect(testMeta.getTag()).toEqual([] as Coding[]);
    });

    it('should be properly reset by adding data elements to primitive lists', () => {
      const testMeta = new Meta();
      expect(testMeta).toBeDefined();
      expect(testMeta.isEmpty()).toBe(true);

      testMeta.addProfile(VALID_CANONICAL);
      testMeta.addProfile(VALID_CANONICAL_2);
      testMeta.addProfile(UNDEFINED_VALUE);
      expect(testMeta.hasProfile()).toBe(true);
      expect(testMeta.getProfile()).toHaveLength(2);
      expect(testMeta.getProfile()).toEqual([VALID_CANONICAL, VALID_CANONICAL_2]);
      expect(testMeta.hasProfileElement()).toBe(true);
      expect(testMeta.getProfileElement()).toHaveLength(2);
      expect(testMeta.getProfileElement()).toEqual([VALID_CANONICAL_TYPE, VALID_CANONICAL_TYPE_2]);
    });

    it('should throw errors for invalid primitive values', () => {
      const testMeta = new Meta();

      let t = () => {
        testMeta.setVersionId(INVALID_ID);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Meta.versionId (${INVALID_ID})`);

      t = () => {
        testMeta.setLastUpdated(INVALID_INSTANT);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Meta.lastUpdated (${INVALID_INSTANT})`);

      t = () => {
        testMeta.setSource(INVALID_URI);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Meta.source (${INVALID_URI})`);

      t = () => {
        testMeta.setProfile([INVALID_CANONICAL]);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Meta.profile array item (${INVALID_URI})`);

      t = () => {
        testMeta.addProfile(INVALID_CANONICAL);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Meta.profile array item (${INVALID_URI})`);
    });

    // Tests using DataType elements

    it('should be properly initialized by setting all properties with DataType values', () => {
      const testMeta = new Meta();
      testMeta.setVersionIdElement(VALID_ID_TYPE);
      testMeta.setLastUpdatedElement(VALID_INSTANT_TYPE);
      testMeta.setSourceElement(VALID_URI_TYPE);
      testMeta.setProfileElement([VALID_CANONICAL_TYPE]);
      testMeta.setSecurity([VALID_CODING_SECURITY]);
      testMeta.setTag([VALID_CODING_TAG]);

      expect(testMeta).toBeDefined();
      expect(testMeta).toBeInstanceOf(DataType);
      expect(testMeta).toBeInstanceOf(Meta);
      expect(testMeta.constructor.name).toStrictEqual('Meta');
      expect(testMeta.fhirType()).toStrictEqual('Meta');
      expect(testMeta.isEmpty()).toBe(false);
      expect(testMeta.isComplexDataType()).toBe(true);
      expect(testMeta.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testMeta.hasId()).toBe(false);
      expect(testMeta.getId()).toBeUndefined();
      expect(testMeta.hasExtension()).toBe(false);
      expect(testMeta.getExtension()).toEqual([] as Extension[]);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(true);
      expect(testMeta.getVersionIdElement()).toEqual(VALID_ID_TYPE);
      expect(testMeta.hasLastUpdatedElement()).toBe(true);
      expect(testMeta.getLastUpdatedElement()).toEqual(VALID_INSTANT_TYPE);
      expect(testMeta.hasSourceElement()).toBe(true);
      expect(testMeta.getSourceElement()).toEqual(VALID_URI_TYPE);
      expect(testMeta.hasProfileElement()).toBe(true);
      expect(testMeta.getProfileElement()).toEqual([VALID_CANONICAL_TYPE]);

      expect(testMeta.hasVersionId()).toBe(true);
      expect(testMeta.getVersionId()).toStrictEqual(VALID_ID);
      expect(testMeta.hasLastUpdated()).toBe(true);
      expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT);
      expect(testMeta.hasSource()).toBe(true);
      expect(testMeta.getSource()).toStrictEqual(VALID_URI);
      expect(testMeta.hasProfile()).toBe(true);
      expect(testMeta.getProfile()).toEqual([VALID_CANONICAL]);
      expect(testMeta.hasSecurity()).toBe(true);
      expect(testMeta.getSecurity()).toEqual([VALID_CODING_SECURITY]);
      expect(testMeta.hasTag()).toBe(true);
      expect(testMeta.getTag()).toEqual([VALID_CODING_TAG]);
    });

    it('should be properly reset by modifying all properties with DataType values', () => {
      const testMeta = new Meta();
      testMeta.setVersionIdElement(VALID_ID_TYPE);
      testMeta.setLastUpdatedElement(VALID_INSTANT_TYPE);
      testMeta.setSourceElement(VALID_URI_TYPE);
      testMeta.setProfileElement([VALID_CANONICAL_TYPE]);
      testMeta.setSecurity([VALID_CODING_SECURITY]);
      testMeta.setTag([VALID_CODING_TAG]);

      expect(testMeta).toBeDefined();
      expect(testMeta.isEmpty()).toBe(false);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(true);
      expect(testMeta.getVersionIdElement()).toEqual(VALID_ID_TYPE);
      expect(testMeta.hasLastUpdatedElement()).toBe(true);
      expect(testMeta.getLastUpdatedElement()).toEqual(VALID_INSTANT_TYPE);
      expect(testMeta.hasSourceElement()).toBe(true);
      expect(testMeta.getSourceElement()).toEqual(VALID_URI_TYPE);
      expect(testMeta.hasProfileElement()).toBe(true);
      expect(testMeta.getProfileElement()).toEqual([VALID_CANONICAL_TYPE]);

      expect(testMeta.hasVersionId()).toBe(true);
      expect(testMeta.getVersionId()).toStrictEqual(VALID_ID);
      expect(testMeta.hasLastUpdated()).toBe(true);
      expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT);
      expect(testMeta.hasSource()).toBe(true);
      expect(testMeta.getSource()).toStrictEqual(VALID_URI);
      expect(testMeta.hasProfile()).toBe(true);
      expect(testMeta.getProfile()).toEqual([VALID_CANONICAL]);
      expect(testMeta.hasSecurity()).toBe(true);
      expect(testMeta.getSecurity()).toEqual([VALID_CODING_SECURITY]);
      expect(testMeta.hasTag()).toBe(true);
      expect(testMeta.getTag()).toEqual([VALID_CODING_TAG]);

      // Reset

      testMeta.setVersionIdElement(VALID_ID_TYPE_2);
      testMeta.setLastUpdatedElement(VALID_INSTANT_TYPE_2);
      testMeta.setSourceElement(VALID_URI_TYPE_2);
      testMeta.setProfileElement([VALID_CANONICAL_TYPE_2]);
      testMeta.setSecurity([VALID_CODING_SECURITY_2]);
      testMeta.setTag([VALID_CODING_TAG_2]);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(true);
      expect(testMeta.getVersionIdElement()).toEqual(VALID_ID_TYPE_2);
      expect(testMeta.hasLastUpdatedElement()).toBe(true);
      expect(testMeta.getLastUpdatedElement()).toEqual(VALID_INSTANT_TYPE_2);
      expect(testMeta.hasSourceElement()).toBe(true);
      expect(testMeta.getSourceElement()).toEqual(VALID_URI_TYPE_2);
      expect(testMeta.hasProfileElement()).toBe(true);
      expect(testMeta.getProfileElement()).toEqual([VALID_CANONICAL_TYPE_2]);

      expect(testMeta.hasVersionId()).toBe(true);
      expect(testMeta.getVersionId()).toStrictEqual(VALID_ID_2);
      expect(testMeta.hasLastUpdated()).toBe(true);
      expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT_2);
      expect(testMeta.hasSource()).toBe(true);
      expect(testMeta.getSource()).toStrictEqual(VALID_URI_2);
      expect(testMeta.hasProfile()).toBe(true);
      expect(testMeta.getProfile()).toEqual([VALID_CANONICAL_2]);
      expect(testMeta.hasSecurity()).toBe(true);
      expect(testMeta.getSecurity()).toEqual([VALID_CODING_SECURITY_2]);
      expect(testMeta.hasTag()).toBe(true);
      expect(testMeta.getTag()).toEqual([VALID_CODING_TAG_2]);

      // Reset to empty

      testMeta.setVersionIdElement(UNDEFINED_VALUE);
      testMeta.setLastUpdatedElement(UNDEFINED_VALUE);
      testMeta.setSourceElement(UNDEFINED_VALUE);
      testMeta.setProfileElement(UNDEFINED_VALUE);
      testMeta.setSecurity(UNDEFINED_VALUE);
      testMeta.setTag(UNDEFINED_VALUE);

      // Meta properties
      expect(testMeta.hasVersionIdElement()).toBe(false);
      expect(testMeta.getVersionIdElement()).toEqual(new IdType());
      expect(testMeta.hasLastUpdatedElement()).toBe(false);
      expect(testMeta.getLastUpdatedElement()).toEqual(new InstantType());
      expect(testMeta.hasSourceElement()).toBe(false);
      expect(testMeta.getSourceElement()).toEqual(new UriType());
      expect(testMeta.hasProfileElement()).toBe(false);
      expect(testMeta.getProfileElement()).toEqual([] as CanonicalType[]);

      expect(testMeta.hasVersionId()).toBe(false);
      expect(testMeta.getVersionId()).toBeUndefined();
      expect(testMeta.hasLastUpdated()).toBe(false);
      expect(testMeta.getLastUpdated()).toBeUndefined();
      expect(testMeta.hasSource()).toBe(false);
      expect(testMeta.getSource()).toBeUndefined();
      expect(testMeta.hasProfile()).toBe(false);
      expect(testMeta.getProfile()).toEqual([] as CanonicalType[]);
      expect(testMeta.hasSecurity()).toBe(false);
      expect(testMeta.getSecurity()).toEqual([] as Coding[]);
      expect(testMeta.hasTag()).toBe(false);
      expect(testMeta.getTag()).toEqual([] as Coding[]);
    });

    it('should be properly reset by adding data elements to DataType lists', () => {
      const testMeta = new Meta();
      expect(testMeta).toBeDefined();
      expect(testMeta.isEmpty()).toBe(true);

      testMeta.addProfileElement(VALID_CANONICAL_TYPE);
      testMeta.addProfileElement(VALID_CANONICAL_TYPE_2);
      testMeta.addProfileElement(UNDEFINED_VALUE);
      expect(testMeta.hasProfile()).toBe(true);
      expect(testMeta.getProfile()).toHaveLength(2);
      expect(testMeta.getProfile()).toEqual([VALID_CANONICAL, VALID_CANONICAL_2]);
      expect(testMeta.hasProfileElement()).toBe(true);
      expect(testMeta.getProfileElement()).toHaveLength(2);
      expect(testMeta.getProfileElement()).toEqual([VALID_CANONICAL_TYPE, VALID_CANONICAL_TYPE_2]);

      testMeta.addSecurity(VALID_CODING_SECURITY);
      testMeta.addSecurity(VALID_CODING_SECURITY_2);
      testMeta.addSecurity(UNDEFINED_VALUE);
      expect(testMeta.hasSecurity()).toBe(true);
      expect(testMeta.getSecurity()).toHaveLength(2);
      expect(testMeta.getSecurity()).toEqual([VALID_CODING_SECURITY, VALID_CODING_SECURITY_2]);

      testMeta.addTag(VALID_CODING_TAG);
      testMeta.addTag(VALID_CODING_TAG_2);
      testMeta.addTag(UNDEFINED_VALUE);
      expect(testMeta.hasTag()).toBe(true);
      expect(testMeta.getTag()).toHaveLength(2);
      expect(testMeta.getTag()).toEqual([VALID_CODING_TAG, VALID_CODING_TAG_2]);
    });

    it('should throw errors for invalid DataType values', () => {
      const testMeta = new Meta();

      let t = () => {
        // @ts-expect-error: ignore invalid type for test
        testMeta.setVersionIdElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Meta.versionId; Provided element is not an instance of IdType.`);

      t = () => {
        // @ts-expect-error: ignore invalid type for test
        testMeta.setLastUpdatedElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Meta.lastUpdated; Provided element is not an instance of InstantType.`);

      t = () => {
        // @ts-expect-error: ignore invalid type for test
        testMeta.setSourceElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Meta.source; Provided element is not an instance of UriType.`);

      t = () => {
        // @ts-expect-error: ignore invalid type for test
        testMeta.setProfileElement([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Meta.profile; Provided element array has an element that is not an instance of CanonicalType.`,
      );

      t = () => {
        // @ts-expect-error: ignore invalid type for test
        testMeta.addProfileElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Meta.profile; Provided element is not an instance of CanonicalType.`);

      t = () => {
        // @ts-expect-error: ignore invalid type for test
        testMeta.setSecurity([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Meta.security; Provided value array has an element that is not an instance of Coding.`);

      t = () => {
        // @ts-expect-error: ignore invalid type for test
        testMeta.addSecurity(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Meta.security; Provided value is not an instance of CodeType.`);

      t = () => {
        // @ts-expect-error: ignore invalid type for test
        testMeta.setTag([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Meta.tag; Provided value array has an element that is not an instance of Coding.`);

      t = () => {
        // @ts-expect-error: ignore invalid type for test
        testMeta.addTag(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Meta.tag; Provided value is not an instance of CodeType.`);
    });
  });

  describe('Serialization/Deserialization', () => {
    it('should properly create serialized content', () => {
      const sourceUri = 'testUriType1';
      const sourceType = new UriType(sourceUri);
      const sourceId = 'S1357';
      const startExtension = new Extension('sourceUrl', new StringType('source extension string value'));
      sourceType.setId(sourceId);
      sourceType.addExtension(startExtension);

      const profileType = new CanonicalType(VALID_CANONICAL_2);
      const profileId = 'C2468';
      const profileExtension = new Extension('profileUrl', new StringType('profile extension string value'));
      profileType.setId(profileId);
      profileType.addExtension(profileExtension);

      const testMeta = new Meta();
      const testId = 'id1234';
      testMeta.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testMeta.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testMeta.addExtension(testExtension2);

      testMeta.setVersionIdElement(VALID_ID_TYPE);
      testMeta.setLastUpdatedElement(VALID_INSTANT_TYPE);
      testMeta.setSourceElement(sourceType);
      testMeta.setProfileElement([profileType]);
      testMeta.setSecurity([VALID_CODING_SECURITY]);
      testMeta.setTag([VALID_CODING_TAG]);

      expect(testMeta).toBeDefined();
      expect(testMeta).toBeInstanceOf(DataType);
      expect(testMeta).toBeInstanceOf(Meta);
      expect(testMeta.constructor.name).toStrictEqual('Meta');
      expect(testMeta.fhirType()).toStrictEqual('Meta');
      expect(testMeta.isEmpty()).toBe(false);
      expect(testMeta.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testMeta.hasId()).toBe(true);
      expect(testMeta.getId()).toStrictEqual(testId);
      expect(testMeta.hasExtension()).toBe(true);
      expect(testMeta.getExtension()).toEqual([testExtension1, testExtension2]);

      // Coding properties
      expect(testMeta.hasVersionIdElement()).toBe(true);
      expect(testMeta.getVersionIdElement()).toEqual(new IdType(VALID_ID));
      expect(testMeta.hasLastUpdatedElement()).toBe(true);
      expect(testMeta.getLastUpdatedElement()).toEqual(new InstantType(VALID_INSTANT));
      expect(testMeta.hasSourceElement()).toBe(true);
      expect(testMeta.getSourceElement()).toEqual(sourceType);
      expect(testMeta.hasProfileElement()).toBe(true);
      expect(testMeta.getProfileElement()).toHaveLength(1); // always returns an array
      expect(testMeta.getProfileElement()[0]).toEqual(profileType);

      expect(testMeta.hasVersionId()).toBe(true);
      expect(testMeta.getVersionId()).toStrictEqual(VALID_ID);
      expect(testMeta.hasLastUpdated()).toBe(true);
      expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT);
      expect(testMeta.hasSource()).toBe(true);
      expect(testMeta.getSource()).toStrictEqual(sourceUri);
      expect(testMeta.hasProfile()).toBe(true);
      expect(testMeta.getProfile()).toHaveLength(1); // always returns an array
      expect(testMeta.getProfile()[0]).toStrictEqual(VALID_CANONICAL_2);
      expect(testMeta.hasSecurity()).toBe(true);
      expect(testMeta.getSecurity()).toHaveLength(1); // always returns an array
      expect(testMeta.getSecurity()[0]).toEqual(VALID_CODING_SECURITY);
      expect(testMeta.hasTag()).toBe(true);
      expect(testMeta.getTag()).toHaveLength(1); // always returns an array
      expect(testMeta.getTag()[0]).toEqual(VALID_CODING_TAG);

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
        versionId: 'a-432.E-12345',
        lastUpdated: '2015-02-07T13:28:17.239+02:00',
        source: 'testUriType1',
        _source: {
          id: 'S1357',
          extension: [
            {
              url: 'sourceUrl',
              valueString: 'source extension string value',
            },
          ],
        },
        profile: ['testCanonical2'],
        _profile: [
          {
            id: 'C2468',
            extension: [
              {
                url: 'profileUrl',
                valueString: 'profile extension string value',
              },
            ],
          },
        ],
        security: [
          {
            system: 'testSystemSecurity',
            code: 'testCodeSecurity',
            display: 'testDisplaySecurity',
          },
        ],
        tag: [
          {
            system: 'testSystemTag',
            code: 'testCodeTag',
            display: 'testDisplayTag',
          },
        ],
      };
      expect(testMeta.toJSON()).toEqual(expectedJson);
    });
  });
});
