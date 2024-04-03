import { CustomArrowProps } from "react-slick"

export interface IDialogProps {
	dialogClassName?: string
	dialogRectClassName?: string
}


export interface IProductItemActionProps {
	text: string
	iconClass: string
	callback?: VoidFunction
	withTooltip?: boolean
	marginBottom?: number
}

export interface IProductAvailableProps {
	article: string
	inStock: number
}

export interface IQuickViewArrowProps extends CustomArrowProps {
	directionClassName: string
}