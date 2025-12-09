// src/utils/translateChaptersData.js

/**
 * Utility function to translate ChaptersData (MathData, PhysicsData, etc.)
 * @param {Object} chaptersData - The chapters data object (e.g., mathematicsChaptersData)
 * @param {Function} t - Translation function from useTranslation hook
 * @returns {Object} Translated chapters data
 */
export const translateChaptersData = (chaptersData, t) => {
  if (!chaptersData) return null;

  const translatedData = {};

  Object.keys(chaptersData).forEach((grade) => {
    translatedData[grade] = {};
    
    Object.keys(chaptersData[grade]).forEach((board) => {
      translatedData[grade][board] = chaptersData[grade][board].map((chapter) => {
        // Generate translation key based on chapter screen name
        const chapterKey = chapter.screen;
        
        // Translate title
        const titleKey = `subjects.chapters_data.${chapterKey}.title`;
        const translatedTitle = t(titleKey, { defaultValue: chapter.title });
        
        // Translate description
        const descKey = `subjects.chapters_data.${chapterKey}.description`;
        const translatedDesc = t(descKey, { defaultValue: chapter.description });
        
        // Translate difficulty
        const difficultyKey = `subjects.chapters_data.difficulty.${chapter.difficulty?.toLowerCase()}`;
        const translatedDifficulty = t(difficultyKey, { defaultValue: chapter.difficulty });

        return {
          ...chapter,
          title: translatedTitle !== titleKey ? translatedTitle : chapter.title,
          description: translatedDesc !== descKey ? translatedDesc : chapter.description,
          difficulty: translatedDifficulty !== difficultyKey ? translatedDifficulty : chapter.difficulty,
        };
      });
    });
  });

  return translatedData;
};
