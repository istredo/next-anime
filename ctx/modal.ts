import { createDomain } from "effector";

const modals = createDomain()

export const showMenu = modals.createEvent();
export const hideMenu = modals.createEvent();

export const showModalCatalog = modals.createEvent();
export const hideModalCatalog = modals.createEvent();

export const showModalSearch = modals.createEvent();
export const hideModalSearch = modals.createEvent();

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
