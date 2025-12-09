import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const pulseAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function ChooseRole() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center items-center w-full min-h-screen bg-blue-500 px-5 overflow-hidden page-shell">

      {/* Floating circles */}
      <motion.div
        className="absolute bg-yellow-400 opacity-20 rounded-full"
        style={{ width: 80, height: 80, top: "15%", left: 30 }}
        variants={pulseAnimation}
        animate="animate"
      />

      <motion.div
        className="absolute bg-pink-500 opacity-20 rounded-full"
        style={{ width: 60, height: 60, top: "25%", right: 50 }}
        variants={pulseAnimation}
        animate="animate"
        transition={{ delay: 0.3 }}
      />

      <motion.div
        className="absolute bg-green-500 opacity-20 rounded-full"
        style={{ width: 100, height: 100, bottom: "20%", left: 80 }}
        variants={pulseAnimation}
        animate="animate"
        transition={{ delay: 0.6 }}
      />

      <div className="z-10 flex flex-col items-center max-w-md w-full">

        {/* LOGO */}
        <div className="mb-6">
          <img src="/assets/logo.png" alt="App Logo" className="w-32 h-32 object-contain" />
        </div>

        {/* Title and subtitle */}
        <h1 className="text-4xl font-bold text-white mb-2">
          {t("choose_role.title")}
        </h1>
        <p className="text-lg text-white/90 mb-12">
          {t("choose_role.subtitle")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full">

          {/* Student button */}
          <button
            onClick={() => navigate("/auth/login?role=student")}
            className="flex justify-between items-center bg-white rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex justify-center items-center">
                <span className="text-3xl">🎓</span>
              </div>
              <span className="text-2xl font-semibold text-gray-800">
                {t("choose_role.student")}
              </span>
            </div>
            <span className="text-3xl text-gray-500">→</span>
          </button>

          {/* Teacher button */}
          <button
            onClick={() => navigate("/auth/login?role=teacher")}
            className="flex justify-between items-center bg-white rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex justify-center items-center">
                <span className="text-3xl">🏆</span>
              </div>
              <span className="text-2xl font-semibold text-gray-800">
                {t("choose_role.teacher")}
              </span>
            </div>
            <span className="text-3xl text-gray-500">→</span>
          </button>

        </div>
      </div>
    </div>
  );
}
