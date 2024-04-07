'use client'
import React from 'react'
import { EarthoOneProvider } from '@eartho/one-client-react'
import { useUnit } from 'effector-react'
import { Toaster } from 'react-hot-toast'
import Layout from './Layout'
import { $modalQuickView, $modalSizeView } from '@/ctx/modal'
import { closeAuthHandler, closeQuickViewHandler, closeSizeTable } from '@/lib/utils/commonFunc'
import { $openAuth } from '@/ctx/auth'


export const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	const [client, setClient] = React.useState(false)
	const modalQuickView = useUnit($modalQuickView)
	const modalSizeView = useUnit($modalSizeView)
	const openAuth = useUnit($openAuth)
	const sizesHandler = () => closeSizeTable(modalQuickView)
	React.useEffect(() => setClient(true), [])
	return (
		<>
			{client ? (
				<EarthoOneProvider clientId={`${process.env.NEXT_PUBLIC_OAUTH_ID}`} domain={''}>
					<html lang="ru">
						<body >
							<Layout>
								{children}
							</Layout>
							<div className={`quick-view-modal-overlay ${modalQuickView ? 'overlay-active' : ''}`} onClick={closeQuickViewHandler} />
							<div className={`size-table-overlay ${modalSizeView ? 'overlay-active' : ''}`} onClick={sizesHandler} />
							<div className={`auth-overlay ${openAuth ? 'overlay-active' : ''}`} onClick={closeAuthHandler} />
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

