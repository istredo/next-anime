import { useUnit } from "effector-react"
import { $currentProduct } from "@/ctx/goods"
import { useState } from "react"


export const useCartAction = () => {
	const product = useUnit($currentProduct)
	const [selectSize, setSelectSize] = useState('')

	return { product, selectSize, setSelectSize }
}