import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;
const geminiApiKey = process.env.GEMINI_API_KEY;

// Initialize Gemini SDK with User-Agent header for telemetry
const ai = geminiApiKey
  ? new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Log initialization status (avoid exposing key)
console.log(`[Server] Gemini API Key configured: ${!!geminiApiKey}`);

// System prompts helper to adapt to EN/JP and MBA/EMBA
function getBaseSystemInstruction(language: string, audienceType: string, role: string) {
  const persona = audienceType === "EMBA" 
    ? "an elite Executive MBA Strategy Consultant, Corporate Advisor and Digital Transformation Expert. Provide boardroom-ready, strategic, and high-impact executive insights."
    : "a supportive Business Analytics Professor, Learning Coach, and Tutor. Provide educational explanations, clear structural scaffolding, and industry-best-practice examples for MBA students.";
  
  const langConfig = language === "ja" 
    ? "All responses MUST be written in Japanese (日本語), except for standard technical terminology. If user inputs contain mixed English/Japanese, understand both but write the final insights in elegant Japanese."
    : "All responses MUST be written in English. Maintain high business prose, clear taxonomy, and elegant formatting.";

  return `You are acting as ${persona}.
Role Task: ${role}.
Language Instruction: ${langConfig}
Generate valid, well-structured, clean JSON as requested. Do not include markdown code block characters like \`\`\`json or \`\`\` in your text, just return the raw JSON string.`;
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Step 1: Company Discovery Analysis
app.post("/api/company-discovery", async (req, res) => {
  const { companyName, industry, website, language, audienceType } = req.body;
  if (!companyName) {
    return res.status(400).json({ error: "Company name is required." });
  }

  const role = `Perform a comprehensive company discovery analytics breakdown based on the Big Data Business Model Maturity philosophy. Ensure specific opportunities for data monetization are hinted at.`;
  const systemInstruction = getBaseSystemInstruction(language || "en", audienceType || "MBA", role);

  const prompt = `Perform the analysis for:
Company: ${companyName}
Industry: ${industry || "Technology/Retail/Manufacturing/Services"}
Website: ${website || "Not provided"}

You must return a JSON object with this exact schema:
{
  "companyOverview": "Paragraph summarizing their current business model and market standing.",
  "industryOverview": "Paragraph analyzing their industry's value chains and competitive dynamics.",
  "competitorOverview": "Paragraph detailing 2-3 key competitors and how they leverage data analytics.",
  "digitalTrends": "Paragraph summarizing 3 digital transformation trends affecting this segment.",
  "potentialDifferentiators": [
    "Differentiator 1: dynamic pricing / hyper-personalization etc.",
    "Differentiator 2...",
    "Differentiator 3..."
  ],
  "ecosystemPlayers": [
    { "name": "Suppliers", "role": "Describe data exchange opportunities" },
    { "name": "Customers", "role": "Describe value driver opportunities" },
    { "name": "Partners", "role": "Describe ecosystem data aggregation" }
  ]
}

Only return raw JSON conforming exactly to this structure. No markup, no outer explanations.`;

  if (!ai) {
    // Fallback Mock Template
    return res.json(getMockDiscovery(companyName, industry || "General Hub", language || "en", audienceType || "MBA"));
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text.trim()));
  } catch (error: any) {
    console.error("[discovery-api] Error generated:", error);
    res.status(500).json({ error: error.message, isFallback: true, fallbackData: getMockDiscovery(companyName, industry || "Retail", language || "en", audienceType || "MBA") });
  }
});

