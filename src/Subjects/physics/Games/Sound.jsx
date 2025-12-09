import React, { useEffect, useMemo, useRef, useState } from "react";

// Tailwind-only rewrite of the original React Native mini‑games.
// Function names and flows stay the same; components now render web-friendly divs/buttons.

const ANIMATION_STYLES = `
@keyframes sound-wave-move { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }
@keyframes frequency-pulse { 0% { transform: scaleY(0); opacity: .7; } 50% { transform: scaleY(1); opacity: 1; } 100% { transform: scaleY(0); opacity: .7; } }
@keyframes resonance-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
@keyframes echo-move { 0% { left: 10%; opacity: 1; } 50% { left: 90%; opacity: .7; } 100% { left: 10%; opacity: 0; } }
`;

const media = [
  { name: "Air", speed: 343, color: "#87CEEB", emoji: "💨", density: "Low" },
  { name: "Water", speed: 1482, color: "#4A90E2", emoji: "💧", density: "Medium" },
  { name: "Wood", speed: 3960, color: "#8B4513", emoji: "🪵", density: "High" },
  { name: "Steel", speed: 5960, color: "#696969", emoji: "⚙️", density: "Very High" },
  { name: "Vacuum", speed: 0, color: "#2C3E50", emoji: "🌌", density: "None" },
];

const notes = [
  { name: "C4", frequency: 262, color: "#FF6B6B" },
  { name: "D4", frequency: 294, color: "#FFA07A" },
  { name: "E4", frequency: 330, color: "#FFD93D" },
  { name: "F4", frequency: 349, color: "#6BCB77" },
  { name: "G4", frequency: 392, color: "#4D96FF" },
  { name: "A4", frequency: 440, color: "#9B59B6" },
  { name: "B4", frequency: 494, color: "#E74C3C" },
];

const questions = [
  {
    q: "In which medium does sound travel fastest?",
    options: ["Air", "Water", "Wood", "Steel"],
    correct: 3,
    explanation: "Sound travels fastest in steel (~5960 m/s) because of its high density and elasticity!",
  },
  {
    q: "What determines the pitch of a sound?",
    options: ["Amplitude", "Frequency", "Speed", "Medium"],
    correct: 1,
    explanation: "Frequency determines pitch! Higher frequency = higher pitch.",
  },
  {
    q: "Can sound travel through vacuum?",
    options: ["Yes, slowly", "Yes, quickly", "No", "Only ultrasound can"],
    correct: 2,
    explanation: "Sound cannot travel through vacuum because there are no particles to vibrate!",
  },
  {
    q: "What is the speed of sound in air at 20°C approximately?",
    options: ["143 m/s", "243 m/s", "343 m/s", "443 m/s"],
    correct: 2,
    explanation: "At 20°C, sound travels at approximately 343 m/s in air!",
  },
  {
    q: "What happens during resonance?",
    options: ["Sound gets absorbed", "Two objects vibrate at the same frequency", "Sound reflects back", "Sound speed increases"],
    correct: 1,
    explanation: "Resonance occurs when objects vibrate at the same natural frequency, amplifying the vibration!",
  },
  {
    q: "What is an echo?",
    options: ["Multiple sounds at once", "Very loud sound", "Reflected sound", "High frequency sound"],
    correct: 2,
    explanation: "Echo is a reflected sound wave that bounces back from a surface!",
  },
];

