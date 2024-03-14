import React from 'react'

export const useMenuAnimation = (zIndex: number, popupIsOpen: boolean) => {
	const [popupZIndex, setPopupZIndex] = React.useState<string | number>(0)

	const itemVariants = {
		closed: {
			opacity: 0,
		},
		open: { opacity: 1 },
	}

	const sideVariants = {
		closed: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: -1,
			},
		},
		open: {
			transition: {
				staggerChildren: 0.2,
				staggerDirection: 1,
			},
		},
	}

	React.useEffect(() => {
		if (popupIsOpen) {
			setPopupZIndex(zIndex)
			return
		}

		const timerId = setTimeout(() => setPopupZIndex('-1'), 1000)

		return () => clearTimeout(timerId)
	}, [popupIsOpen, zIndex])

	return { popupZIndex, itemVariants, sideVariants }
}
