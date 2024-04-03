import { createDomain } from "effector";

const modals = createDomain()

export const showMenu = modals.createEvent();
export const hideMenu = modals.createEvent();

export const showModalCatalog = modals.createEvent();
export const hideModalCatalog = modals.createEvent();

export const showModalSearch = modals.createEvent();
export const hideModalSearch = modals.createEvent();

export const showQuickView = modals.createEvent();
export const hideQuickView = modals.createEvent();

export const showSizes = modals.createEvent();
export const hideSizes = modals.createEvent();

export const $openMenu = modals
	.createStore(false)
	.on(showMenu, () => true)
	.on(hideMenu, () => false)

export const $modalCatalog = modals
	.createStore(false)
	.on(showModalCatalog, () => true)
	.on(hideModalCatalog, () => false)

export const $modalSearch = modals
	.createStore(false)
	.on(showModalSearch, () => true)
	.on(hideModalSearch, () => false)

export const $modalQuickView = modals
	.createStore(false)
	.on(showQuickView, () => true)
	.on(hideQuickView, () => false)

export const $modalSizeView = modals
	.createStore(false)
	.on(showSizes, () => true)
	.on(hideSizes, () => false)
