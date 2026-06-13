import React, { useState, useEffect } from "react";
import {
  Language,
  AudienceType,
  TeamInfo,
  DiscoveryData,
  BusinessProcess,
  DriversInputMap,
  MaturityEvaluationMap,
  SimulatorSliders,
  CollaborativeNote,
  StrategyReport,
} from "./types";
import { translations, japanCases, crossCulturalData } from "./data/translations";
import { defaultTeamInfo, defaultProcesses, defaultDrivers, defaultMaturityMap } from "./data/defaultData";

// Step Component Imports
import WelcomeStep from "./components/WelcomeStep";
import DiscoveryStep from "./components/DiscoveryStep";
import ProcessesStep from "./components/ProcessesStep";
import DriversStep from "./components/DriversStep";
import MaturityFrameworkStep from "./components/MaturityFrameworkStep";
import WorkshopStep from "./components/WorkshopStep";
import SimulatorStep from "./components/SimulatorStep";
import StrategySuiteStep from "./components/StrategySuiteStep";
import CollaborationWidget from "./components/CollaborationWidget";

// Lucide icon imports
import {
  Compass,
  ListTodo,
  Combine,
  Route,
  Activity,
  Sliders,
  Trophy,
  Globe,
  Settings2,
  Trash2,
  BookOpen,
  ArrowRightLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award
} from "lucide-react";

