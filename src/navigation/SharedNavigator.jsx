import React from "react";
import { Routes, Route } from "react-router-dom";

import PhysicsChapters from "../Subjects/physics/PhysicsChapters";
import BiologyChapters from "../Subjects/biology/BiologyChapters";
import ComputerChapters from "../Subjects/computer/ComputerChapters";
import ChemistryChapters from "../Subjects/chemistry/ChemistryChapters";
import MathsChapters from "../Subjects/Math/MathsChapters";

import ChapterScreen from "../Subjects/Common_File/ChapterScreen";
import PdfViewer from "../Subjects/Common_File/PdfViewer";

import CircuitBuilder from "../Subjects/physics/Games/Electricity/CircuitBuilder";
import CodeCompiler from "../screens/CodeCompiler";
import OhmCalculator from "../Subjects/physics/Games/Electricity/Ohms";
import NewtonsLaws from "../Subjects/physics/Games/Motion/NewtonsLaws";
import PH from "../Subjects/chemistry/Games/PH";
import Atoms from "../Subjects/chemistry/Games/Atoms";
import Sound from "../Subjects/physics/Games/Sound";
import Conductivity from "../Subjects/physics/Games/Heat/Conductivity";
import Neuron from "../Subjects/biology/Game/Neuron";

import { chapterData as physicsChapterData } from "../Subjects/physics/chapterData";
import { chapterData as chemistryChapterData } from "../Subjects/chemistry/chapterData";
import { chapterData as computerChapterData } from "../Subjects/computer/chapterData";
import { chapterData as mathChapterData } from "../Subjects/Math/chapterData";
import { chapterData } from "../Subjects/biology/chapterData";

