'use client';

import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { GPTMessageType } from '@/shared/lib/openai';
import useGetTodayQuery from '@/shared/query/mood-entries/useGetTodayQuery';
import styles from './AIChat.module.scss';

export function AIChat() {
  const [messages, setMessages] = useState<GPTMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { data: todayMoodEntry, isLoading: isLoadingTodayMoodEntry } = useGetTodayQuery();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);

  const streamAssistantMessage = async ({
    message,
    messageList,
  }: {
    message: string;
    messageList: GPTMessageType[];
  }) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        messageList,
      }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        return [...prev.slice(0, -1), { ...lastMessage, content: lastMessage.content + chunk }];
      });
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const trimmedInput = inputValue.trim();
    const newMessage: GPTMessageType = {
      role: 'user',
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    await streamAssistantMessage({
      message: trimmedInput,
      messageList: messages,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (isLoadingTodayMoodEntry || hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const moodData = todayMoodEntry?.data;

    const initialMessage = moodData
      ? [
          '사용자가 오늘 마음체크를 완료했습니다.',
          `체크 날짜: ${moodData.check_date}`,
          `감정: ${moodData.emotion_key}`,
          `에너지 수준: ${moodData.energy_level}`,
          `메모: ${moodData.note || '(없음)'}`,
          '위 데이터를 바탕으로 먼저 짧은 인사와 간단한 질문(1~2개)으로 대화를 시작해 주세요.',
        ].join('\n')
      : '사용자가 아직 오늘 마음체크를 하지 않았습니다. 먼저 부담 없는 짧은 인사로 대화를 시작해 주세요.';

    queueMicrotask(() => {
      void streamAssistantMessage({
        message: initialMessage,
        messageList: [],
      });
    });
  }, [isLoadingTodayMoodEntry, todayMoodEntry?.data]);

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.role]}`}>
            <div
              className={`${styles.bubble} ${message.role === 'user' ? styles.user : styles.ai}`}
            >
              {message.content.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < message.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.input_area}>
        <div className={styles.quick_actions}>
          <button type="button" className={styles.quick_btn}>
            더 이야기하고 싶어요
          </button>
          <button type="button" className={styles.quick_btn}>
            오늘은 여기까지
          </button>
          <button type="button" className={styles.quick_btn}>
            도움이 됐어요
          </button>
        </div>
        <div className={styles.input_wrapper}>
          <textarea
            className={styles.input}
            placeholder="메시지를 입력하세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <button
            type="button"
            className={styles.send_btn}
            onClick={handleSend}
            disabled={!inputValue.trim()}
            aria-label="메시지 보내기"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
