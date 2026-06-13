import React, { useState } from "react";
import { BusinessProcess, MaturityEvaluationMap, ProcessStageMaturity, Language, AudienceType } from "../types";
import { Activity, Sparkles, User, Gift, Workflow, Milestone, RefreshCw, Key, Shield, HelpCircle } from "lucide-react";

interface WorkshopStepProps {
  t: any;
  processes: BusinessProcess[];
  maturityMap: MaturityEvaluationMap;
  setMaturityMap: React.Dispatch<React.SetStateAction<MaturityEvaluationMap>>;
  onMaturityInsights: (processId: string, stageId: number, customerImpact: string, productImpact: string, operationalImpact: string) => void;
  loadingMap: { [key: string]: boolean };
  language: Language;
  audienceType: AudienceType;
}

export default function WorkshopStep({
  t,
  processes,
  maturityMap,
  setMaturityMap,
  onMaturityInsights,
  loadingMap,
  language,
  audienceType,
}: WorkshopStepProps) {
  const [procId, setProcId] = useState<string>(processes[0]?.id || "");
  const [stageId, setStageId] = useState<number>(3); // Default optimizing

  const activeProcess = processes.find((p) => p.id === procId);

  const getComboState = (pId: string, sId: number): ProcessStageMaturity => {
    const key = `${pId}_${sId}`;
    return maturityMap[key] || { customerImpact: "", productImpact: "", operationalImpact: "" };
  };

  const updateField = (field: "customerImpact" | "productImpact" | "operationalImpact", val: string) => {
    if (!procId) return;
    const key = `${procId}_${stageId}`;
    const oldState = getComboState(procId, stageId);
    setMaturityMap((prev) => ({
      ...prev,
      [key]: {
        ...oldState,
        [field]: val,
      },
    }));
  };

  const currentCombo = procId ? getComboState(procId, stageId) : null;
  const isCurrentlyConsulting = procId ? !!loadingMap[`${procId}_${stageId}`] : false;

  const stageLabels = [
    { num: 1, name: t.stage1Name },
    { num: 2, name: t.stage2Name },
    { num: 3, name: t.stage3Name },
    { num: 4, name: t.stage4Name },
    { num: 5, name: t.stage5Name },
  ];

  if (processes.length === 0) {
    return (
      <div id="workshop-empty-alert" className="bg-amber-50 border border-amber-100 rounded-3xl p-8 text-center max-w-xl mx-auto space-y-4">
        <Activity className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="text-sm font-bold text-amber-800">
          {language === "ja" ? "主要プロセスが確認できません" : "Processes Awaiting Assignment"}
        </h3>
        <p className="text-xs text-amber-600 leading-relaxed">
          {language === "ja"
            ? "成熟度ワークショップに進む前に、ステップ２において企業の主要ビジネスプロセスを追加してください。"
            : "To activate the diagnostic workbook, add core corporate business processes in Step 2 first."}
        </p>
      </div>
    );
  }

  return (
    <div id="workshop-step" className="space-y-8 animate-fade-in">
      {/* Step Header */}
      <div id="workshop-banner" className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-2">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5.5 h-4.5 text-indigo-600" />
          {t.workshopTitle}
        </h2>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
          {t.workshopIntro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left selectors and text inputs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pick Process and Milestone Stage */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-2">{t.selectProcess}</label>
              <div className="flex flex-wrap gap-2">
                {processes.map((p) => (
                  <button
                    id={`workshop-proc-btn-${p.id}`}
                    key={p.id}
                    onClick={() => setProcId(p.id)}
                    className={`px-3 py-2 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                      procId === p.id
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <label className="block font-bold text-slate-700 mb-2">{t.selectStage}</label>
              <div className="space-y-1.5">
                {stageLabels.map((st) => (
                  <button
                    id={`workshop-stage-btn-${st.num}`}
                    key={st.num}
                    onClick={() => setStageId(st.num)}
                    className={`w-full px-3 py-2 rounded-xl text-left font-bold transition flex items-center justify-between cursor-pointer ${
                      stageId === st.num
                        ? "bg-slate-900 text-white border border-slate-800"
                        : "bg-slate-50 hover:bg-slate-100/70 border border-slate-100 text-slate-600"
                    }`}
                  >
                    <span>{st.name}</span>
                    <span className="text-[9px] font-mono opacity-60">STAGE 0{st.num}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form fields: Customer, Product, Operations */}
          {activeProcess && currentCombo && (
            <div id="workshop-inputs-form" className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block pb-1 border-b border-slate-100">
                {language === "ja" ? "３つの影響ベクトル評価" : "The 3 Dimensional Impact Matrix"}
              </span>

              {/* Customer impact input */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-indigo-500" />
                  {t.custImpactLabel}
                </label>
                <textarea
                  id="workshop-cust-text"
                  rows={2}
                  value={currentCombo.customerImpact}
                  onChange={(e) => updateField("customerImpact", e.target.value)}
                  placeholder={language === "ja" ? "顧客の不満やエンゲージメントがどのように変革されるか..." : "Describe how customer experience shifts at this stage..."}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>

              {/* Product impact input */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-indigo-500" />
                  {t.prodImpactLabel}
                </label>
                <textarea
                  id="workshop-prod-text"
                  rows={2}
                  value={currentCombo.productImpact}
                  onChange={(e) => updateField("productImpact", e.target.value)}
                  placeholder={language === "ja" ? "新テクノロジーや独自データ価値を詰めた製品サービスは..." : "Describe product updates or custom configurations..."}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>

              {/* Operations impact */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1">
                  <Workflow className="w-3.5 h-3.5 text-indigo-500" />
                  {t.operImpactLabel}
                </label>
                <textarea
                  id="workshop-oper-text"
                  rows={2}
                  value={currentCombo.operationalImpact}
                  onChange={(e) => updateField("operationalImpact", e.target.value)}
                  placeholder={language === "ja" ? "日次業務プロセスの作業時間やオペレーション摩擦の減少率は..." : "Describe changes to manual inventory or factory routing workflows..."}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>

              <button
                id="workshop-consult-ai-btn"
                disabled={isCurrentlyConsulting || !currentCombo.customerImpact.trim()}
                onClick={() => onMaturityInsights(procId, stageId, currentCombo.customerImpact, currentCombo.productImpact, currentCombo.operationalImpact)}
                className={`w-full py-3 rounded-2xl font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  isCurrentlyConsulting || !currentCombo.customerImpact.trim()
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-750 text-white shadow-md shadow-indigo-600/10 active:scale-[0.99]"
                }`}
              >
                {isCurrentlyConsulting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t.loadingAI}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.triggerCoachingBtn}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right detailed consulting briefing area */}
        <div className="lg:col-span-7">
          {activeProcess && currentCombo && (
            <div id="workshop-consulting-report" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-[10px] uppercase font-mono font-black text-indigo-600 tracking-wide block">
                  {audienceType === "EMBA" ? "EXECUTIVE TRANSFORMATION STRATEGY BRIEF" : "ACADEMIC CONSULTING COACHING LEDGER"}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                  {activeProcess.name} &gt; {stageLabels.find((s) => s.num === stageId)?.name}
                </h3>
              </div>

              {currentCombo.coaching ? (
                <div className="space-y-6 text-xs animate-fade-in">
                  
                  {/* Current vs Future States bento block */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-1.5">
                      <strong className="font-bold text-slate-700 block uppercase text-[10px] tracking-wider">{t.currentStateLabel}</strong>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {currentCombo.coaching.currentState}
                      </p>
                    </div>
                    <div className="bg-gradient-to-tr from-indigo-50/50 to-indigo-100/10 border border-indigo-100 p-4 rounded-xl space-y-1.5">
                      <strong className="font-bold text-indigo-900 block uppercase text-[10px] tracking-wider">{t.futureStateLabel}</strong>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {currentCombo.coaching.futureState}
                      </p>
                    </div>
                  </div>

                  {/* Requirements Accordion detail sheets */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">
                      {language === "ja" ? "変革推進に必要な専門ケイパビリティ" : "Prerequisites & Implementation Scaffolding"}
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Capabilities */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1">
                          <Key className="w-3.5 h-3.5 text-indigo-500" />
                          {t.requiredCap}
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500 pl-1">
                          {currentCombo.coaching.requiredCapabilities.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </div>

                      {/* Tech stack */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-indigo-500" />
                          {t.techReq}
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500 pl-1">
                          {currentCombo.coaching.technologyRequirements.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      {/* Data requirments */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1">
                          <Milestone className="w-3.5 h-3.5 text-indigo-500" />
                          {t.dataReq}
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500 pl-1">
                          {currentCombo.coaching.dataRequirements.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </div>

                      {/* Talent requirments */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-indigo-500" />
                          {t.talentReq}
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500 pl-1">
                          {currentCombo.coaching.talentRequirements.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </div>
                    </div>

                    {/* Culture mindsets */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        {t.cultureReq}
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {currentCombo.coaching.culturalChanges}
                      </p>
                    </div>

                  </div>

                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 p-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <Activity className="w-10 h-10 text-slate-300" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      {language === "ja" ? "変革諮問書が未作成です" : "Diagnostic Awaiting AI Advisor Consult"}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-sm">
                      {language === "ja"
                        ? "左上のフォームに顧客・製品・業務の影響案をご入力のうえ、「AI変革顧問に諮問する」をクリックいただくと、要件一覧が起草されます。"
                        : "Describe the core impacts on the left, then click consult to synthesize required technology layers, cultural changes, and expected ROI benchmarks."}
                    </p>
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
