import { useEffect, useState } from 'react'
// import Arrow from '../assets/Icon/Arrow'
import { highVoltage} from '../assets/images'
import { Navigation } from '../components/Navigation/Navigation'
import { getBalanceUser, saveBalance } from '../http/userApi'


function Home() {
    const [points, setPoints] = useState(0);
    const [energy, setEnergy] = useState(800);
    const [clicks, setClicks] = useState([]);
    const [clickCount, setClickCount] = useState(0);

    const pointsToAdd = 1;
    const energyToReduce = 1;
    const tg_id = "1083689910"; // надо поставить id пользователя из бд

    const balanceUser = async (telegramId) => {
      try {
        const data = await getBalanceUser(telegramId)
        console.log('Данные успешно синхронизированы с сервером, количество монет: ', data);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    // useEffect(() => {
    //   balanceUser(tg_id)
    // }, []);

    useEffect(() => {
      balanceUser(tg_id)
      const savedCoins = localStorage.getItem('balance');
      if (savedCoins) {
        setPoints(parseInt(savedCoins, 10));
      }
    }, []);

    // Функция для синхронизации с сервером
    const syncWithServer = async (telegramId, coins) => {
      try {
        saveBalance(telegramId, coins)
        console.log('Данные успешно синхронизированы с сервером');
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };
  
    const handleClick = (e) => {
        if (energy - energyToReduce < 0) {
          return;
        }
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newClickCount = clickCount + 1;
        const newCoins = Number(points + pointsToAdd)
      
        setClickCount(newClickCount);
        setPoints(points + pointsToAdd);
        setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
        setClicks([...clicks, { id: Date.now(), x, y }]);
        localStorage.setItem('balance', newCoins);
        // Синхронизируем с сервером каждый клик
        if (newClickCount % 1 === 0) {
          syncWithServer(tg_id, newCoins.toString());
        }
    };
  
    const handleAnimationEnd = (id) => {
      setClicks((prevClicks) => prevClicks.filter(click => click.id !== id))
    };
  
    useEffect(()=> {
      const interval = setInterval(()=> {
        setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 800));
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);

    // Синхронизация каждые 30 секунд
    useEffect(() => {
      const interval = setInterval(() => {
        syncWithServer(tg_id, points);
      }, 60000 / 2); // 30000 мс = 30 секунд

      return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, [points]);

      // Запускаем интервал для запроса каждые 10 секунд
    useEffect(() => {
      const interval = setInterval(() => {
        balanceUser(tg_id); // Запрос каждые 10 секунд
      }, 10000); // 10000 мс = 10 секунд

      return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, []);
  
    return (
      <div className='bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium'>
  
        <div className='absolute inset-0 h-1/2 bg-gradient-overlay z-0'></div>
        <div className='absolute inset-0 flex item-center justify-center z-0'></div>
        <div className='radial-gradient-overlay'></div>
  
        <div className='w-full z-10 min-h-screen flex flex-col items-center text-white'>
  
          <div className='fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white'>
            <div className='w-full cursor-pointer'>
              {/* <div className='bg-[#1f1f1f] text-center py-2 rounded-xl' onClick={test}>
                <p className='text-lg'>TNO community <Arrow size={18} className="ml-0 mb-1 inline-block"/> </p>
              </div> */}
            </div>
              <div className="w-full max-w-md bg-[#1E1E1E] rounded-2xl shadow-lg">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-lg">TNO</span>
                    </div>
                    <span className="text-white font-medium text-base">TNO community</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-white font-medium text-base">100,000,000</span>
                  </div>
                </div>
              </div>
            <div className='mt-12 text-5xl font-bold flex items-center'>
              <span className='ml-2'>{points.toLocaleString()}</span>
            </div>
          </div>
  
          <div className='fixed bottom-0 left-0 w-full z-10'>
            <div className='w-full flex justify-between gap-2 px-4 pb-4'>
              <div className='w-1/3 flex items-center justify-start max-w-32'>
                <div className='flex items-center justify-center'>
                  <img src={highVoltage} width={44} height={44} />
                  <div className='ml-2 text-left'>
                    <span className='text-white text-2xl font-bold block'>{energy}</span>
                    <span className='text-white text-large opacity-75'>/ 800</span>
                  </div>
                </div>
              </div>
              {/* <div onClick={test} className='w-1/3 flex items-center justify-end max-w-32 cursor-pointer'>
                <div className='flex items-center justify-center'>
                  <img src={rocket} width={44} height={44} />
                  <div className='ml-2 text-left'>
                    <span className='text-white text-large opacity-75'>Boost</span>
                  </div>
                </div>
              </div> */}
            </div>
            <Navigation />
          </div>

          <div className='flex-grow flex items-center justify-center'>
            <div className='relative mt-4 cursor-pointer coinBtn' onClick={handleClick}>
              <div className="flex items-center justify-center w-64 h-64 bg-[#4a9be2] rounded-full border-2 border-[#3d3d3d] shadow-lg transition-transform duration-300 transform hover:scale-105 glow">
                <h1 className="text-white text-6xl font-bold [text-shadow:_0_8px_8px_rgb(99_102_241_/_0.8)]">TNO</h1>
              </div>
              {/* <img src={tnocoin} width={256} height={256} /> */}
              {clicks.map((click)=> (
                <div
                key={click.id}
                className='absolute text-5xl font-bold opacity-0'
                style={{ top: `${click.y - 42}px`, left: `${click.x - 28}px`, animation: `float 1s ease-out` }}
                onAnimationEnd={()=>handleAnimationEnd(click.id)}
                >
                  1
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    )
}


export default Home;