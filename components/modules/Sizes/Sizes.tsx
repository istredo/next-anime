import React from "react"
import { useUnit } from "effector-react"
import { closeSizeTable } from "@/lib/utils/commonFunc"
import { useCartAction } from "@/hooks/useCartAction"
import { useLang } from "@/hooks/useLang"
import { $setSizes } from "@/ctx/sizeTable"
import { $modalQuickView } from "@/ctx/modal"
import styles from '@/styles/sizes/index.module.scss'
import { CartButton } from "../ProductList/CartButton"




export const Sizes = () => {
	const { lang, translations } = useLang()
	const [sizeS, setSizeS] = React.useState(false)
	const [sizeM, setSizeM] = React.useState(false)
	const [sizeL, setSizeL] = React.useState(false)
	const [sizeXl, setSizeXl] = React.useState(false)
	const [sizeXxl, setSizeXxl] = React.useState(false)
	const { selectSize, setSelectSize, product } = useCartAction()
	const productSizes = useUnit($setSizes)
	const quickView = useUnit($modalQuickView)
	const isHat = productSizes.type === 'headdress'
	const sizeSHandler = () => {
		setSelectSize('s')
		setSizeS(true)
		setSizeM(false)
		setSizeL(false)
		setSizeXl(false)
		setSizeXxl(false)
	}
	const sizeMHandler = () => {
		setSelectSize('m')
		setSizeS(false)
		setSizeM(true)
		setSizeL(false)
		setSizeXl(false)
		setSizeXxl(false)
	}
	const sizeLHandler = () => {
		setSelectSize('l')
		setSizeS(false)
		setSizeM(false)
		setSizeL(true)
		setSizeXl(false)
		setSizeXxl(false)
	}
	const sizeXlHandler = () => {
		setSelectSize('xl')
		setSizeS(false)
		setSizeM(false)
		setSizeL(false)
		setSizeXl(true)
		setSizeXxl(false)
	}
	const sizeXxlHandler = () => {
		setSelectSize('xxl')
		setSizeS(false)
		setSizeM(false)
		setSizeL(false)
		setSizeXl(false)
		setSizeXxl(true)
	}
	const headdressSizes = [
		{
			id: 1,
			headCircumference: '55',
			manufacturerSize: 'S',
			selectHandler: sizeSHandler,
			isSelected: sizeS,
			isAvailable: productSizes.sizes.s,
			isInFavorites: false,
		},
		{
			id: 2,
			headCircumference: '56-57',
			manufacturerSize: 'M',
			selectHandler: sizeMHandler,
			isSelected: sizeM,
			isAvailable: productSizes.sizes.m,
			isInFavorites: false,
		},
		{
			id: 3,
			headCircumference: '58-59',
			manufacturerSize: 'L',
			selectHandler: sizeLHandler,
			isSelected: sizeL,
			isAvailable: productSizes.sizes.l,
			isInFavorites: false,
		},
		{
			id: 4,
			headCircumference: '60-61',
			manufacturerSize: 'XL',
			selectHandler: sizeXlHandler,
			isSelected: sizeXl,
			isAvailable: productSizes.sizes.xl,
			isInFavorites: false,
		},
		{
			id: 5,
			headCircumference: '62-63',
			manufacturerSize: 'XXL',
			selectHandler: sizeXxlHandler,
			isSelected: sizeXxl,
			isAvailable: productSizes.sizes.xxl,
			isInFavorites: false,
		},
	]
	const dressSizes = [
		{
			id: 1,
			russianSize: '44-46',
			manufacturerSize: 'S',
			bust: '78-82',
			waist: '58-62',
			hipGirth: '86-90',
			selectHandler: sizeSHandler,
			isSelected: sizeS,
			isAvailable: productSizes.sizes.s,
			isInFavorites: false,
		},
		{
			id: 2,
			russianSize: '48-50',
			manufacturerSize: 'M',
			bust: '82-86',
			waist: '62-66',
			hipGirth: '90-94',
			selectHandler: sizeMHandler,
			isSelected: sizeM,
			isAvailable: productSizes.sizes.m,
			isInFavorites: false,
		},
		{
			id: 3,
			russianSize: '50',
			manufacturerSize: 'L',
			bust: '86-90',
			waist: '66-70',
			hipGirth: '94-98',
			selectHandler: sizeLHandler,
			isSelected: sizeL,
			isAvailable: productSizes.sizes.l,
			isInFavorites: false,
		},
		{
			id: 4,
			russianSize: '52-54',
			manufacturerSize: 'XL',
			bust: '90-94',
			waist: '70-74',
			hipGirth: '98-102',
			selectHandler: sizeXlHandler,
			isSelected: sizeXl,
			isAvailable: productSizes.sizes.xl,
			isInFavorites: false,
		},
		{
			id: 5,
			russianSize: '56',
			manufacturerSize: 'XXL',
			bust: '94-98',
			waist: '74-78',
			hipGirth: '102-106',
			selectHandler: sizeXxlHandler,
			isSelected: sizeXxl,
			isAvailable: productSizes.sizes.xxl,
			isInFavorites: false,
		},
	]

	const closeSizeHandler = () => closeSizeTable(quickView)
	const trProps = (
		item:
			| {
				id: number
				russianSize: string
				manufacturerSize: string
				bust: string
				waist: string
				hipGirth: string
				selectHandler: () => void
				isSelected: boolean
				isAvailable: boolean
			}
			| {
				id: number
				headCircumference: string
				manufacturerSize: string
				selectHandler: () => void
				isSelected: boolean
				isAvailable: boolean
			}
	) => ({
		onClick: item.selectHandler,
		style: {
			backgroundColor:
				item.isSelected || selectSize === item.manufacturerSize.toLowerCase()
					? 'green'
					: 'transparent',
			pointerEvents: item.isAvailable ? 'auto' : 'none',
			opacity: item.isAvailable ? 1 : 0.5,
			color: item.isAvailable ? '#fff' : 'rgba(255, 255, 255, .2)',
		},
	})
	return (
		<div className={`${styles.size_table} ${isHat ? styles.size_table_headdress : ''}`}>
			<button className={`btn-reset ${styles.size_table__close}`} onClick={closeSizeHandler} />
			<h2 className={styles.size_table__title}>{translations[lang].size_table.title}</h2>
			<div className={styles.size_table__inner}>
				<table className={styles.size_table__table}>
					<thead>
						{isHat ? (
							<tr>
								<th>{translations[lang].size_table.head_circumference}</th>
								<th>{translations[lang].size_table.size}</th>
							</tr>
						) : (
							<tr>
								<th>{translations[lang].size_table.russian_size}</th>
								<th>{translations[lang].size_table.manufacturer_size}</th>
								<th>{translations[lang].size_table.chest_circumference}</th>
								<th>{translations[lang].size_table.waist_circumference}</th>
								<th>{translations[lang].size_table.hip_circumference}</th>
							</tr>
						)}
					</thead>
					<tbody>
						{isHat
							? headdressSizes.map((item) => (
								<tr key={item.id} {...(trProps(item) as React.HTMLAttributes<HTMLTableRowElement>)}>
									<td>{item.headCircumference}</td>
									<td>{item.manufacturerSize}</td>
								</tr>))
							: dressSizes.map((item) => (
								<tr key={item.id}  {...(trProps(item) as React.HTMLAttributes<HTMLTableRowElement>)}>
									<td>{item.russianSize}</td>
									<td>{item.manufacturerSize}</td>
									<td>{item.bust}</td>
									<td>{item.waist}</td>
									<td>{item.hipGirth}</td>
								</tr>))
						}
					</tbody>
				</table>
			</div>
			<CartButton
				className={styles.size_table__btn}
				text={translations[lang].product.to_cart} />
		</div>
	)
}

