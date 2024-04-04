import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IAuthSideProps, IForms } from '@/types/auth'
import { AuthClose } from './AuthClose'

import { useLang } from '@/hooks/useLang'
import { useAuth } from '@/hooks/useAuth'
import { signUpFx, signUpHandler } from '@/ctx/auth'
import NameInput from './NameInput'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import { AuthSocials } from './AuthSocials'


export const AuthRegistration = ({
	toggleAuth,
	isSideActive,
}: IAuthSideProps) => {
	const { lang, translations } = useLang()
	const { spinner, register, errors, handleSubmit, signOAuthHandler } = useAuth(signUpFx.pending, isSideActive, signUpHandler)
	const submitForm = (data: IForms) =>
		signUpHandler({
			name: data.name,
			email: data.email,
			password: data.password,
			isOAuth: false,
		})

	return (
		<div className='card-front'>
			<AuthClose />
			<div className='card-body wow-bg'>
				<h3 className='card-body__title'>
					{translations[lang].auth_popup.registration_title}
				</h3>
				<p className='card-body__description'>
					{translations[lang].auth_popup.registration_description}
				</p>
				<form onSubmit={handleSubmit(submitForm)}>
					<NameInput register={register} errors={errors} />
					<EmailInput register={register} errors={errors} />
					<PasswordInput register={register} errors={errors} />
					<div className='card-body__inner'>
						<div className='inner__top'>
							<button className='inner__btn' type='submit' disabled={spinner}>
								{spinner ? (
									<FontAwesomeIcon icon={faSpinner} spin />
								) : (
									translations[lang].auth_popup.registration_text
								)}
							</button>
						</div>
						<div className='inner__bottom'>
							<span className='inner__bottom__text'>
								{translations[lang].auth_popup.registration_question}
							</span>
							<button
								type='button'
								className='btn-reset inner__switch'
								onClick={toggleAuth}
							>
								{translations[lang].auth_popup.login_text}!
							</button>
						</div>
					</div>
				</form>
				<AuthSocials signOAuthHandler={signOAuthHandler} />
			</div>
		</div>
	)
}
