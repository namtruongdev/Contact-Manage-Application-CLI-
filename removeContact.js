/* eslint-disable arrow-parens */
/* eslint-disable no-console */
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

const removeContact = () => {
  const removeQuestion = readlineSync.question(warning('\nEnter the order number or phone number to delete: '));
  const checkData = (data) => data.phone === removeQuestion;

  loadData
    .then(res => {
      const loadedData = res;

      if (removeQuestion in loadedData === true) {
        const delYesOrNo = readlineSync.keyInYN(warning(`\nAre you sure delele contact of "${loadedData[removeQuestion].name}": `));

        if (delYesOrNo === true) {
          loadedData.splice(removeQuestion, 1);
          const stringData = JSON.stringify(loadedData);
          fs.writeFile('./data.json', stringData, err => {
            if (err) return err;
            console.log(success('\nDelelted successfully'));
          });
        } else {
          console.log(success('\nYou have canceled!'));
          process.exit();
        }
      } else if (loadedData.find(checkData) !== undefined) {
        const i = loadedData.find(checkData);
        const delYesOrNo = readlineSync.keyInYN(warning(`\nAre you sure delele contact of "${i.name}": `));
        if (delYesOrNo === true) {
          loadedData.splice(loadedData.indexOf(i), 1);
          const stringData = JSON.stringify(loadedData);
          fs.writeFile('./data.json', stringData, err => {
            if (err) return err;
            console.log(success('\nDelelted successfully'));
          });
        } else {
          console.log(success('\nYou have canceled!'));
          process.exit();
        }
      } else console.log(error('The phone number you have entered does not match anyone! Try again.'));
    })
    .catch(rej => console.log(error(rej)));
};

module.exports = removeContact;
