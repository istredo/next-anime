import Logo from '@/components/elems/Logo'
import { useLang } from '@/hooks/useLang'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
	const { lang, translations } = useLang()

	return (
		<footer className='footer'>
			<div className='footer__top'>
				<div className='container footer__top__container'>
					<div className='footer__logo'>
						<Logo />
						{translations[lang].header.siteName}
					</div>
					<div className='footer__contacts'>
						<span>
							<a href='tel:+71234567890'>+7 (123) 456-78-90</a>
						</span>
						<span>
							<a href='mailto:yourmail@yourmail.ru'>yourmail@yourmail.ru</a>
						</span>
					</div>
					<ul className='list-reset footer__socials'>
						<li className='footer__socials__item'>
							<a
								href='https://t.me/'
								className='footer__socials__item__link'
							/>
						</li>
						<li className='footer__socials__item'>
							<a
								href='https://vk.com'
								className='footer__socials__item__link'
							/>
						</li>
					</ul>
				</div>
			</div>
			<div className='footer__bottom'>
				<div className='container footer__bottom__container'>
					<div className='footer__copyright'>
						© 2024 {translations[lang].footer.copyright}
					</div>
					<div className='footer__policy'>
						<div className='footer__policy__inner'>
							<Link href='/personal-data-policy'>
								{translations[lang].footer.policy}
							</Link>
							<Link href='/privacy-policy'>
								{translations[lang].footer.privacy}
							</Link>
						</div>

					</div>

				</div>
			</div>
		</footer>
	)
}

export default Footer
