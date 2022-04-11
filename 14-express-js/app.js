const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	// res.send('Halo Rafi'); // % text
	// res.json({ // % Json
	// 	nama : 'rafi',
	// 	email : 'rafi@gmail.com',
	// 	hp : '09138213'
	// })
	res.sendFile('/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
	// res.send('Ini page about');
	res.sendFile('./about.html', { root: __dirname });
});
app.get('/contact', (req, res) => {
	// res.send('Ini page contact');
	res.sendFile('/public/contact.html', { root: __dirname });
});
app.get('/product/:id', (req, res) => {
	res.send(`Produk ID: ${req.params.id} <br> Category ID : ${req.query.category}`);
});
app.use('/', (req, res) => {
	res.status(404);
	res.send(/*html*/ ` <h1>404</h1> `);
});

app.listen(port, () => {
	console.log(`Test att port ${port}`);
});
