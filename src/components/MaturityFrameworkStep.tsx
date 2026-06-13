import React, { useState } from "react";
import { Language } from "../types";
import { Route, Play, Milestone, Trophy, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";

interface MaturityFrameworkStepProps {
  t: any;
  language: Language;
}

export default function MaturityFrameworkStep({ t, language }: MaturityFrameworkStepProps) {
  const [activeStage, setActiveStage] = useState<number>(3); // Default highlighting stage 3

  const stages = [
    {
      num: 1,
      name: t.stage1Name,
      desc: t.stage1Desc,
      icon: "📊",
      focus: language === "ja" ? "「何が起こったか」の可視化" : "Querying: 'What happened legacy logs?'",
      example: language === "ja" ? "月間売上レポート、経費集計シート" : "Monthly sales spreadsheets, standard CRM report queries.",
      accent: "from-blue-500 to-cyan-500",
      vibe: "bg-blue-50 border-blue-200 text-blue-800"
    },
    {
      num: 2,
      name: t.stage2Name,
      desc: t.stage2Desc,
      icon: "🧠",
      focus: language === "ja" ? "「なぜ起こったか」相関因果分析" : "Diagnostics: 'Why did it occur?'",
      example: language === "ja" ? "顧客離脱サンプリング、地域別購買相関関係" : "Statistical diagnostic check correlating price drops with conversions.",
      accent: "from-cyan-500 to-emerald-500",
      vibe: "bg-cyan-50 border-cyan-200 text-cyan-800"
    },
    {
      num: 3,
      name: t.stage3Name,
      desc: t.stage3Desc,
      icon: "⚡",
      focus: language === "ja" ? "「今何すべきか」現場のリアルタイム推奨" : "Prescriptives: 'What should we do right now?'",
      example: language === "ja" ? "配送ドライバーの即時ルート推薦、AI自動価格改定" : "Dynamic inventory routing, algorithmic machine learning pricing alerts.",
      accent: "from-indigo-500 to-purple-500",
      vibe: "bg-indigo-50 border-indigo-200 text-indigo-800"
    },
    {
      num: 4,
      name: t.stage4Name,
      desc: t.stage4Desc,
      icon: "💰",
      focus: language === "ja" ? "「分析・データを外販して稼ぐ」収益化" : "Monetizing: 'How can our data make money?'",
      example: language === "ja" ? "匿名化購買トレンドデータの競合や他メーカーへの販売" : "Packaging real-time tracking behavior into high-priced reports.",
      accent: "from-purple-500 to-pink-500",
      vibe: "bg-purple-50 border-purple-200 text-purple-800"
    },
    {
      num: 5,
      name: t.stage5Name,
      desc: t.stage5Desc,
      icon: "🌌",
      focus: language === "ja" ? "「他社を巻き込むプラットフォーマー化」ビジネス変態" : "Metamorphosis: 'Rewriting industry model rules'",
      example: language === "ja" ? "AppStoreやスマートシティ構想、独自の双方向経済空間" : "Evolving from a footwear manufacturer to an active digital longevity network.",
      accent: "from-pink-500 to-rose-500",
      vibe: "bg-pink-50 border-pink-200 text-pink-800"
    },
  ];

  return (
    <div id="framework-step-wrapper" className="space-y-8 animate-fade-in">
      {/* Stepper overview details banner */}
      <div id="framework-header" className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-2 text-center max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
          <Route className="w-5.5 h-5.5 text-indigo-600" />
          {t.maturityModelTitle}
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          {t.maturityModelIntro}
        </p>
      </div>

      {/* Main Roadmap Interactive Step track diagram */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-8">
        
        {/* Horizontal Progress Track on wide screens, vertical on small screens */}
        <div id="stepper-highway" className="flex flex-col md:flex-row justify-between items-stretch gap-4 relative">
          
          {/* Background linking pipeline bar */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 hidden md:block z-5" />

          {stages.map((stg) => {
            const isActive = activeStage === stg.num;
            return (
              <button
                id={`stepper-node-btn-${stg.num}`}
                key={stg.num}
                type="button"
                onClick={() => setActiveStage(stg.num)}
                className={`flex-1 rounded-2xl p-5 border text-left transition relative z-10 flex flex-col justify-between ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-800 shadow-xl scale-102 ring-4 ring-indigo-500/10"
                    : "bg-slate-50/50 hover:bg-slate-50 border-slate-200 text-slate-700"
                } cursor-pointer`}
              >
                {/* Node circle bubble indicator icon */}
                <div className="flex items-center justify-between pb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-tr ${stg.accent} text-white shadow-sm`}>
                    <span>{stg.icon}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-black border px-2 py-0.5 rounded-full ${
                    isActive ? "border-slate-700 bg-slate-800 text-indigo-400" : "border-slate-200 text-slate-500 bg-white"
                  }`}>
                    STAGE 0{stg.num}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold leading-tight">{stg.name}</h3>
                  <p className={`text-[10px] leading-relaxed line-clamp-2 ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                    {stg.desc}
                  </p>
                </div>

                {isActive && (
                  <div className="flex items-center gap-1.5 text-indigo-400 text-[10px] font-bold mt-3 pt-2 border-t border-slate-800">
                    <Play className="w-3 h-3 fill-indigo-400" />
                    <span>Selected Workspace</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Expansion Pane */}
        {activeStage && (
          <div id="stepper-stage-detail-panel" className="bg-slate-50 border border-slate-100 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
            {/* Left brief column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{stages[activeStage - 1].icon}</div>
                <div>
                  <span className="text-[10px] font-mono font-black text-indigo-600 block leading-none">STAGE 0{activeStage} SPECIALIZED</span>
                  <h4 className="text-sm font-extrabold text-slate-800">{stages[activeStage - 1].name}</h4>
                </div>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                {stages[activeStage - 1].desc}
              </p>
            </div>

            {/* Right detailed checklist matrices list */}
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-xs space-y-2">
                <span className="text-[10px] uppercase font-bold text-indigo-600 block tracking-widest">
                  {language === "ja" ? "主要データ活用スコープ" : "Core Analytics Scope"}
                </span>
                <p className="text-slate-700 font-bold leading-normal">
                  {stages[activeStage - 1].focus}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-xs space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block tracking-widest">
                  {language === "ja" ? "実用的な企業運用事例" : "Concrete Operational Benchmark"}
                </span>
                <p className="text-slate-500 leading-normal italic">
                  {stages[activeStage - 1].example}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
