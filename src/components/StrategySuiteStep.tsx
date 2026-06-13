import React, { useState } from "react";
import { StrategyReport, TeamInfo, Language, AudienceType } from "../types";
import { Sparkles, Trophy, Download, Printer, ShieldCheck, Heart, User, CheckCircle, RefreshCw } from "lucide-react";

interface StrategySuiteStepProps {
  t: any;
  teamInfo: TeamInfo;
  audienceType: AudienceType;
  strategyReport: StrategyReport | null;
  loading: boolean;
  onGenerate: () => void;
  language: Language;
}

export default function StrategySuiteStep({
  t,
  teamInfo,
  audienceType,
  strategyReport,
  loading,
  onGenerate,
  language,
}: StrategySuiteStepProps) {
  const [subTab, setSubTab] = useState<"swot" | "recs" | "slides">("swot");

  // Helper to trigger txt export download
  const handleExportTxt = () => {
    if (!strategyReport) return;

    const dataS = `===========================================================
BIG DATA MATURITY NAVIGATOR™ - STRATEGIC REPORT
===========================================================
Date Generated: ${new Date().toLocaleDateString()}
Program Mode: ${audienceType === "EMBA" ? "Executive MBA Study" : "MBA Track"}
Language: ${language.toUpperCase()}

CONSULTING TEAM PROFILE:
------------------------
Team Name: ${teamInfo.teamName}
Team Members: ${teamInfo.teamMembers}
Course Name: ${teamInfo.courseName}
Instructor: ${teamInfo.instructorName}

TARGET TARGET PROFILE:
----------------------
Company Name: ${teamInfo.companyName}
Industry Segment: ${teamInfo.industry}
Website: ${teamInfo.website}

SWOT MATRIX PROFILE Analysis:
-----------------------------
STRENGTHS:
${strategyReport.swot.strengths.map((s, i) => `  ${i + 1}. [S] ${s}`).join("\n")}

WEAKNESSES:
${strategyReport.swot.weaknesses.map((s, i) => `  ${i + 1}. [W] ${s}`).join("\n")}

OPPORTUNITIES:
${strategyReport.swot.opportunities.map((s, i) => `  ${i + 1}. [O] ${s}`).join("\n")}

THREATS:
${strategyReport.swot.threats.map((s, i) => `  ${i + 1}. [T] ${s}`).join("\n")}

STRATEGIC ROADMAP RECOMMENDATIONS:
----------------------------------
${strategyReport.recommendations
  .map(
    (r, i) => `RECOMMENDATION #${i + 1}:
  Title: ${r.title}
  Focus: ${r.type}
  Timeframe: ${r.timeframe}
  Priority: ${r.priority}
  Strategic ROI Estimate: ${r.estimatedROI}
  Description: ${r.description}
`
  )
  .join("\n")}

PRESENTATION FLOW & TALKING POINTS:
-----------------------------------
Title: ${strategyReport.presentation.title}

${strategyReport.presentation.slides
  .map(
    (s) => `SLIDE #${s.slideNum}: ${s.title}
  Speaker Role: ${s.speakerAssignment}
  Key Talking Points to emphasize:
${s.keyPoints.map((item) => `    * ${item}`).join("\n")}
  Presenter Script notes:
    "${s.talkingPoints}"
`
  )
  .join("\n")}

DEFENSIVE Q&A PREPARATION:
--------------------------
${strategyReport.presentation.qaPrep
  .map(
    (q, i) => `DEFENSE #${i + 1}:
  Inquiry: ${q.question}
  Deflection strategy: ${q.answer}
`
  )
  .join("\n")}

===========================================================
END OF STRATEGIC TRANSFORMATION DELIVERABLE
===========================================================`;

    const blob = new Blob([dataS], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Big_Data_Maturity_Navigator_Dossier_${teamInfo.companyName.replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper to download markdown
  const handleExportMd = () => {
    if (!strategyReport) return;

    const md = `# Big Data Maturity Navigator™ — Executive Transformation Strategy

**Date:** ${new Date().toLocaleDateString()}  
**Client Target:** ${teamInfo.companyName} (${teamInfo.industry})  
**Academic Cohort:** ${teamInfo.teamName} | ${teamInfo.courseName} | ${teamInfo.instructorName}  
**Program Track:** ${audienceType} Mode  

---

## 1. Executive SWOT Matrix Analysis

| Strengths (S) | Weaknesses (W) |
| :--- | :--- |
| ${strategyReport.swot.strengths.map((s) => `* ${s}`).join("<br>")} | ${strategyReport.swot.weaknesses.map((s) => `* ${s}`).join("<br>")} |

| Opportunities (O) | Threats (T) |
| :--- | :--- |
| ${strategyReport.swot.opportunities.map((s) => `* ${s}`).join("<br>")} | ${strategyReport.swot.threats.map((s) => `* ${s}`).join("<br>")} |

---

## 2. Strategic Recommendations & Investment Roadmap

${strategyReport.recommendations
  .map(
    (r, i) => `### Recommendation ${i + 1}: ${r.title}
* **Focus Category:** \`${r.type}\`
* **Timeframe:** *${r.timeframe}*
* **Strategic Priority:** **${r.priority}**
* **Estimated Business ROI:** \`${r.estimatedROI}\`

${r.description}

`
  )
  .join("\n")}

---

## 3. Boardroom Presentation Slides ($350/Hr Drafts)

### Deck Title: *${strategyReport.presentation.title}*

${strategyReport.presentation.slides
  .map(
    (s) => `#### Slide ${s.slideNum}: ${s.title}
* **Assigned Speaker:** *${s.speakerAssignment}*
* **Core Bullet Points:**
${s.keyPoints.map((item) => `  * ${item}`).join("\n")}
* **Speaker Script notes:**
  > "${s.talkingPoints}"

`
  )
  .join("\n")}

---

## 4. Academic Panel & Faculty Defensive Q&A

${strategyReport.presentation.qaPrep
  .map(
    (q, i) => `* **Anticipated Inquiry ${i + 1}:** *"${q.question}?"*
  * **Defensive Alignment Response:** _"${q.answer}"_
`
  )
  .join("\n")}

---
*Dossier generated cleanly via Big Data Maturity Navigator AI Engine.*`;

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Big_Data_Maturity_Dossier_${teamInfo.companyName.replace(/\s+/g, "_")}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="strategy-suite-container" className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div id="strategy-header" className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5.5 h-4.5 text-indigo-600" />
            {t.strategyTitle}
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            {t.strategyIntro}
          </p>
        </div>
        <button
          id="trigger-strategy-btn"
          disabled={loading}
          onClick={onGenerate}
          className={`px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            loading
              ? "bg-indigo-100 text-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-750 text-white shadow-md shadow-indigo-600/10 active:scale-[0.98]"
          }`}
        >
          <Sparkles className={`w-4 h-4 ${loading ? "animate-spin" : "animate-pulse"}`} />
          {loading ? t.loadingAI : t.generateReport}
        </button>
      </div>

      {!strategyReport && !loading && (
        <div id="strategy-empty" className="bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4 my-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto">
            <Trophy className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">
              {language === "ja" ? "戦略パッケージが未編成です" : "Awaiting Strategy Compilation"}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {language === "ja"
                ? "右上部の「報告書を自動精査」をクリックいただくと、バリュードライバー診断と成熟度診断データを踏まえたSWOT、戦略提言書、プレゼン原稿が自動生成されます。"
                : "Assemble SWOT charts, tactical action plans, presentation decks, and panel deflection strategies mapped to target criteria."}
            </p>
          </div>
          <button
            id="trigger-strategy-inline"
            onClick={onGenerate}
            className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition cursor-pointer"
          >
            {t.generateReport}
          </button>
        </div>
      )}

      {(strategyReport || loading) && (
        <div id="strategy-suite-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Display screen */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            
            {/* Tab Swappers */}
            <div className="flex border-b border-slate-100 pb-px">
              <button
                id="subtab-swot-btn"
                onClick={() => setSubTab("swot")}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition cursor-pointer ${
                  subTab === "swot"
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                1. {t.swotAnalysis}
              </button>
              <button
                id="subtab-recs-btn"
                onClick={() => setSubTab("recs")}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition cursor-pointer ${
                  subTab === "recs"
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                2. {t.recsTitle}
              </button>
              <button
                id="subtab-slides-btn"
                onClick={() => setSubTab("slides")}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition cursor-pointer ${
                  subTab === "slides"
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                3. {t.slidesTitle}
              </button>
            </div>

            {loading ? (
              <div className="space-y-4 py-6 animate-pulse">
                <div className="h-6 bg-slate-100 rounded-lg w-1/4" />
                <div className="h-32 bg-slate-50 rounded-2xl w-full" />
                <div className="h-32 bg-slate-50 rounded-2xl w-full" />
              </div>
            ) : (
              <div id="strategy-tab-contents" className="pt-2 text-xs">
                
                {/* SUBTAB: SWOT matrix */}
                {subTab === "swot" && strategyReport && (
                  <div id="swot-grid-matrix" className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                    {/* Strengths */}
                    <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl space-y-2">
                      <span className="font-extrabold uppercase text-[10px] tracking-wider text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                        {t.strengths} (S)
                      </span>
                      <ul className="space-y-1.5 text-slate-700 pl-4 list-disc">
                        {strategyReport.swot.strengths.map((item, idx) => <li key={idx} className="leading-relaxed">{item}</li>)}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-2xl space-y-2">
                      <span className="font-extrabold uppercase text-[10px] tracking-wider text-rose-800 bg-rose-100/60 px-2 py-0.5 rounded-md">
                        {t.weaknesses} (W)
                      </span>
                      <ul className="space-y-1.5 text-slate-700 pl-4 list-disc">
                        {strategyReport.swot.weaknesses.map((item, idx) => <li key={idx} className="leading-relaxed">{item}</li>)}
                      </ul>
                    </div>

                    {/* Opportunities */}
                    <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-2xl space-y-2">
                      <span className="font-extrabold uppercase text-[10px] tracking-wider text-indigo-800 bg-indigo-100/60 px-2 py-0.5 rounded-md">
                        {t.opportunities} (O)
                      </span>
                      <ul className="space-y-1.5 text-slate-700 pl-4 list-disc">
                        {strategyReport.swot.opportunities.map((item, idx) => <li key={idx} className="leading-relaxed">{item}</li>)}
                      </ul>
                    </div>

                    {/* Threats */}
                    <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-2xl space-y-2">
                      <span className="font-extrabold uppercase text-[10px] tracking-wider text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-md">
                        {t.threats} (T)
                      </span>
                      <ul className="space-y-1.5 text-slate-700 pl-4 list-disc">
                        {strategyReport.swot.threats.map((item, idx) => <li key={idx} className="leading-relaxed">{item}</li>)}
                      </ul>
                    </div>
                  </div>
                )}

                {/* SUBTAB: Strategic Decisions Roadmap */}
                {subTab === "recs" && strategyReport && (
                  <div id="recommendations-list" className="space-y-4 animate-fade-in">
                    {strategyReport.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-2 max-w-3xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-slate-900 text-white font-mono font-black w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                              {idx + 1}
                            </span>
                            <span className="font-mono text-[9px] uppercase font-bold text-slate-450 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                              {rec.type}
                            </span>
                            <span className="font-mono text-[9px] uppercase font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-sm">
                              {rec.timeframe}
                            </span>
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-900">{rec.title}</h4>
                          <p className="text-slate-600 leading-relaxed font-normal">{rec.description}</p>
                        </div>

                        <div className="shrink-0 bg-white border border-slate-200 p-3 rounded-xl shadow-2xs text-center min-w-[124px]">
                          <span className="text-[8px] uppercase tracking-wider font-extrabold text-indigo-500 block">EXPECTED LIFT ROI</span>
                          <span className="text-xs font-black text-slate-800 font-mono mt-0.5 block leading-tight">
                            {rec.estimatedROI}
                          </span>
                          <span className={`${
                            rec.priority === "High" || rec.priority === "最高" ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
                          } text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase mt-1.5 inline-block`}>
                            {rec.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SUBTAB: Presentation outline builder */}
                {subTab === "slides" && strategyReport && (
                  <div id="presentation-deck-builder" className="space-y-6 animate-fade-in">
                    <h3 className="text-sm font-extrabold text-slate-800">
                      Deck: {strategyReport.presentation.title}
                    </h3>

                    {/* Slide list display deck */}
                    <div className="space-y-4">
                      {strategyReport.presentation.slides.map((sl) => (
                        <div key={sl.slideNum} className="border border-slate-150 rounded-2xl bg-white overflow-hidden shadow-xs">
                          <div className="bg-slate-900 text-white p-3 px-4 flex justify-between items-center text-[11px] font-bold">
                            <span>SLIDE 0{sl.slideNum}: {sl.title}</span>
                            <span className="text-[9px] font-mono select-none px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-indigo-300">
                              {t.assignment}: {sl.speakerAssignment}
                            </span>
                          </div>
                          <div className="p-4 space-y-3">
                            <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] font-bold text-slate-700">
                              {sl.keyPoints.map((pt, index) => <li key={index}>{pt}</li>)}
                            </ul>
                            
                            <div className="bg-indigo-50/40 p-3 rounded-lg border border-indigo-100">
                              <span className="text-[9px] font-bold text-indigo-900 block mb-1 uppercase tracking-wider">
                                {t.speakerNotes}
                              </span>
                              <p className="text-[11px] text-slate-600 italic leading-relaxed">
                                "{sl.talkingPoints}"
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Faculty Deflections Defenses Q&A Board */}
                    <div className="border-t border-slate-150 pt-5 space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                        {t.qaLabel}
                      </h4>

                      <div className="space-y-3">
                        {strategyReport.presentation.qaPrep.map((qa, index) => (
                          <div key={index} className="p-4 rounded-xl border border-rose-100 bg-rose-50/20 text-[11px] space-y-1.5">
                            <strong className="text-rose-900 block">Q: {qa.question}</strong>
                            <p className="text-slate-600 leading-normal">
                              <strong>A:</strong> {qa.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}
          </div>

          {/* Right strategic export column and credits */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 border border-slate-850 shadow-xl space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-3 border-b border-slate-800 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-indigo-400" />
              {t.reportExport}
            </h3>

            <div className="space-y-3">
              <button
                id="export-txt-btn"
                type="button"
                onClick={handleExportTxt}
                className="w-full bg-slate-800 hover:bg-slate-750 active:scale-[0.99] transition text-white text-xs font-bold p-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-400" />
                {t.exportBtn}
              </button>

              <button
                id="export-md-btn"
                type="button"
                onClick={handleExportMd}
                className="w-full bg-slate-850 hover:bg-slate-800 active:scale-[0.99] transition text-white text-xs font-bold p-3.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-400" />
                {t.exportMd}
              </button>

              <button
                id="print-pdf-btn"
                type="button"
                onClick={() => window.print()}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-750 hover:to-indigo-850 active:scale-[0.99] transition text-white text-xs font-bold p-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-indigo-200" />
                {t.printBtn}
              </button>
            </div>

            <div className="bg-slate-850 p-4 rounded-xl space-y-2 text-xs border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Executive Dossier Secure</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                {language === "ja"
                  ? "マッキンゼー・アンド・カンパニー等のデジタルアドバイザリー報告書と同等水準のフレームワークに基づいて生成されています。そのまま講義の提出課題や発表アウトラインとしてお使いいただけます。"
                  : "Draft aligns exactly with HBS and EMBA presentation curriculum rubrics. Use printed output directly for grading submissions or panel defend pitches."}
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
