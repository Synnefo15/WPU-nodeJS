// *============ File System ============
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// #====== Membuat Folder, jika blm ada =======
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
	// % membuat dir jika blm ada
	fs.mkdirSync(dirPath);
}
const dataPath = './data/contact.json';
if (!fs.existsSync(dataPath)) {
	fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
	const file = fs.readFileSync('data/contact.json', 'utf-8');
	const contacts = JSON.parse(file);
	return contacts;
};

// #====== Method =======

const simpanContact = (nama, email, hp) => {
	const contact = {
		// % klo key dan valuenya sama, gk perlu ditulis lagi
		nama,
		email,
		hp,
	};
	const contacts = loadContact();

	// &---- Cek Duplikat ----
	const duplikat = contacts.find((contact) => contact.nama === nama);
	if (duplikat) {
		console.log(chalk`{red.inverse.bold Contact sudah ada, ganti input...} `);
		return false;
	}

	// &---- Cek Email ----
	if (email) {
		if (!validator.isEmail(email)) {
			console.log(chalk`{red.inverse.bold Email tdk valid...} `);
			return false;
		}
	}
	// &---- cek hp ----
	if (!validator.isMobilePhone(hp, 'id-ID')) {
		console.log(chalk`{red.inverse.bold no HP tdk valid...} `);
		return false;
	}
	contacts.push(contact);
	fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
	console.log(chalk`{green.inverse.bold Makasih atas datanya}`);
};
// &---- Show daftar kontak ----
const listContact = () => {
	const contacts = loadContact();
	console.log(chalk`{cyan.inverse.bold Daftar Kontak}`);

	contacts.forEach((element, i) => {
		console.log(`${i + 1}. ${element.nama} -${element.hp}`);
	});
};
// &---- Detail Kontak ----
const detailContact = (nama) => {
	const contacts = loadContact();

	const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

	if (!contact) {
		console.log(chalk`{red.inverse.bold ${nama} tidak tersedia} `);
		return false;
	} else {
		console.log(chalk`{blue.inverse.bold 
		${contact.nama}} 
		${contact.hp}`);
		if (contact.email) {
			console.log(`${contact.email}`);
		}
	}
};
// &---- Hapus ----
const hapusContact = (nama) => {
	const contacts = loadContact();
	const newContacts = contacts.filter(
		(contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
	);
	if (contacts.length === newContacts.length) {
		console.log(chalk`{red.inverse.bold ${nama} tidak tersedia} `);
		return false;
	}
	fs.writeFileSync('data/contact.json', JSON.stringify(newContacts));
	console.log(chalk`{green.inverse.bold ${nama} berhasil dihapus}`);
};

// #====== Export =======
module.exports = {
	simpanContact: simpanContact,
	listContact: listContact,
	detailContact: detailContact,
	hapusContact: hapusContact,
};
