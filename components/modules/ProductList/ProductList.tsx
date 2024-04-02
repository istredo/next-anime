import Link from 'next/link'
import Image from 'next/image'

import { ProductLabel } from './ProductLabel'
import { Dialog } from '@/components/elems/Dialog'
import { ProductItemAction } from '@/components/elems/ProductItemAction'
import { ProductAvailable } from '@/components/elems/ProductAvailable'
import { formatPrice } from '@/lib/utils/commonFunc'
import { IproductListProps } from '@/types/modules'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/product-list-item/index.module.scss'
import stylesAd from '@/styles/ad/index.module.scss'
import { IProduct } from '@/types/common'


const ProductList = ({ item, title }: IproductListProps) => {
	const { lang, translations } = useLang()
	const isTitleNew = title === translations[lang].main_page.new_title
	const isMedia800 = useMediaQuery(800)

	const randomImage = (item: IProduct) => {
		let currentIndex = item.images.length
		const randomIndex = Math.floor(Math.random() * currentIndex)
		return item.images[randomIndex]
	}

	const getRandomValue = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
	const lineImages = [
		'/img/office/note.png',
		'/img/office/note1.png',
		'/img/office/note2.png',

	]

	console.log(getRandomValue(lineImages))

	return (
		<>
			{item.characteristics.collection === 'line' && item.type === 't-shirt' ?
				<li className={styles.list__item_ad}>
					<Link href={`/catalog/${item.category}/${item._id}`} className={styles.list__item_ad__inner}>
						<span className={`${stylesAd.ad} ${styles.list__item_ad__ad}`}>
							{translations[lang].common.ad}
						</span>
						<Dialog dialogClassName={styles.list__item_ad__dialog} dialogRectClassName={styles.list__item_ad__dialog__rect} />
						<div className={styles.list__item_ad__img}>
							<Image src={item.images[0]} alt={item.name} className={styles.list__image} fill />
						</div>
						<p className={styles.list__item_ad__title}>
							<span>
								{translations[lang].main_page.category_office} «Super»{' '}
								{/* {
									//@ts-ignore
									translations[lang].main_page[item.images[0].split('/img/').join('').split('-')[0]]
								} */}
							</span>
							<span>{formatPrice(+item.price)}₽</span>
						</p>
					</Link>
				</li>
				:
				<li className={styles.list__item}>
					{title ? (
						<span
							className={`${styles.list__item__label} ${isTitleNew
								? styles.list__item__new
								: styles.list__item__bestseller
								}`}
						>
							{isTitleNew
								? translations[lang].main_page.is_new
								: translations[lang].main_page.is_bestseller}
						</span>
					) : !item.isNew && !item.isBestseller ? (
						''
					) : (
						<ProductLabel isBestseller={item.isBestseller} isNew={item.isNew} />
					)}
					<div className={styles.list__item__actions}>
						<ProductItemAction text={translations[lang].product.add_to_favorites} iconClass='actions__btn_favorite' />
						<ProductItemAction text={translations[lang].product.add_to_comparison} iconClass='actions__btn_comparison' />
						{
							!isMedia800 && <ProductItemAction text={translations[lang].product.quick_view} iconClass='actions__btn_quick_view' />

						}
					</div>
					<Link
						href={`/catalog/${item.category}/${item._id}`}
						className={styles.list__item__img}>
						<Image src={randomImage(item)} alt={item.name} fill />
					</Link>
					<div className={styles.list__item__inner}>
						<h3 className={styles.list__item__title}>
							<Link href={`/catalog/${item.category}/${item._id}`}>
								{item.name}
							</Link>
						</h3>
						<ProductAvailable
							article={item.article}
							inStock={+item.inStock}
						/>
						<span className={styles.list__item__price}>
							{formatPrice(+item.price)} ₽
						</span>
					</div>
					<button className={`btn-reset ${styles.list__item__cart}`}>
						{translations[lang].product.to_cart}
					</button>
				</li>
			}
		</>
	)
}

export default ProductList
