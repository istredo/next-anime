import { useUnit } from 'effector-react';
import React from 'react';
import MainPageSection from './MainPageSection';
import { getNewProductsFx } from '@/api/main-page';
import { $newProducts } from '@/ctx/goods';
import { useLang } from '@/hooks/useLang';

export const NewGoods = () => {
	const goods = useUnit($newProducts);
	const spinner = useUnit(getNewProductsFx.pending);
	const { lang, translations } = useLang();
	return (
		<MainPageSection
			title={translations[lang].main_page.new_title}
			goods={goods}
			spinner={spinner} />
	);
};