// Step 2: Brainstorm Key Business Processes
app.post("/api/brainstorm-processes", async (req, res) => {
  const { companyName, industry, language, audienceType } = req.body;
  if (!companyName) {
    return res.status(400).json({ error: "Company name is required." });
  }

  const role = "Brainstorm 5 high-importance corporate business processes that create key competitive advantages, ranked by digital transformation readiness and business impact.";
  const systemInstruction = getBaseSystemInstruction(language || "en", audienceType || "MBA", role);

  const prompt = `Brainstorm candidates for:
Company: ${companyName}
Industry: ${industry || "General"}

Return an array of 5 processes in this scientific JSON schema:
[
  {
    "name": "Process Name (e.g. Supply Chain Optimization, Predictive Customer Retention)",
    "description": "Short explanation of the process role.",
    "businessImpact": 1-10 numerical score,
    "competitiveDifferentiation": 1-10 numerical score,
    "bestPractice": "Example of how a world-class leader excels here.",
    "suggestedDataSources": ["source 1", "source 2"]
  }
]
Only return raw JSON containing the array.`;

  if (!ai) {
    return res.json(getMockProcesses(companyName, industry || "General", language || "en"));
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        responseMimeType: "application/json"
      }
    });
    res.json(JSON.parse((response.text || "[]").trim()));
  } catch (error: any) {
    console.error("[brainstorm-api] Error generated:", error);
    res.json(getMockProcesses(companyName, industry || "General", language || "en"));
  }
});

// Step 3: Big Data Value Drivers Enhancement
app.post("/api/enhance-driver", async (req, res) => {
  const { companyName, industry, processName, driverName, userInput, language, audienceType } = req.body;
  if (!processName || !driverName) {
    return res.status(400).json({ error: "Process name and Driver name are required." });
  }

  const role = "Analyze how a specific Big Data value driver impacts the designated business process in the current company backdrop.";
  const systemInstruction = getBaseSystemInstruction(language || "en", audienceType || "MBA", role);

  const prompt = `Company: ${companyName} (${industry})
Process: ${processName}
Value Driver: ${driverName}
User's Preliminary Analysis: "${userInput || "Determining transactional efficiency improvements."}"

Analyze this and provide professional digital advice with the following JSON schema:
{
  "additionalInsights": "Paragraph extending the student's thoughts with quantitative framework models.",
  "industryExample": "Best-practice case study of an industry champion mastering this driver.",
  "keyRisks": ["Risk 1: e.g. latency bottleneck", "Risk 2..."],
  "suggestedKPIs": ["KPI 1", "KPI 2"],
  "opportunityScore": 1-10 digit
}`;

  if (!ai) {
    return res.json(getMockDriverEnhancement(processName, driverName, language || "en"));
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    });
    res.json(JSON.parse((response.text || "{}").trim()));
  } catch (error: any) {
    console.error("[driver-enhance-api] Error:", error);
    res.json(getMockDriverEnhancement(processName, driverName, language || "en"));
  }
});

// Step 5: Maturity Phase Analysis Coaching
app.post("/api/maturity-insights", async (req, res) => {
  const { companyName, industry, processName, stageName, customerImpact, productImpact, operationalImpact, language, audienceType } = req.body;
  
  const role = `Perform a state-of-the-art Big Data Maturity workshop evaluation. Plan the detailed requirements for migrating this business process to this maturity stage.`;
  const systemInstruction = getBaseSystemInstruction(language || "en", audienceType || "MBA", role);

  const prompt = `Context:
Company: ${companyName} (${industry})
Business Process: ${processName}
Target Maturity Level: ${stageName}

User's assessment of impacts at this stage:
- Customer Impact: ${customerImpact || "Not specified."}
- Product Impact: ${productImpact || "Not specified."}
- Operational Impact: ${operationalImpact || "Not specified."}

Please build a full consulting evaluation returned in this exact JSON schema:
{
  "currentState": "Analysis of the company's probable baseline before climbing to this level.",
  "futureState": "Vivid description of what success looks like at this stage.",
  "requiredCapabilities": ["Capability A", "Capability B"],
  "technologyRequirements": ["Tech stack recommendation 1", "Tech stack recommendation 2"],
  "dataRequirements": ["Refined/new datasets needed", "Latency expectations"],
  "talentRequirements": ["Skills of teams required", "Required hires"],
  "culturalChanges": "Describe critical mindset adjustments needed in the legacy work teams.",
  "challenges": ["Obstacle 1", "Obstacle 2"],
  "expectedBenefits": ["Benefit 1 (eg 12% margin lift)", "Benefit 2"]
}`;

  if (!ai) {
    return res.json(getMockMaturityInsights(processName, stageName, language || "en", audienceType || "MBA"));
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    });
    res.json(JSON.parse((response.text || "{}").trim()));
  } catch (error: any) {
    console.error("[maturity-insights-api] Error:", error);
    res.json(getMockMaturityInsights(processName, stageName, language || "en", audienceType || "MBA"));
  }
});

