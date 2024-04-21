import React from 'react'

export const usePriceAction = (count: number, initialPrice: number) => {
	const [price, setPrice] = React.useState(initialPrice)

	React.useEffect(() => {
		setPrice(price * count)
	}, [])

	const increasePrice = () => setPrice(price + initialPrice)
	const decreasePrice = () => setPrice(price - initialPrice)

	return { price, increasePrice, decreasePrice }
}
