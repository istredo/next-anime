const { faker } = require('@faker-js/faker')

const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const collections = ['street', 'black', 'casual', 'orange', 'line']
const colors = ['purpure', 'yellow', 'orange', 'black', 'white']
const compositions = ['cotton', 'synthetics', 'polyester']
const clothTypes = ['hoodie', 't-shirt']
const images = [
	'/img/clothes/cloth-hoodie.png',
	'/img/clothes/cloth-hoodie-1.png',
	'/img/clothes/cloth-hoodie-2.png',
	'/img/clothes/cloth-hoodie-3.png',
	'/img/clothes/cloth-hoodie-4.png',
	'/img/clothes/cloth-hoodie-5.png',
	'/img/clothes/cloth-hoodie-6.png',
	'/img/clothes/cloth-t-shirts.png',
	'/img/clothes/cloth-t-shirts-1.png',
	'/img/clothes/cloth-t-shirts-2.png',
	'/img/clothes/cloth-t-shirts-3.png',
	'/img/clothes/cloth-t-shirts-4.png',
	'/img/clothes/cloth-t-shirts-5.png',
	'/img/clothes/cloth-t-shirts-6.png',
]
const lineImages = [
	'/img/black-t.png',
	'/img/violet-t.png',
	'/img/orange-t.png',
]
const fabricTypes = [
	'natural',
	'non-natural',
	'mixed',
	'non-woven',
	'stockinette',
]
const features = [
	'breathable material, knitwear',
	'contrasting color',
	'soft fabric',
]
const collars = [
	'shirt-rack',
	'apache',
	'tangerine',
	'golf',
	'round neck',
]
const sleeves = ['long', 'short']
const seasons = ['demi-season', 'all season']
const upperMaterials = [
	'synthetic material',
	'denim',
]
const liningMaterials = ['taffeta', 'viscose', 'polyester', 'chiffon', 'satin']


module.exports = {
	async up(db) {
		return db.collection('cloth').insertMany([...Array(50)].map(() => {
			const type = clothTypes[Math.floor(Math.random() * clothTypes.length)]
			const characteristics = [
				{
					type: 't-shirts',
					color: getRandomValue(colors),
					collar: getRandomValue(collars),
					silhouette: 'straight',
					print: 'chocolate, print, melange',
					decor: faker.datatype.boolean(),
					composition: getRandomValue(compositions),
					season: getRandomValue(seasons),
					collection:
						collections[Math.floor(Math.random() * collections.length)],
				},
				{
					type: 'hoodie',
					color: getRandomValue(colors),
					collar: getRandomValue(collars),
					silhouette: 'straight',
					print: 'chocolate, print, melange',
					decor: faker.datatype.boolean(),
					composition: getRandomValue(compositions),
					features: getRandomValue(features),
					fabricType: getRandomValue(fabricTypes),
					sleeve: getRandomValue(sleeves),
					clasp: faker.datatype.boolean(),
					season: getRandomValue(seasons),
				}
			]
			const currentCharacteristics = characteristics.find(
				(item) => item.type === type
			)
			return {
				category: 'cloth',
				type,
				price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
				name: faker.lorem.sentence(2),
				description: faker.lorem.sentences(10),
				characteristics: currentCharacteristics,
				images:
					type === 't-shirts' && currentCharacteristics.collection === 'line'
						? [getRandomValue(lineImages)]
						: images.filter((item) => item.includes(type)),
				article: faker.string.numeric(4),
				inStock: faker.string.numeric(2),
				isBestseller: faker.datatype.boolean(),
				isNew: faker.datatype.boolean(),
				popularity: +faker.string.numeric(3),
				sizes: {
					s: faker.datatype.boolean(),
					l: faker.datatype.boolean(),
					m: faker.datatype.boolean(),
					xl: faker.datatype.boolean(),
					xxl: faker.datatype.boolean(),
				},
			}
		}))
	},


	async down(db) {
		return db.collection('cloth').updateMany([])
	}
};

//3.06.00