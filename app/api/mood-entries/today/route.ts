import { NextResponse } from 'next/server';
import { supabase } from '@/shared/lib/supabase';
import { ApiResponseType } from '@/shared/types/api';

/** 오늘 입력한 기분 기록 조회 */
export async function GET() {}

/** 오늘의 기분 기록 추가 */
export async function POST(request: Request): Promise<NextResponse<ApiResponseType<null>>> {
  try {
    const body = await request.json();

    const { studentId, emotions, energyLevel, thoughts } = body;

    if (!studentId || emotions === undefined || !energyLevel || thoughts === undefined) {
      return NextResponse.json(
        { success: false, code: 400, message: '필수 필드가 누락되었습니다.', data: null },
        { status: 400 }
      );
    }

    const checkDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const { error } = await supabase.from('mood_entries').insert({
      user_id: studentId,
      check_date: checkDate,
      emotion_key:
        typeof emotions === 'string' ? emotions : Array.isArray(emotions) ? emotions.join(',') : '',
      energy_level: energyLevel,
      note: thoughts ?? '',
    });

    if (error) {
      return NextResponse.json(
        { success: false, code: 500, message: error.message, data: null },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, code: 200, message: '기분 기록 추가 성공', data: null },
      { status: 200 }
    );
  } catch (e) {
    console.error('mood-entries/today POST error:', e);
    return NextResponse.json(
      { success: false, code: 500, message: '기분 기록 추가에 실패했습니다.', data: null },
      { status: 500 }
    );
  }
}

/** 오늘의 기분 기록 수정 */
export async function PUT(request: Request) {}

/** 오늘의 기분 기록 삭제 */
export async function DELETE(request: Request) {}
