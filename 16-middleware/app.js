const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// &---- EJS ----
app.set('view engine', 'ejs');

// &---- 3rd Party Mdwr ----
app.use(expressLayouts);
app.use(morgan('dev'))

// &---- Buildin middleware ----
app.use(express.static('public'))

// &---- App level Middleware ----
app.use((req,res,next) => {
	console.log(`Time : ${Date.now()}`);
	next()
})

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
	res.render('contact', { 
		layout: 'layouts/main-layout', 
		title: 'Contact|Page' });
});
app.get('/product/:id', (req, res) => {
	res.send(`Produk ID: ${req.params.id} <br> Category ID : ${req.query.category}`);
});
app.use((req, res) => {
	res.status(404);
	res.send(/*html*/ ` <h1>404</h1> `);
});

app.listen(port, () => {
	console.log(`Test att port ${port}`);
});
