import { useUnit } from "effector-react"
import { $currentProduct } from "@/ctx/goods"


export const useCartAction = () => {
	const product = useUnit($currentProduct)

	return product
}