// Step 7/8/9 Combined Workspace Strategic Report Engines
app.post("/api/generate-strategy", async (req, res) => {
  const { companyName, industry, processes, drivers, maturityAnswers, language, audienceType } = req.body;

  const role = `Draft a master strategic deliverable containing: SWOT analysis, comprehensive MBA/EMBA recommendations with transition timeline roadmap, and a complete presentation slide outline.`;
  const systemInstruction = getBaseSystemInstruction(language || "en", audienceType || "MBA", role);

  const prompt = `Build strategy assets for:
Company: ${companyName} (${industry})
Key Processes Analyzed: ${JSON.stringify(processes)}
Maturity Stages: ${JSON.stringify(maturityAnswers)}

Provide a fully populated JSON object of this structure:
{
  "swot": {
    "strengths": ["Strength 1...", "Strength 2..."],
    "weaknesses": ["Weakness 1...", "Weakness 2..."],
    "opportunities": ["Opportunity 1...", "Opportunity 2..."],
    "threats": ["Threat 1...", "Threat 2..."]
  },
  "recommendations": [
    {
      "title": "Actionable Strategic Goal",
      "type": "MBA Focus" or "Boardroom Imperative",
      "description": "Clear step explanation.",
      "timeframe": "Short Term (0-6 months) / Mid Term (6-18 months) / Long Term (1.5+ years)",
      "priority": "High/Medium/Low",
      "estimatedROI": "eg 18% cost reduction or 4.2M$ revenue optimization"
    }
  ],
  "presentation": {
    "title": "Boardroom / Academic Presentation Pitch Deck",
    "slides": [
      {
        "slideNum": 1,
        "title": "Slide Title",
        "keyPoints": ["Point 1", "Point 2"],
        "speakerAssignment": "Team Member Role (eg CEO, Chief Data Officer)",
        "talkingPoints": "Vivid speaker notes describing the transition rationale."
      }
    ],
    "qaPrep": [
      { "question": "Difficult board question?", "answer": "Strategic answer." }
    ]
  }
}`;

  if (!ai) {
    return res.json(getMockStrategyReport(companyName, industry, language || "en", audienceType || "MBA"));
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        responseMimeType: "application/json"
      }
    });
    res.json(JSON.parse((response.text || "{}").trim()));
  } catch (error: any) {
    console.error("[generate-strategy] Error:", error);
    res.json(getMockStrategyReport(companyName, industry, language || "en", audienceType || "MBA"));
  }
});

// ----------------------------------------------------
// FALLBACK MOCK DATA GENERATORS (Ensures absolute stability)
// ----------------------------------------------------
function getMockDiscovery(company: string, ind: string, lang: string, aud: string) {
  const isJp = lang === "ja";
  return {
    companyOverview: isJp
      ? `「${company}」は、最新のデータプラットフォームを通じて、自社の主要市場セグメントでデジタルイノベーションを模索しているリーディングカンパニーです。`
      : `"${company}" is a progressive player in the ${ind} segment, actively mapping legacy resources into agile digital competencies to defend market share.`,
    industryOverview: isJp
      ? `現在、${ind}業界は急速なデジタルシフトとサプライチェーンの不安定化に直面しており、データ成熟度の向上が不可欠となっています。`
      : `The ${ind} sector is undergoing systemic disruptions marked by compressed product lifecycles, heightened omnichannel expectations, and margin pressure.`,
    competitorOverview: isJp
      ? `競合他社は高度な予測分析や動的価格設定を導入し、顧客生涯価値（LTV）の大幅な向上を実現しています。`
      : `Top competitors are leveraging analytics to coordinate real-time pricing and deep customer lifecycle optimization.`,
    digitalTrends: isJp
      ? `主なトレンドとして、エッジAIの活用、サプライチェーンのリアルタイム可視化、そしてパーソナライズされた顧客体験の向上が挙げられます。`
      : `Key shifts include continuous demand forecasting, cloud telemetry integration, and personalized interaction frameworks.`,
    potentialDifferentiators: isJp
      ? [
          "リアルタイム在庫追跡によるサプライチェーンコストの20%削減",
          "AI駆動型レコメンデーションによる顧客ロイヤルティの向上",
          "データ駆動型プライシングモデルによる収益最適化"
        ]
      : [
          "Real-time micro-segmentation matching regional demand spikes",
          "Edge analytics tracking machinery/equipment uptime",
          "Predictive churn alerting for executive intervention"
        ],
    ecosystemPlayers: isJp
      ? [
          { "name": "サプライヤー", "role": "需要予測データを共有して在庫不足を防ぐ" },
          { "name": "顧客", "role": "エンゲージメント履歴からパーソナライズされたサービスを提供" },
          { "name": "パートナー", "role": "共同データレイクを構築し、配送効率を15%向上" }
        ]
      : [
          { "name": "Suppliers", "role": "Syncing telemetry queues to stabilize logistics timelines" },
          { "name": "Customers", "role": "Providing contextual self-service diagnostic indicators" },
          { "name": "Allied Networks", "role": "Aggregating regional volume trends for joint scenario testing" }
        ]
  };
}

