import React, { useEffect, useState } from 'react';

/**
 * Timer component:
 * - Accepts initialTime in seconds (30 * 60 = 1800 for 30min)
 * - Calls onTimeUp when it reaches 0
 */
function Timer({ initialTime, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  // Convert seconds to mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  return <div className="timer">Time Left: {formattedTime}</div>;
}

export default Timer;
