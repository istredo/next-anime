import React from "react"
import { useLang } from "@/hooks/useLang"
import { useUnit } from "effector-react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

import '@/app/globalStyles/menu.css'

import { removeOverflowBody } from "@/lib/utils/commonFunc"
import { setLang } from "@/ctx/lang"
import { AllowedLanguages } from "@/const/lang"
import Logo from "@/components/Logo"
import { $openMenu, hideMenu } from "@/ctx/modal"
import Accordion from "../Accordion/Accordion"
import MenuLinkItem from "./MenuLinkedItem"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import BuyersList from "./BuyersList"
import ContactList from "./ContactList"

const Menu = () => {
	const [catalogueList, setCatologueList] = React.useState(false)
	const [buyerList, setBuyerList] = React.useState(false)
	const [contactList, setContactList] = React.useState(false)
	const { lang, translations } = useLang()
	const openMenu = useUnit($openMenu)
	const pathname = usePathname()
	const isMedia800 = useMediaQuery(800)
	const isMedia640 = useMediaQuery(640)

	const catalogHandler = () => {
		setCatologueList(true)
		setBuyerList(false)
		setContactList(false)
	}
	const buyerHandler = () => {
		setCatologueList(false)
		setBuyerList(true)
		setContactList(false)
	}
	const contactHandler = () => {
		setCatologueList(false)
		setBuyerList(false)
		setContactList(true)
	}
	const closeMenuHandler = () => {
		removeOverflowBody()
		hideMenu()
	}
	const redirectHandler = (path: string) => {
		if (pathname.includes('/catalog')) {
			window.history.pushState({ path }, '', path)
			window.location.reload()
		}
		closeMenuHandler()
	}



	const languageHandler = (lang: string) => {
		setLang(lang as AllowedLanguages)
		localStorage.setItem('lang', JSON.stringify(lang))
	}
	const toggleRus = () => languageHandler('ru')
	const toggleEn = () => languageHandler('en')


	const clothLinks = [
		{
			id: 1,
			text: translations[lang].comparison['t-shirts'],
			href: '/catalog/cloth?offset=0&type=t-shirts',
		},
		{
			id: 2,
			text: translations[lang].comparison['long-sleeves'],
			href: '/catalog/cloth?offset=0&type=long-sleeves',
		},
		{
			id: 3,
			text: translations[lang].comparison.hoodie,
			href: '/catalog/cloth?offset=0&type=hoodie',
		},
		{
			id: 4,
			text: translations[lang].comparison.outerwear,
			href: '/catalog/cloth?offset=0&type=outerwear',
		},
	]

	const accessoriesLinks = [
		{
			id: 1,
			text: translations[lang].comparison.bags,
			href: '/catalog/accessories?offset=0&type=bags',
		},
		{
			id: 2,
			text: translations[lang].comparison.headdress,
			href: '/catalog/accessories?offset=0&type=headdress',
		},
		{
			id: 3,
			text: translations[lang].comparison.umbrella,
			href: '/catalog/accessories?offset=0&type=umbrella',
		},
	]

	const souvenirsLinks = [
		{
			id: 1,
			text: translations[lang].comparison['business-souvenirs'],
			href: '/catalog/souvenirs?offset=0&type=business-souvenirs',
		},
		{
			id: 2,
			text: translations[lang].comparison['promotional-souvenirs'],
			href: '/catalog/souvenirs?offset=0&type=promotional-souvenirs',
		},
	]

	const officeLinks = [
		{
			id: 1,
			text: translations[lang].comparison.notebook,
			href: '/catalog/office?offset=0&type=notebook',
		},
		{
			id: 2,
			text: translations[lang].comparison.pen,
			href: '/catalog/office?offset=0&type=pen',
		},
	]

	return (
		<nav className={`nav-menu ${openMenu ? 'open' : 'close'}`} >
			<div className="container nav-menu__container">
				<div className={`nav-menu__logo ${openMenu ? 'open' : ''}`}>
					<Logo />
					{translations[lang].header.siteName}
				</div>
				<button className={`btn-reset nav-menu__close ${openMenu ? 'open' : ''}`} onClick={closeMenuHandler}></button>
				<div className={`nav-menu__lang ${openMenu ? 'open' : ''}`}>
					<button className={`btn-reset nav-menu__lang__btn ${lang === 'ru' ? 'lang-active' : ''}`} onClick={toggleRus}>Ru</button>
					<button className={`btn-reset nav-menu__lang__btn ${lang === 'en' ? 'lang-active' : ''}`} onClick={toggleEn}>En</button>
				</div>
				<ul className={`list-reset nav-menu__list ${openMenu ? 'open' : ''}`}>
					{!isMedia800 && <li className='nav-menu__list__item'>
						<button className='btn-reset nav-menu__list__item__btn' onMouseEnter={catalogHandler}>
							{translations[lang].main_menu.catalog}
						</button>
						<AnimatePresence>
							{catalogueList && (
								<motion.ul
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className='list-reset nav-menu__accordion'
								>
									<li className="nav-menu__accordion__item">
										<Accordion
											title={translations[lang].main_menu.cloth}
											titleClass="btn-reset nav-menu__accordion__item__title" 									>
											<ul className="list-reset nav-menu__accordion__item__list">
												{clothLinks.map(item => (
													<MenuLinkItem
														key={item.id}
														item={item}
														handleRedirectToCatalog={redirectHandler}
													/>
												))}
											</ul>
										</Accordion>
									</li>
									<li className="nav-menu__accordion__item">
										<Accordion
											title={translations[lang].main_menu.accessories}
											titleClass="btn-reset nav-menu__accordion__item__title" 									>
											<ul className="list-reset nav-menu__accordion__item__list">
												{accessoriesLinks.map(item => (
													<MenuLinkItem
														key={item.id}
														item={item}
														handleRedirectToCatalog={redirectHandler}
													/>
												))}
											</ul>
										</Accordion>
									</li>
									<li className="nav-menu__accordion__item">
										<Accordion
											title={translations[lang].main_menu.souvenirs}
											titleClass="btn-reset nav-menu__accordion__item__title" 									>
											<ul className="list-reset nav-menu__accordion__item__list">
												{souvenirsLinks.map(item => (
													<MenuLinkItem
														key={item.id}
														item={item}
														handleRedirectToCatalog={redirectHandler}
													/>
												))}
											</ul>
										</Accordion>
									</li>
									<li className="nav-menu__accordion__item">
										<Accordion
											title={translations[lang].main_menu.office}
											titleClass="btn-reset nav-menu__accordion__item__title" 									>
											<ul className="list-reset nav-menu__accordion__item__list">
												{officeLinks.map(item => (
													<MenuLinkItem
														key={item.id}
														item={item}
														handleRedirectToCatalog={redirectHandler}
													/>
												))}
											</ul>
										</Accordion>
									</li>
								</motion.ul>
							)}
						</AnimatePresence>
					</li>}
					<li className='nav-menu__list__item'>
						{!isMedia640 && <button className='btn-reset nav-menu__list__item__btn' onMouseEnter={buyerHandler}>
							{translations[lang].main_menu.buyers}
						</button>}
						{!isMedia640 &&
							<AnimatePresence>
								{buyerList && (
									<motion.ul
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className='list-reset nav-menu__accordion'
									>
										<BuyersList />
									</motion.ul>
								)}
							</AnimatePresence>}
						{isMedia640 && (
							<Accordion
								title={translations[lang].main_menu.buyers}
								titleClass="btn-reset nav-menu__accordion__item__title">

								<ul className="list-reset nav-menu__accordion__item__list" >
									<BuyersList />
								</ul>
							</Accordion>
						)}
					</li>
					<li className='nav-menu__list__item'>
						{!isMedia640 && <button className='btn-reset nav-menu__list__item__btn' onMouseEnter={contactHandler}>
							{translations[lang].main_menu.contacts}
						</button>}
						{!isMedia640 && <AnimatePresence>
							{contactList && (
								<motion.ul
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className='list-reset nav-menu__accordion'>
									<ContactList />
								</motion.ul>
							)}
						</AnimatePresence>}
						{isMedia640 && (
							<Accordion
								title={translations[lang].main_menu.contacts}
								titleClass="btn-reset nav-menu__accordion__item__title">
								<ul className="list-reset nav-menu__accordion__item__list" >
									<ContactList />
								</ul>
							</Accordion>
						)}
					</li>

				</ul>
			</div>
		</nav >
	)
}

export default Menu