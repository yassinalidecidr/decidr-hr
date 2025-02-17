'use client';

import { useAppSelector } from '@/store/hooks';
import { Chat } from '@/components/Chat/Chat';
import NavbarWrapper from '@/components/NavbarWrapper';
import { ToastProvider } from "@/components/ToastProvider";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useAppSelector(state => state.chat);

  return (
    <div className="flex">
      <div className={`flex-col ${isOpen ? 'w-[80%]' : 'w-full'} transition-all duration-300`}>
        <NavbarWrapper />
        {children}
        <ToastProvider />
      </div>
      <Chat />
    </div>
  );
} 