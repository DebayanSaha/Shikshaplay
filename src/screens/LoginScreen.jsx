import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginTeacher, loginStudent } from "../api/api";
import { useTranslation } from "react-i18next";

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role: stateRole } = location.state || {}; // teacher | student
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const queryRole = searchParams.get("role");
  const role = stateRole || queryRole || "student";
  const { t } = useTranslation();

  const [teacherId, setTeacherId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAutoLogin();
  }, []);

  const checkAutoLogin = () => {
    const teacherToken = localStorage.getItem("teacherToken");
    const studentToken = localStorage.getItem("studentToken");

    if (teacherToken) navigate("/teacher/dashboard");
    if (studentToken) navigate("/student/dashboard");
  };

  const handleLogin = async () => {
    if (!password.trim()) return alert("Enter Password");
    if (!schoolName.trim()) return alert("Enter School Name");

    setLoading(true);

    try {
      if (role === "teacher") {
        if (!teacherId.trim()) {
          setLoading(false);
          return alert("Enter Teacher ID");
        }

        const result = await loginTeacher({ teacherId, password, schoolName });

        if (result && result.token) {
          localStorage.setItem("teacherToken", result.token);
          localStorage.setItem("teacherData", JSON.stringify(result.teacher));

          navigate("/teacher/dashboard", { replace: true });
        } else {
          throw new Error("Login failed: No token received");
        }
      } else if (role === "student") {
        if (!studentId.trim()) {
          setLoading(false);
          return alert("Enter Student ID");
        }

        const result = await loginStudent({ studentId, password, schoolName });

        if (result && result.token) {
          localStorage.setItem("studentToken", result.token);
          localStorage.setItem("studentData", JSON.stringify(result.student));

          navigate("/student/dashboard", { replace: true });
        } else {
          throw new Error("Login failed: No token received");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message || "Invalid Login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-5 page-shell">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          {role === "teacher" ? "Teacher Login" : "Student Login"}
        </h1>

        {role === "teacher" && (
          <div className="mb-4">
            <label className="text-lg font-semibold mb-2 block">Teacher ID</label>
            <input
              type="text"
              placeholder="Enter Teacher ID"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full border p-3 rounded-lg outline-none"
            />
          </div>
        )}

        {role === "student" && (
          <div className="mb-4">
            <label className="text-lg font-semibold mb-2 block">Student ID</label>
            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full border p-3 rounded-lg outline-none"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="text-lg font-semibold mb-2 block">School Name</label>
          <input
            type="text"
            placeholder="Enter School Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full border p-3 rounded-lg outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="text-lg font-semibold mb-2 block">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg outline-none"
          />
        </div>

        <button
          className={`w-full bg-blue-600 text-white p-4 rounded-xl text-lg font-bold mt-2 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? "Loading..." : `Login as ${role === "teacher" ? "Teacher" : "Student"}`}
        </button>

        <button
          className="w-full mt-4 text-blue-600 font-semibold"
          onClick={() => navigate("/auth/register", { state: { role } })}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
