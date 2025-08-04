import CryptoJS from "crypto-js";
import { UserData, GenomeData } from "../types/UserData";

// Easter egg names that trigger special responses
const EASTER_EGG_NAMES = [
  "elon musk",
  "einstein",
  "rick astley",
  "albert einstein",
];

// Generate deterministic hash from user data
const generateHash = (userData: UserData, seed: string = ""): string => {
  const dataString = JSON.stringify(userData) + seed;
  return CryptoJS.MD5(dataString).toString();
};

// Generate a seeded random number between min and max
const seededRandom = (
  hash: string,
  index: number,
  min: number = 0,
  max: number = 1
): number => {
  const hashWithIndex = CryptoJS.MD5(hash + index.toString()).toString();
  const num = parseInt(hashWithIndex.substr(0, 8), 16) / 0xffffffff;
  return min + num * (max - min);
};

// Generate ancestry breakdown
const generateAncestry = (
  userData: UserData,
  hash: string
): { [key: string]: number } => {
  const regions = [
    "South Asian",
    "Central Asian",
    "East Asian",
    "African",
    "European",
    "Native American",
    "Middle Eastern",
    "Oceanian",
  ];

  let percentages: { [key: string]: number } = {};
  let total = 0;

  // Generate base percentages
  regions.forEach((region, index) => {
    let percentage = Math.round(seededRandom(hash, index, 1, 35));
    percentages[region] = percentage;
    total += percentage;
  });

  // Normalize to 100%
  const factor = 100 / total;
  let adjustedTotal = 0;

  Object.keys(percentages).forEach((region) => {
    percentages[region] = Math.round(percentages[region] * factor);
    adjustedTotal += percentages[region];
  });

  // Adjust for rounding errors
  const diff = 100 - adjustedTotal;
  if (diff !== 0) {
    const firstRegion = Object.keys(percentages)[0];
    percentages[firstRegion] += diff;
  }

  // Remove regions with 0%
  return Object.fromEntries(
    Object.entries(percentages).filter(([_, value]) => value > 0)
  );
};

// Generate genetic traits
const generateTraits = (
  userData: UserData,
  hash: string,
  scientificMode: boolean = false
) => {
  const baseTraits = [
    {
      trait: "Eye Color Prediction",
      gene: "HERC2",
      scientificGene: "rs12913832 (HERC2)",
      statuses: ["Likely Brown", "Likely Blue", "Likely Green", "Likely Hazel"],
      descriptions: [
        "Strong predictor for brown eye pigmentation",
        "Associated with reduced melanin production",
        "Intermediate melanin expression pattern",
        "Variable melanin distribution in iris",
      ],
    },
    {
      trait: "Muscle Fiber Composition",
      gene: "ACTN3",
      scientificGene: "rs1815739 (ACTN3)",
      statuses: [
        "Fast Twitch Dominant",
        "Slow Twitch Dominant",
        "Mixed Fiber",
        "Endurance Optimized",
      ],
      descriptions: [
        "Enhanced power and sprint performance",
        "Superior endurance and recovery capacity",
        "Balanced power and endurance traits",
        "Optimized for sustained aerobic activity",
      ],
    },
    {
      trait: "Lactose Processing",
      gene: "LCT",
      scientificGene: "rs4988235 (LCT)",
      statuses: [
        "Tolerant",
        "Intolerant",
        "Reduced Activity",
        "Persistent Activity",
      ],
      descriptions: [
        "Continued lactase production into adulthood",
        "Reduced lactase enzyme activity",
        "Moderate lactose processing capability",
        "Enhanced dairy product metabolism",
      ],
    },
    {
      trait: "Memory Formation",
      gene: "BDNF",
      scientificGene: "rs6265 (BDNF)",
      statuses: [
        "Enhanced Recall",
        "Standard Processing",
        "Rapid Encoding",
        "Deep Processing",
      ],
      descriptions: [
        "Improved memory consolidation pathways",
        "Typical neuroplasticity patterns",
        "Fast information acquisition ability",
        "Strong long-term retention capacity",
      ],
    },
    {
      trait: "Circadian Rhythm",
      gene: "CLOCK",
      scientificGene: "rs1801260 (CLOCK)",
      statuses: [
        "Morning Type",
        "Evening Type",
        "Flexible Pattern",
        "Extreme Evening",
      ],
      descriptions: [
        "Natural early rising tendency",
        "Optimal performance in evening hours",
        "Adaptable sleep-wake cycle",
        "Strong night owl characteristics",
      ],
    },
    {
      trait: "Metabolic Rate",
      gene: "FTO",
      scientificGene: "rs9939609 (FTO)",
      statuses: [
        "Fast Metabolism",
        "Slow Metabolism",
        "Efficient Processing",
        "Variable Rate",
      ],
      descriptions: [
        "Elevated basal metabolic rate",
        "Conservation-optimized energy use",
        "Highly efficient nutrient processing",
        "Context-dependent metabolic response",
      ],
    },
  ];

  return baseTraits.map((trait, index) => {
    const statusIndex = Math.floor(
      seededRandom(hash, index, 0, trait.statuses.length)
    );
    return {
      trait: trait.trait,
      gene: scientificMode ? trait.scientificGene : trait.gene,
      status: trait.statuses[statusIndex],
      description: trait.descriptions[statusIndex],
    };
  });
};

