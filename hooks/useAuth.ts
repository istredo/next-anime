import { useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { Store, Event, EventCallable } from 'effector'
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
	React.useEffect(() => {
		if (isSideActive) {
			if (isAuthenticated) {
				event({
					name: user?.user.displayName,
					email: user?.user.email,
					password: user?.user.uid,
					isOAuth: true,
				})
			}
		}
	}, [isAuthenticated])
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IForms>()
	const signOAuthHandler = () => ''

	return {
		spinner,
		register,
		errors,
		handleSubmit,
		signOAuthHandler
	}
}