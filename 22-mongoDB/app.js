const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

const ObjectID = require('mongodb').ObjectId;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect((error, client) => {
	if (error) {
		return console.log('Koneksi Gagal');
	}

	const db = client.db(dbName);

	// &---- Create ----
	// db.collection('mahasiswa').insertOne(
	//     {
	//         nama : "cahyaputra",
	//         email : "cahya@gmail.com",
	//     },
	//     (error,result)=>{
	//         if (error) {
	//             return console.log('gagal insert data');
	//         }
	//         console.log(result);
	//     }
	//     )

	// &---- ADD >1 data ----
	// db.collection('mahasiswa').insertMany(
	//     [
	//         {
	//             nama : 'aqshol',
	//             email : 'aqshol@email.com'
	//         },
	//         {
	//             nama : 'wahyu',
	//             email : 'wahyu@email.com'
	//         },
	//     ],
	//     (error,result) => {
	//         if (error) {
	//             return console.log('data gagal ditambah');
	//         }
	//         console.log(result);
	//     }
	// )

	// &---- Read Data ----
	// console.log(
	// 	db
	// 		.collection('mahasiswa')
	// 		.find()
	// 		.toArray((error, result) => {
	//             console.log(result);
	//         })
	// );

	// &---- Show data with criteria ----
	// console.log(
	// 	db
	// 		.collection('mahasiswa')
	// 		.find({ _id: ObjectID('6253fb85d903b3dfe334193b') })
	// 		.toArray((error, result) => {
	// 			console.log(result);
	// 		})
	// );

	// &---- Ubah Data ----
	// const updatePromise = db.collection('mahasiswa').updateOne(
	// 		{
	// 			_id: ObjectID('6253fb85d903b3dfe334193b'),
	// 		},
	// 		{
	// 			$set: {
	// 				nama: 'M gumilang',
	// 			},
	// 		}
	// 	);
	// updatePromise.then((result) => {
	//     console.log(result);
	// }).catch((error) => {
	//     console.log(error);
	// })

	// &---- Update > 1 ----
	// db.collection('mahasiswa').updateMany(
	// 	{
	// 		nama: 'rafi',
	// 	},
	// 	{
	// 		$set: {
	// 			nama: 'rafi cahya',
	// 		},
	// 	}
	// );

    // &---- Delete 1 data ----
    // db.collection('mahasiswa').deleteOne({
	// 		_id: ObjectID('6253fb85d903b3dfe334193b'),
	// 	}
    //     ).then((result) => {
    //         console.log(result);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })

    // &---- Delet >1 data ----
    // db.collection('mahasiswa').deleteMany()
});
