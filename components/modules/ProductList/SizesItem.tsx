'use client'

import styles from '@/styles/quick-view/index.module.scss'
import { ISizesItemProps } from '@/types/goods'
export const SizesItem = ({
	currentSize,
	selectSize,
	setSelectSize,
	currentCartItems,
}: ISizesItemProps) => {
	const sizeHandler = () => setSelectSize(currentSize[0])

	return (
		<li
			className={`${styles.info__sizes__item} ${currentSize[1]
				? ''
				: styles.info__sizes__item__na
				}`}
			style={{
				backgroundColor:
					currentSize[0] === selectSize
						? '#009b77'
						: 'rgba(255, 255, 255, 0.10)',
			}}
		>
			<button className='btn-reset' onClick={sizeHandler}>
				{currentSize[0].toLocaleUpperCase()}
			</button>
		</li>
	)
}


