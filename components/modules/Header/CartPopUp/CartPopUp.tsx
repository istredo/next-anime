import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import React, { forwardRef } from 'react'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { getCartItemsFx } from '@/api/cart'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import { useLang } from '@/hooks/useLang'
import { clickOutside } from '@/lib/utils/clickOutside'
import { IWrappedComponentProps } from '@/types/modules'
import CartItem from './CartItem'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import { formatPrice } from '@/lib/utils/commonFunc'

const CartPopUp = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const showPopUpHandler = () => setOpen(true)
		const hidePopUpHandler = () => setOpen(false)
		const { lang, translations } = useLang()
		const spinner = useUnit(getCartItemsFx.pending)
		const currentCartByAuth = useCartByAuth()
		const { animatedPrice } = useTotalPrice()

		return (
			<div className="cart-popup" ref={ref}>
				<Link href='/cart' className="header__links__item__btn header__links__item__btn--cart" onMouseEnter={showPopUpHandler} />
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							className='cart-popup__wrapper'
							onMouseLeave={hidePopUpHandler}
						>
							<span className='cart-popup__arrow' />
							<button
								className='btn-reset cart-popup__close'
								onClick={hidePopUpHandler}
							/>
							<h3 className='cart-popup__title'>
								{translations[lang].breadcrumbs.cart}
							</h3>
							{spinner ? (
								<div className='cart-popup__spinner'>
									<FontAwesomeIcon
										icon={faSpinner}
										spin
										color='#fff'
										size='3x'
									/>
								</div>
							) : (<ul className='list-reset cart-popup__cart-list'>
								<AnimatePresence>
									{currentCartByAuth.length ? (
										currentCartByAuth.map((item) => (
											<motion.li
												key={item._id || item.clientId}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												className='cart-list__item'
											>
												<CartItem item={item} />
											</motion.li>
										))
									) : (
										<li className='cart-popup__cart-list__empty-cart' />
									)}
								</AnimatePresence>
							</ul>)}
							<div className='cart-popup__footer'>
								<div className='cart-popup__footer__inner'>
									<span>{translations[lang].common.order_price}:</span>
									<span>{formatPrice(animatedPrice)} ₽</span>
								</div>
								<Link href='/order' className='cart-popup__footer__link'>
									{translations[lang].breadcrumbs.order}
								</Link>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		)
	}
)

CartPopUp.displayName = 'CartPopUp'

export default clickOutside(CartPopUp)
