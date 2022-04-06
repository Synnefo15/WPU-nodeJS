const yargs = require('yargs');
const contacts = require('./contacts');

yargs.command({
	command: 'add',
	describe: 'Menambah kontak baru',
	builder: {
		nama: {
			describe: 'Nama Lengkap',
			demandOption: true,
			type: 'string',
		},
		email: {
			describe: 'email',
			demandOption: false,
			type: 'string',
		},
		hp: {
			describe: 'No Hp',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		contacts.simpanContact(argv.nama,argv.email,argv.hp)
	},
})

yargs.parse();
