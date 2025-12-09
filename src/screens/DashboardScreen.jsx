import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { logoutTeacher, getCurrentTeacher } from "../api/api";

const DashboardScreen = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    checkAuthentication();
    loadTeacherData();
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/health");
      if (!res.ok) console.warn("Backend health check failed");
      else console.log("Backend reachable");
    } catch (error) {
      console.error("Backend connection error: ", error);
      alert(
        "Cannot connect to backend. Ensure:\n1) Backend is running\n2) Correct URL\n3) Internet active"
      );
    }
  };

  const checkAuthentication = async () => {
    const token = localStorage.getItem("teacherToken");
    if (!token) {
      navigate("/auth/login?role=teacher", { replace: true });
    }
  };

  const loadTeacherData = async () => {
    try {
      const stored = localStorage.getItem("teacherData");
      if (stored) {
        setTeacherData(JSON.parse(stored));
      } else {
        const data = await getCurrentTeacher();
        setTeacherData(data);
        localStorage.setItem("teacherData", JSON.stringify(data));
      }
    } catch (error) {
      console.log("Teacher data load error: ", error);
    }
  };

  const handleLogout = async () => {
    if (window.confirm(t("common.logout_confirm"))) {
      await logoutTeacher();
      localStorage.removeItem("teacherToken");
      navigate("/auth/login?role=teacher", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 page-shell">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="bg-blue-600 px-6 pt-12 pb-6 rounded-b-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow">
          <div>
            <p className="text-white text-sm opacity-90">
              {t("teacher_dashboard.welcome")}
            </p>
            <h1 className="text-white text-2xl font-bold mt-1">
              {teacherData?.name || t("teacher_dashboard.teacher")}
            </h1>
            <p className="text-white text-sm opacity-80 mt-1">
              {teacherData?.schoolName || ""}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/20 rounded-lg text-white font-semibold self-start sm:self-auto"
          >
            {t("common.logout")}
          </button>
        </div>

        {/* CONTENT GRID */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <button
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center"
            onClick={() => navigate("/teacher/students")}
          >
            <p className="text-5xl mb-3">👥</p>
            <p className="text-lg font-bold text-gray-800">
              {t("teacher_dashboard.students")}
            </p>
            <p className="text-xs text-gray-600 text-center">
              {t("teacher_dashboard.view_student_list")}
            </p>
          </button>

          <button
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center"
            onClick={() => navigate("/teacher/notes")}
          >
            <p className="text-5xl mb-3">📝</p>
            <p className="text-lg font-bold text-gray-800">
              {t("teacher_dashboard.notes")}
            </p>
            <p className="text-xs text-gray-600 text-center">
              {t("teacher_dashboard.manage_study_notes")}
            </p>
          </button>

          <button
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center"
            onClick={() => navigate("/teacher/meetings")}
          >
            <p className="text-5xl mb-3">📅</p>
            <p className="text-lg font-bold text-gray-800">
              {t("teacher_dashboard.meetings")}
            </p>
            <p className="text-xs text-gray-600 text-center">
              {t("teacher_dashboard.schedule_meetings")}
            </p>
          </button>

          <button
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center"
            onClick={() => navigate("/teacher/exams")}
          >
            <p className="text-5xl mb-3">📋</p>
            <p className="text-lg font-bold text-gray-800">
              {t("teacher_dashboard.exams")}
            </p>
            <p className="text-xs text-gray-600 text-center">
              {t("teacher_dashboard.create_manage_exams")}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;