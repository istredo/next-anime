import { hideModalSearch, hideQuickView } from "@/ctx/modal";


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
export const closeQuickViewHandler = () => {
	hideQuickView()
	removeOverflowBody()
}

export const shuffle = <T>(array: T[]) => {
	let currentIndex = array.length
	for (let i = currentIndex - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}


export const formatPrice = (x: number) =>
	x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')


export const idGenerator = () => {
	const S4 = () =>
		(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	return (
		S4() +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		S4() +
		S4()
	)
}
