import React, { useState } from "react";
import { CollaborativeNote, Language } from "../types";
import { Users, Plus, Heart, Award, CheckCircle, Flame, Milestone } from "lucide-react";

interface CollaborationWidgetProps {
  t: any;
  notes: CollaborativeNote[];
  setNotes: React.Dispatch<React.SetStateAction<CollaborativeNote[]>>;
  step: number;
  unlockedBadgeIds: string[];
  language: Language;
}

export default function CollaborationWidget({
  t,
  notes,
  setNotes,
  step,
  unlockedBadgeIds,
  language,
}: CollaborationWidgetProps) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newNote: CollaborativeNote = {
      id: "note_" + Date.now() + "_" + Math.floor(Math.random() * 100),
      author: author.trim() || (language === "ja" ? "匿名アナリスト" : "Anonymous Consultant"),
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      votes: 0,
    };

    setNotes((prev) => [newNote, ...prev]);
    // reset form
    setText("");
  };

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, votes: n.votes + 1 } : n))
    );
  };

  const badgesList = [
    {
      id: "discovery",
      titleEn: "Ecosystem Cartographer",
      titleJa: "エコシステム製図家",
      descriptionEn: "Successfully completed target company background and mapped environmental players.",
      descriptionJa: "ステップ1を完了し、提携先・顧客層データを視覚的にマッピングしました。",
      stepTrigger: 1,
      icon: "🌐"
    },
    {
      id: "processes",
      titleEn: "Process Architect",
      titleJa: "バーストプロセス建築士",
      descriptionEn: "Identified key competitive business processes and arranged coordinates on the prioritization matrix.",
      descriptionJa: "主要プロセスを2つ以上設計のうえ、優先順位マトリクスを論理構築しました。",
      stepTrigger: 2,
      icon: "📐"
    },
    {
      id: "drivers",
      titleEn: "Value Stream Pioneer",
      titleJa: "価値創造の開拓パイオニア",
      descriptionEn: "Evaluated process limits against the 4 fundamental Big Data Value Drivers and enriched elements.",
      descriptionJa: "４大バリュードライバーを用いて、トランザクションや非構造データを分析しました。",
      stepTrigger: 3,
      icon: "⚡"
    },
    {
      id: "simulator",
      titleEn: "Simulation Engineer",
      titleJa: "DXシミュレーション設計士",
      descriptionEn: "Tested simulated organizational variables under critical GIGO constraints and saved margin yields.",
      descriptionJa: "GIGOリスク検証スライダーを活用し、期待ROIをシミュレートしました。",
      stepTrigger: 6,
      icon: "🔮"
    }
  ];

  return (
    <div id="collaboration-workspace-widget" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-slate-100 mt-10">
      
      {/* Sticky Board Panel block */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-secondary/20">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              {t.collabWorkspace}
            </h3>
            <span className="text-[10px] bg-slate-100 tracking-wider font-bold text-slate-500 px-2.5 py-1 rounded-full uppercase">
              {t.boardTitle}
            </span>
          </div>

          <form onSubmit={handleAddNote} className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
            <div className="md:col-span-3">
              <input
                id="comment-author-field"
                type="text"
                placeholder={t.commentAuthor}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-7">
              <input
                id="comment-text-field"
                type="text"
                required
                placeholder={t.commentText}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            <div className="md:col-span-2">
              <button
                id="sumbit-comment-btn"
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1 cursor-pointer h-full"
              >
                <Plus className="w-4 h-4" />
                {t.addComment}
              </button>
            </div>
          </form>

          {/* Render sticky notes canvas */}
          <div id="sticky-notes-canvas" className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
            {notes.map((n) => (
              <div key={n.id} className="p-4 rounded-xl shadow-2xs border border-amber-200 bg-amber-50/50 hover:bg-amber-50 rounded-br-[24px] space-y-2 relative transition">
                <div className="flex justify-between items-start text-[10px] text-slate-400 font-mono">
                  <span>Author: <strong>{n.author}</strong></span>
                  <span>{n.timestamp}</span>
                </div>
                
                <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                  {n.text}
                </p>

                <div className="flex justify-between items-center pt-2 border-t border-amber-250/50 mt-1">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                    Activity tracking
                  </span>

                  <button
                    id={`note-upvote-${n.id}`}
                    onClick={(e) => handleUpvote(n.id, e)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-amber-800 bg-white/80 hover:bg-white px-2 py-1 rounded-md transition cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 scale-90" />
                    <span>{t.upvotes}: {n.votes}</span>
                  </button>
                </div>
              </div>
            ))}

            {notes.length === 0 && (
              <div className="col-span-2 text-center text-[10px] text-slate-400 italic py-10">
                {language === "ja" ? "付箋ボードは現在空です。皆さんのコメントや質問を書き込んで共有しましょう！" : "No notes annotated yet on the collaborative whiteboard."}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Badges and Gamification tracker Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest pb-3 border-b border-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            {t.achievementsLabel}
          </h3>

          <div id="badges-array" className="space-y-4">
            {badgesList.map((badge) => {
              // unlocked if step >= badge.stepTrigger
              const unlocked = step >= badge.stepTrigger;
              return (
                <div
                  id={`badge-row-${badge.id}`}
                  key={badge.id}
                  className={`flex items-center gap-4 p-3 rounded-xl border transition ${
                    unlocked
                      ? "bg-emerald-50/40 border-emerald-100"
                      : "bg-slate-50/50 border-slate-100 opacity-55"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    unlocked ? "bg-emerald-100 shadow-sm" : "bg-slate-150 text-slate-400"
                  }`}>
                    <span>{unlocked ? badge.icon : "🔒"}</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5">
                      <h4 className={`font-bold ${unlocked ? "text-emerald-950" : "text-slate-500"}`}>
                        {language === "ja" ? badge.titleJa : badge.titleEn}
                      </h4>
                      {unlocked && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      {language === "ja" ? badge.descriptionJa : badge.descriptionEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
