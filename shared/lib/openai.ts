import OpenAI from 'openai';

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY가 환경 변수에 설정되어 있지 않습니다.');
}

export type GPTMessageType = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export const OpenAiClient = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const SYSTEM_PROMPT = `
you are AI Emotional Coach.
`;
