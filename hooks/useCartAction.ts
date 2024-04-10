import { useUnit } from "effector-react"
import React from "react"
import { $currentProduct } from "@/ctx/goods"
import { useCartByAuth } from "./useCartByAuth"
import { isItemInList, isUserAuth } from "@/lib/utils/commonFunc"
import { addCartItemToLS, addItemToCart, addProductToCartBySizeTable } from "@/lib/utils/cart"


export const useCartAction = (isSizeTable = false) => {
	const [addToCartSpinner, setAddToCartSpinner] = React.useState(false)
	const [selectSize, setSelectSize] = React.useState('')
	const product = useUnit($currentProduct)
	const currentCartByAuth = useCartByAuth()
	const currentCartItems = currentCartByAuth.filter(
		(item) => item.productId === product._id
	)
	const cartItemBySize = currentCartItems.find(
		(item) => item.size === selectSize
	)
	const isProductInCart = isItemInList(currentCartByAuth, product._id)

	const cartHandler = (countFromCounter?: number) => {
		if (isProductInCart) {
			if (!isUserAuth()) {
				addCartItemToLS(product, selectSize, countFromCounter || 1)
				return
			}
			if (cartItemBySize) {
				const auth = JSON.parse(localStorage.getItem('auth') as string)
				const updateCount = !!countFromCounter
					? +cartItemBySize.count !== countFromCounter
						? countFromCounter
						: +cartItemBySize.count + 1
					: +cartItemBySize.count + 1

				addCartItemToLS(product, selectSize, countFromCounter || 1)
				return
			}
		}
		if (isSizeTable) {
			addItemToCart(
				product,
				setAddToCartSpinner,
				countFromCounter || 1,
				selectSize
			)
			return
		}
		addProductToCartBySizeTable(
			product,
			setAddToCartSpinner,
			countFromCounter || 1,
			selectSize
		)
	}
	return { product, selectSize, setSelectSize, addToCartSpinner, currentCartItems, cartItemBySize, cartHandler, isProductInCart, currentCartByAuth, setAddToCartSpinner }
}