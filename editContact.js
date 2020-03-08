/* eslint-disable no-console */
const readlineSync = require('readline-sync');
const fs = require('fs');
const chalk = require('chalk');

const err = chalk.red.bold;
const warning = chalk.keyword('orange');
const success = chalk.green;

function editContact() {
  const loadData = fs.readFileSync('./data.json', { encoding: 'utf8' });

  if (loadData === '') {
    console.log(err('\nNo contacts exist!'));
  } else {
    const parseData = JSON.parse(loadData);
    const editQuestion = readlineSync.question(warning('\nEnter the order number or phone number to change: '));

    if (editQuestion in parseData === true) {
      const editNameQuestion = readlineSync.question(warning(`\nEnter the name to be replaced instead of "${parseData[editQuestion].name}": `));
      const editPhoneQuestion = readlineSync.question(warning(`Enter the phone to be replaced instead of "${parseData[editQuestion].phone}": `));

      if (editNameQuestion !== '') {
        parseData[editQuestion].name = editNameQuestion;
      }
      if (editPhoneQuestion !== '') {
        parseData[editQuestion].phone = editPhoneQuestion;
      }

      const stringData = JSON.stringify(parseData);

      const boolYesOrEmpty = readlineSync.keyInYN(warning('\nAre your sure? '));
      if (boolYesOrEmpty === true) {
        const writeData = fs.writeFileSync('./data.json', stringData);
        console.log(success('\nEdited Successfully'));
      } else {
        console.log(success('\nYou have canceled'));
        process.exit();
      }
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const i of parseData) {
        if (editQuestion === i.phone) {
          const editNameQuestion = readlineSync.question(warning(`\nEnter the name to be replaced instead of "${i.name}": `));
          const editPhoneQuestion = readlineSync.question(warning(`Enter the phone to be replaced instead of "${i.phone}": `));

          if (editNameQuestion !== '') {
            i.name = editNameQuestion;
          }
          if (editPhoneQuestion !== '') {
            i.phone = editPhoneQuestion;
          }

          const stringData = JSON.stringify(parseData);
          const boolYesOrEmpty = readlineSync.keyInYN(warning('\nAre your sure? '));
          if (boolYesOrEmpty === true) {
            const writeData = fs.writeFileSync('./data.json', stringData);
            console.log(success('\nEdited Successfully'));
          } else {
            console.log(success('\nYou have canceled'));
            process.exit();
          }
        }
      }
    }
  }
}

module.exports = editContact;
