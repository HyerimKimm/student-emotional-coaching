import { OpenAiClient, SYSTEM_PROMPT, GPTMessageType } from '@/shared/lib/openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, messageList = [] } = await request.json();

    const stream = await OpenAiClient.responses.create({
      model: 'gpt-4.1-mini', // 가성비 좋음
      input: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messageList.map((item: GPTMessageType) => ({
          role: item.role,
          content: item.content,
        })),
        { role: 'user', content: message },
      ],
      stream: true,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'response.output_text.delta') {
              controller.enqueue(encoder.encode(event.delta));
            }
          }
        } catch (e) {
          controller.error(e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (e) {
    return NextResponse.json({ error: '채팅 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
