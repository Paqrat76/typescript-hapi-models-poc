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
import {
  assertFhirType,
  assertFhirTypeList,
  assertIsDefined,
  assertIsNumber,
  assertIsString,
  FhirTypeGuard,
  isDefined,
  isBoolean,
  isNumber,
  isString,
  assertIsBoolean,
} from '@src/fhir-core/utility/type-guards';
import { isFhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import {
  assertFhirDataType,
  assertFhirPrimitiveType,
  assertFhirBackboneElement,
  assertFhirBackboneType,
} from '@src/fhir-core/base-models/core-fhir-models';
import { assertFhirResourceType } from '@src/fhir-core/base-models/Resource';
import { assertFhirResourceTypeJson } from '@src/fhir-core/utility/fhir-parsers';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { EnumCodeType, assertEnumCodeType, assertEnumCodeTypeList } from '@src/fhir-core/data-types/primitive/CodeType';
import { QuantityComparatorEnum } from '@src/fhir-core/data-types/code-systems/QuantityComparatorEnum';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import {
  MockBackboneElement,
  MockBackboneType,
  MockCodeEnum,
  MockComplexDataType,
  MockFhirModel,
  MockResource,
  MockTask,
} from '../../test-utils';

describe('type-guards', () => {
  describe('FhirResourceType', () => {
    it('should return true/false as appropriate', () => {
      expect(isFhirResourceType('Account')).toBe(true);
      expect(isFhirResourceType('Invalid')).toBe(false);
    });
  });

  describe('isDefined/assertIsDefined', () => {
    const UNDEFINED_VALUE = undefined;
    const NULL_VALUE = null;

    describe('isDefined', () => {
      it('should return false', () => {
        // @ts-expect-error: allow for testing
        expect(isDefined<string>(UNDEFINED_VALUE)).toBe(false);
        // @ts-expect-error: allow for testing
        expect(isDefined<string>(NULL_VALUE)).toBe(false);
      });

      it('should return true', () => {
        expect(isDefined<string>('')).toBe(true);
        expect(isDefined<string>('  ')).toBe(true);
        expect(isDefined<string>('Abcde')).toBe(true);
        expect(isDefined<string[]>([])).toBe(true);
        expect(isDefined<number>(0)).toBe(true);
        expect(isDefined<number>(12345)).toBe(true);
        expect(isDefined<number>(-12345)).toBe(true);
        expect(isDefined<boolean>(true)).toBe(true);
        expect(isDefined<boolean>(false)).toBe(true);
        expect(isDefined<object>({})).toBe(true);
        expect(isDefined<StringType>(new StringType())).toBe(true);
        expect(isDefined<MockTask>(new MockTask())).toBe(true);
      });
    });

    describe('assertIsDefined', () => {
      it('should not throw AssertionError for defined instance', () => {
        const value = new StringType();
        const t = () => {
          assertIsDefined(value);
        };
        expect(t).not.toThrow(AssertionError);
      });

      it('should throw AssertionError for undefined instance', () => {
        const t = () => {
          assertIsDefined(UNDEFINED_VALUE);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`Value is undefined.`);
      });

      it('should throw AssertionError for null instance', () => {
        const t = () => {
          assertIsDefined(NULL_VALUE);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`Value is null.`);
      });

      it('should throw AssertionError for null instance with override error message', () => {
        const t = () => {
          assertIsDefined(NULL_VALUE, 'The provided value is null.');
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`The provided value is null.`);
      });
    });
  });

  describe('isString/assertIsString', () => {
    const UNDEFINED_VALUE = undefined;
    const NULL_VALUE = null;

    describe('isString', () => {
      it('should return false', () => {
        expect(isString(UNDEFINED_VALUE)).toBe(false);
        expect(isString(NULL_VALUE)).toBe(false);
        expect(isString(true)).toBe(false);
        expect(isString(123)).toBe(false);
        expect(isString(123n)).toBe(false);
        expect(isString(['a'])).toBe(false);
        expect(isString({ key: 'value' })).toBe(false);
      });

      it('should return true', () => {
        expect(isString('')).toBe(true);
        expect(isString('  ')).toBe(true);
        expect(isString('Abcde')).toBe(true);
      });
    });

    describe('assertIsString', () => {
      it('should not throw InvalidTypeError for defined instance', () => {
        const t = () => {
          assertIsString('Abcde');
        };
        expect(t).not.toThrow(InvalidTypeError);
      });

      it('should throw InvalidTypeError for invalid instance', () => {
        const t = () => {
          assertIsString(123);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided value is not an instance of string.`);
      });

      it('should throw InvalidTypeError for undefined instance', () => {
        const t = () => {
          assertIsString(UNDEFINED_VALUE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided value is not an instance of string.`);
      });

      it('should throw InvalidTypeError for null instance', () => {
        const t = () => {
          assertIsString(NULL_VALUE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided value is not an instance of string.`);
      });

      it('should throw InvalidTypeError for null instance with override error message', () => {
        const t = () => {
          assertIsString(NULL_VALUE, 'The provided value is null.');
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`The provided value is null.`);
      });
    });
  });

  describe('isNumber/assertIsNumber', () => {
    const UNDEFINED_VALUE = undefined;
    const NULL_VALUE = null;

    describe('isNumber', () => {
      it('should return false', () => {
        expect(isNumber(UNDEFINED_VALUE)).toBe(false);
        expect(isNumber(NULL_VALUE)).toBe(false);
        expect(isNumber(123n)).toBe(false);
        expect(isNumber(BigInt(123))).toBe(false);
        expect(isNumber(true)).toBe(false);
        expect(isNumber('')).toBe(false);
        expect(isNumber(`Abcde`)).toBe(false);
        expect(isNumber(['a'])).toBe(false);
        expect(isNumber({ key: 'value' })).toBe(false);
      });

      it('should return true', () => {
        expect(isNumber(0)).toBe(true);
        expect(isNumber(123)).toBe(true);
        expect(isNumber(-123)).toBe(true);
        expect(isNumber(123.456)).toBe(true);
      });
    });

    describe('assertIsNumber', () => {
      it('should not throw InvalidTypeError for defined instance', () => {
        const t = () => {
          assertIsNumber(123);
        };
        expect(t).not.toThrow(InvalidTypeError);
      });

      it('should throw InvalidTypeError for invalid instance', () => {
        const t = () => {
          assertIsNumber('123');
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided value is not an instance of number.`);
      });

      it('should throw InvalidTypeError for undefined instance', () => {
        const t = () => {
          assertIsNumber(UNDEFINED_VALUE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided value is not an instance of number.`);
      });

      it('should throw InvalidTypeError for null instance', () => {
        const t = () => {
          assertIsNumber(NULL_VALUE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided value is not an instance of number.`);
      });

      it('should throw InvalidTypeError for null instance with override error message', () => {
        const t = () => {
          assertIsNumber(NULL_VALUE, 'The provided value is null.');
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`The provided value is null.`);
      });
    });
  });

  describe('isBoolean/assertIsBoolean', () => {
    const UNDEFINED_VALUE = undefined;
    const NULL_VALUE = null;

    describe('isBoolean', () => {
      it('should return false', () => {
        expect(isBoolean(UNDEFINED_VALUE)).toBe(false);
        expect(isBoolean(NULL_VALUE)).toBe(false);
        expect(isBoolean(123n)).toBe(false);
        expect(isBoolean(BigInt(123))).toBe(false);
        expect(isBoolean(123)).toBe(false);
        expect(isBoolean('')).toBe(false);
        expect(isBoolean(`Abcde`)).toBe(false);
        expect(isBoolean(['a'])).toBe(false);
        expect(isBoolean({ key: 'value' })).toBe(false);
      });

      it('should return true', () => {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
      });
    });

    describe('assertIsBoolean', () => {
      it('should not throw InvalidTypeError for defined instance', () => {
        const t = () => {
          assertIsBoolean(true);
        };
        expect(t).not.toThrow(InvalidTypeError);
      });

      it('should throw InvalidTypeError for invalid instance', () => {
        const t = () => {
          assertIsBoolean('true');
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided value is not an instance of boolean.`);
      });

      it('should throw InvalidTypeError for undefined instance', () => {
        const t = () => {
          assertIsBoolean(UNDEFINED_VALUE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided value is not an instance of boolean.`);
      });

      it('should throw InvalidTypeError for null instance', () => {
        const t = () => {
          assertIsBoolean(NULL_VALUE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided value is not an instance of boolean.`);
      });

      it('should throw InvalidTypeError for null instance with override error message', () => {
        const t = () => {
          assertIsBoolean(NULL_VALUE, 'The provided value is null.');
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`The provided value is null.`);
      });
    });
  });

  describe('FhirTypeGuard/assertFhirType/assertFhirTypeList', () => {
    describe('FhirTypeGuard', () => {
      it('should return true for undefined type instance', () => {
        const primitiveType = undefined;
        expect(FhirTypeGuard(primitiveType, StringType)).toBe(true);
      });

      it('should return true for null type instance', () => {
        const primitiveType = null;
        expect(FhirTypeGuard(primitiveType, StringType)).toBe(true);
      });

      it('should return true for valid primitive type instance', () => {
        const primitiveType = new StringType();
        expect(FhirTypeGuard(primitiveType, StringType)).toBe(true);
      });

      it('should return true for valid EnumCodeType type instance', () => {
        const enumType = new EnumCodeType('generated', new MockCodeEnum());
        expect(FhirTypeGuard(enumType, EnumCodeType)).toBe(true);
      });

      it('should return true for valid complex type instance', () => {
        const complexType = new Period();
        expect(FhirTypeGuard(complexType, Period)).toBe(true);
      });

      it('should return true for valid resource instance', () => {
        const resourceType = new MockTask();
        expect(FhirTypeGuard(resourceType, MockTask)).toBe(true);
      });

      it('should return false for invalid instance', () => {
        const stringValue = 'test stringValue';
        expect(FhirTypeGuard(stringValue, Period)).toBe(false);
      });
    });

    describe('assertFhirType', () => {
      it('should not throw InvalidTypeError for undefined type instance', () => {
        const primitiveType = undefined;
        const t = () => {
          assertFhirType(primitiveType, StringType);
        };
        expect(t).not.toThrow(InvalidTypeError);
      });

      it('should not throw InvalidTypeError for null type instance', () => {
        const primitiveType = null;
        const t = () => {
          assertFhirType(primitiveType, StringType);
        };
        expect(t).not.toThrow(InvalidTypeError);
      });

      it('should not throw InvalidTypeError for valid type instance', () => {
        const primitiveType = new StringType();
        const t = () => {
          assertFhirType(primitiveType, StringType);
        };
        expect(t).not.toThrow(InvalidTypeError);
      });

      it('should throw InvalidTypeError for invalid type instance', () => {
        const stringValue = 'test stringValue';
        const t = () => {
          assertFhirType(stringValue, Period);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided instance is not an instance of Period.`);
      });

      it('should throw InvalidTypeError for invalid type instance with error message override', () => {
        const stringValue = 'test stringValue';
        const t = () => {
          assertFhirType(stringValue, Period, 'The stringValue instance is not an instance of Period.');
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`The stringValue instance is not an instance of Period.`);
      });
    });

    describe('assertFhirTypeList', () => {
      it('should not throw InvalidTypeError for undefined type instance array', () => {
        const type = undefined;
        const t = () => {
          assertFhirTypeList(type, StringType);
        };
        expect(t).not.toThrow(InvalidTypeError);
      });

      it('should not throw InvalidTypeError for null type instance array', () => {
        const type = null;
        const t = () => {
          assertFhirTypeList(type, StringType);
        };
        expect(t).not.toThrow(InvalidTypeError);
      });

      it('should not throw InvalidTypeError for valid primitive type instance array', () => {
        const primitiveType = new StringType();
        const t = () => {
          assertFhirTypeList([primitiveType], StringType);
        };
        expect(t).not.toThrow(InvalidTypeError);
      });

      it('should not throw InvalidTypeError for valid primitive type instance array', () => {
        const complexType = new Period();
        const t = () => {
          assertFhirTypeList([complexType], Period);
        };
        expect(t).not.toThrow(InvalidTypeError);
      });

      it('should throw InvalidTypeError for one invalid type instance array', () => {
        const stringValue = 'test stringValue';
        const complexType = new Period();
        const t = () => {
          assertFhirTypeList([stringValue, complexType], Period);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided instance array has an element that is not an instance of Period.`);
      });

      it('should throw InvalidTypeError for multiple invalid type instance array', () => {
        const stringValue = 'test stringValue';
        const stringType = new StringType();
        const complexType = new Period();
        const t = () => {
          assertFhirTypeList([stringValue, stringType, complexType], Period);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided instance array has 2 elements that are not an instance of Period.`);
      });

      it('should throw InvalidTypeError for invalid type instance array with error message override', () => {
        const stringValue = 'test stringValue';
        const t = () => {
          assertFhirTypeList([stringValue], Period, 'The stringValue instance is not an instance of Period.');
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`The stringValue instance is not an instance of Period.`);
      });
    });
  });

  describe('assertFhirResourceType', () => {
    it('should not throw InvalidTypeError for valid FhirResourceType', () => {
      const task = new MockTask();
      const t = () => {
        assertFhirResourceType(task);
      };
      expect(t).not.toThrow(InvalidTypeError);
    });

    it('should throw InvalidTypeError for non-FhirResourceType', () => {
      const fhirModel = new MockFhirModel();
      const t = () => {
        assertFhirResourceType(fhirModel);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided instance is not an instance of Resource.`);
    });

    it('should throw InvalidTypeError for non-FhirResourceType with error message override', () => {
      const testFhirModel = new MockFhirModel();
      const errMessage = `Provided testFhirModel is not an instance of Resource.`;
      const t = () => {
        assertFhirResourceType(testFhirModel, errMessage);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(errMessage);
    });

    it('should throw InvalidTypeError for invalid FhirResourceType', () => {
      const testFhirResource = new MockResource();
      const t = () => {
        assertFhirResourceType(testFhirResource);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided instance (Resource) is not a valid resource type.`);
    });

    it('should throw InvalidTypeError for invalid FhirResourceType with error message override', () => {
      const testFhirResource = new MockResource();
      const errMessage = `Provided testFhirResource is not a valid resource type.`;
      const t = () => {
        assertFhirResourceType(testFhirResource, errMessage);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(errMessage);
    });
  });

  describe('assertFhirResourceTypeJson', () => {
    it('should not throw InvalidTypeError for valid FhirResourceType', () => {
      const VALID_JSON = {
        resourceType: 'Task',
        id: '12345',
      };

      const t = () => {
        assertFhirResourceTypeJson(VALID_JSON, 'Task');
      };
      expect(t).not.toThrow(TypeError);
    });

    it('should throw InvalidTypeError for non-FhirResourceType', () => {
      const INVALID_JSON = {
        id: '12345',
      };

      const t = () => {
        assertFhirResourceTypeJson(INVALID_JSON, 'Task');
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`The provided JSON does not represent a FHIR Resource (missing 'resourceType' element).`);
    });

    it('should throw InvalidTypeError for invalid FhirResourceType', () => {
      const INVALID_JSON = {
        resourceType: 'Basic',
        id: '12345',
      };

      const t = () => {
        assertFhirResourceTypeJson(INVALID_JSON, 'Task');
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid JSON 'resourceType' ('Basic') value; Should be 'Task'.`);
    });
  });

  describe('assertFhirDataType', () => {
    it('should not throw InvalidTypeError for valid PrimitiveType', () => {
      const dataType = new StringType('Valid primitive data type');
      const t = () => {
        assertFhirDataType(dataType);
      };
      expect(t).not.toThrow(InvalidTypeError);
    });

    it('should not throw InvalidTypeError for valid DataType', () => {
      const dataType = new MockComplexDataType();
      const t = () => {
        assertFhirDataType(dataType);
      };
      expect(t).not.toThrow(InvalidTypeError);
    });

    it('should throw InvalidTypeError for non-DataType', () => {
      const dataType = new MockFhirModel();
      const t = () => {
        assertFhirDataType(dataType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided instance is not an instance of DataType.`);
    });

    it('should throw InvalidTypeError for non-DataType with error message override', () => {
      const dataType = new MockFhirModel();
      const errMessage = `Provided instance (MockFhirModel) is not an instance of DataType.`;
      const t = () => {
        assertFhirDataType(dataType, errMessage);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(errMessage);
    });
  });

  describe('assertFhirPrimitiveType', () => {
    it('should not throw InvalidTypeError for valid PrimitiveType', () => {
      const primitiveType = new StringType('Valid primitive data type');
      const t = () => {
        assertFhirPrimitiveType(primitiveType);
      };
      expect(t).not.toThrow(InvalidTypeError);
    });

    it('should throw InvalidTypeError for non-PrimitiveType', () => {
      const primitiveType = new Period();
      const t = () => {
        assertFhirPrimitiveType(primitiveType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided instance is not an instance of PrimitiveType.`);
    });

    it('should throw InvalidTypeError for non-PrimitiveType with error message override', () => {
      const primitiveType = new MockFhirModel();
      const errMessage = `Provided instance (MockFhirModel) is not an instance of PrimitiveType.`;
      const t = () => {
        assertFhirPrimitiveType(primitiveType, errMessage);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(errMessage);
    });
  });

  describe('assertFhirBackboneElement', () => {
    it('should not throw InvalidTypeError for valid BackboneElement', () => {
      const bElement = new MockBackboneElement();
      const t = () => {
        assertFhirBackboneElement(bElement);
      };
      expect(t).not.toThrow(InvalidTypeError);
    });

    it('should throw InvalidTypeError for non-BackboneElement', () => {
      const bElement = new MockFhirModel();
      const t = () => {
        assertFhirBackboneElement(bElement);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided instance is not an instance of BackboneElement.`);
    });

    it('should throw InvalidTypeError for non-DataType with error message override', () => {
      const bElement = new MockFhirModel();
      const errMessage = `Provided instance (MockFhirModel) is not an instance of BackboneElement.`;
      const t = () => {
        assertFhirBackboneElement(bElement, errMessage);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(errMessage);
    });
  });

  describe('assertFhirBackboneType', () => {
    it('should not throw InvalidTypeError for valid BackboneType', () => {
      const bType = new MockBackboneType();
      const t = () => {
        assertFhirBackboneType(bType);
      };
      expect(t).not.toThrow(InvalidTypeError);
    });

    it('should throw InvalidTypeError for non-BackboneType', () => {
      const bType = new MockFhirModel();
      const t = () => {
        assertFhirBackboneType(bType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided instance is not an instance of BackboneType.`);
    });

    it('should throw InvalidTypeError for non-DataType with error message override', () => {
      const bType = new MockFhirModel();
      const errMessage = `Provided instance (MockFhirModel) is not an instance of BackboneType.`;
      const t = () => {
        assertFhirBackboneType(bType, errMessage);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(errMessage);
    });
  });

  describe('assertEnumCodeType/assertEnumCodeTypeList', () => {
    describe('assertEnumCodeType', () => {
      it('should not throw InvalidCodeError for valid EnumCodeType', () => {
        const enumCodeType = new MockCodeEnum();
        const t = () => {
          assertEnumCodeType<MockCodeEnum>(enumCodeType, MockCodeEnum);
        };
        expect(t).not.toThrow(InvalidCodeError);
      });

      it('should not throw InvalidCodeError for empty EnumCodeType', () => {
        let t = () => {
          assertEnumCodeType<MockCodeEnum>(undefined, MockCodeEnum);
        };
        expect(t).not.toThrow();

        t = () => {
          assertEnumCodeType<MockCodeEnum>(null, MockCodeEnum);
        };
        expect(t).not.toThrow();
      });

      it('should throw InvalidCodeError for invalid EnumCodeType', () => {
        const enumCodeType = new EnumCodeType('<', new QuantityComparatorEnum());
        const t = () => {
          assertEnumCodeType<MockCodeEnum>(enumCodeType, MockCodeEnum);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Invalid type parameter (QuantityComparatorEnum); Should be MockCodeEnum.`);
      });

      it('should throw InvalidCodeError for invalid EnumCodeType with error message prefix', () => {
        const enumCodeType = new EnumCodeType('<', new QuantityComparatorEnum());
        const prefix = 'Test Prefix';
        const t = () => {
          assertEnumCodeType<MockCodeEnum>(enumCodeType, MockCodeEnum, prefix);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`${prefix}; Invalid type parameter (QuantityComparatorEnum); Should be MockCodeEnum.`);
      });

      it('should throw InvalidTypeError for invalid type', () => {
        const enumCodeType = String('Invalid type');
        const t = () => {
          assertEnumCodeType<MockCodeEnum>(enumCodeType, MockCodeEnum);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided type is not an instance of ${MockCodeEnum.name}.`);
      });

      it('should throw InvalidTypeError for invalid type with error message prefix', () => {
        const enumCodeType = String('Invalid type');
        const prefix = 'Test Prefix';
        const t = () => {
          assertEnumCodeType<MockCodeEnum>(enumCodeType, MockCodeEnum, prefix);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`${prefix}; Provided type is not an instance of ${MockCodeEnum.name}.`);
      });
    });

    describe('assertEnumCodeTypeList', () => {
      it('should not throw InvalidCodeError for valid EnumCodeType', () => {
        const enumCodeType = new MockCodeEnum();
        const t = () => {
          assertEnumCodeTypeList<MockCodeEnum>([enumCodeType], MockCodeEnum);
        };
        expect(t).not.toThrow(InvalidCodeError);
      });

      it('should not throw InvalidCodeError for empty typeInstance', () => {
        let t = () => {
          assertEnumCodeTypeList<MockCodeEnum>(undefined, MockCodeEnum);
        };
        expect(t).not.toThrow();

        t = () => {
          assertEnumCodeTypeList<MockCodeEnum>(null, MockCodeEnum);
        };
        expect(t).not.toThrow();

        t = () => {
          assertEnumCodeTypeList<MockCodeEnum>([], MockCodeEnum);
        };
        expect(t).not.toThrow();
      });

      it('should throw InvalidTypeError for invalid EnumCodeType', () => {
        const enumCodeType = new EnumCodeType('<', new QuantityComparatorEnum());
        const t = () => {
          assertEnumCodeTypeList<MockCodeEnum>([enumCodeType], MockCodeEnum);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided instance array has an element that is not an instance of ${MockCodeEnum.name}.`);
      });

      it('should throw InvalidTypeError for invalid EnumCodeType with error message prefix', () => {
        const enumCodeType = new EnumCodeType('<', new QuantityComparatorEnum());
        const prefix = 'Test Prefix';
        const t = () => {
          assertEnumCodeTypeList<MockCodeEnum>([enumCodeType], MockCodeEnum, prefix);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `${prefix}; Provided instance array has an element that is not an instance of ${MockCodeEnum.name}.`,
        );
      });

      it('should throw InvalidTypeError for invalid type', () => {
        const enumCodeType = String('Invalid type');
        const t = () => {
          assertEnumCodeTypeList<MockCodeEnum>([enumCodeType], MockCodeEnum);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Provided instance array has an element that is not an instance of ${MockCodeEnum.name}.`);
      });

      it('should throw InvalidTypeError for invalid type with error message prefix', () => {
        const enumCodeType = String('Invalid type');
        const prefix = 'Test Prefix';
        const t = () => {
          // @ts-expect-error: allow for testing
          assertEnumCodeTypeList<MockCodeEnum>(enumCodeType, MockCodeEnum, prefix);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `${prefix}; Provided instance array has 12 elements that are not an instance of ${MockCodeEnum.name}.`,
        );
      });
    });
  });
});
