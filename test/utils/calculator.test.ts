import { Calculator } from '../../src/utils/calculator';

describe('Calculator', () => {
  const calc = new Calculator();

  it('Should return correct sum', () => {
    expect(calc.add(15, 12)).toStrictEqual(27);
  });

  it('Should return correct difference', () => {
    expect(calc.subtract(15, 12)).toStrictEqual(3);
  });

  it('Should return correct product', () => {
    expect(calc.multiply(15, 12)).toStrictEqual(180);
  });

  it('Should return correct division', () => {
    expect(calc.divide(15, 12)).toStrictEqual(1.25);
  });
});
