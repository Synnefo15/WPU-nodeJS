// #====== Require =======
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// &---- req npm module 3rd party----
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

// &---- Require lokal ----
require('./utils/db');
const Contact = require('./model/contact');
const { findOne } = require('./model/contact');

const app = express();
const port = 3000;

// &---- EJS ----
app.set('view engine', 'ejs');
// &---- 3rd Party Mdwr ----
app.use(expressLayouts);
// &---- Buildin middleware ----
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// #====== Setup module =======
// &---- Set up Flash ----
app.use(cookieParser('secret'));
app.use(
	session({
		cookie: { maxAge: 6000 },
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(flash());
// &---- Set up method override----
app.use(methodOverride('_method'));

app.listen(port, () => {
	console.log(`Mongo Contact APP | Running Port At htpp://localhost:${port}`);
});

// *============ Routing ============
// #====== Home Page =======
app.get('/', (req, res) => {
	const mahasiswa = [
		{
			nama: 'rafi',
			email: 'rafi@gmail.com',
		},
		{
			nama: 'gilang',
			email: 'gilang@gmail.com',
		},
		{
			nama: 'mamad',
			email: 'mamad@gmail.com',
		},
	];
	res.render('index', {
		nama: 'rafi putra',
		mahasiswa: mahasiswa,
		title: 'Home |Page',
		layout: 'layouts/main-layout',
	});
});

// #====== About Page =======
app.get('/about', (req, res) => {
	res.render('about', {
		layout: 'layouts/main-layout',
		title: 'About|Page',
	});
});

// #====== Contact Page =======
app.get('/contact', async (req, res) => {
	const contacts = await Contact.find();

	res.render('contact', {
		layout: 'layouts/main-layout',
		title: 'Contact|Page',
		contacts: contacts, // % kalo sama gpp dihapus salah satunya
		msg: req.flash('msg'),
	});
});

// #====== Tambah Data =======
app.get('/contact/add', (req, res) => {
	res.render('add-contact', {
		title: 'Form add data',
		layout: 'layouts/main-layout',
	});
});

// #====== Proses tambah data =======
app.post(
	'/contact',
	[
		body('nama').custom(async (value) => {
			const duplikat = await Contact.findOne({ nama: value });
			if (duplikat) {
				throw new Error('nama kontak sudah ada!!!');
			}
			return true;
		}),
		check('email', 'Email Tidak Valid').isEmail(),
		check('nohp', 'No Hp tidak valid').isMobilePhone('id-ID'),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.render('add-contact', {
				title: 'Form tambah data',
				layout: 'layouts/main-layout',
				errors: errors.array(),
			});
		} else {
			Contact.insertMany(req.body, (error, result) => {
				// % Flash mess
				req.flash('msg', 'Berhasil Ditambah');
				res.redirect('/contact');
			});
		}
	}
);

// #====== Delete =======
// app.get('/contact/delete/:nama', async (req, res) => {
// 	const contact = await Contact.findOne({ nama: req.params.nama });

// 	// % Jika contact kosong
// 	if (!contact) {
// 		res.status(404);
// 		res.send(/*html*/ ` <h1>Error 404</h1> `);
// 	} else {
// 		Contact.deleteOne({ _id: contact._id }).then((result) => {
// 			req.flash('msg', 'Berhasil Dihapus');
// 			res.redirect('/contact');
// 		});
// 	}
// });

app.delete('/contact', (req, res) => {
	Contact.deleteOne({ nama: req.body.nama }).then((result) => {
		req.flash('msg', 'Berhasil Dihapus');
		res.redirect('/contact');
	});
});

// #====== Ubah Data =======
app.get('/contact/edit/:nama', async (req, res) => {
	const contact = await Contact.findOne({ nama: req.params.nama });
	res.render('edit-contact', {
		title: 'Form Ubah data',
		layout: 'layouts/main-layout',
		contact: contact,
	});
});
// &---- Proses Ubah Data ----
app.put(
	'/contact',
	[
		body('nama').custom(async (value, { req }) => {
			const duplikat = await Contact.findOne({ nama: value });
			if (value !== req.body.oldNama && duplikat) {
				throw new Error('nama kontak sudah ada!!!');
			}
			return true;
		}),
		check('email', 'Email Tidak Valid').isEmail(),
		check('nohp', 'No Hp tidak valid').isMobilePhone('id-ID'),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.render('edit-contact', {
				title: 'Form ubah data',
				layout: 'layouts/main-layout',
				errors: errors.array(),
				contact: req.body,
			});
		} else {
			Contact.updateOne(
				{ _id: req.body._id },
				{
					$set: {
						nama: req.body.nama,
						email: req.body.email,
						nohp: req.body.nohp,
					},
				}
			).then((result) => {
				// % Flash mess
				req.flash('msg', 'Berhasil Diubah');
				res.redirect('/contact');
			});
		}
	}
);

// #====== DEtail Contact =======
app.get('/contact/:nama', async (req, res) => {
	const contact = await Contact.findOne({ nama: req.params.nama });
	res.render('detail', {
		layout: 'layouts/main-layout',
		title: 'Contact|Detail',
		contact: contact, // % kalo sama gpp dihapus salah satunya
	});
});
