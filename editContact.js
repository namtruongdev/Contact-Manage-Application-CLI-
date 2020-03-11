/* eslint-disable arrow-parens */
/* eslint-disable no-console */
const readlineSync = require('readline-sync');
const fs = require('fs');
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

const editContact = () => {
  const editQuestion = readlineSync.question(warning('\nEnter the order number or phone number to change: '));
  const checkData = (data) => data.phone === editQuestion;

  loadData
    .then(res => {
      const loadedData = res;
      if (editQuestion in loadedData === true) {
        const editNameQuestion = readlineSync.question(warning(`\nEnter the name to be replaced instead of "${loadedData[editQuestion].name}": `));
        const editPhoneQuestion = readlineSync.question(warning(`Enter the phone to be replaced instead of "${loadedData[editQuestion].phone}": `));

        if (editNameQuestion !== '') loadedData[editQuestion].name = editNameQuestion;
        if (editPhoneQuestion !== '') loadedData[editQuestion].phone = editPhoneQuestion;

        const stringData = JSON.stringify(loadedData);
        const boolYesOrEmpty = readlineSync.keyInYN(warning('\nAre your sure? '));

        if (boolYesOrEmpty === true) {
          fs.writeFile('./data.json', stringData, err => {
            if (err) return err;
            console.log(success('\nEdited Successfully'));
          });
        } else {
          console.log(success('\nYou have canceled'));
          process.exit();
        }
      } else if (loadedData.find(checkData) !== undefined) {
        const i = loadedData.find(checkData);
        const editNameQuestion = readlineSync.question(warning(`\nEnter the name to be replaced instead of "${i.name}": `));
        const editPhoneQuestion = readlineSync.question(warning(`Enter the phone to be replaced instead of "${i.phone}": `));

        if (editNameQuestion !== '') loadedData[loadedData.indexOf(i)].name = editNameQuestion;
        if (editPhoneQuestion !== '') loadedData[loadedData.indexOf(i)].phone = editPhoneQuestion;

        const stringData = JSON.stringify(loadedData);
        const boolYesOrEmpty = readlineSync.keyInYN(warning('\nAre your sure? '));

        if (boolYesOrEmpty === true) {
          fs.writeFile('./data.json', stringData, err => {
            if (err) return err;
            console.log(success('\nEdited Successfully'));
          });
        } else {
          console.log(success('\nYou have canceled'));
          process.exit();
        }
      } else console.log(error('The phone number you have entered does not match anyone! Try again.'));
    })
    .catch(rej => console.log(error(rej)));
};

module.exports = editContact;
