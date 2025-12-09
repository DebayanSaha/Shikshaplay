import React from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../i18n/i18n";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const LanguageSelectionScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  ];

  const handleLanguageSelect = async (languageCode) => {
    await changeLanguage(languageCode);
    navigate("/auth/choose-role");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-500 px-5 page-shell">
      <div className="flex flex-col items-center w-full max-w-md z-10">
        
        {/* Logo */}
        <div className="mb-8">
          <img src={logo} className="w-32 h-32 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-white font-bold text-5xl mb-2 drop-shadow-lg">
          {t("language_selection.title")}
        </h1>

        <p className="text-white/90 text-lg mb-12">
          {t("language_selection.subtitle")}
        </p>

        {/* Language Buttons */}
        <div className="w-full space-y-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className="w-full bg-white rounded-2xl p-5 flex justify-between items-center shadow-xl hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-gray-800">
                  {lang.nativeName}
                </span>
                <span className="text-lg font-semibold text-gray-500">
                  {lang.name}
                </span>
              </div>
              <span className="text-2xl text-gray-500">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionScreen;
