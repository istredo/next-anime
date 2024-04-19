import { ICartItem } from "./cart"

export interface ILoadOneProductFx {
	productId: string
	category: string
}

export interface ISizesItemProps {
	currentSize: [string, boolean]
	selectSize: string
	setSelectSize: (arg0: string) => void
	currentCartItems: ICartItem[]
}

export interface ICounterProps {
	className: string
	count: number
}

export interface ICartButton {
	cartHandler: VoidFunction
	addToCartSpinner: boolean
	text: string
	btnDisabled?: boolean
	className?: string
}

export interface IProductCountBySizeProps {
	products: ICartItem[]
	size: string
	withCartIcon?: boolean
}
