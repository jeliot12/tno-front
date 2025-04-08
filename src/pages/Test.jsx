import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const Test = () => {
  const [coins, setCoins] = useState(0);
  const [activeClicks, setActiveClicks] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const circleRef = useRef(null);
  const lastClickTimeRef = useRef(0);
  const animationRefs = useRef({});
  const clickCooldown = 200;
  const animationDuration = 300;

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/coins`);
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

  // Сохранение данных
  useEffect(() => {
    if (isLoading) return;
    
    const saveCoins = async () => {
      try {
        await axios.post(`${API_URL}/coins`, { balance: coins });
      } catch (err) {
        console.error('Error saving coins:', err);
      }
    };
    
    saveCoins();
  }, [coins, isLoading]);

  // Управление анимациями
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

  // Очистка анимаций при размонтировании
  useEffect(() => {
    return () => {
      Object.values(animationRefs.current).forEach(id => 
        cancelAnimationFrame(id)
      );
    };
  }, []);

  // Обработка кликов/тапов
  const handleInteraction = (clientX, clientY, id) => {
    const circle = circleRef.current;
    if (!circle) return;
    
    const circleRect = circle.getBoundingClientRect();
    const circleX = circleRect.left + circleRect.width / 2;
    const circleY = circleRect.top + circleRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(clientX - circleX, 2) + Math.pow(clientY - circleY, 2)
    );
    
    if (distance <= circleRect.width / 2) {
      const now = Date.now();
      if (now - lastClickTimeRef.current < clickCooldown) return;
      lastClickTimeRef.current = now;
      
      if (activeClicks.length >= 3) return;
      
      if (navigator.vibrate) navigator.vibrate(10);
      
      addAnimation(clientX, clientY, id);
      setActiveClicks(prev => [...prev, { id, x: clientX, y: clientY }]);
      setCoins(prev => prev + 1);
    }
  };

  // Настройка обработчиков событий
  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const handleMouseDown = (e) => {
      handleInteraction(e.clientX, e.clientY, 'mouse_' + Date.now());
    };

    const handleTouchStart = (e) => {
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[e.touches.length - 1];
      handleInteraction(touch.clientX, touch.clientY, 'touch_' + touch.identifier);
    };

    const handleTouchEnd = (e) => {
      const touches = Array.from(e.changedTouches);
      setActiveClicks(prev => 
        prev.filter(click => 
          !touches.some(touch => 
            click.id === 'touch_' + touch.identifier
          )
        )
      );
    };

    circle.addEventListener('mousedown', handleMouseDown);
    circle.addEventListener('touchstart', handleTouchStart, { passive: false });
    circle.addEventListener('touchend', handleTouchEnd);

    return () => {
      circle.removeEventListener('mousedown', handleMouseDown);
      circle.removeEventListener('touchstart', handleTouchStart);
      circle.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeClicks.length]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 overflow-hidden">
      <h1 className="text-4xl font-bold mb-8">Coin Clicker</h1>
      
      <div className="mb-4 text-2xl font-semibold">Coins: {coins}</div>
      
      <div 
        ref={circleRef}
        className="w-64 h-64 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200 relative select-none active:scale-95"
      >
        <span className="text-white text-xl font-bold">Tap Me!</span>
        
        {animations.map((anim) => {
          const size = 16 + 32 * anim.progress;
          const opacity = 1 - anim.progress;
          
          return (
            <div 
              key={anim.id}
              className="absolute bg-yellow-400 rounded-full pointer-events-none"
              style={{
                left: `${anim.x - size/2}px`,
                top: `${anim.y - size/2}px`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                transform: `scale(${1 + anim.progress})`,
                transition: 'all 0.05s linear',
                willChange: 'transform, opacity'
              }}
            />
          );
        })}
      </div>
      
      <div className="mt-8 text-gray-600">
        Active touches: {activeClicks.length}/3
      </div>
    </div>
  );
};

export default Test;