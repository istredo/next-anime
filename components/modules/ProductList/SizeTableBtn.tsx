'use client'
import { useUnit } from 'effector-react'
import { showSizes, $modalSizeView } from '@/ctx/modal'
import { ISelectedSizes } from '@/types/common'
import { setSizeTableSizes } from '@/ctx/sizeTable'
import { useLang } from '@/hooks/useLang'
import { addOverflowBody } from '@/lib/utils/commonFunc'

export const SizeTableBtn = ({ sizes, type, className }: ISelectedSizes) => {
	const { lang, translations } = useLang()
	const modalSizeView = useUnit($modalSizeView)

	const handleShowSizeTable = () => {
		if (!modalSizeView) {
			addOverflowBody()
		}

		setSizeTableSizes({ sizes, type })
		showSizes()
	}

	return (
		<button className={`btn-reset ${className}`} onClick={handleShowSizeTable}>
			{translations[lang].product.size_table}
		</button>
	)
}