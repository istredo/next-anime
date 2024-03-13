export const removeOverflowBody = () => {
	const body = document.querySelector('body') as HTMLBodyElement;
	body.classList.remove('overflow-hidden');
}
export const addOverflowBody = () => {
	const body = document.querySelector('body') as HTMLBodyElement;
	body.classList.add('overflow-hidden');
}