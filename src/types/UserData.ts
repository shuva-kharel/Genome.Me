export interface UserData {
  fullName: string;
  country: string;
  yearOfBirth: number;
  gender: 'male' | 'female' | 'other';
  lifestyle: 'sedentary' | 'active' | 'athletic';
  diet: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'mixed';
  caffeine: 'none' | 'low' | 'medium' | 'high';
  sleepType: 'morning-bird' | 'night-owl' | 'biphasic';
  personality: 'logical' | 'creative' | 'emotional';
}

export interface GenomeData {
  ancestry: {
    [key: string]: number;
  };
  traits: Array<{
    trait: string;
    gene: string;
    status: string;
    description: string;
  }>;
  rareGenes: Array<{
    code: string;
    trait: string;
    description: string;
    icon: string;
  }>;
  aiSummary: string;
  reportId: string;
  matchScore: number;
  locations: Array<{
    lat: number;
    lng: number;
    matches: number;
  }>;
}