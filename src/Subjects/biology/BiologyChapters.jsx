import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { biologyChaptersData } from "../../ChaptersData/BiologyData";
import { translateChaptersData } from "../../utils/translateChaptersData";

// Define available screens here
const AVAILABLE_SCREENS = [
  'G6BChapter1', 'G6BChapter2','G6BChapter3','G7BChapter1','G7BChapter2','G7BChapter3',
  'G8BChapter1','G8BChapter2','G9BChapter1','G9BChapter2','G10BChapter1','G10BChapter2',
  'G11BChapter1','G11BChapter2','G12BChapter1','G12BChapter2'
];

const BiologyChapters = ({ navigate }) => {
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState("Grade 6");
  const [selectedBoard, setSelectedBoard] = useState("CBSE");

  const classes = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
  const boards = ["CBSE", "ICSE", "Odisha", "WBSE"];

  // Translate chapters data
  const translatedChaptersData = translateChaptersData(biologyChaptersData, t);
  const chapters = translatedChaptersData?.[selectedClass]?.[selectedBoard] || [];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "green-500";
      case "Intermediate": return "yellow-500";
      case "Advanced": return "red-500";
      default: return "gray-500";
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
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-5 pt-5 pb-5 mt-10 bg-purple-600">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex justify-center items-center">
          <span className="text-2xl font-bold">←</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex justify-center items-center">
            <span className="text-2xl">🧬</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">{t('subjects.biology.title')}</h1>
            <p className="text-xs text-white/80 mt-1">{t('subjects.chapters.chapters_count', { count: chapters.length })} • {selectedClass}</p>
          </div>
        </div>
        <div className="w-10" />
      </div>

      {/* Filters Section */}
      <div className="bg-slate-800 p-5">
        {/* Class Filter */}
        <div className="mb-5">
          <p className="font-semibold mb-3">📚 {t('subjects.chapters.select_class')}</p>
          <div className="flex gap-3 overflow-x-auto">
            {classes.map((classItem) => (
              <button
                key={classItem}
                onClick={() => setSelectedClass(classItem)}
                className={`px-5 py-2 rounded-full border ${selectedClass === classItem ? "bg-green-500 border-green-500 text-white font-semibold" : "bg-slate-700 border-slate-600 text-slate-300 font-medium"}`}
              >
                {classItem}
              </button>
            ))}
          </div>
        </div>

        {/* Board Filter */}
        <div>
          <p className="font-semibold mb-3">🎓 {t('subjects.chapters.select_board')}</p>
          <div className="flex gap-3 overflow-x-auto">
            {boards.map((board) => (
              <button
                key={board}
                onClick={() => setSelectedBoard(board)}
                className={`px-5 py-2 rounded-full border ${selectedBoard === board ? "bg-green-500 border-green-500 text-white font-semibold" : "bg-slate-700 border-slate-600 text-slate-300 font-medium"}`}
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
          <div className="flex flex-col items-center justify-center py-20">
            <span className="text-6xl mb-5">📖</span>
            <h2 className="text-xl font-bold mb-2">{t('subjects.chapters.no_chapters_available')}</h2>
            <p className="text-center text-slate-400 px-10">{t('subjects.chapters.chapters_coming_soon', { class: selectedClass, board: selectedBoard })}</p>
          </div>
        ) : (
          chapters.map((chapter) => {
            const isAvailable = AVAILABLE_SCREENS.includes(chapter.screen);
            const difficultyColor = getDifficultyColor(chapter.difficulty);

            return (
              <div key={chapter.id} className="bg-slate-800 rounded-xl mb-5 border border-slate-700 overflow-hidden">
                {/* Progress Bar */}
                <div className="h-1 bg-slate-700">
                  <div className={`h-full bg-green-500`} style={{ width: `${chapter.progress}%` }}></div>
                </div>

                {/* Chapter Content */}
                <div className="p-5">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-lg">{chapter.title}</h3>
                    <span className="font-semibold text-green-500">{chapter.progress}%</span>
                  </div>

                  <p className="text-slate-300 mb-3">{chapter.description}</p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-${difficultyColor}/20 text-${difficultyColor}`}>{chapter.difficulty}</span>
                    <div className="flex items-center gap-1 text-slate-300">
                      <span>⏱️</span>
                      <span className="text-sm">{chapter.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-300">
                      <span>📑</span>
                      <span className="text-sm">{t('subjects.chapters.topics_count', { count: chapter.topics })}</span>
                    </div>
                    {!isAvailable && (
                      <div className="bg-yellow-500/20 px-3 py-1 rounded-full">
                        <span className="text-yellow-500 text-xs font-semibold">🔒 {t('subjects.chapters.soon')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 p-4 pt-0">
                  <button
                    onClick={() => handleChapterPress(chapter)}
                    className={`flex-1 py-3 rounded-lg ${isAvailable ? "bg-white text-slate-900 font-semibold" : "bg-slate-700 text-slate-400"}`}
                  >
                    {isAvailable ? t('subjects.chapters.open_chapter') : t('subjects.chapters.coming_soon')}
                  </button>
                  <button className="py-3 px-4 bg-slate-700 rounded-lg">
                    <span className="text-lg">⌄</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BiologyChapters;
