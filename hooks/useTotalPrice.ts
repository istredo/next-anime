import React from 'react'
import { useUnit } from 'effector-react'
import { $totalPrice, setTotalPrice } from '@/ctx/cart'
import { usePriceAnimation } from './usePricceAnimation'
import { useCartByAuth } from './useCartByAuth'

export const useTotalPrice = () => {
	const totalPrice = useUnit($totalPrice)
	const currentCartByAuth = useCartByAuth()

	const getNewTotal = () =>
		currentCartByAuth
			.map((item) => +item.price * +item.count)
			.reduce((defaultCount, item) => defaultCount + item, 0)

	const {
		value: animatedPrice,
		setFrom,
		setTo,
	} = usePriceAnimation(totalPrice, getNewTotal())

	React.useEffect(() => {
		setTotalPrice(getNewTotal())
		setFrom(totalPrice)
		setTo(getNewTotal())
	}, [currentCartByAuth])

	return { animatedPrice }
}
