import { EventCallable } from "effector";
import toast from "react-hot-toast";
import { checkAuth, hideAuth, openAuth } from "@/ctx/auth";
import { setCurrentProduct } from "@/ctx/goods";
import { hideModalSearch, hideQuickView, hideSizes, showSizes } from "@/ctx/modal";
import { setSizes } from "@/ctx/sizeTable";
import { loginCheck } from '@/ctx/user'
import { ICartItem } from "@/types/cart";
import { IProduct } from "@/types/common";


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


export const closeSizeTable = (quickView: boolean) => {
	if (!quickView) {
		removeOverflowBody()
	}

	hideSizes()
}

export const closeAuthHandler = () => {
	removeOverflowBody();
	hideAuth()
}
export const openAuthHandler = () => {
	addOverflowBody()
	openAuth()
}

export const checkPopupAuthHandler = (
	modalQuickView: boolean,
	modalSizeView: boolean
) => {
	if (modalQuickView || modalSizeView) {
		hideAuth()
		return
	}

	closeAuthHandler()
}
export const isUserAuth = () => {
	const auth = JSON.parse(localStorage.getItem('auth') as string)

	if (!auth?.accessToken) {
		checkAuth(false)
		return false
	}

	return true
}

export const triggerLoginCheck = () => {
	if (!isUserAuth()) {
		return
	}

	const auth = JSON.parse(localStorage.getItem('auth') as string)

	loginCheck({ jwt: auth.accessToken })
}

export const isItemInList = (array: ICartItem[], productId: string) =>
	array.some((item) => item.productId === productId)

export const showSizesHandler = (product: IProduct) => {
	setCurrentProduct(product)
	setSizes({ sizes: product.sizes, type: product.type })
	addOverflowBody()
	showSizes()
}

export const getCartItemCountBySize = (
	cartItems: ICartItem[],
	currentSize: string
) =>
	cartItems.find((item) => item.size === currentSize.toLocaleLowerCase())
		?.count || 0

export const deleteProductFromLS = <T>(
	id: string,
	key: string,
	event: EventCallable<T>,
	setShouldShowEmpty: (arg0: boolean) => void,
	message: string,
	withToast = true
) => {
	let items = JSON.parse(localStorage.getItem(key) as string)

	if (!items) {
		items = []
	}

	const updatedItems = items.filter(
		(item: { clientId: string }) => item.clientId !== id
	)

	localStorage.setItem(key, JSON.stringify(updatedItems))
	event(updatedItems)
	withToast && toast.success(message)

	if (!updatedItems.length) {
		setShouldShowEmpty(true)
	}
}