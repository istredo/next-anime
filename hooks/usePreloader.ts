import { useState } from 'react'

const usePreloader = () => {
	const [imgSpinner, setImgSpinner] = useState(true)

	const imgageLoadingHandler = async (
		img: React.SyntheticEvent<HTMLImageElement, Event>
	) => {
		img.currentTarget.classList.remove('opacity-0')
		setImgSpinner(false)
	}

	return { imgageLoadingHandler, imgSpinner }
}

export default usePreloader
