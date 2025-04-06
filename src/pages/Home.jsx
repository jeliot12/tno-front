import { useEffect, useState } from 'react'
import { highVoltage} from '../assets/images'
import { Navigation } from '../components/Navigation/Navigation'
import { getBalanceUser, saveBalance } from '../http/UserAPI'


function Home() {
    const [points, setPoints] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [maxEnergy, setMaxEnergy] = useState(800);
    const [wsConnected, setWsConnected] = useState(false);
    const [clicks, setClicks] = useState([]);
    const [clickCount, setClickCount] = useState(0);

    const pointsToAdd = 1;
    const energyToReduce = 1;
    const telegramId = "1083689910"; // надо поставить id пользователя из бд

    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8176');
  
      ws.onopen = () => {
        console.log('WebSocket connected');
        setWsConnected(true);
        ws.send(JSON.stringify({ telegramId }));
      };
  
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setEnergy(data.energy);
        setMaxEnergy(data.maxEnergy);
      };
  
      ws.onclose = () => {
        console.log('WebSocket disconnected, reconnecting...');
        setWsConnected(false);
        setTimeout(connectWebSocket, 1000);
      };
  
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      return ws;
    };
  
    useEffect(() => {
      const ws = connectWebSocket();
      return () => ws.close();
    }, []);

    const balanceUser = async (telegramId) => {
      try {
        const data = await getBalanceUser(telegramId)
        console.log('Данные успешно синхронизированы с сервером, количество монет: ', data);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    useEffect(() => {
      balanceUser(telegramId)
      const savedCoins = localStorage.getItem('balance');
      if (savedCoins) {
        setPoints(parseInt(savedCoins, 10));
      }
    }, []);

    // Функция для синхронизации с сервером
    const syncWithServer = async (id, coinCount) => {
      const response = await fetch(`http://yusupovjasur12151.fvds.ru:4000/api/energy/user/${id}/click`, {
        method: 'POST',
        body: JSON.stringify({balance: coinCount})
      });
      if (response.ok) {
        const data = await response.json();
        setEnergy(data.energy);
      }
      await saveBalance(id, coinCount);
    };


  
    const handleClick = (e) => {
      // e.preventDefault();
      if (energy - energyToReduce < 0) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const newCoins = points + pointsToAdd;
      const newClickCount = clickCount + e.touches.length;

      // Обрабатываем каждое касание
      Array.from(e.touches).forEach(touch => {
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;
          
          setClicks(prev => [...prev, { 
              id: Date.now() + Math.random(), 
              x, 
              y 
          }]);
      });

      setClickCount(prev => prev + e.touches.length);
      setPoints(prev => prev + (pointsToAdd * e.touches.length));
      setEnergy(prev => Math.max(prev - (energyToReduce * e.touches.length), 0));
      
      if (newClickCount % 1 === 0) {
          syncWithServer(telegramId, newCoins);
      }
    };
  
    const handleAnimationEnd = (id) => {
      setClicks((prevClicks) => prevClicks.filter(click => click.id !== id))
    };
  
    useEffect(()=> {
      const interval = setInterval(()=> {
        setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 800));
      }, 20000);
  
      return () => clearInterval(interval);
    }, []);

    // Синхронизация каждые 30 секунд
    useEffect(() => {
      const interval = setInterval(() => {
        syncWithServer(telegramId, points);
      }, 60000 / 2); // 30000 мс = 30 секунд

      return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, [points]);

    // Запускаем интервал для запроса каждые 10 секунд
    useEffect(() => {
      const interval = setInterval(() => {
        balanceUser(telegramId); // Запрос каждые 10 секунд
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
                    <div className="w-2 h-2 bg-[#4a9be2] rounded-full"></div>
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
                    <span className='text-white text-large opacity-75'>/ {maxEnergy}</span>
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
            <div className='relative mt-4 cursor-pointer coinBtn' onTouchStart={handleClick}
                onContextMenu={(e) => e.preventDefault()} disabled={energy <= 0}>
              <div className="flex items-center justify-center w-64 h-64 bg-[#4a9be2] rounded-full border-2 border-[#3d3d3d] shadow-lg transition-transform duration-300 transform hover:scale-105 glow">
                <h1 className="text-white text-6xl font-bold [text-shadow:_0_8px_8px_rgb(99_102_241_/_0.8)]">TNO</h1>
              </div>
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
