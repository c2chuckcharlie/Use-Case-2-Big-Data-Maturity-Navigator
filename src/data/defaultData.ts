import { TeamInfo, BusinessProcess, DriversInputMap, MaturityEvaluationMap } from "../types";

export const defaultTeamInfo: TeamInfo = {
  teamName: "Alpha Consulting cohort 2026",
  teamMembers: "Emma Watson, Ken Tanaka, Hiroshi Sato, Aisha Vance",
  courseName: "Strategic Business Analytics (BU-829)",
  instructorName: "Dr. Catherine Thorne & Prof. Kiyoshi Kurokawa",
  companyName: "Fast Retailing (UNIQLO)",
  industry: "Retail and Apparel",
  website: "https://www.fastretailing.com"
};

export const defaultProcesses: BusinessProcess[] = [
  {
    id: "p1",
    name: "Predictive Demand Replenishment",
    description: "Aligning clothing manufacturer schedules with real-time sales velocity and micro-market weather triggers.",
    businessImpact: 9,
    competitiveDifferentiation: 8,
    bestPractice: "ZARA automated replenishment cycle optimizing stock cycles to twice a week."
  },
  {
    id: "p2",
    name: "Dynamic Regional Custom pricing",
    description: "Adjusting markdown rates dynamically across regions using local competitor catalog scraping systems.",
    businessImpact: 8,
    competitiveDifferentiation: 9,
    bestPractice: "Amazon continuous repricing engine matching competitive market shifts."
  },
  {
    id: "p3",
    name: "Customer Loyalty Churn Analysis",
    description: "Tracking app scan occurrences and purchase deceleration loops to distribute preemptive loyalty tokens.",
    businessImpact: 7,
    competitiveDifferentiation: 7,
    bestPractice: "Starbucks personalized dynamic rewards based on transactional velocity."
  }
];

export const defaultDrivers: DriversInputMap = {
  "p1_1": {
    score: 8,
    userInput: "We already collect POS transactional sales at checkout counters daily. This gives us retrospective volumes.",
    additionalInsights: "This transactional baseline can be converted into active intraday demand spikes.",
    industryExample: "UNIQLO automated RFID checkouts capturing total cart indices instantly.",
    keyRisks: ["Database lock during peak holiday spikes", "Incomplete POS records sync"],
    suggestedKPIs: ["Data Sync Latency (< 10 minutes)", "POS Record Accuracy (> 99.9%)"],
    opportunityScore: 7
  },
  "p1_2": {
    score: 9,
    userInput: "We want to combine clothing volumes with regional weather (upcoming humidity or temperature dips) and local social trends.",
    additionalInsights: "Integrating unstructured regional telemetry acts as an early warning indicator for seasonal coat or lightweight t-shirt demand shifts.",
    industryExample: "Weather forecasting integrations driving winter outerwear shipments to cold-snap areas.",
    keyRisks: ["Scraping failure of meteorological feeds", "Noise in social sentiment models"],
    suggestedKPIs: ["External API Availability (%)", "Unstructured Data Processing Latency (< 1hr)"],
    opportunityScore: 9
  }
};

export const defaultMaturityMap: MaturityEvaluationMap = {
  "p1_1": {
    customerImpact: "Customers see standard historical inventory lists on the web application.",
    productImpact: "Standard catalog without localized adjustments.",
    operationalImpact: "Nightly batch spreadsheets run to balance inventory manually.",
    coaching: {
      currentState: "Reliance on historical batching creates frequent stock-outs during unexpected weather spikes.",
      futureState: "Interactive historical overview maps visual inventory across the local geography.",
      requiredCapabilities: ["Automated nocturnal database extraction", "Standardized reporting views"],
      technologyRequirements: ["Relational Database (PostgreSQL)", "Standard SQL query engine"],
      dataRequirements: ["Transactional database tables", "Updated nightly"],
      talentRequirements: ["Business Analysts using BI tools"],
      culturalChanges: "Transition from checking paper receipts to trusting standardized computer visual reports.",
      challenges: ["Siloed department folders", "Access control lags"],
      expectedBenefits: ["Consolidated company-wide stock visibility", "12% reduction in auditing overhead"]
    }
  },
  "p1_3": {
    customerImpact: "Frontline customers receive automated alert notifications suggesting items before they sell out physically.",
    productImpact: "Proactive, customized item bundles adapting to local weather fluctuations.",
    operationalImpact: "Workflows trigger self-replenishing factory orders, bypassing manual manager approval layers.",
    coaching: {
      currentState: "Siloed shipping hubs require physical managers' signatures, delaying deliveries.",
      futureState: "AI predictors directly generate optimal supply schedules with no manual pipeline checks.",
      requiredCapabilities: ["Stream-based predictive modelling", "No-code event triggers"],
      technologyRequirements: ["Databricks Lakehouse", "Kafka/Spark Streaming", "Proactive AI Agents"],
      dataRequirements: ["Hourly telemetry feeds", "Real-time transport routes"],
      talentRequirements: ["Data Scientists", "Cloud Architecture Engineers"],
      culturalChanges: "Fully delegating approval authority to automated algorithms, allowing exceptions only on anomalies.",
      challenges: ["Initial trust building in automatic loops", "System sensor lag"],
      expectedBenefits: ["97% reduction in replenishment routing times", "Slashed warehouse carry overheads by $1.8M and stockouts by 4%"]
    }
  }
};
