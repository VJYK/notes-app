const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//console.log(process.argv);
//console.log(yargs.argv);

// Create a add command
yargs.command({
	command: 'add',
	describe: 'Add a new note !',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note Body',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.addNote(argv.title, argv.body);
	}
});

//Create a remove command
yargs.command({
	command: 'remove',
	describe: 'Remove a note !',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.removeNote(argv.title);
	}
});

//create a list command
yargs.command({
	command: 'list',
	describe: 'List a note!',
	handler() {
		notes.listNotes();
	}
});

//Create a read command
yargs.command({
	command: 'read',
	describe: 'Read a note!',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		
	},
	handler(argv) {
		notes.readNote(argv.title);
	}
});

yargs.parse();
