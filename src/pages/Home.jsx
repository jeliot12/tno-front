import { useEffect, useState, useRef } from 'react'
import { highVoltage} from '../assets/images'
import { Navigation } from '../components/Navigation/Navigation'
import axios from 'axios'
import {getIdentification} from '../http/UserAPI';
import {getClanMain} from '../http/SquadAPI';

const API_URL = 'http://localhost:4000/api';

function Home() {
    const [coins, setCoins] = useState(0);
    const [activeClicks, setActiveClicks] = useState([]);
    const [clickPosition, setClickPosition] = useState({x: 0, y: 0});
    const [animations, setAnimations] = useState([]);
    const [coinTexts, setCoinTexts] = useState([]);
    const [clanId, setClanId] = useState()
    const [nameClan, setClanName] = useState('')
    const [clanTotalCount, setClanCount] = useState('')

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const circleRef = useRef(null);
    const lastClickTimeRef = useRef(0);
    const clickCooldown = 200;
    const animationRefs = useRef({});
    const animationDuration = 300;
    const coinsPerClick = 1;

    const [energy, setEnergy] = useState(800);
    const [maxEnergy, setMaxEnergy] = useState(800);
    const [wsConnected, setWsConnected] = useState(false);


    
    const telegramId = "1083689910"; // надо поставить id пользователя из бд
    const username = "qwqwqrw";
    // const telegramId = localStorage.getItem("id").toString();
    // const username = localStorage.getItem("username").toString();

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

    // Функция для синхронизации с сервером
    const syncWithServer = async (id) => {
      const response = await fetch(`http://localhost:4000/api/energy/user/${id}/click`, {
        method: 'POST'
      });
      if (response.ok) {
        const data = await response.json();
        setEnergy(data.energy);
      }
    };


  
    // Загрузка данных при монтировании
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/coins/${telegramId}`);
          setCoins(response.data.balance || 0);
          setIsLoading(false);
        } catch (err) {
          console.error('Error loading coins:', err);
          setError('Failed to load data');
          setIsLoading(false);
        }
      };
      
      fetchData();
    }, []);

    useEffect(() => {
      const fetchDataUsername = async (username) => {
        try {
          const response = await getIdentification(username);
          setClanId(response.id);
          console.log(clanId)
          const clanCreator = await getClanMain(clanId);
          setClanName(clanCreator.data.name)
          setClanCount(clanCreator.data.totalCount)
          setIsLoading(false);
        } catch (err) {
          console.error('Error loading clan id:', err);
          setError('Failed to load data');
          setIsLoading(false);
        }
      };
      
      fetchDataUsername(username);
    }, []);

      // Анимация клика
    const addAnimation = (x, y, id) => {
      const startTime = Date.now();
      
      setAnimations(prev => [...prev, { id, x, y, progress: 0 }]);
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        setAnimations(prev => 
          prev.map(anim => 
            anim.id === id ? { ...anim, progress } : anim
          )
        );
        
        if (progress < 1) {
          animationRefs.current[id] = requestAnimationFrame(animate);
        } else {
          setAnimations(prev => prev.filter(a => a.id !== id));
          delete animationRefs.current[id];
        }
      };
      
      animationRefs.current[id] = requestAnimationFrame(animate);
    };

    // Анимация текста монет
    const addCoinText = (x, y) => {
      const id = Date.now() + Math.random();
      const startTime = Date.now();
      
      setCoinTexts(prev => [...prev, { 
        id,
        x, 
        y,
        opacity: 1,
        yOffset: 0 
      }]);
      
      const animateText = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 1000, 1);
        
        setCoinTexts(prev => 
          prev.map(text => {
            if (text.id !== id) return text;
            
            return {
              ...text,
              opacity: 1 - progress,
              yOffset: progress * -50
            };
          })
        );
        
        if (progress < 1) {
          requestAnimationFrame(animateText);
        } else {
          setCoinTexts(prev => prev.filter(t => t.id !== id));
        }
      };
      
      requestAnimationFrame(animateText);
    };

    const handleAnimationEnd = (id) => {
      setCoinTexts((prev) => prev.filter(click => click.id !== id))
    };

    // Очистка анимаций
    useEffect(() => {
      return () => {
        Object.values(animationRefs.current).forEach(id => 
          cancelAnimationFrame(id)
        );
      };
    }, []);

    // Обработчики событий
    useEffect(() => {
      const circle = circleRef.current;
      if (!circle) return;

      const handleInteraction = async (clientX, clientY, id) => {
        const now = Date.now();
        if (now - lastClickTimeRef.current < clickCooldown) return;
        lastClickTimeRef.current = now;
        
        if (activeClicks.length >= 4) return;
        
        const circleRect = circle.getBoundingClientRect();
        const circleX = circleRect.left + circleRect.width / 2;
        const circleY = circleRect.top + circleRect.height / 2;
        const distance = Math.sqrt(
          Math.pow(clientX - circleX, 2) + Math.pow(clientY - circleY, 2)
        );
        
        if (distance <= circleRect.width / 2) {
          if (navigator.vibrate) navigator.vibrate(10);
          
          setActiveClicks(prev => [...prev, { id, x: clientX, y: clientY }]);
          setClickPosition({x: clientX, y: clientY});
          addAnimation(clientX, clientY, id)
          addCoinText(clickPosition.x, clickPosition.y);
          
          setTimeout(() => {
            setActiveClicks(prev => prev.filter(click => click.id !== id));
          }, 300);
          
          const newCoins = Number(coins) + 1;
          
          try {
            if (energy > 0){
              setCoins(Number(newCoins));
              await axios.post(`${API_URL}/coins`, { telegramId: telegramId, username: username, balance: newCoins });
              await syncWithServer(telegramId)
            }else if (energy <= 0){
              setCoinTexts([])
            }
          } catch (err) {
            console.error('Error saving coins:', err);
            setCoins(coins);
          }
        }
      };

      const handleTouchStart = (e) => {
        if (e.cancelable) e.preventDefault();
        const touch = e.touches[e.touches.length - 1];
        handleInteraction(touch.clientX, touch.clientY, touch.identifier);
      };

      const handleMouseDown = (e) => {
        handleInteraction(e.clientX, e.clientY, 'mouse_' + Date.now());
      };

      const handleTouchEnd = (e) => {
        const touches = Array.from(e.changedTouches);
        setActiveClicks(prev => prev.filter(click => 
          !touches.some(touch => touch.identifier === click.id)
        ));
      };

      circle.addEventListener('mousedown', handleMouseDown);
      circle.addEventListener('touchstart', handleTouchStart, { passive: false });
      circle.addEventListener('touchend', handleTouchEnd);

      return () => {
        circle.removeEventListener('mousedown', handleMouseDown);
        circle.removeEventListener('touchstart', handleTouchStart);
        circle.removeEventListener('touchend', handleTouchEnd);
      };
    }, [coins, activeClicks.length]);

  
    return (
      <div className='bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium'>
        <div className='absolute inset-0 h-1/2 bg-gradient-overlay z-0'></div>
        <div className='absolute inset-0 flex item-center justify-center z-0'></div>
        <div className='radial-gradient-overlay'></div>
  
        <div className='w-full z-10 min-h-screen flex flex-col items-center text-white'>
  
          <div className='fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white'>
            <div className='w-full cursor-pointer'>
            </div>
              <div className="w-full max-w-md rounded-2xl bg-[rgba(30,30,30,0.5)] shadow-lg">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-lg">TNO</span>
                    </div>
                    <span className="text-white font-medium text-base">{nameClan}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#4a9be2] rounded-full"></div>
                    <span className="text-white font-medium text-base">{clanTotalCount}</span>
                  </div>
                </div>
              </div>
              <div className='mt-12 text-5xl font-bold flex items-center xs:text-4xl'>
                <span className='ml-2'>{coins}</span>
              </div>
          </div>
  
          <div className='fixed bottom-0 left-0 w-full z-10'>
            <div className='w-full flex justify-between gap-2 px-4 pb-4'>
              <div className='w-1/3 flex items-center justify-start max-w-32'>
                <div className='flex items-center justify-center'>
                  <img src={highVoltage} width={40} height={40} />
                  <div className='ml-2 text-left'>
                    <span className='text-white text-2xl font-bold block'>{energy}</span>
                    <span className='text-white text-large opacity-75'>/ {maxEnergy}</span>
                  </div>
                </div>
              </div>
              {/* <div className='w-1/3 flex items-center justify-end max-w-32 cursor-pointer'>
                <div className='flex items-center justify-center'>
                  <img src={rocket} width={44} height={44} />
                  <div className='ml-2 text-left'>
                    <span className='text-white text-large opacity-75'>Скины(soon)</span>
                  </div>
                </div>
              </div> */}
            </div>
            <Navigation />
          </div>

          <div className='flex flex-col items-center justify-center min-h-screen pb-7'>
          <div className='relative mt-4 cursor-pointer coinBtn select-none active:scale-95' ref={circleRef}>
            <div className="mx-auto flex items-center justify-center 
    aspect-square          // Добавляем для сохранения пропорций 1:1
    w-[70vw]              // Ширина на мобильных
    max-w-[320px]         // Максимальная ширина на ПК
    min-w-[200px]         // Минимальная ширина
    bg-[#0088cc] 
    rounded-full 
    border-[3px] 
    border-[#3d3d3d]
    shadow-[0_0_250px_0_rgba(0,136,204,0.1),0_0_50vw_0_rgba(0,136,204,0.3)]
    md:w-[320px]          // Фиксированная ширина для ПК
    md:h-[320px]          // Фиксированная высота для ПК
    md:border-[4px]">
              <h1 className="text-white 
      text-[10vw]
      font-bold 
      [text-shadow:_4.3px_3.3px_2px_rgba(0,0,0,0.3),_8.6px_4.6px_4px_rgba(0,0,0,0.2)]
      sm:text-[64px]
      md:text-[72px]
      max-sm:text-[44px]"> 
                TNO
              </h1>
            </div>

              {coinTexts.map((click)=> (
                <div
                key={click.id}
                className='absolute text-2xl font-bold opacity-0'
                style={{ top: `${click.y - 100}px`, left: `${click.x - 50}px`, animation: `float 1s ease-out` }}
                onAnimationEnd={()=>handleAnimationEnd(click.id)}
                >
                  {coinsPerClick}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}


export default Home;
