import { createDomain } from "effector";

const modals = createDomain()

export const showMenu = modals.createEvent();
export const hideMenu = modals.createEvent();

export const $openMenu = modals
	.createStore(false)
	.on(showMenu, () => true)
	.on(hideMenu, () => false)
