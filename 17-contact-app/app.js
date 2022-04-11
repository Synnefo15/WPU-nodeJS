const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const {loadContact, findContact} = require('./util/contacts');

const app = express();
const port = 3000;

// &---- EJS ----
app.set('view engine', 'ejs');

// &---- 3rd Party Mdwr ----
app.use(expressLayouts);

// &---- Buildin middleware ----
app.use(express.static('public'));

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
	const contacts = loadContact()
	res.render('contact', {
		layout: 'layouts/main-layout',
		title: 'Contact|Page',
		contacts : contacts, // % kalo sama gpp dihapus salah satunya 
	});
});
app.get('/contact/:nama', (req, res) => {
	const contact = findContact(req.params.nama)
	res.render('detail', {
		layout: 'layouts/main-layout',
		title: 'Contact|Detail',
		contact : contact, // % kalo sama gpp dihapus salah satunya 
	});
});

app.use((req, res) => {
	res.status(404);
	res.send(/*html*/ ` <h1>404</h1> `);
});

app.listen(port, () => {
	console.log(`Test att port ${port}`);
});
