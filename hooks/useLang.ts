'use client'

import { useUnit } from "effector-react"
import translationsJson from '@/public/translations/translations.json'
import { $lang } from "@/ctx/lang"


export const useLang = () => {
	const lang = useUnit($lang)
	const translations = translationsJson

	return { lang, translations }
}

