"use client"
import { useGate } from 'effector-react'
import React from 'react'
import Banner from '@/components/modules/MainPage/Banner/Banner'
import Categories from '@/components/modules/MainPage/Categories/Categories'
import { MainPageGate } from '@/ctx/goods'
import BestSellersGoods from '@/components/modules/MainPage/BestSellersGoods'
import { NewGoods } from '@/components/modules/MainPage/NewGoods'
import { AboutUs } from '@/components/modules/MainPage/AboutUs'
const MainPage = () => {
	useGate(MainPageGate)

	return (
		<main>
			<Banner />
			<Categories />
			<NewGoods />
			<BestSellersGoods />
			<AboutUs />
		</main>
	)
}

export default MainPage