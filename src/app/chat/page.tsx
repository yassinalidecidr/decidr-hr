'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ChatWindow } from '@/components/Chat/ChatWindow';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { sendMessage } from '@/store/features/chat/chatSlice';

export default function ChatPage() {
  const { token } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const { loading, error } = useAppSelector(state => state.chat);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await dispatch(sendMessage({ content: input }));
      setInput('');
    }
  };

  return (
    <ChatWindow
      input={input}
      setInput={setInput}
      onSubmit={handleSubmit}
      onClose={() => router.push('/dashboard')}
      loading={loading}
      error={error}
    />
  );
} 