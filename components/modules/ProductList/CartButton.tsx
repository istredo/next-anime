import { ICartButton } from "@/types/goods"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export const CartButton = ({
	cartHandler,
	addToCartSpinner,
	text,
	btnDisabled = false,
	className,
}: ICartButton) => (
	<button
		className={`btn-reset ${className}`}
		disabled={btnDisabled}
		onClick={cartHandler}
	>
		{addToCartSpinner ? (
			<FontAwesomeIcon icon={faSpinner} spin color='#fff' />
		) : (
			text
		)}
	</button>
)