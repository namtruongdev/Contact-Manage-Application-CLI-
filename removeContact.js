/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

const err = chalk.red.bold;
const warning = chalk.keyword('orange');
const success = chalk.green;

const loadData = fs.readFileSync('./data.json', { encoding: 'utf8' });

function removeContact() {
  if (loadData === '') {
    console.log(err('\nNo contacts exist!'));
  } else {
    let parseData = JSON.parse(loadData);
    const removeQuestion = readlineSync.question(warning('\nEnter the order number or phone number to delete: '));
    if (removeQuestion in parseData === true) {
      const delYesOrNo = readlineSync.keyInYN(warning(`\nAre you sure delele contact of "${parseData[removeQuestion].name}": `));
      if (delYesOrNo === true) {
        parseData.splice(removeQuestion, 1);
        const stringData = JSON.stringify(parseData);
        const writeData = fs.writeFileSync('./data.json', stringData);
        console.log(success('\nDelelted successfully'));
      } else {
        console.log(success('\nYou have canceled!'));
        process.exit();
      }
    } else {
      for (const i of parseData) {
        if (i.phone === removeQuestion) {
          const delYesOrNo = readlineSync.keyInYN(warning(`\nAre you sure delele contact of "${i.name}": `));
          if (delYesOrNo === true) {
            parseData.splice(parseData.indexOf(i), 1);
            const stringData = JSON.stringify(parseData);
            const writeData = fs.writeFileSync('./data.json', stringData);
            console.log(success('\nDelelted successfully'));
          } else {
            console.log(success('\nYou have canceled!'));
            process.exit();
          }
        }
      }
    }
  }
}

module.exports = removeContact;
