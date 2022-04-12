const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// &---- req npm module ----
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// &---- Require lokal ----
require('./utils/db')
const Contact = require('./model/contact');

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

app.listen(port, () => {
	console.log(`Mongo Contact APP | Running Port At htpp://localhost:${port}`);
});

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

// #====== DEtail Contact =======
app.get('/contact/:nama', async (req, res) => {
	const contact = await Contact.findOne({nama:req.params.nama});
	res.render('detail', {
		layout: 'layouts/main-layout',
		title: 'Contact|Detail',
		contact: contact, // % kalo sama gpp dihapus salah satunya
	});
});