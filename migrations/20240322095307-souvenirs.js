/* eslint-disable indent */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]
const compositions = ['synthetics', 'polyester']
const souvenirsTypes = ['trinket', 'keychain']
const images = [
	'/img/souvenirs/trinket.png',
	'/img/souvenirs/trinket-1.png',
	'/img/souvenirs/trinket-2.png',
	'/img/souvenirs/trinket-3.png',
	'/img/souvenirs/trinket-4.png',
	'/img/souvenirs/trinket-5.png',
	'/img/souvenirs/trinket-6.png',
	'/img/souvenirs/trinket-7.png',
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
					vendorCode: faker.string.numeric(4),
					inStock: faker.string.numeric(2),
					isBestseller: faker.datatype.boolean(),
					isNew: faker.datatype.boolean(),
					popularity: +faker.string.numeric(3),
					sizes:
						type === 'umbrella'
							? {}
							: {
								s: faker.datatype.boolean(),
								m: faker.datatype.boolean(),
								l: faker.datatype.boolean(),
								xl: faker.datatype.boolean(),
								xxl: faker.datatype.boolean(),
							},
				}
			})
		)
	},

	async down(db) {
		return db.collection('souvenirs').updateMany([])
	},
}
