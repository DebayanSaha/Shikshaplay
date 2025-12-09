// src/pages/MathsChapters.jsx
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { mathematicsChaptersData } from "../../ChaptersData/MathData";
import { translateChaptersData } from "../../utils/translateChaptersData";

// Define available screens
const AVAILABLE_SCREENS = [
  "G6MChapter1", "G6MChapter2", "G6MChapter3",
  "G7MChapter1", "G7MChapter2", "G7MChapter3",
  "G8MChapter1", "G8MChapter2",
  "G9MChapter1", "G9MChapter2",
  "G10MChapter1", "G10MChapter2",
  "G11MChapter1", "G11MChapter2",
  "G12MChapter1", "G12MChapter2"
];

const MathsChapters = ({ navigate }) => {
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState("Grade 9");
  const [selectedBoard, setSelectedBoard] = useState("CBSE");

  const classes = ["Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];
  const boards = ["CBSE","ICSE","Odisha","WBSE"];

  const translatedChaptersData = translateChaptersData(mathematicsChaptersData, t);
  const chapters = translatedChaptersData?.[selectedClass]?.[selectedBoard] || [];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty){
      case "Beginner": return "#10b981";
      case "Intermediate": return "#f59e0b";
      case "Advanced": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const handleChapterPress = (chapter) => {
    if (AVAILABLE_SCREENS.includes(chapter.screen)) {
      navigate(`chapter/${chapter.screen}`); // route under /student|teacher/chapter/:id
    } else {
      alert(`${t('subjects.chapters.coming_soon_title')}\n${t('subjects.chapters.coming_soon_message', { title: chapter.title })}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      {/* Header */}
      <div className="flex justify-between items-center px-5 pt-4 pb-5 mt-2 bg-purple-500">
        <button className="w-10 h-10 flex justify-center items-center text-white text-2xl font-bold" onClick={() => navigate(-1)}>←</button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-2xl">🔢</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">{t('subjects.math.title')}</h1>
            <p className="text-white/80 text-sm mt-1">{t('subjects.chapters.chapters_count', { count: chapters.length })} • {selectedClass}</p>
          </div>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="bg-[#1e293b] py-5 px-5">
          {/* Class Filter */}
          <div className="mb-5">
            <p className="text-white font-semibold mb-3">📚 {t('subjects.chapters.select_class')}</p>
            <div className="flex space-x-2 overflow-x-auto">
              {classes.map(cls => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-5 py-2 rounded-full border ${selectedClass===cls ? 'bg-green-500 border-green-500 text-white font-semibold' : 'bg-[#334155] border-[#475569] text-gray-400 font-medium'}`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Board Filter */}
          <div className="mb-5">
            <p className="text-white font-semibold mb-3">🎓 {t('subjects.chapters.select_board')}</p>
            <div className="flex space-x-2 overflow-x-auto">
              {boards.map(board => (
                <button
                  key={board}
                  onClick={() => setSelectedBoard(board)}
                  className={`px-5 py-2 rounded-full border ${selectedBoard===board ? 'bg-green-500 border-green-500 text-white font-semibold' : 'bg-[#334155] border-[#475569] text-gray-400 font-medium'}`}
                >
                  {board}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="p-5">
          {chapters.length === 0 ? (
            <div className="flex flex-col items-center py-20">
              <span className="text-6xl mb-5">📖</span>
              <h2 className="text-white font-bold text-xl mb-2">{t('subjects.chapters.no_chapters_available')}</h2>
              <p className="text-gray-400 text-center px-10">{t('subjects.chapters.chapters_coming_soon', { class: selectedClass, board: selectedBoard })}</p>
            </div>
          ) : (
            chapters.map(chapter => {
              const isAvailable = AVAILABLE_SCREENS.includes(chapter.screen);
              return (
                <div key={chapter.id} className="bg-[#1e293b] rounded-xl mb-5 border border-[#334155] overflow-hidden">
                  {/* Progress */}
                  <div className="h-1 bg-[#334155]">
                    <div className="h-1" style={{width:`${chapter.progress}%`, backgroundColor:"#10b981"}}></div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold text-lg flex-1 mr-2">{chapter.title}</h3>
                      <span className="text-green-500 font-semibold text-sm">{chapter.progress}%</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{chapter.description}</p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{backgroundColor:`${getDifficultyColor(chapter.difficulty)}20`, color:getDifficultyColor(chapter.difficulty)}}>{chapter.difficulty}</span>
                      <span className="flex items-center text-gray-400 text-xs gap-1"><span>⏱️</span>{chapter.duration}</span>
                      <span className="flex items-center text-gray-400 text-xs gap-1"><span>📑</span>{t('subjects.chapters.topics_count', { count: chapter.topics })}</span>
                      {!isAvailable && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-200/20 text-yellow-500">🔒 {t('subjects.chapters.soon')}</span>}
                    </div>
                  </div>

                  <div className="flex p-4 pt-0 gap-2">
                    <button 
                      onClick={() => handleChapterPress(chapter)}
                      className={`flex-1 py-3 rounded-lg text-center font-semibold ${isAvailable ? 'bg-white text-[#1e293b]' : 'bg-[#475569] text-gray-400'}`}
                    >
                      {isAvailable ? t('subjects.chapters.open_chapter') : t('subjects.chapters.coming_soon')}
                    </button>
                    <button className="w-12 py-3 rounded-lg bg-[#334155] flex items-center justify-center text-gray-400 font-bold">⌄</button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default MathsChapters;
