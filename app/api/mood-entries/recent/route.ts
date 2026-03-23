import { NextResponse } from 'next/server';
import { supabase } from '@/shared/lib/supabase';
import dayjs from 'dayjs';
import { ApiResponseType } from '@/shared/type/api';
import { MoodEntryType } from '@/shared/type/mood_entries';

/** 최근 7일(달력) 기분 기록 조회 — check_date가 오늘 포함 이전 7일 범위에 해당하는 행 (쿼리: studentId) */
export async function GET(
  request: Request
): Promise<NextResponse<ApiResponseType<MoodEntryType[] | null>>> {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json(
        { success: false, code: 400, message: '학생 ID(studentId)가 필요합니다.', data: null },
        { status: 400 }
      );
    }

    const endDate = dayjs().format('YYYY-MM-DD');
    const startDate = dayjs().subtract(6, 'day').format('YYYY-MM-DD');

    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', studentId)
      .gte('check_date', startDate)
      .lte('check_date', endDate)
      .order('check_date', { ascending: false });

    if (error) {
      console.error('mood-entries/recent GET error:', error);
      return NextResponse.json(
        {
          success: false,
          code: 500,
          message: error.message || '기분 기록 조회에 실패했습니다.',
          data: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        code: 200,
        message: '기분 기록 조회 성공',
        data: (data as MoodEntryType[]) ?? [],
      },
      { status: 200 }
    );
  } catch (e) {
    console.error('mood-entries/recent GET error:', e);
    return NextResponse.json(
      { success: false, code: 500, message: '기분 기록 조회 중 오류가 발생했습니다.', data: null },
      { status: 500 }
    );
  }
}

/** 최근 7일 내 기분 기록 추가 */
export async function POST(request: Request) {}

/** 최근 7일 내 기분 기록 수정 */
export async function PUT(request: Request) {}

/** 최근 7일 내 기분 기록 삭제 */
export async function DELETE(request: Request) {}
