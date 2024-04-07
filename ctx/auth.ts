import { createDomain, createEffect, sample } from "effector";
import toast from "react-hot-toast";
import { onAuthSuccess } from "@/lib/utils/auth";
import api from '@/api/apiInstance'
import { ISignUpFx } from "@/types/auth";

const auth = createDomain()

export const openAuth = auth.createEvent()
export const hideAuth = auth.createEvent()
export const signUpHandler = auth.createEvent<ISignUpFx>()
export const signInHandler = auth.createEvent<ISignUpFx>()
export const checkAuth = auth.createEvent<boolean>()

export const $openAuth = auth
	.createStore<boolean>(false)
	.on(openAuth, () => true)
	.on(hideAuth, () => false)

export const $isAuth = auth
	.createStore(false)
	.on(checkAuth, (_, isAuth) => isAuth)

export const signUpFx = createEffect(
	async ({ name, password, email, isOAuth }: ISignUpFx) => {
		if (isOAuth) {
			await oauthFx({
				email,
				password,
				name,
			})
			return
		}
		const { data } = await api.post('api/users/signup', {
			name, password, email
		})
		if (data.warningMessage) {
			toast.error(data.warningMessage)
			return
		}
		onAuthSuccess('Регистрация успешна!', data)
		return data
	}
)
export const signInFx = createEffect(
	async ({ email, password, isOAuth }: ISignUpFx) => {
		if (isOAuth) {
			await oauthFx({
				email,
				password
			})
			return
		}
		const { data } = await api.post('api/users/login', {
			email, password
		})
		if (data.warningMessage) {
			toast.error(data.warningMessage)
			return
		}
		onAuthSuccess('Авторизация выполнена', data)
		return data
	}
)
export const oauthFx = createEffect(
	async ({ name, password, email }: ISignUpFx) => {
		try {
			const { data } = await api.post('/api/users/oauth', {
				name,
				password,
				email,
			})

			await api.post('/api/users/email', {
				password,
				email,
			})

			onAuthSuccess('Авторизация выполнена!', data)
			return data.user
		} catch (error) {
			toast.error((error as Error).message)
		}
	}
)
export const $auth = auth
	.createStore({})
	.on(signUpFx.done, (_, { result }) => result)
	.on(signUpFx.fail, (_, { error }) => {
		toast.error(error.message)
	})
	.on(signInFx.done, (_, { result }) => result)
	.on(signInFx.fail, (_, { error }) => {
		toast.error(error.message)
	})

sample({
	clock: signUpHandler,
	source: $auth,
	fn: (_, { name, email, password, isOAuth }) => ({
		name,
		password,
		email,
		isOAuth,
	}),
	target: signUpFx,
})

sample({
	clock: signInHandler,
	source: $auth,
	fn: (_, { name, email, password, isOAuth }) => ({
		email,
		password,
		isOAuth,
		name,
	}),
	target: signInFx,
})