function getMockProcesses(company: string, ind: string, lang: string) {
  const isJp = lang === "ja";
  return [
    {
      name: isJp ? "顧客離脱予測とパーソナライズ保護" : "Predictve Customer Retention Optimization",
      description: isJp ? "顧客行動シグナルを分析し、離脱する前に特別なオファーを自動送信します。" : "Analyze transactional and support interaction signals to predict and preempt customer churn.",
      businessImpact: 9,
      competitiveDifferentiation: 8,
      bestPractice: isJp ? "ネットフリックスがパーソナライズされたリテンションモデルで実現" : "Netflix hyper-personalized recommendation & customer friction triage.",
      suggestedDataSources: ["Support tickets", "Website clickstream", "Payment history"]
    },
    {
      name: isJp ? "ジャストインタイム在庫サプライチェーン" : "Just-In-Time Supply Chain Optimization",
      description: isJp ? "需要予測データと配送データを統合し、過剰在庫と配送遅延を排除します。" : "Integrate demand signals with freight updates to reduce warehouse carry costs.",
      businessImpact: 8,
      competitiveDifferentiation: 7,
      bestPractice: isJp ? "ファーストリテイリング(ユニクロ)の動的需要即応チェーン" : "Zara or Fast Retailing ultra-fast supply chain replenishment cycles.",
      suggestedDataSources: ["Carrier feeds", "Warehouse IoT logs", "Point of Sale sales"]
    },
    {
      name: isJp ? "動的AIプライシングとプロモーション" : "Dynamic Dynamic Pricing & Promotion Pricing",
      description: isJp ? "市場動向と競合他社の状態、利用者の即時需要から価格を最適化します。" : "Calibrate pricing parameters continuously using real-time inventory and market activity indicators.",
      businessImpact: 8,
      competitiveDifferentiation: 9,
      bestPractice: isJp ? "ウーバーや航空会社のダイナミックプライシングアルゴリズム" : "Uber and major airlines running instantaneous demand-yield formulas.",
      suggestedDataSources: ["Competitor scrapers", "Regional weather feeds", "Active cart levels"]
    },
    {
      name: isJp ? "アセット予防保守とダウンタイム防止" : "Predictive Machinery Maintenance",
      description: isJp ? "センサーデータを使用して故障を数時間前に検知し、計画外の稼働停止を無くします。" : "Monitor machine output signals to schedule pre-failure technical intervention cycles.",
      businessImpact: 7,
      competitiveDifferentiation: 6,
      bestPractice: isJp ? "ゼネラルエレクトリック(GE)のガスタービン監視アセット分析" : "GE Aviation engine telemetry detecting operational wear before incidents.",
      suggestedDataSources: ["Vibration sensors", "Thermal metrics", "Historical repair logs"]
    },
    {
      name: isJp ? "スマートサービスチケットルーティング" : "Smart Customer Service Ticket Routing",
      description: isJp ? "問い合わせ内容を機械学習で即時分析し、適切な専門エキスパートへ自動転送します。" : "Route inbound inquiries instantly to the optimal support team based on sentiment NLP.",
      businessImpact: 6,
      competitiveDifferentiation: 5,
      bestPractice: isJp ? "セールスフォースService Cloudの自動トリアージ" : "Salesforce Service Cloud automated ticketing workflow.",
      suggestedDataSources: ["Natural Language Emails", "Chat transcripts", "Agent performance logs"]
    }
  ];
}

