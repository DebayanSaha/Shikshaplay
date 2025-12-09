import React, { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

// Units
const UNITS = {
  V: "V",
  I: "A",
  R: "Ω",
  P: "W",
};

// Helper
const parseInput = (value) => {
  const num = parseFloat(value);
  return isNaN(num) || value.trim() === "" ? null : num;
};

// Input Field Component
const InputField = ({ label, value, unit, onChange, disabled, t }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1">{label}</label>
    <div className="flex">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={t("subjects.games.ohms.enter_value", { label })}
        className={`flex-1 px-3 py-2 text-lg rounded-l-md border-2 ${
          disabled ? "bg-gray-300 border-gray-400" : "bg-white border-indigo-600"
        }`}
      />
      <div className="flex items-center justify-center px-4 bg-indigo-100 border-2 border-l-0 border-indigo-600 rounded-r-md font-bold text-indigo-800">
        {unit}
      </div>
    </div>
  </div>
);

// Formula Block Component
const FormulaBlock = ({ title, equations }) => (
  <div className="bg-gray-100 p-3 rounded-md mb-3">
    <div className="font-bold mb-1">{title}</div>
    {equations.map((eq, i) => (
      <div key={i} className="font-mono">
        {eq}
      </div>
    ))}
  </div>
);

// Formula Data
const getFormulas = (t) => [
  { title: t("subjects.games.ohms.voltage"), equations: ["V = I × R", "V = P / I", "V = √(P × R)"] },
  { title: t("subjects.games.ohms.current"), equations: ["I = V / R", "I = P / V", "I = √(P / R)"] },
  { title: t("subjects.games.ohms.resistance"), equations: ["R = V / I", "R = P / I²", "R = V² / P"] },
  { title: t("subjects.games.ohms.power"), equations: ["P = V × I", "P = I² × R", "P = V² / R"] },
];

const OhmCalculator = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState({ V: "", I: "", R: "", P: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (key) => (val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setMessage("");
  };

  const { knowns, knownCount } = useMemo(() => {
    const parsed = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, parseInput(v)])
    );
    const knowns = Object.fromEntries(
      Object.entries(parsed).filter(([k, v]) => v !== null)
    );
    return { knowns, knownCount: Object.keys(knowns).length };
  }, [values]);

  const handleCalculate = useCallback(() => {
    setMessage("");
    setMessageType("");

    if (knownCount !== 2) {
      setMessageType("error");
      setMessage(t("subjects.games.ohms.enter_two_values"));
      return;
    }

    let { V, I, R, P } = knowns;
    const keyStr = Object.keys(knowns).sort().join("");

    try {
      switch (keyStr) {
        case "IR":
          V = I * R;
          P = I * I * R;
          break;
        case "IV":
          R = V / I;
          P = V * I;
          break;
        case "IP":
          V = P / I;
          R = P / (I * I);
          break;
        case "PR":
          V = Math.sqrt(P * R);
          I = Math.sqrt(P / R);
          break;
        case "RV":
          I = V / R;
          P = (V * V) / R;
          break;
        case "PV":
          I = P / V;
          R = (V * V) / P;
          break;
        default:
          throw new Error("Invalid Inputs");
      }

      setValues({
        V: V.toFixed(4),
        I: I.toFixed(4),
        R: R.toFixed(4),
        P: P.toFixed(4),
      });

      setMessageType("success");
      setMessage(t("subjects.games.ohms.calculation_complete"));
    } catch (e) {
      setMessageType("error");
      setMessage(e.message);
    }
  }, [knowns, knownCount]);

  const handleReset = () => {
    setValues({ V: "", I: "", R: "", P: "" });
    setMessage("");
    setMessageType("");
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-2">{t("subjects.games.ohms.title")} ⚡</h1>
      <p className="text-center mb-5 text-gray-600">{t("subjects.games.ohms.subtitle")}</p>

      {/* Inputs */}
      <InputField
        label={t("subjects.games.ohms.voltage")}
        unit={UNITS.V}
        value={values.V}
        onChange={handleChange("V")}
        disabled={knownCount >= 2 && knowns.V == null}
        t={t}
      />
      <InputField
        label={t("subjects.games.ohms.current")}
        unit={UNITS.I}
        value={values.I}
        onChange={handleChange("I")}
        disabled={knownCount >= 2 && knowns.I == null}
        t={t}
      />
      <InputField
        label={t("subjects.games.ohms.resistance")}
        unit={UNITS.R}
        value={values.R}
        onChange={handleChange("R")}
        disabled={knownCount >= 2 && knowns.R == null}
        t={t}
      />
      <InputField
        label={t("subjects.games.ohms.power")}
        unit={UNITS.P}
        value={values.P}
        onChange={handleChange("P")}
        disabled={knownCount >= 2 && knowns.P == null}
        t={t}
      />

      {/* Message */}
      {message && (
        <div
          className={`p-3 rounded mb-4 ${
            messageType === "success" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <span>{message}</span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          className={`flex-1 py-3 rounded text-white font-bold ${
            knownCount === 2 ? "bg-indigo-600" : "bg-indigo-300"
          }`}
          onClick={handleCalculate}
          disabled={knownCount !== 2}
        >
          {t("subjects.games.ohms.calculate")}
        </button>
        <button
          className="flex-1 py-3 rounded bg-gray-300 font-bold text-gray-800"
          onClick={handleReset}
        >
          {t("subjects.games.ohms.reset")}
        </button>
      </div>

      {/* Formulas */}
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4">{t("subjects.games.ohms.formula_header")}</h2>
        {getFormulas(t).map((f) => (
          <FormulaBlock key={f.title} title={f.title} equations={f.equations} />
        ))}
      </div>
    </div>
  );
};

export default OhmCalculator;
