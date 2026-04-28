
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Research' | 'Industry' | 'Library' | 'Event';
  date: string;
  url: string;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Breakthrough in Efficient LLM Fine-tuning',
    summary: 'A new method called LoRA-Pro reduces memory usage by another 40% for 70B parameter models.',
    category: 'Research',
    date: '2026-04-15',
    url: 'https://arxiv.org/abs/2402.12354'
  },
  {
    id: '2',
    title: 'Pandas 3.0 Release Candidate 1 is Out',
    summary: 'Major performance improvements for string operations and a new Arrow-backed backend.',
    category: 'Library',
    date: '2026-04-14',
    url: 'https://pandas.pydata.org/docs/whatsnew/v3.0.0.html'
  },
  {
    id: '3',
    title: 'DataScienceConf 2026 Registration Opens',
    summary: 'Join the biggest DS conference in London this June. Early bird tickets available now.',
    category: 'Event',
    date: '2026-04-12',
    url: 'https://datascienceconf.com'
  },
  {
    id: '4',
    title: 'The Rise of Agentic AI in Enterprise',
    summary: 'How Fortune 500 companies are deploying autonomous agents to automate data cleaning.',
    category: 'Industry',
    date: '2026-04-10',
    url: 'https://venturebeat.com/category/ai/'
  }
];

export const newsService = {
  getLatestNews: async (): Promise<NewsItem[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_NEWS;
  }
};
