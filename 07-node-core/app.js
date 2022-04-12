// *============ File System ============
const fs = require('fs');

// &---- Write File ----
// #====== nulis scr synch =======
// try {
// 	fs.writeFileSync('test.txt', 'rafi cahya synch');
// } catch (error) {
// 	console.log(error);
// }

// #====== Asynch =======
// fs.writeFile('test.txt', 'rafi cahya Asynch',(err)=>console.log(err));

// &---- Membaca File ----
// #====== Synch =======
// const data =fs.readFileSync('test.txt','utf-8')
// console.log(data);

// #====== Asynch =======
// const data = fs.readFile('test.txt', 'utf-8', (err, data) => {
// 	if (err) throw err;
// 	console.log(data);
// });

// &---- Read Line ----
// #====== Synch =======
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question('Masukkan nama anda : ', (nama) => {
	rl.question('Masukkan umur anda : ', (umur) => {
		const contact = {
			nama,
			umur,
		};
		const file = fs.readFileSync('data/contact.json', 'utf-8');
		const contacts = JSON.parse(file);
		contacts.push(contact);
        fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
        console.log(`Makasih atas datanya`);
		rl.close();
	});
});
