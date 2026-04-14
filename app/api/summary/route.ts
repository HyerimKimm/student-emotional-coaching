import { NextResponse } from 'next/server';
import { OpenAiClient } from '@/shared/lib/openai';
import { MoodEntryType } from '@/shared/type/mood_entries';

type SummaryRequestBody = {
  recentMoodEntries?: MoodEntryType[];
};

const SUMMARY_SYSTEM_PROMPT = `
너는 학생의 최근 감정 기록을 보고, 부담을 낮추는 "오늘의 추천" 한 줄을 작성하는 AI 코치다.

출력 규칙:
- 한국어로 작성
- 존중하고 따뜻한 톤 유지
- 1~2문장, 최대 70자 내외
- 과장/단정/진단 금지
- 실천 가능한 아주 작은 행동 제안 1개 포함
- 마크다운, 이모지, 따옴표 없이 순수 텍스트만 출력
`;

export async function POST(request: Request) {
  try {
    const { recentMoodEntries = [] } = (await request.json()) as SummaryRequestBody;

    if (!recentMoodEntries.length) {
      return NextResponse.json({
        success: true,
        recommendation: '오늘 마음 체크를 아직 하지 않았어요. 지금 마음을 짧게 기록해볼까요?',
      });
    }

    const serializedEntries = recentMoodEntries
      .slice(0, 7)
      .map(
        (entry) =>
          `- 날짜: ${entry.check_date}, 감정: ${entry.emotion_key}, 에너지: ${entry.energy_level}, 메모: ${entry.note || '(없음)'}`
      )
      .join('\n');

    const response = await OpenAiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        { role: 'system', content: SUMMARY_SYSTEM_PROMPT },
        {
          role: 'user',
          content: `아래 최근 감정 기록을 바탕으로 오늘의 추천 한 줄을 작성해줘.\n${serializedEntries}`,
        },
      ],
    });

    const recommendation = response.output_text?.trim();

    if (!recommendation) {
      return NextResponse.json(
        { success: false, error: '추천 문구 생성에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      recommendation,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: '추천 문구 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
