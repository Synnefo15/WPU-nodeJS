function cetakNama(nama) {
	return `halo saya ${nama}`;
}

const PI = 3.14;

class Orang {
	constructor() {
		console.log(`Ini objek orang`);
	}
}

// % Import satu2 
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.Orang = Orang;

// % Import langsung banyak 
module.exports = {
    cetakNama,
    PI,
    Orang,
}
