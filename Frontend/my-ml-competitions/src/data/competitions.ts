// src/data/competitions.ts

export interface LeaderboardEntry {
  rank: number;
  modelName: string;
  accuracy: number;
}

export interface Competition {
  id: string;
  title: string;
  datasetLink: string;
  description: string;
  deadline: string;
  stakeAmount: number;
  leaderboard: LeaderboardEntry[];
}

export const competitions: Competition[] = [
  {
    id: "1",
    title: "Image Cfication Challenge",
    datasetLink: "https://example.com/dataset1",
    description: "Build a model to classify images of cats and dogs.",
    deadline: "2025-12-31",
    stakeAmount: 100,
    leaderboard: [
      { rank: 1, modelName: "BestModel", accuracy: 98.5 },
      { rank: 2, modelName: "SecondBest", accuracy: 97.3 },
    ],
  },
  {
    id: "2",
    title: "Text Sentiment Analysis",
    datasetLink: "https://example.com/dataset2",
    description: "Predict sentiment from user reviews.",
    deadline: "2025-11-30",
    stakeAmount: 150,
    leaderboard: [],
  },
];
