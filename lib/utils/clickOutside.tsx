'use client'
import React, {
	ForwardRefExoticComponent,
	MutableRefObject,
	RefAttributes,
} from 'react'
import { IWrappedComponentProps } from '@/types/modules'


export function clickOutside(
	WrappedComponent: ForwardRefExoticComponent<
		IWrappedComponentProps & RefAttributes<HTMLDivElement>
	>
) {
	const Component = () => {
		const [open, setOpen] = React.useState(false)
		const ref = React.useRef() as MutableRefObject<HTMLDivElement>

		React.useEffect(() => {
			const ClickOutsideHandler = (e: MouseEvent) => {
				if (!ref.current.contains(e.target as HTMLDivElement)) {
					setOpen(false)
				}
			}

			document.addEventListener('mousedown', ClickOutsideHandler)

			return () => document.removeEventListener('mousedown', ClickOutsideHandler)
		}, [ref])

		return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
	}

	return Component
}