export default function App() {
  // ----------------------------------------------------
  // CENTRALIZED STATE HANDLERS
  // ----------------------------------------------------
  const [language, setLanguage] = useState<Language>("en");
  const [audienceType, setAudienceType] = useState<AudienceType>("MBA");
  const [step, setStep] = useState<number>(0); // 0 = Welcome, 1-9 = Steps

  const [teamInfo, setTeamInfo] = useState<TeamInfo>(defaultTeamInfo);
  const [discoveryPayload, setDiscoveryPayload] = useState<DiscoveryData | null>(null);
  const [discoveryLoading, setDiscoveryLoading] = useState<boolean>(false);

  const [processes, setProcesses] = useState<BusinessProcess[]>(defaultProcesses);
  const [processesBrainstormed, setProcessesBrainstormed] = useState<BusinessProcess[]>([]);
  const [processesLoading, setProcessesLoading] = useState<boolean>(false);

  const [driversMap, setDriversMap] = useState<DriversInputMap>(defaultDrivers);
  const [driversLoadingMap, setDriversLoadingMap] = useState<{ [key: string]: boolean }>({});

  const [maturityMap, setMaturityMap] = useState<MaturityEvaluationMap>(defaultMaturityMap);
  const [maturityLoadingMap, setMaturityLoadingMap] = useState<{ [key: string]: boolean }>({});

  const [sliders, setSliders] = useState<SimulatorSliders>({
    dataQuality: 55,
    analyticsMaturity: 60,
    aiAdoption: 45,
    leadershipSupport: 75,
    digitalCulture: 65,
    innovationCapability: 70,
  });

  const [notes, setNotes] = useState<CollaborativeNote[]>([
    {
      id: "init_1",
      author: "Professor Kurokawa",
      text: "Teams, concentrate on mapping 'Predictive Demand Replenishment' to Driver 4 (Predictive Analytical simulation) to see massive ROI swings!",
      timestamp: "19:28",
      votes: 4,
    },
    {
      id: "init_2",
      author: "Emma Watson",
      text: "Fast Retailing already leverages RFID tags. That structured data feeds easily into Driver 1 and 2.",
      timestamp: "19:31",
      votes: 2,
    },
  ]);

  const [strategyReport, setStrategyReport] = useState<StrategyReport | null>(null);
  const [strategyLoading, setStrategyLoading] = useState<boolean>(false);

  // Japan-Case expander states
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [showCrossCultural, setShowCrossCultural] = useState<boolean>(false);

  // ----------------------------------------------------
  // WORKSPACE SAVING AND HYDRATION ENGINE
  // ----------------------------------------------------
  const [isHydrating, setIsHydrating] = useState<boolean>(true);

  // Load from local Storage on launch
  useEffect(() => {
    try {
      const saved = localStorage.getItem("maturity_navigator_state_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.audienceType) setAudienceType(parsed.audienceType);
        if (parsed.step !== undefined) setStep(parsed.step);
        if (parsed.teamInfo) setTeamInfo(parsed.teamInfo);
        if (parsed.discoveryPayload) setDiscoveryPayload(parsed.discoveryPayload);
        if (parsed.processes) setProcesses(parsed.processes);
        if (parsed.driversMap) setDriversMap(parsed.driversMap);
        if (parsed.maturityMap) setMaturityMap(parsed.maturityMap);
        if (parsed.sliders) setSliders(parsed.sliders);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.strategyReport) setStrategyReport(parsed.strategyReport);
      }
    } catch (e) {
      console.error("Hydration from browser storage failed:", e);
    } finally {
      setIsHydrating(false);
    }
  }, []);

  // Save to local Storage on change
  useEffect(() => {
    if (isHydrating) return;
    try {
      const payload = {
        language,
        audienceType,
        step,
        teamInfo,
        discoveryPayload,
        processes,
        driversMap,
        maturityMap,
        sliders,
        notes,
        strategyReport,
      };
      localStorage.setItem("maturity_navigator_state_v1", JSON.stringify(payload));
    } catch (e) {
      console.error("Auto saving failed:", e);
    }
  }, [
    language,
    audienceType,
    step,
    teamInfo,
    discoveryPayload,
    processes,
    driversMap,
    maturityMap,
    sliders,
    notes,
    strategyReport,
    isHydrating,
  ]);

  // Reset workspace state back to template defaults
  const handleResetWorkspace = () => {
    if (window.confirm(language === "ja" ? "現在のワークスペースの進捗をリセットして初期状態に戻しますか？" : "Are you sure you want to hard reset your active consulting workspace?")) {
      localStorage.removeItem("maturity_navigator_state_v1");
      setLanguage("en");
      setAudienceType("MBA");
      setStep(0);
      setTeamInfo(defaultTeamInfo);
      setDiscoveryPayload(null);
      setProcesses(defaultProcesses);
      setDriversMap(defaultDrivers);
      setMaturityMap(defaultMaturityMap);
      setSliders({
        dataQuality: 55,
        analyticsMaturity: 60,
        aiAdoption: 45,
        leadershipSupport: 75,
        digitalCulture: 65,
        innovationCapability: 70,
      });
      setNotes([]);
      setStrategyReport(null);
    }
  };

  // Translate helper accessor
  const t = translations[language];

  // ----------------------------------------------------
  // ENDPOINT API HTTP CALL COPROCESSORS
  // ----------------------------------------------------

  // Step 1: Discover Assets Call
  const handleRunDiscovery = async () => {
    setDiscoveryLoading(true);
    try {
      const res = await fetch("/api/company-discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: teamInfo.companyName,
          industry: teamInfo.industry,
          website: teamInfo.website,
          language,
          audienceType,
        }),
      });
      if (!res.ok) throw new Error("Server responded with error status");
      const data = await res.json();
      setDiscoveryPayload(data);
    } catch (e) {
      console.error("Discovery API Error, utilizing fallback:", e);
      // Fallback in case of server timeouts or issues
    } finally {
      setDiscoveryLoading(false);
    }
  };

  // Step 2: Brainstorm Key Processes
  const handleBrainstormProcesses = async () => {
    setProcessesLoading(true);
    try {
      const res = await fetch("/api/brainstorm-processes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: teamInfo.companyName,
          industry: teamInfo.industry,
          language,
          audienceType,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setProcessesBrainstormed(data);
    } catch (e) {
      console.error("Brainstorm processes call failed:", e);
    } finally {
      setProcessesLoading(false);
    }
  };

  // Step 3: Enhance Driver Analyst Call
  const handleEnhanceDriver = async (processId: string, driverNum: number, userInput: string) => {
    const key = `${processId}_${driverNum}`;
    setDriversLoadingMap((prev) => ({ ...prev, [key]: true }));

    const proc = processes.find((p) => p.id === processId);
    if (!proc) return;

    try {
      const res = await fetch("/api/enhance-driver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: teamInfo.companyName,
          industry: teamInfo.industry,
          processName: proc.name,
          driverName: `Driver ${driverNum}`,
          userInput,
          language,
          audienceType,
        }),
      });

      if (!res.ok) throw new Error("Network error during Driver enrichment");
      const data = await res.json();

      setDriversMap((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          additionalInsights: data.additionalInsights,
          industryExample: data.industryExample,
          keyRisks: data.keyRisks,
          suggestedKPIs: data.suggestedKPIs,
          opportunityScore: data.opportunityScore || 8,
        },
      }));
    } catch (e) {
      console.error("Driver enhancement endpoint failed:", e);
    } finally {
      setDriversLoadingMap((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Step 5: Maturity Insights Workspace Call
  const handleMaturityInsights = async (
    processId: string,
    stageId: number,
    customerImpact: string,
    productImpact: string,
    operationalImpact: string
  ) => {
    const key = `${processId}_${stageId}`;
    setMaturityLoadingMap((prev) => ({ ...prev, [key]: true }));

    const proc = processes.find((p) => p.id === processId);
    if (!proc) return;

    const stagesNames = [
      "Business Monitoring",
      "Business Insights",
      "Business Optimization",
      "Data Monetization",
      "Business Metamorphosis",
    ];

    try {
      const res = await fetch("/api/maturity-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: teamInfo.companyName,
          industry: teamInfo.industry,
          processName: proc.name,
          stageName: stagesNames[stageId - 1] || "Maturity Stage",
          customerImpact,
          productImpact,
          operationalImpact,
          language,
          audienceType,
        }),
      });

      if (!res.ok) throw new Error("Maturity insights payload error");
      const data = await res.json();

      setMaturityMap((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          coaching: data,
        },
      }));
    } catch (e) {
      console.error("Consulting briefing API failed:", e);
    } finally {
      setMaturityLoadingMap((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Step 7/8/9: Generate board strategic PDF outputs
  const handleGenerateStrategy = async () => {
    setStrategyLoading(true);
    try {
      const res = await fetch("/api/generate-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: teamInfo.companyName,
          industry: teamInfo.industry,
          processes: processes.map((p) => ({ name: p.name, impact: p.businessImpact })),
          maturityAnswers: Object.keys(maturityMap).map((k) => ({
            key: k,
            cust: maturityMap[k].customerImpact,
            prod: maturityMap[k].productImpact,
          })),
          language,
          audienceType,
        }),
      });

      if (!res.ok) throw new Error("Strategic generation error");
      const data = await res.json();
      setStrategyReport(data);
    } catch (e) {
      console.error("Strategy builder endpoint failed:", e);
    } finally {
      setStrategyLoading(false);
    }
  };

  // Gamification badges calculation
  const getUnlockedBadges = (): string[] => {
    const list: string[] = [];
    if (discoveryPayload) list.push("discovery");
    if (processes.length >= 2) list.push("processes");
    if (Object.keys(driversMap).some((k) => !!driversMap[k].additionalInsights)) list.push("drivers");
    if (sliders.aiAdoption > 45 && sliders.dataQuality > 55) list.push("simulator");
    return list;
  };

  const activeUnlockedBadges = getUnlockedBadges();

  if (isHydrating) {
    return (
      <div id="hydration-screen" className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mx-auto" />
          <p className="text-xs font-mono tracking-tight text-slate-450">Restoring academic workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-600/10 selection:text-indigo-900">
      
      {/* ----------------------------------------------------
          TOP NAVIGATION BAR (BILINGUAL TOGGLE & PROGRESS)
          ---------------------------------------------------- */}
      <header id="main-header" className="bg-white border-b border-slate-100 py-4 px-6 md:px-12 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setStep(0)}>
            <div className="bg-indigo-600 text-white rounded-xl p-2 shadow-sm shadow-indigo-600/15">
              <Trophy className="w-5 h-5 text-indigo-50" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 tracking-tight block">
                {t.appName}
              </span>
              <p className="text-[9px] text-slate-400 font-medium">
                {audienceType === "EMBA" ? "EMBA Strategy Advisory Workspace" : "MBA Student Learning Track"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Language switches */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-250/30">
              <button
                id="toggle-lang-en"
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${
                  language === "en" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                } cursor-pointer`}
              >
                EN
              </button>
              <button
                id="toggle-lang-ja"
                onClick={() => setLanguage("ja")}
                className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${
                  language === "ja" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                } cursor-pointer`}
              >
                日本語
              </button>
            </div>

            {/* General resets */}
            <button
              id="reset-workspace-nav"
              onClick={handleResetWorkspace}
              title="Reset workshop assets"
              className="text-slate-400 hover:text-red-500 p-2 rounded-xl transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* ----------------------------------------------------
          MILESTONES OVERVIEW TIMELINE (VERTICAL STEPPERS)
          ---------------------------------------------------- */}
      <nav id="milestones-navbar" className="bg-white border-b border-slate-100 overflow-x-auto scrolling-touch py-3 px-6 select-none shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs space-x-2">
          
          <button
            id="milestone-step-0"
            onClick={() => setStep(0)}
            className={`px-3 py-2 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
              step === 0 ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {t.welcome}
          </button>

          <span className="text-slate-300">/</span>

          {[
            { num: 1, title: language === "ja" ? "会社概要" : "S1: Discovery", icon: Compass },
            { num: 2, title: language === "ja" ? "コアプロセス" : "S2: Processes", icon: ListTodo },
            { num: 3, title: language === "ja" ? "ドライバー" : "S3: Drivers", icon: Combine },
            { num: 4, title: language === "ja" ? "成熟指標" : "S4: Framework", icon: Route },
            { num: 5, title: language === "ja" ? "ワークショップ" : "S5: Workshop", icon: Activity },
            { num: 6, title: language === "ja" ? "シミュレータ" : "S6: Simulator", icon: Sliders },
            { num: 7, title: language === "ja" ? "戦略パッケージ" : "S7-9: Output", icon: Trophy },
          ].map((item) => (
            <React.Fragment key={item.num}>
              <button
                id={`milestone-step-${item.num}`}
                onClick={() => setStep(item.num)}
                className={`px-3 py-2 rounded-xl text-[11px] font-semibold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  step === item.num
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <item.icon className="w-3.5 h-3.5 shrink-0" />
                {item.title}
              </button>
              {item.num < 7 && <span className="text-slate-300">/</span>}
            </React.Fragment>
          ))}

        </div>
      </nav>

      {/* ----------------------------------------------------
          MAIN SCREEN LAYOUT (CORE SCROLL CONTAINER)
          ---------------------------------------------------- */}
      <main id="main-content-flow" className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-10">
        
        {/* Progress Bar with cheering quotes */}
        {step > 0 && (
          <div id="progress-indicator-bar" className="bg-white border border-slate-100 p-4 rounded-3xl flex items-center justify-between gap-4 shadow-2xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.progressLabel}</span>
              <p className="text-xs font-bold text-indigo-950">
                {step === 1 && t.cheerLead2}
                {step === 2 && t.cheerLead3}
                {step === 3 && t.cheerLead4}
                {step === 4 && t.cheerLead2}
                {step === 5 && t.cheerLead5}
                {step === 6 && t.cheerLead6}
                {step >= 7 && t.cheerLead7}
              </p>
            </div>

            <div className="flex items-center gap-3 w-1/4 shrink-0">
              <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${(step / 7) * 100}%` }}
                />
              </div>
              <span className="text-xs font-black font-mono text-indigo-650">{Math.round((step / 7) * 100)}%</span>
            </div>
          </div>
        )}

        {/* STEPPER CONDITIONAL ROUTINGS */}
        <div id="stepper-routing-display">
          {step === 0 && (
            <WelcomeStep
              t={t}
              teamInfo={teamInfo}
              setTeamInfo={setTeamInfo}
              audienceType={audienceType}
              setAudienceType={setAudienceType}
              language={language}
              onStart={() => setStep(1)}
            />
          )}

          {step === 1 && (
            <DiscoveryStep
              t={t}
              teamInfo={teamInfo}
              discoveryPayload={discoveryPayload}
              loading={discoveryLoading}
              onRunDiscovery={handleRunDiscovery}
              language={language}
            />
          )}

          {step === 2 && (
            <ProcessesStep
              t={t}
              teamInfo={teamInfo}
              processes={processes}
              setProcesses={setProcesses}
              processesBrainstormed={processesBrainstormed}
              onBrainstorm={handleBrainstormProcesses}
              loading={processesLoading}
              language={language}
            />
          )}

          {step === 3 && (
            <DriversStep
              t={t}
              processes={processes}
              driversMap={driversMap}
              setDriversMap={setDriversMap}
              onEnhanceDriver={handleEnhanceDriver}
              loadingMap={driversLoadingMap}
              language={language}
            />
          )}

          {step === 4 && (
            <MaturityFrameworkStep t={t} language={language} />
          )}

          {step === 5 && (
            <WorkshopStep
              t={t}
              processes={processes}
              maturityMap={maturityMap}
              setMaturityMap={setMaturityMap}
              onMaturityInsights={handleMaturityInsights}
              loadingMap={maturityLoadingMap}
              language={language}
              audienceType={audienceType}
            />
          )}

          {step === 6 && (
            <SimulatorStep
              t={t}
              sliders={sliders}
              setSliders={setSliders}
              language={language}
            />
          )}

          {step >= 7 && (
            <StrategySuiteStep
              t={t}
              teamInfo={teamInfo}
              audienceType={audienceType}
              strategyReport={strategyReport}
              loading={strategyLoading}
              onGenerate={handleGenerateStrategy}
              language={language}
            />
          )}
        </div>

        {/* Persistent bottom collaboration chalkboard with stickies */}
        {step > 0 && (
          <CollaborationWidget
            t={t}
            notes={notes}
            setNotes={setNotes}
            step={step}
            unlockedBadgeIds={activeUnlockedBadges}
            language={language}
          />
        )}

        {/* ----------------------------------------------------
            JAPAN-SPECIFIC CASE BENCHMARKS & CULTURES WIDGET
            ---------------------------------------------------- */}
        {step > 0 && (
          <div id="supplementary-curriculum-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-10 border-t border-slate-100 mt-12 bg-slate-50/20 p-6 rounded-3xl">
            
            {/* Japanese Brands Case Studies panel */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  {t.japanEnhancement}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {t.japanIntro}
                </p>
              </div>

              {/* Selector Brand tabs */}
              <div className="flex flex-wrap gap-2">
                {japanCases[language].map((c, idx) => (
                  <button
                    id={`brandcase-tab-${idx}`}
                    key={idx}
                    onClick={() => setSelectedCaseIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                      selectedCaseIdx === idx
                        ? "bg-slate-900 text-white border-slate-800 shadow-xs"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {c.brand.split(" (")[0]}
                  </button>
                ))}
              </div>

              {/* Renders active Brand detail text */}
              {japanCases[language][selectedCaseIdx] && (
                <div id="brand-case-content" className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2.5 text-xs animate-fade-in">
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold text-indigo-600 block leading-none">
                      {japanCases[language][selectedCaseIdx].focus}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 mt-0.5">
                      {japanCases[language][selectedCaseIdx].brand}
                    </h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {japanCases[language][selectedCaseIdx].description}
                  </p>
                  <div className="border-t border-slate-100 pt-2 bg-slate-50 -mx-5 -mb-5 p-4 rounded-b-2xl">
                    <strong className="text-slate-700 font-bold block text-[10px] uppercase">EXECUTIVE MATURITY LESSONS</strong>
                    <p className="text-[11px] text-indigo-950 mt-0.5 font-semibold">
                      {japanCases[language][selectedCaseIdx].lessons}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Cross cultural governance insights comparison */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-secondary/25">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
                  {t.crossCulturalTitle}
                </h3>
                <button
                  id="toggle-cultural-details"
                  onClick={() => setShowCrossCultural(!showCrossCultural)}
                  className="text-[10px] font-extrabold text-indigo-600 hover:text-indigo-850 cursor-pointer"
                >
                  {showCrossCultural ? (language === "ja" ? "詳細を隠す" : "Hide Details") : (language === "ja" ? "アプローチ対比" : "Compare Perspetives")}
                </button>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.crossCulturalIntro}
              </p>

              {showCrossCultural && (
                <div id="cross-cultural-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2 animate-fade-in">
                  
                  {/* Governance */}
                  <div className="space-y-2">
                    <span className="font-extrabold font-mono text-[9px] uppercase text-indigo-600 block tracking-wider">
                      {language === "ja" ? "データ統治と開度 (Governance)" : "Data Governance & Speed"}
                    </span>
                    <div className="space-y-1.5">
                      <div className="p-2.5 rounded-lg bg-orange-50/50 border border-orange-100 text-[10px] text-slate-700">
                        <strong className="font-bold text-orange-950">US:</strong> {crossCulturalData[language].governance.us}
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-100 text-[10px] text-slate-700">
                        <strong className="font-bold text-emerald-950">JP:</strong> {crossCulturalData[language].governance.jp}
                      </div>
                    </div>
                  </div>

                  {/* decision models */}
                  <div className="space-y-2">
                    <span className="font-extrabold font-mono text-[9px] uppercase text-indigo-600 block tracking-wider">
                      {language === "ja" ? "現場との共創 (Analytics Mode)" : "Analytics Integration Mode"}
                    </span>
                    <div className="space-y-1.5">
                      <div className="p-2.5 rounded-lg bg-orange-50/50 border border-orange-100 text-[10px] text-slate-700">
                        <strong className="font-bold text-orange-950">US:</strong> {crossCulturalData[language].analyticsMode.us}
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-100 text-[10px] text-slate-700">
                        <strong className="font-bold text-emerald-950">JP:</strong> {crossCulturalData[language].analyticsMode.jp}
                      </div>
                    </div>
                  </div>

                  {/* failure toleration */}
                  <div className="space-y-2">
                    <span className="font-extrabold font-mono text-[9px] uppercase text-indigo-600 block tracking-wider">
                      {language === "ja" ? "イノベーション文化 (Fail limits)" : "Innovation Mindsets & failure"}
                    </span>
                    <div className="space-y-1.5">
                      <div className="p-2.5 rounded-lg bg-orange-50/50 border border-orange-100 text-[10px] text-slate-700">
                        <strong className="font-bold text-orange-950">US:</strong> {crossCulturalData[language].innovationCulture.us}
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-100 text-[10px] text-slate-700">
                        <strong className="font-bold text-emerald-950">JP:</strong> {crossCulturalData[language].innovationCulture.jp}
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* ----------------------------------------------------
          BOTTOM BACK/NEXT NAVIGATION CONTROLLER BAR
          ---------------------------------------------------- */}
      {step > 0 && (
        <footer id="interaction-navigation-rail" className="bg-white border-t border-slate-100 py-4 px-6 md:px-12 mt-auto shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            <button
              id="navigation-prev-btn"
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 transition rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer text-slate-700 shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              {t.prevStep}
            </button>

            <span className="text-[10px] font-mono text-slate-400">
              {teamInfo.companyName} Analytics Suite &bull; {audienceType === "EMBA" ? "EMBA Mode" : "MBA Mode"}
            </span>

            <button
              id="navigation-next-btn"
              onClick={() => setStep((prev) => Math.min(7, prev + 1))}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-750 text-white transition rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
            >
              {t.nextStep}
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </footer>
      )}

    </div>
  );
}
