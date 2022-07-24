const { test, expect } = require('@playwright/test');

exports.CalculationPage = class CalculationPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
  }

  async selectBuild(version) {
    await this.page.selectOption('#selectBuild', { label: version });
  }

  async enterFirstNumber(firstNumber) {
    await this.page.locator('#number1Field').type(firstNumber);
  }

  async enterSecondNumber(secondNumber) {
    await this.page.locator('#number2Field').type(secondNumber);
  }

  async selectOperation(operation) {
    await this.page.selectOption('#selectOperationDropdown', {
      label: operation,
    });
  }

  async clickCalculateButton() {
    await this.page.locator('#calculateButton').click();
  }

  async clickIntegersCheckbox() {
    await this.page.locator('#integerSelect').click();
  }

  async enterAnswerField(answeFieldInput) {
    await this.page.locator('#numberAnswerField').type(answeFieldInput);
  }

  async clickClearButton() {
    await this.page.locator('#clearButton').click();
  }
};
