import React from "react";
import { Routes, Route } from "react-router-dom";

import LanguageSelectionScreen from "../screens/LanguageSelectionScreen";
import ChooseRole from "../screens/ChooseRole";
// Remove the duplicate Login import - LoginScreen handles both teacher and student login
// import Login from "../screens/Login";  // ❌ This file doesn't exist
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen"; // ✅ Use this instead

const AuthNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<LanguageSelectionScreen />} />
      <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Routes>
  );
};

export default AuthNavigator;