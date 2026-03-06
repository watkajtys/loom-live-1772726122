import { useState, useEffect } from 'react';

export const useClock = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(`UTC ${now.toISOString().split('T')[1].split('.')[0]}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return currentTime;
};
