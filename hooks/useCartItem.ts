import { ICartItem } from "@/types/cart"
import React from "react"
import { usePriceAction } from "./usePriceAction"
import { usePriceAnimation } from "./usePricceAnimation"

export const useCartItem = (cartItem: ICartItem) => {
	const [deleteSpinner, setDeleteSpinner] = React.useState(false)
	const [count, setCount] = React.useState(+cartItem.count)
	const { price, increasePrice, decreasePrice } = usePriceAction(
		+cartItem.count,
		+cartItem.price
	)
	const {
		setFrom,
		setTo,
		value: animatedPrice,
	} = usePriceAnimation(+cartItem.price, +cartItem.price * +cartItem.count)
	const increasePriceWithAnimation = () => {
		setFrom(price)
		setTo(price + +cartItem.price)
		increasePrice()
	}

	const decreasePriceWithAnimation = () => {
		setFrom(price)
		setTo(price - +cartItem.price)
		decreasePrice()
	}
	return {
		deleteSpinner,
		price,
		count,
		setCount,
		increasePrice,
		decreasePrice,
		increasePriceWithAnimation,
		decreasePriceWithAnimation,
		setFrom,
		setTo,
		animatedPrice
	}
} 