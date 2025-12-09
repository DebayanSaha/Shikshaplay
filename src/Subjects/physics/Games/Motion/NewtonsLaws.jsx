import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const NewtonsLaws = () => {
  const { t } = useTranslation();
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tt = (key, fallback) => {
    const val = t(key, { returnObjects: false, defaultValue: fallback || key });
    return typeof val === 'string' ? val : fallback || key;
  };

  const tabs = [
    { id: 0, title: tt('subjects.games.newtons_laws.first_law', "First Law"), subtitle: tt('subjects.games.newtons_laws.inertia', "Inertia") },
    { id: 1, title: tt('subjects.games.newtons_laws.second_law', "Second Law"), subtitle: "F=ma" },
    { id: 2, title: tt('subjects.games.newtons_laws.third_law', "Third Law"), subtitle: tt('subjects.games.newtons_laws.action_reaction', "Action = Reaction") },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 page-shell">
      <div className="max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="pt-12 pb-6 px-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-b-3xl text-center">
          <h1 className="text-4xl font-bold text-white">{tt('subjects.games.newtons_laws.title', "Newton's Laws Lab")}</h1>
          <p className="text-lg text-white opacity-90 mt-1">{tt('subjects.games.newtons_laws.subtitle', 'Understand laws of motion')}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row bg-white mt-4 rounded-xl p-1 shadow-md">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex-1 py-3 px-3 rounded-xl text-center ${
                activeTab === tab.id ? 'bg-indigo-500 text-white' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className={`font-semibold ${activeTab === tab.id ? 'text-white' : 'text-gray-700'}`}>{tab.title}</div>
              <div className={`text-xs mt-1 ${activeTab === tab.id ? 'text-white opacity-90' : 'text-gray-400'}`}>{tab.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Game content */}
        <div className="flex-1 mt-4 px-0 sm:px-2 pb-8">
          {activeTab === 0 && <FirstLawGame screenWidth={screenWidth} />}
          {activeTab === 1 && <SecondLawGame screenWidth={screenWidth} />}
          {activeTab === 2 && <ThirdLawGame screenWidth={screenWidth} />}
        </div>
      </div>
    </div>
  );
};

