import NameErrorMessage from '@/components/elems/NameErrorMessage'
import { useLang } from '@/hooks/useLang'
import { nameValidationRules } from '@/lib/utils/auth'
import { IAuthInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'

const NameInput = ({ register, errors }: IAuthInput) => {
	const { lang, translations } = useLang()

	return (
		<div className='form__block'>
			<input
				type='text'
				className='form__block__input'
				placeholder={translations[lang].auth_popup.name}
				{...register(
					'name',
					nameValidationRules(
						translations[lang].validation.invalid_value,
						translations[lang].validation.requiredName
					)
				)}
			/>
			<NameErrorMessage
				errors={errors}
				className={styles.error_alert}
				fieldName='name'
			/>
		</div>
	)
}

export default NameInput
