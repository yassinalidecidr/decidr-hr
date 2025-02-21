'use client';

import { Chat } from '@/components/Chat/Chat';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleChat } from '@/store/features/chat/chatSlice';
import Link from 'next/link';

export default function Home() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.chat);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 flex relative overflow-hidden">
      <div className={`flex-1 flex items-center justify-center transition-all duration-300 ${isOpen ? 'w-1/2' : 'w-full'}`}>
        <div className="w-full max-w-[800px] px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white max-w-3xl">
              AI-Powered HR{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                solutions
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Streamline your HR processes with intelligent automation and personalized assistance.
            </p>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="bg-white text-blue-900 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
              <button
                onClick={() => dispatch(toggleChat())}
                className="bg-blue-700 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors"
              >
                Try Demo
              </button>
            </div>
          </div>
        </div>
      </div>
      <Chat />
    </section>
  );
}
