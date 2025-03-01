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
    leaderboard?: LeaderboardEntry[];
  }
  
  export const competitions: Competition[] = [
    {
      id: "1",
      title: "ML Competition 1",
      datasetLink: "https://example.com/dataset1",
      description:
        "This is the first ML competition. Work on predicting trends using our sample dataset.",
      deadline: "2025-03-15",
      stakeAmount: 50,
      leaderboard: [
        { rank: 1, modelName: "Model A", accuracy: 98.5 },
        { rank: 2, modelName: "Model B", accuracy: 96.2 },
        { rank: 3, modelName: "Model C", accuracy: 94.8 },
      ],
    },
    {
      id: "2",
      title: "ML Competition 2",
      datasetLink: "https://example.com/dataset2",
      description:
        "This is the second ML competition. Improve your models with a more challenging dataset.",
      deadline: "2025-04-01",
      stakeAmount: 100,
      leaderboard: [
        { rank: 1, modelName: "Model X", accuracy: 97.4 },
        { rank: 2, modelName: "Model Y", accuracy: 95.0 },
        { rank: 3, modelName: "Model Z", accuracy: 93.3 },
      ],
    },
  ];
  