import { StaticImageData } from 'next/image'

export interface IBannerSlide {
	id?: number
	image: StaticImageData
	title: string
}
export interface IQuickView {
	src: string
	alt: string
	id: string
}

export type BannerSlideTooltip = IBannerSlide

