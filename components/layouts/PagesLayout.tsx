'use client'
import React from 'react'
import { useUnit } from 'effector-react'
import Layout from './Layout'
import { $modalQuickView } from '@/ctx/modal'
import { closeQuickViewHandler } from '@/lib/utils/commonFunc'

export const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	const modalQuickView = useUnit($modalQuickView)
	return (
		<html lang="ru">
			<body >
				<Layout>
					{children}
				</Layout>
				<div className={`quick-view-modal-overlay ${modalQuickView ? 'overlay-active' : ''}`} onClick={closeQuickViewHandler} />
			</body>
		</html>
	)
}

