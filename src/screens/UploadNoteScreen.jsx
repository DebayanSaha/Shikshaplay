import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { uploadNote } from "../api/api";

const UploadNoteScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filePath, setFilePath] = useState("");
  const [uploading, setUploading] = useState(false);

  const pickDocument = () => {
    window.alert(
      `${t("upload_note.file_selection")}\n\n${t("upload_note.file_path_help")}`
    );
  };

  const handleUpload = async () => {
    if (!title.trim()) {
      window.alert(t("upload_note.enter_title_error"));
      return;
    }
    if (!filePath.trim()) {
      window.alert(t("upload_note.enter_file_path_error"));
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description || "");

      let fileUri = filePath.trim();
      if (!fileUri.startsWith("file://") && !fileUri.startsWith("content://")) {
        fileUri = `file://${fileUri}`;
      }

      const fileName = filePath.split("/").pop() || "document.pdf";
      const ext = fileName.split(".").pop()?.toLowerCase() || "pdf";

      const mimeType =
        ext === "pdf"
          ? "application/pdf"
          : ext === "doc"
          ? "application/msword"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      formData.append("file", new File([""], fileName, { type: mimeType }));

      await uploadNote(formData);

      window.alert(t("upload_note.upload_success"));
      navigate(-1);
    } catch (error) {
      window.alert(
        error.message || t("upload_note.upload_failed_message")
      );
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 p-4 pt-16 flex flex-row items-center justify-between">
        <button
          className="text-white font-semibold text-lg"
          onClick={() => navigate(-1)}
        >
          {t("common.back")}
        </button>

        <h1 className="text-white text-xl font-bold">
          {t("upload_note.title")}
        </h1>

        <div className="w-16" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("upload_note.title_label")}
          </label>

          <input
            className="border border-gray-300 rounded-lg p-3 w-full text-base bg-white"
            placeholder={t("upload_note.enter_title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={uploading}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("upload_note.description_label")}
          </label>

          <textarea
            className="border border-gray-300 rounded-lg p-3 w-full h-28 bg-white text-base"
            placeholder={t("upload_note.enter_description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading}
          />
        </div>

        {/* File Path */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("upload_note.file_path_label")}
          </label>

          <input
            className="border border-gray-300 rounded-lg p-3 w-full text-base bg-white"
            placeholder={t("upload_note.enter_file_path")}
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            disabled={uploading}
          />

          {/* Help Button */}
          <button
            className="border border-blue-500 border-dashed rounded-lg p-4 mt-3 bg-blue-50 text-blue-600 font-semibold w-full"
            onClick={pickDocument}
            disabled={uploading}
          >
            {t("upload_note.need_help")}
          </button>

          <p className="text-xs text-gray-500 mt-2">
            {t("upload_note.supported")}
          </p>
        </div>

        {/* Upload Button */}
        <button
          className={`w-full rounded-lg p-4 text-white font-semibold mt-4 ${
            uploading ? "bg-blue-500 opacity-60" : "bg-blue-500"
          }`}
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <span className="animate-pulse">{t("common.loading")}...</span>
          ) : (
            t("upload_note.upload_note")
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadNoteScreen;
