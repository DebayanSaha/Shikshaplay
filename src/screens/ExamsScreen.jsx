import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getExams, createExam, updateExam, deleteExam } from "../api/api";

const ExamsScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }],
  });

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    setLoading(true);
    try {
      const data = await getExams();
      setExams(data || []);
    } catch (error) {
      window.alert(error.message || "Failed to fetch exams");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingExam(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }],
    });
    setModalVisible(true);
  };

  const openEditModal = (exam) => {
    setEditingExam(exam);
    setFormData({
      title: exam.title || "",
      description: exam.description || "",
      date: exam.date?.split("T")[0] || "",
      questions: exam.questions?.length
        ? exam.questions
        : [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }],
    });
    setModalVisible(true);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await deleteExam(id);
      loadExams();
    } catch (err) {
      window.alert("Failed to delete");
    }
  };

  if (loading && exams.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
        <p className="text-gray-600 mt-4">{t("exams_screen.loading")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white p-5 flex justify-between items-center">
        <button className="font-semibold" onClick={() => navigate(-1)}>
          {t("common.back")}
        </button>
        <h1 className="font-bold text-xl">{t("exams_screen.title")}</h1>
        <button className="font-semibold" onClick={openAddModal}>
          {t("common.add")}
        </button>
      </div>

      {/* Empty State */}
      {exams.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-600 mb-4">{t("exams_screen.no_exams")}</p>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
            onClick={openAddModal}
          >
            {t("exams_screen.create_first")}
          </button>
        </div>
      ) : (
        <div className="p-5 grid gap-4">
          {exams.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between"
            >
              <div>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600 line-clamp-2">{item.description}</p>
                <p className="text-blue-500 text-sm">
                  📅 {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-sm">
                  {item.questions?.length} {t("exams_screen.questions_count")}
                </p>
              </div>

              <div className="flex flex-col gap-2 w-28">
                <button
                  className="bg-blue-500 text-white py-2 rounded-lg"
                  onClick={() => openEditModal(item)}
                >
                  {t("common.edit")}
                </button>
                <button
                  className="bg-red-500 text-white py-2 rounded-lg"
                  onClick={() => handleDelete(item._id, item.title)}
                >
                  {t("common.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamsScreen;
