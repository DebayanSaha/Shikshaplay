import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerTeacher, registerStudent } from "../api/api";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role: stateRole } = location.state || {};
  const searchParams = new URLSearchParams(location.search);
  const queryRole = searchParams.get("role");
  const role = stateRole || queryRole || "student";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    schoolName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!formData.id) return window.alert(`Enter ${role} ID`);
    if (!formData.name) return window.alert("Enter full name");
    if (!formData.email) return window.alert("Enter email");
    if (!formData.schoolName) return window.alert("Enter school name");
    if (!formData.password) return window.alert("Enter password");
    if (formData.password !== formData.confirmPassword)
      return window.alert("Passwords do not match");
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      if (role === "teacher") {
        await registerTeacher({
          teacherId: formData.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          schoolName: formData.schoolName,
          password: formData.password,
        });
      } else {
        await registerStudent({
          studentId: formData.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          schoolName: formData.schoolName,
          password: formData.password,
        });
      }

      window.alert(
        `${role === "teacher" ? "Teacher" : "Student"} registered successfully!`
      );

      navigate("/auth/login", { state: { role } });
    } catch (e) {
      window.alert(e.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 page-shell">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {role === "teacher" ? "Teacher Registration" : "Student Registration"}
        </h1>

        {/* ID */}
        <div className="mb-3">
          <label className="block text-lg mb-1">
            {role === "teacher" ? "Teacher ID" : "Student ID"}
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder={`Enter ${role} ID`}
            value={formData.id}
            onChange={(e) => handleChange("id", e.target.value)}
          />
        </div>

        {/* COMMON FIELDS */}
        <div className="mb-3">
          <label className="block text-lg mb-1">Full Name</label>
          <input
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-lg mb-1">Email</label>
          <input
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
          />
        </div>

        <div className="mb-3">
          <label className="block text-lg mb-1">Phone Number</label>
          <input
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            type="tel"
          />
        </div>

        <div className="mb-3">
          <label className="block text-lg mb-1">School Name</label>
          <input
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder="Enter school name"
            value={formData.schoolName}
            onChange={(e) => handleChange("schoolName", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-lg mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="block text-lg mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full bg-blue-600 py-3 rounded-lg text-white text-lg font-semibold 
            ${loading ? "opacity-60" : ""}`}
        >
          {loading ? (
            <div className="flex justify-center">
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Register"
          )}
        </button>

        <button
          className="mt-4 w-full text-blue-600 text-center font-semibold"
          onClick={() => navigate("/auth/login", { state: { role } })}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default RegisterScreen;
