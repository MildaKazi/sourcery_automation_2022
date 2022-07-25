// @ts-check
const { test, expect } = require('@playwright/test');
const { CalculationPage } = require('../pages/CalculationPage');

const data = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const operations = {
  add: 'Add',
  subtract: 'Subtract',
  multiply: 'Multiply',
  divide: 'Divide',
  concatenate: 'Concatenate',
};

data.forEach((version) => {
  test.describe('Build version: ' + version + ' Operations', () => {
    [
      {
        operation: operations.add,
        name: 'Adding',
        answer: '6',
      },
      {
        operation: operations.multiply,
        name: 'Multiplying',
        answer: '9',
      },
      {
        operation: operations.divide,
        name: 'Dividing',
        answer: '1',
      },
      {
        operation: operations.subtract,
        name: 'Subtracting',
        answer: '0',
      },
    ].forEach((action) => {
      test(`${action.name} 3 and 3 should be ${action.answer}`, async ({ page }) => {
        let calculationPage = new CalculationPage(page);
        await calculationPage.navigateToCalculatorPage();
        await calculationPage.selectBuild(version);
        await calculationPage.enterFirstNumber('3');
        await calculationPage.enterSecondNumber('3');
        await calculationPage.selectOperation(action.operation);
        await calculationPage.clickCalculateButton();

        await expect(page.locator('#numberAnswerField'), `${action.name} operation answer is not ${action.answer}`).toHaveValue(action.answer);
      });
    });

    [
      {
        operation: operations.add,
        name: 'Adding',
        answer: '-21',
      },
      {
        operation: operations.multiply,
        name: 'Multiplying',
        answer: '104',
      },
      {
        operation: operations.divide,
        name: 'Dividing',
        answer: '0.6153846153846154',
      },
      {
        operation: operations.subtract,
        name: 'Subtracting',
        answer: '5',
      },
    ].forEach((action) => {
      test(`${action.name} -8 and -13 should be ${action.answer}`, async ({ page }) => {
        let calculationPage = new CalculationPage(page);
        await calculationPage.navigateToCalculatorPage();
        await calculationPage.selectBuild(version);
        await calculationPage.enterFirstNumber('-8');
        await calculationPage.enterSecondNumber('-13');
        await calculationPage.selectOperation(action.operation);
        await calculationPage.clickCalculateButton();

        await expect(page.locator('#numberAnswerField'), `${action.name} operation answer is not ${action.answer}`).toHaveValue(action.answer);
      });
    });

    [
      {
        operation: operations.add,
        name: 'Adding',
        answer: '13.3',
      },
      {
        operation: operations.multiply,
        name: 'Multiplying',
        answer: '27',
      },
      {
        operation: operations.divide,
        name: 'Dividing',
        answer: '0.23148148148148145',
      },
      {
        operation: operations.subtract,
        name: 'Subtracting',
        answer: '-8.3',
      },
    ].forEach((action) => {
      test(`${action.name} 2.5 and 10.8 should be ${action.answer}`, async ({ page }) => {
        let calculationPage = new CalculationPage(page);
        await calculationPage.navigateToCalculatorPage();
        await calculationPage.selectBuild(version);
        await calculationPage.enterFirstNumber('2.5');
        await calculationPage.enterSecondNumber('10.8');
        await calculationPage.selectOperation(action.operation);
        await calculationPage.clickCalculateButton();

        await expect(page.locator('#numberAnswerField'), `${action.name} operation answer is not ${action.answer}`).toHaveValue(action.answer);
      });
    });

    test(`Multiplying 2.5 and 10.3 should get answer 25.75 after selecting Integers only checkbox - 25 `, async ({ page }) => {
      let calculationPage = new CalculationPage(page);
      await calculationPage.navigateToCalculatorPage();
      await calculationPage.selectBuild(version);
      await calculationPage.enterFirstNumber('2.5');
      await calculationPage.enterSecondNumber('10.3');
      await calculationPage.selectOperation(operations.multiply);
      await calculationPage.clickCalculateButton();

      await expect(page.locator('#numberAnswerField'), 'Multiplying answer with integers only is not 25.75').toHaveValue('25.75');

      await calculationPage.clickIntegersCheckbox();

      await expect(page.locator('#numberAnswerField'), 'Multiplying answer with integers only is not 25').toHaveValue('25');
    });

    test(`Integers checkbox disappears with Concatenante operations`, async ({ page }) => {
      let calculationPage = new CalculationPage(page);
      await calculationPage.navigateToCalculatorPage();
      await calculationPage.selectBuild(version);
      await calculationPage.enterFirstNumber('2.5');
      await calculationPage.enterSecondNumber('10.3');
      await calculationPage.selectOperation(operations.concatenate);

      await expect(page.locator('#integerSelect'), 'Integer checkbox was visible').not.toBeVisible();
      await expect(page.locator('#intSelectionLabel'), 'Integer label was visible').not.toBeVisible();
    });

    test(`User should be able to operate strings with Concatenate operation`, async ({ page }) => {
      let calculationPage = new CalculationPage(page);
      await calculationPage.navigateToCalculatorPage();
      await calculationPage.selectBuild(version);
      await calculationPage.enterFirstNumber('java');
      await calculationPage.enterSecondNumber('script');
      await calculationPage.selectOperation(operations.concatenate);
      await calculationPage.clickCalculateButton();

      await expect(page.locator('#numberAnswerField'), 'Concatenate operation failed').toHaveValue('javascript');
    });
  });
});

