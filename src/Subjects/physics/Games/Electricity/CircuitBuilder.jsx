// src/components/CircuitBuilder.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

const CircuitBuilder = () => {
  const { t } = useTranslation();
  const tt = (key, fallback) => {
    const val = t(key, { returnObjects: false, defaultValue: fallback || key });
    return typeof val === 'string' ? val : fallback || key;
  };

  const componentLibrary = [
    { id: 'battery', name: tt('subjects.games.circuit_builder.battery', 'Battery'), defaultValue: 9, unit: 'V', color: '#f59e0b', bgColor: '#fef3c7' },
    { id: 'resistor', name: tt('subjects.games.circuit_builder.resistor', 'Resistor'), defaultValue: 100, unit: 'Ω', color: '#10b981', bgColor: '#d1fae5' },
    { id: 'led', name: tt('subjects.games.circuit_builder.led', 'LED'), defaultValue: 20, unit: 'Ω', color: '#3b82f6', bgColor: '#dbeafe' },
    { id: 'switch', name: tt('subjects.games.circuit_builder.switch', 'Switch'), defaultValue: 1, unit: '', color: '#6b7280', bgColor: '#f3f4f6' },
  ];

  const [components, setComponents] = useState([]);
  const [wires, setWires] = useState([]);
  const [placingType, setPlacingType] = useState(null);
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [tempLine, setTempLine] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 620 });

  const canvasRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setCanvasSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const placeComponentAt = (x, y) => {
    if (!placingType) return;
    const compDef = componentLibrary.find(c => c.id === placingType);
    if (!compDef) return;

    const id = uuidv4();
    const width = 120;
    const height = 90;
    const compX = Math.max(8, Math.min(x - width / 2, canvasSize.width - width - 8));
    const compY = Math.max(8, Math.min(y - height / 2, canvasSize.height - height - 8));

    const newComponent = {
      id,
      type: placingType,
      name: compDef.name,
      value: compDef.defaultValue,
      unit: compDef.unit,
      color: compDef.color,
      bgColor: compDef.bgColor,
      x: compX,
      y: compY,
      width,
      height,
      isOn: placingType === 'switch' ? true : true,
      terminals: [
        { id: `${id}-top`, x: compX + width / 2, y: compY, type: 'input' },
        { id: `${id}-bottom`, x: compX + width / 2, y: compY + height, type: 'output' }
      ]
    };

    setComponents(prev => [...prev, newComponent]);
    setPlacingType(null);
  };

  const getTerminalPosition = (component, terminalIndex) => {
    if (!component) return { x: 0, y: 0 };
    const centerX = component.x + component.width / 2;
    if (terminalIndex === 0) return { x: centerX, y: component.y };
    return { x: centerX, y: component.y + component.height };
  };

  const startOrFinishConnection = (componentId, terminalIndex) => {
    if (!connectingFrom) {
      setConnectingFrom({ componentId, terminalIndex });
      return;
    }
    if (connectingFrom.componentId === componentId && connectingFrom.terminalIndex === terminalIndex) {
      setConnectingFrom(null);
      setTempLine(null);
      return;
    }

    const exists = wires.some(w =>
      (w.from.componentId === connectingFrom.componentId && w.from.terminalIndex === connectingFrom.terminalIndex &&
        w.to.componentId === componentId && w.to.terminalIndex === terminalIndex) ||
      (w.to.componentId === connectingFrom.componentId && w.to.terminalIndex === connectingFrom.terminalIndex &&
        w.from.componentId === componentId && w.from.terminalIndex === terminalIndex)
    );

    if (exists) {
      setConnectingFrom(null);
      setTempLine(null);
      return;
    }

    const newWire = {
      id: uuidv4(),
      from: { componentId: connectingFrom.componentId, terminalIndex: connectingFrom.terminalIndex },
      to: { componentId, terminalIndex }
    };
    setWires(prev => [...prev, newWire]);
    setConnectingFrom(null);
    setTempLine(null);
  };

  const removeComponent = (id) => {
    setComponents(prev => prev.filter(c => c.id !== id));
    setWires(prev => prev.filter(w => w.from.componentId !== id && w.to.componentId !== id));
  };

  const removeWire = (id) => setWires(prev => prev.filter(w => w.id !== id));

  const updateComponentValue = (id, delta) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, value: Math.max(1, c.value + delta) } : c));
  };

  const toggleSwitch = (id) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, isOn: !c.isOn } : c));
  };

  const clearCircuit = () => {
    setComponents([]);
    setWires([]);
    setIsSimulating(false);
  };

  const testCircuit = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 1600);
  };

  const calculateCircuit = () => {
    const batteries = components.filter(c => c.type === 'battery');
    const resistors = components.filter(c => c.type === 'resistor');
    const leds = components.filter(c => c.type === 'led');
    const switches = components.filter(c => c.type === 'switch');

    const allSwitchesOn = switches.length === 0 || switches.every(s => s.isOn);
    if (!allSwitchesOn || wires.length === 0) {
      return { voltage: '0.00', current: '0.000', totalResistance: '0.00', power: '0.00', ledsOn: false };
    }

    const totalVoltage = batteries.reduce((sum, b) => sum + Number(b.value || 0), 0);
    const totalResistance = [...resistors, ...leds].reduce((sum, r) => sum + Number(r.value || 0), 0);
    const current = totalResistance > 0 ? totalVoltage / totalResistance : 0;
    const power = totalVoltage * current;
    const ledsOn = current > 0.05 && wires.length > 0;

    return {
      voltage: totalVoltage.toFixed(2),
      current: current.toFixed(3),
      totalResistance: totalResistance.toFixed(2),
      power: power.toFixed(2),
      ledsOn
    };
  };

  const results = calculateCircuit();

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] page-shell">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-[#3730a3] rounded-t-xl gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <div>
            <h1 className="text-white font-bold text-lg">{tt('subjects.games.circuit_builder.title', 'Circuit Builder')}</h1>
            <p className="text-[#e0e7ff] text-xs">{tt('subjects.games.circuit_builder.subtitle', 'Build and test simple circuits')}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowInfo(v => !v)} className="w-11 h-11 rounded-full bg-white/10 flex justify-center items-center">ℹ️</button>
          <button onClick={clearCircuit} className="w-11 h-11 rounded-full bg-white/10 flex justify-center items-center">⟲</button>
        </div>
        </div>

        {/* Measurements */}
        <div className="flex flex-col sm:flex-row justify-between p-2 gap-2">
        <div className="flex-1 bg-white/6 p-2 mx-0 sm:mx-1 rounded text-center">
          <p className="text-xs text-[#c7d2fe]">{tt('subjects.games.circuit_builder.voltage', 'Voltage')}</p>
          <p className="text-white font-bold">{results.voltage}V</p>
        </div>
        <div className="flex-1 bg-white/6 p-2 mx-0 sm:mx-1 rounded text-center">
          <p className="text-xs text-[#c7d2fe]">{tt('subjects.games.circuit_builder.current', 'Current')}</p>
          <p className="text-white font-bold">{results.current}A</p>
        </div>
        <div className="flex-1 bg-white/6 p-2 mx-0 sm:mx-1 rounded text-center">
          <p className="text-xs text-[#c7d2fe]">{tt('subjects.games.circuit_builder.power', 'Power')}</p>
          <p className="text-white font-bold">{results.power}W</p>
        </div>
        </div>

        {/* Info panel */}
        {showInfo && (
          <div className="bg-[#1e293b] border-b border-[#334155] p-2 rounded-b">
          <p className="text-white font-bold">ℹ️ {tt('subjects.games.circuit_builder.how_to_use', 'How to use')}</p>
          <ul className="text-[#c7d2fe] text-xs list-disc ml-4">
            <li>{tt('subjects.games.circuit_builder.instruction_1', 'Tap a component, then tap the board to place it')}</li>
            <li>{tt('subjects.games.circuit_builder.instruction_2', 'Connect components by tapping terminals')}</li>
            <li>{tt('subjects.games.circuit_builder.instruction_3', 'Toggle switches to control power')}</li>
            <li>{tt('subjects.games.circuit_builder.instruction_4', 'Test the circuit to see if LEDs light up')}</li>
          </ul>
          </div>
        )}

        {/* Canvas */}
        <div
          className="flex-1 p-2 bg-white rounded-b relative overflow-hidden min-h-[520px] sm:min-h-[620px]"
          ref={canvasRef}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            placeComponentAt(e.clientX - rect.left, e.clientY - rect.top);
          }}
        >
        {components.length === 0 && (
          <div className="absolute top-1/3 w-full text-center">
            <span className="text-4xl text-gray-400">🧩</span>
            <h2 className="text-gray-500 font-bold mt-2">{tt('subjects.games.circuit_builder.start_building', 'Start building')}</h2>
            <p className="text-gray-400 text-sm">{tt('subjects.games.circuit_builder.tap_components', 'Tap a component then tap the board')}</p>
          </div>
        )}

        {/* Wires */}
        <svg className="absolute inset-0 pointer-events-none">
          {wires.map(w => {
            const fromComp = components.find(c => c.id === w.from.componentId);
            const toComp = components.find(c => c.id === w.to.componentId);
            if (!fromComp || !toComp) return null;
            const fromPos = getTerminalPosition(fromComp, w.from.terminalIndex);
            const toPos = getTerminalPosition(toComp, w.to.terminalIndex);
            return (
              <line
                key={w.id}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke={results.ledsOn && isSimulating ? '#22c55e' : '#374151'}
                strokeWidth={3}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Components */}
        {components.map(comp => (
          <div
            key={comp.id}
            className="absolute bg-white rounded border-2 shadow p-2"
            style={{ left: comp.x, top: comp.y, width: comp.width, height: comp.height, borderTopColor: comp.color }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span style={{ color: comp.color }}>{comp.type === 'battery' ? '🔋' : comp.type === 'resistor' ? '⚡' : comp.type === 'led' ? '💡' : '🔘'}</span>
                <span className="text-xs font-bold text-gray-900">{comp.name}</span>
              </div>
              <button className="bg-red-500 rounded p-1 text-xs" onClick={() => removeComponent(comp.id)}>🗑️</button>
            </div>

            {comp.type === 'switch' ? (
              <button
                onClick={() => toggleSwitch(comp.id)}
                className={`w-full mt-2 py-1 rounded font-bold text-white ${comp.isOn ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {comp.isOn ? tt('subjects.games.circuit_builder.on', 'On') : tt('subjects.games.circuit_builder.off', 'Off')}
              </button>
            ) : (
              <div className="flex justify-between items-center mt-2 bg-gray-200 rounded p-1">
                <button className="bg-blue-600 text-white font-bold px-2 py-1 rounded" onClick={() => updateComponentValue(comp.id, comp.type === 'battery' ? -1 : -10)}>-</button>
                <span className="font-bold">{comp.value}{comp.unit}</span>
                <button className="bg-blue-600 text-white font-bold px-2 py-1 rounded" onClick={() => updateComponentValue(comp.id, comp.type === 'battery' ? 1 : 10)}>+</button>
              </div>
            )}
          </div>
        ))}
        </div>

        {/* Bottom bar */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-2 ${wires.length === 0 ? 'bg-yellow-500' : results.ledsOn ? 'bg-green-600' : 'bg-red-600'}`}>
        <span className="text-white font-bold">
          {wires.length === 0
            ? `⚠️ ${tt('subjects.games.circuit_builder.no_connections', 'Add wires to connect components')}`
            : results.ledsOn
            ? `✅ ${tt('subjects.games.circuit_builder.circuit_active', 'Circuit active! LEDs can light')}`
            : `❌ ${tt('subjects.games.circuit_builder.no_power', 'No power detected')}`}
        </span>
        <div className="flex gap-2">
          <button onClick={testCircuit} className="bg-white/10 px-3 py-1.5 rounded text-white font-bold">{tt('subjects.games.circuit_builder.test', 'Test')}</button>
          <button onClick={() => setPlacingType(null)} className="bg-white/10 px-3 py-1.5 rounded text-white font-bold">{tt('subjects.games.circuit_builder.cancel_place', 'Cancel')}</button>
        </div>
        </div>

        {/* Palette */}
        <div className="bg-[#0b1220] p-3 rounded-b-xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#c7d2fe] font-bold">{tt('subjects.games.circuit_builder.components', 'Components')}</span>
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        </div>
        <div className="flex overflow-x-auto gap-2 pb-1">
          {componentLibrary.map(comp => {
            const selected = placingType === comp.id;
            return (
              <div
                key={comp.id}
                className={`w-24 p-2 rounded border-t-4 flex-shrink-0 cursor-pointer ${selected ? 'translate-y-[-6px] shadow-lg' : ''}`}
                style={{ borderTopColor: comp.color, backgroundColor: '#111827' }}
                onClick={() => setPlacingType(prev => prev === comp.id ? null : comp.id)}
              >
                <div className="w-12 h-12 rounded flex justify-center items-center mb-1" style={{ backgroundColor: comp.bgColor }}>
                  <span>{comp.id === 'battery' ? '🔋' : comp.id === 'resistor' ? '⏳' : comp.id === 'led' ? '💡' : '🔘'}</span>
                </div>
                <p className="text-white font-bold text-xs truncate">{comp.name}</p>
                <p className="text-gray-400 text-xs">{comp.defaultValue}{comp.unit}</p>
              </div>
            );
          })}
        </div>

        {/* Ohm's law */}
        <div className="mt-2 border-t border-[#0f172a] pt-2">
          <p className="text-white font-bold mb-1">{tt('subjects.games.circuit_builder.ohms_law', "Ohm's Law")}</p>
          <div className="flex justify-between text-gray-400 text-xs">
            <span>V = I × R</span>
            <span>I = V ÷ R</span>
            <span>R = V ÷ I</span>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitBuilder;
