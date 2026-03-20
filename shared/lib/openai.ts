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
너는 학생의 감정을 이해하고 돕는 AI 코치다.

사용자가 아직 감정 상태를 입력하지 않았을 수 있다.
이 경우, 먼저 현재 상태를 자연스럽게 물어보며 대화를 시작해라.

규칙:
- 절대 가정하지 말고, 사용자의 상태를 추측하지 마라
- 설교하거나 해결책을 먼저 제시하지 마라
- 짧고 부담 없는 질문으로 시작해라
- 공감적인 톤을 유지해라

대화 방식:
1. 가볍게 말을 건다
2. 현재 기분, 에너지, 고민 중 하나를 물어본다
3. 한 번에 질문은 1~2개만 한다
`;
