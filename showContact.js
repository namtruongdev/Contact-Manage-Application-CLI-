const fs = require('fs');
const chalk = require('chalk');

const err = chalk.red.bold;
const success = chalk.green;

const showContact = () => {
  const loadData = fs.readFileSync('./data.json', { encoding: 'utf8' });
  if (loadData === '') {
    console.log(err('No contacts exist!'));
  } else {
    const parseData = JSON.parse(loadData);
    // eslint-disable-next-line no-restricted-syntax
    for (const i of parseData) {
      console.log(success('\n', parseData.indexOf(i), i.name, ' - ', i.phone));
    }
  }
};

module.exports = showContact;