function getMockDriverEnhancement(process: string, driver: string, lang: string) {
  const isJp = lang === "ja";
  return {
    additionalInsights: isJp
      ? `このバリュードライバーは「${process}」のボトルネックを排除するために重要な、非構造化コメントなどのデータ統合を促進します。`
      : `Leveraging this specific value driver empowers "${process}" to unlock unseen operational trends by correlating disparate data lakes dynamically.`,
    industryExample: isJp
      ? "セブン-イレブンは店舗のリアルタイム売上情報と天候変化を組み合わせ、適切な予測補給を最適化しています。"
      : "Seven-Eleven Japan utilizes real-time point-of-sale data combined with hourly local weather updates to refine fresh food replenishment.",
    keyRisks: isJp
      ? ["データ同期の待ち時間（遅延）", "プライバシー規制（GDPR/個人情報保護法）への抵触"]
      : ["Latency skew when integrating multi-region streams", "Strict regional data residency restrictions"],
    suggestedKPIs: isJp
      ? ["データインフラストラクチャ利用効率", "予測精度の誤差率 (MAPE < 4.5%)"]
      : ["Forecast Variance Ratio (expected vs actual)", "Mean Absolute Percentage Error (MAPE)"],
    opportunityScore: 8
  };
}

function getMockMaturityInsights(process: string, stage: string, lang: string, aud: string) {
  const isJp = lang === "ja";
  return {
    currentState: isJp
      ? "現在は週に一度のバッチ処理と手動でのスプレッドシート作成に頼っており、意思決定のタイムラグが生じています。"
      : "The company relies heavily on retroactive weekly batch scripts, exposing critical strategic projects to processing lag.",
    futureState: isJp
      ? `この「${stage}」段階では、すべてのデータが自動で集約され、担当者がクリック一つで即座に未来予測を確認できるようになります。`
      : `Achieving the "${stage}" level brings an active self-healing model, trigger-initiated workflow rules, and auto-generated decision alerts.`,
    requiredCapabilities: isJp
      ? ["インメモリ分散並列処理", "リアルタイムの特徴量抽出パイプライン"]
      : ["Distributed memory computing", "Streaming feature store structures"],
    technologyRequirements: isJp
      ? ["Apache Kafka / AWS Kinesis", "Databricks Delta Lake"]
      : ["Apache Spark Streaming", "Continuous schema validation checks"],
    dataRequirements: isJp
      ? ["秒単位のクリックログ", "リアルタイムの在庫フィード"]
      : ["Sub-second application click signals", "Standardized supplier transaction schemas"],
    talentRequirements: isJp
      ? ["データエンジニア (Spark/Kafka熟練者)", "アナリティクス翻訳者 (ビジネス推進役)"]
      : ["Big Data Engineers", "Analytics Translators guiding commercial translation"],
    culturalChanges: isJp
      ? "直感や経験に基づく判断から、リアルタイムの客観的データに基づく客観的意思決定へと移行する必要があります。"
      : "Shifting the cultural axis from senior instinct to real-time telemetry testing patterns.",
    challenges: isJp
      ? ["既存のレガシーデータベースへの負荷", "現場スタッフの新しいツールに対する心理的抵抗"]
      : ["Performance bottlenecking on standard relational DBs", "User friction during workflow changes"],
    expectedBenefits: isJp
      ? ["手作業の集計作業を90%削減", "機会損失コストを約25%抑制"]
      : ["90% reduction in weekly spreadsheet overhead", "3.2% optimization of operating margin profiles"]
  };
}

