'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface LinkComponentProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export default function LinkComponent({ href, className, children }: LinkComponentProps) {
  return (
    <Link 
      href={href} 
      className={className}
    >
      {children}
    </Link>
  );
} 