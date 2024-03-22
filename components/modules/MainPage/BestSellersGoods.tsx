import { useUnit } from 'effector-react'
import React from 'react'
import { $bestsellerProducts } from '@/ctx/goods'
import { getBestsellerProductsFx } from '@/api/main-page'
import { useLang } from '@/hooks/useLang'
import MainPageSection from '@/components/templates/MainPage/MainPageSection'
const BestSellersGoods = () => {
	const goods = useUnit($bestsellerProducts)
	const spinner = useUnit(getBestsellerProductsFx.pending)
	const { lang, translations } = useLang()
	return (
		<MainPageSection
			title={translations[lang].main_page.bestsellers_title}
			goods={goods}
			spinner={spinner}
		/>
	)
}

export default BestSellersGoods
