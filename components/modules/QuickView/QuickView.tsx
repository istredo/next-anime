import { hideQuickView } from '@/ctx/modal'
import { formatPrice, removeOverflowBody } from '@/lib/utils/commonFunc'
import styles from '@/styles/quick-view/index.module.scss'
import { QuickViewSlider } from './QuickViewSlider'
import { useCartAction } from '@/hooks/useCartAction'
import { useProductImages } from '@/hooks/useProductImages'
import { IProduct } from '@/types/common'
import { ProductAvailable } from '@/components/elems/ProductAvailable'
import ProductColor from '../ProductList/ProductColor'
import ProductComposition from '../ProductList/ProductComposition'


export const QuickView = () => {
	const product = useCartAction()
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
			<div className={styles.modal__left}>
				<QuickViewSlider images={images} />
			</div>
			<div className={styles.modal__right}>
				<h3 className={styles.modal__right__title}>{product.name}</h3>
				<div className={styles.modal__right__price}>
					{formatPrice(+product.price)} ₽
				</div>
				<div className={styles.modal__right__info}>
					<ProductAvailable
						article={product.article}
						inStock={+product.inStock}
					/>
					{product.characteristics?.color && <ProductColor color={product.characteristics.color} />}
					{product.characteristics?.composition && (
						<ProductComposition
							composition={product.characteristics.composition} />
					)}
				</div>
			</div>
		</div>
	)
}