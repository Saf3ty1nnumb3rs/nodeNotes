const yargs = require('yargs');
const { getNotes, addNote, readNote, removeNote } = require('./notes');

// Customize yargs version

yargs.version('1.1.0');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true, // false by default
      type: 'string'
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    addNote(argv.title, argv.body);
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title To Be Removed',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    removeNote(argv.title);
  }
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Title of note to display',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    readNote(argv.title);
  }
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'List  the notes',
  handler() {
    getNotes()
  }
});
// add, remove, read, list
yargs.parse();

///////////////////////////////

// const msg = getNotes();

// console.log(msg);
// const testValid = validator.isURL('https://mead.io').toString().toUpperCase();
// const valid = testValid === 'TRUE' ? chalk.green.bold(testValid) : chalk.red.bold(testValid);
// console.log(valid);

/////////////////////////////

// const add = require('./utils.js');

// const sum = add(4, -2);

// console.log(sum);
