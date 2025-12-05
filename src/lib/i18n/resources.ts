import en from '@/translations/en.json';
import zh from '@/translations/zh.json';

export const resources = {
  zh: {
    translation: zh,
  },
  en: {
    translation: en,
  },
};

export type Language = keyof typeof resources;