// --- FIRST LAW GAME ---
const FirstLawGame = ({ screenWidth }) => {
  const { t } = useTranslation();
  const tt = (key, fallback) => {
    const val = t(key, { returnObjects: false, defaultValue: fallback || key });
    return typeof val === 'string' ? val : fallback || key;
  };
  const [isMoving, setIsMoving] = useState(false);
  const [score, setScore] = useState(0);
  const [instruction, setInstruction] = useState(tt('subjects.games.newtons_laws.start_ball_moving', 'Start the ball moving'));
  const ballControls = useAnimation();

  const startMoving = () => {
    setIsMoving(true);
    setInstruction(tt('subjects.games.newtons_laws.ball_moving_question', 'What happens to a moving object?'));
    ballControls.start({ x: Math.max(screenWidth - 120, 200), transition: { duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'linear' } });
  };

  const applyForce = (withFriction) => {
    if (!isMoving) return;
    if (withFriction) {
      ballControls.stop();
      ballControls.start({ x: Math.max(screenWidth - 70, 180), transition: { duration: 0.8 } }).then(() => {
        setIsMoving(false);
        setScore(prev => prev + 10);
        alert(tt('subjects.games.newtons_laws.friction_explanation', 'Friction slows objects down.'));
        setInstruction(tt('subjects.games.newtons_laws.start_ball_moving', 'Start the ball moving'));
      });
    } else {
      setScore(prev => prev + 10);
      alert(tt('subjects.games.newtons_laws.no_force_explanation', 'No force means constant motion.'));
    }
  };

  const resetGame = () => {
    ballControls.stop();
    ballControls.set({ x: 0 });
    setIsMoving(false);
    setInstruction(tt('subjects.games.newtons_laws.start_ball_moving', 'Start the ball moving'));
  };

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-400 to-red-400 text-white">
        <h2 className="text-2xl font-bold">{tt('subjects.games.newtons_laws.first_law_title', 'First Law')}</h2>
        <p className="mt-2 text-sm">{tt('subjects.games.newtons_laws.first_law_description', 'Objects in motion stay in motion unless acted on by a force.')}</p>
      </div>

      <div className="bg-gray-200 h-24 rounded-xl relative flex items-center overflow-hidden">
        <motion.div
          animate={ballControls}
          className="absolute w-14 h-14 bg-teal-400 rounded-full flex items-center justify-center text-4xl"
        >
          ⚽
        </motion.div>
      </div>

      <div className="flex space-x-2">
        {!isMoving ? (
          <button className="flex-1 py-3 bg-teal-400 rounded-xl text-white font-semibold" onClick={startMoving}>🚀 {tt('subjects.games.newtons_laws.start_moving', 'Start Moving')}</button>
        ) : (
          <>
            <button className="flex-1 py-3 bg-red-500 rounded-xl text-white font-semibold" onClick={() => applyForce(true)}>{tt('subjects.games.newtons_laws.apply_friction', 'Apply Friction')} 🛑</button>
            <button className="flex-1 py-3 bg-teal-300 rounded-xl text-white font-semibold" onClick={() => applyForce(false)}>{tt('subjects.games.newtons_laws.no_force', 'No Force')} ➡️</button>
          </>
        )}
      </div>

      <button className="w-full py-3 bg-purple-400 rounded-xl text-white font-semibold" onClick={resetGame}>🔄 {tt('subjects.games.newtons_laws.reset', 'Reset')}</button>

      <div className="p-4 bg-yellow-100 rounded-xl text-center">
        <span className="text-xl font-bold">{tt('subjects.games.newtons_laws.score', 'Score')}: {score}</span>
      </div>
    </div>
  );
};

