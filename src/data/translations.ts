import { Language } from "../types";

export const translations = {
  en: {
    appName: "Big Data Maturity Navigator™",
    appSubtitle: "Transform Business Processes Through Data-Driven Innovation",
    tagline: "Collaborative Analytics Consulting Workshop for MBA & Executive Teams",
    
    // Core Navigation & Controls
    welcome: "Welcome",
    discovery: "Company Discovery",
    processes: "Business Processes",
    drivers: "Value Drivers",
    maturityIndex: "Maturity Index Framework",
    maturityWorkshop: "Maturity Analysis Workshop",
    simulator: "Transformation Simulator",
    swotAnalysis: "SWOT Profile",
    recommendationsTab: "Recommendations",
    presentation: "Presentation Builder",
    reportExport: "Strategic Report & Export",

    // General Actions
    nextStep: "Next Step",
    prevStep: "Previous Step",
    saveState: "Auto Saved",
    loadingAI: "Consulting AI Advisor...",
    regenerate: "Refine with AI Advisor",
    languageLabel: "Language",
    audienceLabel: "Program Mode",
    mbaMode: "MBA Class Mode",
    embaMode: "Executive MBA Mode",
    mbaModeDesc: "Focus on structured educational explanations, tutor feedback, and best practice metrics.",
    embaModeDesc: "Focus on executive strategy, transformation roadmaps, and high-impact board insights.",

    // Welcome Screen
    teamProfile: "Consulting Team Configuration",
    teamName: "Team Name",
    teamMembers: "Team Members",
    courseName: "Course Name",
    instructorName: "Professor / Instructor",
    companySetup: "Target Company Profile",
    coName: "Company Name",
    coIndustry: "Primary Industry Segment",
    coWebsite: "Corporate Website URL",
    startWorkshop: "Initiate Strategic Workshop",
    welcomeDesc: "Welcome to a state-of-the-art interactive workspace designed around the Big Data Business Model Maturity Index. Collaborate with your cohort to map and test custom corporate data capabilities and build boardroom deliverables.",

    // Step 1: Discovery
    discoveryTitle: "Step 1 – Company & Ecosystem Discovery",
    discoveryIntro: "Establish a foundational digital fingerprint for your target firm. Our AI Analyst scans standard industry dynamics to build a market ecosystem map.",
    companyOverview: "Company Overview",
    industryOverview: "Industry Value Chain Dynamics",
    competitorOverview: "Competitive Data Landscapes",
    transformationTrends: "Digital Transformation Shifts",
    differentiators: "Potential Data-Driven Differentiators",
    ecosystemMap: "Ecosystem Interactive Blueprint",
    runDiscovery: "Analyze Company Assets",

    // Step 2: Key Processes
    processTitle: "Step 2 – Define Business Processes",
    processIntro: "Identify 2-3 high-leverage business processes that govern your firm's competitive differentiation. Map them visually on our Prioritization Matrix.",
    brainstormBtn: "Recommend Best-Practice Corporate Processes",
    manualAdd: "Manually Formulate Customs Process",
    processNamePlace: "e.g. Supply Chain Optimization",
    processDescPlace: "Describe how this process creates enterprise value...",
    bestPracPlace: "e.g. Amazon JIT Logistics Routing",
    savedProcList: "Strategic Processes Selected",
    differentiationLabel: "Competitive Differentiation Potential (1-10)",
    impactLabel: "Overall Business Performance Impact (1-10)",
    bestPracBrief: "Global Best-Practice Reference",
    matrixTitle: "Interactive Process Prioritization Matrix",
    matrixYAxis: "Competitive Differentiation",
    matrixXAxis: "Business Impact",
    dragPrompt: "Review process priorities. Adjust coordinates below to balance tactical and strategic values.",

    // Step 3: Big Data Value Drivers
    driverTitle: "Step 3 – Big Data Value Drivers Matrix",
    driverIntro: "Evaluate each process against the 4 fundamental Big Data Value Drivers to unlock dormant capability multipliers.",
    driver1: "Driver 1: Transactional & Operational Logs Integration",
    driver1Desc: "Unlocking structural legacy records (sales volume, inventory, support ticket counts).",
    driver2: "Driver 2: Unstructured Internal & External Feeds",
    driver2Desc: "Capturing customer reviews, supplier emails, social telemetry, or weather indicators.",
    driver3: "Driver 3: Real-Time Analytics & Streaming Updates",
    driver3Desc: "Transitioning decisions from retrospective weekly batches to up-to-the-second actions.",
    driver4: "Driver 4: Predictive Analytics & ML Simulation",
    driver4Desc: "Shifting from questioning 'what happened' to simulating 'what will occur' with prescriptive recommendations.",
    userAnalysisTitle: "Team Driver Analysis Workspace",
    userPrompt: "Outline the impact, data opportunities, and primary operational roadblocks:",
    analyzeBtn: "Enrich with AI Strategy Advisor",
    additionalInsights: "AI Advisory Expansion",
    risksTitle: "Critical Security & latency Risks",
    suggestedKPIs: "Model Performance KPIs",
    oppScore: "Ecosystem Opportunity Index",

    // Step 4: Maturity Framework
    maturityModelTitle: "Step 4 – Big Data Business Model Maturity Index",
    maturityModelIntro: "The Index helps companies shift from running standard report card queries to establishing proactive business metamorphosis.",
    stage1Name: "1. Business Monitoring",
    stage1Desc: "Retrospective tracking of operational history and standard reporting matrices.",
    stage2Name: "2. Business Insights",
    stage2Desc: "Advanced diagnostics exploring correlation matrices and causal patterns.",
    stage3Name: "3. Business Optimization",
    stage3Desc: "Embedding continuous ML decision algorithms directly within frontline workflows.",
    stage4Name: "4. Data Monetization",
    stage4Desc: "Converting analytics logs and telemetry into repackaged subscription data products.",
    stage5Name: "5. Business Metamorphosis",
    stage5Desc: "Synthesizing full platform ecosystems, altering core corporate business models.",

    // Step 5: Maturity Workshop
    workshopTitle: "Step 5 – Maturity Lifecycle Workshop",
    workshopIntro: "Draft how target processes evolve across the 5 maturity phases. Evaluate Customer experience, custom Product configurations, and Operational workflows.",
    selectProcess: "Select Active Process:",
    selectStage: "Evaluate Phase Milestone:",
    custImpactLabel: "Customer Experience Transformation",
    prodImpactLabel: "Product & Solution Innovation",
    operImpactLabel: "Operational Workflow Redesign",
    triggerCoachingBtn: "Consult AI Transformation Advisor",
    coachingResponse: "AI Strategic Transformation Brief",
    currentStateLabel: "Baseline (Current State Constraints)",
    futureStateLabel: "Target Target Success Blueprint",
    requiredCap: "Key Operational Capabilities Required",
    techReq: "Recommended Architecture Stack",
    dataReq: "Required Data Streams & Latency",
    talentReq: "Required Talent Pool & Core Skills",
    cultureReq: "Required Digital Cultural Mindsets",

    // Step 6: Simulator
    simulatorTitle: "Step 6 – Executive Capability & Readiness Simulator",
    simulatorIntro: "Calibrate foundational organizational variables to calculate readiness indices, transition complexity, and estimated ROI potential.",
    dqLabel: "Data Infrastructure Quality",
    amLabel: "Analytics Maturity Index",
    aiLabel: "AI & ML Adoption Rate",
    lsLabel: "Boardroom & Leadership Support",
    dcLabel: "Digital & Risk-Taking Culture",
    icLabel: "Agile Innovation Capability",
    readinessScore: "Organizational Readiness Score",
    difficultyScore: "Roadmap Transition Difficulty",
    roiPotential: "Transformation ROI Estimate",
    riskScore: "Ecosystem Risk Coefficient",
    scoreMaturity: "Simulated Maturity Score",

    // Step 7/8/9: Output Strategy
    strategyTitle: "Step 7/8/9 – Boardroom Strategic Deliverables",
    strategyIntro: "Review the automatically synthesized strategic presentation blueprint, SWOT matrix, and roadmap priorities drafted by the AI Advisor.",
    generateReport: "Synthesize Executive Strategy Suite",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    opportunities: "Opportunities",
    threats: "Threats",
    recsTitle: "Strategic Recommendations Roadmap",
    slidesTitle: "Executive Slide Presentation Deck Outline",
    qaLabel: "Panel / Faculty Q&A Defensive Preparation",
    speakerNotes: "Speaker Rationale & Notes",
    assignment: "Speaker Role Assignment",

    // Collaboration
    collabWorkspace: "Shared Team Workspace & Brainstorm notes",
    commentAuthor: "Contributer Name",
    commentText: "Brainstorm Note / Friction Point / Question",
    addComment: "Post to Board",
    boardTitle: "Agile Collaborative Sticky Board",
    upvotes: "Upvotes",
    votingLabel: "Participation Metrics",
    notesLoading: "Notes stored securely in workspace",

    // Gamification
    progressLabel: "Program Completion Status",
    achievementsLabel: "Cohort Milestone Badges",
    cheerLead1: "Outstanding Start! Let's build.",
    cheerLead2: "Ecosystem discovery finalized!",
    cheerLead3: "Process Priority limits checked!",
    cheerLead4: "Valuable Drivers completed!",
    cheerLead5: "Roadmap details mapped!",
    cheerLead6: "Simulator tested under strain!",
    cheerLead7: "Strategy deliverable successfully published!",

    // Japan enhancements
    japanEnhancement: "Japan-Specific Strategic Case References",
    japanIntro: "Examine how legendary Japanese corporations engineered major business model shifts using analytics and advanced robotics:",
    selectBrand: "Select Case Study Profile:",

    // Cross cultural
    crossCulturalTitle: "Cross-Cultural Strategic Comparison Analytics",
    crossCulturalIntro: "Explore how executive parameters shift between Western and Japanese leadership environments:",
    usPerspective: "US Perspective & Methodology",
    jpPerspective: "Japanese Perspective & Methodology",

    // Export txt
    exportBtn: "Export Technical TXT File",
    exportMd: "Export Markdown Report",
    printBtn: "Print Premium PDF",
    exportSuccess: "Strategic documentation downloaded successfully!"
  },
  ja: {
    appName: "Big Data Maturity Navigator™",
    appSubtitle: "データドリブンイノベーションによるビジネスプロセスの変革",
    tagline: "MBA・エグゼクティブチーム向けビッグデータ成熟度インデックス・学習ワークショップ",

    // Core Navigation & Controls
    welcome: "初期設定",
    discovery: "企業データの発見",
    processes: "主要プロセスの定義",
    drivers: "バリュードライバー分析",
    maturityIndex: "成熟度インデックス",
    maturityWorkshop: "プロセス成熟度分析",
    simulator: "DX実行シミュレーター",
    swotAnalysis: "SWOT分析",
    recommendationsTab: "推奨改革戦略",
    presentation: "プレゼン構成",
    reportExport: "最終レポート出力",

    // General Actions
    nextStep: "次のステップへ",
    prevStep: "前のステップへ",
    saveState: "自動保存済み",
    loadingAI: "AI顧問へ相談中...",
    regenerate: "AI分析をリファインする",
    languageLabel: "言語",
    audienceLabel: "プログラムモード",
    mbaMode: "MBAクラスモード",
    embaMode: "エグゼクティブMBAモード",
    mbaModeDesc: "基礎的なデータ体系解説、模範指標、丁寧な学習フィードバックを提供します。",
    embaModeDesc: "役員会向けの即応戦略、DX投資ロードマップ、高付加価値な経営提言に焦点を当てます。",

    // Welcome Screen
    teamProfile: "コンサルティングチーム情報",
    teamName: "チーム名",
    teamMembers: "チームメンバー",
    courseName: "講義・プログラム名",
    instructorName: "担当教授・講師名",
    companySetup: "対象分析企業の基本情報",
    coName: "企業名",
    coIndustry: "産業セグメント",
    coWebsite: "企業ウェブサイトURL",
    startWorkshop: "戦略ワークショップを開始",
    welcomeDesc: "本アプリケーションは「Big Data Business Model Maturity Index（ビッグデータビジネスモデル成熟度指標）」に沿って、企業データの真の価値を見極める実践ワークショップです。チームでブレインストーミングを行いながら、役員クラスの変革文書を作成しましょう。",

    // Step 1: Discovery
    discoveryTitle: "ステップ 1 – 企業とエコシステムの発見",
    discoveryIntro: "対象企業のデジタルフィンガープリントを構築します。AIアナリストによる業界動向の診断と、顧客や提携先を含むデータ連動型のマップが展開されます。",
    companyOverview: "企業概要",
    industryOverview: "産業バリューチェーン動向",
    competitorOverview: "競合デジタル分析",
    transformationTrends: "デジタル変革トレンド",
    differentiators: "想定されるデータ優位性",
    ecosystemMap: "エコシステム・インタラクティブマップ",
    runDiscovery: "企業資産をAI分析する",

    // Step 2: Key Processes
    processTitle: "ステップ 2 – 主要プロセスの定義",
    processIntro: "競争優位性を左右する主要なビジネスプロセスを2〜3個指定します。優先順位マトリクス上に視覚的にポジショニングしてください。",
    brainstormBtn: "ベストプラクティス業務プロセスを推薦",
    manualAdd: "手動で追加プロセスを入力",
    processNamePlace: "例: サプライチェーン最適化",
    processDescPlace: "このプロセスがどのように企業価値を創出するか説明してください...",
    bestPracPlace: "例: アマゾンにおけるリアルタイム在庫JIT制御",
    savedProcList: "選択された主要プロセス一覧",
    differentiationLabel: "競争差別化のポテンシャル (1-10)",
    impactLabel: "全社業績のインパクト (1-10)",
    bestPracBrief: "グローバル・ベストプラクティス事例",
    matrixTitle: "優先決定対話型マトリクス",
    matrixYAxis: "競争力差別化",
    matrixXAxis: "業績インパクト",
    dragPrompt: "プロセスごとの優先度を確認のうえ、以下の数値でグリッド上の配置を微調整してください。",

    // Step 3: Big Data Value Drivers
    driverTitle: "ステップ 3 – ビッグデータ・バリュードライバー検討",
    driverIntro: "定義したプロセス各々に対し、４つのバリュードライバーからアプローチして効率性を最大化する手法を深掘りします。",
    driver1: "ドライバー 1: トランザクション＆オペレーション情報の統合",
    driver1Desc: "売上・在庫、サポートチケット件数など。既存の構造化データを有効統合します。",
    driver2: "ドライバー 2: 組織内外の非構造化データの結合",
    driver2Desc: "顧客SNSの投稿、サプライヤーとの電子メール、地域の天候テレメトリ、物流トラッキングデータの収集。",
    driver3: "ドライバー 3: リアルタイム分析とストリーミング対応",
    driver3Desc: "週次集計から脱却し、秒単位で変化する変動需要や障害傾向を即座に感知し判断・介入します。",
    driver4: "ドライバー 4: 予測分析と機械学習（ML）シミュレーション",
    driver4Desc: "過去発生内容の報告ではなく、MLを用いて「次に何が発生するか」や「最適プラン推奨」を動的にシミュレートします。",
    userAnalysisTitle: "チーム分析ワークスペース",
    userPrompt: "このプロセスに対し、どのようなメリット、データ発掘、阻害要因がありますか：",
    analyzeBtn: "AI顧問のアドバイスを受ける",
    additionalInsights: "AIアドバイザリー解説",
    risksTitle: "考慮すべきセキュリティ・データボトルネック",
    suggestedKPIs: "推奨する実行性能評価指標 (KPI)",
    oppScore: "エコシステム機会評価値",

    // Step 4: Maturity Framework
    maturityModelTitle: "ステップ 4 – ビッグデータビジネスモデル成熟度インデックス",
    maturityModelIntro: "単なるレトロスペクティブ（事後報告）から、プロアクティブな「ビジネス変容」へと企業がデータ活用を高度化する５つのマイルストーンです。",
    stage1Name: "1. ビジネス・モニタリング (Monitoring)",
    stage1Desc: "過去に蓄積された業務の数値やデータを指標化し、レトロに把握する段階。",
    stage2Name: "2. ビジネス・インサイト (Insights)",
    stage2Desc: "多様なデータを統合し、相関分析や因果分析から問題の根源要因を突き止める段階。",
    stage3Name: "3. ビジネス・オプティマイゼーション (Optimization)",
    stage3Desc: "フロントラインに予測モデルや機械学習アルゴリズムを導入し、業務実行をリアルタイム最適化する段階。",
    stage4Name: "4. データ・マネタイゼーション (Monetization)",
    stage4Desc: "分析したログやデータを製品化・情報サービス化し、社外に販売して新しい利益源を創る段階。",
    stage5Name: "5. ビジネス・メタモルフォーシス (Metamorphosis)",
    stage5Desc: "外部競合やパートナーを巻き込んだデータプラットフォーマーに変革し、企業のビジネスモデル自体を再定義する究極の段階。",

    // Step 5: Maturity Workshop
    workshopTitle: "ステップ 5 – 成熟レベル到達予測ワークショップ",
    workshopIntro: "選択プロセスが5つの成熟度を上るにつれて、顧客、製品、業務がどのように変化するか評価します。AI顧問がインフラや人材要件を伴う提言を生成します。",
    selectProcess: "現在分析中のプロセス:",
    selectStage: "目標とする成熟段階:",
    custImpactLabel: "顧客体験の進化 (Customer Impact)",
    prodImpactLabel: "提供システム・製品の進化 (Product Impact)",
    operImpactLabel: "全社オペレーションプロセスの洗練 (Operational Impact)",
    triggerCoachingBtn: "AIデジタル変革顧問に諮問する",
    coachingResponse: "AI変革ロードマップ諮問書",
    currentStateLabel: "現状ベースライン（ボトルネックと課題）",
    futureStateLabel: "到達目標成功ビジョン",
    requiredCap: "必要不可欠なコア業務推進能力",
    techReq: "推奨されるデータアーキテクチャ・スタック",
    dataReq: "必要なデータストリーム及び遅延レベル",
    talentReq: "必要となる人材獲得と専門スキル",
    cultureReq: "組織に求められるデジタル精神・文化変革",

    // Step 6: Simulator
    simulatorTitle: "ステップ 6 – DX readiness（組織準備性）シミュレーター",
    simulatorIntro: "組織の「データ品質」や「変革への覚悟」をスライド操作することで、DX実現可能性、投資対効果（ROI）、リスク値を即座に算出します。",
    dqLabel: "データインフラの品質",
    amLabel: "分析レベル成熟度",
    aiLabel: "AI/機械学習モデル導入率",
    lsLabel: "リーダーシップ＆経営陣の熱意",
    dcLabel: "失敗を恐れないデジタル文化",
    icLabel: "アジャイル・イノベーション能力",
    readinessScore: "組織的DX準備指数",
    difficultyScore: "移行期における摩擦・難易度",
    roiPotential: "想定イニシアティブROI",
    riskScore: "プロジェクト実行リスク係数",
    scoreMaturity: "シミュレーション総合成熟値",

    // Step 7/8/9: Output Strategy
    strategyTitle: "ステップ 7/8/9 – 最終役員会提出戦略レポート",
    strategyIntro: "インデックスの適応結果、診断されたSWOT、AI顧問が提案する具体的な推奨事項、およびプレゼンテーションを反映します。",
    generateReport: "包括的役員会報告書を自動精査",
    strengths: "強み (Strengths)",
    weaknesses: "弱み (Weaknesses)",
    opportunities: "機会 (Opportunities)",
    threats: "脅威 (Threats)",
    recsTitle: "短期・中期・長期のアナリティクス戦略ロードマップ",
    slidesTitle: "5分間エグゼクティブ・スライドプレゼン構成案",
    qaLabel: "審査会・教授陣からのQ&A防御対策",
    speakerNotes: "発表用原稿と論拠",
    assignment: "チーム発表担当パート",

    // Collaboration
    collabWorkspace: "チーム共同ブレインストーミング用ボード",
    commentAuthor: "投稿者名",
    commentText: "アイデア / 質問点 / 課題の共有...",
    addComment: "ボードに投稿",
    boardTitle: "アジャイル・コラボレーション付箋ボード",
    upvotes: "いいね！",
    votingLabel: "参加者コラボレーション度評価",
    notesLoading: "システムは同一空間上で同期中",

    // Gamification
    progressLabel: "ワークショップ完了進捗",
    achievementsLabel: "獲得した講義内勲章 (Badges)",
    cheerLead1: "コンサルティングの第一歩を踏みだしました！",
    cheerLead2: "企業全体のデジタル概要チェック完了！",
    cheerLead3: "優先すべきボトルネックが浮き彫りになりました！",
    cheerLead4: "バリュードライバーデータの探索が完了しました！",
    cheerLead5: "主要プロセスの未来要件を詳細化に成功！",
    cheerLead6: "過酷な条件下でのDXシミュレーション成功！",
    cheerLead7: "講義課題としても十分耐えうる役員会戦略書が完成しました！",

    // Japan enhancements
    japanEnhancement: "日本企業DX戦略・変革成功ケーススタディ",
    japanIntro: "日本を代表する伝統企業や成長企業の高度なデータ活用事例から、リーダーシップとイノベーションを学びましょう：",
    selectBrand: "スタディ対象企業を選択:",

    // Cross cultural
    crossCulturalTitle: "日米データ経営文化・ガバナンスの違い",
    crossCulturalIntro: "意思決定構造や失敗に対する許容度など、米国シリコンバレー的アプローチと日本のアプローチの強みを比較して学びます：",
    usPerspective: "米国型意思決定と迅速プロトタイプ",
    jpPerspective: "日本型職人精神と現場データ連携（カイゼン）",

    // Export Action
    exportBtn: "TXTドキュメントをエクスポート",
    exportMd: "Markdownレポートを出力",
    printBtn: "印刷用プレミアムPDFレイアウト",
    exportSuccess: "コンサル文書の保存に成功しました！"
  }
};

