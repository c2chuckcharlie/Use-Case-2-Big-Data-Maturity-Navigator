import React from "react";
import { SimulatorSliders, Language } from "../types";
import { Sliders, Gauge, Zap, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

interface SimulatorStepProps {
  t: any;
  sliders: SimulatorSliders;
  setSliders: React.Dispatch<React.SetStateAction<SimulatorSliders>>;
  language: Language;
}

export default function SimulatorStep({ t, sliders, setSliders, language }: SimulatorStepProps) {
  const handleSliderChange = (field: keyof SimulatorSliders, val: number) => {
    setSliders((prev) => ({ ...prev, [field]: val }));
  };

  // ----------------------------------------------------
  // MATHEMATICAL SIMULATION FORMULAS (GIGO Academic model)
  // ----------------------------------------------------
  const dq = sliders.dataQuality;
  const am = sliders.analyticsMaturity;
  const ai = sliders.aiAdoption;
  const ls = sliders.leadershipSupport;
  const dc = sliders.digitalCulture;
  const ic = sliders.innovationCapability;

  // 1. Readiness Score: heavily driven by culture, leadership, and innovations
  const readiness = Math.round((ls * 0.3 + dc * 0.3 + ic * 0.2 + dq * 0.2));

  // 2. Simulated Maturity Score: limited if Data Quality is garbage (GIGO rule!)
  // If Data Quality is 20, Maturity shouldn't exceed 40 even with high AI Adoption.
  const baseMaturity = (am * 0.4 + ai * 0.4 + dq * 0.2);
  const dataQualityPenalty = dq < 40 ? 0.6 : dq < 60 ? 0.85 : 1.0;
  const finalMaturity = Math.round(baseMaturity * dataQualityPenalty);

  // 3. Transformation Difficulty: High when AI and Analytics is high, but cushioned by Leadership & Culture
  const difficultyRaw = (am * 0.3 + ai * 0.3) * 1.5 - (ls * 0.2 + dc * 0.2);
  const difficulty = Math.max(10, Math.min(100, Math.round(difficultyRaw + 30)));

  // 4. Ecosystem Risk Coefficient: reduced by digital culture, leadership support, and data quality
  const riskRaw = 110 - (ls * 0.3 + dc * 0.3 + dq * 0.2 + ic * 0.2);
  const risk = Math.max(10, Math.min(100, Math.round(riskRaw)));

  // 5. ROI Potential: Massive when Analytics+AI is high, and multiplied by Data Quality. Penalized if readiness is tiny.
  const baseROI = (am * 0.5 + ai * 0.5) * (dq / 100) * 1.2;
  const readinessMultiplier = readiness < 40 ? 0.5 : readiness < 70 ? 0.85 : 1.15;
  const roiPotentialPct = Math.max(5, Math.min(150, Math.round(baseROI * readinessMultiplier)));

  return (
    <div id="simulator-step-wrapper" className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div id="simulator-header" className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-2">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sliders className="w-5.5 h-4.5 text-indigo-600" />
          {t.simulatorTitle}
        </h2>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
          {t.simulatorIntro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Sliders array controls */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-indigo-500" />
            {language === "ja" ? "組織パラメータ調整" : "Calibrate Organizational Parameters"}
          </h3>

          <div className="space-y-4">
            
            {/* 1. Data Quality */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">{t.dqLabel}</span>
                <span className="font-mono text-indigo-600">{dq}%</span>
              </div>
              <input
                id="simulator-slide-dq"
                type="range"
                min="10"
                max="100"
                step="5"
                value={dq}
                onChange={(e) => handleSliderChange("dataQuality", parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* 2. Analytics Maturity */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">{t.amLabel}</span>
                <span className="font-mono text-indigo-600">{am}%</span>
              </div>
              <input
                id="simulator-slide-am"
                type="range"
                min="10"
                max="100"
                step="5"
                value={am}
                onChange={(e) => handleSliderChange("analyticsMaturity", parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* 3. AI Adoption */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">{t.aiLabel}</span>
                <span className="font-mono text-indigo-600">{ai}%</span>
              </div>
              <input
                id="simulator-slide-ai"
                type="range"
                min="10"
                max="100"
                step="5"
                value={ai}
                onChange={(e) => handleSliderChange("aiAdoption", parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* 4. Leadership Support */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">{t.lsLabel}</span>
                <span className="font-mono text-emerald-600">{ls}%</span>
              </div>
              <input
                id="simulator-slide-ls"
                type="range"
                min="10"
                max="100"
                step="5"
                value={ls}
                onChange={(e) => handleSliderChange("leadershipSupport", parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* 5. Digital Culture */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">{t.dcLabel}</span>
                <span className="font-mono text-emerald-600">{dc}%</span>
              </div>
              <input
                id="simulator-slide-dc"
                type="range"
                min="10"
                max="100"
                step="5"
                value={dc}
                onChange={(e) => handleSliderChange("digitalCulture", parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* 6. Innovation Capability */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">{t.icLabel}</span>
                <span className="font-mono text-emerald-600">{ic}%</span>
              </div>
              <input
                id="simulator-slide-ic"
                type="range"
                min="10"
                max="100"
                step="5"
                value={ic}
                onChange={(e) => handleSliderChange("innovationCapability", parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

          </div>

          {/* Educational GIGO notice warning when Data Quality is below 40% */}
          {dq < 40 && (
            <div id="gigo-warning-box" className="bg-red-50 border border-red-100 rounded-xl p-4 text-xs text-red-700 flex items-start gap-2 animate-pulse mt-4">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">{language === "ja" ? "GIGO（ゴミを入れればゴミが出る）リスク発生中" : "GIGO (Garbage In, Garbage Out) Penalty In Effect"}</strong>
                <p className="text-[10px] text-red-650 opacity-90 mt-0.5 leading-relaxed">
                  {language === "ja" 
                    ? "データインフラ品質が低いため、どれだけAIモデルの導入比率（AI Adoption）を上げても成熟度スコアやROI上限に重大なペナルティが課されています。先にデータ品質（Data Quality）を改善してください。"
                    : "Low Data Quality severely restricts your Simulated Maturity & ROI potential, regardless of high AI Adoption rates. Prioritize upgrading your data warehouse pipelines first."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right column: Dynamic Gauge Panel indicators */}
        <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between border border-slate-800">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-3 border-b border-slate-800 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-indigo-400" />
              {language === "ja" ? "シミュレーター演算コプロセッサー" : "Simulated Enterprise Outcomes"}
            </h3>

            {/* Dynamic Results Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              
              {/* Maturity Score */}
              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800">
                <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider block">{t.scoreMaturity}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-indigo-400 font-mono">{finalMaturity}</span>
                  <span className="text-[10px] text-slate-500 font-mono">/100</span>
                </div>
                <div className="w-full bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-400 h-full transition-all duration-350" style={{ width: `${finalMaturity}%` }} />
                </div>
              </div>

              {/* Readiness Score */}
              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800">
                <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider block">{t.readinessScore}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-emerald-400 font-mono">{readiness}</span>
                  <span className="text-[10px] text-slate-500 font-mono">/100</span>
                </div>
                <div className="w-full bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full transition-all duration-350" style={{ width: `${readiness}%` }} />
                </div>
              </div>

              {/* Transformation Difficulty */}
              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800">
                <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider block">{t.difficultyScore}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-amber-500 font-mono">{difficulty}</span>
                  <span className="text-[10px] text-slate-500 font-mono">/100</span>
                </div>
                <div className="w-full bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all duration-350" style={{ width: `${difficulty}%` }} />
                </div>
              </div>

              {/* Ecosystem Risk Coefficients */}
              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800">
                <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider block">{t.riskScore}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-red-400 font-mono">{risk}</span>
                  <span className="text-[10px] text-slate-500 font-mono">/100</span>
                </div>
                <div className="w-full bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-red-400 h-full transition-all duration-350" style={{ width: `${risk}%` }} />
                </div>
              </div>

            </div>
          </div>

          {/* Huge ROI Banner widget */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900 p-5 rounded-2xl flex items-center justify-between gap-4 mt-6">
            <div className="space-y-1">
              <span className="text-[8px] uppercase font-bold text-indigo-400 tracking-widest block">{t.roiPotential}</span>
              <p className="text-[11px] text-slate-300">
                {language === "ja" ? "期待されるデータ利活用・コスト圧縮効果" : "Estimated operational yield coefficient:"}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-3xl font-black text-indigo-300 font-mono block">+{roiPotentialPct}%</span>
              <span className="text-[9px] text-indigo-400 font-mono block uppercase">Yield Lift</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
