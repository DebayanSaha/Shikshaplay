// src/screens/ChemistryChapters.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { chemistryChaptersData } from "../../ChaptersData/ChemistryData";
import { translateChaptersData } from "../../utils/translateChaptersData";

// Define available screens here
const AVAILABLE_SCREENS = [
  'G6CChapter1', 'G6CChapter2','G6CChapter3','G7CChapter1','G7CChapter2','G7CChapter3',
  'G8CChapter1','G8CChapter2','G9CChapter1','G9CChapter2','G10CChapter1',"G10CChapter2",
  'G11CChapter1',"G11CChapter2",'G12CChapter1',"G12CChapter2"
];

const ChemistryChapters = ({ navigateBack, navigate }) => {
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState("Grade 9");
  const [selectedBoard, setSelectedBoard] = useState("CBSE");

  const classes = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
  const boards = ["CBSE", "ICSE", "State Board", "WBSE"];

  // Translate chapters data
  const translatedChaptersData = translateChaptersData(chemistryChaptersData, t);
  const chapters = translatedChaptersData?.[selectedClass]?.[selectedBoard] || [];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "#10b981";
      case "Intermediate": return "#f59e0b";
      case "Advanced": return "#ef4444";
      default: return "#6b7280";
    }
  };

  // Handle chapter navigation with fallback
  const handleChapterPress = (chapter) => {
    if (AVAILABLE_SCREENS.includes(chapter.screen)) {
      navigate(`chapter/${chapter.screen}`); // route under /student|teacher/chapter/:id
    } else {
      alert(
        `${t('subjects.chapters.coming_soon_title')}\n${t('subjects.chapters.coming_soon_message', { title: chapter.title })}`
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f172a]">
      {/* Header */}
      <div className="flex justify-between items-center px-5 pt-5 pb-4 mt-10 bg-[#8b5cf6]">
        <button className="w-10 h-10 text-white font-bold text-2xl" onClick={navigateBack}>
          ←
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-2xl">🧪</span>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">{t('subjects.chemistry.title')}</h1>
            <p className="text-white/80 text-sm mt-1">
              {t('subjects.chapters.chapters_count', { count: chapters.length })} • {selectedClass}
            </p>
          </div>
        </div>
        <div className="w-10" />
      </div>

      {/* Filters */}
      <div className="bg-[#1e293b] p-5">
        {/* Class Filter */}
        <div className="mb-5">
          <p className="text-white text-sm font-semibold mb-3">📚 {t('subjects.chapters.select_class')}</p>
          <div className="flex gap-2 overflow-x-auto">
            {classes.map((cls) => (
              <button
                key={cls}
                className={`px-5 py-2 rounded-full border ${
                  selectedClass === cls
                    ? 'bg-green-500 border-green-500 text-white font-semibold'
                    : 'bg-[#334155] border-[#475569] text-gray-400 font-medium'
                }`}
                onClick={() => setSelectedClass(cls)}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Board Filter */}
        <div className="mb-0">
          <p className="text-white text-sm font-semibold mb-3">🎓 {t('subjects.chapters.select_board')}</p>
          <div className="flex gap-2 overflow-x-auto">
            {boards.map((board) => (
              <button
                key={board}
                className={`px-5 py-2 rounded-full border ${
                  selectedBoard === board
                    ? 'bg-green-500 border-green-500 text-white font-semibold'
                    : 'bg-[#334155] border-[#475569] text-gray-400 font-medium'
                }`}
                onClick={() => setSelectedBoard(board)}
              >
                {board}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="flex-1 overflow-y-auto p-5">
        {chapters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="text-5xl mb-5">📖</span>
            <h2 className="text-white font-bold text-xl mb-2">{t('subjects.chapters.no_chapters_available')}</h2>
            <p className="text-gray-400 text-center px-10">
              {t('subjects.chapters.chapters_coming_soon', { class: selectedClass, board: selectedBoard })}
            </p>
          </div>
        ) : (
          chapters.map((chapter) => {
            const isAvailable = AVAILABLE_SCREENS.includes(chapter.screen);
            return (
              <div key={chapter.id} className="bg-[#1e293b] rounded-xl mb-5 border border-[#334155] overflow-hidden">
                {/* Progress Bar */}
                <div className="h-1 bg-[#334155]">
                  <div className="h-1 bg-green-500" style={{ width: `${chapter.progress}%` }}></div>
                </div>

                {/* Chapter Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white text-lg font-bold flex-1 mr-2">{chapter.title}</h3>
                    <span className="text-green-500 font-semibold">{chapter.progress}%</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{chapter.description}</p>

                  <div className="flex flex-wrap items-center gap-3">
                    <div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full" 
                        style={{ backgroundColor: `${getDifficultyColor(chapter.difficulty)}20`, color: getDifficultyColor(chapter.difficulty) }}>
                        {chapter.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <span>⏱️</span> <span>{chapter.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <span>📑</span> <span>{t('subjects.chapters.topics_count', { count: chapter.topics })}</span>
                    </div>
                    {!isAvailable && (
                      <div className="bg-yellow-200/20 px-2 py-1 rounded-full text-yellow-500 text-xs font-semibold">
                        🔒 {t('subjects.chapters.soon')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 px-5 pb-4">
                  <button
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold text-[#1e293b] ${isAvailable ? 'bg-white' : 'bg-[#475569]'}`}
                    onClick={() => handleChapterPress(chapter)}
                  >
                    {isAvailable ? t('subjects.chapters.open_chapter') : t('subjects.chapters.coming_soon')}
                  </button>
                  <button className="flex-none text-gray-400 text-xl font-bold">⌄</button>
                </div>
              </div>
            );
          })
        )}
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default ChemistryChapters;
