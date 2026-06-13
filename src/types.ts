export type Language = "en" | "ja";
export type AudienceType = "MBA" | "EMBA";

export interface TeamInfo {
  teamName: string;
  teamMembers: string;
  courseName: string;
  instructorName: string;
  companyName: string;
  industry: string;
  website: string;
}

export interface EcosystemPlayer {
  name: string;
  role: string;
}

export interface DiscoveryData {
  companyOverview: string;
  industryOverview: string;
  competitorOverview: string;
  digitalTrends: string;
  potentialDifferentiators: string[];
  ecosystemPlayers?: EcosystemPlayer[];
}

export interface BusinessProcess {
  name: string;
  description: string;
  businessImpact: number; // 1-10
  competitiveDifferentiation: number; // 1-10
  bestPractice: string;
  suggestedDataSources?: string[];
  id: string; // locally assigned
}

export interface DriverState {
  score: number;
  userInput: string;
  additionalInsights?: string;
  industryExample?: string;
  keyRisks?: string[];
  suggestedKPIs?: string[];
  opportunityScore?: number;
  loading?: boolean;
}

// Map key: `${processId}_${driverId}` where driverId is 1-4
export interface DriversInputMap {
  [key: string]: DriverState;
}

export interface StageCoaching {
  currentState: string;
  futureState: string;
  requiredCapabilities: string[];
  technologyRequirements: string[];
  dataRequirements: string[];
  talentRequirements: string[];
  culturalChanges: string;
  challenges: string[];
  expectedBenefits: string[];
}

export interface ProcessStageMaturity {
  customerImpact: string;
  productImpact: string;
  operationalImpact: string;
  coaching?: StageCoaching;
  loading?: boolean;
}

// Map key: `${processId}_${stageId}` where stageId is 1-5
export interface MaturityEvaluationMap {
  [key: string]: ProcessStageMaturity;
}

export interface SimulatorSliders {
  dataQuality: number; // 10-100
  analyticsMaturity: number; // 10-100
  aiAdoption: number; // 10-100
  leadershipSupport: number; // 10-100
  digitalCulture: number; // 10-100
  innovationCapability: number; // 10-100
}

export interface CollaborativeNote {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  votes: number;
}

export interface SWOTData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface StrategyRecommendation {
  title: string;
  type: string;
  description: string;
  timeframe: string;
  priority: string;
  estimatedROI: string;
}

export interface SlideOutline {
  slideNum: number;
  title: string;
  keyPoints: string[];
  speakerAssignment: string;
  talkingPoints: string;
}

export interface QAPreparation {
  question: string;
  answer: string;
}

export interface PresentationOutline {
  title: string;
  slides: SlideOutline[];
  qaPrep: QAPreparation[];
}

export interface StrategyReport {
  swot: SWOTData;
  recommendations: StrategyRecommendation[];
  presentation: PresentationOutline;
}

export interface AchievementBadge {
  id: string;
  titleEn: string;
  titleJa: string;
  descriptionEn: string;
  descriptionJa: string;
  unlocked: boolean;
  iconName: string;
}

export interface ApplicationState {
  language: Language;
  audienceType: AudienceType;
  step: number;
  teamInfo: TeamInfo;
  discoveryPayload: DiscoveryData | null;
  discoveryLoading: boolean;
  processes: BusinessProcess[];
  processesBrainstormed: BusinessProcess[];
  processesLoading: boolean;
  driversMap: DriversInputMap;
  maturityMap: MaturityEvaluationMap;
  sliders: SimulatorSliders;
  notes: CollaborativeNote[];
  votedNotes: string[]; // List of IDs the user voted on
  strategyReport: StrategyReport | null;
  strategyLoading: boolean;
  isSaving: boolean;
  unlockedBadgeIds: string[];
}
