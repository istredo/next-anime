import React from 'react'

import { useLang } from '@/hooks/useLang';
import { IDialogProps } from '@/types/elems';

import styles from '@/styles/dialog/index.module.scss'

export const Dialog = ({ dialogClassName, dialogRectClassName }: IDialogProps) => {
	const { lang, translations } = useLang()
	const sliceDescription = lang === 'ru' ? 3 : 4;

	return (
		<div className={`${styles.dialog} ${dialogClassName}`}>
			<div className={`${styles.dialog__rect} ${dialogRectClassName}`} />
			<span className={styles.tagline}>
				{translations[lang].main_page.banner_description.slice(0, sliceDescription)}
			</span>
			<br />
			<span className={styles.tagline}>
				{translations[lang].main_page.banner_description.slice(sliceDescription)}
			</span>
		</div>

	)
}

