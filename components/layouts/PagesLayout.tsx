'use client'
import React from 'react'
import { useUnit } from 'effector-react'
import Layout from './Layout'
import { $modalQuickView, $modalSizeView } from '@/ctx/modal'
import { closeAuthHandler, closeQuickViewHandler, closeSizeTable } from '@/lib/utils/commonFunc'
import { $openAuth, hideAuth } from '@/ctx/auth'

export const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	const modalQuickView = useUnit($modalQuickView)
	const modalSizeView = useUnit($modalSizeView)
	const openAuth = useUnit($openAuth)
	const sizesHandler = () => closeSizeTable(modalQuickView)
	return (
		<html lang="ru">
			<body >
				<Layout>
					{children}
				</Layout>
				<div className={`quick-view-modal-overlay ${modalQuickView ? 'overlay-active' : ''}`} onClick={closeQuickViewHandler} />
				<div className={`size-table-overlay ${modalSizeView ? 'overlay-active' : ''}`} onClick={sizesHandler} />
				<div className={`auth-overlay ${openAuth ? 'overlay-active' : ''}`} onClick={closeAuthHandler} />
			</body>
		</html>
	)
}

