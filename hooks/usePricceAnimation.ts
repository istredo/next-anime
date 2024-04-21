import React from 'react'
import { animate } from 'framer-motion'


export const usePriceAnimation = (initialFrom: number, initialTo: number) => {
	const [from, setFrom] = React.useState(initialFrom)
	const [to, setTo] = React.useState(initialTo)
	const [value, setValue] = React.useState(0)

	React.useEffect(() => {
		const controls = animate(from, to, {
			duration: 0.5,
			onUpdate(value) {
				setValue(+value.toFixed(0))
			},
		})

		return () => controls.stop()
	}, [from, to])

	return { setFrom, setTo, value }
}
