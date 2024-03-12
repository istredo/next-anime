'use client'
import { AllowedLanguages } from "@/const/lang";
import { createDomain } from "effector";

const lang = createDomain()

export const setLang = lang.createEvent<AllowedLanguages>()

export const $lang = lang.createStore(AllowedLanguages.RU).on(setLang, (_, lang) => lang)