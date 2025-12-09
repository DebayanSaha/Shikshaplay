// src/screens/Atoms.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ELEMENTS = [
  { symbol: "H", name: "Hydrogen", Z: 1, neutrons: 0 },
  { symbol: "He", name: "Helium", Z: 2, neutrons: 2 },
  { symbol: "Li", name: "Lithium", Z: 3, neutrons: 4 },
  { symbol: "Be", name: "Beryllium", Z: 4, neutrons: 5 },
  { symbol: "B", name: "Boron", Z: 5, neutrons: 6 },
  { symbol: "C", name: "Carbon", Z: 6, neutrons: 6 },
  { symbol: "N", name: "Nitrogen", Z: 7, neutrons: 7 },
  { symbol: "O", name: "Oxygen", Z: 8, neutrons: 8 },
  { symbol: "F", name: "Fluorine", Z: 9, neutrons: 10 },
  { symbol: "Ne", name: "Neon", Z: 10, neutrons: 10 },
];

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

export default function Atoms() {
  const { t } = useTranslation();

  const [level, setLevel] = useState(0);
  const [protons, setProtons] = useState(0);
  const [neutrons, setNeutrons] = useState(0);
  const [electrons, setElectrons] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [running, setRunning] = useState(true);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const target = ELEMENTS[level];
  const orbits = [150, 250, 350]; // px

  // Orbit rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => r.map((val, i) => (val + (0.1 + i * 0.05)) % 360));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const startRound = () => {
    setProtons(0);
    setNeutrons(0);
    setElectrons(0);
    setTimeLeft(45 - Math.min(30, level * 3));
    setRunning(true);
  };

  useEffect(startRound, [level]);

  // Timer
  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      handleSubmit();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, running]);

  const checkAtom = () => ({
    protonsOk: protons === target.Z,
    neutronsOk: Math.abs(neutrons - target.neutrons) <= 1,
    electronsOk: electrons === target.Z,
  });

  const handleSubmit = () => {
    setRunning(false);
    const { protonsOk, neutronsOk, electronsOk } = checkAtom();

    if (protonsOk && neutronsOk && electronsOk) {
      const gained = 100 + timeLeft * 5 + level * 20;
      setScore((s) => s + gained);
      alert(
        `${t('subjects.games.atoms.perfect')}\n${t('subjects.games.atoms.built_successfully', { element: target.name, points: gained })}`
      );
      setLevel(clamp(level + 1, 0, ELEMENTS.length - 1));
    } else {
      const penalty = 30;
      setScore((s) => Math.max(0, s - penalty));
      let msg = "";
      if (!protonsOk) msg += t('subjects.games.atoms.protons_should_be', { count: target.Z }) + "\n";
      if (!electronsOk) msg += t('subjects.games.atoms.electrons_should_be', { count: target.Z }) + "\n";
      if (!neutronsOk) msg += t('subjects.games.atoms.neutrons_should_be', { count: target.neutrons }) + "\n";

      alert(`${t('subjects.games.atoms.almost')}\n${msg}${t('subjects.games.atoms.penalty_points', { penalty })}`);
      startRound();
    }
  };

  const change = (type, delta) => {
    if (!running) return;
    if (type === "p") setProtons((v) => clamp(v + delta, 0, 30));
    if (type === "n") setNeutrons((v) => clamp(v + delta, 0, 40));
    if (type === "e") setElectrons((v) => clamp(v + delta, 0, 30));
  };

  // Render nucleus particles
  const renderNucleus = () => {
    const total = protons + neutrons || 1;
    const radius = 30;
    const items = [];
    for (let i = 0; i < total; i++) {
      const angle = (i / total) * 2 * Math.PI;
      const r = radius * (0.3 + Math.random() * 0.7);
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      const isProton = i < protons;
      items.push(
        <div
          key={`nuc-${i}`}
          className={`absolute w-4 h-4 rounded-full border`}
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(33% + ${y}px)`,
            backgroundColor: isProton ? "#ff6b6b" : "#cfcfcf",
            borderColor: isProton ? "#ff3b3b" : "#999",
          }}
        />
      );
    }
    return items;
  };

  // Render electrons
  const renderElectrons = () => {
    const items = [];
    let left = electrons;
    let shell = 0;
    while (left > 0 && shell < orbits.length) {
      const cap = shell === 0 ? 2 : 8;
      const count = Math.min(left, cap);
      const r = orbits[shell];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI;
        const rot = rotation[shell] * (Math.PI / 180);
        const x = r + r * Math.cos(angle + rot) - 9;
        const y = r + r * Math.sin(angle + rot) - 9;
        items.push(
          <div
            key={`e-${shell}-${i}`}
            className="absolute w-4 h-4 rounded-full bg-blue-300 border border-blue-400"
            style={{
              left: `calc(50% + ${x - r}px)`,
              top: `calc(33% + ${y - r}px)`,
            }}
          />
        );
      }
      left -= count;
      shell++;
    }
    return items;
  };

  return (
    <div className="bg-[#0a0f1f] min-h-screen text-white p-4">
      {/* Header */}
      <div className="text-center my-4">
        <h1 className="text-3xl font-extrabold text-[#8fd3ff] drop-shadow-lg">⚛️ Atom Builder</h1>
        <p className="text-[#c5e6ff] mt-1">
          Level {level + 1} — {target.name} ({target.symbol})
        </p>
      </div>

      {/* Info Panel */}
      <div className="flex justify-around mt-2 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 w-24 text-center">
          <p className="text-sm text-[#9bbddf]">Atomic No</p>
          <p className="text-lg font-bold mt-1">{target.Z}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 w-24 text-center">
          <p className="text-sm text-[#9bbddf]">Neutrons</p>
          <p className="text-lg font-bold mt-1">{target.neutrons}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 w-24 text-center">
          <p className="text-sm text-[#9bbddf]">Time</p>
          <p className={`text-lg font-bold mt-1 ${timeLeft <= 10 ? "text-red-500" : "text-white"}`}>
            {timeLeft}s
          </p>
        </div>
      </div>

      {/* Atom Canvas */}
      <div className="relative w-full h-[400px] my-4">
        <div className="absolute w-36 h-36 rounded-full bg-[#2ab3ff33]" style={{ left: "50%", top: "33%", transform: "translate(-50%, -50%)" }} />
        <div className="absolute w-14 h-14 rounded-full bg-white border-2 border-[#a8ddff] flex items-center justify-center" style={{ left: "50%", top: "33%", transform: "translate(-50%, -50%)" }}>
          <span className="font-bold text-lg">{target.symbol}</span>
        </div>

        {renderNucleus()}

        {orbits.map((r, i) => (
          <div
            key={i}
            className="absolute border border-blue-300/25 rounded-full"
            style={{
              width: `${r * 2}px`,
              height: `${r * 2}px`,
              left: `calc(50% - ${r}px)`,
              top: `calc(33% - ${r}px)`,
            }}
          />
        ))}

        {renderElectrons()}
      </div>

      {/* Counters */}
      <div className="space-y-3 px-2">
        {[
          ["Protons", "p", protons],
          ["Neutrons", "n", neutrons],
          ["Electrons", "e", electrons],
        ].map(([label, key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-lg">{label}</span>
            <div className="flex items-center bg-white/7 px-3 py-1 rounded-full">
              <button className="w-9 h-9 rounded-full bg-[#1a2639] flex items-center justify-center mx-1" onClick={() => change(key, -1)}>
                <span className="text-xl">-</span>
              </button>
              <span className="text-lg font-bold w-8 text-center">{value}</span>
              <button className="w-9 h-9 rounded-full bg-[#1a2639] flex items-center justify-center mx-1" onClick={() => change(key, 1)}>
                <span className="text-xl">+</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-around mt-6 gap-3">
        <button className="bg-[#00aaff] px-6 py-3 rounded-xl font-bold" onClick={handleSubmit}>
          Submit
        </button>
        <button className="bg-white/10 border border-white/15 px-6 py-3 rounded-xl" onClick={startRound}>
          Reset
        </button>
        <button className="bg-white/10 border border-white/15 px-6 py-3 rounded-xl" onClick={() => setLevel(clamp(level - 1, 0, ELEMENTS.length - 1))}>
          Prev
        </button>
        <button className="bg-white/10 border border-white/15 px-6 py-3 rounded-xl" onClick={() => setLevel(clamp(level + 1, 0, ELEMENTS.length - 1))}>
          Next
        </button>
      </div>

      <p className="text-center mt-4 text-lg font-bold text-[#9fdcff]">Score: {score}</p>
    </div>
  );
}
