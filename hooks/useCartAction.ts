import { useUnit } from "effector-react"
import React from "react"
import { $currentProduct } from "@/ctx/goods"
import { useCartByAuth } from "./useCartByAuth"
import { isUserAuth } from "@/lib/utils/commonFunc"
import { addCartItemToLS, addItemToCart, addProductToCartBySizeTable } from "@/lib/utils/cart"
import { updateCartItemCount } from "@/ctx/cart"


export const useCartAction = (isSizeTable = false) => {
	const [addToCartSpinner, setAddToCartSpinner] = React.useState(false)
	const [selectSize, setSelectSize] = React.useState('')
	const [updateCountSpinner, setUpdateCountSpinner] = React.useState(false)

	const product = useUnit($currentProduct)
	const currentCartByAuth = useCartByAuth()
	const currentCartItems = currentCartByAuth.filter(
		(item) => item.productId === product._id
	)
	const cartItemBySize = currentCartItems.find(
		(item) => item.size === selectSize
	)
	const isProductInCart = currentCartByAuth.find(
		(item) => item.productId === product._id && item.size === selectSize
	)
	const [count, setCount] = React.useState(+(isProductInCart?.count as string) || 1)
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
				updateCartItemCount({
					jwt: auth.accessToken,
					id: isProductInCart._id as string,
					setSpinner: setUpdateCountSpinner,
					count: selectSize.length
						? updateCount
						: +isProductInCart.count + 1,
				})
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
	const allCurrentCartItemCount = React.useMemo(
		() => currentCartItems.reduce((a, { count }) => a + +count, 0),
		[currentCartItems]
	)
	return { product, selectSize, setSelectSize, allCurrentCartItemCount, addToCartSpinner, currentCartItems, setCount, count, cartItemBySize, cartHandler, updateCountSpinner, isProductInCart, currentCartByAuth, setAddToCartSpinner }
}