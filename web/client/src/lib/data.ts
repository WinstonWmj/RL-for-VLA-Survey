export interface Paper {
  id: string;
  title: string;
  authors: string[];
  date: string;
  venue: string;
  type: 'Offline RL' | 'Online RL' | 'Test-time RL' | 'Survey';
  url: string;
  summary: string;
  tags: string[];
  citations?: number;
}

export const papers: Paper[] = [
  {
    id: 'q-transformer',
    title: 'Q-Transformer: Scalable Offline Reinforcement Learning via Autoregressive Q-Functions',
    authors: ['Google DeepMind'],
    date: '2023-10-01',
    venue: 'CoRL 2023',
    type: 'Offline RL',
    url: 'https://q-transformer.github.io/',
    summary: 'Combines Q-learning with Transformer architecture to learn state-action value functions from offline data.',
    tags: ['Offline RL', 'Transformer', 'Q-Learning'],
    citations: 120
  },
  {
    id: 'recap',
    title: 'A VLA that Learns from Experience (π*0.6)',
    authors: ['Physical Intelligence'],
    date: '2025-11-01',
    venue: 'Blog',
    type: 'Offline RL',
    url: 'https://www.physicalintelligence.company/blog/pistar06',
    summary: 'Combines expert demonstrations, human corrections, and advantage-weighted policy learning for real-world tasks.',
    tags: ['Real-world', 'Advantage Weighted', 'Human Corrections'],
    citations: 45
  },
  {
    id: 'ire-vla',
    title: 'Improving Vision-Language-Action Model with Online Reinforcement Learning',
    authors: ['Guo et al.'],
    date: '2025-01-01',
    venue: 'ICRA 2025',
    type: 'Online RL',
    url: 'https://arxiv.org/abs/2501.16664',
    summary: 'Iterative framework between RL and SFT to leverage exploration while maintaining stability.',
    tags: ['Online RL', 'Iterative Training', 'Stability'],
    citations: 15
  },
  {
    id: 'vla-rl',
    title: 'VLA-RL: Towards Masterful and General Robotic Manipulation',
    authors: ['Lu et al.'],
    date: '2025-05-01',
    venue: 'ArXiv',
    type: 'Online RL',
    url: 'https://arxiv.org/abs/2505.18719',
    summary: 'Trajectory-level RL formulation modeling robotic manipulation as multimodal multi-turn dialogue.',
    tags: ['Trajectory RL', 'Reward Modeling', 'Generalization'],
    citations: 28
  },
  {
    id: 'rlvla-empirical',
    title: 'What Can RL Bring to VLA Generalization? An Empirical Study',
    authors: ['Liu et al.'],
    date: '2025-05-15',
    venue: 'NeurIPS 2025',
    type: 'Online RL',
    url: 'https://rlvla.github.io/',
    summary: 'Comprehensive empirical study of PPO, GRPO, DPO in VLA finetuning, showing significant gains in execution dimension.',
    tags: ['Empirical Study', 'PPO', 'DPO', 'GRPO'],
    citations: 32
  },
  {
    id: 'co-rft',
    title: 'Co-RFT: Efficient Fine-tuning of VLA Models through Chunked Offline RL',
    authors: ['Anonymous'],
    date: '2025-08-01',
    venue: 'ArXiv',
    type: 'Offline RL',
    url: 'https://arxiv.org/abs/2508.02219',
    summary: 'Efficient finetuning using chunked offline RL to improve stability and efficiency.',
    tags: ['Chunking', 'Efficiency', 'Offline RL'],
    citations: 8
  },
  {
    id: 'simple-vla-rl',
    title: 'SimpleVLA-RL: Scaling VLA Training via Reinforcement Learning',
    authors: ['Unknown'],
    date: '2025-09-01',
    venue: 'OpenReview',
    type: 'Online RL',
    url: 'https://openreview.net/forum?id=TQhSodCM4r',
    summary: 'RL framework based on VeRL for training VLA models on robotic manipulation tasks.',
    tags: ['Scaling', 'VeRL', 'Infrastructure'],
    citations: 5
  },
  {
    id: 'v-gps',
    title: 'V-GPS: Value-Guided Policy Selection',
    authors: ['Unknown'],
    date: '2024-10-01',
    venue: 'ArXiv',
    type: 'Test-time RL',
    url: '',
    summary: 'Uses pretrained value functions to guide action selection at test time.',
    tags: ['Test-time', 'Value Function', 'Guidance'],
    citations: 18
  },
  {
    id: 'gr-rl',
    title: 'GR-RL Framework',
    authors: ['ByteDance SEED'],
    date: '2025-12-01',
    venue: 'Blog',
    type: 'Online RL',
    url: 'https://seed.bytedance.com/en/gr_rl',
    summary: 'First demonstration of real-world RL for fine manipulation tasks like shoe lacing.',
    tags: ['Real-world', 'Fine Manipulation', 'Industrial'],
    citations: 12
  }
];

export const stats = {
  totalPapers: 50,
  platforms: [
    { name: 'ArXiv', count: 35, percentage: 70 },
    { name: 'GitHub', count: 42, percentage: 84 },
    { name: 'Conferences', count: 15, percentage: 30 },
    { name: 'Blogs', count: 8, percentage: 16 }
  ],
  trends: [
    { month: '2024-10', count: 2 },
    { month: '2024-11', count: 3 },
    { month: '2024-12', count: 4 },
    { month: '2025-01', count: 6 },
    { month: '2025-02', count: 5 },
    { month: '2025-03', count: 7 },
    { month: '2025-04', count: 8 },
    { month: '2025-05', count: 12 },
    { month: '2025-06', count: 10 },
    { month: '2025-07', count: 9 },
    { month: '2025-08', count: 11 },
    { month: '2025-09', count: 14 },
    { month: '2025-10', count: 15 },
    { month: '2025-11', count: 18 },
    { month: '2025-12', count: 20 }
  ]
};
