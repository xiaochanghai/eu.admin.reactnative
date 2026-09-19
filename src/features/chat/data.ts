export type ChatModel = {
  id: string;
  label: string;
  subtitle: string;
};

export type ChatHistoryItem = {
  id: string;
  title: string;
  starred: boolean;
  archived: boolean;
  updatedAt: number;
  projectId?: string;
};

export const CHAT_MODELS: ChatModel[] = [
  {
    id: 'opus-4.6',
    label: 'Opus 4.6',
    subtitle: 'Most capable for ambitious work',
  },
  {
    id: 'sonnet-4.6',
    label: 'Sonnet 4.6',
    subtitle: 'Most efficient for everyday tasks',
  },
  {
    id: 'haiku-4.5',
    label: 'Haiku 4.5',
    subtitle: 'Fastest for quick answers',
  },
];

export const MOCK_RESPONSES = [
  `That's a great question! Here's what I think:\n\nThe key insight is that **simplicity** often beats complexity. When you break down the problem into smaller pieces, the solution becomes much clearer.\n\n\`\`\`javascript\nconst answer = problems\n  .map(simplify)\n  .reduce(combine, []);\n\`\`\`\n\nHope that helps!`,
  `I'd be happy to help with that. Let me walk you through it step by step:\n\n1. **First**, identify the core requirements\n2. **Then**, design the interface\n3. **Finally**, implement and test\n\nThe most important thing is to start simple and iterate. You can always add more features later.`,
  `Interesting! Here's a quick overview:\n\n> The best code is the code you don't have to write.\n\nThat said, when you *do* need to write code, keep these principles in mind:\n\n- **Readability** over cleverness\n- **Composition** over inheritance\n- **Explicit** over implicit\n\nLet me know if you want me to dive deeper into any of these!`,
  `Sure thing! Here's a concise answer:\n\nThe approach I'd recommend is to use a **streaming architecture** where data flows through the system in real-time. This gives you:\n\n- Lower latency\n- Better resource utilization\n- Simpler error handling\n\n\`\`\`python\nasync for chunk in stream:\n    process(chunk)\n\`\`\`\n\nWant me to elaborate on any part?`,
];
