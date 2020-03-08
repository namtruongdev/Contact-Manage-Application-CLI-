// Declare variable
const chalk = require('chalk');
const fs = require('fs');
const readlineSync = require('readline-sync');

const warning = chalk.keyword('orange');
const success = chalk.green;

// Main function of Add Contact.
function addContact() {
  const loadData = fs.readFileSync('./data.json', { encoding: 'utf8' });
  if (loadData === '') {
    var parseData = [];
  } else {
    var parseData = JSON.parse(loadData);
  }
  const nameInput = readlineSync.question(warning('\nType contact name: '), { encoding: 'utf8' });
  const phoneInput = readlineSync.question(warning('Type contact phone number: '), { encoding: 'utf8' });
  parseData.push({ name: nameInput, phone: phoneInput });
  const stringData = JSON.stringify(parseData);
  const boolYesOrEmpty = readlineSync.keyInYN(warning('\nAre your sure? '));
  if (boolYesOrEmpty === true) {
    const writeData = fs.writeFileSync('./data.json', stringData);
    console.log(success('\nAdded successfully'));
  } else {
    console.log(success('\nYou have canceled'));
    process.exit();
  }
}

module.exports = addContact;
