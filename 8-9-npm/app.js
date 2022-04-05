// #====== Validator =======
const validator = require('validator');
// console.log(validator.isEmail('rafi@yahoo.com'));
// console.log(validator.isMobilePhone('081339590129','id-ID'));
// console.log(validator.isNumeric('339590129'));

// #====== Chalk =======
const chalk = require('chalk');
console.log(chalk.black.bgGreen('rafi cahya'));
let pesan = chalk`Nesciunt {bgRed laboriosam} velit voluptatem libero. Dicta sint magnam voluptates qui libero sunt libero. {bgGreen.black Molestiae} ipsum consequatur voluptate commodi.`  
console.log(pesan);

// #====== Nodemon =======


