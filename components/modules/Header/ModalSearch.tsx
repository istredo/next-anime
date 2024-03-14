import React from 'react'

import { useLang } from '@/hooks/useLang'
import { closeModalSearchHandler } from '@/lib/utils/commonFunc'


const ModalSearch = () => {
	const { lang, translations } = useLang()

	const focusHandler = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
	) => {
		e.target.classList.add('with_value')
	}

	const blurHandler = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
	) => {
		if (e.target.value) {
			return
		}

		e.target.classList.remove('with_value')
	}

	return (
		<div className='search-modal'>
			<button
				className='btn-reset search-modal__close'
				onClick={closeModalSearchHandler}
			/>
			<h3 className='search-modal__title'>
				{translations[lang].header.search_products}
			</h3>
			<div className='search-modal__top'>
				<label className='search-modal__label'>
					<input
						type='text'
						className='search-modal__input'
						onFocus={focusHandler}
						onBlur={blurHandler}
					/>
					<span className='search-modal__floating_label'>
						{translations[lang].header.search_infos}
					</span>
				</label>
			</div>
		</div>
	)
}

export default ModalSearch