function getMockStrategyReport(company: string, industry: string, lang: string, aud: string) {
  const isJp = lang === "ja";
  const swot = isJp ? {
    strengths: ["現場メンバーの豊富な業界経験", "長年蓄積されたユニークな取引履歴データ", "強固なトップマネジメントのDXへの意欲"],
    weaknesses: ["既存システムの分断（データのサイロ化）", "高度なアナリティクス人材（データサイエンティスト）の不足", "アジャイル開発手法への理解の低さ"],
    opportunities: ["天候・競合価格情報などのオープンデータの活用余地", "顧客接点のデジタル化による新しいマネタイズモデルの構築", "リアルタイム意思決定システムの先行導入による競合優位性の獲得"],
    threats: ["競合新興企業のデジタル特化型ビジネス参入", "プライバシー保護規制の強化による行動データ収集制限", "サプライチェーン自体の物理的寸断"]
  } : {
    strengths: ["Deep operational vertical experience", "Unique long-term relationship transactional data", "Executive buy-in for digital development"],
    weaknesses: ["Siloed information architecture and manual work", "Severe shortage of high-tier analytics engineers", "Unfamiliarity with agile software practices"],
    opportunities: ["Using unstructured ecosystem inputs to predict logistics trends", "Monetizing specialized industry insight reports", "Pioneering interactive buyer customized workflows"],
    threats: ["Digital-native specialized fast-competitor entries", "Stricter state privacy enforcement acts", "Escalating operational resource costs"]
  };

  const recommendations = isJp ? [
    {
      title: "データサイロの排除とリアルタイム・データレイクの構築",
      type: "最優先戦略、インフラ整備",
      description: "基幹システムのデータベース、CRM、マーケティングツールを最新のデータストア（DWH）に統合し、全社一致の分析基盤を作ります。",
      timeframe: "短期 (0-6ヶ月)",
      priority: "最高",
      estimatedROI: "作業時間削減、ライセンス重複削減で年間約1200万円のコストカット"
    },
    {
      title: "需要予測即応型 AI在庫・配送システムの実装",
      type: "ビジネスプロセスの最適化",
      description: "Step 3で指定された予測アルゴリズムを導入し、仕入数を動的に調整します。",
      timeframe: "中期 (6-18ヶ月)",
      priority: "高",
      estimatedROI: "過剰在庫キャリーコスト年間18%削減、欠品率4.2%減少"
    },
    {
      title: "MBAチーム内 DXタスクフォースの編成とアジャイル文化の浸透",
      type: "組織能力向上と文化変革",
      description: "開発メンバーと現場エキスパートを合わせた混成ユニットを作り、毎週改善を繰り返す体制を導入します。",
      timeframe: "長期 (1.5年以上)",
      priority: "中",
      estimatedROI: "DXイノベーションサイクルが12ヶ月から2週間に短縮"
    }
  ] : [
    {
      title: "Establish Standardized Enterprise Unified Data Platform",
      type: "Infrastructure Foundation",
      description: "Tear down information silos by aggregating CRM, web interactions, and ERP databases into a modern, unified cloud data lakehouse.",
      timeframe: "Short Term (0-6 months)",
      priority: "High",
      estimatedROI: "Reclaiming 4,000 developer and analyst hours wasted annually on manual cleaning"
    },
    {
      title: "Deploy Active Reinforcement Demand Forecasting Model",
      type: "Core Optimization Trigger",
      description: "Implement continuous ML modeling utilizing unstructured environmental triggers to drive supply chain operations.",
      timeframe: "Mid Term (6-18 months)",
      priority: "High",
      estimatedROI: "$2.4M saved via dynamic inventory cost reduction and 5% stock-out rate drop"
    },
    {
      title: "Form Dedicated EMBA Digital Transformation Unit",
      type: "Governance & Human Capital",
      description: "Orchestrate cross-functional squads containing line experts and software engineers working in rapid, high-agency sprints.",
      timeframe: "Long Term (1.5+ years)",
      priority: "Medium",
      estimatedROI: "Accelerates product development velocity by 4.5x"
    }
  ];

  const presentation = isJp ? {
    title: `「${company}」ビッグデータ成熟度変革ロードマップ`,
    slides: [
      {
        slideNum: 1,
        title: "イントロダクション: 変革の始まり",
        keyPoints: [`${company}のアナリティクス戦略ロードマップを発表します。`, "現状の課題とデータ成熟度モデルのロードマップ。"],
        speakerAssignment: "発表担当者 A (取締役 / チームリーダー)",
        talkingPoints: `本日はデータ成熟度診断に基づく、${company}のデジタル変革ロードマップを発表します。私たちは既存の業務モデルから、競争で優位に立つ情報駆動型モデルへの進化を目指します。`
      },
      {
        slideNum: 2,
        title: "強みとサイロ問題（SWOTに基づく解説）",
        keyPoints: ["我々の強み：深い業界実績とデータ量", "課題：サイロ化された縦割りのシステム"],
        speakerAssignment: "発表担当者 B (ビジネス戦略担当)",
        talkingPoints: "私たちの資産は豊富ですが、部署ごとのサイロ設計が活動の足枷となっています。これを統合データプラットフォームで解決する必要があります。"
      },
      {
        slideNum: 3,
        title: "バリュードライバー別: 業務プロセス変革",
        keyPoints: ["トランザクションデータからリアルタイム、予測分析へのステップアップ", "顧客離脱予測とパーソナライズ保護の成果目標"],
        speakerAssignment: "発表担当 = A (取締役)",
        talkingPoints: "予測分析を導入し、離脱しそうな顧客シグナルを捉えて特別なオファーを差し上げることで、優良セグメントの損失を25%防御します。"
      },
      {
        slideNum: 4,
        title: "投資対効果と変革タイムライン",
        keyPoints: ["フェーズ1：インフラ最適化、フェーズ2：AIプロセス最適化", "想定される総投資額の回収（ROIは約18%を想定）"],
        speakerAssignment: "発表担当者 C (財務/DX統括役)",
        talkingPoints: "すべてのプロジェクトは測定可能な投資価値に寄与します。短期での手作業コスト見直しを経て、中期で利益底上げが完了します。"
      }
    ],
    qaPrep: [
      {
        question: "既存のレガシー社員や事業部リーダーが、新しいシステム変更に反対した場合はどう対処しますか？",
        answer: "データ利便性をアピールするチェンジマネジメント研修を並行させ、毎週小さな成果を見せることで信頼（バイイン）を獲得します。"
      }
    ]
  } : {
    title: `"${company}" Big Data Strategic Roadmap Presentation`,
    slides: [
      {
        slideNum: 1,
        title: "Executive Strategic Vision Introduction",
        keyPoints: ["The economic potential of optimizing central business models", "Deploying the Big Data Business Model Maturity Index"],
        speakerAssignment: "Executive Presenter (Chief Executive Officer)",
        talkingPoints: "We are introducing a comprehensive strategy to move past historical reporting and build an active predictive engine for our core operations."
      },
      {
        slideNum: 2,
        title: "Tearing Down the Silos (SWOT Analysis)",
        keyPoints: ["Unique historical transaction datasets", "Fragmented database arrays and manual aggregation traps"],
        speakerAssignment: "Strategy Lead (Chief Digital Officer)",
        talkingPoints: "While we own valuable customer and shipment arrays, they reside in organizational silos. Unifying them is our first mission."
      },
      {
        slideNum: 3,
        title: "Value Stream & Business Process Maturity Lifecycle",
        keyPoints: ["Converting baseline transactional datasets into real-time triggers", "Customer Lifecycle optimization goals & metrics"],
        speakerAssignment: "Operations Director (VP of Global Operations)",
        talkingPoints: "Our second slide explains the predictive customer optimization engine. By executing dynamic retentions, customer lifetime values lift significantly."
      },
      {
        slideNum: 4,
        title: "Financial ROI, Resource Scaffolding & Roadmaps",
        keyPoints: ["Three phases over 18 months", "Targeting 15-20% margin recapture & workflow hour reclamation"],
        speakerAssignment: "Finance Director (Chief Financial Officer)",
        talkingPoints: "The transformation is structured with clear, self-funding phase milestones. Immediate efficiency gains subsidize late-stage ML models."
      }
    ],
    qaPrep: [
      {
        question: "How do we prevent infrastructure scope creep or delays?",
        answer: "We deploy standard out-of-the-box cloud-native layers in microstep stages rather than planning multi-year bespoke database rewrites."
      }
    ]
  };

  return { swot, recommendations, presentation };
}

// Vite configuration and fallback server static handler
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Big Data Maturity Navigator running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
