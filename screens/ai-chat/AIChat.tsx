'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { GPTMessageType } from '@/shared/lib/openai';
import styles from './AIChat.module.scss';

export function AIChat() {
  const [messages, setMessages] = useState<GPTMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessage: GPTMessageType = {
      role: 'user',
      content: inputValue,
    };
    setMessages([...messages, newMessage]);
    setInputValue('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: inputValue,
        messageList: messages,
      }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    setMessages([...messages, newMessage, { role: 'assistant', content: '' }]);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.role]}`}>
            <div className={styles.bubble}>
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
