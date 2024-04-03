import { ICounterProps } from '@/types/goods'

export const ProductCounter = ({ className, count }: ICounterProps) => {
	return (
		<div className={className}>
			<button className='btn-reset' />
			<span>{count}</span>
			<button className='btn-reset' />
		</div>
	)
}


