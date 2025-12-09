import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getStudents, getStudentById } from "../api/api";

const StudentsScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();

    // Timeout after 15 seconds
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        alert(
          "Request is taking too long. Please check:\n1. Backend server is running\n2. Network connection\n3. API URL configuration"
        );
      }
    }, 15000);

    return () => clearTimeout(timeoutId);
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data || []);
    } catch (error) {
      let errorMessage =
        t("students_screen.failed_load") || "Failed to load students";

      if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
        errorMessage =
          "Request timeout. Please check your internet connection and backend server.";
      } else if (
        error.code === "ECONNREFUSED" ||
        error.message?.includes("Network Error")
      ) {
        errorMessage =
          "Cannot connect to server. Please ensure the backend is running on port 5000.";
      } else if (error.response) {
        errorMessage =
          error.response.data?.message || error.message || errorMessage;
      } else {
        errorMessage = error.message || errorMessage;
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentPress = async (studentId) => {
    try {
      const student = await getStudentById(studentId);

      alert(
        `${t("students_screen.name")}: ${student.name}
${t("students_screen.email")}: ${
          student.email || t("students_screen.na")
        }
${t("students_screen.class")}: ${
          student.class || t("students_screen.na")
        }
${t("students_screen.phone")}: ${
          student.phone || t("students_screen.na")
        }`
      );
    } catch (error) {
      alert(
        error.message || t("students_screen.failed_load_details") || "Error"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
        {/* Loader */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-600">
          {t("students_screen.loading") || "Loading..."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <div className="bg-blue-600 px-4 pt-16 pb-4 flex flex-row items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2">
          <span className="text-white text-lg font-semibold">
            {t("common.back") || "Back"}
          </span>
        </button>

        <p className="text-white text-xl font-bold">
          {t("students_screen.title") || "Students"}
        </p>

        <div className="w-14" />
      </div>

      {/* CONTENT */}
      {students.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center px-10 text-center">
          <p className="text-gray-600 text-lg mb-5">
            {t("students_screen.no_students") || "No students found"}
          </p>

          <button
            onClick={loadStudents}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            {t("common.refresh") || "Refresh"}
          </button>
        </div>
      ) : (
        <div className="p-4">
          {students.map((item) => (
            <button
              key={item._id}
              onClick={() => handleStudentPress(item._id)}
              className="w-full bg-white rounded-xl p-4 mb-3 flex flex-row justify-between items-center shadow-md"
            >
              <div className="flex-1 text-left">
                <p className="text-lg font-bold text-gray-800 mb-1">
                  {item.name || t("students_screen.unknown")}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  {item.email || t("students_screen.no_email")}
                </p>
                {item.class && (
                  <p className="text-sm text-blue-600">
                    {t("students_screen.class")}: {item.class}
                  </p>
                )}
              </div>
              <span className="text-2xl text-gray-300">›</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentsScreen;
