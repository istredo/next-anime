import { StaticImageData } from 'next/image'

export interface IBannerSlide {
	id?: number
	image: StaticImageData
	title: string
}

export type BannerSlideTooltip = IBannerSlide

