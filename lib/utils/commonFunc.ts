import { hideModalSearch } from "@/ctx/modal";


export const removeOverflowBody = () => {
	const body = document.querySelector('body') as HTMLBodyElement;
	body.classList.remove('overflow-hidden');
}
export const addOverflowBody = (paddingRight = '') => {
	const body = document.querySelector('body') as HTMLBodyElement
	body.classList.add('overflow-hidden')
	paddingRight && (body.style.paddingRight = paddingRight)
}


export const getWindowWidth = () => {
	const { innerWidth: windowWidth } =
		typeof window !== 'undefined' ? window : { innerWidth: 0 }
	return { windowWidth }
}

export const closeModalSearchHandler = () => {
	hideModalSearch()
	removeOverflowBody()
}
export const shuffle = <T>(array: T[]) => {
	let currentIndex = array.length,
		randomIndex

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--
			;[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			]
	}
	return array
}


export const formatPrice = (x: number) =>
	x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
