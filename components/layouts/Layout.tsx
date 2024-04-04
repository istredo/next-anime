'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useUnit } from 'effector-react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import Header from '../modules/Header/Header'
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar'
import { $modalQuickView, $modalSearch, $modalSizeView } from '@/ctx/modal'
import ModalSearch from '../modules/Header/ModalSearch'
import { closeModalSearchHandler, closeQuickViewHandler } from '@/lib/utils/commonFunc'
import Footer from '../modules/Footer/Footer'
import { QuickView } from '../modules/QuickView/QuickView'
import { Sizes } from '../modules/Sizes/Sizes'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const isMedia800 = useMediaQuery(800)
	const modalSearch = useUnit($modalSearch)
	const showQuickView = useUnit($modalQuickView)
	const modalSizeView = useUnit($modalSizeView)
	return (
		<>
			<Header />
			{children}
			{isMedia800 && <MobileNavbar />}
			<div className={`header__search-overlay ${modalSearch ? 'overlay-active' : ''}`} onClick={closeModalSearchHandler} />
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
				{modalSizeView && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Sizes />
					</motion.div>
				)}
			</AnimatePresence>
			{!isMedia800 && (
				<AnimatePresence>
					{showQuickView && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<QuickView />
						</motion.div>
					)}
				</AnimatePresence>
			)}
			<div className={`header__search-overlay ${modalSearch ? 'overlay-active' : ''}`} onClick={closeModalSearchHandler} />
			<Footer />
		</>
	)
}

export default Layout