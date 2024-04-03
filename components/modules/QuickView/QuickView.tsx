import Link from 'next/link'
import { hideQuickView } from '@/ctx/modal'
import { formatPrice, removeOverflowBody } from '@/lib/utils/commonFunc'
import { useCartAction } from '@/hooks/useCartAction'
import { useLang } from '@/hooks/useLang'
import { useProductImages } from '@/hooks/useProductImages'
import { QuickViewSlider } from './QuickViewSlider'
import { ProductAvailable } from '@/components/elems/ProductAvailable'
import { ProductColor } from '../ProductList/ProductColor'
import { ProductComposition } from '../ProductList/ProductComposition'
import { SizesItem } from '../ProductList/SizesItem'
import { SizeTableBtn } from '../ProductList/SizeTableBtn'
import { ProductCounter } from '../ProductList/ProductCounter'
import { CartButton } from '../ProductList/CartButton'

import styles from '@/styles/quick-view/index.module.scss'
import stylesItem from '@/styles/product-list-item/index.module.scss'
import { ProductItemAction } from '@/components/elems/ProductItemAction'

export const QuickView = () => {
	const { product, selectSize, setSelectSize } = useCartAction()
	const { lang, translations } = useLang()
	const images = useProductImages(product)
	const modalHandler = () => {
		removeOverflowBody()
		hideQuickView()
	}

	return (
		<div className={styles.modal}>
			<button
				className={`btn-reset ${styles.modal__close}`}
				onClick={modalHandler}
			/>
			<div className={styles.modal__actions}>
				<ProductItemAction text={translations[lang].product.add_to_favorites} iconClass='actions__btn_favorite' />
				<ProductItemAction text={translations[lang].product.add_to_comparison} iconClass='actions__btn_comparison' />


			</div>
			<div className={styles.modal__left}>
				<QuickViewSlider images={images} />
			</div>
			<div className={styles.modal__right}>
				<h3 className={styles.modal__right__title}>{product.name}</h3>
				<div className={styles.modal__right__price}>
					{formatPrice(+product.price)} ₽
				</div>
				<div className={styles.info}>
					<ProductAvailable
						article={product.article}
						inStock={+product.inStock}
					/>
					{product.characteristics?.color && <ProductColor color={product.characteristics.color} />}
					{product.characteristics?.composition && (
						<ProductComposition
							composition={product.characteristics.composition} />
					)}
					{Object.keys(product.sizes).length ? (
						<div className={styles.info__size}>
							<div className={styles.info__size__inner}>
								<span className={stylesItem.product__size_title}>
									{translations[lang].catalog.size}
								</span>
								<SizeTableBtn
									sizes={product.sizes}
									type={product.type}
									className={`sizes-table-btn ${styles.info__sizes_btn}`}
								/>
							</div>
							<ul className={`list-reset ${styles.info__sizes}`}>
								{Object.entries(product.sizes).map(([key, value], i) => (
									<SizesItem
										key={i}
										currentSize={[key, value]}
										selectSize={selectSize}
										setSelectSize={setSelectSize}
										currentCartItems={[]}
									/>
								))}
							</ul>
						</div>
					) : (
						''
					)}
					<div className={styles.bottom}>
						<span className={stylesItem.product__count_title}>
							{translations[lang].product.count}
						</span>
						<div className={styles.bottom__inner}>

							<div className={styles.bottom__inner}>
								{!!selectSize ?
									(
										<ProductCounter
											className={`counter ${styles.bottom__counter}`}
											count={0}
										/>
									) : (
										<div
											className={`counter ${styles.bottom__counter}`}
											style={{ justifyContent: 'center' }}
										>
											<span> {translations[lang].product.total_in_cart} 0</span>
										</div>
									)}
								<CartButton
									className={styles.bottom__add}
									text={translations[lang].product.to_cart} />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.more}>
					<Link
						href={`/catalog/${product.category}/${product._id}`}
						className={styles.more__link}
						onClick={modalHandler}
					>
						{translations[lang].product.more}
					</Link>
				</div>
			</div>
		</div>
	)
}