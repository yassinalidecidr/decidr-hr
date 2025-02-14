'use client';

import { Message } from '@/types/message';
import { MessageBubble } from './MessageBubble';
import { useEffect, useRef } from 'react';

interface ChatBoxProps {
  messages: Message[];
  loading?: boolean;
}

export function ChatBox({ messages, loading }: ChatBoxProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {loading && (
        <div className="flex justify-center">
          <div className="animate-pulse text-gray-400">AI is thinking...</div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
} 