import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    // Имитация загрузки (замените на реальную логику загрузки)
    const timer = setTimeout(() => {
        navigate('/home', { replace: true }); // Редирект на основную страницу
    }, 3000); // 3 секунды загрузки

    return () => clearTimeout(timer);
  }, [navigate]);

  // загрузка реальных данных

  // useEffect(() => {
  //   // Пример загрузки данных
  //   const loadData = async () => {
  //     await fetchData(); // Ваша функция загрузки данных
  //     navigate('/main');
  //   };
    
  //   loadData();
  // }, [navigate]);

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