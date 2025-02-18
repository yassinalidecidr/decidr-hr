'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/hooks/useAuth';
import { sendMessage, toggleChat, getWelcomeMessage } from '@/store/features/chat/chatSlice';
import { ChatWindow } from './ChatWindow';
import { ChatButton } from './ChatButton';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';

export function Chat() {
  const dispatch = useAppDispatch();
  const { loading, error, isOpen, currentSession, sessions } = useAppSelector(state => state.chat);
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen && (!currentSession || sessions.length === 0)) {
      dispatch(getWelcomeMessage());
    }
  }, [isOpen, currentSession, sessions.length, dispatch]);

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
    <>
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <ChatButton onClick={() => dispatch(toggleChat())} />
        </div>
      )}
      <div className={`fixed right-0 top-0 h-screen bg-white z-50 transition-all duration-300 transform
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {isOpen && (
          <ChatWindow
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            onClose={() => dispatch(toggleChat())}
            loading={loading}
            error={error}
            placeholder={user ? "Ask me anything..." : "Ask about login, registration, or password recovery..."}
            title={user ? "HR Assistant" : "Auth Assistant"}
          />
        )}
      </div>
    </>
  );
} 