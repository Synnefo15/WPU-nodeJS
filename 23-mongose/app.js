const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Mongo Contact APP | Running Port At htpp://localhost${port}`);
})
