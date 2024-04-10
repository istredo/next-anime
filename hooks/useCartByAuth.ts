import { useUnit } from "effector-react"

import { $isAuth } from "@/ctx/auth"
import { $cart, $cartFromLs } from "@/ctx/cart"

export const useCartByAuth = () => {
	const cart = useUnit($cart)
	const isAuth = useUnit($isAuth)
	const cartFromLs = useUnit($cartFromLs)
	const currentCart = isAuth ? cart : cartFromLs

	return currentCart
}