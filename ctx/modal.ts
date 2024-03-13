import { createDomain } from "effector";

const modals = createDomain()

export const showMenu = modals.createEvent();
export const hideMenu = modals.createEvent();

export const showModalCatalog = modals.createEvent();
export const hideModalCatalog = modals.createEvent();

export const $openMenu = modals
	.createStore(false)
	.on(showMenu, () => true)
	.on(hideMenu, () => false)


export const $openModalCatalog = modals
	.createStore(false)
	.on(showModalCatalog, () => true)
	.on(hideModalCatalog, () => false)
