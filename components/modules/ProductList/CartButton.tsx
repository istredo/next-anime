import { ICartButton } from "@/types/goods"


export const CartButton = ({ text, className }: ICartButton) => {
	return (
		<button className={`btn-reset ${className}`}>
			{text}
		</button>
	)
}

