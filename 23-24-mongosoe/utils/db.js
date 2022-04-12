const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});



// // &---- Menambah data ----
// const contact1 = new Contact({
// 	nama: 'gogon',
// 	nohp: '0821823918',
// 	email: 'huji@gmail.com',
// });

// // &---- Simpan ke koleksi ----
// contact1.save().then((contact) => console.log(contact));
