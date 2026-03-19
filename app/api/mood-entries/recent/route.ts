import { NextResponse } from 'next/server';
import { supabase } from '@/shared/lib/supabase';
import dayjs from 'dayjs';

/** 최근 7일 내 기분 기록 조회 (쿼리: studentId = useAuthStore의 user.id 또는 profile.id) */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ error: '학생 ID(studentId)가 필요합니다.' }, { status: 400 });
    }

    const fromIso = dayjs().subtract(7, 'day').toISOString();

    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('student_id', studentId)
      .gte('created_at', fromIso)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('mood-entries/recent GET error:', error);
      return NextResponse.json(
        { error: error.message || '기분 기록 조회에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data ?? []);
  } catch (e) {
    console.error('mood-entries/recent GET error:', e);
    return NextResponse.json({ error: '기분 기록 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

/** 최근 7일 내 기분 기록 추가 */
export async function POST(request: Request) {}

/** 최근 7일 내 기분 기록 수정 */
export async function PUT(request: Request) {}

/** 최근 7일 내 기분 기록 삭제 */
export async function DELETE(request: Request) {}
