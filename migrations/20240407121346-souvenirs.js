const { faker } = require('@faker-js/faker')
const collections = ['street', 'black', 'casual', 'orange', 'line']
const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]
const compositions = ['synthetics', 'polyester']
const souvenirsTypes = ['trinket', 'keychain']
const images = [
	'/img/souvenirs/trinket.png',
	'/img/souvenirs/trinket-1.png',
	'/img/souvenirs/trinket-2.png',
	'/img/souvenirs/trinket-3.png',
	'/img/souvenirs/keychain.png',
	'/img/souvenirs/keychain-1.png',
	'/img/souvenirs/keychain-2.png',
	'/img/souvenirs/keychain-3.png',
]
const wearingMethod = ['on bag', 'on keys']
const styles = ['bucket bag', 'retro style', 'travel']
const spokeMaterials = ['metal', 'plastic', 'fiberglass']

module.exports = {
	async up(db) {
		return db.collection('souvenirs').insertMany(
			[...Array(50)].map(() => {
				const type =
					souvenirsTypes[Math.floor(Math.random() * souvenirsTypes.length)]

				const characteristics = [
					{
						type: 'trinket',
						composition: getRandomArrayValue(compositions),
						wearingMethod: getRandomArrayValue(wearingMethod),
						spokeMaterial: getRandomArrayValue(spokeMaterials),
						style: getRandomArrayValue(styles),
						collection:
							collections[Math.floor(Math.random() * collections.length)],

					},
					{
						type: 'keychain',
						composition: getRandomArrayValue(compositions),
						wearingMethod: getRandomArrayValue(wearingMethod),
						spokeMaterial: getRandomArrayValue(spokeMaterials),
						style: getRandomArrayValue(styles),
						collection:
							collections[Math.floor(Math.random() * collections.length)],
					}
				]
				return {
					category: 'souvenirs',
					type,
					price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
					name: faker.lorem.sentence(2),
					description: faker.lorem.sentences(10),
					characteristics: characteristics.find((item) => item.type === type),
					images: images.filter((item) => item.includes(type)),
					article: faker.string.numeric(4),
					inStock: faker.string.numeric(2),
					isBestseller: faker.datatype.boolean(),
					isNew: faker.datatype.boolean(),
					popularity: +faker.string.numeric(3),
				}
			})
		)
	},

	async down(db) {
		return db.collection('souvenirs').updateMany([])
	},
}
