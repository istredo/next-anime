import Slider from 'react-slick'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IQuickView } from '@/types/slider'
import styles from '@/styles/quick-view/index.module.scss'
import { QuickViewArrow } from '@/components/elems/QuickViewArrow'


export const QuickViewSlider = ({ images }: { images: IQuickView[] }) => {

	const settings = {
		dots: true,
		infinite: true,
		slidesToScroll: 1,
		variableWidth: true,
		speed: 500,
		dotsClass: `${styles.slider__slide__dots} list-reset quick-modal-dots`,
		nextArrow: <QuickViewArrow directionClassName={styles.next} />,
		prevArrow: <QuickViewArrow directionClassName={styles.prev} />,
		appendDots: (dots: React.ReactNode) => <ul>{dots}</ul>,
		customPaging: () => (
			<button
				className={`btn-reset ${styles.slider__slide__dot}`}
			/>
		),
	}

	const isMedia1070 = useMediaQuery(1070)
	const isMedia890 = useMediaQuery(890)

	return (
		<Slider {...settings} className={styles.slider}>
			{images.map((item) => (
				<div
					key={item.id}
					style={{ width: isMedia890 ? 270 : isMedia1070 ? 350 : 480 }}
					className={styles.slider__slide}
				>
					<Image src={item.src} alt={item.alt} width={300} height={300} />
				</div>
			))}
		</Slider>
	)
}