// --- SECOND LAW GAME ---
const SecondLawGame = ({ screenWidth }) => {
  const { t } = useTranslation();
  const tt = (key, fallback) => {
    const val = t(key, { returnObjects: false, defaultValue: fallback || key });
    return typeof val === 'string' ? val : fallback || key;
  };
  const [mass, setMass] = useState(5);
  const [force, setForce] = useState(0);
  const [acceleration, setAcceleration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [score, setScore] = useState(0);
  const [launched, setLaunched] = useState(false);
  const rocketControls = useAnimation();
  const rotationControls = useAnimation();

  const updateAcceleration = (f, m) => {
    const acc = f / m;
    setAcceleration(acc);
    setDistance(Math.round(acc * 30));
  };

  const handleMassChange = (m) => {
    if (launched) return;
    setMass(m);
    updateAcceleration(force, m);
  };

  const handleForceChange = (f) => {
    if (launched) return;
    setForce(f);
    updateAcceleration(f, mass);
  };

  const launchObject = () => {
    if (launched || force === 0) return;
    setLaunched(true);
    const acc = force / mass;
    const travelDistance = acc * 30;
    const maxDistance = Math.min(50 + travelDistance * 0.8, screenWidth - 100);
    const duration = Math.max(2500 - (acc * 100), 800);

    rocketControls.start({ x: maxDistance, transition: { duration: duration / 1000 } });
    rotationControls.start({ rotate: 45, transition: { duration: duration / 1000 } }).then(() => {
      rocketControls.start({ x: 50, transition: { duration: 1 } });
      rotationControls.start({ rotate: 0, transition: { duration: 1 } });
      setLaunched(false);
      let points = acc > 12 ? 25 : acc > 8 ? 20 : acc > 4 ? 15 : 10;
      setScore(prev => prev + points);
      alert(`F = ma → ${force}N = ${mass}kg × ${acc.toFixed(2)} m/s²\n+${points} points`);
    });
  };

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
        <h2 className="text-2xl font-bold">{tt('subjects.games.newtons_laws.second_law_title', 'Second Law')}</h2>
        <p className="mt-2 text-sm">{tt('subjects.games.newtons_laws.second_law_description', 'Acceleration depends on net force and mass.')}</p>
      </div>

      <div className="bg-blue-100 h-28 rounded-xl relative flex items-center overflow-hidden">
        <motion.div
          animate={rocketControls}
          style={{ rotate: rotationControls }}
          className="absolute w-12 h-12 flex items-center justify-center text-4xl"
        >
          🚀
        </motion.div>
      </div>

      <div className="flex space-x-2">
        {[3,5,8,10].map(m => (
          <button key={m} className={`flex-1 py-2 rounded-xl ${mass===m ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => handleMassChange(m)} disabled={launched}>{m} kg</button>
        ))}
      </div>
      <div className="flex space-x-2">
        {[10,20,40,60,80].map(f => (
          <button key={f} className={`flex-1 py-2 rounded-xl ${force===f ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => handleForceChange(f)} disabled={launched}>{f} N</button>
        ))}
      </div>

      <div className="p-4 bg-green-100 rounded-xl">
        <p>{tt('subjects.games.newtons_laws.acceleration', 'Acceleration')}: {acceleration.toFixed(2)} m/s²</p>
        <p>{tt('subjects.games.newtons_laws.distance', 'Distance')}: {distance} m</p>
      </div>

      <div className="flex space-x-2">
        <button className={`flex-1 py-3 rounded-xl ${launched || force===0 ? 'bg-gray-300 text-gray-600' : 'bg-green-500 text-white'}`} onClick={launchObject} disabled={launched || force===0}>
          {launched ? tt('subjects.games.newtons_laws.launching', 'Launching...') : force===0 ? tt('subjects.games.newtons_laws.select_force', 'Select force') : `🚀 ${tt('subjects.games.newtons_laws.launch', 'Launch')}`}
        </button>
        <button className="flex-1 py-3 bg-purple-400 text-white rounded-xl" onClick={() => { setForce(0); setAcceleration(0); setDistance(0); }}>🔄 {tt('subjects.games.newtons_laws.reset', 'Reset')}</button>
      </div>

      <div className="p-4 bg-yellow-100 rounded-xl text-center">
        <span className="text-xl font-bold">{tt('subjects.games.newtons_laws.score', 'Score')}: {score}</span>
      </div>
    </div>
  );
};

// --- THIRD LAW GAME ---
const ThirdLawGame = ({ screenWidth }) => {
  const { t } = useTranslation();
  const tt = (key, fallback) => {
    const val = t(key, { returnObjects: false, defaultValue: fallback || key });
    return typeof val === 'string' ? val : fallback || key;
  };
  const [score, setScore] = useState(0);
  const [collisions, setCollisions] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [redForce, setRedForce] = useState('10');
  const [blueForce, setBlueForce] = useState('10');

  const ball1Controls = useAnimation();
  const ball2Controls = useAnimation();
  const ball1Scale = useAnimation();
  const ball2Scale = useAnimation();

  const startCollision = () => {
    if (gameActive) return;

    const redForceNum = Math.min(Math.max(parseFloat(redForce) || 10, 1), 100);
    const blueForceNum = Math.min(Math.max(parseFloat(blueForce) || 10, 1), 100);

    setGameActive(true);
    const avgForce = (redForceNum + blueForceNum) / 2;
    const collisionSpeed = Math.max(800 - (avgForce * 5), 400);
    const redDistance = Math.min(redForceNum * 1.5, screenWidth/2 - 110);
    const blueDistance = Math.min(blueForceNum * 1.5, screenWidth/2 - 110);

    ball1Controls.start({ x: 50 + redDistance, transition: { duration: collisionSpeed / 1000 } });
    ball2Controls.start({ x: SCREEN_WIDTH - 150 - blueDistance, transition: { duration: collisionSpeed / 1000 } });
    ball1Scale.start({ scale: 1.05, transition: { duration: collisionSpeed / 1000 } });
    ball2Scale.start({ scale: 1.05, transition: { duration: collisionSpeed / 1000 } }).then(() => {
      setTimeout(() => {
        ball1Controls.start({ x: 50, transition: { duration: 1 } });
        ball2Controls.start({ x: SCREEN_WIDTH - 150, transition: { duration: 1 } });
        ball1Scale.start({ scale: 1, transition: { duration: 1 } });
        ball2Scale.start({ scale: 1, transition: { duration: 1 } });
        setGameActive(false);
        setCollisions(prev => prev + 1);
        setScore(prev => prev + 20);
        alert(tt('subjects.games.newtons_laws.collision_complete', 'Collision complete! +20 points'));
      }, 200);
    });
  };

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-400 to-yellow-400 text-white">
        <h2 className="text-2xl font-bold">{tt('subjects.games.newtons_laws.third_law_title', 'Third Law')}</h2>
        <p className="mt-2 text-sm">{tt('subjects.games.newtons_laws.third_law_description', 'For every action, there is an equal and opposite reaction.')}</p>
      </div>

      <div className="bg-pink-100 h-28 rounded-xl relative flex items-center overflow-hidden">
        <motion.div animate={ball1Controls} className="absolute left-0 w-14 h-14 bg-red-200 rounded-full flex items-center justify-center text-2xl">🔴</motion.div>
        <motion.div animate={ball2Controls} className="absolute right-0 w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center text-2xl">🔵</motion.div>
      </div>

      <div className="flex space-x-4 justify-center items-center">
        <div className="flex flex-col items-center bg-gray-100 p-3 rounded-xl">
          <label className="text-xs text-gray-500">{tt('subjects.games.newtons_laws.red_force', 'Red Ball Force')}</label>
          <input type="text" value={redForce} onChange={(e) => setRedForce(e.target.value.replace(/[^0-9]/g, ''))} className="w-16 text-center border-2 border-blue-400 rounded mt-1" disabled={gameActive}/>
          <span className="font-bold">→ +{redForce} N</span>
        </div>
        <span className="font-bold text-lg">=</span>
        <div className="flex flex-col items-center bg-gray-100 p-3 rounded-xl">
          <label className="text-xs text-gray-500">{tt('subjects.games.newtons_laws.blue_force', 'Blue Ball Force')}</label>
          <input type="text" value={blueForce} onChange={(e) => setBlueForce(e.target.value.replace(/[^0-9]/g, ''))} className="w-16 text-center border-2 border-blue-400 rounded mt-1" disabled={gameActive}/>
          <span className="font-bold">← -{blueForce} N</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className={`flex-1 py-3 rounded-xl ${gameActive ? 'bg-gray-300 text-gray-600' : 'bg-pink-400 text-white'}`} onClick={startCollision} disabled={gameActive}>
          {gameActive ? tt('subjects.games.newtons_laws.colliding', 'Colliding...') : `💥 ${tt('subjects.games.newtons_laws.start_collision', 'Start Collision')}`}
        </button>
        <button className="flex-1 py-3 bg-purple-400 text-white rounded-xl" onClick={() => { ball1Controls.set({x:50}); ball2Controls.set({x:screenWidth-150}); }}>🔄 {tt('subjects.games.newtons_laws.reset', 'Reset')}</button>
      </div>

      <div className="flex space-x-4 mt-4">
        <div className="flex-1 bg-blue-100 rounded-xl p-3 text-center">
          <p className="text-sm">{tt('subjects.games.newtons_laws.collisions', 'Collisions')}</p>
          <p className="text-2xl font-bold">{collisions}</p>
        </div>
        <div className="flex-1 bg-yellow-100 rounded-xl p-3 text-center">
          <p className="text-sm">{tt('subjects.games.newtons_laws.score', 'Score')}</p>
          <p className="text-2xl font-bold">{score}</p>
        </div>
      </div>
    </div>
  );
};

export default NewtonsLaws;
