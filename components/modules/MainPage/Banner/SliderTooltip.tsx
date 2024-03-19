import Image from 'next/image'
import { IBannerSlide } from '@/types/slider'
import styles from '@/styles/main-page/index.module.scss'

const SliderTooltip = ({ title, image }: IBannerSlide) => (
	<div className={`${styles.banner__slider__slide__popup} slide-popup`}>
		<span className={styles.banner__slider__slide__popup__arrow} />
		<Image
			className={styles.banner__slider__slide__popup__img}
			src={image}
			alt={title}
		/>
		<p className={styles.banner__slider__slide__popup__inner}>
			<b className={styles.banner__slider__slide__popup__title}>{title}</b>
			<span className={styles.banner__slider__slide__popup__price}>2760 ₽</span>
		</p>
	</div>
)

export default SliderTooltip
