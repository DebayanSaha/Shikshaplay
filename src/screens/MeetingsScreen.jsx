import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  getMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "../api/api";

const MeetingsScreen = ({ navigate }) => {
  const { t } = useTranslation();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    studentId: "",
  });

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    setLoading(true);
    try {
      const data = await getMeetings();
      setMeetings(data || []);
    } catch (error) {
      alert(error.message || "Failed to load meetings");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingMeeting(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      studentId: "",
    });
    setModalVisible(true);
  };

  const openEditModal = (meeting) => {
    setEditingMeeting(meeting);
    setFormData({
      title: meeting.title || "",
      description: meeting.description || "",
      date: meeting.date ? meeting.date.split("T")[0] : "",
      time: meeting.time || "",
      studentId: meeting.studentId || "",
    });
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) return alert("Enter Title");
    if (!formData.date.trim()) return alert("Enter Date");
    if (!formData.time.trim()) return alert("Enter Time");

    try {
      if (editingMeeting) {
        await updateMeeting(editingMeeting._id, formData);
        alert("Meeting Updated");
      } else {
        await createMeeting(formData);
        alert("Meeting Created");
      }
      setModalVisible(false);
      loadMeetings();
    } catch (error) {
      alert(error.message || "Failed to save meeting");
    }
  };

  const handleDelete = (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    deleteMeeting(id)
      .then(() => {
        alert("Meeting Deleted");
        loadMeetings();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-blue-600 text-white p-6 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="font-semibold">
          {t("common.back")}
        </button>
        <h1 className="text-xl font-bold">{t("meetings_screen.title")}</h1>
        <button onClick={openAddModal} className="font-semibold">
          {t("common.add")}
        </button>
      </header>

      {/* LOADING SCREEN */}
      {loading && meetings.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
          <p className="mt-3">{t("meetings_screen.loading")}</p>
        </div>
      )}

      {/* EMPTY VIEW */}
      {!loading && meetings.length === 0 && (
        <div className="flex flex-col items-center p-20">
          <p className="text-gray-500">{t("meetings_screen.no_meetings")}</p>
          <button
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md"
            onClick={openAddModal}
          >
            {t("meetings_screen.schedule_first")}
          </button>
        </div>
      )}

      {/* MEETING LIST */}
      {!loading && meetings.length > 0 && (
        <div className="p-6">
          {meetings.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl mb-4 shadow-md"
            >
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <p className="text-blue-500 mt-2 text-sm">
                📅 {new Date(item.date).toLocaleDateString()} • ⏰ {item.time}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => openEditModal(item)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  {t("common.edit")}
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.title)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  {t("common.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingMeeting
                ? t("meetings_screen.edit_meeting")
                : t("meetings_screen.schedule_meeting")}
            </h2>

            {["title", "description", "date", "time", "studentId"].map((f) => (
              <input
                key={f}
                type="text"
                placeholder={t(`meetings_screen.${f}_placeholder`)}
                value={formData[f]}
                onChange={(e) =>
                  setFormData({ ...formData, [f]: e.target.value })
                }
                className="border p-2 rounded w-full mb-3"
              />
            ))}

            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-300 py-2 rounded-md"
                onClick={() => setModalVisible(false)}
              >
                {t("common.cancel")}
              </button>
              <button
                className="flex-1 bg-blue-600 text-white py-2 rounded-md"
                onClick={handleSave}
              >
                {t("common.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingsScreen;
