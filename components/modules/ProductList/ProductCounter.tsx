import React from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateCartItemCount } from '@/ctx/cart'
import { updateCartItemCountInLS } from '@/lib/utils/cart'
import { isUserAuth } from '@/lib/utils/commonFunc'
import { ICounterProps } from '@/types/goods'


export const ProductCounter = ({ className,
	count,
	initialCount,
	totalCount,
	setCount,
	increasePrice,
	decreasePrice,
	cartItem,
	updateCountAsync }: ICounterProps) => {
	const [spinner, setSpinner] = React.useState(false)
	const [disableIncrease, setDisableIncrease] = React.useState(false)
	const [disableDecrease, setDisableDecrease] = React.useState(false)
	const currentTotalCount = +cartItem?.inStock || totalCount
	const currentInitialCount = +cartItem?.count || initialCount || 1

	React.useEffect(() => {
		if (count === 1) {
			setDisableDecrease(true)
		} else {
			setDisableDecrease(false)
		}

		if (count === currentTotalCount) {
			setDisableIncrease(true)
		} else {
			setDisableIncrease(false)
		}
	}, [count, currentTotalCount])

	React.useEffect(() => {
		setCount(currentInitialCount as number)
	}, [currentInitialCount])

	const updateCountWithRequest = (count: number) => {
		updateCartItemCountInLS(cartItem.clientId, count)

		if (!isUserAuth()) {
			return
		}

		const auth = JSON.parse(localStorage.getItem('auth') as string)

		updateCartItemCount({
			jwt: auth.accessToken,
			id: cartItem._id,
			setSpinner,
			count,
		})
	}

	const increase = async () => {
		increasePrice && increasePrice()
		setDisableDecrease(false)
		setCount(count + 1)

		if (updateCountAsync) {
			updateCountWithRequest(count + 1)
		}
	}

	const decrease = async () => {
		decreasePrice && decreasePrice()
		setDisableIncrease(false)
		setCount(count - 1)

		if (updateCountAsync) {
			updateCountWithRequest(count - 1)
		}
	}
	return (
		<div className={className}>
			<button
				className='btn-reset'
				onClick={decrease}
				disabled={disableDecrease || spinner}
			/>
			<span>{spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : count}</span>
			<button
				className='btn-reset'
				onClick={increase}
				disabled={disableIncrease || spinner}
			/>
		</div>
	)
}


