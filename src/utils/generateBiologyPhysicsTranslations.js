// src/utils/generateTranslations.js
import { chapterData as biologyChapterData } from '../Subjects/biology/chapterData';
import { chapterData as physicsChapterData } from '../Subjects/physics/chapterData';

export const generateBiologyTranslations = () => {
  const translations = {};

  Object.keys(biologyChapterData).forEach((chapterId) => {
    const chapter = biologyChapterData[chapterId];
    translations[chapterId] = {
      chapterTitle: chapter.chapterTitle || '',
      subjectDescription: chapter.subjectDescription || '',
    };

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
          materials: exp.materials
            ? exp.materials.reduce((acc, mat, matIndex) => {
                acc[matIndex] = mat;
                return acc;
              }, {})
            : {},
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

export const generatePhysicsTranslations = () => {
  const translations = {};

  Object.keys(physicsChapterData).forEach((chapterId) => {
    const chapter = physicsChapterData[chapterId];
    translations[chapterId] = {
      chapterTitle: chapter.chapterTitle || '',
      subjectDescription: chapter.subjectDescription || '',
    };

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
          materials: exp.materials
            ? exp.materials.reduce((acc, mat, matIndex) => {
                acc[matIndex] = mat;
                return acc;
              }, {})
            : {},
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
