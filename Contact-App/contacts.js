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

// #====== Method =======

const simpanContact = (nama, email, hp) => {
	const contact = {
		// % klo key dan valuenya sama, gk perlu ditulis lagi
		nama,
		email,
		hp,
	};
	const file = fs.readFileSync('data/contact.json', 'utf-8');
	const contacts = JSON.parse(file);
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

// #====== Export =======
module.exports = {
	simpanContact: simpanContact,
};