const Sound = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameMode, setGameMode] = useState("menu");
  const [showConcept, setShowConcept] = useState(true);
  const [showGuide, setShowGuide] = useState(true);

  const [selectedMedium, setSelectedMedium] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const waveKey = useRef(0);

  const [frequency, setFrequency] = useState(440);
  const [amplitude, setAmplitude] = useState(50);

  const [targetFrequency, setTargetFrequency] = useState(256);
  const [userFrequency, setUserFrequency] = useState(200);
  const [isMatched, setIsMatched] = useState(false);
  const resonanceKey = useRef(0);

  const [distance, setDistance] = useState(170);
  const [temperature, setTemperature] = useState(20);
  const [echoKey, setEchoKey] = useState(0);

  const [question, setQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!document.getElementById("sound-game-styles")) {
      const style = document.createElement("style");
      style.id = "sound-game-styles";
      style.textContent = ANIMATION_STYLES;
      document.head.append(style);
    }
  }, []);

  useEffect(() => {
    setIsMatched(false);
  }, [userFrequency, targetFrequency]);

  const waveDuration = useMemo(() => {
    if (!selectedMedium || selectedMedium.speed <= 0) return 1500;
    return Math.max(800, 5000 / (selectedMedium.speed / 1000));
  }, [selectedMedium]);

  const frequencyDuration = useMemo(() => Math.max(300, 2000 / (frequency / 440)), [frequency]);

  const calculateEchoTime = () => {
    const speedOfSound = 331.5 + 0.6 * temperature;
    const totalDistance = distance * 2;
    return (totalDistance / speedOfSound).toFixed(3);
  };

  const handleResonanceCheck = () => {
    const diff = Math.abs(userFrequency - targetFrequency);
    if (diff <= 10) {
      setIsMatched(true);
      setScore((p) => p + 100);
      resonanceKey.current += 1;
      window.alert("🎉 Resonance Achieved! Perfect match!");
    } else {
      window.alert(`Not quite... You're ${diff} Hz away from resonance. Keep adjusting!`);
    }
  };

  const startEcho = () => {
    setScore((p) => p + 20);
    setEchoKey((k) => k + 1);
  };

  const MainMenu = () => (
    <div className="min-h-screen px-4 py-6 bg-slate-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mt-4 mb-2">
          🔊 Sound Master Game 🔊
        </h1>
        <p className="text-center text-slate-600 mb-6">Explore the Physics of Sound!</p>

        <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center mb-6">
          <div className="bg-white rounded-xl shadow px-6 py-4 flex-1 text-center">
            <div className="text-lg font-semibold text-emerald-600">Score</div>
            <div className="text-2xl font-bold">{score}</div>
          </div>
          <div className="bg-white rounded-xl shadow px-6 py-4 flex-1 text-center">
            <div className="text-lg font-semibold text-blue-600">Level</div>
            <div className="text-2xl font-bold">{currentLevel}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            className="w-full rounded-2xl bg-teal-400 text-white px-6 py-4 text-left shadow hover:shadow-lg transition"
            onClick={() => {
              setGameMode("soundWaves");
              setShowConcept(true);
              setShowGuide(true);
            }}
          >
            <div className="text-xl font-bold">🌊 Sound Wave Travel</div>
            <div className="text-sm opacity-90">See how sound travels through different media</div>
          </button>
          <button
            className="w-full rounded-2xl bg-purple-500 text-white px-6 py-4 text-left shadow hover:shadow-lg transition"
            onClick={() => {
              setGameMode("frequency");
              setShowConcept(true);
              setShowGuide(true);
            }}
          >
            <div className="text-xl font-bold">🎵 Frequency & Pitch</div>
            <div className="text-sm opacity-90">Learn about sound frequency and amplitude</div>
          </button>
          <button
            className="w-full rounded-2xl bg-orange-500 text-white px-6 py-4 text-left shadow hover:shadow-lg transition"
            onClick={() => {
              setGameMode("resonance");
              setShowConcept(true);
              setShowGuide(true);
            }}
          >
            <div className="text-xl font-bold">🔔 Resonance & Tuning</div>
            <div className="text-sm opacity-90">Discover resonance and natural frequencies</div>
          </button>
          <button
            className="w-full rounded-2xl bg-blue-500 text-white px-6 py-4 text-left shadow hover:shadow-lg transition"
            onClick={() => {
              setGameMode("echo");
              setShowConcept(true);
              setShowGuide(true);
            }}
          >
            <div className="text-xl font-bold">📢 Echo & Reflection</div>
            <div className="text-sm opacity-90">Calculate echo time and sound reflection</div>
          </button>
          <button
            className="w-full rounded-2xl bg-rose-500 text-white px-6 py-4 text-left shadow hover:shadow-lg transition md:col-span-2"
            onClick={() => {
              setGameMode("challenge");
              setShowConcept(true);
              setShowGuide(true);
            }}
          >
            <div className="text-xl font-bold">🏆 Sound Challenge</div>
            <div className="text-sm opacity-90">Test your sound physics knowledge!</div>
          </button>
        </div>
      </div>
    </div>
  );

  const InfoCard = ({ title, body, onHide }) => (
    <div className="bg-amber-100 border-l-4 border-amber-400 rounded-lg p-4 mb-4">
      <div className="text-lg font-bold text-amber-800 mb-2">{title}</div>
      <div className="text-sm text-amber-800 leading-relaxed">{body}</div>
      {onHide && (
        <button onClick={onHide} className="mt-2 text-emerald-600 font-semibold">
          Got it!
        </button>
      )}
    </div>
  );

  const GuideCard = ({ steps, onHide }) => (
    <div className="bg-sky-100 border-l-4 border-sky-500 rounded-lg p-4 mb-4">
      <div className="text-lg font-bold text-sky-800 mb-2">🎮 How to Play:</div>
      <ul className="space-y-1 text-sky-800 text-sm">
        {steps.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ul>
      {onHide && (
        <button onClick={onHide} className="mt-2 text-sky-700 font-semibold">
          Hide Guide ✕
        </button>
      )}
    </div>
  );

  const SoundWaveGame = () => (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <button
          className="text-blue-600 font-semibold mb-3"
          onClick={() => {
            setGameMode("menu");
            setSelectedMedium(null);
            setIsPlaying(false);
          }}
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Sound Wave Propagation</h2>

        {showConcept && (
          <InfoCard
            title="📚 Concept:"
            body="Sound is a mechanical wave that needs a medium to travel. Denser media generally transmit sound faster! Speed = Distance / Time. Sound speed in air ≈ 343 m/s, water ≈ 1482 m/s, steel ≈ 5960 m/s."
            onHide={() => setShowConcept(false)}
          />
        )}

        {showGuide && (
          <GuideCard
            steps={[
              "1️⃣ Tap on a medium card (Air, Water, Wood, Steel, Vacuum)",
              '2️⃣ Tap "Play Sound" to start the wave animation',
              "3️⃣ Watch how fast the wave travels through the medium",
              "4️⃣ Observe the wave pattern and speed",
              "5️⃣ Try all media to compare speeds!",
              "6️⃣ Note: Sound cannot travel through vacuum!",
              "💡 Each medium selection = +10 points!",
            ]}
            onHide={() => setShowGuide(false)}
          />
        )}

        <div className="bg-white rounded-2xl shadow p-4 mb-4">
          <div className="text-center text-lg font-semibold text-slate-700 mb-3">
            Select a medium and see how sound travels:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {media.map((medium) => (
              <button
                key={medium.name}
                className={`rounded-xl text-white p-4 shadow transition transform hover:-translate-y-1 ${
                  selectedMedium?.name === medium.name ? "ring-4 ring-amber-400" : ""
                }`}
                style={{ backgroundColor: medium.color }}
                onClick={() => {
                  setSelectedMedium(medium);
                  setIsPlaying(false);
                  setScore((p) => p + 10);
                }}
              >
                <div className="text-2xl mb-1">{medium.emoji}</div>
                <div className="font-bold">{medium.name}</div>
                <div className="text-sm font-semibold">{medium.speed} m/s</div>
                <div className="text-xs mt-1">Density: {medium.density}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedMedium && (
          <div className="bg-white rounded-2xl shadow p-4 space-y-4">
            <div className="text-center font-bold text-lg text-slate-800">Sound Wave Visualization</div>
            <div className="relative h-28 bg-slate-200 rounded-xl overflow-hidden flex items-center justify-between px-3">
              <div className="text-3xl">🔊</div>
              <div className="flex-1 h-full relative">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={`${waveKey.current}-${i}`}
                    className={isPlaying ? "absolute top-3 h-16 w-1 rounded bg-blue-500" : "absolute top-3 h-16 w-1 rounded bg-blue-400"}
                    style={{
                      animation: isPlaying ? `sound-wave-move ${waveDuration}ms linear infinite` : "none",
                      animationDelay: `${i * 150}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="text-3xl">👂</div>
            </div>

            <button
              className={`w-full rounded-xl text-white py-3 font-bold ${
                isPlaying ? "bg-orange-500" : "bg-emerald-600"
              }`}
              onClick={() => {
                if (selectedMedium.name === "Vacuum") {
                  window.alert("Sound cannot travel through vacuum because there are no particles to vibrate!");
                  return;
                }
                setIsPlaying((p) => !p);
                waveKey.current += 1;
              }}
            >
              {isPlaying ? "⏸️ Pause Sound" : "▶️ Play Sound"}
            </button>

            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="font-semibold text-emerald-700 mb-1">📊 Medium Properties:</div>
              <div className="text-sm text-slate-700">Medium: {selectedMedium.name}</div>
              <div className="text-sm text-slate-700">Speed: {selectedMedium.speed} m/s</div>
              <div className="text-sm text-slate-700">Particle Density: {selectedMedium.density}</div>
              <div className="text-sm text-slate-700">
                {selectedMedium.speed > 0
                  ? `Time to travel 1 km: ${(1000 / selectedMedium.speed).toFixed(2)} seconds`
                  : "Sound cannot travel through vacuum!"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const FrequencyGame = () => (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <button className="text-blue-600 font-semibold mb-3" onClick={() => setGameMode("menu")}>
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Frequency & Pitch Explorer</h2>

        {showConcept && (
          <InfoCard
            title="📚 Concept:"
            body="Frequency (Hz) determines pitch; higher frequency means higher pitch. Amplitude determines loudness. Human hearing: 20-20,000 Hz. f = 1/T."
            onHide={() => setShowConcept(false)}
          />
        )}

        {showGuide && (
          <GuideCard
            steps={[
              "1️⃣ Tap musical note buttons (C, D, E, F, G, A, B)",
              "2️⃣ Use +/- buttons to adjust frequency (20-2000 Hz)",
              "3️⃣ Adjust amplitude buttons to change loudness",
              "4️⃣ Watch the wave pattern change in real-time",
              "5️⃣ More waves = higher frequency = higher pitch",
              "6️⃣ Each note played = +15 points!",
            ]}
            onHide={() => setShowGuide(false)}
          />
        )}

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow">
            <div className="text-center font-bold text-lg mb-3">🎹 Musical Notes</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {notes.map((note) => (
                <button
                  key={note.name}
                  className="rounded-xl text-white py-3 font-bold shadow"
                  style={{ backgroundColor: note.color }}
                  onClick={() => {
                    setFrequency(note.frequency);
                    setScore((p) => p + 15);
                  }}
                >
                  <div>{note.name}</div>
                  <div className="text-xs opacity-90">{note.frequency} Hz</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow space-y-3">
            <div className="text-center font-bold text-lg">🎚️ Custom Frequency</div>
            <div className="text-center text-3xl font-bold text-blue-600">{frequency} Hz</div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "-50 Hz", delta: -50 },
                { label: "-10 Hz", delta: -10 },
                { label: "+10 Hz", delta: 10 },
                { label: "+50 Hz", delta: 50 },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="bg-blue-500 text-white rounded-lg py-2 text-sm font-bold"
                  onClick={() => setFrequency((f) => Math.min(2000, Math.max(20, f + btn.delta)))}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-slate-600">
              {frequency < 100
                ? "🔉 Very Low Pitch"
                : frequency < 300
                ? "🔉 Low Pitch"
                : frequency < 600
                ? "🔊 Medium Pitch"
                : frequency < 1000
                ? "🔊 High Pitch"
                : "🔊 Very High Pitch"}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow space-y-3">
            <div className="text-center font-bold text-lg">📢 Amplitude (Loudness)</div>
            <div className="text-center text-3xl font-bold text-rose-600">{amplitude}%</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "-10%", delta: -10 },
                { label: "+10%", delta: 10 },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="bg-blue-500 text-white rounded-lg py-2 text-sm font-bold"
                  onClick={() => setAmplitude((a) => Math.min(100, Math.max(10, a + btn.delta)))}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-slate-600">
              {amplitude < 30 ? "🔇 Quiet" : amplitude < 70 ? "🔉 Moderate" : "🔊 Loud"}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <div className="text-center font-bold text-lg mb-3">🌊 Wave Pattern</div>
            <div className="relative h-32 bg-slate-200 rounded-xl overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-1/2 w-2 bg-blue-500 rounded"
                  style={{
                    left: `${i * 12.5}%`,
                    transformOrigin: "bottom",
                    animation: `frequency-pulse ${frequencyDuration}ms ease-in-out infinite`,
                    animationDelay: `${i * 80}ms`,
                    height: `${amplitude}%`,
                  }}
                />
              ))}
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 mt-3 text-sm text-emerald-700 space-y-1">
              <div>Higher frequency = More waves per second</div>
              <div>Higher amplitude = Taller waves (louder)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ResonanceGame = () => (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <button className="text-blue-600 font-semibold mb-3" onClick={() => setGameMode("menu")}>
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Resonance & Tuning</h2>

        {showConcept && (
          <InfoCard
            title="📚 Concept:"
            body="Resonance occurs when an object vibrates at its natural frequency in response to another vibration of the same frequency. Examples: tuning fork, musical instruments, wine glass shattering."
            onHide={() => setShowConcept(false)}
          />
        )}

        {showGuide && (
          <GuideCard
            steps={[
              "1️⃣ See the target tuning fork frequency",
              "2️⃣ Adjust your frequency using +/- buttons",
              '3️⃣ Tap "Check Resonance" to test',
              "4️⃣ Get within ±10 Hz for resonance!",
              "5️⃣ Watch the tuning forks vibrate together",
              "6️⃣ Perfect resonance = +100 points!",
            ]}
            onHide={() => setShowGuide(false)}
          />
        )}

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow">
            <div className="text-center font-bold text-lg mb-3">🎯 Target Tuning Fork</div>
            <div
              className="rounded-xl bg-slate-50 p-6 text-center"
              style={{
                animation: isMatched ? `resonance-pulse 1s ease-in-out infinite` : "none",
              }}
              key={resonanceKey.current}
            >
              <div className="text-5xl mb-2">🔔</div>
              <div className="text-3xl font-bold text-blue-600">{targetFrequency} Hz</div>
              {isMatched && <div className="text-lg font-semibold text-emerald-600 mt-2">✨ RESONATING! ✨</div>}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow space-y-3">
            <div className="text-center font-bold text-lg">🎵 Your Tuning Fork</div>
            <div className="rounded-xl bg-slate-50 p-4 text-center">
              <div className="text-5xl mb-1">🔔</div>
              <div className="text-3xl font-bold text-rose-600">{userFrequency} Hz</div>
              <div className="text-sm text-slate-600">Difference: {Math.abs(userFrequency - targetFrequency)} Hz</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "-50 Hz", delta: -50 },
                { label: "-5 Hz", delta: -5 },
                { label: "+5 Hz", delta: 5 },
                { label: "+50 Hz", delta: 50 },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="bg-blue-500 text-white rounded-lg py-2 text-sm font-bold"
                  onClick={() => setUserFrequency((f) => Math.min(1000, Math.max(50, f + btn.delta)))}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-emerald-600 text-white rounded-xl py-3 font-bold shadow" onClick={handleResonanceCheck}>
            Check Resonance 🔍
          </button>

          <button
            className="w-full bg-purple-600 text-white rounded-xl py-3 font-bold shadow"
            onClick={() => {
              setTargetFrequency(Math.floor(Math.random() * 450) + 100);
              setUserFrequency(200);
              setIsMatched(false);
            }}
          >
            New Challenge 🔄
          </button>

          <div className="bg-emerald-50 rounded-xl p-4 text-sm text-slate-700">
            💡 When two tuning forks have the same natural frequency, striking one will cause the other to vibrate through resonance, even without direct contact!
          </div>
        </div>
      </div>
    </div>
  );

  const EchoGame = () => (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <button className="text-blue-600 font-semibold mb-3" onClick={() => setGameMode("menu")}>
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Echo & Sound Reflection</h2>

        {showConcept && (
          <InfoCard
            title="📚 Concept:"
            body="Echo is the reflection of sound. The time for an echo depends on distance and sound speed. Sound speed increases with temperature. Time = (2 × Distance) / Speed."
            onHide={() => setShowConcept(false)}
          />
        )}

        {showGuide && (
          <GuideCard
            steps={[
              "1️⃣ Set distance to obstacle (17-500 meters)",
              "2️⃣ Set air temperature (-10 to 40°C)",
              '3️⃣ Tap "Create Echo" to send sound wave',
              "4️⃣ Watch sound travel to wall and back",
              "5️⃣ See calculated echo time",
              "6️⃣ Each echo test = +20 points!",
            ]}
            onHide={() => setShowGuide(false)}
          />
        )}

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow relative h-40 flex items-center justify-center overflow-hidden">
            <div className="absolute left-4 text-4xl">🧍</div>
            <div className="absolute right-4 text-4xl">🧱</div>
            <div
              key={echoKey}
              className="absolute text-3xl text-blue-500 font-bold"
              style={{
                animation: `echo-move ${parseFloat(calculateEchoTime()) * 700 + 700}ms ease-in-out`,
              }}
            >
              ))))
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow space-y-3">
            <div className="text-center font-bold text-lg">Distance to Obstacle: {distance}m</div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "-10m", delta: -10 },
                { label: "-1m", delta: -1 },
                { label: "+1m", delta: 1 },
                { label: "+10m", delta: 10 },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="bg-blue-500 text-white rounded-lg py-2 text-sm font-bold"
                  onClick={() => setDistance((d) => Math.min(500, Math.max(17, d + btn.delta)))}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow space-y-3">
            <div className="text-center font-bold text-lg">Air Temperature: {temperature}°C</div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "-5°C", delta: -5 },
                { label: "-1°C", delta: -1 },
                { label: "+1°C", delta: 1 },
                { label: "+5°C", delta: 5 },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="bg-blue-500 text-white rounded-lg py-2 text-sm font-bold"
                  onClick={() => setTemperature((t) => Math.min(40, Math.max(-10, t + btn.delta)))}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-rose-600 text-white rounded-xl py-3 font-bold shadow" onClick={startEcho}>
            Create Echo 📢
          </button>

          <div className="bg-white rounded-2xl p-4 shadow space-y-2 text-sm text-slate-700">
            <div className="text-center text-lg font-bold text-blue-600">📊 Calculations</div>
            <div>Sound Speed = 331.5 + (0.6 × {temperature}) = {(331.5 + 0.6 * temperature).toFixed(1)} m/s</div>
            <div>Total Distance = 2 × {distance}m = {distance * 2}m</div>
            <div>
              Echo Time = {distance * 2} / {(331.5 + 0.6 * temperature).toFixed(1)} = {calculateEchoTime()} seconds
            </div>
            <div className="font-semibold text-emerald-700">
              🔊 You will hear the echo after {calculateEchoTime()} seconds!
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 text-sm text-slate-700 space-y-1">
            <div>• Minimum distance for distinct echo: 17 meters (at 20°C)</div>
            <div>• Bats use echolocation with ultrasonic sounds</div>
            <div>• Sonar uses echo to measure ocean depth</div>
          </div>
        </div>
      </div>
    </div>
  );

  const ChallengeMode = () => {
    const currentQ = questions[question];
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <button className="text-blue-600 font-semibold mb-3" onClick={() => setGameMode("menu")}>
            ← Back
          </button>
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">🏆 Sound Challenge</h2>
          <div className="text-center text-sm text-slate-600 mb-4">
            Question {question + 1} of {questions.length}
          </div>

          {showGuide && question === 0 && (
            <GuideCard
              steps={[
                "1️⃣ Read the question carefully",
                "2️⃣ Tap on your answer choice",
                '3️⃣ Tap "Submit Answer" button',
                "4️⃣ Green ✅ correct or Red ❌ incorrect",
                "5️⃣ Read the explanation to learn",
                "6️⃣ Each correct answer = +100 points!",
              ]}
              onHide={() => setShowGuide(false)}
            />
          )}

          <div className="bg-white rounded-2xl p-5 shadow space-y-3">
            <div className="text-center text-xl font-bold text-slate-800">{currentQ.q}</div>
            <div className="space-y-2">
              {currentQ.options.map((option, idx) => {
                const isCorrect = showResult && idx === currentQ.correct;
                const isWrong = showResult && userAnswer === idx && idx !== currentQ.correct;
                const isSelected = userAnswer === idx && !showResult;
                return (
                  <button
                    key={idx}
                    className={`w-full text-left rounded-xl px-4 py-3 border transition ${
                      isCorrect
                        ? "bg-emerald-500 text-white"
                        : isWrong
                        ? "bg-rose-500 text-white"
                        : isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                    onClick={() => {
                      if (!showResult) setUserAnswer(idx);
                    }}
                    disabled={showResult}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {!showResult && userAnswer !== null && (
              <button
                className="w-full bg-amber-500 text-white rounded-xl py-3 font-bold"
                onClick={() => {
                  setShowResult(true);
                  if (userAnswer === currentQ.correct) setScore((p) => p + 100);
                }}
              >
                Submit Answer
              </button>
            )}

            {showResult && (
              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                <div
                  className={`text-center text-2xl font-bold ${
                    userAnswer === currentQ.correct ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {userAnswer === currentQ.correct ? "✅ Correct!" : "❌ Incorrect"}
                </div>
                <div className="text-center text-sm text-slate-700 italic">{currentQ.explanation}</div>
                <button
                  className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold"
                  onClick={() => {
                    if (question < questions.length - 1) {
                      setQuestion((q) => q + 1);
                      setUserAnswer(null);
                      setShowResult(false);
                    } else {
                      window.alert(`Challenge Complete! 🎉 Your final score: ${score} points!`);
                      setGameMode("menu");
                    }
                  }}
                >
                  {question < questions.length - 1 ? "Next Question →" : "Finish Challenge"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {gameMode === "menu" && <MainMenu />}
      {gameMode === "soundWaves" && <SoundWaveGame />}
      {gameMode === "frequency" && <FrequencyGame />}
      {gameMode === "resonance" && <ResonanceGame />}
      {gameMode === "echo" && <EchoGame />}
      {gameMode === "challenge" && <ChallengeMode />}
    </div>
  );
};

export default Sound;