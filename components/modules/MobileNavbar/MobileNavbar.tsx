'use client'
import Link from 'next/link'
import React from 'react'

import { hideMenu, hideModalCatalog, showMenu, showModalCatalog } from '@/ctx/modal'
import { useLang } from '@/hooks/useLang'
import { addOverflowBody } from '@/lib/utils/commonFunc'

const MobileNavbar = () => {
	const { lang, translations } = useLang()

	const openCatalogHandler = () => {
		addOverflowBody();
		hideMenu();
		showModalCatalog();
	}

	const openMenuHandler = () => {
		addOverflowBody();
		hideModalCatalog();
		showMenu();
	}
	return (
		<div className='mobile-navbar'>
			<Link href='/' className='mobile-navbar__btn'>
				{translations[lang].breadcrumbs.main}
			</Link>
			<button className='btn-reset mobile-navbar__btn' onClick={openCatalogHandler}>
				{translations[lang].breadcrumbs.catalog}
			</button>
			<Link className='btn-reset mobile-navbar__btn' href='/favorites'>
				{translations[lang].breadcrumbs.favorites}
			</Link>
			<Link className='btn-reset mobile-navbar__btn' href='/cart'>
				{translations[lang].breadcrumbs.cart}
			</Link>
			<button className='btn-reset mobile-navbar__btn' onClick={openMenuHandler}>
				{translations[lang].common.more}
			</button>
		</div>
	)
}

export default MobileNavbar
