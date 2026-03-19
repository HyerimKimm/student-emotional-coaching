import { NextResponse } from 'next/server';
import { supabase } from '@/shared/lib/supabase';
import { ApiResponseType } from '@/shared/type/api';
import { createClient } from '@supabase/supabase-js';

type MoodEntryType = {
  id: string;
  user_id: string;
  check_date: string;
  emotion_key: string;
  energy_level: string;
  note: string;
  created_at: string;
  updated_at: string;
};

/** 오늘 입력한 기분 기록 조회 */
export async function GET(
  request: Request
): Promise<NextResponse<ApiResponseType<MoodEntryType | null>>> {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json(
        { success: false, code: 400, message: '학생 ID(studentId)가 필요합니다.', data: null },
        { status: 400 }
      );
    }

    const checkDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', studentId)
      .eq('check_date', checkDate)
      .maybeSingle();

    if (error) {
      console.error('mood-entries/today GET error:', error);
      return NextResponse.json(
        { success: false, code: 500, message: error.message, data: null },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        code: 200,
        message: '기분 기록 조회 성공',
        data: (data as MoodEntryType) ?? null,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error('mood-entries/today GET error:', e);
    return NextResponse.json(
      { success: false, code: 500, message: '기분 기록 조회에 실패했습니다.', data: null },
      { status: 500 }
    );
  }
}

/** 오늘의 기분 기록 추가 */
export async function POST(request: Request): Promise<NextResponse<ApiResponseType<null>>> {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : null;

    if (!token) {
      return NextResponse.json(
        { success: false, code: 401, message: '인증 토큰이 필요합니다.', data: null },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, code: 500, message: 'Supabase 환경 변수가 누락되었습니다.', data: null },
        { status: 500 }
      );
    }

    const authedSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const body = await request.json();

    const { studentId, emotions, energyLevel, thoughts } = body;

    if (!studentId || emotions === undefined || !energyLevel || thoughts === undefined) {
      return NextResponse.json(
        { success: false, code: 400, message: '필수 필드가 누락되었습니다.', data: null },
        { status: 400 }
      );
    }

    const checkDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const { data: authData, error: authError } = await authedSupabase.auth.getUser(token);

    if (authError || !authData?.user) {
      return NextResponse.json(
        { success: false, code: 401, message: '유효하지 않은 인증 토큰입니다.', data: null },
        { status: 401 }
      );
    }

    if (authData.user.id !== studentId) {
      return NextResponse.json(
        { success: false, code: 403, message: '본인의 데이터만 등록할 수 있습니다.', data: null },
        { status: 403 }
      );
    }

    const { error } = await authedSupabase.from('mood_entries').insert({
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
export async function PUT(request: Request): Promise<NextResponse<ApiResponseType<null>>> {
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

    const { data: existing, error: findError } = await supabase
      .from('mood_entries')
      .select('id')
      .eq('user_id', studentId)
      .eq('check_date', checkDate)
      .maybeSingle();

    if (findError) {
      console.error('mood-entries/today PUT find error:', findError);
      return NextResponse.json(
        { success: false, code: 500, message: findError.message, data: null },
        { status: 500 }
      );
    }

    if (!existing) {
      return NextResponse.json(
        { success: false, code: 404, message: '오늘 등록된 기분 기록이 없습니다.', data: null },
        { status: 404 }
      );
    }

    const { error: updateError } = await supabase
      .from('mood_entries')
      .update({
        emotion_key:
          typeof emotions === 'string'
            ? emotions
            : Array.isArray(emotions)
              ? emotions.join(',')
              : '',
        energy_level: energyLevel,
        note: thoughts ?? '',
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', studentId)
      .eq('check_date', checkDate);

    if (updateError) {
      console.error('mood-entries/today PUT update error:', updateError);
      return NextResponse.json(
        { success: false, code: 500, message: updateError.message, data: null },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, code: 200, message: '기분 기록 수정 성공', data: null },
      { status: 200 }
    );
  } catch (e) {
    console.error('mood-entries/today PUT error:', e);
    return NextResponse.json(
      { success: false, code: 500, message: '기분 기록 수정에 실패했습니다.', data: null },
      { status: 500 }
    );
  }
}

/** 오늘의 기분 기록 삭제 */
export async function DELETE(request: Request) {}
