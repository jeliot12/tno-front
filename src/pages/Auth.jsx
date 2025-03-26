'use client'
import { useEffect, useState } from 'react';
import { registration, login, getBalanceUser } from '../http/userApi';
import WebApp from '@twa-dev/sdk';



function Auth () {
    const uname = "emptygyry";
    const tg_id = "31569431543";
    // const ref = "REF_7E786767"

  
    const handleAuth = async () => {
      try {
        const data = await login(tg_id)
        console.log(data)
      } catch (error) {
        console.log(`Error: ${error}, register an account`)
        const newData = await registration(tg_id, uname)
        console.log(newData)
      }
    };

    const getCountCoin = async () => {
        const data = await login(tg_id)
        console.log(data);
    }

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
  
    // Инициализация и получение данных пользователя
    useEffect(() => {
      // Инициализируем приложение Telegram
      WebApp.ready()
      
      // Проверяем наличие данных пользователя
      if (WebApp.initDataUnsafe.user) {
        const tgUser = WebApp.initDataUnsafe.user
        setUserData({
          id: tgUser.id,
          username: tgUser.username || 'Не указан',
          isPremium: tgUser.is_premium ? 'Да' : 'Нет'
        })
      }
      setLoading(false)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-main px-4 flex flex-col items-center text-white font-medium">
                    <button onClick={handleAuth}>Click me</button>
                    <button onClick={getCountCoin}>Get Balance</button>
                    {loading ? (
                        <div>Загрузка данных...</div>
                    ) : userData ? (
                        <div className="user-data">
                        <h2>Данные пользователя:</h2>
                        <ul>
                            <li>ID: {userData.id}</li>
                            <li>Username: @{userData.username}</li>
                            <li>Премиум: {userData.isPremium}</li>
                        </ul>
                        </div>
                    ) : (
                        <div>Данные пользователя недоступны</div>
                    )}
        </div>
    )
};


export default Auth;