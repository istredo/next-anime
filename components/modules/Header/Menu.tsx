import React from "react"
import { useLang } from "@/hooks/useLang"
import { useUnit } from "effector-react"
import { $openMenu, hideMenu } from "@/ctx/modal"
import '@/app/globalStyles/menu.css'
import { removeOverflowBody } from "@/lib/utils/commonFunc"
import { setLang } from "@/ctx/lang"
import { AllowedLanguages } from "@/const/lang"

const Menu = () => {
	const [catalogueList, setCatologueList] = React.useState(false)
	const [buyerList, setBuyerList] = React.useState(false)
	const [contactList, setContactList] = React.useState(false)
	const { lang, translations } = useLang()
	const openMenu = useUnit($openMenu)

	const closeMenuHandler = () => {
		removeOverflowBody()
		hideMenu()
	}
	const languageHandler = (lang: string) => {
		setLang(lang as AllowedLanguages)
		localStorage.setItem('lang', JSON.stringify(lang))
	}
	const toggleRus = () => languageHandler('ru')
	const toggleEn = () => languageHandler('en')

	return (
		<nav className={`nav-menu ${openMenu ? 'open' : 'close'}`} >
			<button className={`btn-reset nav-menu__close ${openMenu ? 'open' : ''}`} onClick={closeMenuHandler}></button>
			<div className={`nav-menu__lang ${openMenu ? 'open' : ''}`}>
				<button className={`btn-reset nav-menu__lang__btn ${lang === 'ru' ? 'lang-active' : ''}`} onClick={toggleRus}>Ru</button>
				<button className={`btn-reset nav-menu__lang__btn ${lang === 'en' ? 'lang-active' : ''}`} onClick={toggleEn}>En</button>
			</div>
		</nav>
	)
}

export default Menu