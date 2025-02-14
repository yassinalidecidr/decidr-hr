'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/hooks/useAuth';
import { sendMessage } from '@/store/features/chat/chatSlice';
import { ChatWindow } from './ChatWindow';
import { ChatButton } from './ChatButton';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.chat);
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const pathname = usePathname();

  // Only show chat on dashboard
  if (pathname !== '/dashboard' && pathname !== '/login') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    try {
      await dispatch(sendMessage({ content: input })).unwrap();
      setInput('');
    } catch (err) {
      console.error('Failed to send message:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <ChatWindow
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
          loading={loading}
          error={error}
          placeholder={user ? "Ask me anything..." : "Ask about login, registration, or password recovery..."}
          title={user ? "HR Assistant" : "Auth Assistant"}

        />
      ) : (
        <ChatButton onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
} 