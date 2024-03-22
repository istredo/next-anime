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

	return shuffle([
		...clothes
			.filter((item) => item[fieldName] && Object.values(item.sizes).some((value) => value)
			)
			.slice(0, 2),
		...souvenirs
			.filter((item) => item[fieldName] && Object.values(item.sizes).some((value) => value)
			).slice(0, 2),
	])
}