// src/screens/P.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function P() {
  const { t } = useTranslation();
  const [phValue, setPhValue] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    generateNewPH();
  }, []);

  const generateNewPH = () => {
    const randomPH = Math.floor(Math.random() * 15); // 0 to 14
    setPhValue(randomPH);
    setMessage("");
  };

  const checkAnswer = (type) => {
    let correct = "";

    if (phValue < 7) correct = "Acidic";
    else if (phValue === 7) correct = "Neutral";
    else correct = "Basic";

    if (type === correct) {
      setScore(score + 1);
      setMessage(t('subjects.games.ph.correct'));
    } else {
      setMessage(t('subjects.games.ph.wrong', { correct: t(`subjects.games.ph.${correct.toLowerCase()}`) }));
    }

    setTimeout(() => generateNewPH(), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-5">
      <h1 className="text-4xl font-bold text-white mb-5">🧪 {t('subjects.games.ph.title')}</h1>
      <p className="text-lg text-gray-300">{t('subjects.games.ph.label')}</p>

      <p className="text-8xl font-bold text-[#00eaff] my-5">{phValue}</p>

      <div className="flex space-x-4 my-5">
        <button
          className="px-6 py-3 rounded-lg font-bold text-white bg-[#ff6b6b]"
          onClick={() => checkAnswer("Acidic")}
        >
          {t('subjects.games.ph.acidic')}
        </button>

        <button
          className="px-6 py-3 rounded-lg font-bold text-white bg-[#ffa502]"
          onClick={() => checkAnswer("Neutral")}
        >
          {t('subjects.games.ph.neutral')}
        </button>

        <button
          className="px-6 py-3 rounded-lg font-bold text-white bg-[#1e90ff]"
          onClick={() => checkAnswer("Basic")}
        >
          {t('subjects.games.ph.basic')}
        </button>
      </div>

      <p className="text-2xl mt-2 text-white">{message}</p>
      <p className="text-2xl mt-5 font-bold text-[#00ff4c]">
        {t('subjects.games.ph.score')}: {score}
      </p>
    </div>
  );
}
