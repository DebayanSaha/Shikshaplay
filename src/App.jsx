// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./i18n/i18n"; // Initialize i18n

// Navigators (screens/components)
import AuthNavigator from "./navigation/AuthNavigator.jsx";
import TeacherNavigator from "./navigation/TeacherNavigator.jsx";
import StudentNavigator from "./navigation/StudentNavigator.jsx";

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const teacherToken = localStorage.getItem('teacherToken');
      const studentToken = localStorage.getItem('studentToken');

      if (teacherToken) {
        setInitialRoute('/teacher');
      } else if (studentToken) {
        setInitialRoute('/student');
      } else {
        setInitialRoute('/auth');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setInitialRoute('/auth');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    ); // Tailwind CSS loading screen
  }

  return (
    <Router>
      <Routes>
        {/* Redirect root path to initial route */}
        <Route path="/" element={<Navigate to={initialRoute || '/auth'} replace />} />

        {/* Auth Stack - Login, Register, etc. */}
        <Route path="/auth/*" element={<AuthNavigator />} />

        {/* Teacher Stack - All teacher screens */}
        <Route path="/teacher/*" element={<TeacherNavigator />} />

        {/* Student Stack - All student screens */}
        <Route path="/student/*" element={<StudentNavigator />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={initialRoute || '/auth'} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
