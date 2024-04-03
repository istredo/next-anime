import Image from 'next/image'
import Link from 'next/link'
import AllLink from '@/components/elems/AllLink'
import usePreloader from '@/hooks/usePreloader'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import styles from '@/styles/main-page/index.module.scss'
import img1 from '@/public/img/jujutsu.jpg'
import img2 from '@/public/img/jujutsu.png'
import img3 from '@/public/img/jujutsu1.png'
import MainSlider from './MainSlider'


export const AboutUs = () => {
	const isMedia490 = useMediaQuery(490)
	const { lang, translations } = useLang()

	const { imgageLoadingHandler, imgSpinner } = usePreloader()
	const imgSpinnerStyle = imgSpinner ? styles.img_loading : ''

	const textWithoutSpace = (text: string) => text.replace(/\s/g, '\u00A0')

	const images = [
		{ src: img1, id: 0, title: translations[lang].main_page.news_arrivals },
		{ src: img2, id: 1, title: translations[lang].main_page.news_look },
		{ src: img3, id: 2, title: translations[lang].main_page.news_idea },
	]

	return (
		<section className={styles.news}>
			<div className={`container ${styles.news__container}`}>
				<h2 className={`site-title ${styles.news__title}`}>
					{translations[lang].main_page.news_title}
				</h2>
				<div className={styles.news__inner}>
					<AllLink />
				</div>
				{!isMedia490 && (
					<ul className={`list-reset ${styles.news__list}`}>
						<li className={styles.news__list__item}>
							<Link
								href='/'
								className={`${styles.news__list__link} ${styles.categories__img} ${imgSpinnerStyle}`}>
								<Image
									src={img1}
									alt={translations[lang].main_page.news_arrivals}
									className='transition-opacity opacity-0 duration'
									onLoad={imgageLoadingHandler}
								/>
								<span>
									{textWithoutSpace(translations[lang].main_page.news_arrivals)}
								</span>
							</Link>
						</li>
						<li className={styles.news__list__item}>
							<Link href='/'
								className={`${styles.news__list__link} ${styles.categories__img} ${imgSpinnerStyle}`}>
								<Image
									src={img2}
									alt={translations[lang].main_page.news_look}
									className='transition-opacity opacity-0 duration'
									onLoad={imgageLoadingHandler}
								/>
								<span>
									{textWithoutSpace(translations[lang].main_page.news_look)}
								</span>
							</Link>
						</li>
						<li className={styles.news__list__item}>
							<Link
								href='/'
								className={`${styles.news__list__link} ${styles.categories__img} ${imgSpinnerStyle}`}>
								<Image
									src={img3}
									alt={translations[lang].main_page.news_idea}
									className='transition-opacity opacity-0 duration'
									onLoad={imgageLoadingHandler}
								/>
								<span>
									{textWithoutSpace(translations[lang].main_page.news_idea)}
								</span>
							</Link>
						</li>
					</ul>
				)}
				{isMedia490 && <MainSlider images={images} />}
			</div>
		</section>
	)
}