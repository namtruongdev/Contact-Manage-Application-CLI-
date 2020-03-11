/* eslint-disable no-console */
// Declare variable
const chalk = require('chalk');
const fs = require('fs');
const readlineSync = require('readline-sync');

const warning = chalk.keyword('orange');
const success = chalk.green;
const err = chalk.red.bold;

const loadData = new Promise((res, rej) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) return rej(err);
    if (data === '') return res(JSON.parse('[]'));
    return res(JSON.parse(data));
  });
});

// Main function of Add Contact.
const addContact = () => {

  const nameInput = readlineSync.question(warning('\nType contact name: '), 'utf8');
  const phoneInput = readlineSync.question(warning('Type contact phone number: '), 'utf8');
  const boolYesOrEmpty = readlineSync.keyInYN(warning('\nAre your sure? '));

  if (boolYesOrEmpty === true) {
    loadData
      .then(res => {
        const loadedData = res;
        loadedData.push({ name: nameInput, phone: phoneInput });
        const stringData = JSON.stringify(loadedData);
        fs.writeFile('./data.json', stringData, err => {
          if (err) return err;
          console.log(success('\nAdded successfully'));
        });
      })
      .catch(rej => console.log(err(rej)));
  } else {
    console.log(success('\nYou have canceled'));
    process.exit();
  }
};

module.exports = addContact;
