'use client';

import { useState } from 'react';
import { Chat } from '@/components/Chat/Chat';
import Link from 'next/link';

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 flex relative overflow-hidden">
      <div className={`flex-1 flex items-center justify-center transition-all duration-300 ${showChat ? 'w-1/2' : 'w-full'}`}>
        <div className="w-full max-w-[800px] px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white max-w-3xl">
              AI-powered HR{" "}
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
                onClick={() => setShowChat(true)}
                className="bg-blue-700 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors"
              >
                Try Demo
              </button>
            </div>
          </div>
        </div>
      </div>
      {showChat && (
        <div className="fixed inset-0 md:relative md:inset-auto flex-1 bg-white z-50">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            onClick={() => setShowChat(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close chat</span>
          </button>
          <Chat />
        </div>
      )}
    </section>
  );
}
