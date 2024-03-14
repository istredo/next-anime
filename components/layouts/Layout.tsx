'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useUnit } from 'effector-react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import Header from '../modules/Header/Header'
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar'
import { $modalSearch } from '@/ctx/modal'
import ModalSearch from '../modules/Header/ModalSearch'
import { closeModalSearchHandler } from '@/lib/utils/commonFunc'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const isMedia800 = useMediaQuery(800)
	const modalSearch = useUnit($modalSearch)
	return (
		<>
			<Header />
			{children}
			{isMedia800 && <MobileNavbar />}
			<div className={`header__search-overlay ${modalSearch ? 'overlay-active' : ''}`} onClick={closeModalSearchHandler}></div>
			<AnimatePresence>
				{modalSearch && (
					<motion.div
						initial={{ opacity: 0, zIndex: 102 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<ModalSearch />
					</motion.div>
				)}
			</AnimatePresence>

		</>
	)
}

export default Layout
{ }