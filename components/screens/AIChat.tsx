"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  options?: string[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "user",
    content: "요즘 공부하려고 하면 그냥 다 귀찮아요.",
  },
  {
    id: "2",
    type: "ai",
    content:
      "그럴 때 있죠.\n지금 말한 걸 보면 단순히 귀찮다기보다 피로하거나 부담이 쌓인 상태일 수도 있어 보여요.",
  },
  {
    id: "3",
    type: "ai",
    content: "혹시 요즘 더 가까운 느낌은 어떤가요?",
    options: [
      "시작하기가 힘들다",
      "하다가 금방 지친다",
      "잘해야 할 것 같아 부담된다",
      "잘 모르겠다",
    ],
  },
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, number>
  >({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "그 마음 충분히 이해해요. 지금 느끼는 감정은 자연스러운 거예요. 함께 천천히 이야기해볼까요?",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleOptionSelect = (messageId: string, optionIndex: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [messageId]: optionIndex,
    }));

    const selectedOption = messages.find((m) => m.id === messageId)?.options?.[
      optionIndex
    ];

    if (selectedOption) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: selectedOption,
      };

      setMessages((prev) => [...prev, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: getAIResponse(optionIndex),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getAIResponse = (optionIndex: number): string => {
    const responses = [
      "시작이 어려운 거군요. 그럴 땐 아주 작은 것부터 시작해보는 건 어때요? 예를 들어 책상에 앉는 것만으로도 충분해요.",
      "금방 지치는 느낌이군요. 혹시 중간에 휴식 시간을 갖고 계신가요? 짧은 휴식도 큰 도움이 될 수 있어요.",
      "부담감이 크시군요. 완벽하지 않아도 괜찮아요. 지금 할 수 있는 만큼만 해도 충분해요.",
      "아직 잘 모르겠다면, 그것도 괜찮아요. 함께 천천히 알아가 봐요.",
    ];
    return responses[optionIndex] || responses[3];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat">
      <div className="chat__messages">
        {messages.map((message) => (
          <div key={message.id} className={`message message--${message.type}`}>
            <div className="message__bubble">
              {message.content.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < message.content.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
            {message.options && (
              <div className="message__options">
                {message.options.map((option, index) => (
                  <button
                    key={index}
                    className={`message__option ${
                      selectedOptions[message.id] === index
                        ? "message__option--selected"
                        : ""
                    }`}
                    onClick={() => handleOptionSelect(message.id, index)}
                    disabled={selectedOptions[message.id] !== undefined}
                  >
                    {index + 1} {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat__input-area">
        <div className="quick-actions">
          <button className="quick-actions__btn">더 이야기하고 싶어요</button>
          <button className="quick-actions__btn">오늘은 여기까지</button>
          <button className="quick-actions__btn">도움이 됐어요</button>
        </div>
        <div className="chat__input-wrapper">
          <textarea
            className="chat__input"
            placeholder="메시지를 입력하세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <button
            className="chat__send-btn"
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
