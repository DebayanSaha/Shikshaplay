// src/screens/ChapterScreen.jsx
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { translateChapterData } from '../../utils/translateChapterData';

export default function ChapterScreen({ data, route, navigate }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('Basic Understanding');

  // Get chapterId from route name (e.g., "G6MChapter1" from screen name)
  const chapterId = route?.name || '';

  // Translate chapterData
  const translatedData = useMemo(() => {
    if (!data || !chapterId) return data;
    return translateChapterData(data, t, chapterId);
  }, [data, chapterId, t]);

  if (!translatedData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">{t('subjects.chapter_screen.no_data_available')}</p>
      </div>
    );
  }

  const { learningTopics, pdfDocuments, videos, experiments, achievements, chapterTitle, subjectDescription, overallProgress } = translatedData;

  const tabs = [
    { name: 'Basic Understanding', displayName: t('subjects.chapter_screen.tabs.basic_understanding'), icon: '📖' },
    { name: 'Theory', displayName: t('subjects.chapter_screen.tabs.theory'), icon: '🧠' },
    { name: 'Video', displayName: t('subjects.chapter_screen.tabs.video'), icon: '🎥' },
    { name: 'Practical Lab', displayName: t('subjects.chapter_screen.tabs.practical_lab'), icon: '🔬' },
    { name: 'MCQ Challenge', displayName: t('subjects.chapter_screen.tabs.mcq_challenge'), icon: '🎯' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'Theory':
        return (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📚</span>
              <h2 className="text-xl font-bold text-white">{t('subjects.chapter_screen.theory_documents')}</h2>
            </div>
            {pdfDocuments?.map((doc, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700 flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-lg" style={{ background: `linear-gradient(135deg, ${doc.color[0]}, ${doc.color[1]})` }}>
                  <span className="text-2xl">{doc.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{doc.title}</h3>
                  <div className="flex gap-3 text-sm text-gray-400">
                    <span>{t('subjects.chapter_screen.pages_count', { count: doc.pages })}</span>
                    <span className="text-green-400 font-bold">PDF</span>
                  </div>
                </div>
                {doc.pdfPath && (
                  <button
                    className="px-4 py-2 rounded-lg font-bold text-white"
                    style={{ background: 'linear-gradient(to right, #9333ea, #db2777)' }}
                    onClick={() => navigate('PdfViewer', { filePath: doc.pdfPath })}
                  >
                    {t('subjects.chapter_screen.open')} 📖
                  </button>
                )}
              </div>
            ))}
          </div>
        );

      case 'Video':
        return (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎬</span>
              <h2 className="text-xl font-bold text-white">{t('subjects.chapter_screen.video_lectures')}</h2>
            </div>
            {videos?.map((video, index) => (
              <div key={index} className="bg-gray-800 rounded-xl mb-4 border border-gray-700 overflow-hidden">
                <div className="relative h-32 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${video.thumbnail[0]}, ${video.thumbnail[1]})` }}>
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center z-10">
                    <span className="text-2xl">▶️</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded">
                    <span className="text-white text-xs font-bold">{video.duration}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-2">{video.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{t('subjects.chapter_screen.views_count', { count: video.views })}</span>
                    {video.screen && (
                      <button
                        className="px-4 py-2 rounded-lg font-bold text-white"
                        style={{ background: 'linear-gradient(to right, #db2777, #f43f5e)' }}
                        onClick={() => navigate(video.screen, { videoTitle: video.title })}
                      >
                        {t('subjects.chapter_screen.watch_now')} 🎥
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'Practical Lab':
        return (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔬</span>
              <h2 className="text-xl font-bold text-white">{t('subjects.chapter_screen.lab_experiments')}</h2>
            </div>
            {experiments?.length > 0 ? experiments.map((exp, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700">
                <div className="flex gap-4 mb-2">
                  <div className="w-16 h-16 flex items-center justify-center rounded-lg" style={{ background: `linear-gradient(135deg, ${exp.color[0]}, ${exp.color[1]})` }}>
                    <span className="text-2xl">{exp.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{exp.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${exp.difficulty === 'Easy' ? 'bg-green-200 text-green-600' : exp.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-600' : 'bg-red-200 text-red-600'}`}>
                        {exp.difficulty}
                      </span>
                      <span className="text-gray-400 text-sm">⏱️ {exp.time}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {exp.materials?.map((m, i) => (
                        <span key={i} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {exp.screen && (
                  <button
                    className="w-full mt-2 py-2 rounded-lg font-bold text-white"
                    style={{ background: 'linear-gradient(to right, #0891b2, #3b82f6)' }}
                    onClick={() => navigate(exp.screen)}
                  >
                    {t('subjects.chapter_screen.start_experiment')} 🧪
                  </button>
                )}
              </div>
            )) : (
              <div className="p-4 text-center text-gray-400">{t('subjects.chapter_screen.no_experiments_available')}</div>
            )}
          </div>
        );

      default: // Basic Understanding / MCQ Challenge
        return (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h2 className="text-xl font-bold text-white">{t('subjects.chapter_screen.your_learning_path')}</h2>
            </div>
            {learningTopics?.map((topic, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg" style={{ background: `linear-gradient(135deg, ${topic.color[0]}, ${topic.color[1]})` }}>
                    <span className="text-xl">{topic.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h3 className="text-white font-bold">{topic.title}</h3>
                      <span className="text-cyan-500 font-bold text-sm">{topic.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded overflow-hidden">
                      <div className="h-2" style={{ width: `${topic.progress}%`, background: `linear-gradient(to right, ${topic.color[0]}, ${topic.color[1]})` }}></div>
                    </div>
                  </div>
                </div>
                {topic.screen && (
                  <button
                    className="w-full mt-2 py-2 rounded-lg font-bold text-white"
                    style={{ background: `linear-gradient(to right, ${topic.color[0]}, ${topic.color[1]})` }}
                    onClick={() => navigate(topic.screen)}
                  >
                    {t('subjects.chapter_screen.learn_more')} →
                  </button>
                )}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#581c87]">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.name}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg ${activeTab === tab.name ? 'bg-gradient-to-r from-purple-700 to-pink-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab(tab.name)}
            >
              <span>{tab.icon}</span>
              <span className="text-sm font-bold">{tab.displayName}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}
