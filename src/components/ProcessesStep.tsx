import React, { useState } from "react";
import { BusinessProcess, TeamInfo, Language } from "../types";
import { ListTodo, Sparkles, Plus, Trash2, Sliders, Milestone, Info } from "lucide-react";

interface ProcessesStepProps {
  t: any;
  teamInfo: TeamInfo;
  processes: BusinessProcess[];
  setProcesses: React.Dispatch<React.SetStateAction<BusinessProcess[]>>;
  processesBrainstormed: BusinessProcess[];
  onBrainstorm: () => void;
  loading: boolean;
  language: Language;
}

export default function ProcessesStep({
  t,
  teamInfo,
  processes,
  setProcesses,
  processesBrainstormed,
  onBrainstorm,
  loading,
  language,
}: ProcessesStepProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bestPractice, setBestPractice] = useState("");
  const [impact, setImpact] = useState(5);
  const [differentiation, setDifferentiation] = useState(5);

  const handleAddProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProc: BusinessProcess = {
      id: "proc_" + Date.now(),
      name,
      description,
      bestPractice,
      businessImpact: impact,
      competitiveDifferentiation: differentiation,
    };

    setProcesses((prev) => [...prev, newProc]);
    // Clear inputs
    setName("");
    setDescription("");
    setBestPractice("");
    setImpact(5);
    setDifferentiation(5);
  };

  const handleSelectBrainstorm = (bp: BusinessProcess) => {
    // Check if already in processes
    if (processes.some((p) => p.name.toLowerCase() === bp.name.toLowerCase())) return;

    const newProc: BusinessProcess = {
      ...bp,
      id: "proc_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    };
    setProcesses((prev) => [...prev, newProc]);
  };

  const handleRemoveProcess = (id: string) => {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
  };

  const updateCoordinates = (id: string, field: "businessImpact" | "competitiveDifferentiation", val: number) => {
    setProcesses((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  return (
    <div id="processes-step-wrapper" className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div id="processes-header" className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-indigo-600" />
            {t.processTitle}
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            {t.processIntro}
          </p>
        </div>
        <button
          id="trigger-brainstorm-btn"
          disabled={loading}
          onClick={onBrainstorm}
          className={`px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            loading
              ? "bg-indigo-100 text-indigo-400 cursor-not-allowed"
              : "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200"
          }`}
        >
          <Sparkles className={`w-4 h-4 ${loading ? "animate-spin" : "animate-pulse"}`} />
          {t.brainstormBtn}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form & Active List */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Manual Form */}
          <form onSubmit={handleAddProcess} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Plus className="w-4 h-4 text-indigo-500" />
              {t.manualAdd}
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">{language === "ja" ? "プロセス名" : "Process Name"}</label>
                <input
                  id="process-name-val"
                  type="text"
                  required
                  placeholder={t.processNamePlace}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">{language === "ja" ? "プロセスの概要" : "Value Creation Goal"}</label>
                <textarea
                  id="process-desc-val"
                  rows={2}
                  placeholder={t.processDescPlace}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">{t.bestPracBrief}</label>
                <input
                  id="process-bestprac-val"
                  type="text"
                  placeholder={t.bestPracPlace}
                  value={bestPractice}
                  onChange={(e) => setBestPractice(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    {language === "ja" ? "影響度 (1-10)" : "Impact (1-10)"}
                  </label>
                  <input
                    id="process-impact-val"
                    type="number"
                    min="1"
                    max="10"
                    value={impact}
                    onChange={(e) => setImpact(parseInt(e.target.value) || 5)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    {language === "ja" ? "差別化 (1-10)" : "Differentiation (1-10)"}
                  </label>
                  <input
                    id="process-diff-val"
                    type="number"
                    min="1"
                    max="10"
                    value={differentiation}
                    onChange={(e) => setDifferentiation(parseInt(e.target.value) || 5)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-center font-bold"
                  />
                </div>
              </div>
            </div>

            <button
              id="submit-process-btn"
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-850 active:scale-[0.99] transition text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer mt-3"
            >
              <Plus className="w-4 h-4" />
              {language === "ja" ? "マトリクスに追加" : "Include in Matrix"}
            </button>
          </form>

          {/* AI Prebuilt Brainstorms Candidates */}
          {processesBrainstormed.length > 0 && (
            <div id="ai-brainstorm-results" className="bg-gradient-to-tr from-slate-50 to-indigo-50/20 rounded-2xl p-6 border border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-indigo-100">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                {language === "ja" ? "AI推奨プロセス" : "Ecosystem Suggestions"}
              </h4>
              <p className="text-[10px] text-slate-400">
                {language === "ja" ? "以下のプロセスをクリックするだけで直接活動に追加できます。" : "Click any proposed module below to annex it into your workspace."}
              </p>
              
              <div className="space-y-2">
                {processesBrainstormed.map((bp, idx) => {
                  const alreadyChosen = processes.some((p) => p.name.toLowerCase() === bp.name.toLowerCase());
                  return (
                    <button
                      id={`choose-suggestion-${idx}`}
                      key={idx}
                      onClick={() => handleSelectBrainstorm(bp)}
                      disabled={alreadyChosen}
                      className={`w-full p-2.5 rounded-xl border text-left transition ${
                        alreadyChosen
                          ? "bg-emerald-50 border-emerald-100 text-emerald-700 cursor-default"
                          : "bg-white hover:bg-slate-5 w border-slate-200 text-slate-700 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="truncate max-w-[80%]">{bp.name}</span>
                        {alreadyChosen ? (
                          <span className="text-[9px] bg-emerald-200/50 px-1 rounded">Chosen</span>
                        ) : (
                          <span className="text-[9px] bg-indigo-50 text-indigo-600 px-1 rounded font-mono">
                            I:{bp.businessImpact} D:{bp.competitiveDifferentiation}
                          </span>
                        )}
                      </div>
                      <p className="text-[9px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {bp.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interaction Prioritization Matrix */}
        <div className="lg:col-span-8 space-y-6">
          <div id="prioritization-matrix" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                <Sliders className="w-4.5 h-4.5 text-indigo-500" />
                {t.matrixTitle}
              </h3>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                {t.dragPrompt}
              </span>
            </div>

            {/* Simulated 2D grid diagram */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              <div className="md:col-span-8 bg-slate-50/50 rounded-2xl p-4 border border-slate-200 relative aspect-square md:aspect-auto md:h-96 flex flex-col justify-between">
                
                {/* Visual coordinate Grid lines overlay */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none p-4 opacity-[0.22]">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="border-t border-l border-slate-300" />
                  ))}
                </div>

                {/* Vertical Y-Axis Arrow Title */}
                <div className="absolute left-1 top-4 bottom-4 w-4 flex flex-col items-center justify-between text-[8px] font-bold text-slate-400 select-none">
                  <span className="rotate-270 uppercase inline-block whitespace-nowrap">{t.matrixYAxis} High</span>
                  <div className="w-0.5 h-1/2 bg-slate-300 relative">
                    <div className="absolute -top-1 -left-0.75 border-4 border-transparent border-b-slate-400" />
                  </div>
                  <span className="rotate-270 uppercase inline-block whitespace-nowrap">Low</span>
                </div>

                {/* Horizontal X-Axis Arrow Title */}
                <div className="absolute bottom-1 left-8 right-8 h-4 flex items-center justify-between text-[8px] font-bold text-slate-400 select-none">
                  <span>Low</span>
                  <div className="h-0.5 w-1/2 bg-slate-300 relative">
                    <div className="absolute -right-1 -top-0.75 border-4 border-transparent border-l-slate-400" />
                  </div>
                  <span className="uppercase">{t.matrixXAxis} High</span>
                </div>

                {/* Matrix Quadrant labels */}
                <div className="absolute top-8 right-8 text-[9px] font-black text-indigo-500/25 uppercase select-none pointer-events-none">
                  Strategic Focus (High Return)
                </div>
                <div className="absolute bottom-8 right-8 text-[9px] font-black text-slate-300 uppercase select-none pointer-events-none">
                  Incremental / Easy Wins
                </div>
                <div className="absolute top-8 left-12 text-[9px] font-black text-slate-300 uppercase select-none pointer-events-none">
                  Speculative Ventures
                </div>

                {/* Floating Node dots mapped matching processes */}
                <div className="absolute inset-0 p-8 pt-6 pb-10 pl-10 relative h-full w-full">
                  {processes.length === 0 ? (
                    <div className="h-full w-full flex items-center justify-center text-xs text-slate-400 italic">
                      {language === "ja" ? "主要プロセスを追加すると、この極座標平面にマッピングされます。" : "Add key business processes to map coordinate values here."}
                    </div>
                  ) : (
                    processes.map((p, idx) => {
                      // calculations for coordinates (1 to 10 range mapped into percentage bounds)
                      const pctX = ((p.businessImpact - 1) / 9) * 85 + 5;
                      const pctY = ((p.competitiveDifferentiation - 1) / 9) * 85 + 5;
                      return (
                        <div
                          id={`node-ball-${p.id}`}
                          key={p.id}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 cursor-pointer"
                          style={{ left: `${pctX}%`, bottom: `${pctY}%` }}
                        >
                          <div className="bg-slate-900 border-2 border-indigo-500 text-white w-6.5 h-6.5 rounded-full flex items-center justify-center font-bold text-xs shadow-lg group-hover:scale-115 transition">
                            {idx + 1}
                          </div>
                          
                          {/* Label tooltips popping up on hover */}
                          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded shadow-md whitespace-nowrap hidden group-hover:block z-30">
                            <strong>{p.name}</strong>
                            <div className="font-mono scale-90">I:{p.businessImpact} D:{p.competitiveDifferentiation}</div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

              </div>

              {/* List of custom processes coordinates sliders */}
              <div className="md:col-span-4 space-y-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 block pb-1 border-b border-slate-100">
                  {t.savedProcList}
                </span>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {processes.map((p, idx) => (
                    <div key={p.id} className="p-3 border border-slate-100 rounded-xl bg-white shadow-xs space-y-2 relative text-xs">
                      <button
                        id={`delete-proc-${p.id}`}
                        onClick={() => handleRemoveProcess(p.id)}
                        className="absolute top-2 right-2 text-slate-350 hover:text-red-500 transition cursor-pointer"
                        title="Remove process"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="pr-6 font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="bg-indigo-50 text-indigo-600 w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono font-black scale-90 shrink-0">
                          {idx + 1}
                        </span>
                        <span className="truncate">{p.name}</span>
                      </div>

                      {/* Sliders for real-time adjustments */}
                      <div className="space-y-1 pt-1 scale-90 origin-top-left">
                        <div className="flex justify-between font-mono text-[9px] text-slate-400">
                          <span>Impact (I): {p.businessImpact}/10</span>
                          <input
                            id={`slide-i-${p.id}`}
                            type="range"
                            min="1"
                            max="10"
                            value={p.businessImpact}
                            onChange={(e) => updateCoordinates(p.id, "businessImpact", parseInt(e.target.value))}
                            className="w-2.5/4 accent-indigo-600 scale-90"
                          />
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-slate-400">
                          <span>Diff (D): {p.competitiveDifferentiation}/10</span>
                          <input
                            id={`slide-d-${p.id}`}
                            type="range"
                            min="1"
                            max="10"
                            value={p.competitiveDifferentiation}
                            onChange={(e) => updateCoordinates(p.id, "competitiveDifferentiation", parseInt(e.target.value))}
                            className="w-2.5/4 accent-indigo-600 scale-90"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {processes.length === 0 && (
                    <div className="text-center text-[10px] text-slate-400 italic py-8">
                      {language === "ja" ? "選択された主要プロセスはまだありません" : "No active processes recorded."}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
