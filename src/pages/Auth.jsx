import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {registration} from "../http/UserAPI"

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  // Имитация загрузки (замените на реальную логику загрузки)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //       navigate('/home', { replace: true });
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  // Пример загрузки данных

  useEffect(() => {
    const loadData = async () => {
      const app = window.Telegram?.WebApp; // Проверяем наличие Telegram.WebApp
      if (app) {
        app.ready(); // Сообщаем Telegram, что приложение готово
        const user = app.initDataUnsafe.user; // Получаем данные пользователя
        if (user) {
          const telegramId = user.id;
          const username = user.username;
          // console.log('Премиум:', user.is_premium ? true : false);
          await registration(telegramId.toString(), username);
        } else {
          console.log('Данные пользователя недоступны'); // Если данных нет
        }
      } else {
        console.log('Приложение не запущено в Telegram'); // Если не в Telegram
      }
       // Ваша функция загрузки данных
      navigate('/home', { replace: true });
    };
    
    loadData();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-main text-white font-medium">

      <div className="relative">
        <div className="h-24 w-24 rounded-full border-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-8 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
      <h1 className="mt-6 text-3xl font-bold text-white">Загружаем приложение</h1>
      <p className="mt-2 text-white">Это займет всего несколько секунд</p>
      <div className="mt-8 w-64 bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full animate-progress"></div>
      </div>
    </div>
  );
};

export default Auth;