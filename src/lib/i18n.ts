import i18n, { type i18n as i18nType } from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../locale/en.json'
import tr from '../locale/tr.json'

const locales = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
}

let instance: i18nType | undefined

const i18nInstance = (lang: string) => {
  if (!instance) {
    i18n.use(initReactI18next).init({
      resources: locales,
      lng: lang,
      supportedLngs: ['en', 'tr'],
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    })
    instance = i18n
  }

  return instance
}

export default i18nInstance
