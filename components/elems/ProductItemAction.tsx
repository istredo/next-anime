import React, { MutableRefObject } from 'react'
import styles from '@/styles/productItemAction/index.module.scss'
import stylesTooltip from '@/styles/tooltip/index.module.scss'
import { IProductItemActionProps } from '@/types/elems'
import { AnimatePresence, motion } from 'framer-motion'
import { Tooltip } from './Tooltip'


export const ProductItemAction = ({
	text,
	callback,
	iconClass,
	withTooltip = true,
	marginBottom,
}: IProductItemActionProps) => {
	const [open, setOpen] = React.useState(false)
	const [tooltipLeft, setTooltipLeft] = React.useState(0)
	const showTooltip = () => setOpen(true)
	const hideTooltip = () => setOpen(false)
	const tooltipRef = React.useRef() as MutableRefObject<HTMLDivElement>


	React.useEffect(() => {
		if (open && withTooltip) {
			setTooltipLeft(tooltipRef.current.clientWidth)
		}
	}, [open, withTooltip])
	return (
		<div className={styles.actions}>
			<button
				className={`btn-reset ${styles.actions__btn} ${styles[iconClass]}`}
				style={{ marginBottom: marginBottom || 16 }}
				onClick={callback}
				onMouseEnter={showTooltip}
				onMouseLeave={hideTooltip} />
			{withTooltip && (
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className={stylesTooltip.tooltip}
							style={{ left: `-${tooltipLeft + 13}px` }}
							ref={tooltipRef}
						>
							<Tooltip text={text} />
						</motion.div>
					)}
				</AnimatePresence>
			)}
		</div>
	)
}

