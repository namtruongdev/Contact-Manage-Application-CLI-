/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const Table = require('cli-table');
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
    const table = new Table({
      head: ['STT', 'Ho va ten', 'So dien thoai'],
    });
    for (const i of parseData) {
      table.push([parseData.indexOf(i), i.name, i.phone]);
    }
    console.log('\n');
    console.log(table.toString());
  }
};

module.exports = showContact;
