import React from "react";
import { TeamInfo, Language, AudienceType } from "../types";
import { DoorOpen, Users, Building, Laptop, Sparkles } from "lucide-react";

interface WelcomeStepProps {
  t: any;
  teamInfo: TeamInfo;
  setTeamInfo: React.Dispatch<React.SetStateAction<TeamInfo>>;
  audienceType: AudienceType;
  setAudienceType: (aud: AudienceType) => void;
  language: Language;
  onStart: () => void;
}

export default function WelcomeStep({
  t,
  teamInfo,
  setTeamInfo,
  audienceType,
  setAudienceType,
  onStart,
}: WelcomeStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div id="welcome-step-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
      {/* Intro Hero banner */}
      <div id="welcome-hero-banner" className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
        <div className="space-y-6 relative z-10">
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center p-2.5 shadow-lg">
            <Sparkles className="w-full h-full text-indigo-100 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-full uppercase border border-indigo-500/30">
              {t.tagline}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-4 text-slate-100">
              {t.appName}
            </h1>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              {t.appSubtitle}
            </p>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/50 pt-5">
            {t.welcomeDesc}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs text-emerald-400 font-mono tracking-tight">
              {t.saveState} (Local Workspace Active)
            </span>
          </div>
        </div>
      </div>

      {/* Main Configuration Card */}
      <div id="welcome-config-card" className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-8 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Executive EMBA vs Academic MBA Mode Switch */}
          <div>
            <label className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
              <Laptop className="w-4 h-4 text-indigo-500" />
              {t.audienceLabel}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                id="audience-mba-btn"
                type="button"
                onClick={() => setAudienceType("MBA")}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden ${
                  audienceType === "MBA"
                    ? "border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/10"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-base font-bold ${audienceType === "MBA" ? "text-indigo-900" : "text-slate-800"}`}>
                    {t.mbaMode}
                  </span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${audienceType === "MBA" ? "border-indigo-600 bg-indigo-600" : "border-slate-300"}`}>
                    {audienceType === "MBA" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {t.mbaModeDesc}
                </p>
              </button>

              <button
                id="audience-emba-btn"
                type="button"
                onClick={() => setAudienceType("EMBA")}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden ${
                  audienceType === "EMBA"
                    ? "border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/10"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-base font-bold ${audienceType === "EMBA" ? "text-indigo-900" : "text-slate-800"}`}>
                    {t.embaMode}
                  </span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${audienceType === "EMBA" ? "border-indigo-600 bg-indigo-600" : "border-slate-300"}`}>
                    {audienceType === "EMBA" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {t.embaModeDesc}
                </p>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Team Info column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                {t.teamProfile}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t.teamName}</label>
                  <input
                    id="teamNameInput"
                    name="teamName"
                    type="text"
                    value={teamInfo.teamName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t.teamMembers}</label>
                  <input
                    id="teamMembersInput"
                    name="teamMembers"
                    type="text"
                    value={teamInfo.teamMembers}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">{t.courseName}</label>
                    <input
                      id="courseNameInput"
                      name="courseName"
                      type="text"
                      value={teamInfo.courseName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">{t.instructorName}</label>
                    <input
                      id="instructorNameInput"
                      name="instructorName"
                      type="text"
                      value={teamInfo.instructorName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Target Company profile column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-500" />
                {t.companySetup}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t.coName}</label>
                  <input
                    id="companyNameInput"
                    name="companyName"
                    type="text"
                    value={teamInfo.companyName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t.coIndustry}</label>
                  <input
                    id="industryInput"
                    name="industry"
                    type="text"
                    value={teamInfo.industry}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t.coWebsite}</label>
                  <input
                    id="websiteInput"
                    name="website"
                    type="text"
                    value={teamInfo.website}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          id="start-workshop-btn"
          onClick={onStart}
          className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 cursor-pointer"
        >
          <DoorOpen className="w-5 h-5" />
          {t.startWorkshop}
        </button>
      </div>
    </div>
  );
}
