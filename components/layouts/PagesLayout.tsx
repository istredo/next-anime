'use client'
import React from 'react'
import { useUnit } from 'effector-react'
import Layout from './Layout'
import { $modalQuickView, $modalSizeView } from '@/ctx/modal'
import { closeQuickViewHandler, closeSizeTable } from '@/lib/utils/commonFunc'

export const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	const modalQuickView = useUnit($modalQuickView)
	const modalSizeView = useUnit($modalSizeView)
	const sizesHandler = () => closeSizeTable(modalQuickView)
	return (
		<html lang="ru">
			<body >
				<Layout>
					{children}
				</Layout>
				<div className={`quick-view-modal-overlay ${modalQuickView ? 'overlay-active' : ''}`} onClick={closeQuickViewHandler} />
				<div className={`size-table-overlay ${modalSizeView ? 'overlay-active' : ''}`} onClick={sizesHandler} />
			</body>
		</html>
	)
}

