'use client'
import { toast } from 'react-hot-toast'
import { Effect, createDomain, createEffect, forward, sample } from "effector";
import { Gate, createGate } from "effector-react";
import { getBestsellerProductsFx, getNewProductsFx } from "@/api/main-page";
import { IProduct } from "@/types/common";
import { ILoadOneProductFx } from "@/types/goods";
import api from '@/api/apiInstance'

const goods = createDomain()
export const loadOneProductFx = createEffect(
	async ({ productId, category }: ILoadOneProductFx) => {
		try {
			const { data } = await api.post('/api/goods/one', { productId, category })

			if (data?.message === 'Wrong product id') {
				return { productItem: { errorMessage: 'Wrong product id' } }
			}

			return data
		} catch (error) {
			toast.error((error as Error).message)
		}
	}
)

export const setCurrentProduct = goods.createEvent<IProduct>()
export const loadOneProduct = goods.createEvent<ILoadOneProductFx>()
export const MainPageGate = createGate()

const goodsStoreInstance = (effect: Effect<void, [], Error>) =>
	goods
		.createStore([])
		.on(effect.done, (_, { result }) => result)
		.on(effect.fail, (_, { error }) => {
			console.log(error.message)
		})

const goodsSampleInstance = (
	effect: Effect<void, [], Error>,
	gate: Gate<unknown>
) =>
	sample({
		clock: gate.open,
		target: effect,
	})

export const $newProducts = goodsStoreInstance(getNewProductsFx)
export const $bestsellerProducts = goodsStoreInstance(getBestsellerProductsFx)
goodsSampleInstance(getNewProductsFx, MainPageGate)
goodsSampleInstance(getBestsellerProductsFx, MainPageGate)


export const $currentProduct = goods
	.createStore<IProduct>({} as IProduct)
	.on(setCurrentProduct, (_, product) => product)
	.on(loadOneProductFx.done, (_, { result }) => result.productItem)

sample({
	clock: loadOneProduct,
	to: loadOneProductFx
})