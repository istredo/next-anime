import Link from 'next/link'
import Image from 'next/image'
import SliderTooltip from './SliderTooltip'
import { IBannerSlide } from '@/types/slider'
import styles from '@/styles/main-page/index.module.scss'


const BannerSlide = ({ slide }: { slide: IBannerSlide }) => (
	<>
		<Link href='/catalog' className='banner-slide-plus' />
		<Image
			src={slide.image}
			alt={slide.title}
			className={styles.banner__slider__slide__img}
			loading='eager'
		/>
		<SliderTooltip title={slide.title} image={slide.image} />
	</>
)

export default BannerSlide
