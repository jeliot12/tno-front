import { useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    const app = window.Telegram?.WebApp; // Проверяем наличие Telegram.WebApp
    if (app) {
      app.ready(); // Сообщаем Telegram, что приложение готово
      const user = app.initDataUnsafe.user; // Получаем данные пользователя
      if (user) {
        console.log('ID пользователя:', user.id); // Выводим ID
        console.log('Username:', user.username || 'Не указан'); // Выводим username или "Не указан"
        console.log('Премиум:', user.is_premium ? true : false); // Выводим статус премиум
      } else {
        console.log('Данные пользователя недоступны'); // Если данных нет
      }
    } else {
      console.log('Приложение не запущено в Telegram'); // Если не в Telegram
    }
  }, []);

  return <div>Откройте консоль браузера для просмотра данных</div>;
};

export default Test;