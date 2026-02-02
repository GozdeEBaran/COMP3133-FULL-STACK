const calculator = require("../app/calculator");
const chai = require("chai");
const expect = chai.expect;

describe("Calculator Tests", () => {
  // ADD function tests
  describe("add()", () => {
    it("add(5, 2) expected result 7 PASS", () => {
      const result = calculator.add(5, 2);
      expect(result).to.equal(7);
    });

    it("add(5,2) expected result 8 FAIL", () => {
      const result = calculator.add(5, 2);
      expect(result).to.equal(8);
    });
  });

  // SUB function tests
  describe("sub()", () => {
    it("sub(5, 2) expected result 3 PASS", () => {
      const result = calculator.sub(5, 2);
      expect(result).to.equal(3);
    });

    it("sub(5,2) expected result 5 FAIL", () => {
      const result = calculator.sub(5, 2);
      expect(result).to.equal(5);
    });
  });

  // MUL function tests
  describe("mul()", () => {
    it("mul(5, 2) expected result 10 PASS", () => {
      const result = calculator.mul(5, 2);
      expect(result).to.equal(10);
    });

    it("mul(5,2) expected result 12 FAIL", () => {
      const result = calculator.mul(5, 2);
      expect(result).to.equal(12);
    });
  });

  // DIV function tests
  describe("div()", () => {
    it("div(10, 2) expected result 5 PASS", () => {
      const result = calculator.div(10, 2);
      expect(result).to.equal(5);
    });

    it("div(10,2) expected result 2 FAIL", () => {
      const result = calculator.div(10, 2);
      expect(result).to.equal(2);
    });
  });
});
