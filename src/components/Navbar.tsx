'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from '@/components/Icons';
import { useAppSelector } from '@/store/hooks';

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { isOpen } = useAppSelector(state => state.chat);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Common nav items that show regardless of auth status
  const commonNavItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Locations', href: '/locations' },
    { name: 'Contact', href: '/contact' },
  ];
  
  // Auth-required nav items
  const authNavItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Chat', href: '/chat' },
  ];
  
  // Combine nav items based on auth status
  const navItems = user 
    ? [...commonNavItems, ...authNavItems]
    : commonNavItems;

  return (
    <>
      <header className="w-full bg-[#0a0b1a] text-white">
        <nav className={`
          px-6 md:px-20 py-4 flex justify-between items-center fixed top-0 z-20 
          transition-all duration-300
          ${isOpen ? 'w-[70%]' : 'w-full'}
          ${scrolled ? 'bg-black bg-opacity-90' : ''}
        `}>
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              HR Assistant
            </Link>
            
            <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-10 rounded-md">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-md transition-colors
                    ${pathname === item.href ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-15'}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button
                    onClick={logout}
                    className="px-4 py-2 border border-white rounded hover:bg-white hover:text-[#0a0b1a] transition-colors"
                  >
                    Logout
                  </button>
                  <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
                    <Menu className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-white text-[#0a0b1a] rounded hover:bg-opacity-90 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-y-0 right-0 z-30 w-64 bg-[#0a0b1a] transform ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end">
            <button onClick={() => setIsMenuOpen(false)} className="text-white p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4 mt-8 text-white">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded-md transition-colors
                  ${pathname === item.href ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-15'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 