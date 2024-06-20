'use client'
import { useState, ReactNode, useEffect } from 'react'
import { Next13ProgressBar } from 'next13-progressbar'
import { EarthoOneProvider } from '@eartho/one-client-react'
import { useUnit } from 'effector-react'
import { Toaster } from 'react-hot-toast'
import Layout from './Layout'
import { $modalQuickView, $modalSizeView } from '@/ctx/modal'
import { closeAuthHandler, closeQuickViewHandler, closeSizeTable } from '@/lib/utils/commonFunc'
import { $openAuth } from '@/ctx/auth'
import { motion } from 'framer-motion'
import CookieAlert from '../modules/CookieAlert/CookieAlert'


export const PagesLayout = ({ children }: { children: ReactNode }) => {
	const [client, setClient] = useState(false)
	const [cookieAlertOpen, setCookieAlertOpen] = useState(false)
	const modalQuickView = useUnit($modalQuickView)
	const modalSizeView = useUnit($modalSizeView)
	const openAuth = useUnit($openAuth)
	const sizesHandler = () => closeSizeTable(modalQuickView)
	useEffect(() => setClient(true), [])
	useEffect(() => {
		const checkCookie = document.cookie.indexOf('CookieBy=Gojo')
		checkCookie != -1
			? setCookieAlertOpen(false)
			: setTimeout(() => setCookieAlertOpen(true), 3000)
	}, [])
	return (
		<>
			{client ? (
				<EarthoOneProvider clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`} domain='test_domain' >
					<html lang="ru">
						<body >
							<Next13ProgressBar height='4px' color='#008000' showOnShallow />
							<Layout>
								{children}
							</Layout>
							<div className={`quick-view-modal-overlay ${modalQuickView ? 'overlay-active' : ''}`} onClick={closeQuickViewHandler} />
							<div className={`size-table-overlay ${modalSizeView ? 'overlay-active' : ''}`} onClick={sizesHandler} />
							<div className={`auth-overlay ${openAuth ? 'overlay-active' : ''}`} onClick={closeAuthHandler} />
							{cookieAlertOpen && (
								<motion.div
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									className='cookie-popup'
								>
									<CookieAlert setCookieAlertOpen={setCookieAlertOpen} />
								</motion.div>
							)}
							<Toaster position='top-center' reverseOrder={false} />
						</body>
					</html>
				</EarthoOneProvider>
			) :
				<html lang='ru'>
					<body>
						<></>
					</body>
				</html>
			}</>
	)
}

