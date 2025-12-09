import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const logoutStudent = async () => {
  localStorage.removeItem("studentToken");
  localStorage.removeItem("studentData");
};

const StudentDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Student");
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    checkAuthentication();
    loadStudentData();
    // Trigger animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkAuthentication = async () => {
    try {
      const studentToken = localStorage.getItem('studentToken');
      if (!studentToken) {
        navigate('/auth/login?role=student', { replace: true });
        return;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/auth/login?role=student', { replace: true });
      navigate('/auth/login?role=student', { replace: true });
    }
  };

  const loadStudentData = async () => {
    try {
      const studentData = localStorage.getItem('studentData');
      if (studentData) {
        const parsed = JSON.parse(studentData);
        setUserName(parsed.name || "Student");
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  };

  const learningSubjects = [
    {
      nameKey: "subjects.physics.title",
      emoji: "/assets/Physics.png",
      bgColor: "#EEF2FF",
      iconBg: "#6366F1",
      textColor: "#312E81",
      screen: "PhysicsChapters",
      progress: 75,
    },
    {
      nameKey: "subjects.chemistry.title",
      emoji: "/assets/Chemistry.png",
      bgColor: "#FFF7ED",
      iconBg: "#F97316",
      textColor: "#7C2D12",
      screen: "ChemistryChapters",
      progress: 60,
    },
    {
      nameKey: "subjects.math.title",
      emoji: "/assets/Math.png",
      bgColor: "#ECFEFF",
      iconBg: "#06B6D4",
      textColor: "#164E63",
      screen: "MathsChapters",
      progress: 85,
    },
    {
      nameKey: "subjects.biology.title",
      emoji: "/assets/Biology.png",
      bgColor: "#F0FDF4",
      iconBg: "#10B981",
      textColor: "#14532D",
      screen: "BiologyChapters",
      progress: 50,
    },
    {
      nameKey: "subjects.computer.title",
      emoji: "/assets/Computer.png",
      bgColor: "#FDF4FF",
      iconBg: "#A855F7",
      textColor: "#581C87",
      screen: "ComputerChapters",
      progress: 40,
    },
  ];

  const achievements = [
    { 
      title: "lab_master", 
      desc: "lab_master_desc", 
      icon: "🏆",
      progress: 7,
      total: 10,
      bgColor: "#FEF3C7",
      accentColor: "#F59E0B"
    },
    { 
      title: "streak_keeper", 
      desc: "streak_keeper_desc", 
      icon: "🔥",
      progress: 5,
      total: 7,
      bgColor: "#FEE2E2",
      accentColor: "#EF4444"
    },
    { 
      title: "peer_helper", 
      desc: "peer_helper_desc", 
      icon: "⭐",
      progress: 3,
      total: 5,
      bgColor: "#DBEAFE",
      accentColor: "#3B82F6"
    },
    { 
      title: "quick_learner", 
      desc: "quick_learner_desc", 
      icon: "⚡",
      progress: 1,
      total: 1,
      bgColor: "#E0E7FF",
      accentColor: "#6366F1"
    },
  ];

  const virtualLabs = [
    {
      title: "coding_arena",
      desc: "coding_arena_desc",
      buttonColor: "#10b981",
      icon: "🧪",
      participants: "2.3k",
      screen: "CodeCompiler"
    },
    {
      title: "circuit_builder",
      desc: "circuit_builder_desc",
      buttonColor: "#3b82f6",
      icon: "⚡",
      participants: "1.8k",
      screen: "CircuitBuilder"
    },
    {
      title: "virtual_neuron",
      desc: "virtual_neuron_desc",
      buttonColor: "#3b82f6",
      icon: "⚡",
      participants: "1.8k",
      screen: "Neuron"
    },
  ];

  const handleLogout = () => {
    if (window.confirm(t("common.logout_confirm") || "Are you sure you want to logout?")) {
      logoutStudent();
      navigate("/auth/login?role=student", { replace: true });
    }
  };

  const screenToPath = (screen) => {
    switch (screen) {
      case "PhysicsChapters":
        return "/student/subjects/physics";
      case "ChemistryChapters":
        return "/student/subjects/chemistry";
      case "MathsChapters":
        return "/student/subjects/maths";
      case "BiologyChapters":
        return "/student/subjects/biology";
      case "ComputerChapters":
        return "/student/subjects/computer";
      case "CodeCompiler":
        return "/student/games/compiler";
      case "CircuitBuilder":
        return "/student/games/circuit";
      case "Neuron":
        return "/student/games/neuron";
      default:
        return "/student/dashboard";
    }
  };

  const headerOpacity = Math.max(0.95, 1 - scrollY / 500);

  return (
    <div className="min-h-screen bg-[#F8FAFC] page-shell">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header 
          className="sticky top-0 z-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-5 py-4 bg-white border-b border-[#F1F5F9] transition-opacity duration-300"
          style={{ opacity: headerOpacity }}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex justify-center items-center bg-[#F1F5F9]">
              <img src="/assets/logo.png" alt="Logo" className="w-11 h-11" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#1E293B]">{t("choose_role.title")}</h1>
              <p className="text-[11px] text-[#64748B] font-medium">{t("student_dashboard.level_explorer")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 flex justify-center items-center">
              <div className="absolute top-0.5 right-0.5 bg-[#EF4444] rounded-full w-[18px] h-[18px] flex justify-center items-center z-10">
                <span className="text-white text-[10px] font-bold">3</span>
              </div>
              <span className="text-[22px]">🔔</span>
            </button>
            <div className="flex items-center bg-[#FEF3C7] px-2.5 py-1.5 rounded-full gap-1">
              <span className="text-base">🔥</span>
              <span className="text-sm font-bold text-[#F59E0B]">5</span>
            </div>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 flex justify-center items-center bg-[#FEE2E2] rounded-full ml-2"
            >
              <span className="text-xl">🚪</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
        {/* Welcome Card */}
        <div 
          className={`m-5 mb-4 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/25 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="bg-[#6366F1] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-[#C7D2FE] font-semibold mb-1">{t("student_dashboard.welcome")}</p>
              <h2 className="text-[28px] font-extrabold text-white mb-1.5">{userName} 👋</h2>
              <p className="text-sm text-[#E0E7FF] mb-4">{t("student_dashboard.ready_level_up")}</p>
              
              <div className="mt-2">
                <div className="h-1.5 bg-white/20 rounded overflow-hidden">
                  <div className="h-full w-[70%] bg-[#FCD34D] rounded"></div>
                </div>
                <p className="text-xs text-[#E0E7FF] mt-1.5 font-semibold">2,450 / 3,500 XP</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-[70px] h-[70px] rounded-full bg-white flex justify-center items-center border-[3px] border-[#818CF8]">
                <span className="text-[38px]">👨‍🎓</span>
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 bg-[#FCD34D] w-8 h-8 rounded-full flex justify-center items-center border-[3px] border-[#6366F1]">
                <span className="text-sm font-extrabold text-[#78350F]">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white mx-5 mb-6 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 items-center shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex justify-center items-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <p className="text-[22px] font-extrabold text-[#1E293B] mb-0.5">358</p>
              <p className="text-xs text-[#64748B] font-semibold">{t("student_dashboard.ranking")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex justify-center items-center">
              <span className="text-2xl">🪙</span>
            </div>
            <div>
              <p className="text-[22px] font-extrabold text-[#1E293B] mb-0.5">2.4K</p>
              <p className="text-xs text-[#64748B] font-semibold">{t("student_dashboard.coins")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#DBEAFE] flex justify-center items-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <p className="text-[22px] font-extrabold text-[#1E293B] mb-0.5">89%</p>
              <p className="text-xs text-[#64748B] font-semibold">{t("student_dashboard.accuracy")}</p>
            </div>
          </div>
        </div>

        {/* Let's Play Section */}
          <div className="px-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[22px] font-extrabold text-[#1E293B]">{t("student_dashboard.lets_play")}</h3>
            <button className="text-sm text-[#6366F1] font-semibold">{t("student_dashboard.see_all")}</button>
          </div>
          
            <div className="flex flex-wrap justify-between pt-8 gap-4">
            {learningSubjects.map((subject, index) => (
                <div key={index} className="w-full sm:w-[calc(50%-8px)] mb-14 relative">
                {/* Floating Icon */}
                <div className="absolute -top-16 left-6 w-32 h-[120px] flex justify-center items-center z-10">
                  <div 
                    className="absolute w-[60px] h-[60px] rounded-3xl opacity-15 bottom-0"
                    style={{ backgroundColor: subject.iconBg }}
                  ></div>
                  <img
                    src={subject.emoji}
                    alt={t(subject.nameKey)}
                    className="w-28 h-28 object-contain"
                  />
                </div>
                
                {/* Card */}
                <button
                  onClick={() => navigate(screenToPath(subject.screen))}
                  className="w-full h-40 pt-[70px] pb-4 px-4 rounded-2xl shadow-lg relative"
                  style={{ backgroundColor: subject.bgColor }}
                >
                  <div className="text-left">
                    <h4 className="text-lg font-extrabold mb-1" style={{ color: subject.textColor }}>
                      {t(subject.nameKey)}
                    </h4>
                    <p className="text-[13px] text-[#64748B] font-semibold">{subject.questions}</p>
                    
                    {/* Progress Circle */}
                    <div className="absolute bottom-[-30px] left-4 w-11 h-11 rounded-full bg-white/80 flex justify-center items-center">
                      <span className="text-[13px] font-extrabold" style={{ color: subject.iconBg }}>
                        {subject.progress}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <div 
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex justify-center items-center shadow-md"
                    style={{ backgroundColor: subject.iconBg }}
                  >
                    <span className="text-white text-sm font-bold ml-0.5">▶</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="px-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏆</span>
              <h3 className="text-[22px] font-extrabold text-[#1E293B]">{t("student_dashboard.achievements")}</h3>
            </div>
            <span className="text-[13px] text-[#64748B] font-semibold">4/12</span>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="min-w-[180px] p-5 rounded-2xl shadow-lg"
                style={{ backgroundColor: achievement.bgColor }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                    <span className="text-[26px]">{achievement.icon}</span>
                  </div>
                  <div className="bg-black/10 px-2 py-1 rounded-xl">
                    <span className="text-[11px] font-bold text-[#1E293B]">
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                </div>
                <h4 className="text-base font-extrabold text-[#1E293B] mb-1">
                  {t(`student_dashboard.${achievement.title}`)}
                </h4>
                <p className="text-xs text-[#64748B] mb-3 leading-4">
                  {t(`student_dashboard.${achievement.desc}`)}
                </p>
                
                <div className="h-1.5 bg-black/10 rounded overflow-hidden">
                  <div 
                    className="h-full rounded"
                    style={{ 
                      width: `${(achievement.progress / achievement.total) * 100}%`,
                      backgroundColor: achievement.accentColor 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Virtual Labs */}
        <div className="px-5 mb-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-2xl">🧬</span>
            <h3 className="text-[22px] font-extrabold text-[#1E293B]">{t("student_dashboard.virtual_labs")}</h3>
          </div>

          {virtualLabs.map((lab, index) => (
            <div key={index} className="flex items-center bg-white p-4 rounded-2xl mb-3 shadow-lg">
              <div className="w-[60px] h-[60px] rounded-full bg-[#F1F5F9] flex justify-center items-center mr-4">
                <span className="text-[30px]">{lab.icon}</span>
              </div>
              <div className="flex-1 mr-3">
                <h4 className="text-base font-bold text-[#1E293B] mb-1">
                  {t(`student_dashboard.${lab.title}`)}
                </h4>
                <p className="text-[13px] text-[#64748B] mb-1.5">
                  {t(`student_dashboard.${lab.desc}`)}
                </p>
                <p className="text-xs text-[#94A3B8] font-semibold">
                  👥 {lab.participants} {t("student_dashboard.joined")}
                </p>
              </div>
              <button
                onClick={() => navigate(screenToPath(lab.screen))}
                className="w-[50px] h-[50px] rounded-full flex justify-center items-center shadow-md text-white text-lg font-bold"
                style={{ backgroundColor: lab.buttonColor }}
              >
                ▶
              </button>
            </div>
          ))}
        </div>

        {/* Teacher Interaction Section */}
        <div className="px-5 mb-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-2xl">👨‍🏫</span>
            <h3 className="text-[22px] font-extrabold text-[#1E293B]">
              {t("student_dashboard.teacher_interaction") || "Connect with Teachers"}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-2xl mb-4 shadow-lg">
            <div className="flex items-start mb-4">
              <div className="w-[50px] h-[50px] rounded-full bg-[#E0E7FF] flex justify-center items-center mr-4">
                <span className="text-2xl">💬</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-extrabold text-[#1E293B] mb-1.5">
                  {t("student_dashboard.view_meetings") || "View Scheduled Meetings"}
                </h4>
                <p className="text-[13px] text-[#64748B] leading-[18px]">
                  {t("student_dashboard.meetings_desc") || "Check your meetings with teachers and request new ones"}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/student/meetings")}
              className="w-full bg-[#6366F1] py-3.5 px-5 rounded-xl flex justify-between items-center shadow-md shadow-indigo-500/20"
            >
              <span className="text-white text-base font-bold">
                {t("student_dashboard.view_meetings_btn") || "View Meetings"}
              </span>
              <span className="text-white text-lg font-bold">→</span>
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl mb-4 shadow-lg">
            <div className="flex items-start mb-4">
              <div className="w-[50px] h-[50px] rounded-full bg-[#DBEAFE] flex justify-center items-center mr-4">
                <span className="text-2xl">📚</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-extrabold text-[#1E293B] mb-1.5">
                  {t("student_dashboard.view_notes") || "Study Materials"}
                </h4>
                <p className="text-[13px] text-[#64748B] leading-[18px]">
                  {t("student_dashboard.notes_desc") || "Access notes and study materials shared by teachers"}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/student/notes")}
              className="w-full bg-[#3B82F6] py-3.5 px-5 rounded-xl flex justify-between items-center shadow-md shadow-blue-500/20"
            >
              <span className="text-white text-base font-bold">
                {t("student_dashboard.view_notes_btn") || "View Notes"}
              </span>
              <span className="text-white text-lg font-bold">→</span>
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl mb-4 shadow-lg">
            <div className="flex items-start mb-4">
              <div className="w-[50px] h-[50px] rounded-full bg-[#FEF3C7] flex justify-center items-center mr-4">
                <span className="text-2xl">📋</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-extrabold text-[#1E293B] mb-1.5">
                  {t("student_dashboard.view_exams") || "Exams & Tests"}
                </h4>
                <p className="text-[13px] text-[#64748B] leading-[18px]">
                  {t("student_dashboard.exams_desc") || "View and take exams assigned by your teachers"}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/student/exams")}
              className="w-full bg-[#F59E0B] py-3.5 px-5 rounded-xl flex justify-between items-center shadow-md shadow-amber-500/20"
            >
              <span className="text-white text-base font-bold">
                {t("student_dashboard.view_exams_btn") || "View Exams"}
              </span>
              <span className="text-white text-lg font-bold">→</span>
            </button>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="mx-5 mb-5 p-6 rounded-3xl bg-white shadow-2xl shadow-purple-500/20 border-2 border-[#E9D5FF]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[40px]">🎯</span>
            <div className="bg-[#FEF3C7] px-3 py-1.5 rounded-full">
              <span className="text-xs text-[#F59E0B] font-bold">
                ⏰ {t("student_dashboard.hours_left")}
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-[#1E293B] mb-2">
            {t("student_dashboard.daily_challenge")}
          </h3>
          <p className="text-sm text-[#64748B] leading-5 mb-5">
            {t("student_dashboard.challenge_desc")}
          </p>
          
          {/* Challenge Progress */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-[#10B981] border-2 border-[#10B981] flex justify-center items-center mb-2 shadow-md shadow-green-500/30">
                <span className="text-xl font-extrabold text-white">✓</span>
              </div>
              <span className="text-xs text-[#64748B] font-semibold">{t("student_dashboard.lesson")} 1</span>
            </div>
            <div className="w-10 h-0.5 bg-[#E2E8F0] mx-2 mb-7"></div>
            <div className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-[#8B5CF6] border-2 border-[#8B5CF6] flex justify-center items-center mb-2 shadow-lg shadow-purple-500/30">
                <span className="text-xl font-extrabold text-white">2</span>
              </div>
              <span className="text-xs text-[#64748B] font-semibold">{t("student_dashboard.lesson")} 2</span>
            </div>
            <div className="w-10 h-0.5 bg-[#E2E8F0] mx-2 mb-7"></div>
            <div className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-[#F1F5F9] border-2 border-[#E2E8F0] flex justify-center items-center mb-2">
                <span className="text-xl font-extrabold text-white">3</span>
              </div>
              <span className="text-xs text-[#64748B] font-semibold">{t("student_dashboard.lesson")} 3</span>
            </div>
          </div>

          <button className="w-full bg-[#8B5CF6] py-4 rounded-2xl flex justify-center items-center gap-2 shadow-lg shadow-purple-500/30">
            <span className="text-white text-base font-bold">
              {t("student_dashboard.continue_challenge")}
            </span>
            <span className="text-white text-lg font-bold">→</span>
          </button>
        </div>

        <div className="h-10"></div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      </div>
    </div>
  );
};

export default StudentDashboard;