// Legendary Japanese Brands Analysis Cases
export const japanCases = {
  en: [
    {
      brand: "Toyota Motor Corporation (トヨタ自動車)",
      focus: "Just-In-Time Telemetry & Kanban Evolution",
      description: "How Toyota integrated connected IoT car telemetry with tier-1 component suppliers to establish predictive parts delivery weeks preceding production assembly.",
      lessons: "Seamless hardware-to-software scheduling and extreme elimination of warehouse inventory buffer costs."
    },
    {
      brand: "Fast Retailing / UNIQLO (ファーストリテイリング)",
      focus: "Hyper-Reactive Omni-Channel Demand Forecasting",
      description: "UNIQLO aggregates RFID tag telemetry globally with regional weather patterns to automate assembly adjustments, cutting unsold stock-outs by over 30%.",
      lessons: "Shifting from standard sales observation to high-frequency predictive demand analytics."
    },
    {
      brand: "Seven & i Holdings (セブン＆アイ・ホールディングス)",
      focus: "Empowered Frontline Micro-Market Customizations",
      description: "Stores leverage high-density Point-of-Sale logs paired with municipal schedules (sports, festivals) to empower store staff to customize fresh inventory order schedules hourly.",
      lessons: "Democratizing analytics tools directly to frontline associates rather than siloed dashboards."
    },
    {
      brand: "Sony Group (ソニー)",
      focus: "Sensor Telemetry & Subscription Metamorphosis",
      description: "How Sony transformed from a hardware manufacturer to an active digital content ecosystem by packing console interaction telemetry directly into loyalty services.",
      lessons: "Executing full Business Metamorphosis by transitioning hardware margins into subscription lifetime value models."
    }
  ],
  ja: [
    {
      brand: "トヨタ自動車 (Toyota)",
      focus: "コネクテッドIoT車載技術とJITカンバンの融合",
      description: "世界中を走る実車のテレメトリ（走行履歴情報）をリアルタイムに回収。部品供給企業とデータベースを密結合させ、組立工程の数時間前に必要な部品が配送完了する超最適供給を構築しました。",
      lessons: "物理インフラと機械学習による予測デリバリー、および在庫キャリー費用の極限的なゼロ化。"
    },
    {
      brand: "ファーストリテイリング / ユニクロ (UNIQLO)",
      focus: "超高速型グローバル需要予測とRFIDデータ連携",
      description: "全商品に搭載したRFIDタグ情報を活用し、店舗での手にとって戻した数を含めた棚動向を24時間把握。外部の気温・気象ビッグデータと組合せて、縫製工場の製造スピードを動的に調整しています。",
      lessons: "週次報告に頼るアパレル特有の不良在庫リスクの予測制御と、迅速な市場反応性の確立。"
    },
    {
      brand: "セブン-イレブン (Seven & i)",
      focus: "徹底的な現場民主主義とPOS分析に基づく独自データ発注",
      description: "店舗スタッフが近隣の天気や周辺イベント情報（学校の体育祭や地域イベント）を手動でPOSに入力。売上推移データと掛け合わせ、発注業務を学生アルバイトであっても精確に行える仕組みを導入しました。",
      lessons: "中央の役員だけが分析を見るのではなく、フロントラインの従業員に対話的に権限を委譲する重要性。"
    },
    {
      brand: "ソニー (Sony)",
      focus: "半導体イメージセンサーデータから定額サブスクリプション体験等への昇華",
      description: "ハードウェアの物販企業から、PlayStationプラットフォームなどのゲーム・音楽エンターテイメントエコシステムに変容。世界中の機器プレイデータをリアルタイム分析して満足度を推し量っています。",
      lessons: "ビジネスモデル成熟度の最終段階である「ビジネス・メタモルフォーシス（ビジネスの完全変態）」の成功モデル。"
    }
  ]
};

