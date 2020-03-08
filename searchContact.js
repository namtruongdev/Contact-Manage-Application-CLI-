/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

const err = chalk.red.bold;
const warning = chalk.keyword('orange');
const success = chalk.green;

function searchContact() {
  const loadData = fs.readFileSync('./data.json', { encoding: 'utf8' });
  if (loadData === '') {
    console.log(err('\nNo contacts exist!'));
  } else {
    let parseData = JSON.parse(loadData);
    const searchQuestion = readlineSync.question(warning('\nEnter phone number or contact name to search: '));
    for (const x of parseData) {
      const strName = x.name;
      const strPhone = x.phone;
      const expression = new RegExp(searchQuestion, 'i');

      if (expression.test(strName) === true || expression.test(strPhone) === true) {
        console.log(success('\n', x.name, ' - ', x.phone));
      }
    }
  }
}

module.exports = searchContact;
