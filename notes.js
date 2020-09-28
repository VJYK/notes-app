const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => {
	return 'Your notes';
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.filter((note) => {
		return note.title === title;
	});

	if (duplicateNote.length === 0) {
		notes.push({
			title: title,
			body: body
		});
		saveNotes(notes);
		console.log(chalk.green.inverse('New Note added'));
	} else {
		console.log(chalk.red.inverse('Notes title taken!'));
	}
};

const removeNote = (title) => {
	const notes = loadNotes();
	const toKeepNote = notes.filter((note) => {
		return note.title !== title;
	});
	if (notes.length > toKeepNote.length) {
		console.log(chalk.green.inverse('Note removed'));
		saveNotes(toKeepNote);
	} else {
		console.log(chalk.red.inverse('Note not removed!'));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.inverse('Your Notes'));
	notes.forEach((note) => {
		console.log(note.title);
	});
};

const readNote = (title) => {
	const notes = loadNotes();
	const note = notes.find((note) => note.title === title);
	if (note) {
		console.log(chalk.inverse(note.title));
		console.log(note.body);
	} else {
		console.log(chalk.red.inverse('Note not found'));
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};
module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
};
