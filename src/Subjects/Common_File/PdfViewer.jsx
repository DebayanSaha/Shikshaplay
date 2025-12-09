// src/screens/PdfViewer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const PdfViewer = ({ route, navigate }) => {
  const { t } = useTranslation();
  const { filePath } = route?.params || {};

  const handleOpenPdf = () => {
    if (filePath) {
      alert(`${t('subjects.pdf_viewer.title')}\n${t('subjects.pdf_viewer.would_open_pdf', { path: filePath })}`);
    } else {
      alert(`${t('common.error')}\n${t('subjects.pdf_viewer.no_file_path')}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#581c87] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-5 pt-4 pb-5">
        <button
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-700 text-white text-lg">
            ←
          </div>
          <span className="text-gray-300 font-semibold text-sm">{t('common.back')}</span>
        </button>

        <h1 className="text-white font-bold text-lg">{t('subjects.pdf_viewer.title')}</h1>
        <div className="w-24" /> {/* Placeholder for alignment */}
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center items-center px-5">
        <div className="bg-gray-900/90 rounded-2xl p-8 w-full max-w-xl border border-gray-700 flex flex-col items-center">
          <span className="text-6xl mb-4">📄</span>
          <h2 className="text-2xl font-bold text-white mb-2">{t('subjects.pdf_viewer.pdf_document')}</h2>
          <p className="text-gray-400 text-center mb-6">{filePath || t('subjects.pdf_viewer.no_file_selected')}</p>

          <button
            className="w-full mb-6"
            onClick={handleOpenPdf}
          >
            <div className="py-3 rounded-lg w-full text-center font-bold text-white" style={{ background: 'linear-gradient(to right, #9333ea, #db2777)' }}>
              {t('subjects.pdf_viewer.open_pdf')} 📖
            </div>
          </button>

          {/* Info Box */}
          <div className="bg-gray-700/50 rounded-lg p-4 w-full border border-gray-600">
            <h3 className="text-white font-bold text-lg mb-2">📝 {t('subjects.pdf_viewer.note')}</h3>
            <p className="text-gray-300 text-sm mb-2">{t('subjects.pdf_viewer.note_description')}</p>
            <code className="block font-mono text-green-400 bg-green-200/20 rounded px-2 py-1 mb-2">
              npm install react-native-pdf
            </code>
            <p className="text-gray-300 text-sm">{t('subjects.pdf_viewer.note_integration')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
