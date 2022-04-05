// *============ File System ============
const fs = require('fs');

// &---- Read Line ----
// #====== Synch =======
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
	// % membuat dir jika blm ada
	fs.mkdirSync(dirPath);
}
const dataPath = './data/contact.json';
if (!fs.existsSync(dataPath)) {
	fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const tulisPertanyaan = (pertanyaan) => {
	return new Promise((resolve, rejects) => {
		rl.question(pertanyaan, (isi) => {
			resolve(isi);
		});
	});
};

const simpanContact = (nama, umur, hp) => {
	const contact = {
		// % klo key dan valuenya sama, gk perlu ditulis lagi
		nama,
		umur,
		hp,
	};
	const file = fs.readFileSync('data/contact.json', 'utf-8');
	const contacts = JSON.parse(file);
	contacts.push(contact);
	fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
	console.log(`Makasih atas datanya`);
	rl.close();
};

module.exports = {
	tulisPertanyaan: tulisPertanyaan,
	simpanContact: simpanContact,
};
