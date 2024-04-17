'use client'
import Link from "next/link"
import Logo from "@/components/elems/Logo"
import { useLang } from "@/hooks/useLang"
import '@/app/globalStyles/header.css'
import Menu from "./Menu"
import { showMenu, showModalSearch } from "@/ctx/modal"
import { addOverflowBody, openAuthHandler, triggerLoginCheck } from "@/lib/utils/commonFunc"
import CartPopUp from "./CartPopUp/CartPopUp"
import HeaderProfile from "./HeaderProfile"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useUnit } from "effector-react"
import { $isAuth } from '@/ctx/auth'
import { loginCheckFx } from "@/ctx/user"
import React from "react"
import { setLang } from "@/ctx/lang"
import { addProductsFromLSToCart, setCartFromLS } from "@/ctx/cart"

const Header = () => {
	const { lang, translations } = useLang()
	const menuHandler = () => {
		addOverflowBody()
		showMenu()
	}

	const loginCheckSpinner = useUnit(loginCheckFx.pending)
	const isAuth = useUnit($isAuth)
	const searchHandler = () => {
		addOverflowBody()
		showModalSearch()
	}

	React.useEffect(() => {
		const cart = JSON.parse(localStorage.getItem('cart') as string)
		const lang = JSON.parse(localStorage.getItem('lang') as string)
		if (lang) {
			if (lang === 'ru' || lang === 'en') {
				setLang(lang)
			}
		}
		if (cart) {
			setCartFromLS(cart)
		}
		triggerLoginCheck()
	}, [])
	React.useEffect(() => {
		if (isAuth) {
			const auth = JSON.parse(localStorage.getItem('auth') as string)
			const cartFromLS = JSON.parse(localStorage.getItem('cart') as string)

			if (cartFromLS && Array.isArray(cartFromLS)) {
				addProductsFromLSToCart({
					jwt: auth.accessToken,
					cartItems: cartFromLS,
				})
			}


		}
	}, [isAuth])
	return (

		<header className="header" >
			<div className="container header__container">
				<button className="header__burger btn-reset" onClick={menuHandler}>
					{translations[lang].header.menu_btn}
				</button>
				<Menu />
				<div className="header_logo">
					<Logo />
					{translations[lang].header.siteName}
				</div>
				<ul className="header__links list-reset">
					<li className='header__links__item'>
						<button className='btn-reset header__links__item__btn header__links__item__btn--search'
							onClick={searchHandler} />
					</li>
					<li className='header__links__item'><Link href='/favorites' className="header__links__item__btn header__links__item__btn--favorites" /></li>
					<li className='header__links__item'><Link href='/compare' className="header__links__item__btn header__links__item__btn--compare" /></li>
					<li className='header__links__item'>
						<CartPopUp />
					</li>
					<li className='header__links__item header__links__item--profile'>
						{isAuth ? (
							<HeaderProfile />
						) : loginCheckSpinner ? (
							<FontAwesomeIcon icon={faSpinner} spin />
						) : (
							<button
								className='btn-reset header__links__item__btn header__links__item__btn--profile'
								onClick={openAuthHandler}
							/>
						)}
					</li>
				</ul>
			</div>
		</header>


	)

}

export default Header
