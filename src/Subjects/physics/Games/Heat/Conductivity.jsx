// Heat Master Game - React Web Version with Tailwind CSS
import React, { useState, useEffect, useRef } from 'react';

const Conductivity = () => {
  // Game States
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameMode, setGameMode] = useState('menu');
  const [showConcept, setShowConcept] = useState(true);
  const [showGuide, setShowGuide] = useState(true);

  // Conduction Game States
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [heatSource, setHeatSource] = useState(50);
  const [heatAnimation, setHeatAnimation] = useState(0);
  const animationRef = useRef(null);

  // Convection Game States
  const [waterTemp, setWaterTemp] = useState(20);
  const [isHeating, setIsHeating] = useState(false);
  const [heatIntensity, setHeatIntensity] = useState(1);
  const [showParticles, setShowParticles] = useState(true);
  const [bubbles, setBubbles] = useState([...Array(12)].map((_, i) => ({ id: i, opacity: 0, translateY: 0 })));

  // Heat Capacity Game States
  const [selectedObject, setSelectedObject] = useState(null);
  const [appliedHeat, setAppliedHeat] = useState(0);
  const [tempAnimation, setTempAnimation] = useState(0);

  // Materials with different thermal conductivity
  const materials = [
    { name: 'Copper', conductivity: 0.9, color: '#B87333', emoji: '🔶' },
    { name: 'Aluminum', conductivity: 0.7, color: '#C0C0C0', emoji: '⚪' },
    { name: 'Iron', conductivity: 0.5, color: '#696969', emoji: '⚫' },
    { name: 'Wood', conductivity: 0.2, color: '#8B4513', emoji: '🟫' },
    { name: 'Plastic', conductivity: 0.1, color: '#FF6B6B', emoji: '🔴' },
  ];

  // Objects with different specific heat capacities
  const objects = [
    { name: 'Water', heatCapacity: 4.18, color: '#4A90E2', mass: 100 },
    { name: 'Iron', heatCapacity: 0.45, color: '#696969', mass: 100 },
    { name: 'Copper', heatCapacity: 0.39, color: '#B87333', mass: 100 },
    { name: 'Oil', heatCapacity: 2.0, color: '#F4A460', mass: 100 },
  ];

  // Start conduction animation
  useEffect(() => {
    if (gameMode === 'conduction' && selectedMaterial) {
      let value = 0;
      let increasing = true;
      
      animationRef.current = setInterval(() => {
        if (increasing) {
          value += 0.02;
          if (value >= selectedMaterial.conductivity) {
            increasing = false;
          }
        } else {
          value -= 0.02;
          if (value <= 0) {
            increasing = true;
          }
        }
        setHeatAnimation(value);
      }, 40);

      return () => clearInterval(animationRef.current);
    }
  }, [selectedMaterial, gameMode]);

  // Convection bubble animation
  useEffect(() => {
    if (isHeating) {
      const bubbleSpeed = 50 / heatIntensity;
      
      const bubbleInterval = setInterval(() => {
        setBubbles(prev => 
          prev.map((bubble, index) => {
            const delay = (index * (300 / heatIntensity));
            const newOpacity = (Date.now() % 2000) / 2000;
            const newTranslateY = -220 * newOpacity;
            
            return {
              ...bubble,
              opacity: newOpacity,
              translateY: newTranslateY,
            };
          })
        );
      }, bubbleSpeed);

      const tempRiseRate = 2 * heatIntensity;
      const tempInterval = setInterval(() => {
        setWaterTemp(prev => {
          if (prev >= 100) {
            clearInterval(tempInterval);
            setIsHeating(false);
            setScore(prevScore => prevScore + (50 * heatIntensity));
            alert(`Success! Water reached boiling point at ${heatIntensity}x heat! You earned ${50 * heatIntensity} points! 🎉`);
            return 100;
          }
          return prev + tempRiseRate;
        });
      }, 200);

      return () => {
        clearInterval(bubbleInterval);
        clearInterval(tempInterval);
      };
    }
  }, [isHeating, heatIntensity]);

  // Heat capacity temperature change
  useEffect(() => {
    if (selectedObject && appliedHeat > 0) {
      const tempChange = appliedHeat / (selectedObject.mass * selectedObject.heatCapacity);
      setTempAnimation(tempChange);
    }
  }, [appliedHeat, selectedObject]);

  const MainMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5 flex flex-col justify-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-3">🔥 Heat Master Game 🔥</h1>
      <p className="text-lg text-center text-gray-600 mb-8">Learn Physics Through Play!</p>
      
      <div className="flex justify-around max-w-2xl mx-auto w-full bg-white p-4 rounded-2xl shadow-lg mb-8">
        <div className="text-xl font-bold text-green-600">Score: {score}</div>
        <div className="text-xl font-bold text-blue-600">Level: {currentLevel}</div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <button 
          className="w-full bg-red-500 hover:bg-red-600 text-white p-5 rounded-2xl shadow-lg transition-all transform hover:scale-105"
          onClick={() => {
            setGameMode('conduction');
            setShowConcept(true);
            setShowGuide(true);
          }}
        >
          <div className="text-xl font-bold mb-1">🌡️ Heat Conduction</div>
          <div className="text-sm opacity-90">Learn how heat travels through materials</div>
        </button>

        <button 
          className="w-full bg-teal-500 hover:bg-teal-600 text-white p-5 rounded-2xl shadow-lg transition-all transform hover:scale-105"
          onClick={() => {
            setGameMode('convection');
            setShowConcept(true);
            setShowGuide(true);
            setWaterTemp(20);
            setIsHeating(false);
            setHeatIntensity(1);
            setShowParticles(true);
          }}
        >
          <div className="text-xl font-bold mb-1">💨 Convection Currents</div>
          <div className="text-sm opacity-90">See how liquids and gases transfer heat</div>
        </button>

        <button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-5 rounded-2xl shadow-lg transition-all transform hover:scale-105"
          onClick={() => {
            setGameMode('heatCapacity');
            setShowConcept(true);
            setShowGuide(true);
          }}
        >
          <div className="text-xl font-bold mb-1">🔬 Heat Capacity</div>
          <div className="text-sm opacity-90">Discover specific heat of materials</div>
        </button>

        <button 
          className="w-full bg-orange-400 hover:bg-orange-500 text-white p-5 rounded-2xl shadow-lg transition-all transform hover:scale-105"
          onClick={() => {
            setGameMode('challenge');
            setShowConcept(true);
            setShowGuide(true);
          }}
        >
          <div className="text-xl font-bold mb-1">🏆 Challenge Mode</div>
          <div className="text-sm opacity-90">Test your heat knowledge!</div>
        </button>
      </div>
    </div>
  );

  const ConductionGame = () => {
    const heatColor = selectedMaterial 
      ? `rgb(${52 + (231 - 52) * (heatAnimation / selectedMaterial.conductivity)}, ${152 - (76 - 152) * (heatAnimation / selectedMaterial.conductivity)}, ${219 - (60 - 219) * (heatAnimation / selectedMaterial.conductivity)})`
      : '#3498db';

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5 overflow-y-auto">
        <button 
          className="mb-4 px-4 py-2 text-blue-600 font-semibold hover:text-blue-800"
          onClick={() => {
            setGameMode('menu');
            setSelectedMaterial(null);
          }}
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Heat Conduction Experiment</h2>
        
        {showConcept && (
          <div className="bg-yellow-50 mx-4 p-5 rounded-2xl border-l-4 border-yellow-400 mb-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-3">📚 Concept:</h3>
            <p className="text-yellow-800 leading-relaxed mb-3">
              Heat conduction is the transfer of heat through a material. Materials with high thermal conductivity (like metals) transfer heat faster than insulators (like wood or plastic).
            </p>
            <p className="text-lg font-bold text-red-600 text-center my-3">Q = k × A × ΔT / d</p>
            <p className="text-sm text-yellow-800 italic mb-3">
              Where: Q = Heat transferred, k = thermal conductivity, A = area, ΔT = temperature difference, d = thickness
            </p>
            <button onClick={() => setShowConcept(false)} className="text-green-600 font-bold block mx-auto">
              Got it! 👍
            </button>
          </div>
        )}

        {showGuide && (
          <div className="bg-blue-50 mx-4 p-5 rounded-2xl border-l-4 border-blue-400 mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-3">🎮 How to Play:</h3>
            <p className="text-blue-800 mb-2">1️⃣ TAP on any material card below</p>
            <p className="text-blue-800 mb-2">2️⃣ WATCH the heat bar animate from left to right</p>
            <p className="text-blue-800 mb-2">3️⃣ OBSERVE: Blue = cold, Red = hot</p>
            <p className="text-blue-800 mb-2">4️⃣ FASTER animation = better heat conductor</p>
            <p className="text-blue-800 mb-2">5️⃣ TRY all 5 materials to compare their properties</p>
            <p className="text-blue-800 mb-3">💡 Each selection earns you +10 points!</p>
            <button onClick={() => setShowGuide(false)} className="text-blue-600 font-bold block mx-auto">
              Hide Guide ✕
            </button>
          </div>
        )}

        <div className="px-4">
          <p className="text-lg text-gray-800 mb-4 text-center font-semibold">Select a material to see how fast heat travels:</p>
          
          <div className="flex flex-wrap justify-around gap-4 mb-8">
            {materials.map((material, index) => (
              <button
                key={index}
                className={`w-28 p-4 rounded-2xl shadow-lg transition-all transform hover:scale-105 ${
                  selectedMaterial?.name === material.name ? 'ring-4 ring-yellow-400' : ''
                }`}
                style={{ backgroundColor: material.color }}
                onClick={() => {
                  setSelectedMaterial(material);
                  setScore(prev => prev + 10);
                }}
              >
                <div className="text-4xl mb-2">{material.emoji}</div>
                <div className="text-sm font-bold text-white mb-1">{material.name}</div>
                <div className="text-xs text-white">
                  Conductivity: {(material.conductivity * 100).toFixed(0)}%
                </div>
              </button>
            ))}
          </div>

          {selectedMaterial && (
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Heat Transfer Visualization:</h3>
              <div className="relative h-16 bg-gray-200 rounded-full overflow-hidden flex items-center mb-4">
                <span className="absolute left-3 text-sm font-bold z-10">🔥 Heat Source</span>
                <div 
                  className="h-full transition-all duration-1000 ease-in-out"
                  style={{
                    width: `${(heatAnimation / (selectedMaterial?.conductivity || 1)) * 100}%`,
                    backgroundColor: heatColor,
                  }}
                />
                <span className="absolute right-3 text-sm font-bold">❄️ Cold End</span>
              </div>
              <p className="text-center text-green-600 font-bold mb-2">
                {selectedMaterial.name} conducts heat at {(selectedMaterial.conductivity * 100).toFixed(0)}% efficiency!
              </p>
              <p className="text-center text-gray-600 italic">
                {selectedMaterial.conductivity > 0.6 
                  ? '⚡ This is a good conductor - heat travels fast!' 
                  : '🛡️ This is an insulator - heat travels slowly!'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ConvectionGame = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5 overflow-y-auto">
        <button 
          className="mb-4 px-4 py-2 text-blue-600 font-semibold hover:text-blue-800"
          onClick={() => {
            setGameMode('menu');
            setWaterTemp(20);
            setIsHeating(false);
          }}
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Convection Experiment</h2>
        
        {showConcept && (
          <div className="bg-yellow-50 mx-4 p-5 rounded-2xl border-l-4 border-yellow-400 mb-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-3">📚 Concept:</h3>
            <p className="text-yellow-800 leading-relaxed mb-3">
              Convection is heat transfer through the movement of fluids (liquids or gases). Hot fluid rises, cold fluid sinks, creating convection currents.
            </p>
            <p className="text-yellow-800">
              When heated, water molecules move faster and spread apart, making hot water less dense. This causes it to rise while cooler, denser water sinks.
            </p>
            <button onClick={() => setShowConcept(false)} className="text-green-600 font-bold block mx-auto mt-3">
              Got it! 👍
            </button>
          </div>
        )}

        {showGuide && (
          <div className="bg-blue-50 mx-4 p-5 rounded-2xl border-l-4 border-blue-400 mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-3">🎮 How to Play:</h3>
            <p className="text-blue-800 mb-2">1️⃣ SELECT heat intensity: Low 🔥, Medium 🔥🔥, or High 🔥🔥🔥</p>
            <p className="text-blue-800 mb-2">2️⃣ TAP "Start Heating" button to begin</p>
            <p className="text-blue-800 mb-2">3️⃣ WATCH temperature rise (faster = higher heat!)</p>
            <p className="text-blue-800 mb-2">4️⃣ SEE more bubbles (○) with higher heat intensity</p>
            <p className="text-blue-800 mb-2">5️⃣ TAP bubbles to interact and pop them!</p>
            <p className="text-blue-800 mb-2">6️⃣ TOGGLE "Show/Hide Particles" for better view</p>
            <p className="text-blue-800 mb-2">7️⃣ OBSERVE water color: Blue → Orange → Red</p>
            <p className="text-blue-800 mb-2">8️⃣ TAP "Pause" to stop, "Reset" to restart</p>
            <p className="text-blue-800 mb-3">💡 Higher heat = More points! (Low=50, Med=100, High=150)</p>
            <button onClick={() => setShowGuide(false)} className="text-blue-600 font-bold block mx-auto">
              Hide Guide ✕
            </button>
          </div>
        )}

        <div className="px-4">
          <p className="text-lg text-gray-800 mb-4 text-center font-semibold">Heat the water and watch convection currents!</p>
          
          {/* Heat Intensity Selector */}
          <div className="bg-white p-4 rounded-2xl mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">Select Heat Intensity:</h3>
            <div className="flex gap-2 justify-around">
              <button
                className={`flex-1 p-4 rounded-xl transition-all ${
                  heatIntensity === 1 ? 'ring-4 ring-yellow-400' : ''
                }`}
                style={{ backgroundColor: '#4ECDC4' }}
                onClick={() => !isHeating && setHeatIntensity(1)}
                disabled={isHeating}
              >
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-xs text-white font-bold">Low Heat</div>
              </button>

              <button
                className={`flex-1 p-4 rounded-xl transition-all ${
                  heatIntensity === 2 ? 'ring-4 ring-yellow-400' : ''
                }`}
                style={{ backgroundColor: '#F39C12' }}
                onClick={() => !isHeating && setHeatIntensity(2)}
                disabled={isHeating}
              >
                <div className="text-2xl mb-1">🔥🔥</div>
                <div className="text-xs text-white font-bold">Medium</div>
              </button>

              <button
                className={`flex-1 p-4 rounded-xl transition-all ${
                  heatIntensity === 3 ? 'ring-4 ring-yellow-400' : ''
                }`}
                style={{ backgroundColor: '#E74C3C' }}
                onClick={() => !isHeating && setHeatIntensity(3)}
                disabled={isHeating}
              >
                <div className="text-2xl mb-1">🔥🔥🔥</div>
                <div className="text-xs text-white font-bold">High Heat</div>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center mb-6">
            <p className="text-2xl font-bold text-gray-800 mb-4">Temperature: {waterTemp.toFixed(0)}°C</p>
            
            <div 
              className="relative w-72 h-64 rounded-3xl overflow-hidden flex items-end justify-center transition-colors duration-500"
              style={{ 
                backgroundColor: waterTemp < 40 ? '#4A90E2' : waterTemp < 70 ? '#FF9A56' : '#FF6B6B' 
              }}
            >
              {showParticles && bubbles.map((bubble) => (
                <button
                  key={bubble.id}
                  className="absolute bottom-5"
                  style={{
                    left: `${(bubble.id % 4) * 25 + 5}%`,
                    opacity: bubble.opacity,
                    transform: `translateY(${bubble.translateY}px) scale(${0.5 + bubble.opacity * 0.7})`,
                  }}
                  onClick={() => {
                    setScore(prev => prev + 5);
                  }}
                >
                  <span className="text-3xl text-white">○</span>
                </button>
              ))}
              
              <div className="pb-4">
                <span className="text-lg text-white font-bold">💧 Water</span>
              </div>
            </div>
            
            <div 
              className="w-72 h-12 rounded-xl flex items-center justify-center mt-3 transition-colors"
              style={{
                backgroundColor: isHeating 
                  ? (heatIntensity === 3 ? '#C0392B' : heatIntensity === 2 ? '#E67E22' : '#e74c3c')
                  : '#95a5a6'
              }}
            >
              <span className="text-white font-bold">
                {isHeating ? '🔥 Heating... ' : '🔥 Heat Source '}
                {isHeating && (heatIntensity === 1 ? '(Low)' : heatIntensity === 2 ? '(Medium)' : '(High)')}
              </span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2 mb-6">
            <button
              className={`flex-1 p-4 rounded-xl font-bold text-white transition-colors ${
                isHeating ? 'bg-orange-500' : 'bg-blue-500'
              }`}
              onClick={() => {
                if (!isHeating && waterTemp < 100) {
                  setIsHeating(true);
                } else if (isHeating) {
                  setIsHeating(false);
                } else {
                  setWaterTemp(20);
                  setHeatIntensity(1);
                }
              }}
            >
              {waterTemp >= 100 ? 'Reset 🔄' : isHeating ? 'Pause ⏸️' : 'Start Heating ▶️'}
            </button>

            <button
              className="flex-1 p-4 rounded-xl font-bold text-white bg-purple-500"
              onClick={() => setShowParticles(!showParticles)}
            >
              {showParticles ? 'Hide Particles 👁️' : 'Show Particles 👁️‍🗨️'}
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">What's happening?</h3>
            <p className="text-gray-700 leading-relaxed">
              {waterTemp < 30 ? '❄️ Water is cold and still - molecules moving slowly' :
               waterTemp < 50 ? '🌡️ Water warming up - molecules moving faster!' :
               waterTemp < 70 ? '♨️ Convection currents forming - hot water rises, cold water sinks!' :
               waterTemp < 100 ? '🔥 Strong convection - rapid circulation of water!' :
               '💨 Boiling point reached! Maximum molecular activity!'}
            </p>
            {isHeating && (
              <p className="text-gray-700 mt-2">
                💡 Tip: Tap the bubbles to pop them and earn +5 points each!
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const HeatCapacityGame = () => {
    const calculatedTemp = selectedObject 
      ? (20 + appliedHeat / (selectedObject.mass * selectedObject.heatCapacity)).toFixed(1)
      : 20;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5 overflow-y-auto">
        <button 
          className="mb-4 px-4 py-2 text-blue-600 font-semibold hover:text-blue-800"
          onClick={() => {
            setGameMode('menu');
            setSelectedObject(null);
            setAppliedHeat(0);
          }}
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Specific Heat Capacity</h2>
        
        {showConcept && (
          <div className="bg-yellow-50 mx-4 p-5 rounded-2xl border-l-4 border-yellow-400 mb-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-3">📚 Concept:</h3>
            <p className="text-yellow-800 leading-relaxed mb-3">
              Specific heat capacity is the amount of heat needed to raise the temperature of 1kg of a substance by 1°C. Different materials heat up at different rates!
            </p>
            <p className="text-lg font-bold text-red-600 text-center my-3">Q = m × c × ΔT</p>
            <p className="text-sm text-yellow-800 italic">
              Q = Heat energy (Joules), m = mass (grams), c = specific heat capacity (J/g°C), ΔT = temperature change (°C)
            </p>
            <button onClick={() => setShowConcept(false)} className="text-green-600 font-bold block mx-auto mt-3">
              Got it! 👍
            </button>
          </div>
        )}

        {showGuide && (
          <div className="bg-blue-50 mx-4 p-5 rounded-2xl border-l-4 border-blue-400 mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-3">🎮 How to Play:</h3>
            <p className="text-blue-800 mb-2">1️⃣ TAP on a substance card (Water, Iron, Copper, Oil)</p>
            <p className="text-blue-800 mb-2">2️⃣ TAP "+100J" or "+500J" buttons to add heat energy</p>
            <p className="text-blue-800 mb-2">3️⃣ TAP "-100J" to reduce heat energy</p>
            <p className="text-blue-800 mb-2">4️⃣ WATCH the thermometer fill up (🌡️)</p>
            <p className="text-blue-800 mb-2">5️⃣ SEE the temperature calculation in real-time</p>
            <p className="text-blue-800 mb-2">6️⃣ COMPARE how different materials heat up differently</p>
            <p className="text-blue-800 mb-2">7️⃣ TAP "Reset" to start fresh</p>
            <p className="text-blue-800 mb-3">💡 Each substance selection = +10 points!</p>
            <button onClick={() => setShowGuide(false)} className="text-blue-600 font-bold block mx-auto">
              Hide Guide ✕
            </button>
          </div>
        )}

        <div className="px-4">
          <p className="text-lg text-gray-800 mb-4 text-center font-semibold">Select a substance and apply heat:</p>
          
          <div className="flex flex-wrap justify-around gap-4 mb-8">
            {objects.map((obj, index) => (
              <button
                key={index}
                className={`w-40 p-4 rounded-2xl shadow-lg transition-all transform hover:scale-105 ${
                  selectedObject?.name === obj.name ? 'ring-4 ring-yellow-400' : ''
                }`}
                style={{ backgroundColor: obj.color }}
                onClick={() => {
                  setSelectedObject(obj);
                  setAppliedHeat(0);
                  setScore(prev => prev + 10);
                }}
              >
                <div className="text-lg font-bold text-white mb-2">{obj.name}</div>
                <div className="text-sm text-white">Mass: {obj.mass}g</div>
                <div className="text-sm text-white">c = {obj.heatCapacity} J/g°C</div>
              </button>
            ))}
          </div>

          {selectedObject && (
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Apply Heat Energy (Joules):</h3>
              
              <div className="mb-6">
                <p className="text-2xl font-bold text-red-600 text-center mb-4">{appliedHeat} J</p>
                <div className="flex gap-2 justify-center">
                  <button 
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600"
                    onClick={() => setAppliedHeat(Math.max(0, appliedHeat - 100))}
                  >
                    - 100J
                  </button>
                  <button 
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600"
                    onClick={() => setAppliedHeat(appliedHeat + 100)}
                  >
                    + 100J
                  </button>
                  <button 
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600"
                    onClick={() => setAppliedHeat(appliedHeat + 500)}
                  >
                    + 500J
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">🌡️ Temperature:</h3>
                <div className="w-16 h-52 bg-gray-200 rounded-full overflow-hidden flex flex-col justify-end">
                  <div 
                    className="w-full rounded-full transition-all duration-1000"
                    style={{
                      height: `${Math.min((tempAnimation / 100) * 100, 100)}%`,
                      backgroundColor: parseFloat(calculatedTemp) > 60 ? '#e74c3c' : '#3498db',
                    }}
                  />
                </div>
                <p className="text-3xl font-bold text-gray-800 mt-3">{calculatedTemp}°C</p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl mb-4">
                <h3 className="text-lg font-bold text-green-700 mb-2">📊 Calculation:</h3>
                <p className="text-gray-700 mb-1">Q = {appliedHeat} J</p>
                <p className="text-gray-700 mb-1">
                  ΔT = Q / (m × c) = {appliedHeat} / ({selectedObject.mass} × {selectedObject.heatCapacity})
                </p>
                <p className="text-gray-700 mb-2">
                  ΔT = {(appliedHeat / (selectedObject.mass * selectedObject.heatCapacity)).toFixed(2)}°C
                </p>
                <p className="text-red-600 font-bold">
                  Final Temperature = 20°C + {(appliedHeat / (selectedObject.mass * selectedObject.heatCapacity)).toFixed(2)}°C = {calculatedTemp}°C
                </p>
              </div>

              <button 
                className="w-full p-4 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600"
                onClick={() => setAppliedHeat(0)}
              >
                Reset Experiment
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ChallengeMode = () => {
    const [question, setQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const questions = [
      {
        q: "Which material is the best conductor of heat?",
        options: ["Wood", "Copper", "Plastic", "Air"],
        correct: 1,
        explanation: "Copper has high thermal conductivity, making it an excellent heat conductor!"
      },
      {
        q: "What happens to hot water in convection?",
        options: ["It sinks", "It rises", "It stays still", "It freezes"],
        correct: 1,
        explanation: "Hot water is less dense, so it rises, creating convection currents!"
      },
      {
        q: "Water has a high specific heat capacity. What does this mean?",
        options: [
          "It boils quickly",
          "It needs a lot of heat to change temperature",
          "It's a good conductor",
          "It freezes easily"
        ],
        correct: 1,
        explanation: "Water needs 4.18 J to raise 1g by 1°C - it resists temperature change!"
      },
      {
        q: "Which is an example of heat transfer by radiation?",
        options: [
          "Touching a hot pan",
          "Hot air rising",
          "Sun warming your face",
          "Boiling water"
        ],
        correct: 2,
        explanation: "The sun transfers heat through radiation - no medium needed!"
      },
      {
        q: "Why do metals feel colder than wood at room temperature?",
        options: [
          "Metals are actually colder",
          "Metals conduct heat away from your hand faster",
          "Wood is warmer",
          "Metals don't feel cold"
        ],
        correct: 1,
        explanation: "Metals conduct heat away from your hand quickly, making them feel colder!"
      }
    ];

    const currentQ = questions[question];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5 overflow-y-auto">
        <button 
          className="mb-4 px-4 py-2 text-blue-600 font-semibold hover:text-blue-800"
          onClick={() => setGameMode('menu')}
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">🏆 Challenge Mode</h2>
        <p className="text-center text-gray-600 mb-6">Question {question + 1} of {questions.length}</p>

        {showGuide && question === 0 && (
          <div className="bg-blue-50 mx-4 p-5 rounded-2xl border-l-4 border-blue-400 mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-3">🎮 How to Play:</h3>
            <p className="text-blue-800 mb-2">1️⃣ READ the question carefully</p>
            <p className="text-blue-800 mb-2">2️⃣ TAP on your answer choice</p>
            <p className="text-blue-800 mb-2">3️⃣ TAP "Submit Answer" button</p>
            <p className="text-blue-800 mb-2">4️⃣ SEE if you're correct (Green ✅ or Red ❌)</p>
            <p className="text-blue-800 mb-2">5️⃣ READ the explanation to learn</p>
            <p className="text-blue-800 mb-2">6️⃣ TAP "Next Question" to continue</p>
            <p className="text-blue-800 mb-3">💡 Each correct answer = +100 points!</p>
            <button onClick={() => setShowGuide(false)} className="text-blue-600 font-bold block mx-auto">
              Hide Guide ✕
            </button>
          </div>
        )}

        <div className="bg-white p-6 mx-4 rounded-2xl shadow-lg">
          <p className="text-xl font-bold text-gray-800 mb-6 text-center">{currentQ.q}</p>

          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-5 rounded-xl mb-3 font-medium transition-all ${
                userAnswer === index && !showResult ? 'bg-blue-500 text-white' :
                showResult && index === currentQ.correct ? 'bg-green-500 text-white' :
                showResult && userAnswer === index && index !== currentQ.correct ? 'bg-red-500 text-white' :
                'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => {
                if (!showResult) {
                  setUserAnswer(index);
                }
              }}
              disabled={showResult}
            >
              {option}
            </button>
          ))}

          {!showResult && userAnswer !== null && (
            <button
              className="w-full p-4 bg-yellow-500 text-white rounded-xl font-bold mt-4 hover:bg-yellow-600"
              onClick={() => {
                setShowResult(true);
                if (userAnswer === currentQ.correct) {
                  setScore(prev => prev + 100);
                }
              }}
            >
              Submit Answer
            </button>
          )}

          {showResult && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className={`text-2xl font-bold text-center mb-3 ${
                userAnswer === currentQ.correct ? 'text-green-600' : 'text-red-600'
              }`}>
                {userAnswer === currentQ.correct ? '✅ Correct!' : '❌ Incorrect'}
              </p>
              <p className="text-gray-700 italic text-center mb-4">{currentQ.explanation}</p>
              
              <button
                className="w-full p-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600"
                onClick={() => {
                  if (question < questions.length - 1) {
                    setQuestion(question + 1);
                    setUserAnswer(null);
                    setShowResult(false);
                  } else {
                    alert(`Challenge Complete!\n\nYour final score: ${score} points!\n\nGreat job learning about heat!`);
                    setGameMode('menu');
                  }
                }}
              >
                {question < questions.length - 1 ? 'Next Question →' : 'Finish Challenge'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {gameMode === 'menu' && <MainMenu />}
      {gameMode === 'conduction' && <ConductionGame />}
      {gameMode === 'convection' && <ConvectionGame />}
      {gameMode === 'heatCapacity' && <HeatCapacityGame />}
      {gameMode === 'challenge' && <ChallengeMode />}
    </div>
  );
};

export default Conductivity;