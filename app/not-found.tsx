'use client'
import { useLang } from "@/hooks/useLang";
import Link from "next/link";

export default function Error() {
	const { lang, translations } = useLang()
	return (
		<div className="container">
			<h2>{translations[lang].common.not_found_title}</h2>
			<Link href='/
			' className='cart-popup__footer__link'>
				{translations[lang].common.back_to_main}
			</Link>
		</div>
	)
}