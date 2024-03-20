'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

import { useLang } from '@/hooks/useLang'
import styles from '@/styles/main-page/index.module.scss'
import image1 from '@/public/img/tuna.png'
import image2 from '@/public/img/gojo2.png'
import image3 from '@/public/img/gojo3.png'
import BannerSlide from './BannerSlide'


const Banner = () => {
	const { lang, translations } = useLang()
	const sliceDescription = lang === 'ru' ? 3 : 4;


	const slides = [
		{
			id: 1,
			title: `${translations[lang].main_page.sports_suit} «Tuna» ${translations[lang].main_page.black}`,
			image: image1,
		},
		{
			id: 2,
			title: `${translations[lang].main_page.houdie} «Gojo» ${translations[lang].main_page.white}`,
			image: image2,
		},
		{
			id: 3,
			title: `${translations[lang].main_page.suit} «Gojo» ${translations[lang].main_page.black}`,
			image: image3,
		},

	]
	const handleSlideClick = (e: SwiperType) => e.slideTo(e.clickedIndex)

	return (
		<section className={styles.banner}>
			<h1 className='visually-hidden'>
				{translations[lang].main_page.banner_hidden_title}
			</h1>
			<div className={`container ${styles.banner__container}`}>
				<span className={styles.ad}>{translations[lang].common.ad}</span>
				<Swiper
					className={styles.banner__slider}
					effect='coverflow'
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 100,
						modifier: 2.5,
					}}
					slidesPerView='auto'
					initialSlide={2}
					// autoplay
					// loop
					onClick={handleSlideClick}
					modules={[EffectCoverflow]}
					grabCursor
					centeredSlides
				>
					{slides.map((slide) => (
						<SwiperSlide className={styles.banner__slider__slide} key={slide.id}>
							<BannerSlide slide={slide} />
						</SwiperSlide>
					))}
				</Swiper>
				<div className={styles.banner__subtitle}>
					<div className={styles.banner__subtitle__rect} />
					<span className={styles.tagline}>
						{translations[lang].main_page.banner_description.slice(0, sliceDescription)}
					</span>
					<br />
					<span className={styles.tagline}>
						{translations[lang].main_page.banner_description.slice(sliceDescription)}
					</span>
				</div>
				<h2 className={styles.banner__title}>
					<span
						className={`${styles.banner__title__subtitle} ${lang === 'ru' ? '' : styles.banner__title__subtitle_lang
							}`}
					>
						[ {translations[lang].main_page.banner_subtitle} ]
					</span>
					<span className={styles.banner__title__text}>
						{translations[lang].main_page.banner_title}
					</span>
				</h2>
			</div>
		</section >
	)
}


export default Banner
