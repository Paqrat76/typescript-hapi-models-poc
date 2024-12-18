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

import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { INVALID_NON_STRING_TYPE, INVALID_STRING, INVALID_STRING_TYPE, UNDEFINED_VALUE } from '../../../test-utils';

describe('Reference', () => {
  const VALID_URI = `testUriType`;
  const VALID_URI_TYPE = new UriType(VALID_URI);
  const VALID_URI_2 = `testUriType2`;
  const VALID_URI_TYPE_2 = new UriType(VALID_URI_2);
  const INVALID_URI = ' invalid Uri ';

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);

  const VALID_IDENTIFIER_VALUE_1 = 'Identifier value 1';
  const IDENTIFIER_TYPE_1 = new Identifier();
  IDENTIFIER_TYPE_1.setValue(VALID_IDENTIFIER_VALUE_1);

  const VALID_IDENTIFIER_VALUE_2 = 'Identifier value 2';
  const IDENTIFIER_TYPE_2 = new Identifier();
  IDENTIFIER_TYPE_2.setValue(VALID_IDENTIFIER_VALUE_2);

  describe('Core', () => {
    const expectedJson = {
      reference: VALID_STRING,
      type: VALID_URI,
      identifier: {
        value: VALID_IDENTIFIER_VALUE_1,
      },
      display: VALID_STRING_2,
    };

    it('should be properly instantiated as empty', () => {
      const testReference = new Reference();
      expect(testReference).toBeDefined();
      expect(testReference).toBeInstanceOf(DataType);
      expect(testReference).toBeInstanceOf(Reference);
      expect(testReference.constructor.name).toStrictEqual('Reference');
      expect(testReference.fhirType()).toStrictEqual('Reference');
      expect(testReference.isEmpty()).toBe(true);
      expect(testReference.isComplexDataType()).toBe(true);
      expect(testReference.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testReference.hasId()).toBe(false);
      expect(testReference.getId()).toBeUndefined();
      expect(testReference.hasExtension()).toBe(false);
      expect(testReference.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(false);
      expect(testReference.getReferenceElement()).toEqual(new StringType());
      expect(testReference.hasTypeElement()).toBe(false);
      expect(testReference.getTypeElement()).toEqual(new UriType());
      expect(testReference.hasDisplayElement()).toBe(false);
      expect(testReference.getDisplayElement()).toEqual(new StringType());

      expect(testReference.hasReference()).toBe(false);
      expect(testReference.getReference()).toBeUndefined();
      expect(testReference.hasType()).toBe(false);
      expect(testReference.getType()).toBeUndefined();
      expect(testReference.hasIdentifier()).toBe(false);
      expect(testReference.getIdentifier()).toEqual(new Identifier());
      expect(testReference.hasDisplay()).toBe(false);
      expect(testReference.getDisplay()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const referenceType = new Reference();
      referenceType.setReference(VALID_STRING);
      referenceType.setType(VALID_URI);
      referenceType.setIdentifier(IDENTIFIER_TYPE_1);
      referenceType.setDisplay(VALID_STRING_2);

      let testReference = referenceType.copy();
      expect(testReference).toBeDefined();
      expect(testReference).toBeInstanceOf(DataType);
      expect(testReference).toBeInstanceOf(Reference);
      expect(testReference.constructor.name).toStrictEqual('Reference');
      expect(testReference.fhirType()).toStrictEqual('Reference');
      expect(testReference.isEmpty()).toBe(false);
      expect(testReference.isComplexDataType()).toBe(true);
      expect(testReference.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testReference.hasId()).toBe(false);
      expect(testReference.getId()).toBeUndefined();
      expect(testReference.hasExtension()).toBe(false);
      expect(testReference.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(true);
      expect(testReference.getReferenceElement()).toEqual(VALID_STRING_TYPE);
      expect(testReference.hasTypeElement()).toBe(true);
      expect(testReference.getTypeElement()).toEqual(VALID_URI_TYPE);
      expect(testReference.hasDisplayElement()).toBe(true);
      expect(testReference.getDisplayElement()).toEqual(VALID_STRING_TYPE_2);

      expect(testReference.hasReference()).toBe(true);
      expect(testReference.getReference()).toStrictEqual(VALID_STRING);
      expect(testReference.hasType()).toBe(true);
      expect(testReference.getType()).toStrictEqual(VALID_URI);
      expect(testReference.hasIdentifier()).toBe(true);
      expect(testReference.getIdentifier()).toEqual(IDENTIFIER_TYPE_1);
      expect(testReference.hasDisplay()).toBe(true);
      expect(testReference.getDisplay()).toStrictEqual(VALID_STRING_2);

      // Reset to empty

      referenceType.setReference(UNDEFINED_VALUE);
      referenceType.setType(UNDEFINED_VALUE);
      referenceType.setIdentifier(UNDEFINED_VALUE);
      referenceType.setDisplay(UNDEFINED_VALUE);

      testReference = referenceType.copy();
      expect(testReference).toBeDefined();
      expect(testReference).toBeInstanceOf(DataType);
      expect(testReference).toBeInstanceOf(Reference);
      expect(testReference.constructor.name).toStrictEqual('Reference');
      expect(testReference.fhirType()).toStrictEqual('Reference');
      expect(testReference.isEmpty()).toBe(true);
      expect(testReference.isComplexDataType()).toBe(true);
      expect(testReference.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testReference.hasId()).toBe(false);
      expect(testReference.getId()).toBeUndefined();
      expect(testReference.hasExtension()).toBe(false);
      expect(testReference.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(false);
      expect(testReference.getReferenceElement()).toEqual(new StringType());
      expect(testReference.hasTypeElement()).toBe(false);
      expect(testReference.getTypeElement()).toEqual(new UriType());
      expect(testReference.hasDisplayElement()).toBe(false);
      expect(testReference.getDisplayElement()).toEqual(new StringType());

      expect(testReference.hasReference()).toBe(false);
      expect(testReference.getReference()).toBeUndefined();
      expect(testReference.hasType()).toBe(false);
      expect(testReference.getType()).toBeUndefined();
      expect(testReference.hasIdentifier()).toBe(false);
      expect(testReference.getIdentifier()).toEqual(new Identifier());
      expect(testReference.hasDisplay()).toBe(false);
      expect(testReference.getDisplay()).toBeUndefined();
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testReference = new Reference();
      testReference.setReference(VALID_STRING);
      testReference.setType(VALID_URI);
      testReference.setIdentifier(IDENTIFIER_TYPE_1);
      testReference.setDisplay(VALID_STRING_2);

      expect(testReference).toBeDefined();
      expect(testReference).toBeInstanceOf(DataType);
      expect(testReference).toBeInstanceOf(Reference);
      expect(testReference.constructor.name).toStrictEqual('Reference');
      expect(testReference.fhirType()).toStrictEqual('Reference');
      expect(testReference.isEmpty()).toBe(false);
      expect(testReference.isComplexDataType()).toBe(true);
      expect(testReference.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testReference.hasId()).toBe(false);
      expect(testReference.getId()).toBeUndefined();
      expect(testReference.hasExtension()).toBe(false);
      expect(testReference.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(true);
      expect(testReference.getReferenceElement()).toEqual(VALID_STRING_TYPE);
      expect(testReference.hasTypeElement()).toBe(true);
      expect(testReference.getTypeElement()).toEqual(VALID_URI_TYPE);
      expect(testReference.hasDisplayElement()).toBe(true);
      expect(testReference.getDisplayElement()).toEqual(VALID_STRING_TYPE_2);

      expect(testReference.hasReference()).toBe(true);
      expect(testReference.getReference()).toStrictEqual(VALID_STRING);
      expect(testReference.hasType()).toBe(true);
      expect(testReference.getType()).toStrictEqual(VALID_URI);
      expect(testReference.hasIdentifier()).toBe(true);
      expect(testReference.getIdentifier()).toEqual(IDENTIFIER_TYPE_1);
      expect(testReference.hasDisplay()).toBe(true);
      expect(testReference.getDisplay()).toStrictEqual(VALID_STRING_2);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testReference = new Reference();
      testReference.setReference(VALID_STRING);
      testReference.setType(VALID_URI);
      testReference.setIdentifier(IDENTIFIER_TYPE_1);
      testReference.setDisplay(VALID_STRING_2);

      expect(testReference).toBeDefined();
      expect(testReference.isEmpty()).toBe(false);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(true);
      expect(testReference.getReferenceElement()).toEqual(VALID_STRING_TYPE);
      expect(testReference.hasTypeElement()).toBe(true);
      expect(testReference.getTypeElement()).toEqual(VALID_URI_TYPE);
      expect(testReference.hasDisplayElement()).toBe(true);
      expect(testReference.getDisplayElement()).toEqual(VALID_STRING_TYPE_2);

      expect(testReference.hasReference()).toBe(true);
      expect(testReference.getReference()).toStrictEqual(VALID_STRING);
      expect(testReference.hasType()).toBe(true);
      expect(testReference.getType()).toStrictEqual(VALID_URI);
      expect(testReference.hasIdentifier()).toBe(true);
      expect(testReference.getIdentifier()).toEqual(IDENTIFIER_TYPE_1);
      expect(testReference.hasDisplay()).toBe(true);
      expect(testReference.getDisplay()).toStrictEqual(VALID_STRING_2);

      // Reset

      testReference.setReference(VALID_STRING_2);
      testReference.setType(VALID_URI_2);
      testReference.setIdentifier(IDENTIFIER_TYPE_2);
      testReference.setDisplay(VALID_STRING);

      expect(testReference).toBeDefined();
      expect(testReference.isEmpty()).toBe(false);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(true);
      expect(testReference.getReferenceElement()).toEqual(VALID_STRING_TYPE_2);
      expect(testReference.hasTypeElement()).toBe(true);
      expect(testReference.getTypeElement()).toEqual(VALID_URI_TYPE_2);
      expect(testReference.hasDisplayElement()).toBe(true);
      expect(testReference.getDisplayElement()).toEqual(VALID_STRING_TYPE);

      expect(testReference.hasReference()).toBe(true);
      expect(testReference.getReference()).toStrictEqual(VALID_STRING_2);
      expect(testReference.hasType()).toBe(true);
      expect(testReference.getType()).toStrictEqual(VALID_URI_2);
      expect(testReference.hasIdentifier()).toBe(true);
      expect(testReference.getIdentifier()).toEqual(IDENTIFIER_TYPE_2);
      expect(testReference.hasDisplay()).toBe(true);
      expect(testReference.getDisplay()).toStrictEqual(VALID_STRING);

      // Reset as empty

      testReference.setReference(UNDEFINED_VALUE);
      testReference.setType(UNDEFINED_VALUE);
      testReference.setIdentifier(UNDEFINED_VALUE);
      testReference.setDisplay(UNDEFINED_VALUE);

      expect(testReference).toBeDefined();
      expect(testReference.isEmpty()).toBe(true);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(false);
      expect(testReference.getReferenceElement()).toEqual(new StringType());
      expect(testReference.hasTypeElement()).toBe(false);
      expect(testReference.getTypeElement()).toEqual(new UriType());
      expect(testReference.hasDisplayElement()).toBe(false);
      expect(testReference.getDisplayElement()).toEqual(new StringType());

      expect(testReference.hasReference()).toBe(false);
      expect(testReference.getReference()).toBeUndefined();
      expect(testReference.hasType()).toBe(false);
      expect(testReference.getType()).toBeUndefined();
      expect(testReference.hasIdentifier()).toBe(false);
      expect(testReference.getIdentifier()).toEqual(new Identifier());
      expect(testReference.hasDisplay()).toBe(false);
      expect(testReference.getDisplay()).toBeUndefined();
    });

    it('should throw errors for invalid primitive values', () => {
      const testReference = new Reference();

      let t = () => {
        testReference.setReference(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Reference.reference (${INVALID_STRING})`);

      t = () => {
        testReference.setType(INVALID_URI);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Reference.type (${INVALID_URI})`);

      t = () => {
        testReference.setDisplay(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Reference.display (${INVALID_STRING})`);
    });

    // it('should throw PrimitiveTypeError when reset with invalid primitive Reference.reference value', () => {
    //   const testReference = new Reference();
    //   const t = () => {
    //     testReference.setReference(INVALID_STRING);
    //   };
    //   expect(t).toThrow(PrimitiveTypeError);
    //   expect(t).toThrow(`Invalid Reference.reference (${INVALID_STRING})`);
    // });

    // it('should throw PrimitiveTypeError when reset with invalid primitive Reference.type value', () => {
    //   const testReference = new Reference();
    //   const t = () => {
    //     testReference.setType(INVALID_URI);
    //   };
    //   expect(t).toThrow(PrimitiveTypeError);
    //   expect(t).toThrow(`Invalid Reference.type (${INVALID_URI})`);
    // });

    // it('should throw PrimitiveTypeError when reset with invalid primitive Reference.display value', () => {
    //   const testReference = new Reference();
    //   const t = () => {
    //     testReference.setDisplay(INVALID_STRING);
    //   };
    //   expect(t).toThrow(PrimitiveTypeError);
    //   expect(t).toThrow(`Invalid Reference.display (${INVALID_STRING})`);
    // });

    // Tests using DataType elements

    it('should be properly instantiated with DataType values', () => {
      const testReference = new Reference();
      testReference.setReferenceElement(VALID_STRING_TYPE);
      testReference.setTypeElement(VALID_URI_TYPE);
      testReference.setIdentifier(IDENTIFIER_TYPE_1);
      testReference.setDisplayElement(VALID_STRING_TYPE_2);

      expect(testReference).toBeDefined();
      expect(testReference).toBeInstanceOf(DataType);
      expect(testReference).toBeInstanceOf(Reference);
      expect(testReference.constructor.name).toStrictEqual('Reference');
      expect(testReference.fhirType()).toStrictEqual('Reference');
      expect(testReference.isEmpty()).toBe(false);
      expect(testReference.isComplexDataType()).toBe(true);
      expect(testReference.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testReference.hasId()).toBe(false);
      expect(testReference.getId()).toBeUndefined();
      expect(testReference.hasExtension()).toBe(false);
      expect(testReference.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(true);
      expect(testReference.getReferenceElement()).toEqual(VALID_STRING_TYPE);
      expect(testReference.hasTypeElement()).toBe(true);
      expect(testReference.getTypeElement()).toEqual(VALID_URI_TYPE);
      expect(testReference.hasDisplayElement()).toBe(true);
      expect(testReference.getDisplayElement()).toEqual(VALID_STRING_TYPE_2);

      expect(testReference.hasReference()).toBe(true);
      expect(testReference.getReference()).toStrictEqual(VALID_STRING);
      expect(testReference.hasType()).toBe(true);
      expect(testReference.getType()).toStrictEqual(VALID_URI);
      expect(testReference.hasIdentifier()).toBe(true);
      expect(testReference.getIdentifier()).toEqual(IDENTIFIER_TYPE_1);
      expect(testReference.hasDisplay()).toBe(true);
      expect(testReference.getDisplay()).toStrictEqual(VALID_STRING_2);
    });

    it('should be properly reset by modifying all properties with DataType values', () => {
      const testReference = new Reference();
      testReference.setReferenceElement(VALID_STRING_TYPE);
      testReference.setTypeElement(VALID_URI_TYPE);
      testReference.setIdentifier(IDENTIFIER_TYPE_1);
      testReference.setDisplayElement(VALID_STRING_TYPE_2);

      expect(testReference).toBeDefined();
      expect(testReference.isEmpty()).toBe(false);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(true);
      expect(testReference.getReferenceElement()).toEqual(VALID_STRING_TYPE);
      expect(testReference.hasTypeElement()).toBe(true);
      expect(testReference.getTypeElement()).toEqual(VALID_URI_TYPE);
      expect(testReference.hasDisplayElement()).toBe(true);
      expect(testReference.getDisplayElement()).toEqual(VALID_STRING_TYPE_2);

      expect(testReference.hasReference()).toBe(true);
      expect(testReference.getReference()).toStrictEqual(VALID_STRING);
      expect(testReference.hasType()).toBe(true);
      expect(testReference.getType()).toStrictEqual(VALID_URI);
      expect(testReference.hasIdentifier()).toBe(true);
      expect(testReference.getIdentifier()).toEqual(IDENTIFIER_TYPE_1);
      expect(testReference.hasDisplay()).toBe(true);
      expect(testReference.getDisplay()).toStrictEqual(VALID_STRING_2);

      // Reset
      testReference.setReferenceElement(VALID_STRING_TYPE_2);
      testReference.setTypeElement(VALID_URI_TYPE_2);
      testReference.setIdentifier(IDENTIFIER_TYPE_2);
      testReference.setDisplayElement(VALID_STRING_TYPE);

      expect(testReference).toBeDefined();
      expect(testReference.isEmpty()).toBe(false);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(true);
      expect(testReference.getReferenceElement()).toEqual(VALID_STRING_TYPE_2);
      expect(testReference.hasTypeElement()).toBe(true);
      expect(testReference.getTypeElement()).toEqual(VALID_URI_TYPE_2);
      expect(testReference.hasDisplayElement()).toBe(true);
      expect(testReference.getDisplayElement()).toEqual(VALID_STRING_TYPE);

      expect(testReference.hasReference()).toBe(true);
      expect(testReference.getReference()).toStrictEqual(VALID_STRING_2);
      expect(testReference.hasType()).toBe(true);
      expect(testReference.getType()).toStrictEqual(VALID_URI_2);
      expect(testReference.hasIdentifier()).toBe(true);
      expect(testReference.getIdentifier()).toEqual(IDENTIFIER_TYPE_2);
      expect(testReference.hasDisplay()).toBe(true);
      expect(testReference.getDisplay()).toStrictEqual(VALID_STRING);

      // Reset as empty

      testReference.setReferenceElement(UNDEFINED_VALUE);
      testReference.setTypeElement(UNDEFINED_VALUE);
      testReference.setIdentifier(UNDEFINED_VALUE);
      testReference.setDisplayElement(UNDEFINED_VALUE);

      expect(testReference).toBeDefined();
      expect(testReference.isEmpty()).toBe(true);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(false);
      expect(testReference.getReferenceElement()).toEqual(new StringType());
      expect(testReference.hasTypeElement()).toBe(false);
      expect(testReference.getTypeElement()).toEqual(new UriType());
      expect(testReference.hasDisplayElement()).toBe(false);
      expect(testReference.getDisplayElement()).toEqual(new StringType());

      expect(testReference.hasReference()).toBe(false);
      expect(testReference.getReference()).toBeUndefined();
      expect(testReference.hasType()).toBe(false);
      expect(testReference.getType()).toBeUndefined();
      expect(testReference.hasIdentifier()).toBe(false);
      expect(testReference.getIdentifier()).toEqual(new Identifier());
      expect(testReference.hasDisplay()).toBe(false);
      expect(testReference.getDisplay()).toBeUndefined();
    });

    it('should throw errors for invalid DataType values', () => {
      const testReference = new Reference();

      let t = () => {
        // @ts-expect-error: allow invalid type for testing
        testReference.setReferenceElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Reference.reference; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow invalid type for testing
        testReference.setTypeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Reference.type; Provided element is not an instance of UriType.`);

      t = () => {
        // @ts-expect-error: allow invalid type for testing
        testReference.setIdentifier(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Reference.identifier; Provided value is not an instance of Identifier.`);

      t = () => {
        // @ts-expect-error: allow invalid type for testing
        testReference.setDisplayElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Reference.display; Provided element is not an instance of StringType.`);
    });

    // it('should throw InvalidTypeError when reset with invalid PrimitiveType Reference.reference value', () => {
    //   const testReference = new Reference();
    //   const t = () => {
    //     // @ts-expect-error: allow invalid type for testing
    //     testReference.setReferenceElement(INVALID_STRING_TYPE);
    //   };
    //   expect(t).toThrow(InvalidTypeError);
    //   expect(t).toThrow(`Invalid Reference.reference; Provided element is not an instance of StringType.`);
    // });

    // it('should throw InvalidTypeError when reset with invalid PrimitiveType Reference.type value', () => {
    //   const testReference = new Reference();
    //   const t = () => {
    //     // @ts-expect-error: allow invalid type for testing
    //     testReference.setTypeElement(INVALID_NON_STRING_TYPE);
    //   };
    //   expect(t).toThrow(InvalidTypeError);
    //   expect(t).toThrow(`Invalid Reference.type; Provided element is not an instance of UriType.`);
    // });

    // it('should throw InvalidTypeError when reset with invalid PrimitiveType Reference.identifier value', () => {
    //   const testReference = new Reference();
    //   const t = () => {
    //     // @ts-expect-error: allow invalid type for testing
    //     testReference.setIdentifier(INVALID_NON_STRING_TYPE);
    //   };
    //   expect(t).toThrow(InvalidTypeError);
    //   expect(t).toThrow(`Invalid Reference.identifier; Provided value is not an instance of Identifier.`);
    // });

    // it('should throw InvalidTypeError when reset with invalid PrimitiveType Reference.display value', () => {
    //   const testReference = new Reference();
    //   const t = () => {
    //     // @ts-expect-error: allow invalid type for testing
    //     testReference.setDisplayElement(INVALID_STRING_TYPE);
    //   };
    //   expect(t).toThrow(InvalidTypeError);
    //   expect(t).toThrow(`Invalid Reference.display; Provided element is not an instance of StringType.`);
    // });
  });

  describe('Serialization/Deserialization', () => {
    it('should properly create serialized content', () => {
      const typeUri = 'testUriType3';
      const typeType = new UriType(typeUri);
      const typeId = 'T1357';
      typeType.setId(typeId);
      const typeExtension = new Extension('typeUrl', new StringType('type extension string value'));
      typeType.addExtension(typeExtension);

      const testReference = new Reference();
      const testId = 'id1234';
      testReference.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testReference.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testReference.addExtension(testExtension2);

      testReference.setReferenceElement(VALID_STRING_TYPE);
      testReference.setTypeElement(typeType);
      testReference.setIdentifier(IDENTIFIER_TYPE_1);
      testReference.setDisplayElement(VALID_STRING_TYPE_2);

      expect(testReference).toBeDefined();
      expect(testReference).toBeInstanceOf(DataType);
      expect(testReference).toBeInstanceOf(Reference);
      expect(testReference.constructor.name).toStrictEqual('Reference');
      expect(testReference.fhirType()).toStrictEqual('Reference');
      expect(testReference.isEmpty()).toBe(false);
      expect(testReference.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testReference.hasId()).toBe(true);
      expect(testReference.getId()).toStrictEqual(testId);
      expect(testReference.hasExtension()).toBe(true);
      expect(testReference.getExtension()).toEqual([testExtension1, testExtension2]);

      // Reference properties
      expect(testReference.hasReferenceElement()).toBe(true);
      expect(testReference.getReferenceElement()).toEqual(VALID_STRING_TYPE);
      expect(testReference.hasTypeElement()).toBe(true);
      expect(testReference.getTypeElement()).toEqual(typeType);
      expect(testReference.hasDisplayElement()).toBe(true);
      expect(testReference.getDisplayElement()).toEqual(VALID_STRING_TYPE_2);

      expect(testReference.hasReference()).toBe(true);
      expect(testReference.getReference()).toStrictEqual(VALID_STRING);
      expect(testReference.hasType()).toBe(true);
      expect(testReference.getType()).toStrictEqual(typeUri);
      expect(testReference.hasIdentifier()).toBe(true);
      expect(testReference.getIdentifier()).toEqual(IDENTIFIER_TYPE_1);
      expect(testReference.hasDisplay()).toBe(true);
      expect(testReference.getDisplay()).toStrictEqual(VALID_STRING_2);

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
        reference: 'This is a valid string.',
        type: 'testUriType3',
        _type: {
          id: 'T1357',
          extension: [
            {
              url: 'typeUrl',
              valueString: 'type extension string value',
            },
          ],
        },
        identifier: {
          value: 'Identifier value 1',
        },
        display: 'This is another valid string!',
      };
      expect(testReference.toJSON()).toEqual(expectedJson);
    });
  });
});
