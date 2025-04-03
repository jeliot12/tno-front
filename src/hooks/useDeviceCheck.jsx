import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDeviceCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                      (window.innerWidth <= 768) ||
                      ('ontouchstart' in window);
      
      if (!isMobile && !window.location.pathname.includes('/desktop')) {
        navigate('/desktop', { replace: true });
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, [navigate]);
};