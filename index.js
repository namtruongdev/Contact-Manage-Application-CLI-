const chalk = require('chalk');
const readlineSync = require('readline-sync');
const showContact = require('./showContact');
const addContact = require('./addContact');
const editContact = require('./editContact');
const removeContact = require('./removeContact');
const searchContact = require('./searchContact');

const warning = chalk.keyword('orange');
const success = chalk.green;

const startMenu = () => console.log(success('\n 1. Show all contacts list\n 2. Add a contact item\n 3. Edit contact\n 4. Delete contact\n 5. Find contact\n'));

const option = () => {
  const Option = readlineSync.question(warning('Type your answer> '));
  switch (Option) {
    case '1':
      showContact();
      break;
    case '2':
      addContact();
      break;
    case '3':
      editContact();
      break;
    case '4':
      removeContact();
      break;
    case '5':
      searchContact();
      break;
    default:
      console.log('Input value invalid. Try again!');
  }
};

const main = () => {
  startMenu();
  option();
};

main();
