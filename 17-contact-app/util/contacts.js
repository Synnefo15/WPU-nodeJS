const fs = require('fs');

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
// &---- Ambil Semua contact ----
const loadContact = () => {
	const file = fs.readFileSync('data/contact.json', 'utf-8');
	const contacts = JSON.parse(file);
	return contacts;
};
// &---- Ambil Contact Terpilih ----
const findContact = (nama) => {
	const contacts = loadContact();
	const contact = contacts.find(contact => 
		contact.nama.toLowerCase() === nama.toLowerCase()
	);
	return contact;
};

module.exports = { loadContact, findContact };
