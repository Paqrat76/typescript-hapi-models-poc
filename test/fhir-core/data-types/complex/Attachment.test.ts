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

import { Attachment } from '@src/fhir-core/data-types/complex/Attachment';
import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Base64BinaryType } from '@src/fhir-core/data-types/primitive/Base64BinaryType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UnsignedIntType } from '@src/fhir-core/data-types/primitive/UnsignedIntType';
import { UrlType } from '@src/fhir-core/data-types/primitive/UrlType';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import {
  INVALID_NON_STRING_TYPE,
  INVALID_STRING_TYPE,
  TOO_BIG_STRING,
  FHIR_MAX_INTEGER,
  UNDEFINED_VALUE,
} from '../../../test-utils';

describe('Attachment', () => {
  const VALID_CODE = `testCodeType`;
  const VALID_CODE_TYPE = new CodeType(VALID_CODE);
  const VALID_CODE_2 = `testCodeType2`;
  const VALID_CODE_TYPE_2 = new CodeType(VALID_CODE_2);
  const INVALID_CODE = ' invalid CodeType ';

  const VALID_BASE64BINARY = `VGV4dCByZXByZXNlbnRhdGlvbiBvZiB0aGUgYWRkcmVzcw==`;
  const VALID_BASE64BINARY_TYPE = new Base64BinaryType(VALID_BASE64BINARY);
  const VALID_BASE64BINARY_2 = `0f60168295bc9d6b0535feaf0975a63532959834`;
  const VALID_BASE64BINARY_TYPE_2 = new Base64BinaryType(VALID_BASE64BINARY_2);
  const INVALID_BASE64BINARY = 'invalidBase64Binary';

  const VALID_URL = `testUrlType`;
  const VALID_URL_TYPE = new UrlType(VALID_URL);
  const VALID_URL_2 = `testUrlType2`;
  const VALID_URL_TYPE_2 = new UrlType(VALID_URL_2);
  const INVALID_URL = ' invalid Url ';

  const VALID_UNSIGNED_INT = 76;
  const VALID_UNSIGNED_INT_TYPE = new UnsignedIntType(VALID_UNSIGNED_INT);
  const VALID_UNSIGNED_INT_2 = 78;
  const VALID_UNSIGNED_INT_TYPE_2 = new UnsignedIntType(VALID_UNSIGNED_INT_2);
  const INVALID_UNSIGNED_INT = FHIR_MAX_INTEGER + 1;

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);

  const VALID_DATETIME = '2017-01-01T13:24:00.000Z';
  const VALID_DATETIME_TYPE = new DateTimeType(VALID_DATETIME);
  const VALID_DATETIME_2 = '2017-03-15T08:09:00.000Z';
  const VALID_DATETIME_TYPE_2 = new DateTimeType(VALID_DATETIME_2);
  const INVALID_DATETIME = 'invalidDataTime';

  describe('Core', () => {
    it('should be properly instantiated as empty', () => {
      const testAttachment = new Attachment();
      expect(testAttachment).toBeDefined();
      expect(testAttachment).toBeInstanceOf(DataType);
      expect(testAttachment).toBeInstanceOf(Attachment);
      expect(testAttachment.constructor.name).toStrictEqual('Attachment');
      expect(testAttachment.fhirType()).toStrictEqual('Attachment');
      expect(testAttachment.isEmpty()).toBe(true);
      expect(testAttachment.isComplexDataType()).toBe(true);
      expect(testAttachment.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testAttachment.hasId()).toBe(false);
      expect(testAttachment.getId()).toBeUndefined();
      expect(testAttachment.hasExtension()).toBe(false);
      expect(testAttachment.getExtension()).toEqual([] as Extension[]);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(false);
      expect(testAttachment.getContentTypeElement()).toEqual(new CodeType());
      expect(testAttachment.hasLanguageElement()).toBe(false);
      expect(testAttachment.getLanguageElement()).toEqual(new CodeType());
      expect(testAttachment.hasDataElement()).toBe(false);
      expect(testAttachment.getDataElement()).toEqual(new Base64BinaryType());
      expect(testAttachment.hasUrlElement()).toBe(false);
      expect(testAttachment.getUrlElement()).toEqual(new UrlType());
      expect(testAttachment.hasSizeElement()).toBe(false);
      expect(testAttachment.getSizeElement()).toEqual(new UnsignedIntType());
      expect(testAttachment.hasHashElement()).toBe(false);
      expect(testAttachment.getHashElement()).toEqual(new Base64BinaryType());
      expect(testAttachment.hasTitleElement()).toBe(false);
      expect(testAttachment.getTitleElement()).toEqual(new StringType());
      expect(testAttachment.hasCreationElement()).toBe(false);
      expect(testAttachment.getCreationElement()).toEqual(new DateTimeType());

      expect(testAttachment.hasContentType()).toBe(false);
      expect(testAttachment.getContentType()).toBeUndefined();
      expect(testAttachment.hasLanguage()).toBe(false);
      expect(testAttachment.getLanguage()).toBeUndefined();
      expect(testAttachment.hasData()).toBe(false);
      expect(testAttachment.getData()).toBeUndefined();
      expect(testAttachment.hasUrl()).toBe(false);
      expect(testAttachment.getUrl()).toBeUndefined();
      expect(testAttachment.hasSize()).toBe(false);
      expect(testAttachment.getSize()).toBeUndefined();
      expect(testAttachment.hasHash()).toBe(false);
      expect(testAttachment.getHash()).toBeUndefined();
      expect(testAttachment.hasTitle()).toBe(false);
      expect(testAttachment.getTitle()).toBeUndefined();
      expect(testAttachment.hasCreation()).toBe(false);
      expect(testAttachment.getCreation()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const attachment = new Attachment();
      attachment.setContentType(VALID_CODE);
      attachment.setLanguage(VALID_CODE_2);
      attachment.setData(VALID_BASE64BINARY);
      attachment.setUrl(VALID_URL);
      attachment.setSize(VALID_UNSIGNED_INT);
      attachment.setHash(VALID_BASE64BINARY_2);
      attachment.setTitle(VALID_STRING);
      attachment.setCreation(VALID_DATETIME);

      let testAttachment = attachment.copy();
      expect(testAttachment).toBeDefined();
      expect(testAttachment).toBeInstanceOf(DataType);
      expect(testAttachment).toBeInstanceOf(Attachment);
      expect(testAttachment.constructor.name).toStrictEqual('Attachment');
      expect(testAttachment.fhirType()).toStrictEqual('Attachment');
      expect(testAttachment.isEmpty()).toBe(false);
      expect(testAttachment.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testAttachment.hasId()).toBe(false);
      expect(testAttachment.getId()).toBeUndefined();
      expect(testAttachment.hasExtension()).toBe(false);
      expect(testAttachment.getExtension()).toEqual([] as Extension[]);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(true);
      expect(testAttachment.getContentTypeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testAttachment.hasLanguageElement()).toBe(true);
      expect(testAttachment.getLanguageElement()).toStrictEqual(VALID_CODE_TYPE_2);
      expect(testAttachment.hasDataElement()).toBe(true);
      expect(testAttachment.getDataElement()).toStrictEqual(VALID_BASE64BINARY_TYPE);
      expect(testAttachment.hasUrlElement()).toBe(true);
      expect(testAttachment.getUrlElement()).toStrictEqual(VALID_URL_TYPE);
      expect(testAttachment.hasSizeElement()).toBe(true);
      expect(testAttachment.getSizeElement()).toStrictEqual(VALID_UNSIGNED_INT_TYPE);
      expect(testAttachment.hasHashElement()).toBe(true);
      expect(testAttachment.getHashElement()).toStrictEqual(VALID_BASE64BINARY_TYPE_2);
      expect(testAttachment.hasTitleElement()).toBe(true);
      expect(testAttachment.getTitleElement()).toStrictEqual(VALID_STRING_TYPE);
      expect(testAttachment.hasCreationElement()).toBe(true);
      expect(testAttachment.getCreationElement()).toStrictEqual(VALID_DATETIME_TYPE);

      expect(testAttachment.hasContentType()).toBe(true);
      expect(testAttachment.getContentType()).toStrictEqual(VALID_CODE);
      expect(testAttachment.hasLanguage()).toBe(true);
      expect(testAttachment.getLanguage()).toStrictEqual(VALID_CODE_2);
      expect(testAttachment.hasData()).toBe(true);
      expect(testAttachment.getData()).toStrictEqual(VALID_BASE64BINARY);
      expect(testAttachment.hasUrl()).toBe(true);
      expect(testAttachment.getUrl()).toStrictEqual(VALID_URL);
      expect(testAttachment.hasSize()).toBe(true);
      expect(testAttachment.getSize()).toStrictEqual(VALID_UNSIGNED_INT);
      expect(testAttachment.hasHash()).toBe(true);
      expect(testAttachment.getHash()).toStrictEqual(VALID_BASE64BINARY_2);
      expect(testAttachment.hasTitle()).toBe(true);
      expect(testAttachment.getTitle()).toStrictEqual(VALID_STRING);
      expect(testAttachment.hasCreation()).toBe(true);
      expect(testAttachment.getCreation()).toStrictEqual(VALID_DATETIME);

      // Reset to empty

      attachment.setContentType(UNDEFINED_VALUE);
      attachment.setLanguage(UNDEFINED_VALUE);
      attachment.setData(UNDEFINED_VALUE);
      attachment.setUrl(UNDEFINED_VALUE);
      attachment.setSize(UNDEFINED_VALUE);
      attachment.setHash(UNDEFINED_VALUE);
      attachment.setTitle(UNDEFINED_VALUE);
      attachment.setCreation(UNDEFINED_VALUE);

      testAttachment = attachment.copy();
      expect(testAttachment).toBeDefined();
      expect(testAttachment).toBeInstanceOf(DataType);
      expect(testAttachment).toBeInstanceOf(Attachment);
      expect(testAttachment.constructor.name).toStrictEqual('Attachment');
      expect(testAttachment.fhirType()).toStrictEqual('Attachment');
      expect(testAttachment.isEmpty()).toBe(true);
      expect(testAttachment.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testAttachment.hasId()).toBe(false);
      expect(testAttachment.getId()).toBeUndefined();
      expect(testAttachment.hasExtension()).toBe(false);
      expect(testAttachment.getExtension()).toEqual([] as Extension[]);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(false);
      expect(testAttachment.getContentTypeElement()).toEqual(new CodeType());
      expect(testAttachment.hasLanguageElement()).toBe(false);
      expect(testAttachment.getLanguageElement()).toEqual(new CodeType());
      expect(testAttachment.hasDataElement()).toBe(false);
      expect(testAttachment.getDataElement()).toEqual(new Base64BinaryType());
      expect(testAttachment.hasUrlElement()).toBe(false);
      expect(testAttachment.getUrlElement()).toEqual(new UrlType());
      expect(testAttachment.hasSizeElement()).toBe(false);
      expect(testAttachment.getSizeElement()).toEqual(new UnsignedIntType());
      expect(testAttachment.hasHashElement()).toBe(false);
      expect(testAttachment.getHashElement()).toEqual(new Base64BinaryType());
      expect(testAttachment.hasTitleElement()).toBe(false);
      expect(testAttachment.getTitleElement()).toEqual(new StringType());
      expect(testAttachment.hasCreationElement()).toBe(false);
      expect(testAttachment.getCreationElement()).toEqual(new DateTimeType());

      expect(testAttachment.hasContentType()).toBe(false);
      expect(testAttachment.getContentType()).toBeUndefined();
      expect(testAttachment.hasLanguage()).toBe(false);
      expect(testAttachment.getLanguage()).toBeUndefined();
      expect(testAttachment.hasData()).toBe(false);
      expect(testAttachment.getData()).toBeUndefined();
      expect(testAttachment.hasUrl()).toBe(false);
      expect(testAttachment.getUrl()).toBeUndefined();
      expect(testAttachment.hasSize()).toBe(false);
      expect(testAttachment.getSize()).toBeUndefined();
      expect(testAttachment.hasHash()).toBe(false);
      expect(testAttachment.getHash()).toBeUndefined();
      expect(testAttachment.hasTitle()).toBe(false);
      expect(testAttachment.getTitle()).toBeUndefined();
      expect(testAttachment.hasCreation()).toBe(false);
      expect(testAttachment.getCreation()).toBeUndefined();
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testAttachment = new Attachment();
      testAttachment.setContentType(VALID_CODE);
      testAttachment.setLanguage(VALID_CODE_2);
      testAttachment.setData(VALID_BASE64BINARY);
      testAttachment.setUrl(VALID_URL);
      testAttachment.setSize(VALID_UNSIGNED_INT);
      testAttachment.setHash(VALID_BASE64BINARY_2);
      testAttachment.setTitle(VALID_STRING);
      testAttachment.setCreation(VALID_DATETIME);

      expect(testAttachment).toBeDefined();
      expect(testAttachment).toBeInstanceOf(DataType);
      expect(testAttachment).toBeInstanceOf(Attachment);
      expect(testAttachment.constructor.name).toStrictEqual('Attachment');
      expect(testAttachment.fhirType()).toStrictEqual('Attachment');
      expect(testAttachment.isEmpty()).toBe(false);
      expect(testAttachment.isComplexDataType()).toBe(true);
      expect(testAttachment.toJSON()).toBeDefined();

      // inherited properties from Element
      expect(testAttachment.hasId()).toBe(false);
      expect(testAttachment.getId()).toBeUndefined();
      expect(testAttachment.hasExtension()).toBe(false);
      expect(testAttachment.getExtension()).toEqual([] as Extension[]);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(true);
      expect(testAttachment.getContentTypeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testAttachment.hasLanguageElement()).toBe(true);
      expect(testAttachment.getLanguageElement()).toStrictEqual(VALID_CODE_TYPE_2);
      expect(testAttachment.hasDataElement()).toBe(true);
      expect(testAttachment.getDataElement()).toStrictEqual(VALID_BASE64BINARY_TYPE);
      expect(testAttachment.hasUrlElement()).toBe(true);
      expect(testAttachment.getUrlElement()).toStrictEqual(VALID_URL_TYPE);
      expect(testAttachment.hasSizeElement()).toBe(true);
      expect(testAttachment.getSizeElement()).toStrictEqual(VALID_UNSIGNED_INT_TYPE);
      expect(testAttachment.hasHashElement()).toBe(true);
      expect(testAttachment.getHashElement()).toStrictEqual(VALID_BASE64BINARY_TYPE_2);
      expect(testAttachment.hasTitleElement()).toBe(true);
      expect(testAttachment.getTitleElement()).toStrictEqual(VALID_STRING_TYPE);
      expect(testAttachment.hasCreationElement()).toBe(true);
      expect(testAttachment.getCreationElement()).toStrictEqual(VALID_DATETIME_TYPE);

      expect(testAttachment.hasContentType()).toBe(true);
      expect(testAttachment.getContentType()).toStrictEqual(VALID_CODE);
      expect(testAttachment.hasLanguage()).toBe(true);
      expect(testAttachment.getLanguage()).toStrictEqual(VALID_CODE_2);
      expect(testAttachment.hasData()).toBe(true);
      expect(testAttachment.getData()).toStrictEqual(VALID_BASE64BINARY);
      expect(testAttachment.hasUrl()).toBe(true);
      expect(testAttachment.getUrl()).toStrictEqual(VALID_URL);
      expect(testAttachment.hasSize()).toBe(true);
      expect(testAttachment.getSize()).toStrictEqual(VALID_UNSIGNED_INT);
      expect(testAttachment.hasHash()).toBe(true);
      expect(testAttachment.getHash()).toStrictEqual(VALID_BASE64BINARY_2);
      expect(testAttachment.hasTitle()).toBe(true);
      expect(testAttachment.getTitle()).toStrictEqual(VALID_STRING);
      expect(testAttachment.hasCreation()).toBe(true);
      expect(testAttachment.getCreation()).toStrictEqual(VALID_DATETIME);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testAttachment = new Attachment();
      testAttachment.setContentType(VALID_CODE);
      testAttachment.setLanguage(VALID_CODE_2);
      testAttachment.setData(VALID_BASE64BINARY);
      testAttachment.setUrl(VALID_URL);
      testAttachment.setSize(VALID_UNSIGNED_INT);
      testAttachment.setHash(VALID_BASE64BINARY_2);
      testAttachment.setTitle(VALID_STRING);
      testAttachment.setCreation(VALID_DATETIME);

      expect(testAttachment).toBeDefined();
      expect(testAttachment.isEmpty()).toBe(false);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(true);
      expect(testAttachment.getContentTypeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testAttachment.hasLanguageElement()).toBe(true);
      expect(testAttachment.getLanguageElement()).toStrictEqual(VALID_CODE_TYPE_2);
      expect(testAttachment.hasDataElement()).toBe(true);
      expect(testAttachment.getDataElement()).toStrictEqual(VALID_BASE64BINARY_TYPE);
      expect(testAttachment.hasUrlElement()).toBe(true);
      expect(testAttachment.getUrlElement()).toStrictEqual(VALID_URL_TYPE);
      expect(testAttachment.hasSizeElement()).toBe(true);
      expect(testAttachment.getSizeElement()).toStrictEqual(VALID_UNSIGNED_INT_TYPE);
      expect(testAttachment.hasHashElement()).toBe(true);
      expect(testAttachment.getHashElement()).toStrictEqual(VALID_BASE64BINARY_TYPE_2);
      expect(testAttachment.hasTitleElement()).toBe(true);
      expect(testAttachment.getTitleElement()).toStrictEqual(VALID_STRING_TYPE);
      expect(testAttachment.hasCreationElement()).toBe(true);
      expect(testAttachment.getCreationElement()).toStrictEqual(VALID_DATETIME_TYPE);

      expect(testAttachment.hasContentType()).toBe(true);
      expect(testAttachment.getContentType()).toStrictEqual(VALID_CODE);
      expect(testAttachment.hasLanguage()).toBe(true);
      expect(testAttachment.getLanguage()).toStrictEqual(VALID_CODE_2);
      expect(testAttachment.hasData()).toBe(true);
      expect(testAttachment.getData()).toStrictEqual(VALID_BASE64BINARY);
      expect(testAttachment.hasUrl()).toBe(true);
      expect(testAttachment.getUrl()).toStrictEqual(VALID_URL);
      expect(testAttachment.hasSize()).toBe(true);
      expect(testAttachment.getSize()).toStrictEqual(VALID_UNSIGNED_INT);
      expect(testAttachment.hasHash()).toBe(true);
      expect(testAttachment.getHash()).toStrictEqual(VALID_BASE64BINARY_2);
      expect(testAttachment.hasTitle()).toBe(true);
      expect(testAttachment.getTitle()).toStrictEqual(VALID_STRING);
      expect(testAttachment.hasCreation()).toBe(true);
      expect(testAttachment.getCreation()).toStrictEqual(VALID_DATETIME);

      // Reset

      testAttachment.setContentType(VALID_CODE_2);
      testAttachment.setLanguage(VALID_CODE);
      testAttachment.setData(VALID_BASE64BINARY_2);
      testAttachment.setUrl(VALID_URL_2);
      testAttachment.setSize(VALID_UNSIGNED_INT_2);
      testAttachment.setHash(VALID_BASE64BINARY);
      testAttachment.setTitle(VALID_STRING_2);
      testAttachment.setCreation(VALID_DATETIME_2);

      expect(testAttachment).toBeDefined();
      expect(testAttachment.isEmpty()).toBe(false);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(true);
      expect(testAttachment.getContentTypeElement()).toStrictEqual(VALID_CODE_TYPE_2);
      expect(testAttachment.hasLanguageElement()).toBe(true);
      expect(testAttachment.getLanguageElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testAttachment.hasDataElement()).toBe(true);
      expect(testAttachment.getDataElement()).toStrictEqual(VALID_BASE64BINARY_TYPE_2);
      expect(testAttachment.hasUrlElement()).toBe(true);
      expect(testAttachment.getUrlElement()).toStrictEqual(VALID_URL_TYPE_2);
      expect(testAttachment.hasSizeElement()).toBe(true);
      expect(testAttachment.getSizeElement()).toStrictEqual(VALID_UNSIGNED_INT_TYPE_2);
      expect(testAttachment.hasHashElement()).toBe(true);
      expect(testAttachment.getHashElement()).toStrictEqual(VALID_BASE64BINARY_TYPE);
      expect(testAttachment.hasTitleElement()).toBe(true);
      expect(testAttachment.getTitleElement()).toStrictEqual(VALID_STRING_TYPE_2);
      expect(testAttachment.hasCreationElement()).toBe(true);
      expect(testAttachment.getCreationElement()).toStrictEqual(VALID_DATETIME_TYPE_2);

      expect(testAttachment.hasContentType()).toBe(true);
      expect(testAttachment.getContentType()).toStrictEqual(VALID_CODE_2);
      expect(testAttachment.hasLanguage()).toBe(true);
      expect(testAttachment.getLanguage()).toStrictEqual(VALID_CODE);
      expect(testAttachment.hasData()).toBe(true);
      expect(testAttachment.getData()).toStrictEqual(VALID_BASE64BINARY_2);
      expect(testAttachment.hasUrl()).toBe(true);
      expect(testAttachment.getUrl()).toStrictEqual(VALID_URL_2);
      expect(testAttachment.hasSize()).toBe(true);
      expect(testAttachment.getSize()).toStrictEqual(VALID_UNSIGNED_INT_2);
      expect(testAttachment.hasHash()).toBe(true);
      expect(testAttachment.getHash()).toStrictEqual(VALID_BASE64BINARY);
      expect(testAttachment.hasTitle()).toBe(true);
      expect(testAttachment.getTitle()).toStrictEqual(VALID_STRING_2);
      expect(testAttachment.hasCreation()).toBe(true);
      expect(testAttachment.getCreation()).toStrictEqual(VALID_DATETIME_2);

      // Reset to empty

      testAttachment.setContentType(UNDEFINED_VALUE);
      testAttachment.setLanguage(UNDEFINED_VALUE);
      testAttachment.setData(UNDEFINED_VALUE);
      testAttachment.setUrl(UNDEFINED_VALUE);
      testAttachment.setSize(UNDEFINED_VALUE);
      testAttachment.setHash(UNDEFINED_VALUE);
      testAttachment.setTitle(UNDEFINED_VALUE);
      testAttachment.setCreation(UNDEFINED_VALUE);

      expect(testAttachment).toBeDefined();
      expect(testAttachment.isEmpty()).toBe(true);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(false);
      expect(testAttachment.getContentTypeElement()).toEqual(new CodeType());
      expect(testAttachment.hasLanguageElement()).toBe(false);
      expect(testAttachment.getLanguageElement()).toEqual(new CodeType());
      expect(testAttachment.hasDataElement()).toBe(false);
      expect(testAttachment.getDataElement()).toEqual(new Base64BinaryType());
      expect(testAttachment.hasUrlElement()).toBe(false);
      expect(testAttachment.getUrlElement()).toEqual(new UrlType());
      expect(testAttachment.hasSizeElement()).toBe(false);
      expect(testAttachment.getSizeElement()).toEqual(new UnsignedIntType());
      expect(testAttachment.hasHashElement()).toBe(false);
      expect(testAttachment.getHashElement()).toEqual(new Base64BinaryType());
      expect(testAttachment.hasTitleElement()).toBe(false);
      expect(testAttachment.getTitleElement()).toEqual(new StringType());
      expect(testAttachment.hasCreationElement()).toBe(false);
      expect(testAttachment.getCreationElement()).toEqual(new DateTimeType());

      expect(testAttachment.hasContentType()).toBe(false);
      expect(testAttachment.getContentType()).toBeUndefined();
      expect(testAttachment.hasLanguage()).toBe(false);
      expect(testAttachment.getLanguage()).toBeUndefined();
      expect(testAttachment.hasData()).toBe(false);
      expect(testAttachment.getData()).toBeUndefined();
      expect(testAttachment.hasUrl()).toBe(false);
      expect(testAttachment.getUrl()).toBeUndefined();
      expect(testAttachment.hasSize()).toBe(false);
      expect(testAttachment.getSize()).toBeUndefined();
      expect(testAttachment.hasHash()).toBe(false);
      expect(testAttachment.getHash()).toBeUndefined();
      expect(testAttachment.hasTitle()).toBe(false);
      expect(testAttachment.getTitle()).toBeUndefined();
      expect(testAttachment.hasCreation()).toBe(false);
      expect(testAttachment.getCreation()).toBeUndefined();
    });

    it('should throw errors for invalid primitive values', () => {
      const testAttachment = new Attachment();

      let t = () => {
        testAttachment.setContentType(INVALID_CODE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Attachment.contentType (${INVALID_CODE})`);

      t = () => {
        testAttachment.setLanguage(INVALID_CODE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Attachment.language (${INVALID_CODE})`);

      t = () => {
        testAttachment.setData(INVALID_BASE64BINARY);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Attachment.data (${INVALID_BASE64BINARY})`);

      t = () => {
        testAttachment.setUrl(INVALID_URL);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Attachment.url (${INVALID_URL})`);

      t = () => {
        testAttachment.setSize(INVALID_UNSIGNED_INT);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Attachment.size (${String(INVALID_UNSIGNED_INT)})`);

      t = () => {
        testAttachment.setHash(INVALID_BASE64BINARY);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Attachment.hash (${INVALID_BASE64BINARY})`);

      t = () => {
        testAttachment.setTitle(TOO_BIG_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Attachment.title`);

      t = () => {
        testAttachment.setCreation(INVALID_DATETIME);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Attachment.creation (${INVALID_DATETIME})`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with DataType values', () => {
      const testAttachment = new Attachment();
      testAttachment.setContentTypeElement(VALID_CODE_TYPE);
      testAttachment.setLanguageElement(VALID_CODE_TYPE_2);
      testAttachment.setDataElement(VALID_BASE64BINARY_TYPE);
      testAttachment.setUrlElement(VALID_URL_TYPE);
      testAttachment.setSizeElement(VALID_UNSIGNED_INT_TYPE);
      testAttachment.setHashElement(VALID_BASE64BINARY_TYPE_2);
      testAttachment.setTitleElement(VALID_STRING_TYPE);
      testAttachment.setCreationElement(VALID_DATETIME_TYPE);

      expect(testAttachment).toBeDefined();
      expect(testAttachment).toBeInstanceOf(DataType);
      expect(testAttachment).toBeInstanceOf(Attachment);
      expect(testAttachment.constructor.name).toStrictEqual('Attachment');
      expect(testAttachment.fhirType()).toStrictEqual('Attachment');
      expect(testAttachment.isEmpty()).toBe(false);
      expect(testAttachment.isComplexDataType()).toBe(true);
      expect(testAttachment.toJSON()).toBeDefined();

      // inherited properties from Element
      expect(testAttachment.hasId()).toBe(false);
      expect(testAttachment.getId()).toBeUndefined();
      expect(testAttachment.hasExtension()).toBe(false);
      expect(testAttachment.getExtension()).toEqual([] as Extension[]);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(true);
      expect(testAttachment.getContentTypeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testAttachment.hasLanguageElement()).toBe(true);
      expect(testAttachment.getLanguageElement()).toStrictEqual(VALID_CODE_TYPE_2);
      expect(testAttachment.hasDataElement()).toBe(true);
      expect(testAttachment.getDataElement()).toStrictEqual(VALID_BASE64BINARY_TYPE);
      expect(testAttachment.hasUrlElement()).toBe(true);
      expect(testAttachment.getUrlElement()).toStrictEqual(VALID_URL_TYPE);
      expect(testAttachment.hasSizeElement()).toBe(true);
      expect(testAttachment.getSizeElement()).toStrictEqual(VALID_UNSIGNED_INT_TYPE);
      expect(testAttachment.hasHashElement()).toBe(true);
      expect(testAttachment.getHashElement()).toStrictEqual(VALID_BASE64BINARY_TYPE_2);
      expect(testAttachment.hasTitleElement()).toBe(true);
      expect(testAttachment.getTitleElement()).toStrictEqual(VALID_STRING_TYPE);
      expect(testAttachment.hasCreationElement()).toBe(true);
      expect(testAttachment.getCreationElement()).toStrictEqual(VALID_DATETIME_TYPE);

      expect(testAttachment.hasContentType()).toBe(true);
      expect(testAttachment.getContentType()).toStrictEqual(VALID_CODE);
      expect(testAttachment.hasLanguage()).toBe(true);
      expect(testAttachment.getLanguage()).toStrictEqual(VALID_CODE_2);
      expect(testAttachment.hasData()).toBe(true);
      expect(testAttachment.getData()).toStrictEqual(VALID_BASE64BINARY);
      expect(testAttachment.hasUrl()).toBe(true);
      expect(testAttachment.getUrl()).toStrictEqual(VALID_URL);
      expect(testAttachment.hasSize()).toBe(true);
      expect(testAttachment.getSize()).toStrictEqual(VALID_UNSIGNED_INT);
      expect(testAttachment.hasHash()).toBe(true);
      expect(testAttachment.getHash()).toStrictEqual(VALID_BASE64BINARY_2);
      expect(testAttachment.hasTitle()).toBe(true);
      expect(testAttachment.getTitle()).toStrictEqual(VALID_STRING);
      expect(testAttachment.hasCreation()).toBe(true);
      expect(testAttachment.getCreation()).toStrictEqual(VALID_DATETIME);
    });

    it('should be properly reset by modifying all properties with DataType values', () => {
      const testAttachment = new Attachment();
      testAttachment.setContentTypeElement(VALID_CODE_TYPE);
      testAttachment.setLanguageElement(VALID_CODE_TYPE_2);
      testAttachment.setDataElement(VALID_BASE64BINARY_TYPE);
      testAttachment.setUrlElement(VALID_URL_TYPE);
      testAttachment.setSizeElement(VALID_UNSIGNED_INT_TYPE);
      testAttachment.setHashElement(VALID_BASE64BINARY_TYPE_2);
      testAttachment.setTitleElement(VALID_STRING_TYPE);
      testAttachment.setCreationElement(VALID_DATETIME_TYPE);

      expect(testAttachment).toBeDefined();
      expect(testAttachment.isEmpty()).toBe(false);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(true);
      expect(testAttachment.getContentTypeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testAttachment.hasLanguageElement()).toBe(true);
      expect(testAttachment.getLanguageElement()).toStrictEqual(VALID_CODE_TYPE_2);
      expect(testAttachment.hasDataElement()).toBe(true);
      expect(testAttachment.getDataElement()).toStrictEqual(VALID_BASE64BINARY_TYPE);
      expect(testAttachment.hasUrlElement()).toBe(true);
      expect(testAttachment.getUrlElement()).toStrictEqual(VALID_URL_TYPE);
      expect(testAttachment.hasSizeElement()).toBe(true);
      expect(testAttachment.getSizeElement()).toStrictEqual(VALID_UNSIGNED_INT_TYPE);
      expect(testAttachment.hasHashElement()).toBe(true);
      expect(testAttachment.getHashElement()).toStrictEqual(VALID_BASE64BINARY_TYPE_2);
      expect(testAttachment.hasTitleElement()).toBe(true);
      expect(testAttachment.getTitleElement()).toStrictEqual(VALID_STRING_TYPE);
      expect(testAttachment.hasCreationElement()).toBe(true);
      expect(testAttachment.getCreationElement()).toStrictEqual(VALID_DATETIME_TYPE);

      expect(testAttachment.hasContentType()).toBe(true);
      expect(testAttachment.getContentType()).toStrictEqual(VALID_CODE);
      expect(testAttachment.hasLanguage()).toBe(true);
      expect(testAttachment.getLanguage()).toStrictEqual(VALID_CODE_2);
      expect(testAttachment.hasData()).toBe(true);
      expect(testAttachment.getData()).toStrictEqual(VALID_BASE64BINARY);
      expect(testAttachment.hasUrl()).toBe(true);
      expect(testAttachment.getUrl()).toStrictEqual(VALID_URL);
      expect(testAttachment.hasSize()).toBe(true);
      expect(testAttachment.getSize()).toStrictEqual(VALID_UNSIGNED_INT);
      expect(testAttachment.hasHash()).toBe(true);
      expect(testAttachment.getHash()).toStrictEqual(VALID_BASE64BINARY_2);
      expect(testAttachment.hasTitle()).toBe(true);
      expect(testAttachment.getTitle()).toStrictEqual(VALID_STRING);
      expect(testAttachment.hasCreation()).toBe(true);
      expect(testAttachment.getCreation()).toStrictEqual(VALID_DATETIME);

      // Reset

      testAttachment.setContentTypeElement(VALID_CODE_TYPE_2);
      testAttachment.setLanguageElement(VALID_CODE_TYPE);
      testAttachment.setDataElement(VALID_BASE64BINARY_TYPE_2);
      testAttachment.setUrlElement(VALID_URL_TYPE_2);
      testAttachment.setSizeElement(VALID_UNSIGNED_INT_TYPE_2);
      testAttachment.setHashElement(VALID_BASE64BINARY_TYPE);
      testAttachment.setTitleElement(VALID_STRING_TYPE_2);
      testAttachment.setCreationElement(VALID_DATETIME_TYPE_2);

      expect(testAttachment).toBeDefined();
      expect(testAttachment.isEmpty()).toBe(false);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(true);
      expect(testAttachment.getContentTypeElement()).toStrictEqual(VALID_CODE_TYPE_2);
      expect(testAttachment.hasLanguageElement()).toBe(true);
      expect(testAttachment.getLanguageElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testAttachment.hasDataElement()).toBe(true);
      expect(testAttachment.getDataElement()).toStrictEqual(VALID_BASE64BINARY_TYPE_2);
      expect(testAttachment.hasUrlElement()).toBe(true);
      expect(testAttachment.getUrlElement()).toStrictEqual(VALID_URL_TYPE_2);
      expect(testAttachment.hasSizeElement()).toBe(true);
      expect(testAttachment.getSizeElement()).toStrictEqual(VALID_UNSIGNED_INT_TYPE_2);
      expect(testAttachment.hasHashElement()).toBe(true);
      expect(testAttachment.getHashElement()).toStrictEqual(VALID_BASE64BINARY_TYPE);
      expect(testAttachment.hasTitleElement()).toBe(true);
      expect(testAttachment.getTitleElement()).toStrictEqual(VALID_STRING_TYPE_2);
      expect(testAttachment.hasCreationElement()).toBe(true);
      expect(testAttachment.getCreationElement()).toStrictEqual(VALID_DATETIME_TYPE_2);

      expect(testAttachment.hasContentType()).toBe(true);
      expect(testAttachment.getContentType()).toStrictEqual(VALID_CODE_2);
      expect(testAttachment.hasLanguage()).toBe(true);
      expect(testAttachment.getLanguage()).toStrictEqual(VALID_CODE);
      expect(testAttachment.hasData()).toBe(true);
      expect(testAttachment.getData()).toStrictEqual(VALID_BASE64BINARY_2);
      expect(testAttachment.hasUrl()).toBe(true);
      expect(testAttachment.getUrl()).toStrictEqual(VALID_URL_2);
      expect(testAttachment.hasSize()).toBe(true);
      expect(testAttachment.getSize()).toStrictEqual(VALID_UNSIGNED_INT_2);
      expect(testAttachment.hasHash()).toBe(true);
      expect(testAttachment.getHash()).toStrictEqual(VALID_BASE64BINARY);
      expect(testAttachment.hasTitle()).toBe(true);
      expect(testAttachment.getTitle()).toStrictEqual(VALID_STRING_2);
      expect(testAttachment.hasCreation()).toBe(true);
      expect(testAttachment.getCreation()).toStrictEqual(VALID_DATETIME_2);

      // Reset to empty

      testAttachment.setContentTypeElement(UNDEFINED_VALUE);
      testAttachment.setLanguageElement(UNDEFINED_VALUE);
      testAttachment.setDataElement(UNDEFINED_VALUE);
      testAttachment.setUrlElement(UNDEFINED_VALUE);
      testAttachment.setSizeElement(UNDEFINED_VALUE);
      testAttachment.setHashElement(UNDEFINED_VALUE);
      testAttachment.setTitleElement(UNDEFINED_VALUE);
      testAttachment.setCreationElement(UNDEFINED_VALUE);

      expect(testAttachment).toBeDefined();
      expect(testAttachment.isEmpty()).toBe(true);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(false);
      expect(testAttachment.getContentTypeElement()).toEqual(new CodeType());
      expect(testAttachment.hasLanguageElement()).toBe(false);
      expect(testAttachment.getLanguageElement()).toEqual(new CodeType());
      expect(testAttachment.hasDataElement()).toBe(false);
      expect(testAttachment.getDataElement()).toEqual(new Base64BinaryType());
      expect(testAttachment.hasUrlElement()).toBe(false);
      expect(testAttachment.getUrlElement()).toEqual(new UrlType());
      expect(testAttachment.hasSizeElement()).toBe(false);
      expect(testAttachment.getSizeElement()).toEqual(new UnsignedIntType());
      expect(testAttachment.hasHashElement()).toBe(false);
      expect(testAttachment.getHashElement()).toEqual(new Base64BinaryType());
      expect(testAttachment.hasTitleElement()).toBe(false);
      expect(testAttachment.getTitleElement()).toEqual(new StringType());
      expect(testAttachment.hasCreationElement()).toBe(false);
      expect(testAttachment.getCreationElement()).toEqual(new DateTimeType());

      expect(testAttachment.hasContentType()).toBe(false);
      expect(testAttachment.getContentType()).toBeUndefined();
      expect(testAttachment.hasLanguage()).toBe(false);
      expect(testAttachment.getLanguage()).toBeUndefined();
      expect(testAttachment.hasData()).toBe(false);
      expect(testAttachment.getData()).toBeUndefined();
      expect(testAttachment.hasUrl()).toBe(false);
      expect(testAttachment.getUrl()).toBeUndefined();
      expect(testAttachment.hasSize()).toBe(false);
      expect(testAttachment.getSize()).toBeUndefined();
      expect(testAttachment.hasHash()).toBe(false);
      expect(testAttachment.getHash()).toBeUndefined();
      expect(testAttachment.hasTitle()).toBe(false);
      expect(testAttachment.getTitle()).toBeUndefined();
      expect(testAttachment.hasCreation()).toBe(false);
      expect(testAttachment.getCreation()).toBeUndefined();
    });

    it('should throw errors for invalid DataType values', () => {
      const testAttachment = new Attachment();

      let t = () => {
        // @ts-expect-error: allow for testing
        testAttachment.setContentTypeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Attachment.contentType; Provided element is not an instance of CodeType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAttachment.setLanguageElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Attachment.language; Provided element is not an instance of CodeType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAttachment.setDataElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Attachment.data; Provided element is not an instance of Base64BinaryType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAttachment.setUrlElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Attachment.url; Provided element is not an instance of UrlType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAttachment.setSizeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Attachment.size; Provided element is not an instance of UnsignedIntType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAttachment.setHashElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Attachment.hash; Provided element is not an instance of Base64BinaryType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAttachment.setTitleElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Attachment.title; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testAttachment.setCreationElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Attachment.creation; Provided element is not an instance of DateTimeType.`);
    });
  });

  describe('Serialization/Deserialization', () => {
    it('should properly create serialized content', () => {
      const testAttachment = new Attachment();
      const testId = 'id1234';
      testAttachment.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testAttachment.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testAttachment.addExtension(testExtension2);

      const titleType = new StringType(VALID_STRING);
      const titleId = 'T1357';
      const titleExtension = new Extension('titleUrl', new StringType('title extension string value'));
      titleType.setId(titleId);
      titleType.addExtension(titleExtension);

      testAttachment.setContentType(VALID_CODE);
      testAttachment.setLanguage(VALID_CODE_2);
      testAttachment.setData(VALID_BASE64BINARY);
      testAttachment.setUrl(VALID_URL);
      testAttachment.setSize(VALID_UNSIGNED_INT);
      testAttachment.setHash(VALID_BASE64BINARY_2);
      testAttachment.setTitleElement(titleType);
      testAttachment.setCreation(VALID_DATETIME);

      expect(testAttachment).toBeDefined();
      expect(testAttachment).toBeInstanceOf(DataType);
      expect(testAttachment).toBeInstanceOf(Attachment);
      expect(testAttachment.constructor.name).toStrictEqual('Attachment');
      expect(testAttachment.fhirType()).toStrictEqual('Attachment');
      expect(testAttachment.isEmpty()).toBe(false);
      expect(testAttachment.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testAttachment.hasId()).toBe(true);
      expect(testAttachment.getId()).toStrictEqual(testId);
      expect(testAttachment.hasExtension()).toBe(true);
      expect(testAttachment.getExtension()).toEqual([testExtension1, testExtension2]);

      // Attachment properties
      expect(testAttachment.hasContentTypeElement()).toBe(true);
      expect(testAttachment.getContentTypeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testAttachment.hasLanguageElement()).toBe(true);
      expect(testAttachment.getLanguageElement()).toStrictEqual(VALID_CODE_TYPE_2);
      expect(testAttachment.hasDataElement()).toBe(true);
      expect(testAttachment.getDataElement()).toStrictEqual(VALID_BASE64BINARY_TYPE);
      expect(testAttachment.hasUrlElement()).toBe(true);
      expect(testAttachment.getUrlElement()).toStrictEqual(VALID_URL_TYPE);
      expect(testAttachment.hasSizeElement()).toBe(true);
      expect(testAttachment.getSizeElement()).toStrictEqual(VALID_UNSIGNED_INT_TYPE);
      expect(testAttachment.hasHashElement()).toBe(true);
      expect(testAttachment.getHashElement()).toStrictEqual(VALID_BASE64BINARY_TYPE_2);
      expect(testAttachment.hasTitleElement()).toBe(true);
      expect(testAttachment.getTitleElement()).toStrictEqual(titleType);
      expect(testAttachment.hasCreationElement()).toBe(true);
      expect(testAttachment.getCreationElement()).toStrictEqual(VALID_DATETIME_TYPE);

      expect(testAttachment.hasContentType()).toBe(true);
      expect(testAttachment.getContentType()).toStrictEqual(VALID_CODE);
      expect(testAttachment.hasLanguage()).toBe(true);
      expect(testAttachment.getLanguage()).toStrictEqual(VALID_CODE_2);
      expect(testAttachment.hasData()).toBe(true);
      expect(testAttachment.getData()).toStrictEqual(VALID_BASE64BINARY);
      expect(testAttachment.hasUrl()).toBe(true);
      expect(testAttachment.getUrl()).toStrictEqual(VALID_URL);
      expect(testAttachment.hasSize()).toBe(true);
      expect(testAttachment.getSize()).toStrictEqual(VALID_UNSIGNED_INT);
      expect(testAttachment.hasHash()).toBe(true);
      expect(testAttachment.getHash()).toStrictEqual(VALID_BASE64BINARY_2);
      expect(testAttachment.hasTitle()).toBe(true);
      expect(testAttachment.getTitle()).toStrictEqual(VALID_STRING);
      expect(testAttachment.hasCreation()).toBe(true);
      expect(testAttachment.getCreation()).toStrictEqual(VALID_DATETIME);

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
        contentType: 'testCodeType',
        language: 'testCodeType2',
        data: 'VGV4dCByZXByZXNlbnRhdGlvbiBvZiB0aGUgYWRkcmVzcw==',
        url: 'testUrlType',
        size: 76,
        hash: '0f60168295bc9d6b0535feaf0975a63532959834',
        title: 'This is a valid string.',
        _title: {
          id: 'T1357',
          extension: [
            {
              url: 'titleUrl',
              valueString: 'title extension string value',
            },
          ],
        },
        creation: '2017-01-01T13:24:00.000Z',
      };
      expect(testAttachment.toJSON()).toEqual(expectedJson);
    });
  });
});
