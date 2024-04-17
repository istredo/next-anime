import { addProductToCartFx, updateCartItemCountFx } from "@/api/cart"
import { handleJWTError } from "@/lib/utils/errors"
import { IAddProductFromLSFx, IAddProductToCartFx, ICartItem, IUpdateCartItemCountFx } from "@/types/cart"
import { createDomain, createEffect, sample } from "effector"
import api from '@/api/apiInstance'
import toast from "react-hot-toast"
export const addProductFromLSFx = createEffect(
	async ({ jwt, cartItems }: IAddProductFromLSFx) => {
		try {
			const { data } = await api.post('/api/cart/add-many',
				{ items: cartItems },
				{
					headers: { Authorization: `Bearer ${jwt}` },
				})

			if (data?.error) {
				const newData: { newCartItem: ICartItem } = await handleJWTError(
					data.error.name,
					{
						repeatRequestMethodName: 'addProductFromLSFx',
						payload: { items: cartItems },
					}
				)
				return newData
			}

			loadCartItems({ jwt })
			return data
		} catch (error) {
			toast.error((error as Error).message)
		}
	}
)

const cart = createDomain()
export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()
export const addProductToCart = cart.createEvent<IAddProductToCartFx>()
export const addProductsFromLSToCart =
	cart.createEvent<IAddProductFromLSFx>()

export const $cart = cart
	.createStore<ICartItem[]>([])
	.on(setCartFromLS, (_, cart) => cart)
	.on(addProductFromLSFx.done, (_, { result }) => result.items)
	.on(addProductToCartFx.done, (cart, { result }) => [
		...new Map(
			[...cart, result.newCartItem].map((item) => [item.clientId, item])
		).values(),
	])
	.on(updateCartItemCountFx.done, (cart, { result }) =>
		cart.map((item) =>
			item._id === result.id ? { ...item, count: result.count } : item
		)
	)
export const updateCartItemCount = cart.createEvent<IUpdateCartItemCountFx>()

export const $cartFromLs = cart
	.createStore<ICartItem[]>([])
	.on(setCartFromLS, (_, cart) => cart)

sample({
	clock: addProductToCart,
	source: $cart,
	fn: (_, data) => data,
	target: addProductToCartFx,
})

sample({
	clock: addProductsFromLSToCart,
	source: $cart,
	fn: (_, data) => data,
	target: addProductFromLSFx,
})

sample({
	clock: updateCartItemCount,
	source: $cart,
	fn: (_, data) => data,
	target: updateCartItemCountFx,
})
