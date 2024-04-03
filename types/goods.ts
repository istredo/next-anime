export interface ILoadOneProductFx {
	productId: string
	category: string
}

export interface ISizesItemProps {
	currentSize: [string, boolean]
	selectSize: string
	setSelectSize: (arg0: string) => void
	currentCartItems: []
}

export interface ICounterProps {
	className: string
	count: number
}

export interface ICartButton {
	className?: string
	text: string
}