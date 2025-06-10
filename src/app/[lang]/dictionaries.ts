import 'server-only'

export type Locale = keyof typeof dictionaries

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  vi: () => import('./dictionaries/vi.json').then((module) => module.default),
}

// export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export const getDictionary = async (locale: Locale) => {
  return locale == 'vi' ? dictionaries.vi() : dictionaries.en();
};