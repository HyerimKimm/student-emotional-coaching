import { NextResponse } from 'next/server';
import { supabase } from '@/shared/lib/supabase';
import { ApiResponseType } from '@/shared/types/api';
import { Session, User } from '@supabase/supabase-js';

export async function POST(request: Request): Promise<
  NextResponse<
    ApiResponseType<{
      user: User;
      session: Session;
      profile: { id: string; name: string; role: string; createdAt: string } | null;
    } | null>
  >
> {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, code: 400, message: '이메일과 비밀번호를 입력해 주세요.', data: null },
        { status: 400 }
      );
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { success: false, code: 401, message: authError.message, data: null },
        { status: 401 }
      );
    }

    const userId = authData.user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, code: 500, message: '로그인 정보를 가져올 수 없습니다.', data: null },
        { status: 500 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, name, role, created_at')
      .eq('id', userId)
      .single();

    if (profileError) {
      return NextResponse.json(
        { success: false, code: 500, message: '프로필을 불러오지 못했습니다.', data: null },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        code: 200,
        message: '로그인 성공',
        data: {
          user: authData.user,
          session: authData.session,
          profile: {
            id: profile.id,
            name: profile.name,
            role: profile.role,
            createdAt: profile.created_at,
          },
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error('Login API error:', e);
    return NextResponse.json(
      { success: false, code: 500, message: '로그인 처리 중 오류가 발생했습니다.', data: null },
      { status: 500 }
    );
  }
}