const SharedNavigator = () => {
  return (
    <Routes>

      {/* Subject Chapters */}
      <Route path="/PhysicsChapters" element={<PhysicsChapters />} />
      <Route path="/ChemistryChapters" element={<ChemistryChapters />} />
      <Route path="/BiologyChapters" element={<BiologyChapters />} />
      <Route path="/MathsChapters" element={<MathsChapters />} />
      <Route path="/ComputerChapters" element={<ComputerChapters />} />

      {/* Physics Chapters */}
      <Route path="/G6PChapter1" element={<ChapterScreen data={physicsChapterData["G6PChapter1"]} />} />
      <Route path="/G6PChapter2" element={<ChapterScreen data={physicsChapterData["G6PChapter2"]} />} />
      <Route path="/G6PChapter3" element={<ChapterScreen data={physicsChapterData["G6PChapter3"]} />} />
      <Route path="/G7PChapter1" element={<ChapterScreen data={physicsChapterData["G7PChapter1"]} />} />
      <Route path="/G7PChapter2" element={<ChapterScreen data={physicsChapterData["G7PChapter2"]} />} />
      <Route path="/G8PChapter1" element={<ChapterScreen data={physicsChapterData["G8PChapter1"]} />} />
      <Route path="/G8PChapter2" element={<ChapterScreen data={physicsChapterData["G8PChapter2"]} />} />
      <Route path="/G10PChapter1" element={<ChapterScreen data={physicsChapterData["G10PChapter1"]} />} />

      {/* Chemistry Chapters */}
      <Route path="/G6CChapter1" element={<ChapterScreen data={chemistryChapterData["G6CChapter1"]} />} />
      <Route path="/G6CChapter2" element={<ChapterScreen data={chemistryChapterData["G6CChapter2"]} />} />
      <Route path="/G6CChapter3" element={<ChapterScreen data={chemistryChapterData["G6CChapter3"]} />} />
      <Route path="/G7CChapter1" element={<ChapterScreen data={chemistryChapterData["G7CChapter1"]} />} />
      <Route path="/G8CChapter1" element={<ChapterScreen data={chemistryChapterData["G8CChapter1"]} />} />
      <Route path="/G8CChapter2" element={<ChapterScreen data={chemistryChapterData["G8CChapter2"]} />} />
      <Route path="/G9CChapter1" element={<ChapterScreen data={chemistryChapterData["G9CChapter1"]} />} />
      <Route path="/G9CChapter2" element={<ChapterScreen data={chemistryChapterData["G9CChapter2"]} />} />
      <Route path="/G10CChapter1" element={<ChapterScreen data={chemistryChapterData["G10CChapter1"]} />} />
      <Route path="/G10CChapter2" element={<ChapterScreen data={chemistryChapterData["G10CChapter2"]} />} />

      {/* Biology Chapters */}
      <Route path="/G6BChapter1" element={<ChapterScreen data={chapterData["G6BChapter1"]} />} />
      <Route path="/G6BChapter2" element={<ChapterScreen data={chapterData["G6BChapter2"]} />} />
      <Route path="/G6BChapter3" element={<ChapterScreen data={chapterData["G6BChapter3"]} />} />
      <Route path="/G7BChapter1" element={<ChapterScreen data={chapterData["G7BChapter1"]} />} />
      <Route path="/G7BChapter2" element={<ChapterScreen data={chapterData["G7BChapter2"]} />} />
      <Route path="/G7BChapter3" element={<ChapterScreen data={chapterData["G7BChapter3"]} />} />
      <Route path="/G8BChapter1" element={<ChapterScreen data={chapterData["G8BChapter1"]} />} />
      <Route path="/G8BChapter2" element={<ChapterScreen data={chapterData["G8BChapter2"]} />} />
      <Route path="/G9BChapter1" element={<ChapterScreen data={chapterData["G9BChapter1"]} />} />
      <Route path="/G10BChapter1" element={<ChapterScreen data={chapterData["G10BChapter1"]} />} />
      <Route path="/G10BChapter2" element={<ChapterScreen data={chapterData["G10BChapter2"]} />} />

      {/* Computer Chapters */}
      <Route path="/G6ITChapter1" element={<ChapterScreen data={computerChapterData["G6ITChapter1"]} />} />
      <Route path="/G6ITChapter2" element={<ChapterScreen data={computerChapterData["G6ITChapter2"]} />} />
      <Route path="/G6ITChapter3" element={<ChapterScreen data={computerChapterData["G6ITChapter3"]} />} />
      <Route path="/G7ITChapter1" element={<ChapterScreen data={computerChapterData["G7ITChapter1"]} />} />
      <Route path="/G8ITChapter1" element={<ChapterScreen data={computerChapterData["G8ITChapter1"]} />} />
      <Route path="/G8ITChapter2" element={<ChapterScreen data={computerChapterData["G8ITChapter2"]} />} />
      <Route path="/G10ITChapter1" element={<ChapterScreen data={computerChapterData["G10ITChapter1"]} />} />

      {/* Math Chapters */}
      <Route path="/G6MChapter1" element={<ChapterScreen data={mathChapterData["G6MChapter1"]} />} />
      <Route path="/G6MChapter2" element={<ChapterScreen data={mathChapterData["G6MChapter2"]} />} />
      <Route path="/G7MChapter1" element={<ChapterScreen data={mathChapterData["G7MChapter1"]} />} />
      <Route path="/G8MChapter1" element={<ChapterScreen data={mathChapterData["G8MChapter1"]} />} />
      <Route path="/G9MChapter1" element={<ChapterScreen data={mathChapterData["G9MChapter1"]} />} />
      <Route path="/G10MChapter1" element={<ChapterScreen data={mathChapterData["G10MChapter1"]} />} />

      {/* Universal PDF Viewer */}
      <Route path="/PdfViewer" element={<PdfViewer />} />

      {/* Games & Tools */}
      <Route path="/PH" element={<PH />} />
      <Route path="/CircuitBuilder" element={<CircuitBuilder />} />
      <Route path="/CodeCompiler" element={<CodeCompiler />} />
      <Route path="/OhmCalculator" element={<OhmCalculator />} />
      <Route path="/Atoms" element={<Atoms />} />
      <Route path="/NewtonsLaws" element={<NewtonsLaws />} />
      <Route path="/Conductivity" element={<Conductivity />} />
      <Route path="/Sound" element={<Sound />} />
      <Route path="/Neuron" element={<Neuron />} />

    </Routes>
  );
};

export default SharedNavigator;
