'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export function Footer() {
  const { user, logout } = useAuth();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <footer className="bg-[#0a0b1a]/95 text-white/80">
      <div className="container mx-auto flex flex-col gap-8 md:flex-row md:justify-between items-center px-8 py-12">
        <div className="text-blue-400">@hradvisor</div>
        
        <div className="flex flex-col md:flex-row gap-8 text-center">
          {footerLinks.map(link => (
            <Link 
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <button 
              onClick={logout}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>

        <div className="text-blue-400 text-sm">
          © {currentYear} HR Advisor powered by{' '}
          <a 
            href="https://decidr.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Decidr
          </a>
        </div>
      </div>
    </footer>
  );
} 