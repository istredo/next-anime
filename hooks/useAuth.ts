import { useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { Store, EventCallable } from 'effector'
import { useEarthoOne } from '@eartho/one-client-react'
import React from 'react'
import { IForms, ISignUpFx } from "@/types/auth"



export const useAuth = (
	initialSpinner: Store<boolean>,
	isSideActive: boolean,
	event: EventCallable<ISignUpFx>
) => {
	const spinner = useUnit(initialSpinner)
	const { isAuthenticated, user, connectWithPopup } = useEarthoOne()
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IForms>()
	React.useEffect(() => {
		if (isSideActive && isAuthenticated) {
			event({
				password: user?.uid || '', // Обработка возможного undefined или null
				email: user?.email || '',
				isOAuth: true,
				name: user?.displayName || '',
			})
		}
	}, [isAuthenticated])

	const signOAuthHandler = () =>
		connectWithPopup({
			accessId: `${process.env.NEXT_PUBLIC_OAUTH_ACCESS_ID}`,
		})

	return {
		spinner,
		register,
		errors,
		handleSubmit,
		signOAuthHandler
	}
}