import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getNotes, deleteNote } from "../api/api";

const NotesScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await getNotes();
      setNotes(data || []);
    } catch (error) {
      console.error("Error loading notes:", error);

      let errorMessage = t("notes_screen.failed_load") || "Failed to load notes";

      if (error.message?.includes("timeout")) {
        errorMessage =
          "Request timeout. Please check your internet connection and backend server.";
      } else if (error.message?.includes("Network Error")) {
        errorMessage = "Cannot connect to server. Please ensure backend is running.";
      } else if (error.response) {
        errorMessage = error.response.data?.message || error.message;
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (noteId, title) => {
    const confirmDelete = window.confirm(`${t("notes_screen.delete_confirm")} "${title}"?`);

    if (!confirmDelete) return;

    deleteNote(noteId)
      .then(() => {
        alert(t("notes_screen.note_deleted"));
        loadNotes();
      })
      .catch((err) => alert(err.message || t("notes_screen.failed_delete")));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-blue-600 text-white px-4 py-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-lg font-semibold"
        >
          {t("common.back")}
        </button>

        <h1 className="text-xl font-bold">{t("notes_screen.title")}</h1>

        <button
          onClick={() => navigate("/teacher/upload-note")}
          className="text-lg font-semibold"
        >
          {t("common.add")}
        </button>
      </header>

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-600 mt-4">{t("notes_screen.loading")}</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && notes.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[70vh] px-10">
          <p className="text-gray-600 text-lg mb-4">
            {t("notes_screen.no_notes")}
          </p>
          <button
            onClick={() => navigate("/teacher/upload-note")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {t("notes_screen.upload_first")}
          </button>
        </div>
      )}

      {/* NOTES LIST */}
      {!loading && notes.length > 0 && (
        <div className="p-4">
          {notes.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl p-4 mb-4 shadow-md flex justify-between"
            >
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title || t("notes_screen.untitled")}
                </h2>

                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.description || t("notes_screen.no_description")}
                </p>

                <p className="text-gray-500 text-xs">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : t("notes_screen.unknown_date")}
                </p>
              </div>

              <button
                onClick={() => handleDelete(item._id, item.title)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg ml-4 h-fit"
              >
                {t("common.delete")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesScreen;
