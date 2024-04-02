import { Db, MongoClient, ObjectId } from 'mongodb'
import { shuffle } from './commonFunc'



export const getDbAndReqBody = async (
	clientPromise: Promise<MongoClient>,
	req: Request | null
) => {
	const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

	if (req) {
		const reqBody = await req.json()
		return { db, reqBody }
	}

	return { db }
}

export const getNewAndBestsellerGoods = async (db: Db, fieldName: string) => {
	const clothes = await db.collection('cloth').find().toArray()
	const souvenirs = await db.collection('souvenirs').find().toArray()
	const shuffleCloth = shuffle([...clothes].filter((item) => item[fieldName] && Object.values(item.sizes).some((value) => value))).slice(0, 2)
	const shuffleSouvenirs = shuffle([...souvenirs].filter((item) => item[fieldName])).slice(0, 1)
	const shuffleAd = shuffle([...clothes].filter((item) => item.characteristics.collection === 'line')).slice(0, 1)
	return [...shuffleCloth, ...shuffleSouvenirs, ...shuffleAd]
}