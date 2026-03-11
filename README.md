# 마음 코치 - 학생 감정 케어 앱

### 프로젝트 설명

- 기존 AIDT의 "오늘의 기분", "학생 심리 정서 검사"에 AI를 접목시킴
- 학생들과 채팅으로 소통하면서, 진단을 선언하는 게 아니라, 학생과 함께 상태를 추론하는 구조로 컨셉을 잡았다.

### 기술 스택

- **기획** : Chat GPT 5.4 Pro와 함께 ^^
- **와이어프레임** : v0과 함께
- **프레임워크** : Next.js 16
- **언어** : TypeScript
- **스타일링** : Tailwind CSS, Sass
- **UI 컴포넌트** : shadcn/ui 스타일
- **폼/검증** : React Hook Form, Zod
- **아이콘** : Lucide React
- **기타** : next-themes(다크 모드), Recharts(차트), date-fns(날짜 처리)

### 환경 변수 설정 (.env)

프로젝트 루트에 `.env` 파일을 만들고 아래 변수들을 설정해주세요.

| 변수명                          | 설명                              | 발급/확인 경로                                                            |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_OPENAI_API_KEY`    | OpenAI API 키 (AI 채팅 등에 사용) | [OpenAI API Keys](https://platform.openai.com/account/api-keys) 에서 생성 |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase 프로젝트 URL             | Supabase 대시보드 → 프로젝트 설정 → API                                   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명(공개) 키            | Supabase 대시보드 → 프로젝트 설정 → API                                   |

**예시 (.env)**

```env
# OpenAI (https://platform.openai.com/account/api-keys 에서 키 생성)
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-...

# Supabase (대시보드 → 프로젝트 설정 → API 에서 확인)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ `.env` 파일은 Git에 커밋하지 마세요. 실제 키는 각자 발급받아 사용하세요.

### 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하면 됩니다.
