import { IProductAvailableProps } from '@/types/elems'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/product-list-item/index.module.scss'

export const ProductAvailable = ({ article, inStock }: IProductAvailableProps) => {
	const isInStock = +inStock > 0
	const { lang, translations } = useLang()

	return (
		<div className={styles.product}>
			<span className={`${styles.product__stock} ${isInStock ? styles.product__stock__green : styles.product__stock__red}`}>
				{isInStock
					? translations[lang].product.available
					: translations[lang].product.not_available}
			</span>
			<span className={styles.product__code}>
				{translations[lang].product.article}
				.: {article}
			</span>
		</div>
	)
}

