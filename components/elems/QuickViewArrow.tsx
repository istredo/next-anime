import styles from '@/styles/quick-view/index.module.scss'
import { IQuickViewArrowProps } from '@/types/elems'

export const QuickViewArrow = (props: IQuickViewArrowProps) => (
	<button
		className={`btn-reset ${styles.slider__slide__arrow} ${props.directionClassName} `}
		onClick={props.onClick}
	/>
)
