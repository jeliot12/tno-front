import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {registration, checkUserOnDB, login} from "../http/UserAPI"

function Auth() {
  const navigate = useNavigate();

  const checkUser = async (telegramId, username) => {
    const data = await checkUserOnDB(telegramId, username);
    if (data === true){
      await login(telegramId)
    }else {
      await registration(telegramId, username)
    }
  };

  // Пример загрузки данных

  useEffect(() => {
    const loadData = async () => {
      const app = window.Telegram?.WebApp;
      if (app) {
        app.ready();
        const user = app.initDataUnsafe.user;
        if (user) {
          const telegramId = user.id;
          const username = user.username;
          localStorage.setItem("id", telegramId.toString());
          localStorage.setItem("username", username);
          //console.log('Премиум:', user.is_premium ? true : false);
          await checkUser(telegramId.toString(), username);
        } else {
          console.log('Данные пользователя недоступны');
        }
      } else {
        console.log('Приложение не запущено в Telegram');
      }
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