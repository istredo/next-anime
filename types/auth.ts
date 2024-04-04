import { FieldErrors, FieldErrorsImpl, UseFormRegister } from "react-hook-form"

export interface IForms {
	name: string
	email: string
	password: string
}
export interface ISignUpFx {
	password: string
	email: string
	isOAuth?: boolean
	name?: string
}
export interface IAuthSideProps {
	toggleAuth: VoidFunction
	isSideActive: boolean
}

export interface IAuthInput {
	register: UseFormRegister<IForms>
	errors: Partial<FieldErrorsImpl<IForms>>
}
export interface INameErrorMessageProps {
	errors: FieldErrors<IForms & { [index: string]: string }>
	fieldName: string
	className?: string
}


export interface IInputs {
	name: string
	email: string
	password: string
}