import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Teacher-specific screens
import DashboardScreen from "../screens/DashboardScreen";
import StudentsScreen from "../screens/StudentsScreen";
import NotesScreen from "../screens/NotesScreen";
import MeetingsScreen from "../screens/MeetingsScreen";
import ExamsScreen from "../screens/ExamsScreen";

// Shared subject screens
import PhysicsChapters from "../Subjects/physics/PhysicsChapters";
import BiologyChapters from "../Subjects/biology/BiologyChapters";
import ComputerChapters from "../Subjects/computer/ComputerChapters";
import ChemistryChapters from "../Subjects/chemistry/ChemistryChapters";
import MathsChapters from "../Subjects/Math/MathsChapters";

import ChapterScreen from "../Subjects/Common_File/ChapterScreen";
import PdfViewer from "../Subjects/Common_File/PdfViewer";
import UploadNoteScreen from "../screens/UploadNoteScreen";

// Games
import CircuitBuilder from "../Subjects/physics/Games/Electricity/CircuitBuilder";
import CodeCompiler from "../screens/CodeCompiler";
import OhmCalculator from "../Subjects/physics/Games/Electricity/Ohms";
import NewtonsLaws from "../Subjects/physics/Games/Motion/NewtonsLaws";
import PH from "../Subjects/chemistry/Games/PH";
import Atoms from "../Subjects/chemistry/Games/Atoms";
import Sound from "../Subjects/physics/Games/Sound";
import Conductivity from "../Subjects/physics/Games/Heat/Conductivity";
import Neuron from "../Subjects/biology/Game/Neuron";

// Chapter Data
import { chapterData as physicsChapterData } from "../Subjects/physics/chapterData";
import { chapterData as chemistryChapterData } from "../Subjects/chemistry/chapterData";
import { chapterData as computerChapterData } from "../Subjects/computer/chapterData";
import { chapterData as mathChapterData } from "../Subjects/Math/chapterData";
import { chapterData } from "../Subjects/biology/chapterData";

const mapScreenToPath = (screen) => {
  switch (screen) {
    case "PdfViewer":
      return "/teacher/pdf-viewer";
    case "CircuitBuilder":
      return "/teacher/games/circuit";
    case "OhmCalculator":
      return "/teacher/games/ohm";
    case "CodeCompiler":
      return "/teacher/games/compiler";
    case "PH":
      return "/teacher/games/ph";
    case "Atoms":
      return "/teacher/games/atoms";
    case "NewtonsLaws":
    case "NewtonsLawsScreen":
      return "/teacher/games/newton";
    case "Conductivity":
      return "/teacher/games/conductivity";
    case "Sound":
      return "/teacher/games/sound";
    case "Neuron":
      return "/teacher/games/neuron";
    default:
      return screen?.startsWith("/") ? screen : `/teacher/${screen}`;
  }
};

const ChapterRoute = ({ data, routeName }) => {
  const navigate = useNavigate();
  const go = (dest, options) => {
    const target = mapScreenToPath(dest || "");
    navigate(target, typeof options === "object" ? { state: options } : undefined);
  };
  return <ChapterScreen data={data} route={{ name: routeName }} navigate={go} />;
};

const findChapterData = (chapterId) => {
  return (
    physicsChapterData[chapterId] ||
    chemistryChapterData[chapterId] ||
    computerChapterData[chapterId] ||
    mathChapterData[chapterId] ||
    chapterData[chapterId] ||
    null
  );
};

const DynamicChapterRoute = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const data = chapterId ? findChapterData(chapterId) : null;
  const go = (dest, options) => {
    const target = mapScreenToPath(dest || "");
    navigate(target, typeof options === "object" ? { state: options } : undefined);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-2">Chapter not found</h2>
          <p className="text-gray-600">This chapter may be coming soon.</p>
        </div>
      </div>
    );
  }

  return <ChapterScreen data={data} route={{ name: chapterId }} navigate={go} />;
};

const withNavigate = (Component) => () => {
  const navigate = useNavigate();
  const go = (dest) => {
    if (typeof dest === "number") return navigate(dest);
    if (dest?.startsWith("/")) return navigate(dest);
    return navigate(`/teacher/${dest}`);
  };
  return <Component navigate={go} />;
};

const PhysicsChaptersScreen = withNavigate(PhysicsChapters);
const ChemistryChaptersScreen = withNavigate(ChemistryChapters);
const BiologyChaptersScreen = withNavigate(BiologyChapters);
const MathsChaptersScreen = withNavigate(MathsChapters);
const ComputerChaptersScreen = withNavigate(ComputerChapters);

const TeacherNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/teacher/dashboard" replace />} />

      {/* Teacher-specific screens */}
      <Route path="dashboard" element={<DashboardScreen />} />
      <Route path="students" element={<StudentsScreen />} />
      <Route path="notes" element={<NotesScreen />} />
      <Route path="upload-note" element={<UploadNoteScreen />} />
      <Route path="meetings" element={<MeetingsScreen />} />
      <Route path="exams" element={<ExamsScreen />} />

      {/* Subject Lists */}
      <Route path="subjects/physics" element={<PhysicsChaptersScreen />} />
      <Route path="subjects/chemistry" element={<ChemistryChaptersScreen />} />
      <Route path="subjects/biology" element={<BiologyChaptersScreen />} />
      <Route path="subjects/maths" element={<MathsChaptersScreen />} />
      <Route path="subjects/computer" element={<ComputerChaptersScreen />} />

      {/* Physics Chapters */}
      <Route path="chapter/G6PChapter1" element={<ChapterRoute data={physicsChapterData["G6PChapter1"]} routeName="G6PChapter1" />} />
      <Route path="chapter/G6PChapter2" element={<ChapterRoute data={physicsChapterData["G6PChapter2"]} routeName="G6PChapter2" />} />
      <Route path="chapter/G6PChapter3" element={<ChapterRoute data={physicsChapterData["G6PChapter3"]} routeName="G6PChapter3" />} />
      <Route path="chapter/G7PChapter1" element={<ChapterRoute data={physicsChapterData["G7PChapter1"]} routeName="G7PChapter1" />} />
      <Route path="chapter/G7PChapter2" element={<ChapterRoute data={physicsChapterData["G7PChapter2"]} routeName="G7PChapter2" />} />
      <Route path="chapter/G8PChapter1" element={<ChapterRoute data={physicsChapterData["G8PChapter1"]} routeName="G8PChapter1" />} />
      <Route path="chapter/G8PChapter2" element={<ChapterRoute data={physicsChapterData["G8PChapter2"]} routeName="G8PChapter2" />} />
      <Route path="chapter/G10PChapter1" element={<ChapterRoute data={physicsChapterData["G10PChapter1"]} routeName="G10PChapter1" />} />

      {/* Chemistry Chapters */}
      <Route path="chapter/G6CChapter1" element={<ChapterRoute data={chemistryChapterData["G6CChapter1"]} routeName="G6CChapter1" />} />
      <Route path="chapter/G6CChapter2" element={<ChapterRoute data={chemistryChapterData["G6CChapter2"]} routeName="G6CChapter2" />} />
      <Route path="chapter/G6CChapter3" element={<ChapterRoute data={chemistryChapterData["G6CChapter3"]} routeName="G6CChapter3" />} />
      <Route path="chapter/G7CChapter1" element={<ChapterRoute data={chemistryChapterData["G7CChapter1"]} routeName="G7CChapter1" />} />
      <Route path="chapter/G8CChapter1" element={<ChapterRoute data={chemistryChapterData["G8CChapter1"]} routeName="G8CChapter1" />} />
      <Route path="chapter/G8CChapter2" element={<ChapterRoute data={chemistryChapterData["G8CChapter2"]} routeName="G8CChapter2" />} />
      <Route path="chapter/G9CChapter1" element={<ChapterRoute data={chemistryChapterData["G9CChapter1"]} routeName="G9CChapter1" />} />
      <Route path="chapter/G9CChapter2" element={<ChapterRoute data={chemistryChapterData["G9CChapter2"]} routeName="G9CChapter2" />} />
      <Route path="chapter/G10CChapter1" element={<ChapterRoute data={chemistryChapterData["G10CChapter1"]} routeName="G10CChapter1" />} />
      <Route path="chapter/G10CChapter2" element={<ChapterRoute data={chemistryChapterData["G10CChapter2"]} routeName="G10CChapter2" />} />

      {/* Biology Chapters */}
      <Route path="chapter/G6BChapter1" element={<ChapterRoute data={chapterData["G6BChapter1"]} routeName="G6BChapter1" />} />
      <Route path="chapter/G6BChapter2" element={<ChapterRoute data={chapterData["G6BChapter2"]} routeName="G6BChapter2" />} />
      <Route path="chapter/G6BChapter3" element={<ChapterRoute data={chapterData["G6BChapter3"]} routeName="G6BChapter3" />} />
      <Route path="chapter/G7BChapter1" element={<ChapterRoute data={chapterData["G7BChapter1"]} routeName="G7BChapter1" />} />
      <Route path="chapter/G7BChapter2" element={<ChapterRoute data={chapterData["G7BChapter2"]} routeName="G7BChapter2" />} />
      <Route path="chapter/G7BChapter3" element={<ChapterRoute data={chapterData["G7BChapter3"]} routeName="G7BChapter3" />} />
      <Route path="chapter/G8BChapter1" element={<ChapterRoute data={chapterData["G8BChapter1"]} routeName="G8BChapter1" />} />
      <Route path="chapter/G8BChapter2" element={<ChapterRoute data={chapterData["G8BChapter2"]} routeName="G8BChapter2" />} />
      <Route path="chapter/G9BChapter1" element={<ChapterRoute data={chapterData["G9BChapter1"]} routeName="G9BChapter1" />} />
      <Route path="chapter/G10BChapter1" element={<ChapterRoute data={chapterData["G10BChapter1"]} routeName="G10BChapter1" />} />
      <Route path="chapter/G10BChapter2" element={<ChapterRoute data={chapterData["G10BChapter2"]} routeName="G10BChapter2" />} />

      {/* Computer Chapters */}
      <Route path="chapter/G6ITChapter1" element={<ChapterRoute data={computerChapterData["G6ITChapter1"]} routeName="G6ITChapter1" />} />
      <Route path="chapter/G6ITChapter2" element={<ChapterRoute data={computerChapterData["G6ITChapter2"]} routeName="G6ITChapter2" />} />
      <Route path="chapter/G6ITChapter3" element={<ChapterRoute data={computerChapterData["G6ITChapter3"]} routeName="G6ITChapter3" />} />
      <Route path="chapter/G7ITChapter1" element={<ChapterRoute data={computerChapterData["G7ITChapter1"]} routeName="G7ITChapter1" />} />
      <Route path="chapter/G8ITChapter1" element={<ChapterRoute data={computerChapterData["G8ITChapter1"]} routeName="G8ITChapter1" />} />
      <Route path="chapter/G8ITChapter2" element={<ChapterRoute data={computerChapterData["G8ITChapter2"]} routeName="G8ITChapter2" />} />
      <Route path="chapter/G10ITChapter1" element={<ChapterRoute data={computerChapterData["G10ITChapter1"]} routeName="G10ITChapter1" />} />

      {/* Math Chapters */}
      <Route path="chapter/G6MChapter1" element={<ChapterRoute data={mathChapterData["G6MChapter1"]} routeName="G6MChapter1" />} />
      <Route path="chapter/G6MChapter2" element={<ChapterRoute data={mathChapterData["G6MChapter2"]} routeName="G6MChapter2" />} />
      <Route path="chapter/G7MChapter1" element={<ChapterRoute data={mathChapterData["G7MChapter1"]} routeName="G7MChapter1" />} />
      <Route path="chapter/G8MChapter1" element={<ChapterRoute data={mathChapterData["G8MChapter1"]} routeName="G8MChapter1" />} />
      <Route path="chapter/G9MChapter1" element={<ChapterRoute data={mathChapterData["G9MChapter1"]} routeName="G9MChapter1" />} />
      <Route path="chapter/G10MChapter1" element={<ChapterRoute data={mathChapterData["G10MChapter1"]} routeName="G10MChapter1" />} />

      {/* Fallback dynamic chapter route */}
      <Route path="chapter/:chapterId" element={<DynamicChapterRoute />} />

      {/* PDF Viewer */}
      <Route path="pdf-viewer" element={<PdfViewer />} />

      {/* Games */}
      <Route path="games/ph" element={<PH />} />
      <Route path="games/circuit" element={<CircuitBuilder />} />
      <Route path="games/compiler" element={<CodeCompiler />} />
      <Route path="games/ohm" element={<OhmCalculator />} />
      <Route path="games/atoms" element={<Atoms />} />
      <Route path="games/newton" element={<NewtonsLaws />} />
      <Route path="games/conductivity" element={<Conductivity />} />
      <Route path="games/sound" element={<Sound />} />
      <Route path="games/neuron" element={<Neuron />} />
    </Routes>
  );
};

export default TeacherNavigator;
