const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  const notes = loadNotes();
  console.log('Your notes....');
  notes.forEach(note => {
    console.log(chalk.blue('Title: '), note.title);
    console.log(chalk.blue('Note: '), note.body);
    console.log('');
  })
}

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicate = notes.some(note => note.title === title);

  if (!duplicate) {
    notes.push({
      title,
      body
    })
    saveNotes(notes);
    console.log(chalk.green.bold.inverse(`Your note, ${notes[notes.length - 1].title}, was added`))
    console.log(notes);
  } else {
    console.log(chalk.red.bold(`Note Title: "${title}" Is Taken`));
  }
}
const readNote = (title) => {
  const notes = loadNotes();
  if (notes.length > 0) {
    const noteToDisplay = notes.filter(note => note.title === title)[0];
    if (noteToDisplay) {
      console.log(chalk.blue('Title: '), noteToDisplay.title);
      console.log(chalk.blue('Note: '), noteToDisplay.body);
    } else {
      console.log(chalk.red.inverse('There is no note with that title.'));
    }
  } else {
    console.log(chalk.red.bold.inverse('There are no notes to display'));
  }

}
const removeNote = (title) => {
  const notes = loadNotes();
  const updatedList = notes.filter(note => note.title !== title);
  if (updatedList.length < notes.length) {
    console.log(chalk.green.bold.inverse(`You've successfully removed ${title}`));
    saveNotes(updatedList);
    console.log(updatedList);
  } else {
    console.log(chalk.red.bold(`There is no note with the title ${title}`))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
  console.log(chalk.green.bold('Notes Saved'));
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}
module.exports = {
  getNotes,
  addNote,
  readNote,
  removeNote
};
