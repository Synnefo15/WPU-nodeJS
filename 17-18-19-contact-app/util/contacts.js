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
	const contacts = JSON.parse(file); // % pase ubah str jadi objek
	return contacts;
};
// &---- Ambil Contact Terpilih ----
const findContact = (nama) => {
	const contacts = loadContact();
	const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
	return contact;
};
// &---- Write Data ----
// % ini akan menimpa data json
const saveContacts = (contacts) => {
	fs.writeFileSync('data/contact.json', JSON.stringify(contacts)); // % Ubah Objek jadi str
};

// &---- Add Data ----
const addContact = (contact) => {
	const contacts = loadContact();
	contacts.push(contact);
	saveContacts(contacts);
};
// &---- Cek duplikat ----
const cekDuplikat = (nama) => {
	const contacts = loadContact();
	return contacts.find((contact) => contact.nama === nama);
};
// &---- Hapus contantac ----
const deleteContact = (nama) => {
	const contacts = loadContact();
	const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
	saveContacts(filteredContacts);
};

// &---- Update ----
const updateContacts = (contactBaru) => {
	const contacts = loadContact();
	// % Hilangkan kontak lama yg namanya sama kaya oldnama
	const filteredContact = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
	delete contactBaru.oldNama
	filteredContact.push(contactBaru)
	saveContacts(filteredContact)
};

module.exports = {
	loadContact,
	findContact,
	addContact,
	cekDuplikat,
	deleteContact,
	updateContacts,
};
