import { createDomain } from 'effector'
import { ISelectedSizes } from '@/types/common'

const sizeTable = createDomain()

export const setSizes = sizeTable.createEvent<ISelectedSizes>()

export const $setSizes = sizeTable
	.createStore({} as ISelectedSizes)
	.on(setSizes, (_, sizes) => sizes)
