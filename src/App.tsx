import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(true);
  const [nextYear, setNextYear] = useState(new Date().getFullYear() + 1);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(nextYear, 0, 1);
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setNextYear(nextYear + 1);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    // Initial calculation
    calculateTimeLeft();
    setLoading(false);

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [nextYear]);

  const formatNumber = (num: number): string => num.toString().padStart(2, '0');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="animate-spin">
          <Clock className="w-12 h-12 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Year */}
      <div className="absolute text-white/5 text-[20rem] font-bold select-none pointer-events-none">
        {nextYear}
      </div>

      {/* Sparkles */}
      <div className="absolute top-10 right-10 animate-pulse">
        <Sparkles className="w-8 h-8 text-yellow-300/50" />
      </div>
      <div className="absolute bottom-10 left-10 animate-pulse delay-300">
        <Sparkles className="w-6 h-6 text-yellow-300/50" />
      </div>

      {/* Main Content */}
      <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-4xl mx-4">
        <h1 className="text-4xl md:text-6xl text-center font-bold text-white mb-8">
          New Year Countdown
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/20 backdrop-blur-md rounded-lg p-4">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                {formatNumber(value)}
              </div>
              <div className="text-white/80 text-lg uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-white/80">
          Counting down to {nextYear}
        </div>
      </div>
    </div>
  );
}

export default App;