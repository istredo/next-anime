import Link from 'next/link'
import Image from 'next/image'

import { ProductLabel } from './ProductLabel'
import { Dialog } from '@/components/elems/Dialog'
import { ProductItemAction } from '@/components/elems/ProductItemAction'
import { ProductAvailable } from '@/components/elems/ProductAvailable'
import { addOverflowBody, formatPrice, isItemInList } from '@/lib/utils/commonFunc'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/product-list-item/index.module.scss'
import stylesAd from '@/styles/ad/index.module.scss'
import { IProduct } from '@/types/common'
import { IproductListProps } from '@/types/modules'
import { showQuickView } from '@/ctx/modal'
import { setCurrentProduct } from '@/ctx/goods'
import { productsWithoutSizes } from '@/const/product'
import { useCartAction } from '@/hooks/useCartAction'
import { addProductToCartBySizeTable } from '@/lib/utils/cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import React from 'react'


const ProductList = ({ item, title }: IproductListProps) => {
	const { lang, translations } = useLang()
	const isTitleNew = title === translations[lang].main_page.new_title
	const isMedia800 = useMediaQuery(800)
	const { addToCartSpinner, currentCartByAuth, setAddToCartSpinner } = useCartAction()
	const isProductInCart = isItemInList(currentCartByAuth, item._id)

	const randomImage = React.useMemo(() => {
		let currentIndex = item.images.length
		const randomIndex = Math.floor(Math.random() * currentIndex)
		return item.images[randomIndex]
	}, [item.images])


	const quickViewHandler = () => {
		addOverflowBody()
		showQuickView()
		setCurrentProduct(item)
	}
	const addToCart = () => {
		addProductToCartBySizeTable(item, setAddToCartSpinner, 1)
	}
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
							<Image src={randomImage} alt={item.name} className={styles.list__image} width="220"
								height="250" priority={false} />

						</div>
						<p className={styles.list__item_ad__title}>
							<span>
								{translations[lang].main_page.category_office} «Super»{' '}
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
							!isMedia800 &&
							<ProductItemAction text={translations[lang].product.quick_view}
								iconClass='actions__btn_quick_view'
								callback={quickViewHandler} />

						}
					</div>
					<Link
						href={`/catalog/${item.category}/${item._id}`}
						className={styles.list__item__img}>

						<Image src={randomImage} alt={item.name} className={styles.list__image} width="310"
							height="300" priority={false}
						/>

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
					{productsWithoutSizes.includes(item.type)
						? <button onClick={addToCart} className={`btn-reset ${styles.list__item__cart} ${isProductInCart ? styles.list__item__cart_added : ''}`}
							disabled={addToCartSpinner} style={addToCartSpinner ? { minWidth: 125, height: 48 } : {}}>
							{addToCartSpinner ? <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
								: isProductInCart ? translations[lang].product.in_cart : translations[lang].product.to_cart}
						</button>
						: <button className={`btn-reset ${styles.list__item__cart}`} onClick={addToCart}>
							{translations[lang].product.to_cart}
						</button>}

				</li>
			}
		</>
	)
}

export default ProductList
