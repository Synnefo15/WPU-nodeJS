const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const {
	loadContact,
	findContact,
	addContact,
	cekDuplikat,
	deleteContact,
	updateContacts,
} = require('./util/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// &---- EJS ----
app.set('view engine', 'ejs');

// &---- 3rd Party Mdwr ----
app.use(expressLayouts);

// &---- Buildin middleware ----
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// &---- Konfigurasi Flash ----
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

app.get('/about', (req, res) => {
	res.render('about', {
		layout: 'layouts/main-layout',
		title: 'About|Page',
	});
});
app.get('/contact', (req, res) => {
	const contacts = loadContact();
	res.render('contact', {
		layout: 'layouts/main-layout',
		title: 'Contact|Page',
		contacts: contacts, // % kalo sama gpp dihapus salah satunya
		msg: req.flash('msg'),
	});
});

// &---- Form tambah data ----
app.get('/contact/add', (req, res) => {
	res.render('add-contact', {
		title: 'Form add data',
		layout: 'layouts/main-layout',
	});
});

// &---- Proses data contact ----
app.post(
	'/contact',
	[
		body('nama').custom((value) => {
			const duplikat = cekDuplikat(value);
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
			// return res.status(400).json({ errors: errors.array() });
			res.render('add-contact', {
				title: 'Form tambah data',
				layout: 'layouts/main-layout',
				errors: errors.array(),
			});
		} else {
			addContact(req.body);
			// % Flash mess
			req.flash('msg', 'Berhasil Ditambah');
			res.redirect('/contact');
		}
	}
);

// &---- Delete Contact ----
app.get('/contact/delete/:nama', (req, res) => {
	const contact = findContact(req.params.nama);

	// % Jika contact kosong
	if (!contact) {
		res.status(404);
		res.send(/*html*/ ` <h1>Error 404</h1> `);
	} else {
		deleteContact(req.params.nama);
		req.flash('msg', 'Berhasil Dihapus');
		res.redirect('/contact');
	}
});

// &---- Ubah data ----
app.get('/contact/edit/:nama', (req, res) => {
	const contact = findContact(req.params.nama)
	res.render('edit-contact', {
		title: 'Form Ubah data',
		layout: 'layouts/main-layout',
		contact:contact,
	});
});

// &---- Proses ubah data ----
app.post(
	'/contact/update',
	[
		body('nama').custom((value,{req}) => {
			const duplikat = cekDuplikat(value);
			if (value!==req.body.oldNama && duplikat) {
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
			// return res.status(400).json({ errors: errors.array() });
			res.render('edit-contact', {
				title: 'Form ubah data',
				layout: 'layouts/main-layout',
				errors: errors.array(),
				contact : req.body,
			});
		} else {
			updateContacts(req.body);
			// % Flash mess
			req.flash('msg', 'Berhasil Diubah');
			res.redirect('/contact');
		}
	}
);


// &---- Detail Contact ----
app.get('/contact/:nama', (req, res) => {
	const contact = findContact(req.params.nama);
	res.render('detail', {
		layout: 'layouts/main-layout',
		title: 'Contact|Detail',
		contact: contact, // % kalo sama gpp dihapus salah satunya
	});
});

app.use((req, res) => {
	res.status(404);
	res.send(/*html*/ ` <h1>404</h1> `);
});

app.listen(port, () => {
	console.log(`Test att port ${port}`);
});
