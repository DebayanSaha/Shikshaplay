import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CodeCompiler = () => {
  const { t } = useTranslation();
  const tt = (key, fallback) => {
    const val = t(key, { returnObjects: false, defaultValue: fallback || key });
    return typeof val === "string" ? val : fallback || key;
  };
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python3");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const languages = [
    { label: tt("code_compiler.languages.python", "Python"), value: "python3" },
    { label: tt("code_compiler.languages.java", "Java"), value: "java" },
    { label: tt("code_compiler.languages.c", "C"), value: "c" },
    { label: tt("code_compiler.languages.cpp", "C++"), value: "cpp17" },
  ];

  const sampleCodes = {
    python3: '# Python Example\nprint("Hello, World!")',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    c: '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    cpp17: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  };

  const compileCode = async () => {
    if (!code.trim()) {
      alert(tt("code_compiler.errors.enter_code", "Please enter some code."));
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          stdin: input,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setOutput(result?.message || tt("code_compiler.errors.no_output", "Compile failed."));
      } else {
        setOutput(result.output || tt("code_compiler.errors.no_output", "No output received."));
      }
    } catch (err) {
      setOutput(`${tt("code_compiler.errors.network_error", "Network error")}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => setCode(sampleCodes[language]);
  const clearAll = () => {
    setCode("");
    setInput("");
    setOutput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 sm:p-6 page-shell">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{tt("code_compiler.title", "Code Compiler")}</h1>
        <p className="text-gray-600 mt-1">{tt("code_compiler.subtitle", "Write, run, and test code online.")}</p>
      </div>

      {/* Language Selector */}
      <div className="mb-6">
        <p className="font-semibold mb-2 text-gray-800">{tt("code_compiler.select_language", "Select language")}:</p>
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={`px-4 py-2 rounded-md border-2 font-semibold ${
                language === lang.value
                  ? "bg-green-600 border-green-600 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <p className="font-semibold text-gray-800">{tt("code_compiler.code_editor", "Code Editor")}:</p>
          <button
            onClick={loadSample}
            className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold w-full sm:w-auto"
          >
            {tt("code_compiler.load_sample", "Load sample")}
          </button>
        </div>
        <textarea
          className="w-full bg-white border border-gray-300 rounded-md p-3 font-mono text-sm min-h-[220px]"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {/* Input */}
      <div className="mb-6">
        <p className="font-semibold text-gray-800 mb-2">{tt("code_compiler.standard_input", "Standard Input")}:</p>
        <textarea
          className="w-full bg-white border border-gray-300 rounded-md p-3 font-mono min-h-20"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={compileCode}
          disabled={loading}
          className="flex-1 bg-green-600 text-white py-3 rounded-md font-semibold disabled:opacity-60"
        >
          {loading ? tt("code_compiler.compiling", "Compiling") + "..." : tt("code_compiler.compile_run", "Compile & Run")}
        </button>
        <button
          onClick={clearAll}
          className="flex-1 bg-red-600 text-white py-3 rounded-md font-semibold"
        >
          {tt("code_compiler.clear_all", "Clear All")}
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="mb-6">
          <p className="font-semibold text-gray-800 mb-2">{tt("code_compiler.output", "Output")}:</p>
          <pre className="bg-black text-green-400 p-4 rounded-md min-h-[150px] whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeCompiler;
