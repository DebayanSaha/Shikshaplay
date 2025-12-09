import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const StudentNotesScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="bg-white px-5 pt-16 pb-4 flex flex-row items-center justify-between border-b border-slate-200">
        <button
          className="w-10 h-10 flex items-center justify-center"
          onClick={() => navigate(-1)}
        >
          <span className="text-2xl text-slate-800">←</span>
        </button>

        <p className="text-xl font-extrabold text-slate-800 flex-1 text-center">
          {t("student_dashboard.view_notes") || "Study Materials"}
        </p>

        <div className="w-10" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 justify-center items-center px-5">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-7xl mb-4">📚</span>

          <p className="text-lg font-bold text-slate-800 mb-2">
            {t("student_dashboard.notes_coming_soon") || "Notes Coming Soon"}
          </p>

          <p className="text-sm text-slate-500 px-10">
            {t("student_dashboard.notes_coming_soon_desc") ||
              "Study materials shared by teachers will appear here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentNotesScreen;
