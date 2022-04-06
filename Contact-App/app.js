const yargs = require('yargs');
const contacts = require('./contacts');

yargs
	.command({
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
			contacts.simpanContact(argv.nama, argv.email, argv.hp);
		},
	})
	.demandCommand();

// &---- Show daftar kontak ----
yargs.command({
	command: 'list',
	describe: 'melihat daftar kontak',
	handler() {
		contacts.listContact();
	},
});
// &---- Detail Kontak ----
yargs.command({
	command: 'detail',
	describe: 'melihat detail kontak',
	builder: {
		nama: {
			describe: 'Nama Lengkap',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		contacts.detailContact(argv.nama);
	},
});
// &---- Hapus data ----
yargs.command({
	command: 'hapus',
	describe: 'hapus kontak',
	builder: {
		nama: {
			describe: 'Nama Lengkap',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		contacts.hapusContact(argv.nama);
	},
});

yargs.parse();
