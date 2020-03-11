/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

const error = chalk.red.bold;
const warning = chalk.keyword('orange');
const success = chalk.green;
const loadData = new Promise((res, rej) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) return rej(err);
    if (data === '') console.log(error('\nNo contacts exist!'));
    return res(JSON.parse(data));
  });
});

const searchContact = () => {
  loadData
    .then(res => {
      const loadedData = res;
      const searchQuestion = readlineSync.question(warning('\nEnter phone number or contact name to search: '));
      const expression = new RegExp(searchQuestion, 'i');
      const checkData = (data) => expression.test(data.name) === true
      || expression.test(data.phone) === true;
      return loadedData.filter(checkData);
    })
    .then(result => {
      if (result.length === 0) return console.log(error('Not found!'));
      for (const x of result) {
        console.log(success('\n', x.name, ' - ', x.phone));
      }
    })
    .catch(rej => console.log(error(rej)));
};

module.exports = searchContact;
