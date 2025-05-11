import { useEffect, useState } from 'react';
import union from '@assets/chatRoom/Union.svg';
interface TypingDotsProps {
  arrow: number;
}
const TypingDots = ({ arrow }: TypingDotsProps) => {
  const [activeDot, setActiveDot] = useState(0);
  const isReversed = arrow > 3 || arrow === 0;
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        backgroundImage: `url(${union})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2px',
        top: '5%',
        right: '-25px',
        transform: isReversed ? 'scaleX(-1)' : 'none',
        left: isReversed ? '-30px' : 'auto',
      }}
    >
      <img src={union} alt='Typing' style={{ position: `absolute`, zIndex: '10', width: `30px` }} />
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: activeDot === i ? '#a1a1a1' : '#e0e0e0',
            transition: 'background-color 0.3s ease',
            zIndex: '100',
            marginBottom: '4px',
          }}
        />
      ))}
    </div>
  );
};

export default TypingDots;
