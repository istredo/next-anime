import Link from 'next/link'

import { useLang } from '@/hooks/useLang'


const BuyersList = () => {
	const { lang, translations } = useLang()
	return (
		<>
			<li className="nav-menu__accordion__item">
				<Link href="/about" className="nav-menu__accordion__item__link nav-menu__accordion__item__title">
					{translations[lang].main_menu.about}
				</Link>
			</li>
			<li className="nav-menu__accordion__item">
				<Link href="/blog" className="nav-menu__accordion__item__link">
					{translations[lang].main_menu.blog}
				</Link>
			</li>
			<li className="nav-menu__accordion__item">
				<Link href="/souvenirs" className="nav-menu__accordion__item__link">
					{translations[lang].main_menu.souvenirs}
				</Link>
			</li>
			<li className="nav-menu__accordion__item">
				<Link href="/office" className="nav-menu__accordion__item__link">
					{translations[lang].main_menu.office}
				</Link>
			</li>
		</>
	)
}

export default BuyersList
