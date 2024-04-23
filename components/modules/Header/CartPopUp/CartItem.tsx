import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DeleteItemBtn from '@/components/elems/DeleteItemBtn'
import { useCartItem } from '@/hooks/useCartItem'
import { ICartItem } from '@/types/cart'
import { ProductCounter } from '../../ProductList/ProductCounter'
import { formatPrice } from '@/lib/utils/commonFunc'

const CartItem = ({ item }: { item: ICartItem }) => {
	const {
		deleteSpinner,
		increasePriceWithAnimation,
		decreasePriceWithAnimation,
		count,
		setCount,
		animatedPrice,
		handleDeleteCartItem
	} = useCartItem(item)
	return (
		<>
			<DeleteItemBtn
				btnDisabled={deleteSpinner}
				callback={handleDeleteCartItem}
			/>
			<div className='cart-list__item__img'>
				<Image src={item.image} alt={item.name} width={96} height={96} />
			</div>
			<div className='cart-list__item__inner'>
				<Link
					href={`/catalog/${item.category}/${item.productId}`}
					className='cart-list__item__title'
				>
					<span>
						{item.name.replace('.', '')}
						{item.size ? ', ' : ''}
					</span>
					<span>{item.size.toLocaleUpperCase()}</span>
				</Link>
				<div className='cart-list__item__bottom'>
					<ProductCounter
						className='cart-list__item__counter'
						count={count}
						setCount={setCount}
						increasePrice={increasePriceWithAnimation}
						decreasePrice={decreasePriceWithAnimation}
						cartItem={item}
						updateCountAsync
					/>
					<span className='cart-list__item__price'>
						{formatPrice(animatedPrice)} ₽
					</span>
				</div>
			</div>
		</>
	)
}

export default CartItem
