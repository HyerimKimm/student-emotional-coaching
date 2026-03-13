import { NextResponse } from 'next/server';
import { supabase } from '@/shared/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해 주세요.' }, { status: 400 });
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    const userId = authData.user?.id;
    if (!userId) {
      return NextResponse.json({ error: '로그인 정보를 가져올 수 없습니다.' }, { status: 500 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, name, role, created_at')
      .eq('id', userId)
      .single();

    if (profileError) {
      return NextResponse.json(
        {
          user: authData.user,
          session: authData.session,
          profile: null,
          error: '프로필을 불러오지 못했습니다.',
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
      profile: {
        id: profile.id,
        name: profile.name,
        role: profile.role,
        createdAt: profile.created_at,
      },
    });
  } catch (e) {
    console.error('Login API error:', e);
    return NextResponse.json({ error: '로그인 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
