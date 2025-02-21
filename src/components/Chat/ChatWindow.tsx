'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { XIcon, UpArrowIcon } from '@/components/Icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect, useRef, useMemo } from 'react';
import { markMessageAsCompleted } from '@/store/features/chat/chatSlice';
import { usePathname } from 'next/navigation';
import { logout } from '@/store/features/auth/authSlice';
import { useTheme } from 'next-themes';

interface ChatWindowProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  loading: boolean;
  error: string | null;
  placeholder?: string;
  title?: string;
}

interface TypewriterProps {
  content: string;
  onComplete?: () => void;
}

function Typewriter({ content, onComplete }: TypewriterProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 10); // Adjust speed here
      
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [content, currentIndex, onComplete]);

  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      className="prose prose-sm max-w-none prose-pre:bg-gray-100 prose-pre:p-2"
    >
      {displayedContent}
    </ReactMarkdown>
  );
}

export function ChatWindow({
  input,
  setInput,
  onSubmit,
  onClose,
  loading,
  error,
  placeholder = "Ask me anything...",
}: ChatWindowProps) {
  const { currentSession, sessions, completedMessages } = useAppSelector(state => state.chat);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isFullWidth = pathname === '/chat';
  const currentMessages = useMemo(() => currentSession 
    ? sessions.find(s => s.id === currentSession)?.messages ?? []
    : [], [currentSession, sessions]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleMessageComplete = (messageId: string) => {
    dispatch(markMessageAsCompleted(messageId));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  return (
    <div className={`fixed right-0 top-0 h-screen animate-slide-in ${isFullWidth ? 'w-full' : ''}`}>
      <div className={`${isFullWidth ? 'w-full' : 'w-96'} h-full flex flex-col
        ${isDarkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-white text-gray-900'}`}
      >
        {/* Header */}
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
          <div>
            {user?.organisation && (
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {user.organisation.name}
              </div>
            )}
            <h3 className="font-semibold">AI Consultant</h3>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {user.email}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className={`text-xs px-2 py-1 rounded
                    ${isDarkMode 
                      ? 'text-red-400 hover:bg-red-900/50' 
                      : 'text-red-600 hover:bg-red-50'}`}
                >
                  Sign out
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className={`p-1 rounded-full
                ${isDarkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'}`}
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4`}>
          <div className={`${isFullWidth ? 'max-w-xl mx-auto w-full' : ''}`}>
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? isDarkMode 
                        ? 'bg-gray-800' 
                        : 'bg-gray-100'
                      : isDarkMode 
                        ? 'bg-gray-900' 
                        : ''
                  }`}
                >
                  {message.role === 'assistant' && !completedMessages.includes(message.id) ? (
                    <Typewriter 
                      content={message.content} 
                      onComplete={() => handleMessageComplete(message.id)}
                    />
                  ) : (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      className={`prose prose-sm max-w-none
                        ${isDarkMode 
                          ? 'prose-invert prose-pre:bg-gray-800' 
                          : 'prose-pre:bg-gray-100'} 
                        prose-pre:p-2 text-base`}
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            )}
            {error && (
              <div className={`text-center text-sm ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input and Footer */}
        <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <form onSubmit={onSubmit} className="p-4">
            <div className={`${isFullWidth ? 'max-w-xl mx-auto' : ''}`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={placeholder}
                  className={`flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode 
                      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-500'}`}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UpArrowIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
          <div className={`pb-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Powered by Decidr
          </div>
        </div>
      </div>
    </div>
  );
} 