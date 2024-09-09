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
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { InstantType } from '@src/fhir-core/data-types/primitive/InstantType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { CanonicalType } from '@src/fhir-core/data-types/primitive/CanonicalType';
import { fhirCanonical } from '@src/fhir-core/data-types/primitive/primitive-types';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

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

  const UNDEFINED_VALUE = undefined;

  it('should be properly instantiated as empty', () => {
    const testMeta = new Meta();
    expect(testMeta).toBeDefined();
    expect(testMeta).toBeInstanceOf(DataType);
    expect(testMeta).toBeInstanceOf(Meta);
    expect(testMeta.constructor.name).toStrictEqual('Meta');
    expect(testMeta.fhirType()).toStrictEqual('Meta');
    expect(testMeta.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testMeta.hasId()).toBe(false);
    expect(testMeta.getId()).toBeUndefined();
    expect(testMeta.hasExtension()).toBe(false);
    expect(testMeta.getExtension()).toMatchObject([] as Extension[]);

    // Coding properties
    expect(testMeta.hasVersionIdElement()).toBe(false);
    expect(testMeta.getVersionIdElement()).toMatchObject(new IdType());
    expect(testMeta.hasLastUpdatedElement()).toBe(false);
    expect(testMeta.getLastUpdatedElement()).toMatchObject(new InstantType());
    expect(testMeta.hasSourceElement()).toBe(false);
    expect(testMeta.getSourceElement()).toMatchObject(new UriType());
    expect(testMeta.hasProfileElement()).toBe(false);
    expect(testMeta.getProfileElement()).toHaveLength(0); // always returns an array

    expect(testMeta.hasVersionId()).toBe(false);
    expect(testMeta.getVersionId()).toBeUndefined();
    expect(testMeta.hasLastUpdated()).toBe(false);
    expect(testMeta.getLastUpdated()).toBeUndefined();
    expect(testMeta.hasSource()).toBe(false);
    expect(testMeta.getSource()).toBeUndefined();
    expect(testMeta.hasProfile()).toBe(false);
    expect(testMeta.getProfile()).toHaveLength(0); // always returns an array
    expect(testMeta.hasSecurity()).toBe(false);
    expect(testMeta.getSecurity()).toHaveLength(0); // always returns an array
    expect(testMeta.hasTag()).toBe(false);
    expect(testMeta.getTag()).toHaveLength(0); // always returns an array
  });

  it('should properly copy()', () => {
    const metaType = new Meta();
    metaType.setVersionIdElement(VALID_ID_TYPE);
    metaType.setLastUpdatedElement(VALID_INSTANT_TYPE);
    metaType.setSourceElement(VALID_URI_TYPE);
    metaType.setProfileElement([VALID_CANONICAL_TYPE]);
    metaType.setSecurity([VALID_CODING_SECURITY]);
    metaType.setTag([VALID_CODING_TAG]);

    const testMeta = metaType.copy();
    expect(testMeta).toBeDefined();
    expect(testMeta).toBeInstanceOf(DataType);
    expect(testMeta).toBeInstanceOf(Meta);
    expect(testMeta.constructor.name).toStrictEqual('Meta');
    expect(testMeta.fhirType()).toStrictEqual('Meta');
    expect(testMeta.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testMeta.hasId()).toBe(false);
    expect(testMeta.getId()).toBeUndefined();
    expect(testMeta.hasExtension()).toBe(false);
    expect(testMeta.getExtension()).toMatchObject([] as Extension[]);

    // Coding properties
    expect(testMeta.hasVersionIdElement()).toBe(true);
    expect(testMeta.getVersionIdElement()).toMatchObject(new IdType(VALID_ID));
    expect(testMeta.hasLastUpdatedElement()).toBe(true);
    expect(testMeta.getLastUpdatedElement()).toMatchObject(new InstantType(VALID_INSTANT));
    expect(testMeta.hasSourceElement()).toBe(true);
    expect(testMeta.getSourceElement()).toMatchObject(new UriType(VALID_URI));
    expect(testMeta.hasProfileElement()).toBe(true);
    expect(testMeta.getProfileElement()).toHaveLength(1); // always returns an array
    expect(testMeta.getProfileElement()[0]).toMatchObject(new CanonicalType(VALID_CANONICAL));

    expect(testMeta.hasVersionId()).toBe(true);
    expect(testMeta.getVersionId()).toStrictEqual(VALID_ID);
    expect(testMeta.hasLastUpdated()).toBe(true);
    expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT);
    expect(testMeta.hasSource()).toBe(true);
    expect(testMeta.getSource()).toStrictEqual(VALID_URI);
    expect(testMeta.hasProfile()).toBe(true);
    expect(testMeta.getProfile()).toHaveLength(1); // always returns an array
    expect(testMeta.getProfile()[0]).toStrictEqual(VALID_CANONICAL);
    expect(testMeta.hasSecurity()).toBe(true);
    expect(testMeta.getSecurity()).toHaveLength(1); // always returns an array
    expect(testMeta.getSecurity()[0]).toMatchObject(VALID_CODING_SECURITY);
    expect(testMeta.hasTag()).toBe(true);
    expect(testMeta.getTag()).toHaveLength(1); // always returns an array
    expect(testMeta.getTag()[0]).toMatchObject(VALID_CODING_TAG);

    // test empty arrays
    metaType.setProfile(UNDEFINED_VALUE);
    metaType.setSecurity(UNDEFINED_VALUE);
    metaType.setTag(UNDEFINED_VALUE);

    const testMeta2 = metaType.copy();
    expect(testMeta2.hasProfileElement()).toBe(false);
    expect(testMeta2.getProfileElement()).toHaveLength(0); // always returns an array
    expect(testMeta2.hasProfile()).toBe(false);
    expect(testMeta2.getProfile()).toHaveLength(0); // always returns an array
    expect(testMeta2.hasSecurity()).toBe(false);
    expect(testMeta2.getSecurity()).toHaveLength(0); // always returns an array
    expect(testMeta2.hasTag()).toBe(false);
    expect(testMeta2.getTag()).toHaveLength(0); // always returns an array
  });

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

    // inherited properties from Element
    expect(testMeta.hasId()).toBe(false);
    expect(testMeta.getId()).toBeUndefined();
    expect(testMeta.hasExtension()).toBe(false);
    expect(testMeta.getExtension()).toMatchObject([] as Extension[]);

    // Coding properties
    expect(testMeta.hasVersionIdElement()).toBe(true);
    expect(testMeta.getVersionIdElement()).toMatchObject(new IdType(VALID_ID));
    expect(testMeta.hasLastUpdatedElement()).toBe(true);
    expect(testMeta.getLastUpdatedElement()).toMatchObject(new InstantType(VALID_INSTANT));
    expect(testMeta.hasSourceElement()).toBe(true);
    expect(testMeta.getSourceElement()).toMatchObject(new UriType(VALID_URI));
    expect(testMeta.hasProfileElement()).toBe(true);
    expect(testMeta.getProfileElement()).toHaveLength(1); // always returns an array
    expect(testMeta.getProfileElement()[0]).toMatchObject(new CanonicalType(VALID_CANONICAL));

    expect(testMeta.hasVersionId()).toBe(true);
    expect(testMeta.getVersionId()).toStrictEqual(VALID_ID);
    expect(testMeta.hasLastUpdated()).toBe(true);
    expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT);
    expect(testMeta.hasSource()).toBe(true);
    expect(testMeta.getSource()).toStrictEqual(VALID_URI);
    expect(testMeta.hasProfile()).toBe(true);
    expect(testMeta.getProfile()).toHaveLength(1); // always returns an array
    expect(testMeta.getProfile()[0]).toStrictEqual(VALID_CANONICAL);
    expect(testMeta.hasSecurity()).toBe(true);
    expect(testMeta.getSecurity()).toHaveLength(1); // always returns an array
    expect(testMeta.getSecurity()[0]).toMatchObject(VALID_CODING_SECURITY);
    expect(testMeta.hasTag()).toBe(true);
    expect(testMeta.getTag()).toHaveLength(1); // always returns an array
    expect(testMeta.getTag()[0]).toMatchObject(VALID_CODING_TAG);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Meta.versionId value', () => {
    const testMeta = new Meta();
    const t = () => {
      testMeta.setVersionId(INVALID_ID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Meta.versionId (${INVALID_ID})`);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Meta.lastUpdated value', () => {
    const testMeta = new Meta();
    const t = () => {
      testMeta.setLastUpdated(INVALID_INSTANT);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Meta.lastUpdated (${INVALID_INSTANT})`);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Meta.source value', () => {
    const testMeta = new Meta();
    const t = () => {
      testMeta.setSource(INVALID_URI);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Meta.source (${INVALID_URI})`);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Meta.profile value', () => {
    const testMeta = new Meta();
    const t = () => {
      testMeta.setProfile([INVALID_CANONICAL]);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Meta.profile array item (${INVALID_URI})`);
  });

  it('should throw PrimitiveTypeError when adding invalid primitive Meta.profile value', () => {
    const testMeta = new Meta();
    const t = () => {
      testMeta.addProfile(INVALID_CANONICAL);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Meta.profile array item (${INVALID_URI})`);
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

    testMeta.setVersionId(VALID_ID_2);
    testMeta.setLastUpdated(VALID_INSTANT_2);
    testMeta.setSource(VALID_URI_2);
    testMeta.setProfile([VALID_CANONICAL_2]);
    testMeta.setSecurity([VALID_CODING_SECURITY_2]);
    testMeta.setTag([VALID_CODING_TAG_2]);

    expect(testMeta.hasVersionIdElement()).toBe(true);
    expect(testMeta.getVersionIdElement()).toMatchObject(new IdType(VALID_ID_2));
    expect(testMeta.hasLastUpdatedElement()).toBe(true);
    expect(testMeta.getLastUpdatedElement()).toMatchObject(new InstantType(VALID_INSTANT_2));
    expect(testMeta.hasSourceElement()).toBe(true);
    expect(testMeta.getSourceElement()).toMatchObject(new UriType(VALID_URI_2));
    expect(testMeta.hasProfileElement()).toBe(true);
    expect(testMeta.getProfileElement()).toHaveLength(1); // always returns an array
    expect(testMeta.getProfileElement()[0]).toMatchObject(new CanonicalType(VALID_CANONICAL_2));

    expect(testMeta.hasVersionId()).toBe(true);
    expect(testMeta.getVersionId()).toStrictEqual(VALID_ID_2);
    expect(testMeta.hasLastUpdated()).toBe(true);
    expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT_2);
    expect(testMeta.hasSource()).toBe(true);
    expect(testMeta.getSource()).toStrictEqual(VALID_URI_2);
    expect(testMeta.hasProfile()).toBe(true);
    expect(testMeta.getProfile()).toHaveLength(1); // always returns an array
    expect(testMeta.getProfile()[0]).toStrictEqual(VALID_CANONICAL_2);
    expect(testMeta.hasSecurity()).toBe(true);
    expect(testMeta.getSecurity()).toHaveLength(1); // always returns an array
    expect(testMeta.getSecurity()[0]).toMatchObject(VALID_CODING_SECURITY_2);
    expect(testMeta.hasTag()).toBe(true);
    expect(testMeta.getTag()).toHaveLength(1); // always returns an array
    expect(testMeta.getTag()[0]).toMatchObject(VALID_CODING_TAG_2);

    testMeta.setVersionId(UNDEFINED_VALUE);
    testMeta.setLastUpdated(UNDEFINED_VALUE);
    testMeta.setSource(UNDEFINED_VALUE);
    testMeta.setProfile(UNDEFINED_VALUE);
    testMeta.setSecurity(UNDEFINED_VALUE);
    testMeta.setTag(UNDEFINED_VALUE);

    expect(testMeta.hasVersionIdElement()).toBe(false);
    expect(testMeta.getVersionIdElement()).toMatchObject(new IdType());
    expect(testMeta.hasLastUpdatedElement()).toBe(false);
    expect(testMeta.getLastUpdatedElement()).toMatchObject(new InstantType());
    expect(testMeta.hasSourceElement()).toBe(false);
    expect(testMeta.getSourceElement()).toMatchObject(new UriType());
    expect(testMeta.hasProfileElement()).toBe(false);
    expect(testMeta.getProfileElement()).toHaveLength(0); // always returns an array

    expect(testMeta.hasVersionId()).toBe(false);
    expect(testMeta.getVersionId()).toBeUndefined();
    expect(testMeta.hasLastUpdated()).toBe(false);
    expect(testMeta.getLastUpdated()).toBeUndefined();
    expect(testMeta.hasSource()).toBe(false);
    expect(testMeta.getSource()).toBeUndefined();
    expect(testMeta.hasProfile()).toBe(false);
    expect(testMeta.getProfile()).toHaveLength(0); // always returns an array
    expect(testMeta.hasSecurity()).toBe(false);
    expect(testMeta.getSecurity()).toHaveLength(0); // always returns an array
    expect(testMeta.hasTag()).toBe(false);
    expect(testMeta.getTag()).toHaveLength(0); // always returns an array
  });

  it('should properly by adding array elements', () => {
    const testMeta = new Meta();
    expect(testMeta).toBeDefined();
    expect(testMeta.isEmpty()).toBe(true);

    testMeta.addProfile(VALID_CANONICAL);
    testMeta.addProfileElement(VALID_CANONICAL_TYPE_2);
    testMeta.addSecurity(VALID_CODING_SECURITY);
    testMeta.addTag(VALID_CODING_TAG);

    expect(testMeta.hasProfile()).toBe(true);
    expect(testMeta.getProfile()).toHaveLength(2); // always returns an array
    const expected = [VALID_CANONICAL, VALID_CANONICAL_2];
    expect(testMeta.getProfile()).toEqual(expect.arrayContaining(expected));

    expect(testMeta.hasProfileElement()).toBe(true);
    expect(testMeta.getProfileElement()).toHaveLength(2); // always returns an array
    const expectedType = [VALID_CANONICAL_TYPE, VALID_CANONICAL_TYPE_2];
    expect(testMeta.getProfileElement()).toEqual(expect.arrayContaining(expectedType));

    expect(testMeta.hasSecurity()).toBe(true);
    expect(testMeta.getSecurity()).toHaveLength(1); // always returns an array
    expect(testMeta.getSecurity()[0]).toMatchObject(VALID_CODING_SECURITY);

    expect(testMeta.hasTag()).toBe(true);
    expect(testMeta.getTag()).toHaveLength(1); // always returns an array
    expect(testMeta.getTag()[0]).toMatchObject(VALID_CODING_TAG);

    testMeta.addProfile(UNDEFINED_VALUE);
    testMeta.addProfileElement(UNDEFINED_VALUE);
    testMeta.addSecurity(UNDEFINED_VALUE);
    testMeta.addTag(UNDEFINED_VALUE);

    expect(testMeta.hasProfile()).toBe(true);
    expect(testMeta.getProfile()).toHaveLength(2); // always returns an array
    expect(testMeta.getProfile()).toEqual(expect.arrayContaining(expected));

    expect(testMeta.hasProfileElement()).toBe(true);
    expect(testMeta.getProfileElement()).toHaveLength(2); // always returns an array
    expect(testMeta.getProfileElement()).toEqual(expect.arrayContaining(expectedType));

    expect(testMeta.hasSecurity()).toBe(true);
    expect(testMeta.getSecurity()).toHaveLength(1); // always returns an array
    expect(testMeta.getSecurity()[0]).toMatchObject(VALID_CODING_SECURITY);

    expect(testMeta.hasTag()).toBe(true);
    expect(testMeta.getTag()).toHaveLength(1); // always returns an array
    expect(testMeta.getTag()[0]).toMatchObject(VALID_CODING_TAG);
  });

  it('should be properly initialized by setting all properties with PrimitiveType values', () => {
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

    // inherited properties from Element
    expect(testMeta.hasId()).toBe(false);
    expect(testMeta.getId()).toBeUndefined();
    expect(testMeta.hasExtension()).toBe(false);
    expect(testMeta.getExtension()).toMatchObject([] as Extension[]);

    // Coding properties
    expect(testMeta.hasVersionIdElement()).toBe(true);
    expect(testMeta.getVersionIdElement()).toMatchObject(new IdType(VALID_ID));
    expect(testMeta.hasLastUpdatedElement()).toBe(true);
    expect(testMeta.getLastUpdatedElement()).toMatchObject(new InstantType(VALID_INSTANT));
    expect(testMeta.hasSourceElement()).toBe(true);
    expect(testMeta.getSourceElement()).toMatchObject(new UriType(VALID_URI));
    expect(testMeta.hasProfileElement()).toBe(true);
    expect(testMeta.getProfileElement()).toHaveLength(1); // always returns an array
    expect(testMeta.getProfileElement()[0]).toMatchObject(new CanonicalType(VALID_CANONICAL));

    expect(testMeta.hasVersionId()).toBe(true);
    expect(testMeta.getVersionId()).toStrictEqual(VALID_ID);
    expect(testMeta.hasLastUpdated()).toBe(true);
    expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT);
    expect(testMeta.hasSource()).toBe(true);
    expect(testMeta.getSource()).toStrictEqual(VALID_URI);
    expect(testMeta.hasProfile()).toBe(true);
    expect(testMeta.getProfile()).toHaveLength(1); // always returns an array
    expect(testMeta.getProfile()[0]).toStrictEqual(VALID_CANONICAL);
    expect(testMeta.hasSecurity()).toBe(true);
    expect(testMeta.getSecurity()).toHaveLength(1); // always returns an array
    expect(testMeta.getSecurity()[0]).toMatchObject(VALID_CODING_SECURITY);
    expect(testMeta.hasTag()).toBe(true);
    expect(testMeta.getTag()).toHaveLength(1); // always returns an array
    expect(testMeta.getTag()[0]).toMatchObject(VALID_CODING_TAG);
  });

  it('should be properly reset by modifying all properties with PrimitiveType values', () => {
    const testMeta = new Meta();
    testMeta.setVersionIdElement(VALID_ID_TYPE);
    testMeta.setLastUpdatedElement(VALID_INSTANT_TYPE);
    testMeta.setSourceElement(VALID_URI_TYPE);
    testMeta.setProfileElement([VALID_CANONICAL_TYPE]);
    testMeta.setSecurity([VALID_CODING_SECURITY]);
    testMeta.setTag([VALID_CODING_TAG]);
    expect(testMeta).toBeDefined();
    expect(testMeta.isEmpty()).toBe(false);

    testMeta.setVersionIdElement(VALID_ID_TYPE_2);
    testMeta.setLastUpdatedElement(VALID_INSTANT_TYPE_2);
    testMeta.setSourceElement(VALID_URI_TYPE_2);
    testMeta.setProfileElement([VALID_CANONICAL_TYPE_2]);
    testMeta.setSecurity([VALID_CODING_SECURITY_2]);
    testMeta.setTag([VALID_CODING_TAG_2]);

    expect(testMeta.hasVersionIdElement()).toBe(true);
    expect(testMeta.getVersionIdElement()).toMatchObject(new IdType(VALID_ID_2));
    expect(testMeta.hasLastUpdatedElement()).toBe(true);
    expect(testMeta.getLastUpdatedElement()).toMatchObject(new InstantType(VALID_INSTANT_2));
    expect(testMeta.hasSourceElement()).toBe(true);
    expect(testMeta.getSourceElement()).toMatchObject(new UriType(VALID_URI_2));
    expect(testMeta.hasProfileElement()).toBe(true);
    expect(testMeta.getProfileElement()).toHaveLength(1); // always returns an array
    expect(testMeta.getProfileElement()[0]).toMatchObject(new CanonicalType(VALID_CANONICAL_2));

    expect(testMeta.hasVersionId()).toBe(true);
    expect(testMeta.getVersionId()).toStrictEqual(VALID_ID_2);
    expect(testMeta.hasLastUpdated()).toBe(true);
    expect(testMeta.getLastUpdated()).toStrictEqual(VALID_INSTANT_2);
    expect(testMeta.hasSource()).toBe(true);
    expect(testMeta.getSource()).toStrictEqual(VALID_URI_2);
    expect(testMeta.hasProfile()).toBe(true);
    expect(testMeta.getProfile()).toHaveLength(1); // always returns an array
    expect(testMeta.getProfile()[0]).toStrictEqual(VALID_CANONICAL_2);
    expect(testMeta.hasSecurity()).toBe(true);
    expect(testMeta.getSecurity()).toHaveLength(1); // always returns an array
    expect(testMeta.getSecurity()[0]).toMatchObject(VALID_CODING_SECURITY_2);
    expect(testMeta.hasTag()).toBe(true);
    expect(testMeta.getTag()).toHaveLength(1); // always returns an array
    expect(testMeta.getTag()[0]).toMatchObject(VALID_CODING_TAG_2);

    testMeta.setVersionIdElement(UNDEFINED_VALUE);
    testMeta.setLastUpdatedElement(UNDEFINED_VALUE);
    testMeta.setSourceElement(UNDEFINED_VALUE);
    testMeta.setProfileElement(UNDEFINED_VALUE);
    testMeta.setSecurity(UNDEFINED_VALUE);
    testMeta.setTag(UNDEFINED_VALUE);

    expect(testMeta.hasVersionIdElement()).toBe(false);
    expect(testMeta.getVersionIdElement()).toMatchObject(new IdType());
    expect(testMeta.hasLastUpdatedElement()).toBe(false);
    expect(testMeta.getLastUpdatedElement()).toMatchObject(new InstantType());
    expect(testMeta.hasSourceElement()).toBe(false);
    expect(testMeta.getSourceElement()).toMatchObject(new UriType());
    expect(testMeta.hasProfileElement()).toBe(false);
    expect(testMeta.getProfileElement()).toHaveLength(0); // always returns an array

    expect(testMeta.hasVersionId()).toBe(false);
    expect(testMeta.getVersionId()).toBeUndefined();
    expect(testMeta.hasLastUpdated()).toBe(false);
    expect(testMeta.getLastUpdated()).toBeUndefined();
    expect(testMeta.hasSource()).toBe(false);
    expect(testMeta.getSource()).toBeUndefined();
    expect(testMeta.hasProfile()).toBe(false);
    expect(testMeta.getProfile()).toHaveLength(0); // always returns an array
    expect(testMeta.hasSecurity()).toBe(false);
    expect(testMeta.getSecurity()).toHaveLength(0); // always returns an array
    expect(testMeta.hasTag()).toBe(false);
    expect(testMeta.getTag()).toHaveLength(0); // always returns an array
  });
});
