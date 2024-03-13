import { useLang } from '@/hooks/useLang'
import React from 'react'

const ContactList = () => {
	const { lang, translations } = useLang()
	return (
		<>
			<li className="nav-menu__accordion__item ">
				<a href="tel:+70123456789" className="nav-menu__accordion__item__link nav-menu__accordion__item__title">
					+7-012-345-67-89
				</a>
			</li>
			<li className="nav-menu__accordion__item">
				<a href="mailto:uvarov6799@gmail.com" className="nav-menu__accordion__item__link">
					E-mail
				</a>
			</li>
			<li className="nav-menu__accordion__item">
				<a href="https://t.me/istredo" className="nav-menu__accordion__item__link">
					{translations[lang].main_menu.tg}
				</a>
			</li>
		</>
	)
}

export default ContactList
