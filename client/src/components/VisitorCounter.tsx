import React, { useEffect, useState } from 'react';

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Get existing count from localStorage
    const storedCount = localStorage.getItem('visitorCount');
    const currentCount = storedCount ? parseInt(storedCount) : 0;
    
    // Increment count
    const newCount = currentCount + 1;
    localStorage.setItem('visitorCount', newCount.toString());
    setCount(newCount);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm opacity-75 hover:opacity-100 transition-opacity">
      Visitor #{count}
    </div>
  );
};

export default VisitorCounter;