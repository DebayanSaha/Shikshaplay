// src/utils/translateChapterData.js

/**
 * Utility function to translate chapterData based on current language
 * @param {Object} chapterData - The chapter data object
 * @param {Function} t - Translation function from useTranslation hook
 * @param {String} chapterId - The chapter identifier (e.g., "G6MChapter1")
 * @returns {Object} Translated chapter data
 */
export const translateChapterData = (chapterData, t, chapterId) => {
  if (!chapterData) return null;
  if (!chapterId) return chapterData; // Return original if no chapterId

  const translate = (key, fallback) => {
    const translationKey = `subjects.chapter_content.${chapterId}.${key}`;
    try {
      const translated = t(translationKey, { defaultValue: fallback });
      // If translation returns the key itself, it means translation doesn't exist
      return translated !== translationKey ? translated : fallback;
    } catch (error) {
      console.warn(`Translation error for key: ${translationKey}`, error);
      return fallback;
    }
  };

  // Translate chapter-level fields
  const translatedData = {
    ...chapterData,
    chapterTitle: translate('chapterTitle', chapterData.chapterTitle),
    subjectDescription: translate('subjectDescription', chapterData.subjectDescription),
  };

  // Translate learning topics
  if (chapterData.learningTopics) {
    translatedData.learningTopics = chapterData.learningTopics.map((topic, index) => ({
      ...topic,
      title: translate(`learningTopics.${index}.title`, topic.title),
    }));
  }
  
  // Translate PDF documents
  if (chapterData.pdfDocuments) {
    translatedData.pdfDocuments = chapterData.pdfDocuments.map((doc, index) => ({
      ...doc,
      title: translate(`pdfDocuments.${index}.title`, doc.title),
    }));
  }

  // Handle alternative pdfs field (some chapters use this)
  if (chapterData.pdfs) {
    translatedData.pdfs = chapterData.pdfs.map((doc, index) => ({
      ...doc,
      title: translate(`pdfs.${index}.title`, doc.title),
    }));
  }

  // Translate videos
  if (chapterData.videos) {
    translatedData.videos = chapterData.videos.map((video, index) => ({
      ...video,
      title: translate(`videos.${index}.title`, video.title),
    }));
  }

  // Translate experiments
  if (chapterData.experiments) {
    translatedData.experiments = chapterData.experiments.map((exp, index) => ({
      ...exp,
      title: translate(`experiments.${index}.title`, exp.title),
      difficulty: t(
        `subjects.chapter_screen.difficulty.${exp.difficulty?.toLowerCase()}`,
        { defaultValue: exp.difficulty }
      ),
      materials: exp.materials
        ? exp.materials.map((material, matIndex) =>
            translate(`experiments.${index}.materials.${matIndex}`, material)
          )
        : exp.materials,
    }));
  }

  // Translate achievements
  if (chapterData.achievements) {
    translatedData.achievements = chapterData.achievements.map((achievement, index) => ({
      ...achievement,
      label: translate(`achievements.${index}.label`, achievement.label),
    }));
  }

  return translatedData;
};
