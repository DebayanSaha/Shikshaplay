import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getStudentMeetings, getStudentTeachers } from "../api/api";

const StudentMeetingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [meetings, setMeetings] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("meetings"); // meetings | teachers

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [meetingsData, teachersData] = await Promise.all([
        getStudentMeetings(),
        getStudentTeachers(),
      ]);
      setMeetings(meetingsData);
      setTeachers(teachersData);
    } catch (error) {
      alert(
        (t("common.error") || "Error") +
          "\n" +
          (error.message ||
            t("meetings_screen.failed_load") ||
            "Failed to load data")
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-3 text-base text-slate-500">
          {t("common.loading") || "Loading..."}
        </p>
      </div>
    );
  }

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
          {t("student_dashboard.teacher_interaction") ||
            "Connect with Teachers"}
        </p>

        <div className="w-10" />
      </div>

      {/* TABS */}
      <div className="flex flex-row bg-white px-5 py-2 border-b border-slate-200">
        <button
          className={`flex-1 py-3 text-center border-b-2 ${
            activeTab === "meetings"
              ? "border-indigo-500 text-indigo-500 font-extrabold"
              : "border-transparent text-slate-500 font-semibold"
          }`}
          onClick={() => setActiveTab("meetings")}
        >
          {t("student_dashboard.meetings") || "Meetings"}
        </button>

        <button
          className={`flex-1 py-3 text-center border-b-2 ${
            activeTab === "teachers"
              ? "border-indigo-500 text-indigo-500 font-extrabold"
              : "border-transparent text-slate-500 font-semibold"
          }`}
          onClick={() => setActiveTab("teachers")}
        >
          {t("student_dashboard.teachers") || "Teachers"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {activeTab === "meetings" ? (
          <div>
            {/* EMPTY STATE */}
            {meetings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <span className="text-6xl mb-4">📅</span>
                <p className="text-lg font-bold text-slate-800 mb-2">
                  {t("student_dashboard.no_meetings") ||
                    "No meetings scheduled yet"}
                </p>
                <p className="text-sm text-slate-500 text-center px-10">
                  {t("student_dashboard.no_meetings_desc") ||
                    "Your teachers will schedule meetings here"}
                </p>
              </div>
            ) : (
              meetings.map((meeting, index) => (
                <div
                  key={meeting._id || index}
                  className="bg-white rounded-2xl p-5 mb-4 shadow-md"
                >
                  {/* HEADER */}
                  <div className="flex flex-row items-start mb-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <span className="text-2xl">📅</span>
                    </div>

                    <div className="flex-1">
                      <p className="text-lg font-extrabold text-slate-800 mb-1">
                        {meeting.title}
                      </p>

                      {meeting.teacher && (
                        <p className="text-sm text-indigo-500 font-semibold">
                          👨‍🏫 {meeting.teacher.name || "Teacher"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  {meeting.description && (
                    <p className="text-sm text-slate-500 leading-5 mb-3">
                      {meeting.description}
                    </p>
                  )}

                  {/* DETAILS */}
                  <div className="flex flex-row gap-6 mt-2">
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-base">📆</span>
                      <p className="text-sm text-slate-600 font-semibold">
                        {formatDate(meeting.date)}
                      </p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <span className="text-base">⏰</span>
                      <p className="text-sm text-slate-600 font-semibold">
                        {meeting.time || "TBA"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            {/* TEACHERS EMPTY STATE */}
            {teachers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <span className="text-6xl mb-4">👨‍🏫</span>
                <p className="text-lg font-bold text-slate-800 mb-2">
                  {t("student_dashboard.no_teachers") || "No teachers found"}
                </p>
                <p className="text-sm text-slate-500 text-center px-10">
                  {t("student_dashboard.no_teachers_desc") ||
                    "Teachers from your school will appear here"}
                </p>
              </div>
            ) : (
              teachers.map((teacher, index) => (
                <div
                  key={teacher._id || index}
                  className="bg-white rounded-2xl p-5 mb-4 shadow-md"
                >
                  <div className="flex flex-row items-start mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-2xl">👨‍🏫</span>
                    </div>

                    <div className="flex-1">
                      <p className="text-lg font-extrabold text-slate-800 mb-1">
                        {teacher.name}
                      </p>

                      <p className="text-sm text-slate-500 mb-1">
                        ID: {teacher.teacherId}
                      </p>

                      {teacher.email && (
                        <p className="text-xs text-slate-600 mb-1">
                          📧 {teacher.email}
                        </p>
                      )}

                      {teacher.phone && (
                        <p className="text-xs text-slate-600">
                          📱 {teacher.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-sm text-indigo-500 font-semibold">
                      🏫 {teacher.schoolName}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMeetingsScreen;
