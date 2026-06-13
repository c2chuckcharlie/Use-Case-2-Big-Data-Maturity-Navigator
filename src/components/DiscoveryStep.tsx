import React from "react";
import { DiscoveryData, TeamInfo, Language } from "../types";
import { Sparkles, ArrowRightLeft, ShieldAlert, Globe, Compass, ArrowRight, UserPlus, Milestone } from "lucide-react";

interface DiscoveryStepProps {
  t: any;
  teamInfo: TeamInfo;
  discoveryPayload: DiscoveryData | null;
  loading: boolean;
  onRunDiscovery: () => void;
  language: Language;
}

export default function DiscoveryStep({
  t,
  teamInfo,
  discoveryPayload,
  loading,
  onRunDiscovery,
  language,
}: DiscoveryStepProps) {

  return (
    <div id="discovery-step-wrapper" className="space-y-8 animate-fade-in">
      {/* Step Header */}
      <div id="discovery-header-banner" className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            {t.discoveryTitle}
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            {t.discoveryIntro}
          </p>
        </div>
        <button
          id="trigger-discovery-btn"
          disabled={loading}
          onClick={onRunDiscovery}
          className={`px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            loading
              ? "bg-indigo-100 text-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-750 text-white shadow-md shadow-indigo-600/10 active:scale-[0.98]"
          }`}
        >
          <Sparkles className={`w-4 h-4 ${loading ? "animate-spin" : "animate-pulse"}`} />
          {loading ? t.loadingAI : t.runDiscovery}
        </button>
      </div>

      {!discoveryPayload && !loading && (
        <div id="discovery-empty-state" className="bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4 my-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">
              {language === "ja" ? "分析カルテが未作成です" : "Awaiting Discovery Scan"}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {language === "ja" 
                ? "右上部の「AI分析する」をクリックすると、マッキンゼー水準の企業診断とエコシステムが自動編成されます。" 
                : "Initiate the discovery analysis with the top action button to instantly generate high-quality strategic profiles."}
            </p>
          </div>
          <button
            id="trigger-discovery-inline"
            onClick={onRunDiscovery}
            className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition cursor-pointer"
          >
            {t.runDiscovery}
          </button>
        </div>
      )}

      {(discoveryPayload || loading) && (
        <div id="discovery-results-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Detailed Content Columns */}
          <div id="discovery-text-insights" className="lg:col-span-7 space-y-6">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-slate-100 rounded-lg w-1/3" />
                <div className="h-24 bg-slate-50 rounded-2xl w-full" />
                <div className="h-6 bg-slate-100 rounded-lg w-1/4" />
                <div className="h-24 bg-slate-50 rounded-2xl w-full" />
                <div className="h-24 bg-slate-50 rounded-2xl w-full" />
              </div>
            ) : (
              <>
                {/* Profile Card Summary */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Globe className="w-4 h-4 text-indigo-500" />
                    <span className="font-bold text-slate-800 uppercase text-xs tracking-wider">
                      {teamInfo.companyName} ({teamInfo.industry})
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-700 mb-1">{t.companyOverview}</h4>
                      <p className="text-slate-500 leading-relaxed">{discoveryPayload?.companyOverview}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700 mb-1">{t.industryOverview}</h4>
                      <p className="text-slate-500 leading-relaxed">{discoveryPayload?.industryOverview}</p>
                    </div>
                  </div>
                </div>

                {/* Grid for Competitors and Digital Trends */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {t.competitorOverview}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{discoveryPayload?.competitorOverview}</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                      {t.transformationTrends}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{discoveryPayload?.digitalTrends}</p>
                  </div>
                </div>

                {/* Potential Differentiators Bullet box */}
                <div className="bg-gradient-to-r from-indigo-50 via-indigo-25 to-white rounded-2xl p-6 border border-indigo-50">
                  <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                    {t.differentiators}
                  </h4>
                  <ul className="space-y-2.5">
                    {discoveryPayload?.potentialDifferentiators.map((diff, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{diff}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Interactive Ecosystem Map Area */}
          <div id="discovery-ecosystem-visualizer" className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
                {t.ecosystemMap}
              </h3>

              {loading ? (
                <div className="h-64 bg-slate-50 rounded-2xl flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
                </div>
              ) : (
                <div id="ecosystem-blueprint-nodes" className="relative p-4 border border-slate-50 rounded-2xl bg-slate-50/50 space-y-6">
                  {/* Central Node (Target Company) */}
                  <div className="bg-slate-900 text-white rounded-2xl p-4 text-center shadow-md border border-slate-700/50 max-w-xs mx-auto relative z-15">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">{t.appName}</span>
                    <h4 className="text-xs font-black truncate">{teamInfo.companyName}</h4>
                  </div>

                  {/* Flow Lines and Ecosystem Actors */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10 pt-2">
                    {discoveryPayload?.ecosystemPlayers?.map((player, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-3 border border-slate-100 shadow-xs flex flex-col space-y-1 my-1 relative">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-indigo-50 text-[8px] font-bold text-indigo-600 px-1.5 py-0.5 rounded-full uppercase shrink-0 border border-indigo-100">
                          {player.name}
                        </div>
                        <h5 className="text-[10px] font-bold text-slate-800 mt-2 text-center">{player.name} Hub</h5>
                        <p className="text-[9px] text-slate-500 leading-normal text-center min-h-[48px] overflow-hidden">
                          {player.role}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 text-center space-y-1">
                    <span className="text-[9px] uppercase font-bold text-indigo-700 block tracking-wider">
                      {language === "ja" ? "データ連携（カイゼン）インサイト" : "Strategic Exchange Protocol"}
                    </span>
                    <p className="text-[9px] text-slate-600">
                      {language === "ja"
                        ? "社外オープンデータ、顧客トラッキングログ、仕入れ連携（JIT）カンバンをデータレイクに繋ぎ込み価値を高めます。"
                        : "Synchronizing upstream transaction pipelines with high-velocity shopper feedback establishes prescriptive resilience."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
