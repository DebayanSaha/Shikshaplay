// src/utils/translationUtils.js

/**
 * Utility script to generate translation keys structure from chapterData
 * This can be used to generate translation files for all chapters
 * 
 * Usage: Import chapterData and call generateTranslationKeys(chapterData)
 */

export const generateTranslationKeys = (chapterData) => {
  const translations = {};

  Object.keys(chapterData).forEach((chapterId) => {
    const chapter = chapterData[chapterId];
    translations[chapterId] = {};

    // Chapter title and description
    if (chapter.chapterTitle) {
      translations[chapterId].chapterTitle = chapter.chapterTitle;
    }
    if (chapter.subjectDescription) {
      translations[chapterId].subjectDescription = chapter.subjectDescription;
    }

    // Learning topics
    if (chapter.learningTopics) {
      translations[chapterId].learningTopics = {};
      chapter.learningTopics.forEach((topic, index) => {
        translations[chapterId].learningTopics[index] = {
          title: topic.title,
        };
      });
    }

    // PDF documents
    if (chapter.pdfDocuments) {
      translations[chapterId].pdfDocuments = {};
      chapter.pdfDocuments.forEach((doc, index) => {
        translations[chapterId].pdfDocuments[index] = {
          title: doc.title,
        };
      });
    }

    // Videos
    if (chapter.videos) {
      translations[chapterId].videos = {};
      chapter.videos.forEach((video, index) => {
        translations[chapterId].videos[index] = {
          title: video.title,
        };
      });
    }

    // Experiments
    if (chapter.experiments) {
      translations[chapterId].experiments = {};
      chapter.experiments.forEach((exp, index) => {
        translations[chapterId].experiments[index] = {
          title: exp.title,
          materials: exp.materials || [],
        };
      });
    }

    // Achievements
    if (chapter.achievements) {
      translations[chapterId].achievements = {};
      chapter.achievements.forEach((achievement, index) => {
        translations[chapterId].achievements[index] = {
          label: achievement.label,
        };
      });
    }
  });

  return translations;
};

/**
 * Generate JSON structure for translation files
 */
export const generateTranslationJSON = (chapterData, language = 'en') => {
  const translations = generateTranslationKeys(chapterData);
  return JSON.stringify({ subjects: { chapters: translations } }, null, 2);
};