data.forEach((version) => {
  test.describe('Build version: ' + version + ' Validations', () => {
    test(`Maximum amount of digits to be put in First/Second number fields - 10`, async ({ page }) => {
      let calculationPage = new CalculationPage(page);
      await calculationPage.navigateToCalculatorPage();
      await calculationPage.selectBuild(version);
      await calculationPage.enterFirstNumber('012345678987456');
      await calculationPage.enterSecondNumber('012345678987456');

      await expect(page.locator('#number1Field'), 'User was able to enter more than 10 characters in First field').toHaveValue('0123456789');
      await expect(page.locator('#number2Field'), 'User was able to enter more than 10 characters in Second field').toHaveValue('0123456789');
    });

    [
      {
        operation: operations.add,
        name: 'adds',
      },
      {
        operation: operations.multiply,
        name: 'multiplies',
      },
      {
        operation: operations.divide,
        name: 'divides',
      },
      {
        operation: operations.subtract,
        name: 'subtracts',
      },
    ].forEach((action) => {
      test(`Validation message should be shown if user ${action.name} letters in first field.`, async ({ page }) => {
        let calculationPage = new CalculationPage(page);
        await calculationPage.navigateToCalculatorPage();
        await calculationPage.selectBuild(version);
        await calculationPage.enterFirstNumber('some letters');
        await calculationPage.selectOperation(action.operation);
        await calculationPage.clickCalculateButton();

        await expect(page.locator('#errorMsgField'), `Validation message for the first field was not shown while user operates ${action.operation} action`).toHaveText('Number 1 is not a number');
      });
    });

    [
      {
        operation: operations.add,
        name: 'adds',
      },
      {
        operation: operations.multiply,
        name: 'multiplies',
      },
      {
        operation: operations.divide,
        name: 'divides',
      },
      {
        operation: operations.subtract,
        name: 'subtracts',
      },
    ].forEach((action) => {
      test(`Validation message should be shown if user ${action.name} letters in second field.`, async ({ page }) => {
        let calculationPage = new CalculationPage(page);
        await calculationPage.navigateToCalculatorPage();
        await calculationPage.selectBuild(version);
        await calculationPage.enterSecondNumber('some letters');
        await calculationPage.selectOperation(action.operation);
        await calculationPage.clickCalculateButton();

        await expect(page.locator('#errorMsgField'), `Validation message for the first field was not shown while user operates ${action.operation} action`).toHaveText('Number 2 is not a number');
      });
    });

    test(`Answer field should be read only`, async ({ page }) => {
      let calculationPage = new CalculationPage(page);
      await calculationPage.navigateToCalculatorPage();
      await calculationPage.selectBuild(version);
      await calculationPage.enterAnswerField('1234');

      await expect(page.locator('#numberAnswerField'), 'Field was not empty').toBeEmpty();
      /* no idea why it's not working :( https://playwright.dev/docs/test-assertions#locator-assertions-to-have-attribute
        await expect(page.locator('#numberAnswerField')).toHaveAttribute('readonly', 'true');
        */
    });

    test(`Clear button should work on Answer field and Integers only field.`, async ({ page }) => {
      let calculationPage = new CalculationPage(page);
      await calculationPage.navigateToCalculatorPage();
      await calculationPage.selectBuild(version);
      await calculationPage.enterFirstNumber('5');
      await calculationPage.enterSecondNumber('5');
      await calculationPage.selectOperation(operations.add);
      await calculationPage.clickCalculateButton();
      await calculationPage.clickIntegersCheckbox();
      await calculationPage.clickClearButton();

      await expect(page.locator('#numberAnswerField'), 'Field was not empty').toBeEmpty();
      await expect(page.locator('#integerSelect'), 'Checkbox was selected').not.toBeChecked();
    });
  });
});
