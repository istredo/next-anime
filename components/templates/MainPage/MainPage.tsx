"use client"
import { useGate } from 'effector-react'
import React from 'react'
import Banner from '@/components/modules/MainPage/Banner/Banner'
import Categories from '@/components/modules/MainPage/Categories/Categories'
import { MainPageGate } from '@/ctx/goods'
import BestSellersGoods from '@/components/modules/MainPage/BestSellersGoods'
const MainPage = () => {
	useGate(MainPageGate)

	return (
		<main>
			<Banner />
			<Categories />
			<BestSellersGoods />
		</main>
	)
}

export default MainPage