// Generate rare genes
const generateRareGenes = (userData: UserData, hash: string) => {
  const rareGenePool = [
    {
      code: "MC1R",
      trait: "Melanin Production Variant",
      description:
        "Rare variant affecting pigmentation patterns and UV sensitivity",
      icon: "sparkles",
    },
    {
      code: "SLC6A4",
      trait: "Serotonin Transport Efficiency",
      description: "Uncommon allele linked to enhanced emotional regulation",
      icon: "heart",
    },
    {
      code: "COMT",
      trait: "Cognitive Flexibility Enhancement",
      description:
        "Rare polymorphism associated with superior executive function",
      icon: "brain",
    },
    {
      code: "APOE",
      trait: "Neuroprotective Variant",
      description: "Protective allele against age-related cognitive decline",
      icon: "shield",
    },
    {
      code: "ALDH2",
      trait: "Enhanced Detoxification",
      description:
        "Rare variant providing superior toxin processing capability",
      icon: "zap",
    },
    {
      code: "CYP1A2",
      trait: "Caffeine Metabolism Efficiency",
      description: "Uncommon variant affecting stimulant processing speed",
      icon: "zap",
    },
  ];

  // Select 3-4 random rare genes
  const selectedCount = Math.floor(seededRandom(hash, 100, 3, 5));
  const selectedGenes = [];

  for (let i = 0; i < selectedCount; i++) {
    const geneIndex = Math.floor(
      seededRandom(hash, i + 200, 0, rareGenePool.length)
    );
    selectedGenes.push(rareGenePool[geneIndex]);
  }

  return selectedGenes;
};

// Generate AI summary
const generateAISummary = (userData: UserData, hash: string): string => {
  const name = userData.fullName.toLowerCase();

  // Easter egg responses
  if (EASTER_EGG_NAMES.includes(name)) {
    return `🌟 ELITE GENOME DETECTED 🌟 Your genetic profile exhibits extraordinary characteristics typically found in less than 0.001% of the population. Analysis reveals exceptional cognitive markers, enhanced neuroplasticity, and optimal metabolic efficiency. Your DNA suggests you're destined for greatness with an estimated IQ potential exceeding 200. The rare combination of alleles in your genome indicates revolutionary thinking capabilities and unparalleled problem-solving potential.`;
  }

  const summaryTemplates = [
    `Based on your comprehensive genome analysis, ${userData.fullName}, your genetic profile reveals fascinating insights into your biological blueprint. Your ${userData.personality} personality type aligns with genetic markers suggesting enhanced cognitive processing in analytical domains. The ${userData.lifestyle} lifestyle you maintain appears well-suited to your metabolic genetic variants, particularly given your ${userData.diet} dietary preferences.`,

    `Your genetic analysis indicates a unique combination of traits that make you particularly well-adapted to your current lifestyle choices. With your ${userData.sleepType} chronotype and ${userData.caffeine} caffeine consumption patterns, your genome shows optimal alignment for peak performance. Your ancestral background contributes to distinctive metabolic and cognitive characteristics.`,

    `The computational analysis of your genetic markers reveals a compelling profile of adaptive traits. Your ${userData.gender} genetic expression patterns, combined with environmental factors from ${userData.country}, suggest strong resilience markers and enhanced stress response capabilities. Your genome exhibits rare variants associated with longevity and cognitive preservation.`,
  ];

  const templateIndex = Math.floor(
    seededRandom(hash, 500, 0, summaryTemplates.length)
  );
  return summaryTemplates[templateIndex];
};

// Generate genetic locations for the map
const generateGeneticLocations = (userData: UserData, hash: string) => {
  const locations = [];
  const locationCount = Math.floor(seededRandom(hash, 600, 8, 15));

  for (let i = 0; i < locationCount; i++) {
    const lat = seededRandom(hash, i + 700, -60, 70);
    const lng = seededRandom(hash, i + 800, -170, 170);
    const matches = Math.floor(seededRandom(hash, i + 900, 15, 150));

    locations.push({ lat, lng, matches });
  }

  return locations;
};

// Main genome data generation function
export const generateGenomeData = (
  userData: UserData,
  seed: string = ""
): GenomeData => {
  const hash = generateHash(userData, seed);

  return {
    ancestry: generateAncestry(userData, hash),
    traits: generateTraits(userData, hash),
    rareGenes: generateRareGenes(userData, hash),
    aiSummary: generateAISummary(userData, hash),
    reportId: `GNM-${hash.substr(0, 4).toUpperCase()}-${hash
      .substr(4, 2)
      .toUpperCase()}`,
    matchScore: Math.floor(seededRandom(hash, 1000, 85, 98)),
    locations: generateGeneticLocations(userData, hash),
  };
};
