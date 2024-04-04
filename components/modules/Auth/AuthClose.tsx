import { useUnit } from 'effector-react'
import { checkPopupAuthHandler } from '@/lib/utils/commonFunc'
import { $modalQuickView, $modalSizeView } from '@/ctx/modal'

export const AuthClose = () => {
	const modalQuickView = useUnit($modalQuickView)
	const modalSizeView = useUnit($modalSizeView)

	const closePopup = () =>
		checkPopupAuthHandler(modalQuickView, modalSizeView)

	return <button className='btn-reset auth-popup__close' onClick={closePopup} />
}
