import React, { useState } from "react";
import { BusinessProcess, DriversInputMap, DriverState, Language } from "../types";
import { Combine, Sparkles, AlertTriangle, Lightbulb, TrendingUp, Cpu, Gauge, Layers, RefreshCw } from "lucide-react";

interface DriversStepProps {
  t: any;
  processes: BusinessProcess[];
  driversMap: DriversInputMap;
  setDriversMap: React.Dispatch<React.SetStateAction<DriversInputMap>>;
  onEnhanceDriver: (processId: string, driverNum: number, userInput: string) => void;
  loadingMap: { [key: string]: boolean };
  language: Language;
}

export default function DriversStep({
  t,
  processes,
  driversMap,
  setDriversMap,
  onEnhanceDriver,
  loadingMap,
  language,
}: DriversStepProps) {
  const [activeProcessId, setActiveProcessId] = useState<string>(processes[0]?.id || "");
  const [activeDriverNum, setActiveDriverNum] = useState<number>(1);

  const activeProcess = processes.find((p) => p.id === activeProcessId);

  // Helper to retrieve state for current process + driver combo
  const getComboState = (procId: string, dNum: number): DriverState => {
    const key = `${procId}_${dNum}`;
    return driversMap[key] || { score: 5, userInput: "" };
  };

  const updateComboText = (txt: string) => {
    if (!activeProcessId) return;
    const key = `${activeProcessId}_${activeDriverNum}`;
    const oldState = getComboState(activeProcessId, activeDriverNum);
    setDriversMap((prev) => ({
      ...prev,
      [key]: {
        ...oldState,
        userInput: txt,
      },
    }));
  };

  const updateComboScore = (scr: number) => {
    if (!activeProcessId) return;
    const key = `${activeProcessId}_${activeDriverNum}`;
    const oldState = getComboState(activeProcessId, activeDriverNum);
    setDriversMap((prev) => ({
      ...prev,
      [key]: {
        ...oldState,
        score: scr,
      },
    }));
  };

  const currentCombo = activeProcessId ? getComboState(activeProcessId, activeDriverNum) : null;
  const isCurrentlyEnhancing = activeProcessId ? !!loadingMap[`${activeProcessId}_${activeDriverNum}`] : false;

  const driversList = [
    { num: 1, title: t.driver1, desc: t.driver1Desc },
    { num: 2, title: t.driver2, desc: t.driver2Desc },
    { num: 3, title: t.driver3, desc: t.driver3Desc },
    { num: 4, title: t.driver4, desc: t.driver4Desc },
  ];

  if (processes.length === 0) {
    return (
      <div id="drivers-empty-alert" className="bg-amber-50 border border-amber-100 rounded-3xl p-8 text-center max-w-xl mx-auto space-y-4">
        <Combine className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="text-sm font-bold text-amber-800">
          {language === "ja" ? "主要プロセスが定義されていません" : "Business Processes Awaiting Definition"}
        </h3>
        <p className="text-xs text-amber-600 leading-relaxed">
          {language === "ja"
            ? "バリュードライバー分析を開始する前に、ステップ２にお進みいただき、評価対象となる主要企業プロセスを追加してください。"
            : "Before analyzing value drivers, proceed to Step 2 and formulate at least one primary corporate process candidate."}
        </p>
      </div>
    );
  }

  return (
    <div id="drivers-step-wrapper" className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div id="drivers-header" className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-2">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Combine className="w-5.5 h-5.5 text-indigo-600" />
          {t.driverTitle}
        </h2>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
          {t.driverIntro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Process Switcher & Driver Cards selector */}
        <div className="lg:col-span-5 space-y-6">
          {/* Business Process Tab Selector */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
            <label className="text-[10px] uppercase font-bold text-slate-400 block pb-1 border-b border-slate-100">
              {language === "ja" ? "分析対象の戦略プロセスを選択" : "Choose Core Strategy Process"}
            </label>
            <div className="flex flex-wrap gap-2">
              {processes.map((p) => (
                <button
                  id={`driver-proc-tab-${p.id}`}
                  key={p.id}
                  onClick={() => {
                    setActiveProcessId(p.id);
                    // Ensure active is valid
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeProcessId === p.id
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100/70 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Value Driver List Selection Cards */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 block px-1">
              {language === "ja" ? "ビッグデータ・バリュードライバー" : "Big Data Value Drivers (Milestones)"}
            </span>

            {driversList.map((drv) => {
              const active = activeDriverNum === drv.num;
              // Check if already has AI data populated
              const comboState = activeProcessId ? getComboState(activeProcessId, drv.num) : null;
              const hasAIData = comboState && !!comboState.additionalInsights;

              return (
                <button
                  id={`driver-item-card-${drv.num}`}
                  key={drv.num}
                  type="button"
                  onClick={() => setActiveDriverNum(drv.num)}
                  className={`w-full p-4 rounded-2xl border text-left transition relative overflow-hidden flex items-start gap-3 cursor-pointer ${
                    active
                      ? "border-indigo-600 bg-white ring-2 ring-indigo-500/10 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    <span className="text-xs font-black font-mono">D{drv.num}</span>
                  </div>

                  <div className="space-y-1 pr-6">
                    <h4 className={`text-xs font-bold ${active ? "text-indigo-950" : "text-slate-800"}`}>
                      {drv.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      {drv.desc}
                    </p>
                  </div>

                  {hasAIData && (
                    <div className="absolute top-2 right-2 flex items-center gap-1" title="AI Analyst consulting complete">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Form workspace & AI insights expansion */}
        <div className="lg:col-span-7">
          {activeProcess && currentCombo && (
            <div id="driver-workspace-panel" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
              
              {/* Workspace Header */}
              <div className="pb-4 border-b border-slate-100 flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {activeProcess.name} &gt; Driver {activeDriverNum}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    {driversList.find((d) => d.num === activeDriverNum)?.title}
                  </h3>
                </div>
                
                <div className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-center shrink-0 border border-indigo-100">
                  <div className="text-[10px] uppercase font-bold leading-none">{t.oppScore}</div>
                  <strong className="text-sm font-black mt-0.5 block font-mono">
                    {currentCombo.opportunityScore || "?"}/10
                  </strong>
                </div>
              </div>

              {/* Slider for Current effectiveness capability limit */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-700">
                  <span className="font-semibold flex items-center gap-1">
                    <Gauge className="w-4 h-4 text-indigo-500" />
                    {language === "ja" ? "現在の自社ケイパビリティ（浸透度）" : "Baseline Capability Score (Adoption)"}
                  </span>
                  <strong className="font-mono text-indigo-600 font-extrabold text-sm">{currentCombo.score}/10</strong>
                </div>
                <input
                  id="driver-score-slider"
                  type="range"
                  min="1"
                  max="10"
                  value={currentCombo.score}
                  onChange={(e) => updateComboScore(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Textarea for strategic opportunities identification */}
              <div className="space-y-2 text-xs">
                <label className="font-semibold text-slate-700 block">
                  {t.userPrompt}
                </label>
                <textarea
                  id="driver-user-text"
                  rows={4}
                  value={currentCombo.userInput}
                  onChange={(e) => updateComboText(e.target.value)}
                  placeholder={language === "ja" 
                    ? "このバリュードライバーを活用する上でのチームの仮説や、直面している実データボトルネック等を入力してください..."
                    : "Write details or thoughts about what data streams your company owns and why this value driver improves performance..."}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition leading-relaxed"
                />
              </div>

              <button
                id="driver-enrich-ai-btn"
                disabled={isCurrentlyEnhancing || !currentCombo.userInput.trim()}
                onClick={() => onEnhanceDriver(activeProcessId, activeDriverNum, currentCombo.userInput)}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  isCurrentlyEnhancing || !currentCombo.userInput.trim()
                    ? "bg-indigo-50 text-indigo-400 cursor-not-allowed border border-indigo-100"
                    : "bg-indigo-600 hover:bg-indigo-750 text-white shadow-md shadow-indigo-600/10 active:scale-[0.99]"
                }`}
              >
                {isCurrentlyEnhancing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t.loadingAI}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>{t.analyzeBtn}</span>
                  </>
                )}
              </button>

              {/* Render AI Advisor enhancements panel */}
              {currentCombo.additionalInsights && (
                <div id="driver-ai-insights-panel" className="border-t border-slate-100 pt-6 space-y-5 animate-fade-in mt-4">
                  
                  {/* Expansion Card (Insights) */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 text-xs">
                    <h4 className="font-extrabold text-slate-800 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      {t.additionalInsights}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {currentCombo.additionalInsights}
                    </p>
                    
                    {currentCombo.industryExample && (
                      <div className="border-t border-slate-200/60 pt-3 mt-2">
                        <strong className="text-slate-700 block mb-1">
                          {language === "ja" ? "先進リーダー事例" : "Benchmark Leader Example"}
                        </strong>
                        <p className="text-slate-500 leading-relaxed italic">
                          {currentCombo.industryExample}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Risks & KPIs layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Security Bottlenecks and risks */}
                    <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 space-y-2">
                      <h5 className="font-bold text-rose-850 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                        {t.risksTitle}
                      </h5>
                      <ul className="space-y-1 list-disc list-inside text-[11px] text-rose-700">
                        {currentCombo.keyRisks?.map((risk, index) => (
                          <li key={index} className="leading-snug">{risk}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Performance metrics suggested */}
                    <div className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-4 space-y-2">
                      <h5 className="font-bold text-indigo-950 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                        {t.suggestedKPIs}
                      </h5>
                      <ul className="space-y-1 list-disc list-inside text-[11px] text-indigo-850">
                        {currentCombo.suggestedKPIs?.map((kpi, index) => (
                          <li key={index} className="leading-snug">{kpi}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
