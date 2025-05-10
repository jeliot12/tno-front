import { format, parseISO } from 'date-fns';
import { enUS, ru } from 'date-fns/locale'; // Добавьте нужные локали

const localeMap = {
  en: enUS,
  ru: ru,
  // добавьте другие локали по необходимости
};

export default function SmartDate({ dateString, locale }) {
  // Определяем локаль: из пропсов → из браузера → дефолтная (en)
  const detectedLocale = locale || 
                       (typeof navigator !== 'undefined' ? navigator.language : 'en');
  const localeKey = detectedLocale.split('-')[0];
  const selectedLocale = localeMap[localeKey] || enUS;

  try {
    const date = parseISO(dateString);
    return <>{format(date, 'd MMMM HH:mm', { locale: selectedLocale })}</>;
  } catch (e) {
    console.error('Invalid date format:', dateString);
    return <>{dateString}</>; // Fallback на исходную строку при ошибке
  }
}