// Cross Cultural strategic insights for EMBA teams
export const crossCulturalData = {
  en: {
    governance: {
      us: "Highly centralized, strict data permissions. Security is prioritized via automated role governance guidelines under legal constraints.",
      jp: "Trust building within cross-functional circles. Information shares organically internally, though formal permissions have traditional procedural checks."
    },
    analyticsMode: {
      us: "Algorithmic automated decisions. Deploying systems that bypass manual intervention, preferring rapid scale and system authority.",
      jp: "Human-in-the-loop (Gemba). Synthesizing analytics as a co-pilot, where final decision loops leverage the wisdom of experienced frontline teams."
    },
    innovationCulture: {
      us: "Fail fast, break things. Embracing speculative product releases and high risk tolerances, adjusting designs iteratively based on user friction.",
      jp: "Nemawashi (Consensus and Alignment) & Kaizen. Heavy initial stress-testing to avoid release errors, followed by decades of continuous meticulous improvements."
    }
  },
  ja: {
    governance: {
      us: "高度に中央集権化されたツール監視、自動アクセスコントロール。法務主導の明確かつ厳格なルールによる統治が優先される。",
      jp: "部署をまたいだ「信頼関係」を重視。非公式な共有は早いが、公式なアクセス権限の設定にはハンコ文化などの手続きが残る傾向。"
    },
    analyticsMode: {
      us: "アルゴリズムによる自動意思決定。人間の判断をあえてバイパスし、機械主導で価格や流通量を決定してスケールスピードを追及する。",
      jp: "現場（Genba）と共創する「人間中心」データ分析。最終意思決定には長年の名工や店長の直感を取り込み、データを推薦ツールとして用いる。"
    },
    innovationCulture: {
      us: "フェイル・ファスト（迅速な失敗創出）。未完成であってもリリースして市場のフィードバックを取り入れ、ピボットを繰り返す。",
      jp: "「根回し（合意形成）」と徹底された「カイゼン」。失敗による顧客の失望を完璧に防ぐ徹底した初期検証と、長期にわたる細やかな改善の反復。"
    }
  }
};
