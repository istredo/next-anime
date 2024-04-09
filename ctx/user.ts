import { createDomain } from 'effector'
import { IUser } from '@/types/auth'


const user = createDomain()



export const $user = user
	.createStore<IUser>({} as IUser)
