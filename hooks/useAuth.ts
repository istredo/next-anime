import { useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { Store, Event } from 'effector'
import { IForms, ISignUpFx } from "@/types/auth"


export const useAuth = (
	initialSpinner: Store<boolean>,
	isSideActive: boolean,
	event: Event<ISignUpFx>
) => {
	const spinner = useUnit(initialSpinner)

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